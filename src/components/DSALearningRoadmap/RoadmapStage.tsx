import React from "react";
import Link from "@docusaurus/Link";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import { Stage } from "../../data/roadmapData";
import RoadmapSection from "./RoadmapSection";

interface RoadmapStageProps {
  stage: Stage;
  isOpen: boolean;
  isDone: boolean;
  expandedSections: Set<string>;
  totalStages: number;
  nextStage?: Stage;
  onToggleStage: (id: number) => void;
  onToggleSection: (key: string) => void;
  onToggleComplete: (id: number, e: React.MouseEvent) => void;
}

const RoadmapStage: React.FC<RoadmapStageProps> = ({
  stage,
  isOpen,
  isDone,
  expandedSections,
  totalStages,
  nextStage,
  onToggleStage,
  onToggleSection,
  onToggleComplete,
}) => {
  const topicCount = stage.sections.reduce((s, sec) => s + sec.topics.length, 0);

  return (
    <div style={{ position: "relative", marginBottom: 14, paddingLeft: 54 }}>
      {/* Timeline node */}
      <div
        style={{
          position: "absolute",
          left: 9,
          top: 16,
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontFamily: "monospace",
          fontWeight: 700,
          zIndex: 2,
          transition: "all 0.2s ease",
          border: `3px solid ${
            isDone
              ? "var(--ifm-color-primary)"
              : isOpen
              ? "var(--ifm-color-primary)"
              : "var(--ifm-color-emphasis-300)"
          }`,
          background: isDone
            ? "var(--ifm-color-primary)"
            : "var(--ifm-background-color)",
          color: isDone
            ? "#fff"
            : isOpen
            ? "var(--ifm-color-primary)"
            : "var(--ifm-color-emphasis-500)",
        }}
      >
        {isDone ? "✓" : stage.id}
      </div>

      {/* Card */}
      <div
        style={{
          borderRadius: 12,
          border: `2px solid ${
            isOpen
              ? "var(--ifm-color-primary-light)"
              : "var(--ifm-color-emphasis-300)"
          }`,
          background: "var(--ifm-card-background-color, var(--ifm-background-color))",
          boxShadow: isOpen
            ? "0 6px 24px rgba(0,0,0,0.08)"
            : "0 1px 3px rgba(0,0,0,0.03)",
          overflow: "hidden",
          transition: "all 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          onClick={() => onToggleStage(stage.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggleStage(stage.id);
            }
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ifm-color-primary)] rounded-t-xl transition-all"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            cursor: "pointer",
            gap: 10,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h4
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                color: "var(--ifm-heading-color)",
              }}
            >
              {stage.title}
            </h4>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 12,
                color: "var(--ifm-font-color-secondary)",
                opacity: 0.7,
              }}
            >
              {stage.tagline}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                opacity: 0.5,
              }}
            >
              {topicCount} topics
            </span>
            <button
              onClick={(e) => onToggleComplete(stage.id, e)}
              role="checkbox"
              aria-checked={isDone}
              aria-label={`Mark Stage ${stage.id} as complete`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ifm-color-primary)] focus-visible:ring-offset-2"
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                border: isDone
                  ? "none"
                  : "2px solid var(--ifm-color-emphasis-300)",
                background: isDone
                  ? "var(--ifm-color-primary)"
                  : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: isDone ? "#fff" : "transparent",
                transition: "all 0.2s ease",
                flexShrink: 0,
                padding: 0,
              }}
            >
              ✓
            </button>
            <FaChevronDown
              style={{
                fontSize: 10,
                opacity: 0.35,
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
        </div>

        {/* Expanded body */}
        {isOpen && (
          <div
            style={{
              padding: "0 16px 16px",
              borderTop: "1px solid var(--ifm-color-emphasis-200)",
            }}
          >
            <div style={{ paddingTop: 12 }}>
              {stage.sections.map((sec, si) => {
                const secKey = `${stage.id}-${si}`;
                return (
                  <RoadmapSection
                    key={secKey}
                    section={sec}
                    isOpen={expandedSections.has(secKey)}
                    onToggle={() => onToggleSection(secKey)}
                  />
                );
              })}
            </div>

            {/* Study links + Next */}
            <div style={{ marginTop: 14 }}>
              {stage.studyLinks && stage.studyLinks.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 8,
                  }}
                >
                  {stage.studyLinks.map((link, li) => (
                    <Link
                      key={li}
                      to={link.url}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ifm-color-primary)]"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 11,
                        fontFamily: "monospace",
                        fontWeight: 600,
                        color: "var(--ifm-color-primary)",
                        background: "var(--ifm-color-primary-lightest)",
                        padding: "5px 12px",
                        borderRadius: 8,
                        border: "1px solid var(--ifm-color-primary-light)",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 8 }} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {stage.id < totalStages && nextStage && (
                <div
                  style={{
                    background: "var(--ifm-background-surface-color)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 12,
                    color: "var(--ifm-font-color-secondary)",
                  }}
                >
                  <strong style={{ color: "var(--ifm-font-color-base)" }}>
                    Next →
                  </strong>{" "}
                  {nextStage.title} — {nextStage.tagline}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapStage;
