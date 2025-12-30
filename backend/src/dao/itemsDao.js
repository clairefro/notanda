const BaseDao = require("./baseDao");

class ItemsDao extends BaseDao {
  constructor() {
    super("items");
  }
}

module.exports = new ItemsDao();
