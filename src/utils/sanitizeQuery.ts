/**
 * Sanitizes search query URL parameters to prevent Reflected Cross-Site Scripting (XSS).
 * Performs HTML entity encoding and input length capping (max 100 characters).
 *
 * @param query - Raw search query from URL parameter or user input
 * @returns Sanitized and safe search query string
 */
export function sanitizeQuery(query: string): string {
  if (typeof query !== 'string') {
    return '';
  }

  // 1. Input length validation - cap input to 100 characters
  const trimmedQuery = query.slice(0, 100);

  // 2. HTML entity encoding to prevent XSS script injection
  const sanitized = trimmedQuery.replace(/[&<>"'/]/g, (char: string) => {
    const htmlEntities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return htmlEntities[char] || char;
  });

  // 3. Return sanitized output — no second truncation to avoid cutting
  //   HTML entities mid-entity (e.g. "&quo" from "&quot;")
  return sanitized;
}

export default sanitizeQuery;
