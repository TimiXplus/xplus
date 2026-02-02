import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function serveStatic(app: Express) {
  const possiblePaths = [
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "dist", "public"),
    path.resolve(__dirname, "..", "dist", "public"),
    path.resolve(__dirname, "..", "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public"),
  ];

  console.log("Current __dirname:", __dirname);
  console.log("Current process.cwd():", process.cwd());

  let distPath = possiblePaths.find((p) => {
    const exists = fs.existsSync(p);
    console.log(`Checking path: ${p} - Exists: ${exists}`);
    return exists;
  });

  if (!distPath) {
    console.error("CRITICAL: Static assets directory not found! Explored paths:", possiblePaths);

    // In Vercel, if we can't find it, let's at least respond with a useful error
    app.get("/", (_req, res) => {
      res.status(500).send("Static assets not found. Server is running but frontend is missing.");
    });
    return;
  }

  console.log("Serving static files from:", distPath);
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.get("*", (req, res) => {
    const indexPath = path.resolve(distPath!, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error("index.html not found in distPath:", distPath);
      res.status(404).send("Front-end index.html not found.");
    }
  });
}
