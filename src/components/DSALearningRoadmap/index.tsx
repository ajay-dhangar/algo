import React, { useState, useEffect, useMemo } from "react";
import { safeJsonParse } from "../../utils/safeStorage";
import { STAGES } from "../../data/roadmapData";
import RoadmapStage from "./RoadmapStage";

const DSALearningRoadmap: React.FC = () => {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());

  // Persist completion state
  useEffect(() => {
    try {
      setCompletedStages(new Set(safeJsonParse<number[]>("dsa_learning_roadmap_completed", [])));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "dsa_learning_roadmap_completed",
        JSON.stringify([...completedStages])
      );
    } catch {}
  }, [completedStages]);

  const toggleStage = (id: number) => {
    setExpandedStage(expandedStage === id ? null : id);
    setExpandedSections(new Set());
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedStages((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const progress = Math.round((completedStages.size / STAGES.length) * 100);
  const totalTopics = useMemo(
    () => STAGES.reduce((sum, s) => sum + s.sections.reduce((ss, sec) => ss + sec.topics.length, 0), 0),
    []
  );

  return (
    <div style={{ margin: "32px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span
          style={{
            display: "inline-block",
            background: "var(--ifm-color-primary-lightest)",
            color: "var(--ifm-color-primary-dark)",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "monospace",
            padding: "4px 14px",
            borderRadius: 100,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {STAGES.length} Stages · {STAGES.reduce((s, st) => s + st.sections.length, 0)} Sections · {totalTopics} Topics
        </span>
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 800,
            margin: "0 0 8px",
            color: "var(--ifm-heading-color)",
          }}
        >
          The Complete DSA Roadmap
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--ifm-font-color-secondary)",
            maxWidth: 480,
            margin: "0 auto 20px",
            lineHeight: 1.6,
          }}
        >
          Everything you need to learn, in the exact order you should learn it.
          No guessing, no jumping around. Open any stage to see every topic inside.
        </p>

        {/* Progress bar */}
        <div style={{ maxWidth: 340, margin: "0 auto" }}>
          <div
            style={{
              background: "var(--ifm-color-emphasis-200)",
              borderRadius: 100,
              height: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 100,
                background: "var(--ifm-color-primary)",
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
          <p
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--ifm-font-color-secondary)",
              marginTop: 6,
              opacity: 0.7,
            }}
          >
            {completedStages.size} of {STAGES.length} stages complete — {progress}%
          </p>
        </div>
      </div>

      {/* Roadmap cards */}
      <div style={{ maxWidth: 620, margin: "0 auto", position: "relative" }}>
        {/* Vertical dashed line */}
        <div
          style={{
            position: "absolute",
            left: 21,
            top: 0,
            bottom: 0,
            width: 3,
            borderRadius: 4,
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--ifm-color-emphasis-300) 0px, var(--ifm-color-emphasis-300) 6px, transparent 6px, transparent 14px)",
          }}
        />

        {STAGES.map((stage) => {
          const isOpen = expandedStage === stage.id;
          const isDone = completedStages.has(stage.id);
          const nextStage = STAGES[stage.id]; // stage.id is 1-indexed, so STAGES[stage.id] is next stage

          return (
            <RoadmapStage
              key={stage.id}
              stage={stage}
              isOpen={isOpen}
              isDone={isDone}
              expandedSections={expandedSections}
              totalStages={STAGES.length}
              nextStage={nextStage}
              onToggleStage={toggleStage}
              onToggleSection={toggleSection}
              onToggleComplete={toggleComplete}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 480,
          margin: "36px auto 0",
          textAlign: "center",
          padding: "20px",
          borderRadius: 12,
          border: "2px solid var(--ifm-color-emphasis-200)",
          background: "var(--ifm-background-surface-color)",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "var(--ifm-font-color-secondary)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Every topic is here. Every topic has an order. You don't need to look
          anywhere else — just start from Stage 1 and keep going. One topic at a time 💪
        </p>
      </div>
    </div>
  );
};

export default DSALearningRoadmap;