import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import QuizErrorBoundary from "../../components/Quiz/QuizErrorBoundary";
import QuizSkeleton from "../../components/Quiz/QuizSkeleton";
import { useQuizData } from "../../hooks/useQuizData";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaHashtag,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface HashIndexingQuestion {
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

const QUESTIONS: HashIndexingQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is Hash Indexing primarily used for in database/storage systems?",
    options: [
      "A) Sorting all records in ascending order",
      "B) Mapping a search key to a specific bucket/block location using a hash function, enabling fast direct lookups",
      "C) Compressing data to save disk space",
      "D) Encrypting sensitive data for security"
    ],
    answer: "B) Mapping a search key to a specific bucket/block location using a hash function, enabling fast direct lookups",
    explanation: "Hash indexing applies a hash function to a search key to compute the address (bucket) where the corresponding record is stored, allowing near-direct O(1) average-case access rather than scanning or tree traversal."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is 'Static Hashing'?",
    options: [
      "A) A hashing scheme where the number of buckets is fixed and does not change as data grows",
      "B) A hashing scheme that automatically resizes itself on every insertion",
      "C) A hashing scheme that only works with string keys",
      "D) A hashing scheme used exclusively for in-memory caches"
    ],
    answer: "A) A hashing scheme where the number of buckets is fixed and does not change as data grows",
    explanation: "In static hashing, the total number of buckets is determined upfront and remains constant. As more records are inserted, buckets can become overloaded, requiring overflow handling, since the structure does not adapt its size dynamically."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What problem does 'Dynamic Hashing' solve compared to static hashing?",
    options: [
      "A) It eliminates the need for a hash function entirely",
      "B) It allows the number of buckets to grow or shrink as data volume changes, avoiding the overflow problems of a fixed-size static scheme",
      "C) It guarantees there will never be any collisions",
      "D) It only works for read-only databases"
    ],
    answer: "B) It allows the number of buckets to grow or shrink as data volume changes, avoiding the overflow problems of a fixed-size static scheme",
    explanation: "Dynamic hashing schemes (like extendible and linear hashing) adapt the structure's size as data grows or shrinks, addressing static hashing's core weakness: performance degradation from bucket overflow when the initial bucket count proves insufficient."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is a 'Collision' in the context of hashing?",
    options: [
      "A) When the database crashes unexpectedly",
      "B) When two or more distinct keys hash to the same bucket or address",
      "C) When a hash function returns a negative number",
      "D) When two threads try to read the same record simultaneously"
    ],
    answer: "B) When two or more distinct keys hash to the same bucket or address",
    explanation: "A collision occurs when the hash function maps two different keys to the same bucket location. Since collisions are statistically inevitable in any hashing scheme, systems must use a collision handling technique to resolve them."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "Which of these is a common technique for handling collisions in hash indexing?",
    options: [
      "A) Ignoring the second key entirely and discarding it",
      "B) Chaining (linking colliding records together) or open addressing (probing for the next available slot)",
      "C) Automatically deleting the entire bucket",
      "D) Converting the hash table into a sorted array"
    ],
    answer: "B) Chaining (linking colliding records together) or open addressing (probing for the next available slot)",
    explanation: "The two main collision handling families are chaining (each bucket holds a linked list of colliding entries) and open addressing (the colliding entry searches for the next free slot using a probing sequence, such as linear or quadratic probing)."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "How does 'Extendible Hashing' adapt to growing data without rehashing the entire dataset at once?",
    options: [
      "A) It rehashes and rewrites every single record every time the table grows",
      "B) It uses a directory of pointers to buckets, doubling the directory size only when needed, and splitting only the specific overflowing bucket rather than the entire structure",
      "C) It deletes old records to make room for new ones",
      "D) It does not support growth at all; the bucket count remains fixed forever"
    ],
    answer: "B) It uses a directory of pointers to buckets, doubling the directory size only when needed, and splitting only the specific overflowing bucket rather than the entire structure",
    explanation: "Extendible hashing maintains a directory (an array of pointers to buckets) indexed by some number of bits of the hash value. When a bucket overflows, only that bucket is split, and the directory may double in size — avoiding a full rehash of all existing data."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "How does 'Linear Hashing' differ from Extendible Hashing in how it grows the structure?",
    options: [
      "A) Linear hashing grows by splitting buckets in a predetermined, round-robin order one at a time, without needing a directory of pointers",
      "B) Linear hashing requires doubling the entire bucket array immediately whenever any bucket overflows",
      "C) Linear hashing and extendible hashing are identical with no differences",
      "D) Linear hashing never splits buckets under any circumstances"
    ],
    answer: "A) Linear hashing grows by splitting buckets in a predetermined, round-robin order one at a time, without needing a directory of pointers",
    explanation: "Linear hashing avoids the overhead of a directory structure. Instead, it splits buckets in a fixed, sequential order (controlled by a pointer that cycles through bucket indices) regardless of which specific bucket triggered the overflow, gradually growing the table over time."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What is the average-case time complexity for a search operation using a well-designed hash index with minimal collisions?",
    options: [
      "A) O(n)",
      "B) O(log n)",
      "C) O(1)",
      "D) O(n log n)"
    ],
    answer: "C) O(1)",
    explanation: "With a good hash function and load factor, most lookups resolve directly to the correct bucket with little to no collision resolution overhead, giving an average-case constant time O(1) — though worst-case behavior can degrade if many keys collide."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Why is hash indexing generally NOT well-suited for range queries (e.g., 'find all records between X and Y')?",
    options: [
      "A) Hash functions preserve the relative order of keys, making range queries trivial",
      "B) Hash functions intentionally scatter keys across buckets without preserving their relative order, so there's no efficient way to locate a contiguous range without scanning broadly",
      "C) Range queries are impossible in any database system",
      "D) Hash indexes are slower than sequential scans for every single query type"
    ],
    answer: "B) Hash functions intentionally scatter keys across buckets without preserving their relative order, so there's no efficient way to locate a contiguous range without scanning broadly",
    explanation: "A good hash function distributes keys pseudo-randomly to minimize collisions, which is precisely what makes it unsuitable for range queries — neighboring key values may land in completely unrelated buckets, unlike a B+ Tree where sorted order is preserved."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "What is a key advantage of Extendible Hashing's directory-doubling approach over a naive 'rehash everything' static hashing growth strategy, in terms of cost distribution?",
    options: [
      "A) There is no advantage; both approaches have identical cost",
      "B) Extendible hashing's directory doubling and single-bucket split amortizes growth cost across many insertions, while a full static rehash incurs one large, disruptive cost spike that touches every existing record",
      "C) Extendible hashing requires more total disk space than static hashing in all cases",
      "D) Naive rehashing is always faster regardless of dataset size"
    ],
    answer: "B) Extendible hashing's directory doubling and single-bucket split amortizes growth cost across many insertions, while a full static rehash incurs one large, disruptive cost spike that touches every existing record",
    explanation: "When a static hash table needs more buckets, all existing records typically must be rehashed and redistributed — an expensive, disruptive O(n) operation. Extendible hashing instead handles growth incrementally: splitting just the overflowing bucket and doubling only the directory (a much smaller structure), spreading the cost of growth across many individual insertions rather than one large rehash event."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "In Linear Hashing, what mechanism allows it to handle bucket overflow before the 'scheduled' split pointer reaches that particular bucket?",
    options: [
      "A) It is impossible to handle overflow before the scheduled split; the system must always wait",
      "B) An overflow chain (linked overflow buckets) is temporarily attached to the overflowing bucket, accepting extra records until the round-robin split pointer eventually reaches and splits that bucket",
      "C) The entire table is immediately resized whenever any bucket overflows out of order",
      "D) Overflowing records are simply discarded and lost"
    ],
    answer: "B) An overflow chain (linked overflow buckets) is temporarily attached to the overflowing bucket, accepting extra records until the round-robin split pointer eventually reaches and splits that bucket",
    explanation: "Since linear hashing splits buckets in a fixed sequential order rather than reacting immediately to the specific bucket that overflowed, any bucket that overflows out-of-turn temporarily uses an overflow chain. This sacrifices some search performance for those records until the scheduled split pointer eventually reaches and resolves that bucket's overflow."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "When designing a hashing scheme for a database index, what trade-off must be considered between minimizing collisions and controlling memory/disk overhead?",
    options: [
      "A) There is no trade-off; you can simultaneously minimize collisions to zero and use minimal memory in all cases",
      "B) A larger number of buckets (lower load factor) reduces collision frequency and improves average lookup speed, but consumes more memory/disk space, even when many buckets remain mostly empty",
      "C) Using more buckets always increases collisions",
      "D) Memory overhead is irrelevant to hash table design"
    ],
    answer: "B) A larger number of buckets (lower load factor) reduces collision frequency and improves average lookup speed, but consumes more memory/disk space, even when many buckets remain mostly empty",
    explanation: "The load factor (records per bucket) directly affects this trade-off: a low load factor (many buckets relative to records) minimizes collisions and keeps lookups close to O(1), but wastes space on sparsely-filled buckets. A high load factor saves space but increases collision frequency and degrades performance — dynamic hashing schemes try to maintain a good load factor automatically as data grows, balancing this trade-off over time."
  }
];

const HashIndexingQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "hash-indexing" });
  const [isMounted, setIsMounted] = useState(false);

  
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

    useEffect(() => {
    if (userId) {
      fetchAttempts(userId);
    }
  }, [userId, fetchAttempts]);

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
      submitAttempt(userId, score, QUESTIONS.length, timeSpent);
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
      <Layout title="Hash Indexing Quiz" description="Test your knowledge of static/dynamic hashing, extendible/linear hashing, and collision handling.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-rose-500/10 text-rose-800 dark:text-rose-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-rose-500/20">
              <FaHashtag />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Hash Indexing Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of static hashing, dynamic hashing, extendible hashing, linear hashing, and collision handling techniques.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-rose-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Hash Indexing Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Hash Indexing Quiz — Hashing Schemes & Collisions">
      <QuizErrorBoundary>
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
                      <div className="text-base font-mono font-bold text-rose-800 dark:text-rose-400">
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
                            ? "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20"
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
                          onClick={() => handleAnswer(option)} role="radio" aria-checked={isSelected}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-rose-600 border-rose-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-rose-800 dark:text-rose-400">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered hash indexing schemes and collision handling techniques."
                        : score >= 9
                          ? "Excellent! Your understanding of hash indexing is strong."
                          : score >= 6
                            ? "Good effort! Review collision handling techniques and how extendible/linear hashing manage growth."
                            : "Keep practicing! Focus on the difference between static and dynamic hashing, and why hash indexes don't suit range queries."}
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
                          <div className="font-mono font-black text-sm text-rose-800 dark:text-rose-400">
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
          </QuizErrorBoundary>
    </Layout>
  );
};

export default HashIndexingQuiz;
