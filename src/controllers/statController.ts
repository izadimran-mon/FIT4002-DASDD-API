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
    return rawRes;
  }

  async getAdCounts(startDate: Date) {
    const start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-01`;
    const endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
    const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-01`;
    const rawRes = await getConnection().manager.query(
      `
        SELECT date, count(a."createdAt") AS count
        FROM  generate_series($1::date, $2::date, interval '1 day') g(date)
        LEFT JOIN ad a ON a."createdAt" >= g.date
                        AND a."createdAt"  <  g.date + interval '1 day'
        GROUP  BY 1
        ORDER  BY 1;
      `,
      [start, end]
    );

    return rawRes;
  }

  async getAdStats() {
    const adTotal = (await Ad.findAndCount())[1];
    let adNotTagged = adTotal;
    let rawRes = await Ad.createQueryBuilder("ad")
      .leftJoin("ad.adTags", "adTags")
      .leftJoin("adTags.tag", "tag")
      .select("COUNT(ad.id)", "count")
      .addSelect("tag.name", "label")
      .groupBy("tag.name")
      .getRawMany();
    rawRes.forEach((e) => {
      if (e.label === null) {
        adNotTagged = e.count;
      }
    });

    const adTagged = adTotal - adNotTagged;

    const botCount = (await Bot.findAndCount())[1];

    return {
      adTotal,
      adTagged,
      adPerBot: adTotal / botCount,
    };
  }
}