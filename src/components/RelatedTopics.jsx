import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

/**
 * Maps category names to actual doc paths
 * Example: "category/arrays" -> "/docs/basic-data-structures/array/"
 */
const CATEGORY_PATH_MAP = {
  "arrays": "basic-data-structures/array/",
  "linked-list": "extra/linked-list/",
  "queue": "extra/queue/",
  "stacks": "extra/stack/",
  "graphs": "extra/graphs/",
  "recursion": "programming-fundamentals/functions/",  // Adjust if recursion has its own folder
  "sorting": "extra/sortings/",
  "searching": "extra/binary-search/",
};

/**
 * Converts topic path to correct Docusaurus doc link
 * Handles formats like:
 * - "category/arrays" -> "/docs/basic-data-structures/array/"
 * - "extra/graphs/bfs" -> "/docs/extra/graphs/bfs/"
 * - "extra/graphs/bfs/#definition" -> "/docs/extra/graphs/bfs/#definition"
 */
function convertTopicToPath(topic) {
  if (!topic) return null;

  // Preserve anchor if present
  let anchor = "";
  const anchorIndex = topic.indexOf("#");
  if (anchorIndex !== -1) {
    anchor = topic.substring(anchorIndex);
    topic = topic.substring(0, anchorIndex);
  }

  // Remove trailing slash for consistent processing
  const cleanTopic = topic.endsWith("/") ? topic.slice(0, -1) : topic;

  // Handle "category/*" format
  if (cleanTopic.startsWith("category/")) {
    const categoryName = cleanTopic.replace("category/", "").toLowerCase();
    const mappedPath = CATEGORY_PATH_MAP[categoryName];
    if (mappedPath) {
      return `/docs/${mappedPath}${anchor}`;
    }
    // Fallback: treat category name as folder
    return `/docs/basic-data-structures/${categoryName}/${anchor}`;
  }

  // Handle direct doc paths like "extra/graphs/bfs"
  return `/docs/${cleanTopic}/${anchor}`;
}

/**
 * Extracts display label from topic path
 * Example: "category/arrays" -> "Arrays", "extra/graphs/bfs" -> "BFS"
 */
function getTopicLabel(topic) {
  if (!topic) return "Topic";

  // Remove anchor
  const pathOnly = topic.split("#")[0];
  
  // Remove trailing slash
  const clean = pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;

  // Get last part of path
  const parts = clean.split("/");
  const label = parts[parts.length - 1];

  // Convert kebab-case to Title Case
  return label
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function TopicLink({ topic }) {
  const docPath = convertTopicToPath(topic);
  const label = getTopicLabel(topic);
  
  // Use useBaseUrl to properly handle baseUrl
  const to = useBaseUrl(docPath);

  if (!docPath) {
    console.warn(`[RelatedTopics] Invalid topic: ${topic}`);
    return null;
  }

  return (
    <Link
      to={to}
      style={{
        color: "var(--ifm-color-primary, #1890ff)",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </Link>
  );
}

export default function RelatedTopics({ topics = [] }) {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid var(--ifm-color-emphasis-200, #e0e0e0)",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>Related Topics</h2>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {topics.map((topic, index) => (
          <li key={`${topic}-${index}`} style={{ marginBottom: "10px" }}>
            <TopicLink topic={topic} />
          </li>
        ))}
      </ul>
    </div>
  );
}