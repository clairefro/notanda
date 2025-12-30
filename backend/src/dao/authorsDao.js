const BaseDao = require("./baseDao");

class AuthorsDao extends BaseDao {
  constructor() {
    super("authors");
  }
}

module.exports = new AuthorsDao();
