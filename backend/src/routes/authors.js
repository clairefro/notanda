const express = require("express");
const router = express.Router();
const authorsDao = require("../dao/authorsDao");

// Route to get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await authorsDao.findAll(); // Use the standardized findAll method
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
});

// Route to create a new author
router.post("/", async (req, res) => {
  try {
    const newAuthor = await authorsDao.create(req.body); // Use the standardized create method
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create author" });
  }
});

module.exports = router;
