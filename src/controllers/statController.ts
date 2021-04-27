import e from "cors";
import { createQueryBuilder, getConnection } from "typeorm";
import { Ad, Bot } from "~/models";

export class StatController {
  async getBotAlignmentStat() {
    let res: any = [];
    let rawRes = await Bot.createQueryBuilder("bot")
      .select("COUNT(bot.id)", "count")
      .addSelect("bot.politicalRanking", "label")
      .groupBy("bot.politicalRanking")
      .orderBy("bot.politicalRanking")
      .getRawMany();
    res.push({
      type: "political ranking",
      data: rawRes,
    });

    rawRes = await Bot.createQueryBuilder("bot")
      .select("COUNT(bot.id)", "count")
      .addSelect("bot.gender", "label")
      .groupBy("bot.gender")
      .orderBy("bot.gender")
      .getRawMany();

    res.push({
      type: "gender",
      data: rawRes,
    });
    console.log(res);
    return res;
  }
  // .leftJoinAndSelect("adTags.tag", "tag")

  async getCategoryStat() {
    let rawRes = await Ad.createQueryBuilder("ad")
      .leftJoin("ad.adTags", "adTags")
      .leftJoin("adTags.tag", "tag")
      .select("COUNT(ad.id)", "count")
      .addSelect("tag.name", "label")
      .groupBy("tag.name")
      .getRawMany();
    rawRes.forEach((e) => {
      if (e.label === null) {
        e.label = "uncategorised";
      }
    });
    console.log(rawRes);
    return rawRes;
  }
}
