import React from 'react';
import { X } from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { calculateTimeSeriesData } from '../utils/calculations';

const TrendsModal = ({ 
  clusterId, 
  articles, 
  clusters, 
  outlets, 
  useVariations,
  onClose 
}) => {
  if (!clusterId) return null;

  const cluster = clusters.find(c => c.id === clusterId);
  if (!cluster) return null;

  const timeSeriesData = calculateTimeSeriesData(
    clusterId,
    articles,
    clusters,
    outlets,
    useVariations
  );

  const enabledOutlets = outlets.filter(o => o.enabled);

  // Calculate total sentiment stats
  const totalSentiment = timeSeriesData.reduce((acc, week) => {
    acc.positive += week.positive;
    acc.neutral += week.neutral;
    acc.negative += week.negative;
    return acc;
  }, { positive: 0, neutral: 0, negative: 0 });

  const totalArticles = totalSentiment.positive + totalSentiment.neutral + totalSentiment.negative;
  const sentimentPercentages = {
    positive: totalArticles > 0 ? ((totalSentiment.positive / totalArticles) * 100).toFixed(1) : 0,
    neutral: totalArticles > 0 ? ((totalSentiment.neutral / totalArticles) * 100).toFixed(1) : 0,
    negative: totalArticles > 0 ? ((totalSentiment.negative / totalArticles) * 100).toFixed(1) : 0
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="space-y-1">
            {/* Sentiment bars first */}
            {payload.filter(p => ['positive', 'neutral', 'negative'].includes(p.dataKey)).map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-700 dark:text-gray-300 capitalize">{entry.name}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{entry.value}</span>
              </div>
            ))}
            
            <div className="border-t dark:border-gray-600 my-2" />
            
            {/* Outlet lines */}
            {payload.filter(p => !['positive', 'neutral', 'negative'].includes(p.dataKey)).map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-0.5" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-700 dark:text-gray-300">{entry.name}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto transition-colors">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Trend Analysis: {cluster.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Weekly phrase frequency and sentiment over time
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {timeSeriesData.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Not enough data to show trends. Collect more articles over time.
            </p>
          ) : (
            <>
              {/* Sentiment Summary */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">Positive</span>
                    <span className="text-2xl font-bold text-green-900 dark:text-green-200">
                      {sentimentPercentages.positive}%
                    </span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                    {totalSentiment.positive} matches
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/20 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">Neutral</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                      {sentimentPercentages.neutral}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-400 mt-1">
                    {totalSentiment.neutral} matches
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-800 dark:text-red-300">Negative</span>
                    <span className="text-2xl font-bold text-red-900 dark:text-red-200">
                      {sentimentPercentages.negative}%
                    </span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                    {totalSentiment.negative} matches
                  </p>
                </div>
              </div>

              {/* Chart */}
              <ResponsiveContainer width="100%" height={450}>
                <ComposedChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" className="dark:opacity-20" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })
                    }
                    className="dark:text-gray-400"
                  />
                  <YAxis
                    yAxisId="left"
                    label={{
                      value: 'Phrase Matches',
                      angle: -90,
                      position: 'insideLeft',
                      className: 'dark:fill-gray-400'
                    }}
                    className="dark:text-gray-400"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {/* Stacked Sentiment Bars */}
                  <Bar
                    yAxisId="left"
                    dataKey="positive"
                    stackId="sentiment"
                    fill="#10b981"
                    name="Positive"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="neutral"
                    stackId="sentiment"
                    fill="#6b7280"
                    name="Neutral"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="negative"
                    stackId="sentiment"
                    fill="#ef4444"
                    name="Negative"
                    radius={[4, 4, 0, 0]}
                  />
                  
                  {/* Outlet Lines */}
                  {enabledOutlets.map(outlet => (
                    <Line
                      key={outlet.id}
                      yAxisId="left"
                      type="monotone"
                      dataKey={outlet.id}
                      name={outlet.name}
                      stroke={outlet.color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>

              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-300">
                  Insights
                </h3>
                <ul className="text-blue-800 dark:text-blue-400 space-y-1 text-sm">
                  <li><strong>Stacked bars</strong> show sentiment distribution (green = positive, gray = neutral, red = negative)</li>
                  <li><strong>Colored lines</strong> track individual outlet coverage over time</li>
                  <li><strong>Spikes</strong> indicate increased coverage, often correlating with major news events</li>
                  <li><strong>Sentiment shifts</strong> reveal how framing changes as stories develop</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendsModal;
