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