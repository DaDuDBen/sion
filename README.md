# sion

## Deploying the server on Render

1. Create a new **Web Service** in Render and connect this repository.
2. Set the **Root Directory** to `server`.
3. Use the following build/start commands:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables in Render:
   - `FRONTEND_ORIGINS`: comma-separated list of allowed client URLs (for example,
     `https://your-vercel-app.vercel.app`).

## Connecting the Vercel client

Set the following environment variable in Vercel so the client knows where to
reach the Render API:

```
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

After the deploy, the client will post to:
`/api/join-waitlist` on the Render service.
