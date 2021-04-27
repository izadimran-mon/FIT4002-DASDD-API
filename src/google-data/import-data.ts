import { DBConnect } from "~/helpers/dbConnection";
import path from "path";

const main = async () => {
  const connection = await DBConnect();
  // Import bots_postgres.csv
  const botFilePath = path.resolve("src/google-data/bots_postgres.csv");
  /**
   * https://stackoverflow.com/questions/13947327/to-ignore-duplicate-keys-during-copy-from-in-postgresql
   *
   * tmp_table to copy and ignore duplicate entry
   *
   * Potential problem(s):
   * - implicit connescence with column names and schema and is not type safe
   * - order of columns needs to match with order in csv file
   * - any error will terminate the import
   */
  await connection?.manager.query(
    `
		CREATE TEMP TABLE tmp_table 
		ON COMMIT DROP
		AS
		SELECT * 
		FROM bot
		WITH NO DATA;

		COPY tmp_table("id", "username", "dob", "gender", "fName", "lName", "otherTermsCategory", "password", "locLat", "locLong", "type", "politicalRanking")
		FROM '${botFilePath}'
		DELIMITER ','
		CSV HEADER;

		INSERT INTO bot
		SELECT *
		FROM tmp_table
		ON CONFLICT DO NOTHING;
		`
  );

  const adFilePath = path.resolve("src/google-data/ads_postgres1.csv");

  await connection?.manager.query(
    `
		CREATE TEMP TABLE tmp_table 
		ON COMMIT DROP
		AS
		SELECT * 
		FROM ad
		WITH NO DATA;

		COPY tmp_table("id", "botId", "createdAt", "image", "headline", "html", "adLink", "loggedIn", "seenOn")
		FROM '${adFilePath}'
		DELIMITER ','
		CSV HEADER;

		INSERT INTO ad
		SELECT *
		FROM tmp_table
		ON CONFLICT DO NOTHING;
		`
  );

  console.log("done");
  await connection?.close();
};
main();
