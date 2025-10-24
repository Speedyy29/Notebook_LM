# 🚀 Deployment Guide

Complete guide for deploying NotebookLM Clone to production.

## 📋 Pre-Deployment Checklist

- [ ] OpenAI API key ready
- [ ] GitHub repository created (optional but recommended)
- [ ] Domain name (optional)
- [ ] Netlify account (for frontend)
- [ ] Render/Vercel account (for backend)

## 🎯 Deployment Options

### Option 1: Netlify (Frontend) + Render (Backend)
**Recommended for beginners**

### Option 2: Vercel (Full-stack)
**Good for Next.js-like deployments**

### Option 3: Self-hosted (VPS)
**For advanced users**

---

## 🌐 Frontend Deployment (Netlify)

### Method 1: Deploy via Netlify UI

1. **Build the frontend locally:**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `dist` folder
   - Wait for deployment

3. **Configure environment variables:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`
   - Redeploy the site

### Method 2: Deploy via Git

1. **Push code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/notebooklm-clone.git
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to Netlify → "Add new site" → "Import from Git"
   - Select your repository
   - Configure build settings:
     - **Base directory:** `frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `frontend/dist`
   - Add environment variable: `VITE_API_URL`
   - Click "Deploy site"

3. **Custom domain (optional):**
   - Go to Domain settings
   - Add custom domain
   - Update DNS records

---

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare for Deployment

1. **Update package.json:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. **Create render.yaml (optional):**
```yaml
services:
  - type: web
    name: notebooklm-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: OPENAI_API_KEY
        sync: false
      - key: FRONTEND_URL
        sync: false
```

### Step 2: Deploy to Render

1. **Create new Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Or use "Deploy from Git URL"

2. **Configure service:**
   - **Name:** notebooklm-backend
   - **Environment:** Node
   - **Region:** Choose closest to your users
   - **Branch:** main
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

3. **Add environment variables:**
   - `OPENAI_API_KEY` = your-api-key
   - `NODE_ENV` = production
   - `FRONTEND_URL` = https://your-netlify-url.netlify.app
   - `PORT` = 5000 (Render will override this)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the service URL

### Step 3: Update Frontend

Update frontend environment variable:
- `VITE_API_URL` = `https://your-render-url.onrender.com`
- Redeploy frontend on Netlify

---

## 🔧 Backend Deployment (Vercel)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Configure for Vercel

Create `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Step 3: Deploy

```bash
cd backend
vercel
```

Follow prompts and add environment variables when asked.

---

## 🐳 Docker Deployment (Advanced)

### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NODE_ENV=production
      - FRONTEND_URL=http://localhost:3000
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:5000
    depends_on:
      - backend
    restart: unless-stopped
```

Deploy:
```bash
docker-compose up -d
```

---

## 🔒 Security Best Practices

### Backend
- [ ] Use HTTPS in production
- [ ] Set secure CORS origins
- [ ] Rate limiting for API endpoints
- [ ] Input validation and sanitization
- [ ] Secure environment variables
- [ ] Regular dependency updates

### Frontend
- [ ] Use HTTPS
- [ ] Content Security Policy headers
- [ ] XSS protection
- [ ] Secure API communication

---

## 📊 Monitoring & Logging

### Render
- Built-in logs in dashboard
- Set up log drains for external services

### Vercel
- Real-time logs in dashboard
- Analytics available

### Custom Monitoring
- Use services like:
  - **Sentry** for error tracking
  - **LogRocket** for session replay
  - **DataDog** for comprehensive monitoring

---

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Netlify
        run: |
          npm install -g netlify-cli
          cd frontend
          npm install
          npm run build
          netlify deploy --prod --dir=dist --auth=${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

## 🧪 Testing Before Deployment

1. **Build locally:**
```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
NODE_ENV=production npm start
```

2. **Test all features:**
   - Upload PDF
   - Chat functionality
   - Citations
   - PDF navigation

3. **Check performance:**
   - Page load times
   - API response times
   - PDF rendering speed

---

## 📈 Post-Deployment

### Monitor
- Check error logs regularly
- Monitor API usage and costs
- Track user feedback

### Optimize
- Enable caching
- Compress assets
- Optimize images
- Use CDN for static files

### Maintain
- Update dependencies monthly
- Monitor OpenAI API changes
- Backup data (if using database)
- Review security advisories

---

## 💰 Cost Estimates

### Netlify (Frontend)
- **Free tier:** 100GB bandwidth/month
- **Pro:** $19/month for more bandwidth

### Render (Backend)
- **Free tier:** Available (sleeps after inactivity)
- **Starter:** $7/month (always on)
- **Standard:** $25/month (more resources)

### OpenAI API
- **GPT-4o-mini:** ~$0.15 per 1M input tokens
- **Embeddings:** ~$0.02 per 1M tokens
- **Estimated:** $5-20/month for moderate use

### Total Monthly Cost
- **Hobby:** $0-10 (free tiers + minimal API usage)
- **Production:** $30-50 (paid hosting + moderate API usage)

---

## 🆘 Troubleshooting Deployment

### Build Fails
- Check Node.js version
- Verify all dependencies in package.json
- Check build logs for errors

### Environment Variables Not Working
- Ensure variables are set in platform
- Restart/redeploy after adding variables
- Check variable names (case-sensitive)

### CORS Errors
- Update FRONTEND_URL in backend
- Check CORS configuration
- Ensure both services are HTTPS

### API Errors
- Verify OpenAI API key
- Check API quotas
- Review error logs

---

**Deployment complete! 🎉**
