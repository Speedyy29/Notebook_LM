/**
 * PDF Parser Utility
 * Handles PDF file parsing and text extraction per page
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import fs from 'fs/promises';

/**
 * Parse PDF file and extract text from each page
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<Object>} - Parsed PDF data with pages
 */
export async function parsePDF(filePath) {
  try {
    // Read PDF file
    const dataBuffer = await fs.readFile(filePath);
    
    // Parse PDF
    const pdfData = await pdfParse(dataBuffer);
    
    // Extract basic info
    const result = {
      totalPages: pdfData.numpages,
      info: pdfData.info,
      metadata: pdfData.metadata,
      text: pdfData.text,
      pages: [],
    };
    
    // Split text by pages (approximation)
    // Note: pdf-parse doesn't provide per-page text directly
    // We'll use a heuristic approach to split content
    const textPerPage = splitTextIntoPages(pdfData.text, pdfData.numpages);
    
    result.pages = textPerPage.map((text, index) => ({
      pageNumber: index + 1,
      text: text.trim(),
      wordCount: text.split(/\s+/).length,
    }));
    
    return result;
  } catch (error) {
    console.error('Error parsing PDF:', error.message);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Split text into approximate pages
 * @param {string} fullText - Complete PDF text
 * @param {number} totalPages - Total number of pages
 * @returns {Array<string>} - Array of text per page
 */
function splitTextIntoPages(fullText, totalPages) {
  // Common page break indicators
  const pageBreakPatterns = [
    /\f/g, // Form feed character
    /\n{3,}/g, // Multiple newlines
  ];
  
  // Try to split by form feed first
  let pages = fullText.split('\f');
  
  // If we don't have enough pages, use alternative splitting
  if (pages.length < totalPages) {
    // Split by multiple newlines or approximate character count
    const avgCharsPerPage = Math.ceil(fullText.length / totalPages);
    pages = [];
    
    let currentPage = '';
    const lines = fullText.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      currentPage += lines[i] + '\n';
      
      // Check if we should start a new page
      if (currentPage.length >= avgCharsPerPage && pages.length < totalPages - 1) {
        pages.push(currentPage);
        currentPage = '';
      }
    }
    
    // Add remaining text as last page
    if (currentPage.trim()) {
      pages.push(currentPage);
    }
  }
  
  // Ensure we have exactly the right number of pages
  while (pages.length < totalPages) {
    pages.push('');
  }
  
  if (pages.length > totalPages) {
    pages = pages.slice(0, totalPages);
  }
  
  return pages;
}

/**
 * Validate PDF file
 * @param {Object} file - Multer file object
 * @returns {boolean} - True if valid PDF
 */
export function validatePDFFile(file) {
  if (!file) {
    throw new Error('No file provided');
  }
  
  // Check file type
  const allowedMimeTypes = ['application/pdf'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only PDF files are allowed');
  }
  
  // Check file size (max 50MB)
  const maxSize = 50 * 1024 * 1024; // 50MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size exceeds 50MB limit');
  }
  
  return true;
}

/**
 * Clean up uploaded file
 * @param {string} filePath - Path to file
 */
export async function cleanupFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`🗑️ Cleaned up file: ${filePath}`);
  } catch (error) {
    console.error('Error cleaning up file:', error.message);
  }
}
