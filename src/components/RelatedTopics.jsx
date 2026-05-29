import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

/**
 * Maps category names to actual doc paths
 * Example: "category/arrays" -> "/docs/basic-data-structures/array/"
 */
const CATEGORY_PATH_MAP = {
  // Basic data structures (using doc IDs from frontmatter)
  "arrays": "basic-data-structures/array/arrays-in-dsa",
  "array": "basic-data-structures/array/arrays-in-dsa",

  // Linked lists (camelCase doc ID)
  "linked-list": "extra/linked-list/introduction-to-linkedList",
  "linked-lists": "extra/linked-list/introduction-to-linkedList",
  "linkedlist": "extra/linked-list/introduction-to-linkedList",

  // Stacks & Queues (using correct doc IDs from frontmatter)
  "stacks": "extra/Stack/introduction-to-stack",
  "stack": "extra/Stack/introduction-to-stack",
  "queues": "extra/Queue/priority-queue-in-dsa",
  "queue": "extra/Queue/priority-queue-in-dsa",

  // Graphs, recursion, algorithms
  "graphs": "extra/graphs/",
  "graph": "extra/graphs/",
  "recursion": "extra/Recursion/fibonacci-recursion",

  // Sorting / Searching
  "sorting": "extra/sortings/",
  "sortings": "extra/sortings/",
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

    // If we don't have an explicit mapping, avoid generating a potentially-broken link.
    // Log and return null so caller can skip rendering the link.
    console.warn(`[RelatedTopics] Unknown category mapping for: ${categoryName}`);
    return null;
  }

  // Handle direct doc paths like "extra/graphs/bfs" (assume author provided valid path)
  // Normalize and ensure no double slashes
  if (cleanTopic.includes("/")) {
    // Use RegExp constructor to avoid issues with literal parsing during build
    const trimSlashes = new RegExp('(^/+|/+$)', 'g');
    const normalized = cleanTopic.replace(trimSlashes, "");
    return `/docs/${normalized}${anchor}`;
  }

  // If it's a single token (e.g. "arrays"), try to map via CATEGORY_PATH_MAP
  const token = cleanTopic.toLowerCase();
  const mapped = CATEGORY_PATH_MAP[token];
  if (mapped) return `/docs/${mapped}${anchor}`;

  // Unknown single token — avoid creating a broken link
  console.warn(`[RelatedTopics] Unknown topic token, skipping link: ${topic}`);
  return null;
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