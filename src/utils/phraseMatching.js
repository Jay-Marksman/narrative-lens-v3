/**
 * Checks if text contains any phrases from a cluster
 * @param {string} text - Text to search in
 * @param {object} cluster - Cluster object with exact and variations arrays
 * @param {boolean} useVariations - Whether to include variation phrases
 * @returns {array} - Array of matched phrases
 */
export const matchesPhrase = (text, cluster, useVariations) => {
  if (!text) return [];

  const lowerText = text.toLowerCase();
  const phrases = useVariations
    ? [...cluster.exact, ...cluster.variations]
    : cluster.exact;

  return phrases.filter(phrase =>
    lowerText.includes(phrase.toLowerCase())
  );
};

/**
 * Strip HTML tags and entities from text
 * @param {string} html - HTML string to clean
 * @returns {string} - Plain text
 */
export const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim();
};

