import express from "express";
import itemsRouter from "./items";
import authorsRouter from "./authors";

const router = express.Router();

// Import and use individual route modules
router.use("/items", itemsRouter);
router.use("/authors", authorsRouter);

export default router;
