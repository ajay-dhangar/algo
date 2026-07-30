import React, { useEffect, useState } from 'react';
import { sanitizeSearchQuery } from '../../utils/sanitizeQuery';

/**
 * Swizzled SearchBar Component for Algo (Docusaurus)
 * Sanitizes URL search query parameters (?q=... / ?search=...) before rendering
 * to prevent Reflected Cross-Site Scripting (XSS).
 */
export function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location) {
      const params = new URLSearchParams(window.location.search);
      const rawQuery = params.get('q') || params.get('search') || '';
      if (rawQuery) {
        setSearchQuery(sanitizeSearchQuery(rawQuery));
      }
    }
  }, []);

  return (
    <div className="navbar__search-wrapper flex items-center">
      <input
        type="search"
        aria-label="Search"
        placeholder="Search algorithms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(sanitizeSearchQuery(e.target.value))}
        className="navbar__search-input px-3 py-1 border rounded text-sm focus:outline-none"
      />
      {searchQuery && (
        <span className="ml-2 text-xs text-gray-500 search-query-summary">
          Query: <strong className="font-semibold">{searchQuery}</strong>
        </span>
      )}
    </div>
  );
}

export default SearchBar;
