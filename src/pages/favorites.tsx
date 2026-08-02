import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";

const STORAGE_KEY = "favorite-algorithms";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    setFavorites(stored);
  }, []);

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1>⭐ Favorite Algorithms</h1>

      {favorites.length === 0 ? (
        <p>No favorite algorithms yet.</p>
      ) : (
        <ul>
          {favorites.map((item: any) => (
            <li key={item.path}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}