import React from "react";
import { DIAGNOSTIC_QUIZ_QUESTIONS, QuizAnswers } from "../../data/diagnosticQuiz";

interface QuizFlowProps {
  currentIndex: number;
  answers: QuizAnswers;
  onAnswer: (stageId: number, score: 0 | 1 | 2 | 3) => void;
  onBack: () => void;
}

const QuizFlow: React.FC<QuizFlowProps> = ({ currentIndex, answers, onAnswer, onBack }) => {
  const total = DIAGNOSTIC_QUIZ_QUESTIONS.length;
  const question = DIAGNOSTIC_QUIZ_QUESTIONS[currentIndex];
  const progressPct = Math.round((currentIndex / total) * 100);
  const selectedScore = answers[question.stageId];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            fontFamily: "monospace",
            color: "var(--ifm-font-color-secondary)",
            marginBottom: 6,
          }}
        >
          <span>
            Question {currentIndex + 1} of {total}
          </span>
          <span>{progressPct}%</span>
        </div>
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
              width: `${progressPct}%`,
              height: "100%",
              borderRadius: 100,
              background: "var(--ifm-color-primary)",
              transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        style={{
          borderRadius: 14,
          border: "2px solid var(--ifm-color-emphasis-300)",
          background: "var(--ifm-card-background-color, var(--ifm-background-color))",
          padding: "24px 22px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "var(--ifm-color-primary)",
            background: "var(--ifm-color-primary-lightest)",
            padding: "3px 10px",
            borderRadius: 100,
            marginBottom: 10,
          }}
        >
          Stage {question.stageId} · {question.stageTitle}
        </span>

        <h3
          style={{
            fontSize: 19,
            fontWeight: 800,
            margin: "0 0 8px",
            color: "var(--ifm-heading-color)",
          }}
        >
          {question.question}
        </h3>

        {question.exampleTopics.length > 0 && (
          <p
            style={{
              fontSize: 13,
              color: "var(--ifm-font-color-secondary)",
              margin: "0 0 20px",
              opacity: 0.8,
            }}
          >
            Covers things like: {question.exampleTopics.join(", ")}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.options.map((option) => {
            const isSelected = selectedScore === option.score;
            return (
              <button
                key={option.score}
                onClick={() => onAnswer(question.stageId, option.score)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ifm-color-primary)]"
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: isSelected ? 700 : 500,
                  border: `2px solid ${
                    isSelected ? "var(--ifm-color-primary)" : "var(--ifm-color-emphasis-300)"
                  }`,
                  background: isSelected
                    ? "var(--ifm-color-primary-lightest)"
                    : "transparent",
                  color: isSelected ? "var(--ifm-color-primary-darker)" : "var(--ifm-font-color-base)",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span>{option.label}</span>
                {isSelected && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Back navigation */}
      {currentIndex > 0 && (
        <button
          onClick={onBack}
          style={{
            marginTop: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "monospace",
            color: "var(--ifm-font-color-secondary)",
            padding: "6px 4px",
          }}
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default QuizFlow;
