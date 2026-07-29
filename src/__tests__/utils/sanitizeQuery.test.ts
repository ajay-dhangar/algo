import { sanitizeQuery } from '../../utils/sanitizeQuery';

describe('sanitizeQuery Utility', () => {
  it('should encode HTML entities to prevent script injection (Reflected XSS)', () => {
    const maliciousInput = '<script>alert("XSS")</script>';
    const sanitized = sanitizeQuery(maliciousInput);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
  });

  it('should encode img tag onerror payload', () => {
    const maliciousInput = '<img src=x onerror=alert(1)>';
    const sanitized = sanitizeQuery(maliciousInput);
    expect(sanitized).toBe('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('should cap search query length to 100 characters', () => {
    const longInput = 'a'.repeat(150);
    const sanitized = sanitizeQuery(longInput);
    expect(sanitized.length).toBe(100);
    expect(sanitized).toBe('a'.repeat(100));
  });

  it('should sanitize and cap combined long payload with special characters to max 100 characters', () => {
    const longPayload = '<script>' + 'a'.repeat(120) + '</script>';
    const sanitized = sanitizeQuery(longPayload);
    expect(sanitized.length).toBeLessThanOrEqual(100);
    expect(sanitized).not.toContain('<script>');
  });

  it('should return empty string for non-string inputs', () => {
    expect(sanitizeQuery(null as unknown as string)).toBe('');
    expect(sanitizeQuery(undefined as unknown as string)).toBe('');
    expect(sanitizeQuery(123 as unknown as string)).toBe('');
  });

  it('should return plain text query unchanged if no special HTML characters exist', () => {
    const safeQuery = 'binary search algorithm';
    expect(sanitizeQuery(safeQuery)).toBe('binary search algorithm');
  });
});
