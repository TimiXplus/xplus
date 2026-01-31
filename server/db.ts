import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

export let db: any = null;
export let pool: any = null;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL must be set for DatabaseStorage. Falling back to in-memory storage.",
  );
} else {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000
    });
    db = drizzle(pool, { schema });
    console.log("Database connection initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database connection:", error);
    db = null;
    pool = null;
  }
}
