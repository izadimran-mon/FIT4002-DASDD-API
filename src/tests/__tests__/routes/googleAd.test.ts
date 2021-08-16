import supertest from "supertest";
import { app, server } from "~/app";
import { adMatcherSchema, botMatcherSchema } from "~/tests/customMatchers";
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
    const metadata = body.metadata;
    expect(metadata.page).toBeGreaterThanOrEqual(0);
    expect(metadata.per_page).toBeGreaterThanOrEqual(0);
    expect(metadata.page_count).toBeGreaterThan(0);
    expect(metadata.total_count).toBeGreaterThanOrEqual(0);

    const links = metadata.links;
    expect(links).toMatchObject({
      self: expect.any(String),
      first: expect.any(String),
      previous: expect.any(String),
      next: expect.any(String),
      last: expect.any(String),
    });
    for (const element of body.records) {
      expect(element).toMatchObject(adMatcherSchema);
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
