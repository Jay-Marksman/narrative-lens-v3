import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const FetchStatus = ({ results, onDismiss }) => {
  if (!results) return null;

  const { successful, failed, newArticles } = results;
  const total = successful + failed;

  if (total === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Fetch Results</h3>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ×
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Successful</div>
            <div className="font-bold text-gray-900 dark:text-white">{successful}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
            <div className="font-bold text-gray-900 dark:text-white">{failed}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">New Articles</div>
            <div className="font-bold text-gray-900 dark:text-white">{newArticles}</div>
          </div>
        </div>
      </div>

      {failed > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Some feeds failed. Check console for details or try disabling problematic outlets.
        </p>
      )}
    </div>
  );
};

export default FetchStatus;

