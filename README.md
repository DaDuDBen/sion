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
- root `requirements.txt` so Vercel installs Python deps for `api/index.py`

Because API and frontend are on the same Vercel project/domain, the frontend should call `/api/...` on the same domain.
In production builds, the app now ignores `VITE_API_BASE_URL` and uses same-origin calls.

## Deploy steps

1. Push this repository.
2. In Vercel, create/import a project from this repo.
3. Keep root at repository root.
4. Deploy.

Optional env vars:
- `FRONTEND_ORIGINS` (comma-separated)
- `FRONTEND_ORIGIN_REGEX` (example: `^https://.*\.vercel\.app$`)
- `DB_PATH` (advanced override)

## If it still fails (important)

1. In Vercel project settings, remove old `VITE_API_BASE_URL` values pointing to Render/other domains.
2. Redeploy the project.
3. Check function logs for `api/index.py`.
4. Verify:
   - `GET https://<your-vercel-domain>/api/health` returns `{"status":"ok"}`

## Important data persistence note

On Vercel serverless, writable storage is temporary (`/tmp`).
SQLite can reset between cold starts/redeploys.
For durable waitlist storage, migrate to hosted DB (Vercel Postgres/Neon/Supabase/etc.).
