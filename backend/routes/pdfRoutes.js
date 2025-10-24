/**
 * PDF Routes
 * Defines API endpoints for PDF operations
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadPDF, getDocumentMetadata, deleteDocument } from '../controllers/pdfController.js';

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

/**
 * @route POST /api/pdf/upload
 * @desc Upload and process PDF file
 * @access Public
 */
router.post('/upload', upload.single('pdf'), uploadPDF);

/**
 * @route GET /api/pdf/:documentId
 * @desc Get document metadata
 * @access Public
 */
router.get('/:documentId', getDocumentMetadata);

/**
 * @route DELETE /api/pdf/:documentId
 * @desc Delete document
 * @access Public
 */
router.delete('/:documentId', deleteDocument);

export default router;
