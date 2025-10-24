# Frontend - NotebookLM Clone

React application for PDF viewing and AI chat interface.

## 🏗️ Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatInput.jsx   # Message input field
│   ├── ChatMessage.jsx # Message bubble with citations
│   ├── FileUpload.jsx  # Drag-and-drop upload
│   ├── PDFViewer.jsx   # PDF rendering and navigation
│   └── ProgressBar.jsx # Upload progress indicator
├── pages/              # Page-level components
│   ├── ChatScreen.jsx  # Main chat interface
│   └── UploadScreen.jsx # Initial upload screen
├── utils/              # Utility functions
│   ├── api.js          # API client
│   └── helpers.js      # Helper functions
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Styling

- **TailwindCSS**: Utility-first CSS framework
- **Custom Components**: Reusable component classes
- **Responsive Design**: Mobile-first approach
- **Animations**: Framer Motion for smooth transitions

## 🔧 Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📦 Key Dependencies

- **react**: UI library
- **react-pdf**: PDF rendering
- **axios**: HTTP client
- **framer-motion**: Animations
- **lucide-react**: Icon library
- **tailwindcss**: Styling

## 🎯 Features

### PDF Viewer
- Page navigation (prev/next)
- Zoom controls (60% - 200%)
- Smooth scrolling to citations
- Responsive page sizing
- Loading and error states

### Chat Interface
- Real-time message display
- Clickable citations
- Loading indicators
- Suggested questions
- Conversation history

### File Upload
- Drag-and-drop support
- Click to browse
- File validation
- Progress tracking
- Error handling

## 🔌 API Integration

All API calls are centralized in `src/utils/api.js`:

```javascript
import { uploadPDF, sendChatMessage } from './utils/api';

// Upload PDF
const response = await uploadPDF(file, onProgress);

// Send message
const result = await sendChatMessage(documentId, query, history);
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the primary color:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#8b5cf6', // Change this
      }
    }
  }
}
```

### Layout
- Two-panel layout: 50/50 split
- Modify in `ChatScreen.jsx`
- Responsive breakpoints in Tailwind

## 🧪 Development

### Component Development
1. Create component in `src/components/`
2. Add PropTypes or TypeScript types
3. Document props with JSDoc
4. Export from component file

### State Management
- Local state with `useState`
- Refs for DOM access
- Props for parent-child communication
- No global state library needed

## 🚀 Build & Deploy

### Build
```bash
npm run build
```

Output: `dist/` directory

### Deploy to Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Deploy to Vercel
1. Import project
2. Framework preset: Vite
3. Add environment variable: `VITE_API_URL`

## 📱 Responsive Design

- Desktop: Full two-panel layout
- Tablet: Optimized spacing
- Mobile: Consider stacked layout (future enhancement)

## ♿ Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Alt text for icons

## 🐛 Debugging

### Common Issues

**PDF not rendering**
- Check console for errors
- Verify PDF.js worker URL
- Ensure file is valid PDF

**API errors**
- Check network tab
- Verify backend URL in .env
- Check CORS configuration

**Styling issues**
- Run `npm run build` to rebuild
- Clear browser cache
- Check Tailwind config

## 📝 Code Standards

- Functional components with hooks
- PropTypes or JSDoc for props
- Consistent naming (camelCase)
- Clean, readable code
- Comments for complex logic
