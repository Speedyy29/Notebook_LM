/**
 * PDF Controller
 * Handles PDF upload, parsing, and vectorization
 */

import { parsePDF, validatePDFFile, cleanupFile } from '../utils/pdfParser.js';
import vectorStore from '../utils/vectorStore.js';
import crypto from 'crypto';

/**
 * Upload and process PDF file
 * @route POST /api/pdf/upload
 */
export async function uploadPDF(req, res) {
  try {
    console.log('📥 Upload request received');
    
    // Validate file
    if (!req.file) {
      console.log('❌ No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('📁 File received:', req.file.originalname, req.file.size, 'bytes');
    
    validatePDFFile(req.file);
    
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    
    console.log(`📄 Processing PDF: ${fileName} at ${filePath}`);
    
    // Parse PDF
    console.log('🔍 Parsing PDF...');
    const pdfData = await parsePDF(filePath);
    console.log(`✅ PDF parsed: ${pdfData.totalPages} pages`);
    
    // Generate unique document ID
    const documentId = crypto.randomUUID();
    console.log(`🆔 Generated document ID: ${documentId}`);
    
    // Add to vector store
    console.log('🧠 Starting vectorization...');
    await vectorStore.addDocument(documentId, pdfData.pages, {
      fileName,
      fileSize: req.file.size,
      totalPages: pdfData.totalPages,
      uploadedAt: new Date().toISOString(),
    });
    console.log('✨ Vectorization complete');
    
    // Clean up uploaded file
    await cleanupFile(filePath);
    
    // Return response
    res.status(200).json({
      success: true,
      message: 'PDF uploaded and processed successfully',
      data: {
        documentId,
        fileName,
        totalPages: pdfData.totalPages,
        metadata: vectorStore.getDocumentMetadata(documentId),
      },
    });
    
    console.log('🎉 Upload completed successfully');
    
  } catch (error) {
    console.error('❌ Error uploading PDF:', error);
    console.error('Stack trace:', error.stack);
    
    // Clean up file if it exists
    if (req.file && req.file.path) {
      await cleanupFile(req.file.path);
    }
    
    res.status(500).json({
      error: error.message || 'Failed to upload PDF',
    });
  }
}

/**
 * Get document metadata
 * @route GET /api/pdf/:documentId
 */
export async function getDocumentMetadata(req, res) {
  try {
    const { documentId } = req.params;
    
    if (!vectorStore.hasDocument(documentId)) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    const metadata = vectorStore.getDocumentMetadata(documentId);
    
    res.status(200).json({
      success: true,
      data: metadata,
    });
    
  } catch (error) {
    console.error('Error getting document metadata:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to get document metadata',
    });
  }
}

/**
 * Delete document
 * @route DELETE /api/pdf/:documentId
 */
export async function deleteDocument(req, res) {
  try {
    const { documentId } = req.params;
    
    if (!vectorStore.hasDocument(documentId)) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    vectorStore.removeDocument(documentId);
    
    res.status(200).json({
      success: true,
      message: 'Document deleted successfully',
    });
    
  } catch (error) {
    console.error('Error deleting document:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to delete document',
    });
  }
}
