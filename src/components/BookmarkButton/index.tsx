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
import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

interface BookmarkButtonProps {
  title: string;
  path: string;
}

const STORAGE_KEY = "favorite-algorithms";

interface BookmarkItem {
  title: string;
  path: string;
}

export default function BookmarkButton({
  title,
  path,
}: BookmarkButtonProps): JSX.Element {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored: BookmarkItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    setBookmarked(stored.some((item) => item.path === path));
  }, [path]);

  const toggleBookmark = () => {
    if (typeof window === "undefined") return;

    const stored: BookmarkItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (bookmarked) {
      const updated = stored.filter((item) => item.path !== path);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setBookmarked(false);
    } else {
      if (!stored.some((item) => item.path === path)) {
        stored.push({
          title,
          path,
        });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      aria-label={
        bookmarked ? "Remove Bookmark" : "Add Bookmark"
      }
      title={
        bookmarked ? "Remove Bookmark" : "Add Bookmark"
      }
      className={`bookmark-btn ${
        bookmarked ? "bookmark-active" : ""
      }`}
    >
      {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}