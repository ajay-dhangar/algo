import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { FaExternalLinkAlt, FaChevronDown, FaRedo, FaTrophy } from "react-icons/fa";
import { PersonalizedPath, PersonalizedStage } from "../../utils/learningPathEngine";

interface PersonalizedPathResultProps {
  path: PersonalizedPath;
  onRetake: () => void;
}

/** "confident" stages never reach StageRow — they're rendered in the mastered list instead */
type RenderableStatus = Exclude<PersonalizedStage["status"], "confident">;

const STATUS_META: Record<RenderableStatus, { label: string; color: string; bg: string }> = {
  study: { label: "Study from scratch", color: "#dc2626", bg: "rgba(220, 38, 38, 0.08)" },
  review: { label: "Quick review", color: "#d97706", bg: "rgba(217, 119, 6, 0.08)" },
};

const StageRow: React.FC<{ item: PersonalizedStage; order: number }> = ({ item, order }) => {
  const [open, setOpen] = useState(order === 1);
  const meta = STATUS_META[item.status as RenderableStatus];

  return (
    <div
      style={{
        borderRadius: 12,
        border: "2px solid var(--ifm-color-emphasis-300)",
        background: "var(--ifm-card-background-color, var(--ifm-background-color))",
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          cursor: "pointer",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "monospace",
              background: "var(--ifm-color-primary-lightest)",
              color: "var(--ifm-color-primary)",
              border: "2px solid var(--ifm-color-primary-light)",
            }}
          >
            {order}
          </div>
          <div style={{ minWidth: 0 }}>
            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "var(--ifm-heading-color)" }}>
              {item.stage.title}
            </h4>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--ifm-font-color-secondary)", opacity: 0.75 }}>
              {item.stage.tagline}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              padding: "4px 9px",
              borderRadius: 100,
              color: meta.color,
              background: meta.bg,
              whiteSpace: "nowrap",
            }}
          >
            {meta.label}
          </span>
          <FaChevronDown
            style={{
              fontSize: 10,
              opacity: 0.4,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </div>
      </div>

      {open && item.stage.studyLinks && item.stage.studyLinks.length > 0 && (
        <div
          style={{
            padding: "0 16px 16px",
            borderTop: "1px solid var(--ifm-color-emphasis-200)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 12 }}>
            {item.stage.studyLinks.map((link, li) => (
              <Link
                key={li}
                to={link.url}
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
                }}
              >
                <FaExternalLinkAlt style={{ fontSize: 8 }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PersonalizedPathResult: React.FC<PersonalizedPathResultProps> = ({ path, onRetake }) => {
  const [showMastered, setShowMastered] = useState(false);

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      {/* Summary banner */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 28,
          padding: "24px 20px",
          borderRadius: 14,
          background: "var(--ifm-color-primary-lightest)",
          border: "1px solid var(--ifm-color-primary-light)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "var(--ifm-color-primary-darker)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 8,
          }}
        >
          Your level: {path.level}
        </span>
        <h2 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 800, margin: "0 0 8px", color: "var(--ifm-heading-color)" }}>
          {path.allMastered ? "You're ready for the hard stuff 🎉" : "Your Personalized Path"}
        </h2>
        <p style={{ fontSize: 14, color: "var(--ifm-font-color-secondary)", margin: 0, lineHeight: 1.6 }}>
          {path.summary}
        </p>
      </div>

      {/* Mastered stages, collapsed by default */}
      {path.masteredStages.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <button
            onClick={() => setShowMastered((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 2px",
              fontSize: 12,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "var(--ifm-font-color-secondary)",
            }}
          >
            <FaTrophy style={{ color: "#16a34a" }} />
            {path.masteredStages.length} stage{path.masteredStages.length > 1 ? "s" : ""} you already know
            <FaChevronDown
              style={{
                fontSize: 10,
                transform: showMastered ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
          {showMastered && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {path.masteredStages.map((stage) => (
                <span
                  key={stage.id}
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "rgba(22, 163, 74, 0.08)",
                    color: "#16a34a",
                  }}
                >
                  ✓ {stage.title}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Personalized ordered stage list */}
      {path.stagesToLearn.length > 0 && (
        <div>
          {path.stagesToLearn.map((item, idx) => (
            <StageRow key={item.stage.id} item={item} order={idx + 1} />
          ))}
        </div>
      )}

      {path.allMastered && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/challenges"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              background: "var(--ifm-color-primary)",
              padding: "10px 18px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Browse Challenges
          </Link>
        </div>
      )}

      {/* Retake button */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={onRetake}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "1px solid var(--ifm-color-emphasis-300)",
            borderRadius: 100,
            padding: "8px 16px",
            fontSize: 12,
            fontFamily: "monospace",
            fontWeight: 600,
            color: "var(--ifm-font-color-secondary)",
            cursor: "pointer",
          }}
        >
          <FaRedo style={{ fontSize: 10 }} />
          Retake the quiz
        </button>
      </div>
    </div>
  );
};

export default PersonalizedPathResult;
