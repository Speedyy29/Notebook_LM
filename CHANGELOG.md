# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-20

### Added
- Initial release of NotebookLM Clone
- PDF upload functionality with drag-and-drop support
- AI-powered chat interface using OpenAI GPT-4o-mini
- Semantic search using OpenAI embeddings (text-embedding-3-small)
- Interactive PDF viewer with zoom and navigation controls
- Clickable page citations in AI responses
- Automatic page scrolling when citations are clicked
- In-memory vector store for efficient document retrieval
- Two-panel layout (chat + PDF viewer)
- Progress tracking for PDF uploads
- Suggested questions for uploaded documents
- Responsive design with TailwindCSS
- Smooth animations with Framer Motion
- Comprehensive error handling
- JSDoc documentation throughout codebase
- ESLint configuration for code quality
- Environment variable configuration
- CORS support for cross-origin requests

### Backend Features
- Express.js REST API
- Multer for file upload handling
- pdf-parse for PDF text extraction
- OpenAI API integration for embeddings and chat
- Cosine similarity for semantic search
- Document metadata management
- Automatic cleanup of uploaded files
- Health check endpoint

### Frontend Features
- React 18 with Vite
- react-pdf for PDF rendering
- Axios for API communication
- Lucide React icons
- Custom scrollbar styling
- Loading states and animations
- File validation
- Citation parsing and highlighting
- Message history display
- Conversation context management

### Documentation
- Comprehensive README with setup instructions
- API documentation with examples
- Deployment guide for Netlify and Render
- Setup guide for quick start
- Contributing guidelines
- Backend and frontend specific READMEs
- Code of conduct
- MIT License

### Developer Experience
- Hot reload for development
- Environment variable templates
- Clear project structure
- Modular code organization
- Consistent code style
- Detailed comments and JSDoc

## [Unreleased]

### Planned Features
- [ ] Dark mode support
- [ ] Multiple document support
- [ ] Export chat history
- [ ] Persistent storage (database)
- [ ] User authentication
- [ ] Real-time chat with WebSockets
- [ ] Mobile responsive design
- [ ] Keyboard shortcuts
- [ ] Advanced PDF features (annotations, highlights)
- [ ] Vector database integration (Pinecone/FAISS)
- [ ] Multi-language support
- [ ] Voice input
- [ ] Document comparison
- [ ] Collaborative features
- [ ] Custom AI model selection
- [ ] Rate limiting
- [ ] API authentication
- [ ] Usage analytics
- [ ] Batch document processing
- [ ] OCR support for scanned PDFs

### Known Issues
- PDF.js worker loaded from CDN (consider bundling)
- In-memory storage clears on server restart
- No pagination for very long chat histories
- Limited mobile optimization
- No offline support

### Future Improvements
- Add unit and integration tests
- Implement caching for embeddings
- Optimize token usage further
- Add request rate limiting
- Implement retry logic for API calls
- Add progress indicators for vectorization
- Improve error messages
- Add accessibility features
- Optimize bundle size
- Add performance monitoring
- Implement logging service
- Add backup/restore functionality

---

## Version History

### [1.0.0] - 2024-01-20
- Initial public release

---

## Migration Guides

### Upgrading to 1.0.0
This is the initial release. No migration needed.

---

## Breaking Changes

None yet.

---

## Deprecations

None yet.

---

## Security Updates

None yet.

---

For detailed commit history, see the Git log.
