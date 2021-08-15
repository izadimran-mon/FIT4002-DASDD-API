import { GoogleTag } from "~/models";

export class GoogleTagController {
  async getAll(): Promise<GoogleTag[]> {
    return await GoogleTag.find();
  }

  async getById(id: number): Promise<GoogleTag> {
    return await GoogleTag.findOneOrFail({
      id,
    });
  }

  async getByName(name: string): Promise<GoogleTag> {
    return await GoogleTag.findOneOrFail({
      name,
    });
  }

  async createTag(name: string) {
    const newTag = GoogleTag.create({
      name,
    });
    return await GoogleTag.save(newTag);
  }
}
