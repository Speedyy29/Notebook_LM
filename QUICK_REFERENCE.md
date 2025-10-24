# ⚡ Quick Reference Guide

Fast lookup for common tasks and commands.

## 🚀 Getting Started

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Add OPENAI_API_KEY to .env
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📝 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=sk-your-key-here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/pdf/upload` | Upload PDF |
| GET | `/api/pdf/:id` | Get metadata |
| DELETE | `/api/pdf/:id` | Delete document |
| POST | `/api/chat` | Send message |
| GET | `/api/chat/suggestions/:id` | Get suggestions |

## 💻 Common Commands

### Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Install dependencies
npm install

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Production
```bash
# Build frontend
cd frontend && npm run build

# Start backend (production)
cd backend && npm start

# Preview frontend build
cd frontend && npm run preview
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npx prettier --write .

# Check for updates
npm outdated
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | `lsof -ti:5000 \| xargs kill -9` |
| Module not found | `npm install` |
| API key error | Check `.env` file |
| CORS error | Verify both servers running |
| White screen | Check browser console |
| Upload fails | Check file is PDF, <50MB |

## 📂 Project Structure

```
notebooklm-clone/
├── backend/          # Node.js API
│   ├── controllers/  # Business logic
│   ├── routes/       # API routes
│   ├── utils/        # Utilities
│   └── server.js     # Entry point
├── frontend/         # React app
│   └── src/
│       ├── components/  # UI components
│       ├── pages/       # Page components
│       ├── utils/       # Utilities
│       └── App.jsx      # Root component
└── docs/            # Documentation
```

## 🎯 Key Files

### Backend
- `server.js` - Main server
- `controllers/pdfController.js` - PDF handling
- `controllers/chatController.js` - Chat logic
- `utils/vectorStore.js` - Vector database
- `utils/openaiClient.js` - OpenAI integration

### Frontend
- `App.jsx` - Main app component
- `pages/UploadScreen.jsx` - Upload UI
- `pages/ChatScreen.jsx` - Chat UI
- `components/PDFViewer.jsx` - PDF display
- `utils/api.js` - API client

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables |
| `.eslintrc.json` | Linting rules |
| `.prettierrc` | Code formatting |
| `.editorconfig` | Editor settings |
| `tailwind.config.js` | Tailwind setup |
| `vite.config.js` | Vite configuration |

## 📊 Tech Stack

### Backend
- Node.js + Express
- OpenAI API
- pdf-parse
- multer

### Frontend
- React 18
- Vite
- TailwindCSS
- react-pdf
- Framer Motion

## 🎨 Styling

### Tailwind Classes
```jsx
// Primary button
className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg"

// Card
className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"

// Input
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
```

### Custom CSS
```css
/* Loading dots */
.loading-dots { ... }

/* Citation button */
.citation-btn { ... }

/* Message bubble */
.message-bubble { ... }

/* Custom scrollbar */
.custom-scrollbar { ... }
```

## 🔐 Security Checklist

- [ ] OpenAI API key in `.env` (not committed)
- [ ] CORS configured correctly
- [ ] File type validation enabled
- [ ] File size limits set
- [ ] Input sanitization in place
- [ ] HTTPS in production
- [ ] Environment variables secured

## 📈 Performance Tips

1. **Optimize PDFs** before upload
2. **Compress images** in PDFs
3. **Use smaller models** if needed
4. **Implement caching** for production
5. **Enable CDN** for static assets
6. **Monitor API usage** regularly

## 🚀 Deployment Checklist

### Frontend (Netlify)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variable: `VITE_API_URL`
- [ ] Custom domain configured (optional)

### Backend (Render)
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables set
- [ ] Health check endpoint working

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| README.md | Main documentation |
| SETUP_GUIDE.md | Quick start |
| API_DOCUMENTATION.md | API reference |
| DEPLOYMENT.md | Deploy guide |
| TROUBLESHOOTING.md | Fix issues |
| CONTRIBUTING.md | Contribute |

## 💡 Useful Links

- [OpenAI API Docs](https://platform.openai.com/docs)
- [React Docs](https://react.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [Express Docs](https://expressjs.com/)

## 🆘 Getting Help

1. Check TROUBLESHOOTING.md
2. Review API_DOCUMENTATION.md
3. Check browser/server console
4. Search existing issues
5. Create new issue with details

## 📞 Support Workflow

```
Issue → Check Docs → Check Console → Search Issues → Create Issue
```

---

**Keep this handy for quick reference! 📌**
