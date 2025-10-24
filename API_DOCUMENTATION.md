# 📡 API Documentation

Complete API reference for NotebookLM Clone backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

Currently, the API does not require authentication. For production use, consider implementing:
- API keys
- JWT tokens
- Rate limiting

---

## Endpoints

### Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "message": "NotebookLM Clone API is running",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - API is running

---

## PDF Operations

### Upload PDF

Upload and process a PDF file.

**Endpoint:** `POST /pdf/upload`

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body:**
```
FormData:
  pdf: File (PDF file, max 50MB)
```

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('pdf', pdfFile);

const response = await fetch('http://localhost:5000/api/pdf/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "PDF uploaded and processed successfully",
  "data": {
    "documentId": "550e8400-e29b-41d4-a716-446655440000",
    "fileName": "example.pdf",
    "totalPages": 10,
    "metadata": {
      "fileName": "example.pdf",
      "fileSize": 1048576,
      "totalPages": 10,
      "uploadedAt": "2024-01-20T10:30:00.000Z",
      "createdAt": "2024-01-20T10:30:05.000Z"
    }
  }
}
```

**Error Responses:**

`400 Bad Request` - No file uploaded or invalid file
```json
{
  "error": "No file uploaded"
}
```

`400 Bad Request` - Invalid file type
```json
{
  "error": "Invalid file type. Only PDF files are allowed"
}
```

`400 Bad Request` - File too large
```json
{
  "error": "File size exceeds 50MB limit"
}
```

`500 Internal Server Error` - Processing failed
```json
{
  "error": "Failed to parse PDF: [error message]"
}
```

---

### Get Document Metadata

Retrieve metadata for an uploaded document.

**Endpoint:** `GET /pdf/:documentId`

**URL Parameters:**
- `documentId` (string, required) - Unique document identifier

**Example:**
```javascript
const response = await fetch(
  'http://localhost:5000/api/pdf/550e8400-e29b-41d4-a716-446655440000'
);
const data = await response.json();
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "fileName": "example.pdf",
    "fileSize": 1048576,
    "totalPages": 10,
    "uploadedAt": "2024-01-20T10:30:00.000Z",
    "createdAt": "2024-01-20T10:30:05.000Z"
  }
}
```

**Error Responses:**

`404 Not Found` - Document not found
```json
{
  "error": "Document not found"
}
```

---

### Delete Document

Remove a document from the vector store.

**Endpoint:** `DELETE /pdf/:documentId`

**URL Parameters:**
- `documentId` (string, required) - Unique document identifier

**Example:**
```javascript
const response = await fetch(
  'http://localhost:5000/api/pdf/550e8400-e29b-41d4-a716-446655440000',
  { method: 'DELETE' }
);
const data = await response.json();
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

**Error Responses:**

`404 Not Found` - Document not found
```json
{
  "error": "Document not found"
}
```

---

## Chat Operations

### Send Chat Message

Send a question about the document and receive an AI response.

**Endpoint:** `POST /chat`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "documentId": "550e8400-e29b-41d4-a716-446655440000",
  "query": "What is the main topic of this document?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous question"
    },
    {
      "role": "assistant",
      "content": "Previous answer"
    }
  ]
}
```

**Parameters:**
- `documentId` (string, required) - Document identifier
- `query` (string, required) - User's question
- `conversationHistory` (array, optional) - Previous messages for context

**Example:**
```javascript
const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    documentId: '550e8400-e29b-41d4-a716-446655440000',
    query: 'What is the main topic?',
    conversationHistory: [],
  }),
});

const data = await response.json();
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "response": "The main topic of this document is machine learning, specifically focusing on supervised learning techniques like regression and classification [page 2][page 3].",
    "citations": [2, 3],
    "relevantPages": [
      {
        "pageNumber": 2,
        "similarity": 0.89,
        "preview": "This section introduces supervised learning..."
      },
      {
        "pageNumber": 3,
        "similarity": 0.85,
        "preview": "Classification algorithms are discussed..."
      }
    ]
  }
}
```

**Response Fields:**
- `response` (string) - AI-generated answer with inline citations
- `citations` (array) - List of cited page numbers
- `relevantPages` (array) - Pages used for context with similarity scores

**Error Responses:**

`400 Bad Request` - Missing required fields
```json
{
  "error": "Missing required fields: documentId and query"
}
```

`404 Not Found` - Document not found
```json
{
  "error": "Document not found"
}
```

`500 Internal Server Error` - AI processing failed
```json
{
  "error": "Failed to process chat query"
}
```

---

### Get Question Suggestions

Get suggested questions for a document.

**Endpoint:** `GET /chat/suggestions/:documentId`

**URL Parameters:**
- `documentId` (string, required) - Document identifier

**Example:**
```javascript
const response = await fetch(
  'http://localhost:5000/api/chat/suggestions/550e8400-e29b-41d4-a716-446655440000'
);
const data = await response.json();
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "suggestions": [
      "What is the main topic of this document?",
      "Can you summarize the key points?",
      "What are the conclusions or recommendations?",
      "Explain the main concepts discussed"
    ],
    "documentName": "example.pdf"
  }
}
```

**Error Responses:**

`404 Not Found` - Document not found
```json
{
  "error": "Document not found"
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200 OK` - Request succeeded
- `400 Bad Request` - Invalid request parameters
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Development vs Production

In development mode, error responses include stack traces:

```json
{
  "error": "Error message",
  "stack": "Error stack trace..."
}
```

In production, stack traces are omitted for security.

---

## Rate Limiting

**Current:** No rate limiting implemented

**Recommended for Production:**
- 100 requests per 15 minutes per IP
- 10 PDF uploads per hour per IP
- 50 chat messages per minute per IP

Implement using packages like:
- `express-rate-limit`
- `rate-limiter-flexible`

---

## CORS Configuration

**Development:**
```javascript
origin: 'http://localhost:3000'
```

**Production:**
```javascript
origin: process.env.FRONTEND_URL
```

To allow multiple origins:
```javascript
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
})
```

---

## Request/Response Examples

### Complete Upload Flow

```javascript
// 1. Upload PDF
const formData = new FormData();
formData.append('pdf', pdfFile);

const uploadResponse = await fetch('/api/pdf/upload', {
  method: 'POST',
  body: formData,
});

const { data } = await uploadResponse.json();
const documentId = data.documentId;

// 2. Ask a question
const chatResponse = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    documentId,
    query: 'What is this about?',
    conversationHistory: [],
  }),
});

const chatData = await chatResponse.json();
console.log(chatData.data.response);

// 3. Get suggestions
const suggestionsResponse = await fetch(
  `/api/chat/suggestions/${documentId}`
);

const suggestions = await suggestionsResponse.json();
console.log(suggestions.data.suggestions);

// 4. Clean up
await fetch(`/api/pdf/${documentId}`, { method: 'DELETE' });
```

---

## WebSocket Support (Future)

Currently not implemented. For real-time features, consider:

```javascript
// Potential WebSocket endpoint
ws://localhost:5000/chat

// Message format
{
  "type": "chat",
  "documentId": "...",
  "query": "..."
}

// Response format
{
  "type": "response",
  "data": {
    "response": "...",
    "citations": [...]
  }
}
```

---

## API Versioning

**Current:** No versioning (v1 implicit)

**Future Recommendation:**
```
/api/v1/pdf/upload
/api/v2/pdf/upload
```

---

## Performance Considerations

### Timeouts
- PDF upload: 60 seconds
- Chat request: 30 seconds
- Default: 10 seconds

### File Size Limits
- PDF: 50MB maximum
- Request body: 50MB maximum

### Concurrent Requests
- No limit currently
- Recommended: 10 concurrent uploads per IP

---

## Security Best Practices

1. **Input Validation**
   - Validate all user inputs
   - Sanitize file names
   - Check file types

2. **API Keys**
   - Store OpenAI key securely
   - Never expose in responses
   - Rotate regularly

3. **HTTPS**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS

4. **Headers**
   - Set security headers
   - Implement CSP
   - Use helmet.js

---

## Monitoring & Logging

### Recommended Logging

```javascript
// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Error logging
app.use((err, req, res, next) => {
  console.error('Error:', err);
  // Send to logging service
});
```

### Metrics to Track
- Request count
- Response times
- Error rates
- OpenAI API usage
- Upload sizes

---

**API Version:** 1.0.0  
**Last Updated:** 2024-01-20
