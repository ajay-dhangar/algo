/**
 * DocInlineQuiz/index.tsx
 *
 * Renders up to 3 quiz questions relevant to the current doc page.
 * Questions are looked up by the doc ID from docQuizData.ts.
 * Each question is rendered using the existing AlgoQuiz component.
 */
import React, { useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import docQuizData from "../../data/docQuizData";

/* ── Types (mirror AlgoQuiz props) ─────────────────────────────── */
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

/* ── Single-question card ───────────────────────────────────────── */
function QuizCard({ question, options, correctAnswer, explanation }: QuizQuestion) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selected === null) setSelected(idx);
  };

  const isAnswered = selected !== null;

  return (
    <div className="doc-inline-quiz-card">
      <p className="doc-inline-quiz-question">{question}</p>
      <div className="doc-inline-quiz-options">
        {options.map((opt, idx) => {
          let cls = "doc-inline-quiz-option";
          if (isAnswered) {
            if (idx === correctAnswer) cls += " correct";
            else if (idx === selected) cls += " wrong";
          }
          return (
            <button
              key={idx}
              className={cls}
              disabled={isAnswered}
              onClick={() => handleSelect(idx)}
              type="button"
            >
              {opt}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div className="doc-inline-quiz-explanation">
          {selected === correctAnswer ? "✅" : "❌"}{" "}
          <strong>Explanation:</strong> {explanation}
        </div>
      )}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function DocInlineQuiz(): React.ReactElement | null {
  const { metadata } = useDoc();
  const docId: string = metadata.id;

  const questions = docQuizData[docId];
  if (!questions || questions.length === 0) return null;

  return (
    <section className="doc-inline-quiz-section">
      <div className="doc-inline-quiz-header">
        <span className="doc-inline-quiz-badge">🧠 Quick Quiz</span>
        <h3 className="doc-inline-quiz-title">Test Your Understanding</h3>
        <p className="doc-inline-quiz-subtitle">
          Answer these {questions.length} question{questions.length > 1 ? "s" : ""} to check what you have learned.
        </p>
      </div>
      <div className="doc-inline-quiz-list">
        {questions.map((q, i) => (
          <div key={i} className="doc-inline-quiz-item">
            <span className="doc-inline-quiz-number">Q{i + 1}</span>
            <QuizCard {...q} />
          </div>
        ))}
      </div>
    </section>
  );
}
