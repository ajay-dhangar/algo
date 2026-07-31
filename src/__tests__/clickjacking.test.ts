import fs from 'fs';
import path from 'path';

describe('Anti-Clickjacking & Strict Origin Security Tests (#3251)', () => {
  const headersFilePath = path.join(process.cwd(), 'static', '_headers');

  it('verifies X-Frame-Options: SAMEORIGIN is present in static/_headers', () => {
    expect(fs.existsSync(headersFilePath)).toBe(true);
    const content = fs.readFileSync(headersFilePath, 'utf-8');
    expect(content).toContain('X-Frame-Options: SAMEORIGIN');
  });

  it('verifies frame-ancestors self CSP directive is present in static/_headers', () => {
    const content = fs.readFileSync(headersFilePath, 'utf-8');
    expect(content).toContain("frame-ancestors 'self'");
  });
});
