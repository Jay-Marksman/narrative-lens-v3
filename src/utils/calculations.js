import { matchesPhrase } from './phraseMatching';
import { analyzeSentiment } from './sentiment';

/**
 * Calculate heatmap data from articles
 * @param {array} articles - All articles
 * @param {array} clusters - Semantic clusters
 * @param {array} outlets - News outlets
 * @param {number} dateRange - Days to include
 * @param {boolean} useVariations - Include phrase variations
 * @returns {object} - Heatmap data and sentiment data
 */
export const calculateHeatmap = (articles, clusters, outlets, dateRange, useVariations) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);

  const data = {};
  const sentimentData = {};
  const enabledOutlets = outlets.filter(o => o.enabled);

  clusters.forEach(cluster => {
    data[cluster.id] = {};
    sentimentData[cluster.id] = {};

    enabledOutlets.forEach(outlet => {
      const outletArticles = articles.filter(
        a => a.outlet === outlet.id && new Date(a.publishedAt) >= cutoffDate
      );

      let matchCount = 0;
      const sentiments = { positive: 0, negative: 0, neutral: 0 };

      outletArticles.forEach(article => {
        const text = `${article.headline} ${article.description} ${article.content}`;
        const matches = matchesPhrase(text, cluster, useVariations);

        if (matches.length > 0) {
          matchCount += matches.length;
          const sentiment = analyzeSentiment(text);
          sentiments[sentiment]++;
        }
      });

      data[cluster.id][outlet.id] = matchCount;
      sentimentData[cluster.id][outlet.id] = sentiments;
    });
  });

  return { heatmapData: data, sentimentData };
};

/**
 * Calculate time-series data for trend visualization with sentiment
 * @param {string} clusterId - Cluster to analyze
 * @param {array} articles - All articles
 * @param {array} clusters - Semantic clusters
 * @param {array} outlets - News outlets
 * @param {boolean} useVariations - Include phrase variations
 * @returns {array} - Time-series data points with sentiment
 */
export const calculateTimeSeriesData = (clusterId, articles, clusters, outlets, useVariations) => {
  const cluster = clusters.find(c => c.id === clusterId);
  if (!cluster) return [];

  const weeklyData = {};
  const enabledOutlets = outlets.filter(o => o.enabled);

  articles.forEach(article => {
    const articleDate = new Date(article.publishedAt);
    const weekStart = new Date(articleDate);
    weekStart.setDate(articleDate.getDate() - articleDate.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { 
        date: weekKey,
        positive: 0,
        neutral: 0,
        negative: 0
      };
      enabledOutlets.forEach(outlet => {
        weeklyData[weekKey][outlet.id] = 0;
      });
    }

    const text = `${article.headline} ${article.description} ${article.content}`;
    const matches = matchesPhrase(text, cluster, useVariations);
    
    if (matches.length > 0) {
      // Track outlet-specific counts
      if (weeklyData[weekKey][article.outlet] !== undefined) {
        weeklyData[weekKey][article.outlet] += matches.length;
      }
      
      // Track sentiment counts
      const sentiment = analyzeSentiment(text);
      weeklyData[weekKey][sentiment] += matches.length;
    }
  });

  return Object.values(weeklyData)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-12); // Last 12 weeks
};

/**
 * Get heatmap cell color based on match count
 * @param {number} count - Number of matches
 * @returns {string} - Hex color code
 */
export const getHeatmapColor = (count) => {
  if (count === 0) return '#f5f5f5';
  if (count < 5) return '#fef3c7';
  if (count < 10) return '#fde68a';
  if (count < 20) return '#fcd34d';
  if (count < 40) return '#fbbf24';
  return '#f59e0b';
};

