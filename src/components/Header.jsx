import React from 'react';
import { RefreshCw, Settings, Moon, Sun } from 'lucide-react';

const Header = ({ 
  loading, 
  lastUpdate, 
  darkMode,
  onFetchData, 
  onToggleSettings,
  onToggleDarkMode 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
              Narrative Lens
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track language patterns across mainstream media
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onToggleDarkMode}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={onToggleSettings}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>

            <button
              onClick={onFetchData}
              disabled={loading}
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Fetching...' : 'Fetch Latest Data'}
            </button>
          </div>
        </div>

        {lastUpdate && (
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(lastUpdate).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

