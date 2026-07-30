import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';

describe('Production CSP & Security Headers Tests (#3229)', () => {
  const headersFilePath = path.join(process.cwd(), 'static', '_headers');

  it('verifies static/_headers file exists in static directory', () => {
    expect(fs.existsSync(headersFilePath)).toBe(true);
  });

  it('contains Content-Security-Policy directive in static/_headers', () => {
    const content = fs.readFileSync(headersFilePath, 'utf-8');
    expect(content).toContain('Content-Security-Policy:');
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self'");
  });

  it('contains essential security response headers', () => {
    const content = fs.readFileSync(headersFilePath, 'utf-8');
    expect(content).toContain('X-Frame-Options: SAMEORIGIN');
    expect(content).toContain('X-Content-Type-Options: nosniff');
    expect(content).toContain('Referrer-Policy: strict-origin-when-cross-origin');
  });
});
