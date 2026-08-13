import React, { useEffect, useState } from "react";
import { FaBrain, FaChevronRight, FaRedo } from "react-icons/fa";
import { useAdaptiveQuiz } from "../../hooks/useAdaptiveQuiz";
import { AdaptiveQuestion, MasteryLevel } from "../../utils/adaptiveQuiz";

export interface AdaptiveQuizItem extends AdaptiveQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface AdaptiveQuizSummary {
  masteryLevel: MasteryLevel;
  confidencePercent: number;
  questionsAsked: number;
  correctCount: number;
  abilityEstimate: number;
}

interface Props {
  pool: AdaptiveQuizItem[];
  onComplete?: (summary: AdaptiveQuizSummary) => void;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20",
};

const MASTERY_BADGE: Record<MasteryLevel, string> = {
  Developing: "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20",
  Proficient: "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20",
  Advanced: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

/**
 * A "smart quiz" session: question difficulty adjusts in real time from the
 * last few answers (computerized-adaptive-test style), and the session ends
 * early once confidence in the user's mastery level is statistically
 * reached — rather than always working through the full fixed question set.
 *
 * This is distinct from spaced repetition (which resurfaces missed
 * questions across days/sessions); this operates entirely within one
 * sitting and never repeats a question.
 */
export default function AdaptiveQuizRunner({ pool, onComplete }: Props) {
  const { currentQuestion, questionsAnswered, confidencePercent, isComplete, masteryLevel, answer, history } =
    useAdaptiveQuiz<AdaptiveQuizItem>({ pool });
  const [selected, setSelected] = useState<string | null>(null);
  const [reported, setReported] = useState(false);

  const correctCount = history.filter((h) => h.correct).length;

  useEffect(() => {
    if (!isComplete || reported || !onComplete) return;
    setReported(true);
    onComplete({
      masteryLevel,
      confidencePercent,
      questionsAsked: questionsAnswered,
      correctCount,
      abilityEstimate: history.length ? history[history.length - 1].abilityAfter : 2,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, reported]);

  const handleSubmit = () => {
    if (!currentQuestion || !selected) return;
    answer(selected === currentQuestion.answer);
    setSelected(null);
  };

  if (pool.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
        No questions available for a smart quiz session.
      </p>
    );
  }

  if (isComplete) {
    return (
      <div className="space-y-4 text-center py-6">
        <FaBrain className="mx-auto text-3xl text-primary-dark" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">Smart Quiz Complete</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 m-0">
          Ended after {questionsAnswered} question{questionsAnswered === 1 ? "" : "s"} — confidence in your
          mastery level reached {confidencePercent}%.
        </p>
        <div>
          <span
            className={`inline-block text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded border border-solid ${MASTERY_BADGE[masteryLevel]}`}
          >
            {masteryLevel}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
          {correctCount} / {questionsAnswered} correct
        </p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
        No questions available for a smart quiz session.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <FaBrain className="text-primary-dark" /> Smart Quiz · Question {questionsAnswered + 1}
        </span>
        <span>Confidence: {confidencePercent}%</span>
      </div>

      <div className="space-y-3 text-left">
        <span
          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-solid ${DIFFICULTY_BADGE[currentQuestion.difficulty]}`}
        >
          {currentQuestion.difficulty}
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
          {currentQuestion.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 pt-2" role="radiogroup" aria-label="Smart Quiz Options">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selected === option;
          return (
            <button
              key={index}
              onClick={() => setSelected(option)}
              role="radio"
              aria-checked={isSelected}
              className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                isSelected
                  ? "bg-primary-dark border-primary-dark text-white shadow-xs"
                  : "bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <span>{option}</span>
              <div
                className={`w-4 h-4 rounded-full border border-solid flex items-center justify-center shrink-0 ${
                  isSelected ? "border-white bg-white/20" : "border-slate-300 dark:border-slate-700"
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
          selected
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
            : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
        }`}
      >
        Submit Answer
        <FaChevronRight className="text-[10px]" />
      </button>
    </div>
  );
}

export function AdaptiveQuizRestartButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
    >
      <FaRedo size={11} /> Restart Smart Quiz
    </button>
  );
}
