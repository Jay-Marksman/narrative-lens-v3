import React from 'react';
import { TrendingUp } from 'lucide-react';
import { getHeatmapColor } from '../utils/calculations';

const Heatmap = ({ 
  heatmapData, 
  clusters, 
  outlets, 
  onCellClick,
  onViewTrends 
}) => {
  const enabledOutlets = outlets.filter(o => o.enabled);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 overflow-hidden transition-colors">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Phrase Frequency Heatmap
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Click any cell to see detailed breakdown
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex">
            {/* Cluster labels column */}
            <div className="flex-shrink-0 w-48 border-r dark:border-gray-700">
              <div className="h-16 border-b dark:border-gray-700" />
              {clusters.map(cluster => (
                <div
                  key={cluster.id}
                  className="h-16 border-b dark:border-gray-700 px-3 flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {cluster.name}
                  </span>
                  <button
                    onClick={() => onViewTrends(cluster.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all"
                    title="View trend chart"
                  >
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Outlet columns */}
            {enabledOutlets.map(outlet => (
              <div key={outlet.id} className="flex-shrink-0">
                {/* Outlet header */}
                <div className="h-16 w-24 border-b border-r dark:border-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {outlet.name}
                    </div>
                    <div
                      className="w-8 h-1 mx-auto mt-1 rounded"
                      style={{ backgroundColor: outlet.color }}
                    />
                  </div>
                </div>

                {/* Data cells */}
                {clusters.map(cluster => {
                  const count = heatmapData[cluster.id]?.[outlet.id] || 0;
                  return (
                    <div
                      key={`${cluster.id}-${outlet.id}`}
                      className="h-16 w-24 border-b border-r dark:border-gray-700 flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
                      style={{ backgroundColor: getHeatmapColor(count) }}
                      onClick={() => onCellClick(cluster.id, outlet.id)}
                    >
                      <span className="text-lg font-semibold text-gray-900">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;

