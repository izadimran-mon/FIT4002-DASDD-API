import {
  Connection,
  createConnection,
  DeepPartial,
  getConnection,
} from "typeorm";
import { Ad, AdTag, Bot, Tag } from "~/models";
import ORMConfig from "~/configs/ormconfig";

const env = process.env;
if (env.NODE_ENV !== "test") {
  console.error("Test utilities only available in testing mode");
}
const connection = {
  async create() {
    // await createConnection();
    let connection: Connection | undefined;
    try {
      connection = getConnection();
    } catch (e) {}

    try {
      if (connection) {
        if (!connection.isConnected) {
          return await connection.connect();
        }
      } else {
        return await createConnection({ ...ORMConfig, dropSchema: true });
      }
    } catch (e) {
      throw e;
    }
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      await repository.query(`TRUNCATE ${entity.tableName} CASCADE`);
    }
  },

  async createTestData() {
    getConnection();
    const bot1 = Bot.create({
      username: "bot1",
      dob: new Date("1999-07-14"),
      gender: "male",
      fName: "First",
      lName: "Bot",
      otherTermsCategory: 0,
      password: "password123",
      locLat: -23.139826,
      locLong: 34.139062,
      type: "google",
      politicalRanking: 0,
    });

    const bot2 = Bot.create({
      username: "bot2",
      dob: new Date("1980-10-29"),
      gender: "female",
      fName: "Second",
      lName: "Bot",
      otherTermsCategory: 4,
      password: "password12345",
      locLat: -33.152826,
      locLong: -12.139062,
      type: "google",
      politicalRanking: 6,
    });

    await Bot.save([bot1, bot2]);

    const tag1 = Tag.create({ name: "Tech" });
    const tag2 = Tag.create({ name: "Food" });
    const tag3 = Tag.create({ name: "Education" });

    await Tag.save([tag1, tag2, tag3]);

    const ad1 = Ad.create({
      bot: bot1,
      createdAt: new Date("2020-11-01 23:52:56"),
      loggedIn: true,
      seenOn: "https://www.theatlantic.com/",
      image: "https://project.s3.region.amazonaws.com/image_1.png",
      headline: "Headline 1",
      html: "innerHTML",
      adLink: "www.cars.com/",
    });

    const ad2 = Ad.create({
      bot: bot1,
      createdAt: new Date("2020-11-10 23:52:56"),
      loggedIn: false,
      seenOn: "https://www.youtube.com/",
      image: "https://project.s3.region.amazonaws.com/image_2.png",
      headline: "Headline 2",
      html: "innerHTML",
      adLink: "www.donuts.com/",
    });

    const ad3 = Ad.create({
      bot: bot2,
      createdAt: new Date("2020-11-05 23:52:56"),
      loggedIn: true,
      seenOn: "https://www.bbc.com/news/science-environment-54395534",
      image: "https://project.s3.region.amazonaws.com/image_3.png",
      headline: "Headline 1",
      html: "innerHTML",
    });

    const ad4 = Ad.create({
      bot: bot2,
      createdAt: new Date("2020-11-20 23:52:56"),
      loggedIn: false,
      headline: "Headline 2",
      html: "innerHTML",
      adLink: "www.donuts.com/",
    });

    await Ad.save([ad1, ad2, ad3, ad4]);

    const adTagsData: DeepPartial<AdTag>[] = [
      {
        ad: ad1,
        tag: tag1,
      },
      {
        ad: ad1,
        tag: tag2,
      },
      {
        ad: ad3,
        tag: tag3,
      },
      {
        ad: ad4,
        tag: tag1,
      },
      {
        ad: ad4,
        tag: tag3,
      },
    ];
    const adTags = adTagsData.map((a) => AdTag.create(a));
    await AdTag.save(adTags);
  },
};

export { connection };
