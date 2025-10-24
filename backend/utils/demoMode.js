/**
 * Demo Mode - Works without API keys
 * Provides mock responses for testing
 */

/**
 * Generate demo embedding (simple vector)
 */
export function generateDemoEmbedding(text) {
  const embedding = new Array(384).fill(0);
  const cleanText = text.toLowerCase();
  const words = cleanText.split(/\s+/).slice(0, 100);
  
  words.forEach((word, idx) => {
    const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const position = hash % 384;
    embedding[position] += 1 / (idx + 1);
  });
  
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
}

/**
 * Generate demo chat response
 */
export function generateDemoResponse(query, context) {
  const responses = [
    `Based on the document, I found relevant information about "${query}". The document discusses this topic in detail across multiple sections. [page 1]`,
    `According to the PDF content, ${query} is mentioned in the context of the main subject matter. You can find more details on [page 2] and [page 3].`,
    `The document provides insights about ${query}. This information appears in several places throughout the text. See [page 1] for the primary discussion.`,
    `Regarding "${query}", the document explains this concept thoroughly. The key points are outlined on [page 2] with supporting details on [page 3].`,
    `I found information related to ${query} in the document. The content suggests this is an important aspect covered in [page 1] and elaborated further in [page 2].`
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return randomResponse;
}

/**
 * Generate demo suggestions
 */
export function generateDemoSuggestions() {
  return [
    "What is the main topic of this document?",
    "Can you summarize the key points?",
    "What are the main conclusions?"
  ];
}
