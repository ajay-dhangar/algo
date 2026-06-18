import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

/**
 * Maps category names to actual doc paths
 */
interface CategoryPathMap {
  [key: string]: string;
}

const CATEGORY_PATH_MAP: CategoryPathMap = {
  "arrays": "basic-data-structures/array/arrays-in-dsa",
  "array": "basic-data-structures/array/arrays-in-dsa",
  "linked-list": "extra/linked-list/introduction-to-linkedList",
  "linked-lists": "extra/linked-list/introduction-to-linkedList",
  "linkedlist": "extra/linked-list/introduction-to-linkedList",
  "stacks": "extra/Stack/introduction-to-stack",
  "stack": "extra/Stack/introduction-to-stack",
  "queues": "extra/Queue/priority-queue-in-dsa",
  "queue": "extra/Queue/priority-queue-in-dsa",
  "graphs": "extra/graphs/",
  "graph": "extra/graphs/",
  "recursion": "extra/Recursion/fibonacci-recursion",
  "sorting": "extra/sortings/",
  "sortings": "extra/sortings/",
  "searching": "extra/binary-search/",
};

function convertTopicToPath(topic?: string | null): string | null {
  if (!topic) return null;

  let anchor = "";
  const anchorIndex = topic.indexOf("#");
  if (anchorIndex !== -1) {
    anchor = topic.substring(anchorIndex);
    topic = topic.substring(0, anchorIndex);
  }

  const cleanTopic = topic.endsWith("/") ? topic.slice(0, -1) : topic;

  if (cleanTopic.startsWith("category/")) {
    const categoryName = cleanTopic.replace("category/", "").toLowerCase();
    const mappedPath = CATEGORY_PATH_MAP[categoryName];
    if (mappedPath) return `/docs/${mappedPath}${anchor}`;
    console.warn(`[RelatedTopics] Unknown category mapping for: ${categoryName}`);
    return null;
  }

  if (cleanTopic.includes("/")) {
    const trimSlashes = new RegExp('(^/+|/+$)', 'g');
    const normalized = cleanTopic.replace(trimSlashes, "");
    return `/docs/${normalized}${anchor}`;
  }

  const token = cleanTopic.toLowerCase();
  const mapped = CATEGORY_PATH_MAP[token];
  if (mapped) return `/docs/${mapped}${anchor}`;

  console.warn(`[RelatedTopics] Unknown topic token, skipping link: ${topic}`);
  return null;
}

function getTopicLabel(topic?: string | null) {
  if (!topic) return "Topic";
  const pathOnly = topic.split("#")[0];
  const clean = pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;
  const parts = clean.split("/");
  const label = parts[parts.length - 1];

  return label
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function TopicLink({ topic }: { topic?: string | null }) {
  const docPath = convertTopicToPath(topic);

  if (!docPath) return null;

  const label = getTopicLabel(topic);
  const to = useBaseUrl(docPath);

  return (
    <Link
      to={to}
      className="related-topic-link"
    >
      {/* Dynamic inline document icon */}
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      {label}
    </Link>
  );
}

interface RelatedTopicsProps {
  topics?: string[];
}

export default function RelatedTopics({ topics = [] }: RelatedTopicsProps) {
  // Gracefully filter missing topics before rendering
  const validTopics = topics.filter(topic => !!convertTopicToPath(topic));

  if (validTopics.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "48px",
        paddingTop: "24px",
        borderTop: "1px solid var(--ifm-color-emphasis-200, #e3e6e8)",
      }}
    >
      <h3 
        style={{ 
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "var(--ifm-color-emphasis-700, #444950)",
          marginBottom: "16px",
          letterSpacing: "0.3px",
          justifyContent: "center"
        }}
      >
        {/* Section Heading Link Icon */}
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ opacity: 0.8 }}
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        Related Topics
      </h3>

      <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "10px",
          margin: "2rem 0",
          padding: 0,
          justifyContent: "center"
        }}
      >
        {validTopics.map((topic, index) => (
          <div key={`${topic}-${index}`}>
            <TopicLink topic={topic} />
          </div>
        ))}
      </div>
    </div>
  );
}