import { DeleteResult } from "typeorm";
import { Ad, AdTag } from "~/models";

export class AdController {
  async getAll(queryParams: {
    limit?: number;
    offset?: number;
  }): Promise<Ad[]> {
    const { limit, offset } = queryParams;
    return await Ad.find({
      take: limit ? limit : 1000,
      skip: offset ? offset : 0,
      relations: ["adTags", "adTags.tag"],
    });
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
