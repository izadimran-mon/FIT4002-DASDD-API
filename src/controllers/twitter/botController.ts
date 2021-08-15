import { TwitterBot } from "~/models";

export class TwitterBotController {
  async getAll(): Promise<TwitterBot[]> {
    return await TwitterBot.find();
  }

  async getByUsername(username: string): Promise<TwitterBot> {
    return await TwitterBot.findOneOrFail({
      username,
    });
  }
}
