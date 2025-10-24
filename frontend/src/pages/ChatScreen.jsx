/**
 * ChatScreen Component
 * Main chat interface with PDF viewer
 */

import { useState, useEffect, useRef } from 'react';
import { FileText, LogOut, Sparkles } from 'lucide-react';
import PDFViewer from '../components/PDFViewer';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { sendChatMessage, getSuggestions } from '../utils/api';
import { formatFileSize } from '../utils/helpers';

/**
 * ChatScreen component
 * @param {Object} documentData - Document metadata
 * @param {File} pdfFile - PDF file object
 * @param {Function} onReset - Callback to reset and upload new document
 */
function ChatScreen({ documentData, pdfFile, onReset }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [targetPage, setTargetPage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  /**
   * Scroll to bottom of messages
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Load suggestions on mount
   */
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await getSuggestions(documentData.documentId);
        if (response.success) {
          setSuggestions(response.data.suggestions);
        }
      } catch (error) {
        console.error('Failed to load suggestions:', error);
      }
    };

    loadSuggestions();
  }, [documentData.documentId]);

  /**
   * Scroll to bottom when messages change
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Handle sending a message
   */
  const handleSendMessage = async (query) => {
    setShowWelcome(false);

    // Add user message
    const userMessage = {
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await sendChatMessage(
        documentData.documentId,
        query,
        messages
      );

      if (response.success) {
        // Add assistant message
        const assistantMessage = {
          role: 'assistant',
          content: response.data.response,
          citations: response.data.citations,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle citation click
   */
  const handleCitationClick = (pageNumber) => {
    setTargetPage(pageNumber);
    // Reset after a short delay to allow multiple clicks to same page
    setTimeout(() => setTargetPage(null), 100);
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">
                {documentData.fileName}
              </h1>
              <p className="text-xs text-white/80">
                {documentData.totalPages} pages • {formatFileSize(pdfFile.size)}
              </p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            New Document
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {showWelcome && messages.length === 0 ? (
              <div className="h-full flex items-center justify-center p-6">
                <div className="max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative">
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-lg font-bold text-primary-600">
                      Your document is ready!
                    </h2>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    You can now ask questions about your document. For example:
                  </p>

                  {/* Suggestions */}
                  <div className="space-y-2 mb-4">
                    {suggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        • "{suggestion}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message}
                    onCitationClick={handleCitationClick}
                  />
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="message-bubble assistant">
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* PDF Viewer Panel */}
        <div className="w-1/2">
          <PDFViewer file={pdfFile} targetPage={targetPage} />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
