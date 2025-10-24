/**
 * Chat Controller
 * Handles chat interactions with AI based on PDF content
 */

import vectorStore from '../utils/vectorStore.js';
import { generateChatCompletion } from '../utils/openaiClient.js';

/**
 * Process chat query and generate AI response
 * @route POST /api/chat
 */
export async function chat(req, res) {
  try {
    const { documentId, query, conversationHistory = [] } = req.body;
    
    // Validate request
    if (!documentId || !query) {
      return res.status(400).json({ 
        error: 'Missing required fields: documentId and query' 
      });
    }
    
    if (!vectorStore.hasDocument(documentId)) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    console.log(`💬 Processing query: "${query}" for document: ${documentId}`);
    
    // Search for relevant pages
    const relevantPages = await vectorStore.searchSimilarPages(documentId, query, 3);
    
    console.log(`📊 Found ${relevantPages.length} relevant pages`);
    
    // Build context from relevant pages
    const context = relevantPages
      .map(page => `[Page ${page.pageNumber}]\n${page.text}`)
      .join('\n\n---\n\n');
    
    // Build messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a helpful AI assistant that answers questions about documents. 
        
Guidelines:
- Provide accurate, concise answers based on the provided context
- Always cite the specific page numbers where you found the information
- Use the format [page X] to cite pages in your response
- If the answer is not in the context, say so clearly
- Be conversational but professional
- Keep responses focused and relevant to the question

Context from the document:
${context}`,
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: query,
      },
    ];
    
    // Generate AI response
    const aiResponse = await generateChatCompletion(messages, 1000);
    
    // Extract page citations from response
    const citationRegex = /\[page (\d+)\]/gi;
    const citations = [];
    let match;
    
    while ((match = citationRegex.exec(aiResponse)) !== null) {
      const pageNumber = parseInt(match[1], 10);
      if (!citations.includes(pageNumber)) {
        citations.push(pageNumber);
      }
    }
    
    // Sort citations
    citations.sort((a, b) => a - b);
    
    console.log(`✅ Generated response with ${citations.length} citations`);
    
    // Return response
    res.status(200).json({
      success: true,
      data: {
        response: aiResponse,
        citations,
        relevantPages: relevantPages.map(page => ({
          pageNumber: page.pageNumber,
          similarity: page.similarity,
          preview: page.text.substring(0, 200) + '...',
        })),
      },
    });
    
  } catch (error) {
    console.error('Error processing chat:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to process chat query',
    });
  }
}

/**
 * Get suggested questions for a document
 * @route GET /api/chat/suggestions/:documentId
 */
export async function getSuggestions(req, res) {
  try {
    const { documentId } = req.params;
    
    if (!vectorStore.hasDocument(documentId)) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    const metadata = vectorStore.getDocumentMetadata(documentId);
    
    // Generate contextual suggestions
    const suggestions = [
      `What is the main topic of this document?`,
      `Can you summarize the key points?`,
      `What are the conclusions or recommendations?`,
      `Explain the main concepts discussed`,
    ];
    
    res.status(200).json({
      success: true,
      data: {
        suggestions,
        documentName: metadata.fileName,
      },
    });
    
  } catch (error) {
    console.error('Error getting suggestions:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to get suggestions',
    });
  }
}
