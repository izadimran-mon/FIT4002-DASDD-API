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

  test("Check ads metadata pagination link #API-5", async (done) => {
    const res = await supertest(app)
      .get("/google/ads?limit=1")
      .expect("Content-Type", /json/)
      .expect(200);

    const metadata = res.body.metadata;
    expect(metadata).toMatchObject({
      page: 0,
      per_page: 1,
      page_count: 1,
      total_count: 4,
      links: {
        self: "/google/ads?limit=1&offset=0",
        first: "/google/ads?limit=1&offset=0",
        previous: "/google/ads?limit=1&offset=0",
        next: "/google/ads?limit=1&offset=1",
        last: "/google/ads?limit=1&offset=4",
      },
    });

    const res2 = await supertest(app)
      .get("/google/ads?limit=1&offset=1")
      .expect("Content-Type", /json/)
      .expect(200);

    const metadata2 = res2.body.metadata;
    expect(metadata2).toMatchObject({
      page: 1,
      per_page: 1,
      page_count: 1,
      total_count: 4,
      links: {
        self: "/google/ads?limit=1&offset=1",
        first: "/google/ads?limit=1&offset=0",
        previous: "/google/ads?limit=1&offset=0",
        next: "/google/ads?limit=1&offset=2",
        last: "/google/ads?limit=1&offset=4",
      },
    });
    done();
  });
});
