import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get(api.products.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const products = await storage.getProducts(category, search);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  // Seed data if empty
  // We'll run this check slightly delayed to ensure DB connection is up, 
  // or just run it. The route registration happens at startup.
  (async () => {
    try {
      const existing = await storage.getProducts();
      if (existing.length === 0) {
        console.log("Seeding database...");
        const seedData = [
          // Hot Deals
          { name: "Smart Watch pro", description: "High quality smart watch", price: "50.99", imageUrl: "https://framerusercontent.com/images/xbiHeFVsvZXuJkr6gD9G8l4BVlQ.jpg", category: "Hot Deals" },
          { name: "Game Pad", description: "Ultimate gaming controller", price: "1000", imageUrl: "https://framerusercontent.com/images/6ZEeWmqH9cS37oJjcqtJy1wio.jpg", category: "Hot Deals" },
          { name: "Gaming keyboard", description: "RGB Mechanical Keyboard", price: "19.99", imageUrl: "https://framerusercontent.com/images/G26NR3vaDPniJpjcXXAMXPfd3Lw.jpg", category: "Hot Deals" },

          // Discounts
          { name: "Analog-watch", description: "Classic style", price: "86", originalPrice: "96", imageUrl: "https://framerusercontent.com/images/EFxcYveZp0Wwusii7P0jbzhTw.jpg", category: "Discounts" },
          { name: "Smart Watch", description: "Next gen wearable", price: "700", originalPrice: "800", imageUrl: "https://framerusercontent.com/images/XU6DGRvG0p3HIg3UwQqeJcTTcUU.jpg", category: "Discounts" },
          { name: "Speaker Pro", description: "Surround sound", price: "16.99", originalPrice: "19.99", imageUrl: "https://framerusercontent.com/images/DKUPStf71s3Z11LvdJwf9YKY3NY.jpg", category: "Discounts" },

          // New Arrivals
          { name: "Desk Cooling Fan", description: "Stay cool while working", price: "40", originalPrice: "60", imageUrl: "https://framerusercontent.com/images/sBxBuc29BsFggE7GrXzvNhJq8A.jpg", category: "New Arrivals" },
          { name: "Laptop Stand", description: "Ergonomic stand", price: "70", originalPrice: "75", imageUrl: "https://framerusercontent.com/images/tyFWqgL9xH5xG4fAVpplbu5vjNE.jpg", category: "New Arrivals" },
          { name: "DSLR Camera", description: "Professional photography", price: "1200", originalPrice: "1400", imageUrl: "https://framerusercontent.com/images/V3XCdkAddFfoGqKelmUcT44NUPo.jpg", category: "New Arrivals" },

          // Black Friday Deals
          { name: "2TB SSD Drive", description: "Fast storage", price: "89", imageUrl: "https://framerusercontent.com/images/Eg8u27Mfu42nThZj8svky8rirGg.jpg", category: "Black Friday Deals" },
          { name: "Wireless Earbuds", description: "Noise cancelling", price: "45", imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", category: "Black Friday Deals" },
          { name: "4K Monitor", description: "Ultra HD Display", price: "299", imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", category: "Black Friday Deals" },
        ];

        for (const item of seedData) {
          await storage.createProduct(item);
        }
        console.log("Seeding complete.");
      }
    } catch (e) {
      console.error("Error seeding database:", e);
    }
  })();

  return httpServer;
}
