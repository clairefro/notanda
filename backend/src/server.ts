import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.BE_PORT || 3000;

// Middleware
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Serve frontend in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

// Root route (dev)
app.get("/", (req: Request, res: Response) => {
  res.send("You are in dev - use dev port to access frontend");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
