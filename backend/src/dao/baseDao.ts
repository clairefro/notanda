import { Pool } from "pg";
const { pool }: { pool: Pool } = require("../../db/_db");

class BaseDao<T = any> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findAll(
    options: { orderBy?: string; order?: "ASC" | "DESC" } = {}
  ): Promise<T[]> {
    try {
      const { orderBy = "created_at", order = "DESC" } = options;
      const result = await pool.query(
        `SELECT * FROM ${this.tableName} ORDER BY ${orderBy} ${order}`
      );
      return result.rows;
    } catch (error) {
      console.error(`Error fetching from ${this.tableName}:`, error);
      throw new Error(`Failed to fetch data from ${this.tableName}`);
    }
  }

  async count(): Promise<number> {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM ${this.tableName}`);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      console.error(`Error counting ${this.tableName}:`, error);
      throw new Error(`Failed to count data in ${this.tableName}`);
    }
  }

  async findById(id: number): Promise<T | undefined> {
    try {
      const result = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching from ${this.tableName}:`, error);
      throw new Error(`Failed to fetch data from ${this.tableName}`);
    }
  }

  async create(data: Record<string, any>): Promise<T> {
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

  async update(id: number, data: Record<string, any>): Promise<T | undefined> {
    try {
      const entries = Object.entries(data);
      const setClause = entries
        .map(([key], i) => `${key} = $${i + 2}`)
        .join(", ");
      const values = [id, ...entries.map(([, value]) => value)];

      const result = await pool.query(
        `UPDATE ${this.tableName} SET ${setClause} WHERE id = $1 RETURNING *`,
        values
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw new Error(`Failed to update data in ${this.tableName}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    } catch (error) {
      console.error(`Error deleting from ${this.tableName}:`, error);
      throw new Error(`Failed to delete data from ${this.tableName}`);
    }
  }
}

export = BaseDao;
