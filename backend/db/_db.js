const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

// Load .env file only in non-production environments
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const requiredEnvVars = [
  "DB_USER",
  "DB_HOST",
  "DB_NAME",
  "DB_PASSWORD",
  "DB_PORT",
];

// check for missing env vars
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

// psql setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

const setupDatabase = async () => {
  try {
    console.log("Setting up the database...");

    // Create tables after ensuring the database exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        type TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS item_authors (
        item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
        author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
        PRIMARY KEY (item_id, author_id)
      );
    `;

    await pool.query(createTableQuery);
    console.log("Table setup complete.");
  } catch (err) {
    console.error("Error setting up the database:", err.message);
  } finally {
    console.log("Database setup complete.");
  }
};

module.exports = { pool, setupDatabase };
