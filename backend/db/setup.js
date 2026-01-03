import { pool } from "./_db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    console.log("Setting up the database...");

    const schemaSQL = fs.readFileSync(
      path.join(__dirname, "schema.sql"),
      "utf8"
    );

    await pool.query(schemaSQL);
    console.log("Table setup complete.");
    console.log("Database setup script executed successfully.");
  } catch (err) {
    console.error("Error executing database setup script:", err.message);
  } finally {
    await pool.end();
  }
})();
