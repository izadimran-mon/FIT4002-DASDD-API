import { connection } from "../helpers/testConnection";

beforeEach(async () => {
  await connection.create();
  await connection.createTestData();
  return;
});

afterEach(async () => {
  await connection.clear();
  await connection.close();
  return;
});

describe("matching cities to foods", () => {
  test("Vienna <3 sausage", () => {
    expect(2 + 2).toBe(4);
  });
});
