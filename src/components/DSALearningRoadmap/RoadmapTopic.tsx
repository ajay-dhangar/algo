import React from "react";

interface RoadmapTopicProps {
  topic: string;
}

const RoadmapTopic: React.FC<RoadmapTopicProps> = ({ topic }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      padding: "6px 0",
    }}
  >
    <span
      style={{
        marginTop: 7,
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "var(--ifm-color-emphasis-400)",
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontSize: 13,
        color: "var(--ifm-font-color-secondary)",
        lineHeight: 1.55,
      }}
    >
      {topic}
    </span>
  </div>
);

export default RoadmapTopic;
