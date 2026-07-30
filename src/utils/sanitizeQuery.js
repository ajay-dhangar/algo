/**
 * Search Query Sanitizer Utility for Algo (Docusaurus)
 * Prevents Reflected Cross-Site Scripting (XSS) attacks in search URL query parameters.
 */

/**
 * Sanitizes search query string to prevent Reflected XSS.
 * Caps length to 100 characters and applies HTML entity encoding.
 * 
 * @param {string} query - Raw search query string from URL parameters
 * @returns {string} Sanitized, safe search query string
 */
export function sanitizeSearchQuery(query) {
  if (!query || typeof query !== 'string') {
    return '';
  }

  // 1. Trim whitespace and cap length to 100 characters
  let sanitized = query.trim().slice(0, 100);

  // 2. Strip dangerous protocol URIs & event handler attributes
  sanitized = sanitized.replace(/(javascript|vbscript|data):/gi, '');
  sanitized = sanitized.replace(/\s+on[a-z0-9_\-]+\s*=/gi, '');

  // 3. Perform HTML Entity Encoding
  const htmlEntityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return sanitized.replace(/[&<>"'/]/g, (char) => htmlEntityMap[char] || char);
}

export default sanitizeSearchQuery;
