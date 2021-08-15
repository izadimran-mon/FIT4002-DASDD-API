import { GoogleBot } from "~/models";

export class GoogleBotController {
  async getAll(): Promise<GoogleBot[]> {
    return await GoogleBot.find();
  }

  async getByUsername(username: string): Promise<GoogleBot> {
    return await GoogleBot.findOneOrFail({
      username,
    });
  }
}
