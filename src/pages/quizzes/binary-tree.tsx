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
  FaCodeBranch, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChevronRight, 
  FaHistory 
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface BTQuestion {
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

const QUESTIONS: BTQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is the height of a binary tree that contains only a single root node?",
    options: ["A) 0", "B) 1", "C) 2", "D) It depends entirely on the tree implementation"],
    answer: "B) 1",
    explanation: "By standard node-counting convention, a binary tree containing exactly one node has a height of 1. (Note: If counting edges instead, it would be 0, but standard educational frameworks default to node counts)."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "Which fundamental depth-first traversal method processes a binary tree in the exact sequence: Left Subtree, Root Node, Right Subtree?",
    options: ["A) Pre-order traversal", "B) In-order traversal", "C) Post-order traversal", "D) Level-order traversal"],
    answer: "B) In-order traversal",
    explanation: "In-order traversal strictly follows the Left-Root-Right pattern recursively. When executed on a binary search tree, this traversal returns elements in sorted order."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "In a traditional binary tree setup, what is the maximum possible number of nodes that can exist specifically at depth 'd'?",
    options: ["A) 2^d", "B) 2^(d+1) - 1", "C) 2d", "D) d^2"],
    answer: "A) 2^d",
    explanation: "Since every node in a binary tree can split into at most 2 children, the maximum node limit doubles with each level, scaling exactly as 2^d (assuming the root sits at depth 0)."
  },
  {
    id: 4,
    difficulty: "Medium",
    question: "What is the average-case time complexity of looking up a unique key within a perfectly balanced Binary Search Tree (BST)?",
    options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
    answer: "B) O(log n)",
    explanation: "A balanced BST splits the search space in half with every node comparison. This makes the search operational length proportional to the height of the tree, which is O(log n)."
  },
  {
    id: 5,
    difficulty: "Medium",
    question: "Which structural rule must a binary tree satisfy to qualify as a valid Binary Search Tree?",
    options: [
      "A) The left subtree of a node contains only keys lesser than the node's key.",
      "B) The right subtree of a node contains only keys greater than the node's key.",
      "C) Both A and B are true.",
      "D) None of the above rules apply."
    ],
    answer: "C) Both A and B are true.",
    explanation: "To maintain the binary search variant, every single node must act as a boundary: all left elements must be strictly smaller than it, and all right elements must be strictly larger."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "Which of the following definitions precisely describes a 'Complete Binary Tree'?",
    options: [
      "A) Every level is completely filled except possibly the last level, which is filled from left to right.",
      "B) All leaf nodes are forced to sit on the exact same depth layer.",
      "C) Every internal node is strictly forced to have exactly two children.",
      "D) The tree is fully skewed down one single child branch line."
    ],
    answer: "A) Every level is completely filled except possibly the last level, which is filled from left to right.",
    explanation: "A complete binary tree keeps structural paths densely packed. Every single level is entirely filled, and the bottom-most level populates positions progressively from left to right without skipping spaces."
  },
  {
    id: 7,
    difficulty: "Hard",
    question: "What is the absolute maximum possible depth/height of an unconstrained binary tree structured with exactly 'n' nodes?",
    options: ["A) n", "B) log n", "C) n / 2", "D) n - 1"],
    answer: "A) n",
    explanation: "In a worst-case scenario where each node contains only one child, the tree stretches out into a single linear sequence. The depth matches the count of nodes, resulting in a height of n."
  },
  {
    id: 8,
    difficulty: "Hard",
    question: "Which implementation architectures can be used to determine the Lowest Common Ancestor (LCA) of two target nodes within a binary tree?",
    options: ["A) A purely recursive post-order exploration stack", "B) An iterative parent-mapping pointer tracker using hash structures", "C) Both A and B", "D) None of the above methods are valid"],
    answer: "C) Both A and B",
    explanation: "LCA problems can be handled recursively by bubbled matches from sub-branches, or iteratively by mapping out parent nodes via a look-up map and finding where their paths cross."
  },
  {
    id: 9,
    difficulty: "Hard",
    question: "Which specific traversal path strategy yields the contents of a valid Binary Search Tree in strict descending order?",
    options: ["A) Standard In-order traversal", "B) Pre-order structural traversal", "C) Post-order cleanup traversal", "D) Reverse In-order traversal"],
    answer: "D) Reverse In-order traversal",
    explanation: "While a standard in-order traversal (Left, Root, Right) yields elements in ascending order, reversing that approach to (Right, Root, Left) outputs the largest elements first, delivering a perfect descending list."
  },
  {
    id: 10,
    difficulty: "Medium",
    question: "What is the worst-case time complexity encountered when attempting to insert a new node into an unbalanced Binary Search Tree?",
    options: ["A) O(log n)", "B) O(n)", "C) O(n log n)", "D) O(1)"],
    answer: "B) O(n)",
    explanation: "If a BST gets heavily skewed into a linear chain, inserting an item that belongs at the very end requires iterating past every single existing element, leading to a worst-case time of O(n)."
  }
];

const BinaryTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Analytics & Persistence States
  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "binary-tree" });
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
      <Layout title="Binary Tree Core Assessment" description="Test your traversal, node balance calculations, and pointer depth logic.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-blue-500/20">
              <FaCodeBranch />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Tree Space Initialize</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Prepare to evaluate traversals, depth complexities, and tree balance. Provide an identifier key to begin monitoring execution runs.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter workspace handle identifier"
                aria-label="Enter workspace handle identifier"
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
                Mount Evaluation Suite
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Binary Tree Workspace Analytics Engine">
      <QuizErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
                      

            {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                MONITORING POOL NODE: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-800 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Flush Session Data
            </button>
          </div>

          {/* Interactive Shell Frame */}
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
                  {/* Performance Indicators */}
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Evaluation Node Index</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Thread Runtime
                      </span>
                      <div className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">
                        {formatDuration(timeSpent)}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Interfacing Sub-nodes */}
                  <div className="space-y-3">
                    <QuestionProgress currentQuestion={currentQuestion} totalQuestions={QUESTIONS.length} />
                    <QuestionNavigator
                      questions={QUESTIONS}
                      currentQuestion={currentQuestion}
                      userAnswers={userAnswers}
                      setCurrentQuestionIndex={setCurrentQuestion}
                    />
                  </div>

                  {/* Context Meta Header */}
                  <div className="space-y-3 text-left pt-2">
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-solid ${
                        QUESTIONS[currentQuestion].difficulty === "Easy" 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : QUESTIONS[currentQuestion].difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20"
                      }`}>
                        {QUESTIONS[currentQuestion].difficulty} Node Complexity
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
                      {QUESTIONS[currentQuestion].question}
                    </h3>
                  </div>

                  {/* Choices Interactive Array Stack */}
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

                  {/* Action Navigation Interface Control */}
                  <button
                    onClick={nextQuestion}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Compile Diagnostics & Finish" : "Commit Option Pointer"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                /* Post-Run Analytical Metric Review Dashboard Panel */
                <motion.div
                  key="quiz-diagnostic-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Compilation Results</h3>
                    
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-blue-600 dark:text-blue-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length ? "Structural integrity complete. All pointers, leaf paths, and look-up runtimes match their target specifications exactly." : score >= 7 ? "High tree balance density verified! Your logic surrounding depth tracking and common ancestors is highly proficient." : "Asymmetry encountered. Review standard tree-height definitions, complete layout constraints, and descending reverse pathways."}
                    </p>

                    <QuizResultActions onRetry={handleRetry} />
                  </div>

                  {/* Solutions Trace Mapping Stack */}
                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Trace Log Breakdowns</h4>
                    
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
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">State Input:</span>
                              {userAns || "[NULL_POINTER_EXCEPTION]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Expected Evaluator:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Theoretical Logic:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Run-History Logs Table Component */}
            {attempts.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" /> 
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Persistent History Manifest</span>
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
                            Run Sequence #{attempts.length - idx}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {att.completedAt ? new Date(att.completedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : "Historical Record Node"}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-mono font-black text-sm text-blue-600 dark:text-blue-400">
                            {att.score} <span className="text-[10px] text-slate-400 font-sans font-normal">/ {totalCount}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Duration: {formatDuration(att.timeSpent)}
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

export default BinaryTreeQuiz;