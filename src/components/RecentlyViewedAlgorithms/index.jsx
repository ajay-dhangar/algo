import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import {
  getRecentAlgorithms,
} from "../../utils/recentAlgorithms";

export default function RecentlyViewedAlgorithms() {
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    setAlgorithms(getRecentAlgorithms());
  }, []);

  if (algorithms.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Recently Viewed Algorithms</h2>

      <ul>
        {algorithms.map((algo) => (
          <li key={algo.path}>
            <Link to={algo.path}>{algo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}