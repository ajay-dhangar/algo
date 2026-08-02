import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

type Props = {
  title?: string;
  path?: string;
};

const STORAGE_KEY = 'algo_bookmarks_v1';

interface BookmarkItem {
  title?: string;
  path: string;
}

export default function BookmarkButton({ title, path }: Props): JSX.Element {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!path || typeof window === 'undefined') return;
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      let items: BookmarkItem[] = [];

      if (Array.isArray(raw)) {
        if (raw.length === 0) items = [];
        else if (typeof raw[0] === 'string') {
          // legacy format: string[] of paths
          items = (raw as string[]).map((p) => ({ path: p }));
        } else {
          items = raw as BookmarkItem[];
        }
      }

      setBookmarked(items.some((item) => item.path === path));
    } catch {
      setBookmarked(false);
    }
  }, [path]);

  const toggleBookmark = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!path || typeof window === 'undefined') return;
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      let items: BookmarkItem[] = [];

      if (Array.isArray(raw)) {
        if (raw.length && typeof raw[0] === 'string') {
          items = (raw as string[]).map((p) => ({ path: p }));
        } else {
          items = raw as BookmarkItem[];
        }
      }

      const exists = items.some((item) => item.path === path);

      if (exists) {
        items = items.filter((item) => item.path !== path);
      } else {
        items.push({ title, path });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setBookmarked(!exists);
    } catch {
      // best-effort toggle
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
