# Testing

## Setting up test environment

We are using Jest as our testing framework. Currently we need to manually create a Postgres database (**a different one from development and production since this database will be wiped**) and put the credentials in a `.test.env` file in the root folder of the project. An example of `.test.env` can be seen below:

```env
PORT=5000
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="fit4002-test"
DB_USERNAME="postgres"
DB_PASSWORD="postgres"
DB_SYNC=true
DB_LOGS=false
NODE_ENV=test
CLIENT_ORIGIN=http://localhost:3000
```

## To run test

`yarn test`

## Test files structure

- `.test.env`: store test database credentials and application configurations
- `jest.config.js`: [Jest configuration](https://jestjs.io/docs/configuration)
- `src/tests`: test related documents and utilities
  - `testConnection.ts`: database connection, create and clean up test data
- `src/tests/__tests__`: store test files
  - test files should follow format `*/test.ts`

## Example test setup

Example test setup can be seen in `src/tests/__tests__/botRoute.test.ts`.

A typical test setup before and after each test case can be seen below:

```typescript
import { connection } from "../testConnection";

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
```

The purpose of this setup is that the test data is created and cleared after **each** test and thus narrowing down the impact of a test case to its own scope and doesn't affect other test cases (i.e. you can run test cases out of order). More on scope of test setup and teardown: https://jestjs.io/docs/setup-teardown.

You can modify the `connection.createTestData();` function (or create additional functions) to add your own test data.

## Current limitations and concerns

- **TODO**: Create a script to create the database automatically (for easier integration with CI pipeline).
- **TODO**: Integrate with CI pipeline
- Run tests on the built `js` files instead of `ts` files.
- Tests are being run with `--runInBand` config. This disallows running tests in parallel and is to prevent race conditions when reading and writing to the database. The disadvantage is that performance is greatly reduced and may be a problem when we have a large number of tests.
  - An alternative is to have each test case create and use an in-memory database. The problem is that I think only SQLite is available as in-memory.
- These tests are essentially integration tests so it may be difficult to debug. Consider unit tests with mocking?
- How to plan and document test cases
