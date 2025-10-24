/**
 * AI Client Configuration - OpenRouter
 * Uses OpenRouter API for AI functionality
 */

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Validate API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

/**
 * Initialize OpenRouter client (OpenAI-compatible)
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'NotebookLM Clone',
  }
});

// Model constants for OpenRouter
export const CHAT_MODEL = 'meta-llama/llama-3.2-3b-instruct:free'; // Free model
export const EMBEDDING_MODEL = 'text-embedding-3-small';

/**
 * Generate simple text-based embedding
 * Creates a basic vector representation for similarity search
 * @param {string} text - Text to generate embeddings for
 * @returns {Promise<number[]>} - Embedding vector
 */
export async function generateEmbedding(text) {
  try {
    if (!text || typeof text !== 'string') {
      text = 'Empty page';
    }
    
    const cleanText = text.trim().toLowerCase();
    if (!cleanText) {
      return await generateEmbedding('Empty page');
    }
    
    console.log(`📊 Generating embedding for text (${cleanText.length} chars)`);
    
    // Create a 384-dimensional vector based on text characteristics
    const embedding = new Array(384).fill(0);
    const words = cleanText.split(/\s+/).slice(0, 100);
    
    words.forEach((word, idx) => {
      const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const position = hash % 384;
      embedding[position] += 1 / (idx + 1);
    });
    
    // Normalize the vector
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error(`Failed to generate embedding: ${error.message}`);
  }
}

/**
 * Generate chat completion using OpenAI
 * @param {Array} messages - Array of message objects
 * @param {number} maxTokens - Maximum tokens for response
 * @returns {Promise<string>} - AI response
 */
export async function generateChatCompletion(messages, maxTokens = 1000) {
  try {
    console.log(`🤖 Generating chat completion with ${messages.length} messages using OpenRouter`);
    
    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    });
    
    console.log('✅ Chat completion generated successfully');
    return response.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error generating chat completion:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw new Error(`Failed to generate chat response: ${error.message}`);
  }
}

export default openai;
