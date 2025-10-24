/**
 * UploadScreen Component
 * Initial screen for uploading PDF files
 */

import { useState } from 'react';
import { FileText } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import ProgressBar from '../components/ProgressBar';
import { uploadPDF } from '../utils/api';

/**
 * UploadScreen component
 * @param {Function} onUploadSuccess - Callback when upload succeeds
 */
function UploadScreen({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * Handle file selection
   */
  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log('Starting upload for file:', file.name, file.type, file.size);
      
      // Upload file with progress tracking
      const response = await uploadPDF(file, (progress) => {
        console.log('Upload progress:', progress);
        setUploadProgress(progress);
      });

      console.log('Upload response:', response);

      // Success
      if (response.success) {
        setTimeout(() => {
          onUploadSuccess(response.data, file);
        }, 500);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3">
            NotebookLM Clone
          </h1>
          <p className="text-gray-600 text-lg">
            Chat with your PDFs using AI
          </p>
        </div>

        {/* Upload Area */}
        {!isUploading ? (
          <FileUpload onFileSelect={handleFileSelect} />
        ) : (
          <div className="flex items-center justify-center min-h-[300px] bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            <ProgressBar 
              progress={uploadProgress} 
              message={uploadProgress < 100 ? 'Uploading PDF' : 'Processing document...'}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl shadow-lg">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-xs font-semibold text-gray-700">Fast Processing</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-xs font-semibold text-gray-700">AI Powered</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-xs font-semibold text-gray-700">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadScreen;
