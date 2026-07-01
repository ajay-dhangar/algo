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
  FaSitemap,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface BPlusTreeQuestion {
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

const QUESTIONS: BPlusTreeQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is the primary structural difference between a B-Tree and a B+ Tree?",
    options: [
      "A) B+ Trees do not allow duplicate keys, while B-Trees do",
      "B) In a B+ Tree, only leaf nodes store actual data records; internal nodes store only keys used for navigation",
      "C) B+ Trees are always binary, while B-Trees can have multiple children",
      "D) There is no structural difference; the names are interchangeable"
    ],
    answer: "B) In a B+ Tree, only leaf nodes store actual data records; internal nodes store only keys used for navigation",
    explanation: "In a B-Tree, data can be stored in both internal and leaf nodes. In a B+ Tree, internal nodes store only keys for routing search operations, while all actual data (or record pointers) reside exclusively in the leaf nodes."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "How are leaf nodes typically organized in a B+ Tree?",
    options: [
      "A) They are isolated and unconnected to one another",
      "B) They are linked together in a sorted linked list, allowing efficient sequential and range traversal",
      "C) They are organized in a hash table",
      "D) They are stored in random, unordered positions"
    ],
    answer: "B) They are linked together in a sorted linked list, allowing efficient sequential and range traversal",
    explanation: "B+ Tree leaf nodes are connected via pointers in a sorted linked list. This allows range queries and full sequential scans to be performed efficiently without re-traversing the tree from the root."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "Why are B+ Trees commonly used for database indexing?",
    options: [
      "A) They require less disk space than any other structure",
      "B) Their high fan-out and linked leaf nodes make both point lookups and range queries efficient, while minimizing disk I/O",
      "C) They only work with in-memory data and not disk-based storage",
      "D) They eliminate the need for sorting data"
    ],
    answer: "B) Their high fan-out and linked leaf nodes make both point lookups and range queries efficient, while minimizing disk I/O",
    explanation: "B+ Trees are optimized for block-based storage: high fan-out keeps tree height (and thus disk reads) low, and the linked leaf structure makes range queries fast — both crucial for database indexes."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is a 'Range Query' in the context of B+ Trees?",
    options: [
      "A) A query that retrieves a single exact-match record",
      "B) A query that retrieves all records whose keys fall within a specified range, such as between two values",
      "C) A query that deletes a range of nodes from the tree",
      "D) A query used only to check if the tree is balanced"
    ],
    answer: "B) A query that retrieves all records whose keys fall within a specified range, such as between two values",
    explanation: "A range query asks for all records with keys between a lower and upper bound (e.g., 'all ages between 18 and 30'). B+ Trees handle this efficiently by locating the start key, then simply following leaf-node links sequentially."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "In a B+ Tree, do internal (non-leaf) nodes store actual data records?",
    options: [
      "A) Yes, internal nodes store full data records just like leaf nodes",
      "B) No, internal nodes store only keys used to guide the search to the correct leaf",
      "C) Internal nodes store data only in the root",
      "D) Internal nodes are never used for searching"
    ],
    answer: "B) No, internal nodes store only keys used to guide the search to the correct leaf",
    explanation: "Internal nodes in a B+ Tree act purely as a routing/index layer — they hold separator keys that direct traversal toward the correct leaf node, where the actual data resides."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the time complexity of a search operation in a B+ Tree with n keys and order m (fan-out)?",
    options: [
      "A) O(n)",
      "B) O(log_m n)",
      "C) O(m log n)",
      "D) O(n log m)"
    ],
    answer: "B) O(log_m n)",
    explanation: "Because each internal node has up to m children, the height of the tree is roughly log base m of n. Search complexity is therefore O(log_m n) — significantly shallower than a binary tree's O(log_2 n) for large m."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "What happens during insertion when a B+ Tree leaf node becomes full (exceeds its maximum key capacity)?",
    options: [
      "A) The insertion fails and an error is thrown",
      "B) The leaf node is split into two nodes, and the middle (or first key of the new right node) is copied up to the parent as a separator key",
      "C) The entire tree is rebuilt from scratch",
      "D) The new key is simply discarded"
    ],
    answer: "B) The leaf node is split into two nodes, and the middle (or first key of the new right node) is copied up to the parent as a separator key",
    explanation: "When a leaf overflows, it splits into two leaves, and a copy of the separating key is pushed up to the parent node to maintain correct routing. Unlike a B-Tree split, the key is copied (not moved) since it must still exist in the leaf-level data layer."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "When deleting a key from a B+ Tree causes a leaf node to underflow (fall below the minimum number of keys), what are the typical resolution strategies?",
    options: [
      "A) The tree becomes permanently invalid and must be rebuilt",
      "B) Borrowing a key from a sibling node, or merging with a sibling if borrowing isn't possible",
      "C) Simply leaving the node underflowed with no correction",
      "D) Deleting the entire subtree containing the underflowed node"
    ],
    answer: "B) Borrowing a key from a sibling node, or merging with a sibling if borrowing isn't possible",
    explanation: "On underflow, the B+ Tree first tries to redistribute (borrow) a key from an adjacent sibling that has extra keys. If no sibling can spare a key, the underflowed node is merged with a sibling, and the separator key in the parent is removed, potentially propagating the underflow upward."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Why does duplicating keys between internal nodes and leaf nodes in a B+ Tree NOT waste significant space in practice?",
    options: [
      "A) It does waste significant space, which is a known drawback of B+ Trees",
      "B) Internal nodes only store keys (not full records), so the duplicated key overhead is small compared to the space saved by enabling a much higher fan-out and shallower tree",
      "C) B+ Trees never duplicate any keys",
      "D) Disk space is irrelevant to database performance"
    ],
    answer: "B) Internal nodes only store keys (not full records), so the duplicated key overhead is small compared to the space saved by enabling a much higher fan-out and shallower tree",
    explanation: "Since internal nodes hold only keys (no data payload), more keys fit per disk block, increasing fan-out and reducing tree height. The minor redundancy of storing a key in both an internal node and a leaf is a worthwhile trade-off for faster traversal and efficient range scans."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "How does a B+ Tree achieve efficient sequential (in-order) traversal of all stored records, and how does this compare to a B-Tree?",
    options: [
      "A) Both B-Trees and B+ Trees require a full in-order tree traversal starting from the root every time",
      "B) A B+ Tree only needs to find the first leaf and then follow leaf-to-leaf linked list pointers, avoiding repeated root-to-leaf traversals required by a plain B-Tree",
      "C) Neither structure supports sequential traversal at all",
      "D) B-Trees are always faster for sequential traversal than B+ Trees"
    ],
    answer: "B) A B+ Tree only needs to find the first leaf and then follow leaf-to-leaf linked list pointers, avoiding repeated root-to-leaf traversals required by a plain B-Tree",
    explanation: "Because B+ Tree leaves are linked sequentially, a full scan or range query needs only one descent to the starting leaf, then a simple linked-list walk. A standard B-Tree (without linked leaves) would require repeated tree traversals or complex in-order logic to visit all records, making B+ Trees significantly better suited for range-heavy database workloads."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "In a database system, why might a composite (multi-column) index implemented as a B+ Tree still perform poorly for queries that filter only on the second column of the index?",
    options: [
      "A) B+ Trees cannot store composite keys at all",
      "B) Because keys are ordered primarily by the first column, filtering only on the second column cannot leverage the sorted order, often forcing a broader scan rather than a precise lookup",
      "C) Composite indexes are always faster than single-column indexes for every type of query",
      "D) B+ Trees automatically reorder columns to optimize any query pattern"
    ],
    answer: "B) Because keys are ordered primarily by the first column, filtering only on the second column cannot leverage the sorted order, often forcing a broader scan rather than a precise lookup",
    explanation: "A composite B+ Tree index on (A, B) sorts entries primarily by A, then by B within each A value. A query filtering only on B cannot binary-search effectively, since matching B values are scattered across different A groups — this is why column order in composite indexes matters significantly for query performance."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "What is a key trade-off when increasing the order (fan-out) of a B+ Tree to reduce tree height?",
    options: [
      "A) There is no trade-off; higher fan-out is always strictly better with no downsides",
      "B) Larger nodes mean more keys must be scanned or compared within each node during traversal, and each node may not fit as cleanly within a single disk block if too large",
      "C) Increasing fan-out always decreases search time to O(1) regardless of size",
      "D) Higher fan-out eliminates the need for leaf node linking"
    ],
    answer: "B) Larger nodes mean more keys must be scanned or compared within each node during traversal, and each node may not fit as cleanly within a single disk block if too large",
    explanation: "While higher fan-out reduces tree height (fewer disk seeks), each node becomes larger and may require more in-node comparisons (mitigated in practice by binary search within the node). Critically, node size is usually tuned to match the disk block size — making it too large would mean a single node spans multiple disk blocks, increasing I/O cost per node access and negating the benefit."
  }
];

const BPlusTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "bplus-tree" });
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
      <Layout title="B+ Tree Quiz" description="Test your knowledge of B+ Tree structure, range queries, and database indexing.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-sky-500/10 text-sky-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-sky-500/20">
              <FaSitemap />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">B+ Tree Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of internal vs leaf node organization, range queries, linked leaf nodes, and database indexing.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-sky-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start B+ Tree Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="B+ Tree Quiz — Indexing & Range Queries">
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
                      <div className="text-base font-mono font-bold text-sky-600 dark:text-sky-400">
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
                          onClick={() => handleAnswer(option)} role="radio" aria-checked={isSelected}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-sky-600 border-sky-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-sky-600 dark:text-sky-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered B+ Tree structure and database indexing concepts."
                        : score >= 9
                          ? "Excellent! Your understanding of B+ Trees is strong."
                          : score >= 6
                            ? "Good effort! Review leaf-node linking, split/merge behavior, and how B+ Trees differ from B-Trees."
                            : "Keep practicing! Focus on the difference between internal and leaf nodes, and how range queries are handled."}
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
                          <div className="font-mono font-black text-sm text-sky-600 dark:text-sky-400">
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

export default BPlusTreeQuiz;
