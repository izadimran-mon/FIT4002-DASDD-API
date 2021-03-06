import { DeleteResult, FindManyOptions, In } from "typeorm";
import {
  GoogleAdFilterParams,
  PaginationParams,
  TwitterAdFilterParams,
} from "~/helpers/types";
import { TwitterAd, TwitterAdTag } from "~/models";

interface Metadata {
  page: number;
  per_page: number;
  page_count: number;
  total_count: number;
  links: Links;
}

interface Links {
  self: string;
  first: string;
  previous: string;
  next: string;
  last: string;
}

export class TwitterAdController {
  async getAll(
    queryParams: PaginationParams & TwitterAdFilterParams
  ): Promise<{ metadata: Metadata; records: TwitterAd[] }> {
    const {
      limit,
      offset,
      // gender,
      tag,
      // political,
      bots,
      startDate,
      endDate,
    } = queryParams;
    // const politicalInt = political?.map((e) => parseInt(e));

    // TODO: Testing needed to confirm different combinations of query params work
    let findOptions: FindManyOptions = {
      take: limit ? limit : 30,
      skip: offset ? offset : 0,
      select: ["id", "createdAt"],
      join: {
        alias: "ad",
        leftJoin: {
          adTags: "ad.adTags",
          tags: "adTags.tag",
          bot: "ad.bot",
        },
      },
      order: {
        createdAt: "DESC",
      },
    };

    // Workaround for finding entity with relation condition: https://github.com/typeorm/typeorm/issues/4396#issuecomment-566254087

    /**
     * All WHERE conditions to filter ads in the database
     *
     * Notes:
     * - Tight connescence with SQL, more specifically POSTGRES, syntax and functions
     * - Tight connescence with the table alias used in findOptions
     * - Each condition / element in whereConditions is joined together using an AND
     */
    const whereConditions: any[][] = [];
    // if (gender) {
    //   whereConditions.push(["bot.gender ILIKE ANY(:gender)", { gender }]);
    // }

    if (tag) {
      whereConditions.push(["tags.name ILIKE ANY(:tag)", { tag }]);
    }

    // if (political) {
    //   whereConditions.push([
    //     "bot.politicalRanking = ANY(:political)",
    //     { political: politicalInt },
    //   ]);
    // }

    if (bots) {
      whereConditions.push(["bot.id = ANY(:bots)", { bots }]);
    }

    if (startDate) {
      whereConditions.push(["ad.createdAt >= :startDate", { startDate }]);
    }

    if (endDate) {
      whereConditions.push(["ad.createdAt <= :endDate", { endDate }]);
    }

    if (whereConditions.length > 0) {
      findOptions.where = (qb: any) => {
        for (let i = 0; i < whereConditions.length; i++) {
          if (i == 0) {
            qb.where(whereConditions[i][0], whereConditions[i][1]);
          } else {
            qb.andWhere(whereConditions[i][0], whereConditions[i][1]);
          }
        }
      };
    }

    // get ad ids that fit the options
    const adIds = (await TwitterAd.find(findOptions)).map((e) => e.id);

    const filteredAdNumber = adIds.length;

    const ads = await TwitterAd.find({
      relations: ["bot", "adTags", "adTags.tag"],
      where: {
        id: In(adIds),
      },
    });

    let currentOffset = 0;
    let currentLimit = 30;

    if (offset !== undefined) {
      currentOffset = offset;
    }

    if (limit !== undefined) {
      currentLimit = limit;
    }

    const currentPage = currentOffset / currentLimit;

    delete findOptions.take;
    delete findOptions.skip;

    const totalAdNumber = await TwitterAd.count(findOptions);

    let currentLink: Links = {
      self: "",
      first: "",
      previous: "",
      next: "",
      last: "",
    };

    // get meta data
    const metadataForAd: Metadata = {
      page: currentPage,
      per_page: currentLimit,
      page_count: filteredAdNumber,
      total_count: totalAdNumber,
      links: currentLink,
    };

    // get ads with the required relations and data
    return {
      metadata: metadataForAd,
      records: ads,
    };
  }

  async getById(id: string): Promise<TwitterAd> {
    return await TwitterAd.findOneOrFail({
      where: { id },
      relations: ["adTags", "adTags.tag"],
    });
  }

  async addTagToAd(adId: string, tagId: number): Promise<TwitterAdTag> {
    const newAdTag = TwitterAdTag.create({
      adId,
      tagId,
    });
    return await TwitterAdTag.save(newAdTag);
  }

  async deleteTagFromAd(adId: string, tagId: number): Promise<DeleteResult> {
    const adTagToDelete = TwitterAdTag.create({
      adId,
      tagId,
    });
    return await TwitterAdTag.delete(adTagToDelete);
  }
}
