# Ihira Digital Operations — Vercel Deployment

Production-ready export of the Ihira Digital Operations marketing site, packaged for a
direct GitHub → Vercel deployment. No Replit-specific tooling, environment variables,
or runtime dependencies are required.

## Stack

- React 19 + Vite 7 (static SPA, code-split, `vendor`/`motion` chunks)
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- Framer Motion, Wouter router, TanStack Query
- Vercel Serverless Functions (`api/`) for form submission and lightweight analytics

## Deploy

1. Push this folder's contents to the **root** of a GitHub repository.
2. Import the repository in Vercel. Framework preset auto-detects as **Vite**
   (also declared explicitly in `vercel.json`).
3. Set environment variables in the Vercel project dashboard (all optional):
   - `PABBLY_CONTACT_WEBHOOK_URL` — webhook for the "Ask a Question" form
   - `PABBLY_PRIORITY_REQUEST_WEBHOOK_URL` — webhook for the "Request a Custom Proposal" form
     (falls back to `PABBLY_QUOTE_WEBHOOK_URL` for backward compatibility)
   - `VITE_CALENDLY_URL` — Calendly link used by every "Book Strategy Call" CTA
     (falls back to a placeholder Calendly URL if unset)
4. Deploy. No build configuration changes are needed — `vercel.json` sets the
   build command, output directory, SPA rewrites, caching, and security headers.

## Local development

```bash
npm install
npm run dev       # Vite dev server on :5173
```

To test the serverless functions locally, use the Vercel CLI instead:

```bash
npm i -g vercel
vercel dev
```

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run typecheck` — type-check the frontend (`tsconfig.json`)

## API routes

| Route                     | Method | Purpose                                   |
| -------------------------- | ------ | ------------------------------------------ |
| `/api/contact`              | POST   | "Ask a Question" form → optional webhook   |
| `/api/quote`                 | POST   | Proposal/priority request → optional webhook |
| `/api/analytics/track`       | POST   | Records a CTA click / conversion event     |
| `/api/analytics/summary`     | GET    | Returns aggregated event counts            |

Analytics counters are stored in-memory per warm serverless instance — lightweight
and dependency-free, but not durable across cold starts or multiple instances. Swap
in a real datastore (e.g. Vercel KV, Postgres) if you need durable analytics.

## Notes

- All CTA/booking links use `VITE_CALENDLY_URL` with a safe fallback, so the site
  works out of the box even before you set environment variables.
- Forms degrade gracefully — if a `PABBLY_*` webhook is not configured, submissions
  still succeed and the form still shows a success message; the event is just logged.
- Security headers, cache headers for static assets, and a client-side routing
  fallback are already configured in `vercel.json`.
