# 📚 NotebookLM Clone

A full-stack web application that allows users to upload PDF files and chat with an AI assistant about the document's contents. Built with React, Node.js, Express, and OpenAI's GPT-4o-mini.

![NotebookLM Clone](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **📄 PDF Upload & Viewing**: Upload large PDF files (up to 50MB) with drag-and-drop support
- **🤖 AI-Powered Chat**: Ask questions about your documents and get intelligent responses
- **🔍 Smart Citations**: Every AI response includes clickable page citations
- **📖 Interactive PDF Viewer**: Navigate through pages with zoom controls and smooth scrolling
- **⚡ Efficient Token Usage**: Semantic search ensures only relevant content is sent to the AI
- **🎨 Modern UI**: Clean, responsive interface inspired by Google NotebookLM
- **📱 Responsive Design**: Works seamlessly on desktop and tablet devices

## 🏗️ Architecture

### Frontend
- **React 18** with Vite for fast development
- **TailwindCSS** for styling
- **react-pdf** for PDF rendering
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons

### Backend
- **Node.js** with Express
- **OpenAI API** for embeddings and chat completions
- **pdf-parse** for PDF text extraction
- **In-memory vector store** for semantic search
- **Multer** for file upload handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Installation & Setup

### 1. Clone or Extract the Project

```bash
cd notebooklm-clone
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

The frontend `.env` should contain:

```env
VITE_API_URL=http://localhost:5000
```

## 🎯 Running the Application

### Start Backend Server

```bash
# From backend directory
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
# From frontend directory (in a new terminal)
npm run dev
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 📖 Usage Guide

### 1. Upload a PDF

- Click the upload area or drag and drop a PDF file
- Wait for the upload and processing to complete
- The system will automatically vectorize each page

### 2. Chat with Your Document

- Once uploaded, you'll see the chat interface with the PDF viewer
- Type your question in the input field at the bottom
- Press Enter or click the send button

### 3. Navigate with Citations

- AI responses include clickable page citations like `[Page 2]`
- Click any citation to jump directly to that page in the PDF viewer
- Use the PDF viewer controls to zoom and navigate manually

### 4. Example Questions

- "What is the main topic of this document?"
- "Summarize page 5"
- "What are the key conclusions?"
- "Explain the methodology used"

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `PORT` | Backend server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

#### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000 |

### AI Models Used

- **Chat**: `gpt-4o-mini` - Fast and cost-effective for conversations
- **Embeddings**: `text-embedding-3-small` - Efficient semantic search

## 📁 Project Structure

```
notebooklm-clone/
├── backend/
│   ├── controllers/
│   │   ├── chatController.js      # Chat logic
│   │   └── pdfController.js       # PDF upload logic
│   ├── routes/
│   │   ├── chatRoutes.js          # Chat endpoints
│   │   └── pdfRoutes.js           # PDF endpoints
│   ├── utils/
│   │   ├── openaiClient.js        # OpenAI integration
│   │   ├── pdfParser.js           # PDF parsing
│   │   └── vectorStore.js         # Vector storage
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.jsx      # Message input
│   │   │   ├── ChatMessage.jsx    # Message display
│   │   │   ├── FileUpload.jsx     # Upload component
│   │   │   ├── PDFViewer.jsx      # PDF renderer
│   │   │   └── ProgressBar.jsx    # Upload progress
│   │   ├── pages/
│   │   │   ├── ChatScreen.jsx     # Main chat UI
│   │   │   └── UploadScreen.jsx   # Upload UI
│   │   ├── utils/
│   │   │   ├── api.js             # API client
│   │   │   └── helpers.js         # Utility functions
│   │   ├── App.jsx                # Root component
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Entry point
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### PDF Endpoints

#### Upload PDF
```http
POST /api/pdf/upload
Content-Type: multipart/form-data

Body: { pdf: File }

Response: {
  success: true,
  data: {
    documentId: string,
    fileName: string,
    totalPages: number,
    metadata: object
  }
}
```

#### Get Document Metadata
```http
GET /api/pdf/:documentId

Response: {
  success: true,
  data: {
    fileName: string,
    totalPages: number,
    uploadedAt: string
  }
}
```

#### Delete Document
```http
DELETE /api/pdf/:documentId

Response: {
  success: true,
  message: string
}
```

### Chat Endpoints

#### Send Message
```http
POST /api/chat
Content-Type: application/json

Body: {
  documentId: string,
  query: string,
  conversationHistory: array
}

Response: {
  success: true,
  data: {
    response: string,
    citations: number[],
    relevantPages: array
  }
}
```

#### Get Suggestions
```http
GET /api/chat/suggestions/:documentId

Response: {
  success: true,
  data: {
    suggestions: string[],
    documentName: string
  }
}
```

## 🎨 Design Decisions

### Token Optimization
- **Semantic Search**: Only the top 3 most relevant pages are sent to the AI
- **Context Limiting**: Each page's text is used efficiently
- **Smart Chunking**: PDF pages are vectorized individually for precise retrieval

### User Experience
- **Two-Panel Layout**: Chat on the left, PDF viewer on the right
- **Smooth Animations**: Framer Motion for polished interactions
- **Responsive Citations**: Click to jump directly to referenced pages
- **Loading States**: Clear feedback during upload and processing

### Code Quality
- **Modular Architecture**: Separation of concerns (routes, controllers, utilities)
- **Error Handling**: Comprehensive error messages and validation
- **JSDoc Comments**: Full documentation for all functions
- **Clean Code**: ESLint-ready, follows best practices

## 🚢 Deployment

### Frontend (Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Netlify
3. Set environment variable: `VITE_API_URL=<your-backend-url>`

### Backend (Render/Vercel)

1. Push your code to GitHub
2. Connect to Render or Vercel
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `FRONTEND_URL`
   - `NODE_ENV=production`

## 🛠️ Development

### Code Style
- Use **camelCase** for variables and functions
- Use **PascalCase** for React components
- Add JSDoc comments for all functions
- Follow the existing code structure

### Adding Features

1. **Backend**: Add routes → controllers → utilities
2. **Frontend**: Add components → pages → utils
3. Test thoroughly before committing

## 🐛 Troubleshooting

### Common Issues

**PDF not loading**
- Ensure the file is a valid PDF
- Check file size (max 50MB)
- Verify backend is running

**OpenAI errors**
- Verify API key is correct
- Check API quota and billing
- Ensure internet connection

**CORS errors**
- Verify `FRONTEND_URL` in backend .env
- Check both servers are running

**Upload fails**
- Check backend logs for errors
- Verify uploads directory exists
- Ensure sufficient disk space

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Google NotebookLM](https://notebooklm.google.com/)
- Built with [OpenAI API](https://openai.com/)
- UI components styled with [TailwindCSS](https://tailwindcss.com/)

## 📧 Support

For issues or questions, please check the troubleshooting section or review the code comments for detailed explanations.

---

**Built with ❤️ using React, Node.js, and OpenAI**
