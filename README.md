# sion

## Run frontend + backend on Vercel (single project)

Yes — this repo runs as a single Vercel project:
- frontend from `client/` (Vite build)
- backend from `api/index.py` (Python serverless)

## Why `/api/join-waitlist` was returning 404

The previous Vercel config used `outputDirectory`, which can publish only the static frontend output and skip API files.
This repo now uses `version: 2` builds/routes so `/api/*` is always routed to `api/index.py`.

## Current Vercel config

- `@vercel/static-build` builds `client/package.json` (`npm ci && npm run build`)
- `@vercel/python` deploys `api/index.py`
- route `^/api/(.*)` → `/api/index.py`
- static assets are served from `/client/dist/assets/*`
- SPA fallback serves `/client/dist/index.html`

## Deploy steps

1. Push this repository.
2. In Vercel, import/select the repo.
3. Root directory should be repository root.
4. Deploy.

If the project already exists, **Redeploy** after pulling this commit.

## Environment variables

Optional:
- `FRONTEND_ORIGINS` (comma-separated)
- `FRONTEND_ORIGIN_REGEX` (example: `^https://.*\.vercel\.app$`)
- `DB_PATH` (advanced override)

Frontend behavior:
- In production, app uses same-origin `/api/...` calls.
- In development, app can use `VITE_API_BASE_URL`.

## Quick checks after deploy

- `GET https://<your-vercel-domain>/api/health` should return `{"status":"ok"}`
- submit email from UI and verify `POST /api/join-waitlist` returns 200

## Favicon note

A favicon file is added at `/favicon.svg` to avoid missing icon errors.

## Persistence note

On Vercel serverless, local writable storage is temporary (`/tmp`).
SQLite may reset between cold starts/redeploys.
For durable waitlist data, migrate to hosted DB (Vercel Postgres/Neon/Supabase/etc.).


## If API works but frontend is blank

If `/api/health` works but `/` is blank/404, it is usually a static-route target issue.
This config explicitly serves the built Vite output from `/client/dist/*`.
Redeploy after this commit and verify `/` and `/assets/...` return 200.
