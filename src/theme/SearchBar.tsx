import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';

function encodeSafeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') || '');
  }, [location.search]);

  const safeQuery = useMemo(() => encodeSafeText(query), [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.slice(0, 100);
    setQuery(nextValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.delete('q');
    if (query) {
      nextSearch.set('q', encodeSafeText(query));
    }
    history.push({
      pathname: location.pathname,
      search: nextSearch.toString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search"
      />
      <div data-testid="search-summary">
        {`Search results for: "${safeQuery}"`}
      </div>
    </form>
  );
}

export default SearchBar;
