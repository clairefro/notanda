import BaseDao from "./baseDao";

class AuthorsDao extends BaseDao {
  constructor() {
    super("authors");
  }
}

export default new AuthorsDao();
