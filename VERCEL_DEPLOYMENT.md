# Vercel Deployment Guide for NotebookLM Clone

## 🚀 Deploy Frontend to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in
2. **Import Project**: Click "Add New" → "Project"
3. **Import from GitHub**: Select your `Notebook_LM` repository
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: Leave as default (the vercel.json will handle it)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

5. **Environment Variables** (if needed):
   - Add `VITE_API_URL` with your backend URL (if you deploy backend separately)

6. **Deploy**: Click "Deploy" and wait for the build to complete

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## ⚙️ Configuration Files

The repository includes:
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment

## 🔧 Backend Deployment

**Note**: The backend (Node.js/Express) needs to be deployed separately as Vercel is optimized for frontend/serverless functions.

### Recommended Backend Hosting Options:

1. **Railway** (Easiest)
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repo
   - Select the `backend` folder
   - Add environment variables from `.env.example`
   - Deploy automatically

2. **Render**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repo
   - Set Root Directory to `backend`
   - Add environment variables

3. **Heroku**
   - Use Heroku CLI or dashboard
   - Deploy the backend folder

### After Backend Deployment:

Update your frontend environment variable:
- In Vercel dashboard → Settings → Environment Variables
- Add: `VITE_API_URL` = `https://your-backend-url.com`
- Redeploy the frontend

## 📝 Important Notes

1. **Frontend Only**: The current Vercel deployment only deploys the frontend
2. **Backend Required**: You need to deploy the backend separately for full functionality
3. **API URL**: Make sure to update the `VITE_API_URL` environment variable in Vercel
4. **CORS**: Ensure your backend CORS settings allow requests from your Vercel domain

## 🐛 Troubleshooting

### 404 Error
- Make sure `vercel.json` is in the root directory
- Check that the build command is correct
- Verify the output directory is `frontend/dist`

### Build Fails
- Check that all dependencies are in `frontend/package.json`
- Ensure Node.js version compatibility (use Node 18+)

### API Connection Issues
- Verify `VITE_API_URL` environment variable is set
- Check backend CORS settings
- Ensure backend is deployed and running

## 🎉 Success!

Once deployed, your NotebookLM Clone frontend will be live at:
`https://your-project-name.vercel.app`

Remember to deploy the backend separately for full functionality!
