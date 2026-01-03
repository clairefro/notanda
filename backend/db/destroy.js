import { pool } from "./_db.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const destroyDatabase = async () => {
  try {
    rl.question(
      "Are you sure you want to destroy the database? This action cannot be undone. (y/n): ",
      async (answer) => {
        if (answer.toLowerCase() === "y") {
          console.log("Destroying database...");

          // Drop all tables in the public schema
          await pool.query(`
            DO $$
            DECLARE
                tbl RECORD;
            BEGIN
                FOR tbl IN (
                    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
                ) LOOP
                    EXECUTE format('DROP TABLE IF EXISTS %I CASCADE', tbl.tablename);
                END LOOP;
            END $$;
          `);

          console.log("Database destroyed successfully!");
        } else {
          console.log("Action canceled. Database was not destroyed.");
        }
        rl.close();
        pool.end();
      }
    );
  } catch (err) {
    console.error("Error destroying database:", err.message);
    rl.close();
    pool.end();
  }
};

destroyDatabase();
