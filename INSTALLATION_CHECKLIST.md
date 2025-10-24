# ✅ Installation Checklist

Use this checklist to ensure everything is set up correctly.

## Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] OpenAI API key ready
- [ ] Text editor/IDE installed (VS Code recommended)
- [ ] Git installed (optional)

## Backend Setup

### 1. Navigate to Backend
```bash
cd backend
```
- [ ] Successfully navigated to backend directory

### 2. Install Dependencies
```bash
npm install
```
- [ ] All packages installed without errors
- [ ] `node_modules` folder created
- [ ] `package-lock.json` created

### 3. Configure Environment
```bash
cp .env.example .env
```
- [ ] `.env` file created
- [ ] Opened `.env` in editor
- [ ] Added OpenAI API key: `OPENAI_API_KEY=sk-...`
- [ ] Verified no extra spaces in `.env`

### 4. Verify Installation
```bash
npm list
```
- [ ] No missing dependencies
- [ ] No vulnerability warnings (or acceptable)

### 5. Test Backend
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See message: "🚀 Server running on port 5000"
- [ ] No error messages in console
- [ ] Can access http://localhost:5000/api/health

**Backend Status:** ✅ Ready / ❌ Issues

---

## Frontend Setup

### 1. Navigate to Frontend
```bash
cd frontend
```
- [ ] Successfully navigated to frontend directory

### 2. Install Dependencies
```bash
npm install
```
- [ ] All packages installed without errors
- [ ] `node_modules` folder created
- [ ] `package-lock.json` created

### 3. Configure Environment
```bash
cp .env.example .env
```
- [ ] `.env` file created
- [ ] Contains: `VITE_API_URL=http://localhost:5000`

### 4. Verify Installation
```bash
npm list
```
- [ ] No missing dependencies
- [ ] No vulnerability warnings (or acceptable)

### 5. Test Frontend
```bash
npm run dev
```
- [ ] Vite server starts without errors
- [ ] Browser opens automatically (or manually open http://localhost:3000)
- [ ] See upload screen
- [ ] No errors in browser console (F12)

**Frontend Status:** ✅ Ready / ❌ Issues

---

## Integration Testing

### 1. Both Servers Running
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Both terminals showing no errors

### 2. Upload Test
- [ ] Can see upload screen
- [ ] Drag-and-drop area visible
- [ ] Can click to browse files

### 3. PDF Upload Test
- [ ] Select a small PDF (1-5 pages recommended for first test)
- [ ] Upload starts
- [ ] Progress bar appears
- [ ] Upload completes successfully
- [ ] Chat screen appears

### 4. Chat Test
- [ ] Can see PDF viewer on right
- [ ] Can see chat interface on left
- [ ] Can type in message input
- [ ] Can send a message
- [ ] AI responds with answer
- [ ] Citations appear in response

### 5. Citation Test
- [ ] Click on a citation (e.g., [Page 2])
- [ ] PDF scrolls to that page
- [ ] Page number updates in viewer

### 6. PDF Viewer Test
- [ ] Can navigate pages (prev/next buttons)
- [ ] Can zoom in/out
- [ ] PDF renders correctly
- [ ] All pages visible when scrolling

**Integration Status:** ✅ Working / ❌ Issues

---

## Common Issues & Fixes

### Backend Won't Start

**Issue:** Port 5000 already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Issue:** OpenAI API key error
- [ ] Check `.env` file exists
- [ ] Verify key starts with `sk-`
- [ ] No spaces around `=`
- [ ] Restart server after adding key

**Issue:** Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Frontend Won't Start

**Issue:** Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Issue:** Vite errors
```bash
rm -rf node_modules package-lock.json .vite
npm install
```

### Upload Fails

**Issue:** CORS error
- [ ] Verify backend is running
- [ ] Check `FRONTEND_URL` in backend `.env`
- [ ] Restart both servers

**Issue:** File too large
- [ ] Use PDF under 50MB
- [ ] Or compress PDF first

**Issue:** Invalid file type
- [ ] Ensure file is actually a PDF
- [ ] Check file extension is `.pdf`

### Chat Not Working

**Issue:** No response
- [ ] Check backend console for errors
- [ ] Verify OpenAI API key is valid
- [ ] Check OpenAI account has credits
- [ ] Check internet connection

**Issue:** Citations not working
- [ ] Verify PDF is fully loaded
- [ ] Check browser console for errors
- [ ] Try refreshing page

---

## Verification Commands

### Check Node.js Version
```bash
node --version
# Should be v18.0.0 or higher
```

### Check npm Version
```bash
npm --version
# Should be 9.0.0 or higher
```

### Check Backend Health
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok",...}
```

### Check Frontend Build
```bash
cd frontend
npm run build
# Should create dist/ folder without errors
```

---

## Final Checklist

### Environment
- [ ] Node.js 18+ installed
- [ ] npm working correctly
- [ ] OpenAI API key obtained
- [ ] Both `.env` files configured

### Backend
- [ ] Dependencies installed
- [ ] Server starts successfully
- [ ] Health endpoint responds
- [ ] No console errors

### Frontend
- [ ] Dependencies installed
- [ ] Dev server starts
- [ ] Page loads in browser
- [ ] No console errors

### Integration
- [ ] Can upload PDF
- [ ] Can chat with AI
- [ ] Citations work
- [ ] PDF viewer works

### Documentation
- [ ] Read README.md
- [ ] Reviewed SETUP_GUIDE.md
- [ ] Know where to find help

---

## Next Steps

After completing this checklist:

1. **Explore Features**
   - Try different PDFs
   - Test various questions
   - Experiment with citations

2. **Read Documentation**
   - API_DOCUMENTATION.md for API details
   - DEPLOYMENT.md for deploying
   - TROUBLESHOOTING.md for issues

3. **Customize**
   - Change colors in tailwind.config.js
   - Modify suggested questions
   - Adjust file size limits

4. **Deploy** (Optional)
   - Follow DEPLOYMENT.md
   - Deploy to Netlify + Render
   - Configure production environment

---

## Support

If you encounter issues:

1. ✅ Check this checklist again
2. 📖 Review TROUBLESHOOTING.md
3. 🔍 Check browser/server console
4. 📚 Review documentation
5. 🆘 Create an issue with details

---

**Installation Complete!** 🎉

Date: _______________  
Status: ✅ Success / ❌ Needs Attention  
Notes: _________________________________
