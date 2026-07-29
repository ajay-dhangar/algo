import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../theme/SearchBar';

const mockPush = jest.fn();
let mockSearch = '';

jest.mock('@docusaurus/router', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
  useLocation: () => ({
    pathname: '/docs',
    search: mockSearch,
  }),
}));

describe('SearchBar Security & Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearch = '';
  });

  it('renders search input and search summary safely', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-summary')).toBeInTheDocument();
  });

  it('sanitizes malicious URL search query parameters (?q=<script>)', () => {
    mockSearch = '?q=<script>alert("xss")</script>';
    render(<SearchBar />);

    const summary = screen.getByTestId('search-summary');
    expect(summary.textContent).not.toContain('<script>');
    expect(summary.textContent).toBe('Search results for: "&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;"');
  });

  it('uses textContent instead of innerHTML for search summary', () => {
    mockSearch = '?q=<b>bold</b>';
    render(<SearchBar />);

    const summary = screen.getByTestId('search-summary');
    expect(summary.children.length).toBe(0);
    expect(summary.textContent).toBe('Search results for: "&lt;b&gt;bold&lt;&#x2F;b&gt;"');
  });

  it('caps search query input to 100 characters', () => {
    render(<SearchBar />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;

    const longQuery = 'a'.repeat(150);
    fireEvent.change(input, { target: { value: longQuery } });

    expect(input.value.length).toBe(100);
  });

  it('sanitizes input on form submit', () => {
    render(<SearchBar />);
    const input = screen.getByTestId('search-input');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: '<svg onload=alert(1)>' } });
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/docs',
      search: 'q=%26lt%3Bsvg+onload%3Dalert%281%29%26gt%3B',
    });
  });
});
