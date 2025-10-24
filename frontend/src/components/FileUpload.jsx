/**
 * FileUpload Component
 * Handles drag-and-drop and click-to-upload functionality
 */

import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { validatePDFFile } from '../utils/helpers';

/**
 * FileUpload component
 * @param {Function} onFileSelect - Callback when file is selected
 */
function FileUpload({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  /**
   * Handle drag over event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  /**
   * Handle file input change
   */
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  /**
   * Handle file selection and validation
   */
  const handleFileSelection = (file) => {
    const validation = validatePDFFile(file);
    
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    onFileSelect(file);
  };

  /**
   * Trigger file input click
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-3xl p-16 text-center
        transition-all duration-300 cursor-pointer
        ${isDragging 
          ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl scale-105' 
          : 'border-purple-200 bg-white/80 backdrop-blur-lg hover:border-purple-300 hover:shadow-2xl hover:scale-[1.02] shadow-xl'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        <div className={`
          p-4 rounded-2xl transition-all duration-300
          ${isDragging 
            ? 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg scale-110' 
            : 'bg-gradient-to-br from-purple-400 to-blue-400 shadow-md'
          }
        `}>
          <Upload 
            className="w-12 h-12 text-white" 
          />
        </div>

        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Upload PDF to start chatting
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            Click or drag and drop your file here
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supports PDF files up to 50MB
          </p>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
