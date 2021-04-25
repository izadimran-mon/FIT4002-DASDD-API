import { Ad } from "~/models";

export class AdController {
  async getAll(): Promise<Ad[]> {
    return await Ad.find({
      take: 1000, // TODO: add option to allow client to adjust and pagination
      relations: ["adTags", "adTags.tag"],
    });
  }

  async getById(id: string): Promise<Ad> {
    return await Ad.findOneOrFail({
      id,
    });
  }
}
