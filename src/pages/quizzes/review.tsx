import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRedoAlt,
  FaChevronRight,
  FaAward,
  FaBookOpen,
  FaArrowLeft,
  FaLightbulb,
} from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { useQuizProgress } from "../../hooks/useQuizProgress";
import { QUIZZES_CONFIG, QUESTION_COUNTS, QUIZ_IDS } from "../../data/quizzesConfig";
import {
  getQuestionsForReviewSession,
  recordQuestionReview,
  getDueItems,
  getSpacedRepetitionQueue,
  type SpacedRepetitionItem,
} from "../../utils/spacedRepetition";
import type { MockExamQuestion } from "../../utils/mockExamData";

function SpacedRepetitionReviewContent() {
  const { stats, userId, loaded } = useQuizProgress(QUIZ_IDS, QUESTION_COUNTS);
  const [questions, setQuestions] = useState<MockExamQuestion[]>([]);
  const [sourceType, setSourceType] = useState<"due" | "weak-topics" | "all">("due");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastReviewItem, setLastReviewItem] = useState<SpacedRepetitionItem | null>(null);
  const [results, setResults] = useState<{ question: MockExamQuestion; isCorrect: boolean; selected: string }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (loaded) {
      const session = getQuestionsForReviewSession(stats, userId, 10);
      setQuestions(session.questions);
      setSourceType(session.source);
    }
  }, [loaded, stats, userId]);

  const currentQuestion = questions[currentIndex];
  const queue = useMemo(() => getSpacedRepetitionQueue(userId), [userId, results]);
  const dueCount = useMemo(() => getDueItems(queue).length, [queue]);

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedOption || isSubmitted) return;
    const isCorrect = selectedOption === currentQuestion.answer;

    const updatedItem = recordQuestionReview(
      currentQuestion.uniqueId,
      currentQuestion.topicId,
      currentQuestion.id,
      isCorrect,
      userId
    );

    setLastReviewItem(updatedItem);
    setIsSubmitted(true);
    setResults((prev) => [...prev, { question: currentQuestion, isCorrect, selected: selectedOption }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setLastReviewItem(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestartSession = () => {
    const session = getQuestionsForReviewSession(stats, userId, 10);
    setQuestions(session.questions);
    setSourceType(session.source);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setLastReviewItem(null);
    setResults([]);
    setIsFinished(false);
  };

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
          <FiRepeat />
        </div>
        <p className="text-slate-500 font-semibold">Loading your Spaced Repetition queue...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto text-2xl">
          <FaCheckCircle />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">All Caught Up!</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          No questions are currently due for review, and no weak topics were identified. Take a new quiz to start tracking your knowledge retention!
        </p>
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold no-underline transition-colors shadow-md"
        >
          Explore All Quizzes
          <FaChevronRight size={14} />
        </Link>
      </div>
    );
  }

  if (isFinished) {
    const correctCount = results.filter((r) => r.isCorrect).length;
    const accuracy = Math.round((correctCount / results.length) * 100);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xl space-y-6"
        >
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
            <FaAward />
          </div>

          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 m-0">
              Review Session Complete!
            </h1>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
              Spaced repetition queue updated based on your performance.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-center">
              <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {results.length}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                Questions
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-center">
              <div className="text-2xl font-black font-mono text-emerald-500">
                {correctCount}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                Correct
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-center">
              <div className="text-2xl font-black font-mono text-primary">
                {accuracy}%
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                Accuracy
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartSession}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold border-0 cursor-pointer shadow-md transition-colors"
            >
              <FaRedoAlt size={14} />
              Review Another Batch
            </button>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold no-underline transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <FaArrowLeft size={14} />
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 no-underline transition-colors"
            title="Return to dashboard"
          >
            <FaArrowLeft size={14} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
                Spaced Repetition
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {sourceType === "due"
                  ? "Scheduled Reviews"
                  : sourceType === "weak-topics"
                  ? "Weak Topics Focus"
                  : "Mixed Practice"}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 m-0 mt-1">
              Review Weak Topics
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-400">
              {dueCount > 0 ? `${dueCount} total items due` : "All due items reviewed"}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        / />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.uniqueId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6"
        >
          {/* Topic & Difficulty */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {currentQuestion.topicTitle}
            </span>
            {currentQuestion.difficulty && (
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                  currentQuestion.difficulty === "Easy"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : currentQuestion.difficulty === "Medium"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {currentQuestion.difficulty}
              </span>
            )}
          </div>

          {/* Question text */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug m-0">
            {currentQuestion.question}
          </h2>

          {/* Code snippet if any */}
          {currentQuestion.codeSnippet && (
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
              <pre className="m-0 whitespace-pre-wrap">{currentQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrectAnswer = opt === currentQuestion.answer;

              let styleClasses =
                "p-4 rounded-2xl border text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ";

              if (!isSubmitted) {
                styleClasses += isSelected
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800";
              } else {
                if (isCorrectAnswer) {
                  styleClasses +=
                    "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                } else if (isSelected && !isCorrectAnswer) {
                  styleClasses +=
                    "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                } else {
                  styleClasses +=
                    "border-slate-200 dark:border-slate-800 opacity-50 text-slate-500 dark:text-slate-400";
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={styleClasses}
                >
                  <span className="flex-1">{opt}</span>
                  {isSubmitted && (
                    <span className="shrink-0 ml-2">
                      {isCorrectAnswer ? (
                        <FaCheckCircle className="text-emerald-500 text-lg" />
                      ) : isSelected ? (
                        <FaTimesCircle className="text-rose-500 text-lg" />
                      ) : null}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback & Spaced Interval Banner */}
          {isSubmitted && lastReviewItem && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800"
            >
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  selectedOption === currentQuestion.answer
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200"
                    : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-200"
                }`}
              >
                <div className="mt-0.5">
                  {selectedOption === currentQuestion.answer ? (
                    <FaCheckCircle className="text-emerald-500 text-lg" />
                  ) : (
                    <FaTimesCircle className="text-rose-500 text-lg" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {selectedOption === currentQuestion.answer
                      ? "Spot on! Mastery reinforced."
                      : "Incorrect attempt."}
                  </div>
                  <div className="text-xs leading-relaxed opacity-90">
                    {currentQuestion.explanation}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-xs font-semibold">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FaClock className="text-indigo-500" />
                  Spaced Repetition Schedule:
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Next review in {lastReviewItem.intervalDays}{" "}
                  {lastReviewItem.intervalDays === 1 ? "day" : "days"}
                </span>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold border-0 cursor-pointer shadow-md transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold border-0 cursor-pointer shadow-md transition-colors"
              >
                {currentIndex < questions.length - 1 ? "Next Question" : "Finish Review"}
                <FaChevronRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SpacedRepetitionReviewPage() {
  return (
    <Layout
      title="Review Weak Topics — Spaced Repetition | Algo"
      description="Adaptive spaced repetition review mode to master weak topics and resurface missed quiz questions on a scientific memory schedule."
    >
      <BrowserOnly fallback={<div className="p-8 text-center">Loading review session...</div>}>
        {() => <SpacedRepetitionReviewContent />}
      </BrowserOnly>
    </Layout>
  );
}
