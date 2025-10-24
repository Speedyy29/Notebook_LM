/**
 * ChatInput Component
 * Input field for sending chat messages
 */

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

/**
 * ChatInput component
 * @param {Function} onSendMessage - Callback when message is sent
 * @param {boolean} isLoading - Whether AI is processing
 * @param {boolean} disabled - Whether input is disabled
 */
function ChatInput({ onSendMessage, isLoading = false, disabled = false }) {
  const [message, setMessage] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about the document..."
        disabled={disabled || isLoading}
        rows={1}
        className="
          w-full px-5 py-4 pr-14 rounded-2xl border-2 border-purple-200
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
          resize-none overflow-hidden shadow-sm
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-all bg-white
          placeholder:text-gray-400
        "
        style={{
          minHeight: '56px',
          maxHeight: '120px',
        }}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
        }}
      />

      <button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        className="
          absolute right-2 bottom-2 p-3 rounded-xl
          bg-gradient-to-r from-purple-500 to-blue-500 text-white
          hover:from-purple-600 hover:to-blue-600 
          disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed
          transition-all shadow-md hover:shadow-lg
          disabled:shadow-none
        "
        title="Send message"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </form>
  );
}

export default ChatInput;
