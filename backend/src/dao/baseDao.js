const pool = require("../../db/_db");

class BaseDao {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll() {
    try {
      const result = await pool.query(`SELECT * FROM ${this.tableName}`);
      return result.rows;
    } catch (error) {
      console.error(`Error fetching from ${this.tableName}:`, error);
      throw new Error(`Failed to fetch data from ${this.tableName}`);
    }
  }

  async create(data) {
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

      const result = await pool.query(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error inserting into ${this.tableName}:`, error);
      throw new Error(`Failed to insert data into ${this.tableName}`);
    }
  }
}

module.exports = BaseDao;
