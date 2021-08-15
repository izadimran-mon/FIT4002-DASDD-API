import supertest from "supertest";
import { app, server } from "~/app";
import { connection } from "../testConnection";
import "jest-extended";

beforeEach(async (done) => {
  await connection.create();
  await connection.createTestData();
  done();
});

afterEach(async (done) => {
  await connection.clear();
  await connection.close();
  server.close();
  done();
});

test("Health path", async (done) => {
  await supertest(app).get("/health").expect(200);
  done();
});

test("Get many bots", async (done) => {
  const res = await supertest(app)
    .get("/bots")
    .expect("Content-Type", /json/)
    .expect(200);

  const { body } = res;
  for (const element of body) {
    expect(element).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      gender: expect.toBeOneOf(["male", "female"]),
      fName: expect.any(String),
      lName: expect.any(String),
      otherTermsCategory: expect.toBeOneOf([0, 1, 2, 3, 4, 5, 6]),
      password: expect.any(String),
      locLat: expect.any(Number),
      locLong: expect.any(Number),
      type: expect.any(String),
      politicalRanking: expect.toBeOneOf([0, 1, 2, 3, 4, 5, 6]),
    });
  }
  done();
});

test("Get bot by username", async (done) => {
  const res = await supertest(app)
    .get("/bots/bot1")
    .expect("Content-Type", /json/)
    .expect(200);

  const expected = {
    id: expect.any(String),
    username: "bot1",
    dob: "1999-07-14T00:00:00.000Z",
    gender: "male",
    fName: "First",
    lName: "Bot",
    otherTermsCategory: 0,
    password: "password123",
    locLat: -23.139826,
    locLong: 34.139062,
    type: "google",
    politicalRanking: 0,
  };

  const { body } = res;
  expect(body).toMatchObject(expected);
  done();
});
