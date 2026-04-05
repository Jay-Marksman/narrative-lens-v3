import { POSITIVE_WORDS, NEGATIVE_WORDS } from '../constants/sentimentLexicon';

/**
 * Analyzes the sentiment of text using a lexicon-based approach
 * @param {string} text - The text to analyze
 * @returns {string} - 'positive', 'negative', or 'neutral'
 */
export const analyzeSentiment = (text) => {
  if (!text) return 'neutral';

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\W+/);

  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (POSITIVE_WORDS.includes(word)) positiveCount++;
    if (NEGATIVE_WORDS.includes(word)) negativeCount++;
  });

  const total = positiveCount + negativeCount;
  if (total === 0) return 'neutral';

  const positiveRatio = positiveCount / total;

  if (positiveRatio > 0.6) return 'positive';
  if (positiveRatio < 0.4) return 'negative';
  return 'neutral';
};

/**
 * Get sentiment badge styling
 * @param {string} sentiment - 'positive', 'negative', or 'neutral'
 * @returns {object} - Badge configuration
 */
export const getSentimentConfig = (sentiment) => {
  const configs = {
    positive: {
      className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      label: 'Positive'
    },
    negative: {
      className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      label: 'Negative'
    },
    neutral: {
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      label: 'Neutral'
    }
  };

  return configs[sentiment] || configs.neutral;
};

