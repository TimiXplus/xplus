import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../server/index";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // The server/index.ts module uses top-level await, so by the time
    // this import resolves, all routes are already registered.
    return app(req, res);
}
