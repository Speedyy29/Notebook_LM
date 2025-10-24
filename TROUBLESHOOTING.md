# 🔧 Troubleshooting Guide

Common issues and their solutions for NotebookLM Clone.

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [PDF Upload Issues](#pdf-upload-issues)
- [Chat Issues](#chat-issues)
- [OpenAI API Issues](#openai-api-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### Node.js Version Error

**Problem:** `Error: The engine "node" is incompatible`

**Solution:**
```bash
# Check your Node.js version
node --version

# Should be 18.0.0 or higher
# If not, install the latest LTS version from nodejs.org
```

### npm Install Fails

**Problem:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

### Permission Errors (Linux/Mac)

**Problem:** `EACCES: permission denied`

**Solution:**
```bash
# Don't use sudo! Instead, fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## Backend Issues

### Server Won't Start

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### OpenAI API Key Error

**Problem:** `Error: OPENAI_API_KEY is not defined`

**Solution:**
1. Check `.env` file exists in backend directory
2. Verify key is set: `OPENAI_API_KEY=sk-...`
3. No spaces around the `=`
4. Restart the server after adding key

### Module Not Found

**Problem:** `Error: Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### PDF Parse Error

**Problem:** `Failed to parse PDF`

**Solution:**
- Ensure PDF is not corrupted
- Try a different PDF
- Check file is actually a PDF (not renamed)
- Verify pdf-parse is installed: `npm list pdf-parse`

---

## Frontend Issues

### Vite Server Won't Start

**Problem:** `Error: Cannot find module 'vite'`

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 Already in Use

**Problem:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### White Screen / Blank Page

**Problem:** App shows blank white screen

**Solution:**
1. Check browser console for errors (F12)
2. Verify backend is running
3. Check VITE_API_URL in `.env`
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try incognito mode

### React PDF Not Loading

**Problem:** PDF viewer shows error or blank

**Solution:**
1. Check console for PDF.js errors
2. Verify PDF file is valid
3. Check network tab for worker.js loading
4. Try different PDF
5. Clear cache and reload

---

## PDF Upload Issues

### Upload Fails Immediately

**Problem:** Upload fails with "No file uploaded"

**Solution:**
- Ensure file input name is "pdf"
- Check file is selected before upload
- Verify backend route is correct
- Check CORS settings

### File Too Large Error

**Problem:** `File size exceeds 50MB limit`

**Solution:**
- Compress PDF using online tools
- Split large PDF into smaller parts
- Or increase limit in backend:
  ```javascript
  // backend/routes/pdfRoutes.js
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
  ```

### Upload Stuck at 100%

**Problem:** Upload reaches 100% but doesn't complete

**Solution:**
- Check backend logs for errors
- Verify OpenAI API is working
- Check network connection
- Increase timeout if large file:
  ```javascript
  // frontend/src/utils/api.js
  timeout: 120000 // 2 minutes
  ```

### Invalid File Type

**Problem:** `Only PDF files are allowed`

**Solution:**
- Ensure file extension is `.pdf`
- File might be corrupted
- Try re-saving PDF
- Check MIME type is `application/pdf`

---

## Chat Issues

### No Response from AI

**Problem:** Message sent but no response

**Solution:**
1. Check backend logs for errors
2. Verify OpenAI API key is valid
3. Check API quota/billing
4. Verify document was uploaded successfully
5. Check network tab for failed requests

### Citations Not Working

**Problem:** Clicking citations doesn't scroll PDF

**Solution:**
1. Check page number is valid
2. Verify PDF is fully loaded
3. Check browser console for errors
4. Try refreshing the page

### Slow Responses

**Problem:** AI takes too long to respond

**Solution:**
- Normal for first request (cold start)
- Check internet connection
- Verify OpenAI API status
- Consider using faster model
- Check backend isn't processing multiple requests

### Error: Document Not Found

**Problem:** `Document not found in vector store`

**Solution:**
- Upload was interrupted
- Server restarted (in-memory storage)
- Re-upload the document
- For production, use persistent storage

---

## OpenAI API Issues

### Authentication Error

**Problem:** `Error: Incorrect API key provided`

**Solution:**
1. Verify API key is correct
2. Check for extra spaces
3. Ensure key starts with `sk-`
4. Generate new key if needed
5. Check key hasn't been revoked

### Rate Limit Error

**Problem:** `Error: Rate limit exceeded`

**Solution:**
- Wait a few minutes
- Upgrade OpenAI plan
- Implement request queuing
- Add retry logic with backoff

### Insufficient Quota

**Problem:** `Error: You exceeded your current quota`

**Solution:**
1. Add payment method to OpenAI account
2. Purchase credits
3. Check billing dashboard
4. Verify payment method is valid

### Model Not Found

**Problem:** `Error: Model not found`

**Solution:**
- Check model name is correct
- Verify you have access to model
- Update to available model:
  ```javascript
  // backend/utils/openaiClient.js
  export const CHAT_MODEL = 'gpt-3.5-turbo';
  ```

---

## Deployment Issues

### Build Fails

**Problem:** `npm run build` fails

**Solution:**
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build

# Check for TypeScript errors
# Check for missing dependencies
```

### Environment Variables Not Working

**Problem:** Variables not loaded in production

**Solution:**
- Netlify: Set in Site settings → Environment variables
- Render: Set in Environment tab
- Vercel: Set in Settings → Environment Variables
- Restart/redeploy after adding variables

### CORS Errors in Production

**Problem:** `Access-Control-Allow-Origin` error

**Solution:**
```javascript
// backend/server.js
app.use(cors({
  origin: [
    'https://your-frontend.netlify.app',
    'https://www.your-domain.com'
  ],
  credentials: true
}));
```

### 404 on Netlify

**Problem:** Page refresh gives 404

**Solution:**
Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

---

## Performance Issues

### Slow PDF Loading

**Problem:** PDF takes long to load

**Solution:**
- Compress PDF before upload
- Optimize PDF (remove unnecessary elements)
- Use progressive loading
- Implement lazy loading for pages

### High Memory Usage

**Problem:** Browser/server using too much memory

**Solution:**
- Limit number of loaded pages
- Clear old documents from memory
- Implement pagination
- Use worker threads for processing

### Slow Vectorization

**Problem:** Upload processing takes too long

**Solution:**
- Normal for large PDFs
- Show progress indicator
- Process pages in batches
- Use faster embedding model
- Consider background processing

---

## Browser-Specific Issues

### Safari Issues

**Problem:** Features not working in Safari

**Solution:**
- Update to latest Safari version
- Check for webkit-specific CSS issues
- Test with Safari developer tools
- Consider polyfills for missing features

### Firefox Issues

**Problem:** PDF rendering issues in Firefox

**Solution:**
- Update Firefox
- Check PDF.js compatibility
- Clear Firefox cache
- Disable strict tracking protection temporarily

---

## Development Issues

### Hot Reload Not Working

**Problem:** Changes not reflecting

**Solution:**
```bash
# Restart dev server
# Clear .vite cache
rm -rf frontend/.vite

# Check file watcher limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### ESLint Errors

**Problem:** Linting errors preventing build

**Solution:**
```bash
# Fix auto-fixable issues
npm run lint -- --fix

# Or disable for build
# vite.config.js
build: {
  rollupOptions: {
    onwarn(warning, warn) {
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
      warn(warning);
    }
  }
}
```

---

## Database Issues (Future)

When implementing persistent storage:

### Connection Failed

**Solution:**
- Check database credentials
- Verify database is running
- Check firewall settings
- Verify connection string

### Migration Errors

**Solution:**
- Check migration files
- Verify database permissions
- Run migrations manually
- Check for conflicting migrations

---

## Getting Help

If you're still stuck:

1. **Check Logs:**
   - Backend: Terminal where server is running
   - Frontend: Browser console (F12)
   - Network: Browser Network tab

2. **Search Issues:**
   - Check GitHub issues
   - Search Stack Overflow
   - Check OpenAI status page

3. **Debug Steps:**
   ```bash
   # Enable debug mode
   # Backend
   DEBUG=* npm run dev
   
   # Frontend
   VITE_DEBUG=true npm run dev
   ```

4. **Create Issue:**
   - Include error messages
   - Include steps to reproduce
   - Include environment details
   - Include relevant logs

---

## Useful Commands

```bash
# Check versions
node --version
npm --version

# Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json

# Reset everything
git clean -fdx
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update

# Check for security issues
npm audit
npm audit fix
```

---

## Common Error Messages

| Error | Likely Cause | Solution |
|-------|-------------|----------|
| ECONNREFUSED | Backend not running | Start backend server |
| CORS error | Wrong origin | Update CORS config |
| 401 Unauthorized | Invalid API key | Check OpenAI key |
| 413 Payload Too Large | File too big | Reduce file size |
| 429 Too Many Requests | Rate limited | Wait and retry |
| 500 Internal Server Error | Server crash | Check backend logs |

---

**Still need help? Check the main README or create an issue!**
