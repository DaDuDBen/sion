# sion

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
