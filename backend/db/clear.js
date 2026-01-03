import { pool } from "./_db.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearDatabase = async () => {
  try {
    const askQuestion = (query) => {
      return new Promise((resolve) => rl.question(query, resolve));
    };

    console.log("Preparing to clear the database...");

    const answer = await askQuestion(
      "Are you sure you want to clear the database? This action cannot be undone. (y/n): "
    );

    if (answer.toLowerCase() === "y") {
      console.log("Clearing database...");

      // Fetch all table names
      const result = await pool.query(`
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
      `);

      const tables = result.rows.map((row) => row.tablename);

      if (tables.length > 0) {
        // Dynamically truncate all tables
        await pool.query(
          `TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE`
        );
        console.log("Database cleared successfully!");
      } else {
        console.log("No tables found to clear.");
      }
    } else {
      console.log("Action canceled. Database was not cleared.");
    }

    console.log("Database clearing operation complete.");
  } catch (err) {
    console.error("Error clearing database:", err.message);
  } finally {
    rl.close();
    if (!pool.ended) {
      await pool.end();
    }
  }
};

clearDatabase();
