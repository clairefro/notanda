const express = require("express");
const { itemsDao } = require("../dao");

const router = express.Router();

// Example route to get all items
router.get("/", async (req, res) => {
  try {
    const items = await itemsDao.findAllWithAuthors();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Example route to create a new item
router.post("/", async (req, res) => {
  try {
    const newItem = await itemsDao.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

module.exports = router;
