import { Bot } from "~/models";

export class GoogleBotController {
  async getAll(): Promise<Bot[]> {
    return await Bot.find();
  }

  async getByUsername(username: string): Promise<Bot> {
    return await Bot.findOneOrFail({
      username,
    });
  }
}
