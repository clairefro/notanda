import express, { Request, Response } from "express";
const authorsDao = require("../dao/authorsDao");

const router = express.Router();

// Route to get all authors
router.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await authorsDao.findAll(); // Use the standardized findAll method
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
});

// Route to create a new author
router.post("/", async (req: Request, res: Response) => {
  try {
    const newAuthor = await authorsDao.create(req.body); // Use the standardized create method
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create author" });
  }
});

export default router;
