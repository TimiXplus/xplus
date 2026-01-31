# Deployment Guide for Xplus Commerce

This guide covers the deployment process for the Xplus Commerce application. The application is built with React (Vite) on the frontend and Express on the backend, designed to run on Node.js environments.

## Prerequisites

- Node.js v20.x or higher
- PostgreSQL database
- Flutterwave API Keys

## Environment Variables

Ensure the following environment variables are set in your deployment environment (e.g., Vercel, Netlify, Render, or Railway):

```env
# Database
DATABASE_URL=postgres://user:password@host:port/dbname

# Flutterwave (Payments) - Prefix with VITE_ for frontend access
VITE_FLUTTERWAVE_PUBLIC_KEY=your_public_key
VITE_FLUTTERWAVE_SECRET_KEY=your_secret_key
VITE_FLUTTERWAVE_ENCRYPTION_KEY=your_encryption_key

# Application
NODE_ENV=production
PORT=5000
```

## Build Steps

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Build the Application**:
    This compiles the React frontend and the TypeScript backend.
    ```bash
    npm run build
    ```

3.  **Database Migration (Optional/First Run)**:
    If you are setting up the database for the first time:
    ```bash
    npm run db:push
    ```

## Start Command

To start the production server:

```bash
npm start
```

This will serve the static frontend files and the API endpoints on the specified `PORT`.

## Platform Specifics

### Vercel / Netlify (Frontend Only)
If deploying only the frontend:
- Build Command: `npm run build`
- Output Directory: `dist/public` (or just `dist` depending on configuration)
- *Note: Since this is a full-stack app with an Express backend, Vercel/Netlify are best suited if you are only hosting the static files or using serverless functions. For the full Express app, use Render or Railway.*

### Render / Railway / Heroku
These platforms act as persistent Node.js servers.
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

## Verification

After deployment, verify the following:
1.  Home page loads correctly.
2.  Products load from the backend/database.
3.  "Add to Cart" works.
4.  Currency switcher changes prices.
5.  Checkout flow triggers Flutterwave modal.

## Troubleshooting

- **White Screen on Frontend**: Check console for JS errors. Verify `VITE_` env vars are set at *build time*.
- **API Connection Error**: Ensure the frontend requests are going to the correct backend URL (proxies are handled in `vite.config.ts` for dev, but in production, the express server serves the frontend).
