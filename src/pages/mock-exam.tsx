import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "motion/react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
  FaLayerGroup,
  FaPlay,
  FaRedo,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaRandom,
  FaCode,
  FaChartBar,
  FaCheckSquare,
  FaSquare,
  FaAward,
} from "react-icons/fa";

import QuestionNavigator from "../components/Quiz/QuestionNavigator";
import QuestionProgress from "../components/Quiz/QuestionProgress";
import MockExamTimer, { formatTime } from "../components/Quiz/MockExamTimer";
import {
  saveQuizAttemptLocal,
  getUserId,
  saveMockExamReview,
  getLastMockExamReview,
  clearMockExamReview,
  type MockExamReviewRecord,
} from "../utils/safeStorage";
import {
  buildMockExamQuestions,
  getRandom30Preset,
  MockExamQuestion,
  getTopicTitle,
} from "../utils/mockExamData";
import { QUIZZES_CONFIG } from "../data/quizzesConfig";

type ExamMode = "setup" | "active" | "result";

interface TopicPerformance {
  topicId: string;
  topicTitle: string;
  correct: number;
  total: number;
  percentage: number;
}

function MockExamContent() {
  const [mode, setMode] = useState<ExamMode>("setup");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    QUIZZES_CONFIG.map((q) => q.id)
  );
  const [targetQuestionCount, setTargetQuestionCount] = useState<number>(30);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);

  const [questions, setQuestions] = useState<MockExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [wasAutoSubmitted, setWasAutoSubmitted] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);

  // Restore the last completed exam review from localStorage on first mount.
  // This lets the user navigate away and come back to their results.
  useEffect(() => {
    const saved = getLastMockExamReview();
    if (saved) {
      setQuestions(saved.questions as MockExamQuestion[]);
      setUserAnswers(saved.userAnswers);
      setTimeSpentSeconds(saved.timeSpentSeconds);
      setWasAutoSubmitted(saved.wasAutoSubmitted);
      setMode("result");
    }
  }, []);

  // Handle Preset Selections
  const handleLaunchPreset = (preset: "random30" | "quick10" | "marathon50") => {
    let qList: MockExamQuestion[] = [];
    let timerMins = 30;

    if (preset === "random30") {
      qList = getRandom30Preset();
      timerMins = 30;
    } else if (preset === "quick10") {
      qList = buildMockExamQuestions(
        QUIZZES_CONFIG.map((q) => q.id),
        10
      );
      timerMins = 15;
    } else if (preset === "marathon50") {
      qList = buildMockExamQuestions(
        QUIZZES_CONFIG.map((q) => q.id),
        50
      );
      timerMins = 60;
    }

    setQuestions(qList);
    setUserAnswers(new Array(qList.length).fill(undefined));
    setCurrentQuestionIndex(0);
    setTimeLimitMinutes(timerMins);
    setTimeSpentSeconds(0);
    setWasAutoSubmitted(false);
    clearMockExamReview();
    setMode("active");
  };

  const handleStartCustomExam = () => {
    if (selectedTopics.length === 0) return;
    const qList = buildMockExamQuestions(selectedTopics, targetQuestionCount);
    if (qList.length === 0) return;

    setQuestions(qList);
    setUserAnswers(new Array(qList.length).fill(undefined));
    setCurrentQuestionIndex(0);
    setTimeSpentSeconds(0);
    setWasAutoSubmitted(false);
    clearMockExamReview();
    setMode("active");
  };

  const handleSelectAllTopics = () => {
    setSelectedTopics(QUIZZES_CONFIG.map((q) => q.id));
  };

  const handleDeselectAllTopics = () => {
    setSelectedTopics([]);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleOptionSelect = (optionStr: string) => {
    const next = [...userAnswers];
    next[currentQuestionIndex] = optionStr;
    setUserAnswers(next);
  };

  const totalScore = useMemo(() => {
    return questions.reduce((score, q, idx) => {
      return userAnswers[idx] === q.answer ? score + 1 : score;
    }, 0);
  }, [questions, userAnswers]);

  const topicPerformanceList = useMemo<TopicPerformance[]>(() => {
    if (questions.length === 0) return [];
    const map: Record<string, { topicTitle: string; correct: number; total: number }> = {};

    questions.forEach((q, idx) => {
      if (!map[q.topicId]) {
        map[q.topicId] = { topicTitle: q.topicTitle, correct: 0, total: 0 };
      }
      map[q.topicId].total += 1;
      if (userAnswers[idx] === q.answer) {
        map[q.topicId].correct += 1;
      }
    });

    return Object.entries(map).map(([topicId, val]) => ({
      topicId,
      topicTitle: val.topicTitle,
      correct: val.correct,
      total: val.total,
      percentage: Math.round((val.correct / val.total) * 100),
    }));
  }, [questions, userAnswers]);

  const handleSubmitExam = useCallback(
    (autoSubmitted: boolean = false) => {
      setWasAutoSubmitted(autoSubmitted);
      setShowConfirmSubmit(false);
      setMode("result");

      const userId = getUserId() || "anonymous";
      const now = new Date().toISOString();

      // Save overall mock exam attempt
      saveQuizAttemptLocal(userId, "mock-exam", {
        score: totalScore,
        totalQuestions: questions.length,
        timeSpent: timeSpentSeconds,
        completedAt: now,
      });

      // Save attempt per topic for weak topics dashboard & history
      topicPerformanceList.forEach((tp) => {
        saveQuizAttemptLocal(userId, tp.topicId, {
          score: tp.correct,
          totalQuestions: tp.total,
          timeSpent: Math.round(timeSpentSeconds / topicPerformanceList.length),
          completedAt: now,
        });
      });

      // Persist the full review so it survives navigation away from this page
      const reviewRecord: MockExamReviewRecord = {
        completedAt: now,
        totalScore,
        totalQuestions: questions.length,
        timeSpentSeconds,
        wasAutoSubmitted: autoSubmitted,
        questions: questions.map((q) => ({
          uniqueId: q.uniqueId,
          topicId: q.topicId,
          topicTitle: q.topicTitle,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          codeSnippet: q.codeSnippet,
        })),
        userAnswers,
        topicPerformance: topicPerformanceList,
      };
      saveMockExamReview(reviewRecord);
    },
    [totalScore, questions, timeSpentSeconds, topicPerformanceList, userAnswers]
  );

  // Memoize the tick handler so MockExamTimer never receives a new
  // function reference on every render, which would previously restart
  // the interval mid-exam.
  const handleTick = useCallback(
    (secsLeft: number) => {
      setTimeSpentSeconds(timeLimitMinutes * 60 - secsLeft);
    },
    [timeLimitMinutes]
  );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Setup Mode */}
        {mode === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <FaTrophy size={12} />
                Timed Assessment Mode
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Mock Coding Exam
              </h1>
              <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Simulate authentic timed technical interview assessments. Choose your topic mix and time limit, answer randomized questions, and receive deep weakness diagnostics.
              </p>
            </div>

            {/* Presets Grid */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                Quick Start Presets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => handleLaunchPreset("random30")}
                  className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-white/20">
                      <FaRandom size={18} />
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20">
                      30 Mins
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:underline">
                    Full Topic Mix (30 Qs)
                  </h3>
                  <p className="text-xs text-blue-100 mt-1">
                    Standard coding assessment format with 30 questions sampled randomly across all 19 topics.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchPreset("quick10")}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <FaClock size={18} />
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      15 Mins
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Quick Sprint (10 Qs)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fast-paced warm-up exam for quick recall before practice interviews.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchPreset("marathon50")}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <FaLayerGroup size={18} />
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      60 Mins
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    Marathon Exam (50 Qs)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Comprehensive endurance mock test evaluating broad topic mastery under timing pressure.
                  </p>
                </button>
              </div>
            </div>

            {/* Custom Setup Form */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold">Custom Topic & Timer Configuration</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tailor your exam topics, question pool size, and countdown duration.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllTopics}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={handleDeselectAllTopics}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              {/* Topics Grid */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
                  Select Topics ({selectedTopics.length} / {QUIZZES_CONFIG.length} selected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {QUIZZES_CONFIG.map((quiz) => {
                    const isChecked = selectedTopics.includes(quiz.id);
                    return (
                      <button
                        key={quiz.id}
                        type="button"
                        onClick={() => toggleTopic(quiz.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                          isChecked
                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 font-bold"
                            : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        {isChecked ? (
                          <FaCheckSquare className="text-blue-600 dark:text-blue-400 shrink-0" size={16} />
                        ) : (
                          <FaSquare className="text-slate-300 dark:text-slate-700 shrink-0" size={16} />
                        )}
                        <span className="truncate">{quiz.title.replace("Quiz on ", "")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Config Controls (Count & Time) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Total Questions
                  </label>
                  <div className="flex gap-2">
                    {[10, 15, 20, 30, 50].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setTargetQuestionCount(cnt)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          targetQuestionCount === cnt
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        {cnt} Qs
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Time Limit (Minutes)
                  </label>
                  <div className="flex gap-2">
                    {[10, 15, 20, 30, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setTimeLimitMinutes(mins)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          timeLimitMinutes === mins
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  disabled={selectedTopics.length === 0}
                  onClick={handleStartCustomExam}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all"
                >
                  <FaPlay size={12} />
                  Start Custom Mock Exam ({targetQuestionCount} Qs, {timeLimitMinutes} mins)
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Exam Mode */}
        {mode === "active" && currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
              <button
                type="button"
                onClick={() => setShowConfirmExit(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <FaChevronLeft size={10} />
                Exit Exam
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {currentQuestion.topicTitle}
                </span>
                {currentQuestion.difficulty && (
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      currentQuestion.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : currentQuestion.difficulty === "Medium"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                )}
              </div>

              <MockExamTimer
                timeLimitSeconds={timeLimitMinutes * 60}
                onTimeExpired={() => handleSubmitExam(true)}
                isSubmitted={mode !== "active"}
                onTick={handleTick}
              />
            </div>

            {/* Question Progress & Navigator */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
              <QuestionProgress
                currentQuestion={currentQuestionIndex}
                totalQuestions={questions.length}
              />
              <QuestionNavigator
                questions={questions}
                currentQuestion={currentQuestionIndex}
                userAnswers={userAnswers}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-lg sm:text-xl font-bold leading-relaxed">
                <span className="text-blue-600 dark:text-blue-400 font-mono mr-2">
                  Q{currentQuestionIndex + 1}.
                </span>
                {currentQuestion.question}
              </h2>

              {currentQuestion.codeSnippet && (
                <div className="relative rounded-xl bg-slate-900 text-slate-100 p-4 text-xs font-mono overflow-x-auto border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-2 border-b border-slate-800 pb-2 text-[10px] uppercase font-bold tracking-wider">
                    <FaCode size={12} />
                    Code Snippet
                  </div>
                  <pre className="m-0 font-mono leading-relaxed whitespace-pre-wrap">
                    {currentQuestion.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === option;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm font-semibold"
                          : "bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-40 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <FaChevronLeft size={10} />
                Previous
              </button>

              <div className="flex items-center gap-3">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Next
                    <FaChevronRight size={10} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmSubmit(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <FaCheckCircle size={12} />
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Mode */}
        {mode === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {wasAutoSubmitted && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center gap-3 text-sm font-semibold">
                <FaExclamationTriangle className="shrink-0" />
                <span>Time expired! Your mock exam answers were automatically submitted.</span>
              </div>
            )}

            {/* Summary Score Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto">
                <FaAward size={32} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold">Mock Exam Performance Report</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Completed in {formatTime(timeSpentSeconds)} ({questions.length} total questions)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Score</div>
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
                    {totalScore} / {questions.length}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Percentage</div>
                  <div className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-1">
                    {Math.round((totalScore / questions.length) * 100)}%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rating</div>
                  <div
                    className={`text-lg font-extrabold mt-2 ${
                      Math.round((totalScore / questions.length) * 100) >= 80
                        ? "text-emerald-500"
                        : Math.round((totalScore / questions.length) * 100) >= 70
                        ? "text-blue-500"
                        : "text-rose-500"
                    }`}
                  >
                    {Math.round((totalScore / questions.length) * 100) >= 80
                      ? "Interview Ready"
                      : Math.round((totalScore / questions.length) * 100) >= 70
                      ? "Passed"
                      : "Needs Practice"}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setMode("setup")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <FaRedo size={12} />
                  Take Another Mock Exam
                </button>
                <Link
                  to="/quizzes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm no-underline transition-colors"
                >
                  <FaChartBar size={12} />
                  View Quiz Dashboard
                </Link>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FaChartBar className="text-blue-500" />
                Performance Breakdown by Topic
              </h2>

              <div className="space-y-4 pt-2">
                {topicPerformanceList.map((tp) => (
                  <div key={tp.topicId} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{tp.topicTitle}</span>
                      <span className="font-mono">
                        {tp.correct} / {tp.total} ({tp.percentage}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          tp.percentage >= 80
                            ? "bg-emerald-500"
                            : tp.percentage >= 60
                            ? "bg-blue-500"
                            : "bg-rose-500"
                        }`}
                        style={{ width: `${tp.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Explanations Review */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold">Question-by-Question Review</h2>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const userAns = userAnswers[idx];
                  const isCorrect = userAns === q.answer;

                  return (
                    <div
                      key={q.uniqueId}
                      className={`p-5 rounded-xl border space-y-3 ${
                        isCorrect
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-rose-500/5 border-rose-500/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <FaCheckCircle className="text-emerald-500 shrink-0" size={16} />
                          ) : (
                            <FaTimesCircle className="text-rose-500 shrink-0" size={16} />
                          )}
                          <span className="text-xs font-bold font-mono text-slate-500">
                            Q{idx + 1}. [{q.topicTitle}]
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            isCorrect
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {q.question}
                      </p>

                      {q.codeSnippet && (
                        <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap">
                          {q.codeSnippet}
                        </pre>
                      )}

                      <div className="text-xs space-y-1 pt-1">
                        <div>
                          <span className="font-bold text-slate-500">Your Answer: </span>
                          <span
                            className={
                              isCorrect
                                ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                                : "text-rose-600 dark:text-rose-400 font-semibold"
                            }
                          >
                            {userAns || "No answer provided"}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div>
                            <span className="font-bold text-slate-500">Correct Answer: </span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              {q.answer}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          Explanation:{" "}
                        </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal: Confirm Submit */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h3 className="text-lg font-bold">Submit Mock Exam?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You have answered{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {userAnswers.filter((a) => a !== undefined).length}
                </span>{" "}
                out of <span className="font-bold">{questions.length}</span> questions. Are you sure you want to complete your attempt?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmitExam(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Confirm Exit */}
        {showConfirmExit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h3 className="text-lg font-bold">Exit Mock Exam?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your current exam progress will be lost if you exit now. Are you sure?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmExit(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Resume Exam
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmExit(false);
                    setMode("setup");
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
                >
                  Exit Exam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MockExamPage() {
  return (
    <Layout
      title="Mock Exam Mode | Timed Algorithmic Interview Assessment"
      description="Simulate real timed coding interviews with customizable topic mixes and automatic submission."
    >
      <BrowserOnly fallback={<div className="py-20 text-center">Loading Mock Exam Mode...</div>}>
        {() => <MockExamContent />}
      </BrowserOnly>
    </Layout>
  );
}
