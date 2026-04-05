import React from 'react';
import { Calendar } from 'lucide-react';

const ControlBar = ({ 
  useVariations, 
  dateRange, 
  articleCount,
  onToggleVariations, 
  onChangeDateRange 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between transition-colors">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="variations"
          checked={useVariations}
          onChange={(e) => onToggleVariations(e.target.checked)}
          className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
        />
        <label htmlFor="variations" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Include phrase variations
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <select
          value={dateRange}
          onChange={(e) => onChangeDateRange(Number(e.target.value))}
          className="px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        {articleCount} articles in database
      </div>
    </div>
  );
};

export default ControlBar;

