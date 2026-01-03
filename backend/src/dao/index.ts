import BaseDao from "./baseDao";
import itemsDao from "./itemsDao";
import authorsDao from "./authorsDao";

export { itemsDao, authorsDao };

export const itemAuthorsDao = new BaseDao("item_authors");
