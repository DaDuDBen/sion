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
## Deploying the backend on Render

1. In Render, click **New +** → **Web Service** and connect this repository.
2. Configure the service:
   - **Name:** (any name, e.g. `sion-backend`)
   - **Root Directory:** `server`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Add environment variables in Render:
   - `FRONTEND_ORIGINS=https://threefive-oel9-82swslw2k-jpsanjjey-1004s-projects.vercel.app`
   - `DB_PATH=/var/data/waitlist.db`
4. (Recommended) In Render, attach a **Disk** and mount it at `/var/data` so waitlist data persists across deploys.
5. Deploy the service and copy your Render URL (example: `https://sion-backend.onrender.com`).

### Verify backend deployment

After deploy, open:

- `https://<your-render-service>.onrender.com/api/health`

You should see:

```json
{"status":"ok"}
```

## Connecting the Vercel frontend to Render

In your Vercel project settings, set:

- `VITE_API_BASE_URL=https://<your-render-service>.onrender.com`

Then redeploy Vercel so the frontend uses the new backend URL.

## CORS note

The backend only allows origins listed in `FRONTEND_ORIGINS` (plus localhost defaults for development), so keep this value in sync with your deployed frontend URL.
