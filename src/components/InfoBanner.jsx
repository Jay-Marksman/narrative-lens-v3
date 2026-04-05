import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

export const GettingStartedBanner = () => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 transition-colors">
    <div className="flex gap-3">
      <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Getting Started
        </h3>
        <p className="text-blue-800 dark:text-blue-400">
          Click "Fetch Latest Data" to begin collecting articles. RSS feeds work immediately
          without API keys. Configure outlets and clusters in Settings.
        </p>
      </div>
    </div>
  </div>
);

export const ErrorBanner = ({ message, onDismiss }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors">
    <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">Error</h3>
          <p className="text-red-800 dark:text-red-400">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
        >
          ×
        </button>
      )}
    </div>
  </div>
);

