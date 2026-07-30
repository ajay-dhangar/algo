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

  // 3. Ensure final sanitized output does not exceed 100 characters
  return sanitized.slice(0, 100);
}

export default sanitizeQuery;
