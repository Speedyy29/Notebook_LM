/**
 * ProgressBar Component
 * Displays upload/processing progress
 */

import { Loader2 } from 'lucide-react';

/**
 * ProgressBar component
 * @param {number} progress - Progress percentage (0-100)
 * @param {string} message - Progress message
 */
function ProgressBar({ progress, message = 'Uploading PDF' }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
          <Loader2 className="w-5 h-5 text-white animate-spin" />
        </div>
        <span className="text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {message}
        </span>
        <span className="ml-auto text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 transition-all duration-300 ease-out rounded-full shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
