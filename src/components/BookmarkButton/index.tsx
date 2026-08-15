import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

type Props = {
  title?: string;
  path?: string;
};

const PRIMARY_STORAGE_KEY = 'favorite-algorithms';
const LEGACY_STORAGE_KEY = 'algo_bookmarks_v1';

interface BookmarkItem {
  title?: string;
  path: string;
  addedAt?: string;
}

export default function BookmarkButton({ title, path }: Props): JSX.Element {
  const [bookmarked, setBookmarked] = useState(false);

  const getItemsFromStorage = (): BookmarkItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const rawPrimary = localStorage.getItem(PRIMARY_STORAGE_KEY);
      const raw = rawPrimary || localStorage.getItem(LEGACY_STORAGE_KEY) || '[]';
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      if (parsed.length > 0 && typeof parsed[0] === 'string') {
        return (parsed as string[]).map((p) => ({ title: p, path: p, addedAt: new Date().toISOString() }));
      }
      return parsed as BookmarkItem[];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!path || typeof window === 'undefined') return;
    const checkState = () => {
      const items = getItemsFromStorage();
      setBookmarked(items.some((item) => item.path === path));
    };
    checkState();

    window.addEventListener('bookmarksUpdated', checkState);
    window.addEventListener('storage', checkState);
    return () => {
      window.removeEventListener('bookmarksUpdated', checkState);
      window.removeEventListener('storage', checkState);
    };
  }, [path]);

  const toggleBookmark = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!path || typeof window === 'undefined') return;
    try {
      let items = getItemsFromStorage();
      const exists = items.some((item) => item.path === path);

      if (exists) {
        items = items.filter((item) => item.path !== path);
      } else {
        items.push({
          title: title || path,
          path,
          addedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem(PRIMARY_STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('bookmarksUpdated'));
      setBookmarked(!exists);
    } catch {
      setBookmarked((v) => !v);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`bookmark-btn ${bookmarked ? 'bookmark-active' : ''}`}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', marginLeft: 8 }}
    >
      {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}
