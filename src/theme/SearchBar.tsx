import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import { sanitizeQuery } from '../utils/sanitizeQuery';

export default function SearchBar(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState<string>('');
  const [sanitizedSummary, setSanitizedSummary] = useState<string>('');
  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Parse and sanitize search query parameters from URL query string (?q=...)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search || '');
    const rawQuery = searchParams.get('q') || searchParams.get('search') || '';
    if (rawQuery) {
      const cleanQuery = sanitizeQuery(rawQuery);
      setQuery(cleanQuery);
      setSanitizedSummary(cleanQuery);
    } else {
      setQuery('');
      setSanitizedSummary('');
    }
  }, [location.search]);

  // Safely update DOM summary element using textContent instead of innerHTML
  useEffect(() => {
    if (summaryRef.current) {
      // Safe textContent assignment to prevent HTML injection / Reflected XSS
      summaryRef.current.textContent = sanitizedSummary
        ? `Search results for: "${sanitizedSummary}"`
        : '';
    }
  }, [sanitizedSummary]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    // Cap to 100 characters and sanitize input
    const cleanInput = sanitizeQuery(rawInput);
    setQuery(cleanInput);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search || '');
    if (query) {
      searchParams.set('q', query);
    } else {
      searchParams.delete('q');
    }
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="navbar__search search-bar-container" data-testid="search-bar">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="search"
          aria-label="Search"
          className="navbar__search-input search-input"
          placeholder="Search docs..."
          value={query}
          onChange={handleInputChange}
          maxLength={100}
          data-testid="search-input"
        />
      </form>
      <div
        ref={summaryRef}
        className="search-summary"
        data-testid="search-summary"
        aria-live="polite"
      >
        {/* Rendered safely via textContent and React string interpolation */}
      </div>
    </div>
  );
}
