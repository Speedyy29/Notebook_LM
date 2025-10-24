/**
 * Main App Component
 * Manages application state and layout
 */

import { useState } from 'react';
import UploadScreen from './pages/UploadScreen';
import ChatScreen from './pages/ChatScreen';

function App() {
  const [documentData, setDocumentData] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  /**
   * Handle successful PDF upload
   * @param {Object} data - Document data from backend
   * @param {File} file - Original PDF file
   */
  const handleUploadSuccess = (data, file) => {
    setDocumentData(data);
    setPdfFile(file);
  };

  /**
   * Reset application state
   */
  const handleReset = () => {
    setDocumentData(null);
    setPdfFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {!documentData ? (
        <UploadScreen onUploadSuccess={handleUploadSuccess} />
      ) : (
        <ChatScreen
          documentData={documentData}
          pdfFile={pdfFile}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
