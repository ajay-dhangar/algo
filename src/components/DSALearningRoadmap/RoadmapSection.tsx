import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Section } from "../../data/roadmapData";
import RoadmapTopic from "./RoadmapTopic";

interface RoadmapSectionProps {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}

const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  section,
  isOpen,
  onToggle,
}) => (
  <div style={{ marginBottom: 6 }}>
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ifm-color-primary)]"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        color: isOpen ? "var(--ifm-color-primary)" : "var(--ifm-font-color-base)",
        background: isOpen
          ? "var(--ifm-color-primary-lightest)"
          : "var(--ifm-background-surface-color)",
      }}
    >
      <span>{section.name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            opacity: 0.5,
            fontWeight: 500,
          }}
        >
          {section.topics.length} topics
        </span>
        <FaChevronDown
          style={{
            fontSize: 9,
            opacity: 0.4,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
    </button>
    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ overflow: "hidden", minHeight: 0, padding: "8px 16px 4px" }}>
        {section.topics.map((topic, i) => (
          <RoadmapTopic key={i} topic={topic} />
        ))}
      </div>
    </div>
  </div>
);

export default RoadmapSection;
