/**
 * ChatMessage Component
 * Displays individual chat messages with citations
 */

import { User, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ChatMessage component
 * @param {Object} message - Message object
 * @param {Function} onCitationClick - Callback when citation is clicked
 */
function ChatMessage({ message, onCitationClick }) {
  const isUser = message.role === 'user';

  /**
   * Parse message content and render with clickable citations
   */
  const renderMessageContent = () => {
    if (isUser) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    // Parse citations from assistant messages
    const citationRegex = /\[page (\d+)\]/gi;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = citationRegex.exec(message.content)) !== null) {
      // Add text before citation
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: message.content.substring(lastIndex, match.index),
        });
      }

      // Add citation
      parts.push({
        type: 'citation',
        pageNumber: parseInt(match[1], 10),
        text: match[0],
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < message.content.length) {
      parts.push({
        type: 'text',
        content: message.content.substring(lastIndex),
      });
    }

    return (
      <div className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (part.type === 'text') {
            return <span key={index}>{part.content}</span>;
          } else {
            return (
              <button
                key={index}
                onClick={() => onCitationClick(part.pageNumber)}
                className="citation-btn mx-1"
                title={`Go to page ${part.pageNumber}`}
              >
                Page {part.pageNumber}
              </button>
            );
          }
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm
        ${isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
          : 'bg-gradient-to-br from-purple-500 to-purple-600'
        }
      `}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Monitor className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`
        max-w-[85%] p-4 rounded-2xl shadow-sm
        ${isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto' 
          : 'bg-white text-gray-800 border border-gray-100'
        }
      `}>
        {renderMessageContent()}
      </div>
    </motion.div>
  );
}

export default ChatMessage;
