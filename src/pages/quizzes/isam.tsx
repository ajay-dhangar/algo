import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaLayerGroup,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface IsamQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface HistoryAttempt {
  id?: string;
  score: number;
  totalQuestions?: number;
  timeSpent: number;
  completedAt: string;
}

const QUESTIONS: IsamQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What does ISAM stand for?",
    options: [
      "A) Indexed Sequential Access Method",
      "B) Internal Storage Allocation Model",
      "C) Iterative Search and Match",
      "D) Indexed Static Array Mapping"
    ],
    answer: "A) Indexed Sequential Access Method",
    explanation: "ISAM stands for Indexed Sequential Access Method — a file organization technique that combines sequential storage of records with a static index for faster lookups."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is the core idea behind ISAM's file organization?",
    options: [
      "A) Records are stored in random order with no index at all",
      "B) Records are stored sequentially (sorted by key), with a separate static index pointing to blocks of records for faster access",
      "C) Records are stored using a hash function exclusively",
      "D) Records are duplicated across multiple unrelated files"
    ],
    answer: "B) Records are stored sequentially (sorted by key), with a separate static index pointing to blocks of records for faster access",
    explanation: "ISAM keeps the main data file sorted by key and builds a static index (often multi-level) that maps key ranges to block addresses, allowing the system to jump near the target block instead of scanning the entire file."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What is an 'Overflow Page' in ISAM?",
    options: [
      "A) A page that stores the index itself",
      "B) A separate area used to hold new records that no longer fit in their original primary data block after the index was built",
      "C) A backup copy of the entire database",
      "D) A page that stores only deleted records"
    ],
    answer: "B) A separate area used to hold new records that no longer fit in their original primary data block after the index was built",
    explanation: "Since ISAM's index is static (built once for the original data), new insertions that don't fit in their designated primary block are placed in overflow pages, linked to the primary block via pointers."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "Why is ISAM's index described as 'static'?",
    options: [
      "A) Because it changes automatically with every single insertion or deletion",
      "B) Because it is built once based on the initial data distribution and does not automatically reorganize itself as records are inserted or deleted",
      "C) Because it has no structure at all",
      "D) Because it only supports read-only databases"
    ],
    answer: "B) Because it is built once based on the initial data distribution and does not automatically reorganize itself as records are inserted or deleted",
    explanation: "Unlike a B-Tree's dynamically self-balancing index, the ISAM index is constructed once and remains fixed. Subsequent insertions are diverted to overflow pages rather than triggering an index restructure, which is why performance degrades over time."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "What is a primary disadvantage of ISAM compared to dynamic structures like B-Trees?",
    options: [
      "A) ISAM cannot store more than 100 records",
      "B) As more records are added to overflow pages, search performance gradually degrades since overflow chains must be traversed linearly",
      "C) ISAM requires significantly more disk space than any other structure",
      "D) ISAM cannot support sequential access at all"
    ],
    answer: "B) As more records are added to overflow pages, search performance gradually degrades since overflow chains must be traversed linearly",
    explanation: "Because the index isn't rebuilt as data grows, overflow chains lengthen over time. Searching for a record that has been pushed into an overflow chain requires scanning that chain sequentially, degrading what should be a fast indexed lookup."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "In a typical multi-level ISAM structure, what are the usual levels of indexing from top to bottom?",
    options: [
      "A) Leaf index → Root index → Data file",
      "B) Master (cylinder) index → Track (or block) index → Primary data area → Overflow area",
      "C) Hash index → Primary data area only",
      "D) There is only ever a single flat index level in ISAM"
    ],
    answer: "B) Master (cylinder) index → Track (or block) index → Primary data area → Overflow area",
    explanation: "Classic ISAM implementations often use a hierarchical index: a master index narrows the search to a cylinder/region, a track index narrows further to a specific block, and then the primary data area (with associated overflow chains) holds the actual records."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "How does search performance in ISAM typically compare to B-Trees as the dataset grows significantly larger than its original size?",
    options: [
      "A) ISAM always remains faster than B-Trees regardless of growth",
      "B) ISAM's performance worsens due to growing overflow chains, while B-Trees maintain logarithmic search time through automatic rebalancing",
      "C) Both structures degrade at exactly the same rate",
      "D) Neither structure is affected by data growth"
    ],
    answer: "B) ISAM's performance worsens due to growing overflow chains, while B-Trees maintain logarithmic search time through automatic rebalancing",
    explanation: "B-Trees dynamically split and rebalance nodes on insertion, keeping search time at O(log n) regardless of growth. ISAM's static index does not adapt, so heavy insertion activity causes overflow chains to grow, degrading search performance toward linear time within those chains."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What operational practice is commonly required to restore ISAM's performance after significant overflow accumulation?",
    options: [
      "A) Nothing; ISAM self-heals automatically",
      "B) Periodic reorganization (rebuilding) of the file and index from scratch to merge overflow records back into sorted primary blocks",
      "C) Deleting all overflow records permanently with no migration",
      "D) Converting the file to a hash table automatically"
    ],
    answer: "B) Periodic reorganization (rebuilding) of the file and index from scratch to merge overflow records back into sorted primary blocks",
    explanation: "Because ISAM doesn't self-balance, database administrators periodically reorganize (rebuild) the ISAM file — merging overflow records into the main sorted sequence and rebuilding the static index — to restore fast lookup performance."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Why is ISAM well-suited for read-heavy workloads with infrequent updates, but less ideal for write-heavy workloads?",
    options: [
      "A) ISAM cannot perform reads efficiently at all",
      "B) Its static index gives fast, predictable lookups when the data distribution matches the original index, but frequent writes accumulate in overflow chains and degrade performance over time",
      "C) ISAM is equally suited for all workload types with no trade-offs",
      "D) Write operations in ISAM are always faster than read operations"
    ],
    answer: "B) Its static index gives fast, predictable lookups when the data distribution matches the original index, but frequent writes accumulate in overflow chains and degrade performance over time",
    explanation: "ISAM shines in scenarios where the data is loaded once (or rarely changed) and then queried heavily — the static index provides fast, low-overhead lookups. But continuous insertions push records into overflow chains, steadily eroding performance, making it a poor fit for write-intensive systems."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "How does the 'static' nature of ISAM's index fundamentally trade off against the 'dynamic' rebalancing of B-Trees in terms of system design philosophy?",
    options: [
      "A) ISAM trades long-term scalability for simpler, lower-overhead index maintenance and excellent performance on largely static datasets; B-Trees trade slightly higher per-operation overhead for sustained, predictable performance as data changes over time",
      "B) Both structures have identical design philosophies with no meaningful trade-offs",
      "C) B-Trees are always slower than ISAM in every scenario, with no exceptions",
      "D) ISAM dynamically rebalances just like B-Trees, making the two structurally identical"
    ],
    answer: "A) ISAM trades long-term scalability for simpler, lower-overhead index maintenance and excellent performance on largely static datasets; B-Trees trade slightly higher per-operation overhead for sustained, predictable performance as data changes over time",
    explanation: "ISAM's design assumes data is relatively static after the initial load — this simplicity yields excellent performance until significant write activity accumulates. B-Trees pay a small constant overhead on every insert/delete to maintain balance, but this investment pays off by sustaining O(log n) performance indefinitely, regardless of how much the data changes — a classic trade-off between upfront simplicity and long-term adaptability."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "In what scenario might ISAM still be preferred over a B-Tree-based index in a modern system, despite B-Trees' superior write scalability?",
    options: [
      "A) Never; B-Trees are unconditionally superior in every possible scenario",
      "B) In archival or read-mostly systems with infrequent bulk-loaded data (e.g., periodic batch reporting datasets), where ISAM's simpler structure and predictable sequential access pattern can outperform a B-Tree's additional indirection for read-heavy access patterns",
      "C) ISAM is always faster than B-Trees for every type of insert-heavy workload",
      "D) ISAM should be used only when no indexing is required at all"
    ],
    answer: "B) In archival or read-mostly systems with infrequent bulk-loaded data (e.g., periodic batch reporting datasets), where ISAM's simpler structure and predictable sequential access pattern can outperform a B-Tree's additional indirection for read-heavy access patterns",
    explanation: "When data is loaded in bulk and rarely modified afterward — common in archival, reporting, or read-mostly analytical systems — ISAM's static structure imposes no ongoing rebalancing overhead and offers very predictable access patterns, which can be advantageous compared to the slightly higher per-access overhead of traversing a dynamically balanced B-Tree."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "How does the concept of 'overflow chains' in ISAM conceptually relate to 'separate chaining' used for collision handling in hash tables?",
    options: [
      "A) They are entirely unrelated concepts with no structural similarity",
      "B) Both involve linking additional records to a primary location (a block in ISAM, a bucket in hashing) when that location cannot directly accommodate a new entry, degrading lookup speed as the chain grows",
      "C) Overflow chains and separate chaining both guarantee O(1) lookup time regardless of chain length",
      "D) Separate chaining is only used in ISAM, never in hash tables"
    ],
    answer: "B) Both involve linking additional records to a primary location (a block in ISAM, a bucket in hashing) when that location cannot directly accommodate a new entry, degrading lookup speed as the chain grows",
    explanation: "Conceptually, ISAM's overflow pages and hash table separate chaining solve a similar problem: when a primary storage location (block or bucket) is full, additional entries are linked off it. In both cases, as these chains grow long (due to many additions or poor distribution), the lookup degrades from near-constant/logarithmic time toward linear time within the chain — illustrating a recurring trade-off in fixed-capacity storage structures."
  }
];

const IsamQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [attempts, setAttempts] = useState<HistoryAttempt[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const apiBaseUrl = useApiBaseUrl();

  useEffect(() => {
    setIsMounted(true);
    const storedId = localStorage.getItem("quiz_userId");
    const storedName = localStorage.getItem("quiz_username");
    if (storedId && storedName) {
      setUserId(storedId);
      setUsername(storedName);
    }
  }, []);

  useEffect(() => {
    if (userId) fetchAttempts(userId);
  }, [userId, apiBaseUrl]);

  useEffect(() => {
    if (showResult || !userId) return;
    const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [showResult, userId]);

  const selectedOption = userAnswers[currentQuestion] || null;

  const score = useMemo(() => {
    return userAnswers.reduce(
      (acc, answer, index) => (answer === QUESTIONS[index]?.answer ? acc + 1 : acc),
      0
    );
  }, [userAnswers]);

  const fetchAttempts = async (uId: string) => {
    try {
      const res = await axios.get(buildApiUrl(apiBaseUrl, `/api/quiz-attempts/${uId}/isam`));
      if (res.data?.success && Array.isArray(res.data.attempts)) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching ISAM quiz history:", e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, option: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRegister(option);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    const slug = usernameInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    localStorage.setItem("quiz_userId", slug);
    localStorage.setItem("quiz_username", usernameInput.trim());
    setUserId(slug);
    setUsername(usernameInput.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("quiz_userId");
    localStorage.removeItem("quiz_username");
    setUserId(null);
    setUsername(null);
    setAttempts([]);
    handleRetry();
  };

  const submitAttempt = async (finalAnswers: string[]) => {
    if (!userId) return;
    try {
      await axios.post(buildApiUrl(apiBaseUrl, "/api/quiz-attempts"), {
        userId,
        quizId: "isam",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Failed to submit ISAM quiz attempt:", e);
    }
  };

  const handleAnswer = (selected: string) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = selected;
      return updated;
    });
  };

  const nextQuestion = () => {
    if (!selectedOption) return;
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      submitAttempt(userAnswers);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setUserAnswers([]);
    setTimeSpent(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!isMounted) return null;

  if (!userId) {
    return (
      <Layout title="ISAM Quiz" description="Test your knowledge of Indexed Sequential Access Method, overflow pages, and static indexing.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-amber-500/10 text-amber-800 dark:text-amber-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-amber-500/20">
              <FaLayerGroup />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">ISAM Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of static indexing concepts, overflow pages, search performance, and comparisons with B-Trees.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start ISAM Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="ISAM Quiz — Static Indexing & Overflow Handling">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                USER: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-800 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Question</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Time
                      </span>
                      <div className="text-base font-mono font-bold text-amber-800 dark:text-amber-400">
                        {formatDuration(timeSpent)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <QuestionProgress currentQuestion={currentQuestion} totalQuestions={QUESTIONS.length} />
                    <QuestionNavigator
                      questions={QUESTIONS}
                      currentQuestion={currentQuestion}
                      userAnswers={userAnswers}
                      setCurrentQuestionIndex={setCurrentQuestion}
                    />
                  </div>

                  <div className="space-y-3 text-left pt-2">
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-solid ${
                        QUESTIONS[currentQuestion].difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : QUESTIONS[currentQuestion].difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20"
                      }`}>
                        {QUESTIONS[currentQuestion].difficulty}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
                      {QUESTIONS[currentQuestion].question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2" role="radiogroup" aria-label="Quiz Options">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-amber-600 border-amber-600 text-white shadow-xs"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                          }`}
                        >
                          <span>{option}</span>
                          <div className={`w-4 h-4 rounded-full border border-solid flex items-center justify-center shrink-0 ${
                            isSelected ? "border-white bg-white/20" : "border-slate-300 dark:border-slate-700"
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={nextQuestion}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,145,178,0.03),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Quiz Results</h3>
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-amber-800 dark:text-amber-400">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered ISAM concepts and static indexing trade-offs."
                        : score >= 9
                          ? "Excellent! Your understanding of ISAM is strong."
                          : score >= 6
                            ? "Good effort! Review overflow page handling and how ISAM compares to dynamically balanced structures."
                            : "Keep practicing! Focus on why ISAM's static index degrades over time and how reorganization restores performance."}
                    </p>
                    <QuizResultActions onRetry={handleRetry} />
                  </div>

                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Answer Breakdown</h4>
                    {QUESTIONS.map((q, index) => {
                      const userAns = userAnswers[index];
                      const isCorrect = userAns === q.answer;
                      return (
                        <div key={q.id} className="bg-slate-50/50 dark:bg-slate-950/30 border border-solid border-slate-200/80 dark:border-slate-800/60 rounded-xl p-5 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white m-0 leading-relaxed max-w-2xl">
                              {index + 1}. {q.question}
                            </h5>
                            <span className={`text-base shrink-0 ${isCorrect ? "text-emerald-500" : "text-rose-800 dark:text-rose-400"}`}>
                              {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                            <div className={`p-2.5 rounded-lg border border-solid ${isCorrect ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-rose-500/5 border-rose-500/10 text-rose-700 dark:text-rose-400"}`}>
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Your Answer:</span>
                              {userAns || "[No answer selected]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Correct Answer:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Explanation:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {attempts.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" />
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Attempt History</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {attempts.map((att, idx) => {
                    const totalCount = att.totalQuestions || QUESTIONS.length;
                    return (
                      <div
                        key={att.id || idx}
                        className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/60 rounded-xl p-4 flex justify-between items-center text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                            Attempt #{attempts.length - idx}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {att.completedAt ? new Date(att.completedAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : "—"}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-mono font-black text-sm text-amber-800 dark:text-amber-400">
                            {att.score} <span className="text-[10px] text-slate-400 font-sans font-normal">/ {totalCount}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {formatDuration(att.timeSpent)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IsamQuiz;
