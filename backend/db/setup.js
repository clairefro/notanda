const { pool } = require("./_db");
const fs = require("fs");
const path = require("path");

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
