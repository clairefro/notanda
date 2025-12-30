const BaseDao = require("./baseDao");
const itemsDao = require("./itemsDao");

module.exports = {
  itemsDao: itemsDao,
  authorsDao: new BaseDao("authors"),
  itemAuthorsDao: new BaseDao("item_authors"),
};
