import supertest from "supertest";
import { app, server } from "~/app";
import { botMatcherSchema } from "~/tests/customMatchers";
import { connection } from "../../testConnection";

beforeAll(async (done) => {
  await connection.create();
  done();
});
afterAll(async (done) => {
  await connection.close();
  done();
});

beforeEach(async (done) => {
  await connection.createTestData();
  done();
});

afterEach(async (done) => {
  await connection.clear();
  server.close();
  done();
});

describe("GET /google/ads", () => {
  test("Get many ads with no parameters #API-4", async (done) => {
    const res = await supertest(app)
      .get("/google/ads")
      .expect("Content-Type", /json/)
      .expect(200);

    const { body } = res;
    // TODO: metadata
    for (const element of body.records) {
      expect(element).toMatchObject({
        id: expect.any(String),
        bot: expect.objectContaining(botMatcherSchema),
        createdAt: expect.any(String),
        loggedIn: expect.toBeTypeOrNull(Boolean),
        headline: expect.toBeTypeOrNull(String),
        html: expect.toBeTypeOrNull(String),
        adLink: expect.toBeTypeOrNull(String),
      });
    }
    done();
  });

  test("Get ads with valid parameters #API-5", async (done) => {
    const res = await supertest(app)
      .get("/google/ads")
      .expect("Content-Type", /json/)
      .expect(200);

    // const { body } = res;
    // // TODO: metadata
    // for (const element of body.records) {
    //   expect(element).toMatchObject({
    //     id: expect.any(String),
    //     bot: expect.objectContaining(botMatcherSchema),
    //     createdAt: expect.any(String),
    //     loggedIn: expect.toBeTypeOrNull(Boolean),
    //     headline: expect.toBeTypeOrNull(String),
    //     html: expect.toBeTypeOrNull(String),
    //     adLink: expect.toBeTypeOrNull(String),
    //   });
    // }
    done();
  });
});
