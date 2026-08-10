import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';

function getQueryValue(search: string): string {
  const params = new URLSearchParams(search);
  return params.get('q') || '';
}

function sanitizeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

export default function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState<string>(getQueryValue(location.search));

  useEffect(() => {
    setQuery(getQueryValue(location.search));
  }, [location.search]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.currentTarget.value.slice(0, 100);
    setQuery(nextQuery);

    const params = new URLSearchParams(location.search);
    if (nextQuery) {
      params.set('q', nextQuery);
    } else {
      params.delete('q');
    }

    history.push({
      ...location,
      search: params.toString(),
    });
  };

  return (
    <div>
      <input
        data-testid="search-input"
        value={query}
        onChange={handleInput}
      />
      <div data-testid="search-summary">
        Search results for: "{sanitizeText(query)}"
      </div>
    </div>
  );
}
