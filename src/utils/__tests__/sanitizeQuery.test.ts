import { describe, it, expect } from 'vitest';
import { sanitizeSearchQuery } from '../sanitizeQuery';

describe('Reflected XSS Search Query Sanitizer Security Tests (#3228)', () => {
  it('escapes HTML script tags into HTML entities', () => {
    const rawInput = '<script>alert("XSS Attack!")</script>';
    const sanitized = sanitizeSearchQuery(rawInput);

    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
    expect(sanitized).toContain('&quot;XSS Attack!&quot;');
  });

  it('caps search query length to a maximum of 100 characters', () => {
    const longInput = 'A'.repeat(150);
    const sanitized = sanitizeSearchQuery(longInput);

    expect(sanitized.length).toBe(100);
  });

  it('strips dangerous javascript: URIs and inline event handlers', () => {
    const rawInput = 'javascript:alert(1) onerror=alert(2)';
    const sanitized = sanitizeSearchQuery(rawInput);

    expect(sanitized).not.toContain('javascript:');
    expect(sanitized).not.toContain('onerror=');
  });

  it('handles empty, null, or non-string inputs gracefully', () => {
    expect(sanitizeSearchQuery('')).toBe('');
    expect(sanitizeSearchQuery(null as any)).toBe('');
    expect(sanitizeSearchQuery(undefined as any)).toBe('');
  });

  it('preserves legitimate search queries while escaping special characters', () => {
    const normalQuery = 'Binary Search & Sorting';
    const sanitized = sanitizeSearchQuery(normalQuery);

    expect(sanitized).toBe('Binary Search &amp; Sorting');
  });
});
