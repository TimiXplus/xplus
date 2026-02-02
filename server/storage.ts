import { products, users, reviews, type Product, type InsertProduct, type User, type InsertUser, type Review, type InsertReview } from "../shared/schema.js";
import { db } from "./db.js";
import { eq, ilike } from "drizzle-orm";

export interface IStorage {
  getProducts(category?: string, search?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;

  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  deleteProduct(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private users: Map<number, User>;
  private reviews: Map<number, Review>;
  currentId: number;
  currentUserId: number;
  currentReviewId: number;

  constructor() {
    this.products = new Map();
    this.users = new Map();
    this.reviews = new Map();
    this.currentId = 1;
    this.currentUserId = 1;
    this.currentReviewId = 1;
  }

  async getProducts(category?: string, search?: string): Promise<Product[]> {
    let all = Array.from(this.products.values());
    if (category) all = all.filter(p => p.category === category);
    if (search) all = all.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return all;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = {
      ...insertProduct,
      id,
      originalPrice: insertProduct.originalPrice ?? null,
      specifications: insertProduct.specifications ?? null,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, update: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    const updated = {
      ...existing,
      ...update,
      originalPrice: update.originalPrice !== undefined ? update.originalPrice : existing.originalPrice,
      specifications: update.specifications !== undefined ? update.specifications : existing.specifications,
    };
    this.products.set(id, updated);
    return updated;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, role: insertUser.role ?? "user" };
    this.users.set(id, user);
    return user;
  }

  async getReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.productId === productId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    return review;
  }

  async deleteProduct(id: number): Promise<void> {
    this.products.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  async getProducts(category?: string, search?: string): Promise<Product[]> {
    let query = db.select().from(products);
    if (category) query = query.where(eq(products.category, category));
    if (search) query = query.where(ilike(products.name, `%${search}%`));
    return await query;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async updateProduct(id: number, update: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db.update(products).set(update).where(eq(products.id, id)).returning();
    return product;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getReviews(productId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.productId, productId));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
}

export let storage: IStorage;

if (process.env.DATABASE_URL && db) {
  storage = new DatabaseStorage();
} else {
  storage = new MemStorage();
}
