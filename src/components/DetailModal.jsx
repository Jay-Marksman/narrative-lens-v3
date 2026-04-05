import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { matchesPhrase } from '../utils/phraseMatching';
import { analyzeSentiment, getSentimentConfig } from '../utils/sentiment';

const DetailModal = ({ 
  selectedCell, 
  articles, 
  clusters, 
  outlets, 
  dateRange,
  useVariations,
  onClose 
}) => {
  if (!selectedCell) return null;

  const cluster = clusters.find(c => c.id === selectedCell.clusterId);
  const outlet = outlets.find(o => o.id === selectedCell.outletId);

  if (!cluster || !outlet) return null;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);

  const relevantArticles = articles
    .filter(a => a.outlet === outlet.id && new Date(a.publishedAt) >= cutoffDate)
    .map(article => {
      const text = `${article.headline} ${article.description} ${article.content}`;
      const matches = matchesPhrase(text, cluster, useVariations);
      const sentiment = analyzeSentiment(text);
      return { ...article, matchedPhrases: matches, sentiment };
    })
    .filter(a => a.matchedPhrases.length > 0)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const totalMatches = relevantArticles.reduce((sum, a) => sum + a.matchedPhrases.length, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {cluster.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {outlet.fullName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {totalMatches} phrase matches in {relevantArticles.length} articles (last {dateRange} days)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Articles list */}
        <div className="flex-1 overflow-y-auto p-6">
          {relevantArticles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No matching articles found
            </p>
          ) : (
            <div className="space-y-4">
              {relevantArticles.map(article => {
                const sentimentConfig = getSentimentConfig(article.sentiment);
                const uniquePhrases = [...new Set(article.matchedPhrases)];

                return (
                  <div
                    key={article.id}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {article.headline}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {article.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentConfig.className}`}>
                        {sentimentConfig.label}
                      </span>

                      <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs font-medium">
                        {article.matchedPhrases.length} matches
                      </span>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm flex items-center gap-1 ml-auto"
                      >
                        Read article
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <span className="font-semibold">Matched phrases:</span>{' '}
                      {uniquePhrases.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;

