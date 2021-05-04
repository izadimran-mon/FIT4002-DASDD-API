import { ad } from "./ad.swagger";
import { bot } from "./bot.swagger";
import { adDef } from "./definitions/adDef.swagger";
import { botDef } from "./definitions/botDef.swagger";
import { tagDef } from "./definitions/tagDef.swagger";
import { stat } from "./stat.swagger";
import { tag } from "./tag.swagger";
const env = process.env;

export const swaggerDocument = {
  swagger: "2.0",
  info: {
    description:
      " This is the api documentation for the Monash Dark Ads Scraping Dashboard",
    version: "1.0.0",
    title: "Monash Dark Ads Scraping",
  },
  basePath:
    env.NODE_ENV === "prod" || env.NODE_ENV === "production" ? "/api" : "/",
  tags: [
    {
      name: "Ad",
    },
    {
      name: "Bot",
    },
    {
      name: "Statistics",
    },
    {
      name: "Tag",
    },
  ],
  schemes: ["http"],
  paths: {
    ...ad,
    ...bot,
    ...tag,
    ...stat,
  },
  definitions: {
    Ad: adDef,
    Bot: botDef,
    Tag: tagDef,
  },
};
