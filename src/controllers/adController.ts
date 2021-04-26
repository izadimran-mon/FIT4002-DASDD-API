import { DeleteResult } from "typeorm";
import { Ad, AdTag } from "~/models";

export class AdController {
  async getAll(): Promise<Ad[]> {
    return await Ad.find({
      take: 1000, // TODO: add option to allow client to adjust and pagination
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
