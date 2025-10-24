# Backend - NotebookLM Clone

Node.js + Express backend for PDF processing and AI chat functionality.

## 🏗️ Architecture

### Core Components

1. **Server** (`server.js`)
   - Express application setup
   - Middleware configuration
   - Route mounting
   - Error handling

2. **Routes**
   - `pdfRoutes.js`: PDF upload and management endpoints
   - `chatRoutes.js`: Chat and AI interaction endpoints

3. **Controllers**
   - `pdfController.js`: Handles PDF upload, parsing, and vectorization
   - `chatController.js`: Manages chat queries and AI responses

4. **Utilities**
   - `openaiClient.js`: OpenAI API integration
   - `vectorStore.js`: In-memory vector database
   - `pdfParser.js`: PDF text extraction

## 🔧 Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your OpenAI API key to `.env`

4. Start the server:
```bash
npm run dev
```

## 📚 API Documentation

### Health Check
```
GET /api/health
```

### PDF Operations
```
POST /api/pdf/upload
GET /api/pdf/:documentId
DELETE /api/pdf/:documentId
```

### Chat Operations
```
POST /api/chat
GET /api/chat/suggestions/:documentId
```

## 🧠 How It Works

### PDF Processing Flow

1. **Upload**: File received via multer middleware
2. **Validation**: Check file type and size
3. **Parsing**: Extract text from each page using pdf-parse
4. **Vectorization**: Generate embeddings for each page using OpenAI
5. **Storage**: Store vectors in memory with metadata
6. **Response**: Return document ID and metadata

### Chat Flow

1. **Query Received**: User sends question about document
2. **Semantic Search**: Find top 3 most relevant pages using cosine similarity
3. **Context Building**: Construct prompt with relevant page content
4. **AI Generation**: Send to OpenAI GPT-4o-mini
5. **Citation Extraction**: Parse page references from response
6. **Response**: Return AI answer with citations

## 🔐 Security Considerations

- File type validation (PDF only)
- File size limits (50MB max)
- Input sanitization
- Error message sanitization in production
- CORS configuration

## 📊 Performance

- In-memory storage for fast retrieval
- Efficient vector similarity calculations
- Minimal token usage through semantic search
- Async/await for non-blocking operations

## 🧪 Testing

Test endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Upload PDF
curl -X POST http://localhost:5000/api/pdf/upload \
  -F "pdf=@/path/to/file.pdf"
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use process manager (PM2)
3. Enable HTTPS
4. Configure proper CORS origins
5. Set up logging
6. Monitor API usage

## 📝 Code Standards

- ES6+ modules
- Async/await over callbacks
- JSDoc comments for all functions
- Consistent error handling
- Descriptive variable names
