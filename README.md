# sion

## Run frontend + backend on Vercel (single project)

Yes — this repo can run fully on Vercel:
- frontend is built from `client/`
- backend runs as a Python Serverless Function at `api/index.py`

## What was added

- `api/index.py` exposes:
  - `POST /api/join-waitlist`
  - `GET /api/waitlist-count`
  - `GET /api/health`
- `vercel.json` builds and serves the Vite frontend from `client/dist`

Because API and frontend are on the same Vercel project/domain, your current frontend code can call `/api/...` directly (no cross-domain setup required).

## Deploy steps

1. Push this repository.
2. In Vercel, create/import a project from this repo.
3. Keep root at repository root (`/workspace/sion` in local terms).
4. Deploy.

Optional environment variables (Project → Settings → Environment Variables):
- `FRONTEND_ORIGINS` (comma-separated)
- `FRONTEND_ORIGIN_REGEX` (example: `^https://.*\.vercel\.app$`)
- `DB_PATH` (advanced override)

## Important data persistence note

On Vercel serverless, writable storage is temporary (`/tmp`).
If you keep SQLite in serverless, waitlist data can reset between cold starts/redeploys.

For production persistence, move waitlist storage to a hosted DB (e.g. Vercel Postgres, Neon, Supabase, PlanetScale, etc.).

## Quick verification after deploy

- `GET https://<your-vercel-domain>/api/health` → `{"status":"ok"}`
- submit email from the page and confirm `POST /api/join-waitlist` works
