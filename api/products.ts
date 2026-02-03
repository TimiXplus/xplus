import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { api } from '../shared/routes.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method, url } = req;
    const path = url || '';

    try {
        // Products list: GET /api/products
        if (method === 'GET' && (path === '/api/products' || path.startsWith('/api/products?'))) {
            const category = req.query.category as string | undefined;
            const search = req.query.search as string | undefined;
            const products = await storage.getProducts(category, search);
            return res.status(200).json(products);
        }

        // Single product: GET /api/products/:id
        const productMatch = path.match(/^\/api\/products\/(\d+)/);
        if (method === 'GET' && productMatch) {
            const id = parseInt(productMatch[1]);
            const product = await storage.getProduct(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        }

        // Product reviews: GET /api/products/:id/reviews
        const reviewsMatch = path.match(/^\/api\/products\/(\d+)\/reviews/);
        if (method === 'GET' && reviewsMatch) {
            const productId = parseInt(reviewsMatch[1]);
            const reviews = await storage.getReviews(productId);
            return res.status(200).json(reviews);
        }

        // Health check: GET /api/health
        if (method === 'GET' && path === '/api/health') {
            return res.status(200).json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                env: process.env.NODE_ENV,
                db: !!process.env.DATABASE_URL
            });
        }

        return res.status(404).json({ message: 'API route not found' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
