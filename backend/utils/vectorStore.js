/**
 * Vector Store - In-Memory Storage for PDF Embeddings
 * Handles storage and retrieval of vectorized PDF pages
 */

import { generateEmbedding } from './openaiClient.js';

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} - Similarity score (0-1)
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (normA * normB);
}

/**
 * VectorStore class for managing PDF embeddings
 */
class VectorStore {
  constructor() {
    // Store documents with their embeddings
    // Structure: { documentId: { pages: [...], metadata: {...} } }
    this.documents = new Map();
  }

  /**
   * Add a document with its pages to the vector store
   * @param {string} documentId - Unique document identifier
   * @param {Array} pages - Array of page objects with text content
   * @param {Object} metadata - Document metadata
   */
  async addDocument(documentId, pages, metadata = {}) {
    console.log(`📚 Vectorizing document: ${documentId} (${pages.length} pages)`);
    
    const vectorizedPages = [];
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      try {
        // Generate embedding for page text
        const embedding = await generateEmbedding(page.text);
        
        vectorizedPages.push({
          pageNumber: page.pageNumber,
          text: page.text,
          embedding,
        });
        
        console.log(`✅ Vectorized page ${page.pageNumber}/${pages.length}`);
      } catch (error) {
        console.error(`❌ Failed to vectorize page ${page.pageNumber}:`, error.message);
        // Continue with other pages even if one fails
      }
    }
    
    this.documents.set(documentId, {
      pages: vectorizedPages,
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString(),
        totalPages: pages.length,
      },
    });
    
    console.log(`✨ Document ${documentId} successfully added to vector store`);
    return vectorizedPages.length;
  }

  /**
   * Search for relevant pages based on query
   * @param {string} documentId - Document to search in
   * @param {string} query - Search query
   * @param {number} topK - Number of top results to return
   * @returns {Promise<Array>} - Array of relevant pages with similarity scores
   */
  async searchSimilarPages(documentId, query, topK = 3) {
    const document = this.documents.get(documentId);
    
    if (!document) {
      throw new Error(`Document ${documentId} not found in vector store`);
    }
    
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding(query);
    
    // Calculate similarity scores for all pages
    const results = document.pages.map(page => ({
      pageNumber: page.pageNumber,
      text: page.text,
      similarity: cosineSimilarity(queryEmbedding, page.embedding),
    }));
    
    // Sort by similarity (descending) and return top K
    results.sort((a, b) => b.similarity - a.similarity);
    
    return results.slice(0, topK);
  }

  /**
   * Get document metadata
   * @param {string} documentId - Document identifier
   * @returns {Object|null} - Document metadata or null if not found
   */
  getDocumentMetadata(documentId) {
    const document = this.documents.get(documentId);
    return document ? document.metadata : null;
  }

  /**
   * Check if document exists
   * @param {string} documentId - Document identifier
   * @returns {boolean} - True if document exists
   */
  hasDocument(documentId) {
    return this.documents.has(documentId);
  }

  /**
   * Remove document from store
   * @param {string} documentId - Document identifier
   * @returns {boolean} - True if document was removed
   */
  removeDocument(documentId) {
    return this.documents.delete(documentId);
  }

  /**
   * Get all document IDs
   * @returns {Array<string>} - Array of document IDs
   */
  getAllDocumentIds() {
    return Array.from(this.documents.keys());
  }

  /**
   * Clear all documents
   */
  clear() {
    this.documents.clear();
    console.log('🗑️ Vector store cleared');
  }
}

// Singleton instance
const vectorStore = new VectorStore();

export default vectorStore;
