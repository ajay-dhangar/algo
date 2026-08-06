import React, { useEffect, useMemo, useState } from "react";
import { FaClipboardCheck, FaClock } from "react-icons/fa";
import { DIAGNOSTIC_QUIZ_QUESTIONS, QuizAnswers } from "../../data/diagnosticQuiz";
import {
  buildPersonalizedPath,
  DIAGNOSTIC_QUIZ_STORAGE_KEY,
} from "../../utils/learningPathEngine";
import { safeJsonParse } from "../../utils/safeStorage";
import QuizFlow from "./QuizFlow";
import PersonalizedPathResult from "./PersonalizedPathResult";

type Phase = "intro" | "quiz" | "result";

const DiagnosticQuiz: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  // Restore a previous result on return visits, so the page isn't
  // re-quizzing someone who already has a saved path.
  //
  // We no longer gate all rendering on this effect — the intro screen is
  // fully static and safe to paint immediately. Only the saved-result
  // shortcut (jumping straight to "result") requires localStorage, so we
  // let the intro render on the first frame and silently swap to "result"
  // once the effect runs. This eliminates the blank → content flash and the
  // associated CLS penalty.
  useEffect(() => {
    const saved = safeJsonParse<QuizAnswers | null>(DIAGNOSTIC_QUIZ_STORAGE_KEY, null);
    if (saved && Object.keys(saved).length === DIAGNOSTIC_QUIZ_QUESTIONS.length) {
      setAnswers(saved);
      setPhase("result");
    }
  }, []);

  const path = useMemo(() => buildPersonalizedPath(answers), [answers]);

  const handleAnswer = (stageId: number, score: 0 | 1 | 2 | 3) => {
    const nextAnswers = { ...answers, [stageId]: score };
    setAnswers(nextAnswers);

    if (currentIndex < DIAGNOSTIC_QUIZ_QUESTIONS.length - 1) {
      // Small delay so the user sees their selection highlight before advancing
      setTimeout(() => setCurrentIndex((i) => i + 1), 180);
    } else {
      try {
        localStorage.setItem(DIAGNOSTIC_QUIZ_STORAGE_KEY, JSON.stringify(nextAnswers));
      } catch {
        // localStorage unavailable — quiz still works, just won't persist
      }
      setTimeout(() => setPhase("result"), 180);
    }
  };

  const handleBack = () => setCurrentIndex((i) => Math.max(0, i - 1));

  const handleRetake = () => {
    try {
      localStorage.removeItem(DIAGNOSTIC_QUIZ_STORAGE_KEY);
    } catch {}
    setAnswers({});
    setCurrentIndex(0);
    setPhase("intro");
  };

  if (phase === "quiz") {
    return (
      <QuizFlow
        currentIndex={currentIndex}
        answers={answers}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    );
  }

  if (phase === "result") {
    return <PersonalizedPathResult path={path} onRetake={handleRetake} />;
  }

  // "intro" phase — rendered immediately on first paint (no localStorage
  // dependency), so there is no blank frame or layout shift.
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "12px 0" }}>
      <div
        style={{
          width: 56,
          height: 56,
          margin: "0 auto 18px",
          borderRadius: 16,
          background: "var(--ifm-color-primary-lightest)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          color: "var(--ifm-color-primary)",
        }}
      >
        <FaClipboardCheck />
      </div>
      <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, margin: "0 0 10px", color: "var(--ifm-heading-color)" }}>
        Not sure where to start?
      </h2>
      <p style={{ fontSize: 15, color: "var(--ifm-font-color-secondary)", maxWidth: 440, margin: "0 auto 22px", lineHeight: 1.6 }}>
        Answer {DIAGNOSTIC_QUIZ_QUESTIONS.length} quick questions about what you already know, and
        we'll build you a personalized order to work through the DSA roadmap —
        skipping what you've already mastered.
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontFamily: "monospace",
          color: "var(--ifm-font-color-secondary)",
          marginBottom: 24,
          opacity: 0.8,
        }}
      >
        <FaClock style={{ fontSize: 11 }} />
        Takes about 2 minutes · Nothing is sent anywhere, it all stays in your browser
      </div>

      <div>
        <button
          onClick={() => setPhase("quiz")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background: "var(--ifm-color-primary)",
            padding: "12px 26px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          Start the Diagnostic Quiz
        </button>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;
