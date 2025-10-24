/**
 * API Client
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Create axios instance with default config
 */
const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Upload PDF file to backend
 * @param {File} file - PDF file to upload
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} - Upload response data
 */
export async function uploadPDF(file, onProgress) {
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const response = await apiClient.post('/pdf/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw new Error(
      error.response?.data?.error || 'Failed to upload PDF. Please try again.'
    );
  }
}

/**
 * Send chat message to backend
 * @param {string} documentId - Document ID
 * @param {string} query - User query
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<Object>} - Chat response data
 */
export async function sendChatMessage(documentId, query, conversationHistory = []) {
  try {
    const response = await apiClient.post('/chat', {
      documentId,
      query,
      conversationHistory,
    });

    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error(
      error.response?.data?.error || 'Failed to get response. Please try again.'
    );
  }
}

/**
 * Get suggested questions for a document
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} - Suggestions data
 */
export async function getSuggestions(documentId) {
  try {
    const response = await apiClient.get(`/chat/suggestions/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting suggestions:', error);
    throw new Error('Failed to get suggestions');
  }
}

/**
 * Get document metadata
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} - Document metadata
 */
export async function getDocumentMetadata(documentId) {
  try {
    const response = await apiClient.get(`/pdf/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting document metadata:', error);
    throw new Error('Failed to get document metadata');
  }
}

/**
 * Delete document
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} - Delete response
 */
export async function deleteDocument(documentId) {
  try {
    const response = await apiClient.delete(`/pdf/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete document');
  }
}

export default apiClient;
