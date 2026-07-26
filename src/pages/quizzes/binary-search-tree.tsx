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
  FaNetworkWired, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChevronRight, 
  FaHistory, 
  FaAward 
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface BSTQuestion {
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

const QUESTIONS: BSTQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is the primary structural property that defines a Binary Search Tree (BST)?",
    options: [
      "A) Every single node across all levels must have exactly two child nodes.",
      "B) The left child's key is greater than the parent node, and the right child's key is strictly smaller.",
      "C) The left subtree contains only keys less than the parent, and the right subtree contains only keys greater than the parent.",
      "D) All leaf nodes are constrained to group together on the right hand side of the root."
    ],
    answer: "C) The left subtree contains only keys less than the parent, and the right subtree contains only keys greater than the parent.",
    explanation: "A Binary Search Tree relies on a strict order variant: for any given node, all element values in its left child branch are smaller, while all values in its right child branch are larger."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is the average-case time complexity for executing a lookup operation in a balanced Binary Search Tree?",
    options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
    answer: "B) O(log n)",
    explanation: "When a BST is well-balanced, its depth scales at log(n). Each search step cuts the search space exactly in half, delivering clear O(log n) performance limits."
  },
  {
    id: 3,
    difficulty: "Medium",
    question: "In the worst-case scenario (such as a skewed tree built from sorted inputs), what does a standard BST lookup degrade to?",
    options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n^2)"],
    answer: "C) O(n)",
    explanation: "If items are inserted in linear sorted order, a regular BST shifts into a linked-list shape. This breakdown forces search pipelines to run sequentially through all elements, degrading to O(n)."
  },
  {
    id: 4,
    difficulty: "Medium",
    question: "Which depth-first tree traversal technique produces a list of BST keys sorted in ascending sequence?",
    options: ["A) Pre-order traversal", "B) Post-order traversal", "C) In-order traversal", "D) Level-order traversal"],
    answer: "C) In-order traversal",
    explanation: "An In-order traversal follows a Left-Root-Right pattern. Given the structural positioning rules of a BST, this sequence outputs all values in a perfect ascending order."
  },
  {
    id: 5,
    difficulty: "Hard",
    question: "When deleting an internal node with two active children from a BST, which alternative node is typically substituted to preserve structural balance?",
    options: [
      "A) The absolute deepest leaf node located anywhere in the tree configuration.",
      "B) Either the In-order Predecessor or the In-order Successor of that node.",
      "C) The immediate left-hand child node.",
      "D) The root node of the entire structural framework."
    ],
    answer: "B) Either the In-order Predecessor or the In-order Successor of that node.",
    explanation: "To keep the BST properties unbroken when removing a node with two children, swap its place with either the largest value in its left side (predecessor) or the smallest value in its right side (successor)."
  },
  {
    id: 6,
    difficulty: "Easy",
    question: "What is the maximum number of children any node can legally maintain within a Binary Search Tree layout?",
    options: ["A) Unlimited", "B) 1", "C) 2", "D) 4"],
    answer: "C) 2",
    explanation: "As an explicit binary structural configuration, every single node position is capped at a maximum child count of exactly two (traditionally labeled left and right children)."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "If the root node of a valid BST holds the value 50, where would a new element with a value of 35 be placed?",
    options: [
      "A) Somewhere inside the right subtree branch.",
      "B) Directly as the new primary parent over the root node.",
      "C) Somewhere inside the left subtree branch.",
      "D) It replaces the value 50, purging it from the structure."
    ],
    answer: "C) Somewhere inside the left subtree branch.",
    explanation: "Since 35 is less than 50, it must be routed to the left subtree branch of the root node according to standard BST sorting properties."
  },
  {
    id: 8,
    difficulty: "Hard",
    question: "What is the maximum possible height of an unbalanced Binary Search Tree that holds exactly 'n' nodes?",
    options: ["A) O(log n)", "B) O(n)", "C) O(n - 1)", "D) O(sqrt(n))"],
    answer: "B) O(n)",
    explanation: "In a worst-case, single-line skewed tree, every node has exactly one child. Under the standard node-counting convention (where a single root node has height 1), the maximum height of a tree with n nodes is n, which is O(n)."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Which of these specialized algorithmic frameworks is explicitly engineered to prevent a BST from degrading into a skewed layout?",
    options: ["A) Hash Map", "B) Red-Black Tree / AVL Tree", "C) Priority Queue Linkages", "D) Minimal Spanning Matrix"],
    answer: "B) Red-Black Tree / AVL Tree",
    explanation: "AVL and Red-Black trees are self-balancing extensions of a classic BST. They run automated structural adjustments during modifications to keep lookup times locked at O(log n)."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "If an in-order traversal of a target binary tree yields '2, 3, 4, 7, 9', is this data alone enough to confirm the tree is a valid BST?",
    options: [
      "A) No, because we do not know if the structural layout satisfies binary tree requirements.",
      "B) Yes, an ascending sorted sequence proves it is a valid BST.",
      "C) No, because the values do not contain negative integers.",
      "D) Yes, because 7 is positioned as the exact numerical median value."
    ],
    answer: "A) No, because we do not know if the structural layout satisfies binary tree requirements.",
    explanation: "An ascending in-order traversal sequence is expected from a BST, but it is only half the check. If the structural arrangement violates simple binary rules (like a node holding 3 children), it is not a valid BST."
  }
];

const BinarySearchTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Session & Sync Management
  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "binary-search-tree" });
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
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
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
      <Layout title="BST Skill Assessment" description="Analyze tree depth algorithms, ascending collections, and rebalancing tasks.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-blue-500/20">
              <FaNetworkWired />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">BST Arena Gate</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Verify your structural sorting rules, balance operations, and path tracking configurations. Please provide your developer profile identity handle.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter workspace developer alias"
                aria-label="Enter workspace developer alias"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Initialize Diagnostic Interface
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Binary Search Tree Evaluation Engine">
      <QuizErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
            {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                ACTIVE USER ALLOCATION: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-800 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Terminate Session
            </button>
          </div>

          {/* Interactive Quiz Frame */}
          <div className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xs">
            
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="active-question-node"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Dynamic Metric Bar */}
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Evaluation Node</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Runtime Trace
                      </span>
                      <div className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">
                        {formatDuration(timeSpent)}
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-3">
                    <QuestionProgress currentQuestion={currentQuestion} totalQuestions={QUESTIONS.length} />
                    <QuestionNavigator
                      questions={QUESTIONS}
                      currentQuestion={currentQuestion}
                      userAnswers={userAnswers}
                      setCurrentQuestionIndex={setCurrentQuestion}
                    />
                  </div>

                  {/* Context Info */}
                  <div className="space-y-3 text-left pt-2">
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-solid ${
                        QUESTIONS[currentQuestion].difficulty === "Easy" 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : QUESTIONS[currentQuestion].difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20"
                      }`}>
                        {QUESTIONS[currentQuestion].difficulty} Difficulty
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
                      {QUESTIONS[currentQuestion].question}
                    </h3>
                  </div>

                  {/* Radio Choice Container Stack */}
                  <div className="grid grid-cols-1 gap-3 pt-2" role="radiogroup" aria-label="Quiz Options">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)} role="radio" aria-checked={isSelected}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-xs"
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

                  {/* Action Bar */}
                  <button
                    onClick={nextQuestion}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Complete Verification Check" : "Commit Answer & Advance"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                /* Audit / Analysis Evaluation Overview Panel */
                <motion.div
                  key="quiz-diagnostic-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Tree Structure Compliance</h3>
                    
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-blue-600 dark:text-blue-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-sm mx-auto leading-relaxed">
                      {score === QUESTIONS.length ? "Perfect state invariants! Your binary search tree algorithms are flawlessly organized." : score >= 6 ? "Solid baseline metrics! You understand lookups, sorting logic, and average path behavior well." : "Asymmetry found. Spend extra time analyzing leaf assignments, worst-case linear degressions, and node removal processes."}
                    </p>

                    <QuizResultActions onRetry={handleRetry} />
                  </div>

                  {/* Debug Log Trace Details */}
                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Node Execution Summary</h4>
                    
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
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Your Choice:</span>
                              {userAns || "[STACK_UNDERFLOW_ERROR]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Target Match:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Algorithmic Breakdown:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Historical Audit Table Section */}
            {attempts.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" /> 
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Past Execution Sequences</span>
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
                            Trace Sequence #{attempts.length - idx}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {att.completedAt ? new Date(att.completedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : "Archived Matrix Log"}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-mono font-black text-sm text-blue-600 dark:text-blue-400">
                            {att.score} <span className="text-[10px] text-slate-400 font-sans font-normal">/ {totalCount}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Time: {formatDuration(att.timeSpent)}
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

export default BinarySearchTreeQuiz;