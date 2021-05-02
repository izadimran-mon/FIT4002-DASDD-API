import { Tag } from "~/models";

export class TagController {
  async getAll(): Promise<Tag[]> {
    return await Tag.find();
  }

  async getById(id: number): Promise<Tag> {
    return await Tag.findOneOrFail({
      id,
    });
  }

  async getByName(name: string): Promise<Tag> {
    return await Tag.findOneOrFail({
      name,
    });
  }

  async createTag(name: string) {
    const newTag = Tag.create({
      name,
    });
    return await Tag.save(newTag);
  }
}
