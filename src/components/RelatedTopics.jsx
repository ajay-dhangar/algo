import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

function TopicLink({ topic }) {
  const slug = topic.toLowerCase().replace(/\s+/g, "-");
  const to = useBaseUrl(`/docs/programming-fundamentals/${slug}`);

  return (
    <Link
      to={to}
      style={{
        color: "blue",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {topic}
    </Link>
  );
}

export default function RelatedTopics({ topics = [] }) {
  return (
    <div
      style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid #444",
      }}
    >
      <h2>Related Topics</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {topics.map((topic, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <TopicLink topic={topic} />
          </li>
        ))}
      </ul>
    </div>
  );
}