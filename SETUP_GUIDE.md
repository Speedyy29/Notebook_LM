# 🚀 Quick Setup Guide

Follow these steps to get the NotebookLM Clone running on your machine.

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies

Open two terminal windows.

**Terminal 1 - Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment

**Backend:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-key-here
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
```

The default settings should work for local development.

### Step 3: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for: `🚀 Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Step 4: Test the Application

1. Upload a PDF file (drag & drop or click)
2. Wait for processing (you'll see a progress bar)
3. Ask a question about the document
4. Click on page citations to navigate the PDF

## 🔑 Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key and paste it in `backend/.env`

**Note:** You'll need billing set up on your OpenAI account.

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify Node.js version (should be 18+)
- Ensure all dependencies installed: `npm install`

### Frontend won't start
- Check if port 3000 is already in use
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### OpenAI errors
- Verify API key is correct (no extra spaces)
- Check OpenAI account has credits
- Ensure API key has proper permissions

### PDF upload fails
- Check file is a valid PDF
- Ensure file is under 50MB
- Check backend console for error messages

### CORS errors
- Verify both servers are running
- Check `FRONTEND_URL` in backend `.env`
- Restart both servers

## 📊 System Requirements

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **RAM**: 2GB minimum
- **Disk**: 500MB free space
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## 🎯 Next Steps

Once everything is running:

1. **Try different PDFs**: Test with various document types
2. **Explore features**: Try zoom, navigation, citations
3. **Customize**: Modify colors in `frontend/tailwind.config.js`
4. **Deploy**: Follow deployment guide in main README

## 📚 Additional Resources

- [Main README](./README.md) - Full documentation
- [Backend README](./backend/README.md) - Backend details
- [Frontend README](./frontend/README.md) - Frontend details
- [OpenAI API Docs](https://platform.openai.com/docs) - API reference

## 💡 Tips

- Use smaller PDFs (5-10 pages) for faster testing
- Keep both terminal windows open to see logs
- Check browser console for frontend errors
- Check terminal for backend errors

## 🆘 Still Having Issues?

1. Check all environment variables are set correctly
2. Ensure both servers are running
3. Clear browser cache and reload
4. Restart both servers
5. Check the troubleshooting section in main README

---

**Happy coding! 🎉**
