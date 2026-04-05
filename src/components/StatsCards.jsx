import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsCards = ({ articles, outlets, clusters, heatmapData }) => {
  const enabledOutlets = outlets.filter(o => o.enabled);
  
  const totalMatches = Object.values(heatmapData).reduce((sum, cluster) => {
    return sum + Object.values(cluster).reduce((s, count) => s + count, 0);
  }, 0);

  const stats = [
    { label: 'Total Articles', value: articles.length },
    { label: 'Total Matches', value: totalMatches },
    { label: 'Active Outlets', value: enabledOutlets.length },
    { label: 'Semantic Clusters', value: clusters.length }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

