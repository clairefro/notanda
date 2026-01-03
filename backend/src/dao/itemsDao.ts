import BaseDao from "./baseDao";
import { pool } from "../../db/_db.js";

class ItemsDao extends BaseDao {
  constructor() {
    super("items");
  }

  async findAllWithAuthors() {
    try {
      const query = `
        SELECT 
          i.id, 
          i.title, 
          i.type, 
          i.created_at,
          COALESCE(
            json_agg(
              json_build_object('id', a.id, 'name', a.name)
            ) FILTER (WHERE a.id IS NOT NULL),
            '[]'
          ) as authors
        FROM items i
        LEFT JOIN item_authors ia ON i.id = ia.item_id
        LEFT JOIN authors a ON ia.author_id = a.id
        GROUP BY i.id
        ORDER BY i.created_at DESC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching items with authors:", error);
      throw new Error("Failed to fetch items with authors");
    }
  }
}

export default new ItemsDao();
