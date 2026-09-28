# Personal Unsplash

## Local development

Run the backend:

```powershell
cd backend
npm.cmd run dev
```

In another terminal, run the frontend:

```powershell
cd frontend
npm.cmd run dev
```

## Deployment

Deploy the repository root as a Node service. Do not set the service root
directory to `backend`, because the build also needs access to `frontend`.
Use these commands:

- Build command: `npm run build`
- Start command: `npm start`

Add these environment variables to the deployment service:

- `MONGODB_URI`
- `VITE_CLIENT_ID`

The build command creates `frontend/dist`. Express then serves the frontend and
the `/api` routes from the same deployed URL.
