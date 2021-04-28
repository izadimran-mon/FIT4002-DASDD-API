import { DeleteResult, FindManyOptions, QueryBuilder } from "typeorm";
import { AdFilterParams, PaginationParams } from "~/helpers/types";
import { Ad, AdTag } from "~/models";

export class AdController {
  async getAll(queryParams: PaginationParams & AdFilterParams): Promise<Ad[]> {
    const { limit, offset, gender, tag, political } = queryParams;
    const politicalInt = political?.map((e) => parseInt(e));

    // Workaround for finding entity with relation condition: https://github.com/typeorm/typeorm/issues/4396#issuecomment-566254087
    const whereConditions: any[][] = [];
    if (gender) {
      whereConditions.push(["bot.gender ILIKE ANY(:gender)", { gender }]);
    }

    if (tag) {
      whereConditions.push(["tags.name ILIKE ANY(:tag)", { tag }]);
    }

    if (political) {
      whereConditions.push([
        "bot.politicalRanking = ANY(:political)",
        { political: politicalInt },
      ]);
    }

    let findOptions: FindManyOptions = {
      take: limit ? limit : 1000,
      skip: offset ? offset : 0,
      join: {
        alias: "ad",
        leftJoinAndSelect: {
          adTags: "ad.adTags",
          tags: "adTags.tag",
          // bot: "ad.bot",
        },
        leftJoin: {
          bot: "ad.bot",
        },
      },
    };
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
    // return await Ad.find({
    //   take: limit ? limit : 1000,
    //   skip: offset ? offset : 0,
    //   // relations: ["adTags", "adTags.tag"],
    //   join: {
    //     alias: "ad",
    //     leftJoinAndSelect: {
    //       adTags: "ad.adTags",
    //       tags: "adTags.tag",
    //       bot: "ad.bot",
    //     },
    //     // leftJoin: {
    //     //   bot: "ad.bot",
    //     // },
    //   },
    //   where: (qb: any) => {
    //     qb.where("bot.gender ILIKE ANY(:gender)", {
    //       gender: [gender],
    //     });
    //     qb.andWhere("tags.name ILIKE ANY(:tags)", {
    //       tags: ["fashion"],
    //     });
    //   },
    // });
    return await Ad.find(findOptions);
  }

  async getById(id: string): Promise<Ad> {
    return await Ad.findOneOrFail({
      where: { id },
      relations: ["adTags", "adTags.tag"],
    });
  }

  async addTagToAd(adId: string, tagId: number): Promise<AdTag> {
    const newAdTag = AdTag.create({
      adId,
      tagId,
    });
    return await AdTag.save(newAdTag);
  }

  async deleteTagFromAd(adId: string, tagId: number): Promise<DeleteResult> {
    const adTagToDelete = AdTag.create({
      adId,
      tagId,
    });
    return await AdTag.delete(adTagToDelete);
  }
}
