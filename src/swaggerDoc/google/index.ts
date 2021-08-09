import { ad } from "./ad.swagger";
import { bot } from "./bot.swagger";
import { stat } from "./stat.swagger";
import { tag } from "./tag.swagger";

const googleSwagger = { ...ad, ...bot, ...stat, ...tag };

export { googleSwagger };
