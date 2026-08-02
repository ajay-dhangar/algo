import React, { useEffect, useState } from 'react';

type Props = {
  title?: string;
  path?: string;
};

const STORAGE_KEY = 'algo_bookmarks_v1';

export default function BookmarkButton({ title, path }: Props): JSX.Element {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!path || typeof window === 'undefined') return;
    try {
      const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
      setBookmarked(items.includes(path));
    } catch {
      setBookmarked(false);
    }
  }, [path]);

  function toggleBookmark(e: React.MouseEvent) {
    e.preventDefault();
    if (!path || typeof window === 'undefined') return;
    try {
      const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
      const exists = items.includes(path);
      const next = exists ? items.filter((p) => p !== path) : [...items, path];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setBookmarked(!exists);
    } catch {
      // best-effort UI toggle on any error
      setBookmarked((v) => !v);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', marginLeft: 8 }}
      className="bookmark-button"
    >
      {bookmarked ? '★' : '☆'}
    </button>
  );
}