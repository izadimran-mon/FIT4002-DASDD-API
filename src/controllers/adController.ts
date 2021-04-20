import { Ad } from "~/models";

export class AdController {
  async getAll(): Promise<Ad[]> {
    return await Ad.find({
      take: 1000, // TODO: add option to allow client to adjust and pagination
    });
  }

  async getById(id: string): Promise<Ad> {
    return await Ad.findOneOrFail({
      id,
    });
  }
}
