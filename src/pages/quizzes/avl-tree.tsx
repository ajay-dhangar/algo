import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaClock, 
  FaAward, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRedoAlt, 
  FaChevronRight, 
  FaHistory, 
  FaProjectDiagram 
} from "react-icons/fa";
import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface AVLQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface LocalQuizAttempt {
  timestamp: number;
  answers: string[];
  score: number;
  timeSpent: number;
}

const QUESTIONS: AVLQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    questionText: "What is the primary balance property that defines an AVL tree?",
    options: [
      "A) All nodes have at most 2 children",
      "B) The height difference between left and right subtrees is at most 1",
      "C) All leaf nodes are at the same level",
      "D) The tree is a complete binary tree"
    ],
    answer: "B) The height difference between left and right subtrees is at most 1",
    explanation: "An AVL tree is a self-balancing binary search tree where the balance factor (the height difference between left and right subtrees) of any node is strictly restricted to -1, 0, or 1."
  },
  {
    id: 2,
    difficulty: "Easy",
    questionText: "How is the balance factor of a node formally calculated in an AVL tree layout?",
    options: [
      "A) Height of left subtree - Height of right subtree",
      "B) Height of right subtree - Height of left subtree",
      "C) Height of left subtree + Height of right subtree",
      "D) Number of left children - Number of right children"
    ],
    answer: "A) Height of left subtree - Height of right subtree",
    explanation: "The standard balance factor formula is: Balance Factor = height(left_subtree) - height(right_subtree). Note that some textbooks use right minus left; however, it must always remain within {-1, 0, 1}."
  },
  {
    id: 3,
    difficulty: "Easy",
    questionText: "Which fundamental balance rotation is executed when a node's left child's left subtree causes a balance violation?",
    options: ["A) Left rotation", "B) Right rotation", "C) Left-Right rotation", "D) Right-Left rotation"],
    answer: "B) Right rotation",
    explanation: "A Left-Left (LL) imbalance case means the left-heavy side has become too deep. Applying a single right rotation fixes this imbalance immediately."
  },
  {
    id: 4,
    difficulty: "Medium",
    questionText: "What is the asymptotic time complexity for performing search operations in an AVL tree containing n nodes?",
    options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
    answer: "B) O(log n)",
    explanation: "Because an AVL tree strictly limits structural skewing, its maximum height is strictly logarithmic relative to node count, ensuring an upper-bound execution track of O(log n) for lookups."
  },
  {
    id: 5,
    difficulty: "Medium",
    questionText: "What is the theoretical maximum height of an AVL tree configured with exactly 7 nodes?",
    options: ["A) 2", "B) 3", "C) 4", "D) 5"],
    answer: "B) 3",
    explanation: "With 7 nodes, a perfectly balanced full binary tree has a height of 2. The most unbalanced, minimal-node setup for height 3 (a Fibonacci-like AVL layout) requires a minimum of 7 nodes, making 3 the maximum achievable height."
  },
  {
    id: 6,
    difficulty: "Medium",
    questionText: "Which of the following numerical outcomes is NOT a valid balance factor for a stable AVL tree node?",
    options: ["A) 0", "B) 1", "C) -1", "D) 2"],
    answer: "D) 2",
    explanation: "Any balance factor absolute value greater than 1 (such as -2 or 2) represents an unstable layout state that triggers immediate rotation operations."
  },
  {
    id: 7,
    difficulty: "Hard",
    questionText: "During an insertion phase, under what precise layout structural conditions is a double Left-Right rotation required?",
    options: [
      "A) When the left child has a right-heavy subtree",
      "B) When the right child has a left-heavy subtree",
      "C) When the left child has a left-heavy subtree",
      "D) When the root node becomes unbalanced"
    ],
    answer: "A) When the left child has a right-heavy subtree",
    explanation: "A Left-Right (LR) scenario occurs when a parent node is left-heavy, but its left child is right-heavy. An initial left rotation converts it into an LL case, followed by a right rotation to rebalance the tree."
  },
  {
    id: 8,
    difficulty: "Hard",
    questionText: "What is the worst-case time complexity for inserting a new data entry into an AVL tree with n nodes?",
    options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"],
    answer: "B) O(log n)",
    explanation: "Locating the insertion point takes O(log n) steps. While walking back up the path to recompute balance variables and applying rotations takes constant structural times, the worst-case ceiling remains O(log n)."
  },
  {
    id: 9,
    difficulty: "Hard",
    questionText: "At most, how many individual structural pointer rotations are needed to restore balance after a single insertion into an AVL tree?",
    options: ["A) 1", "B) 2", "C) O(log n)", "D) O(n)"],
    answer: "B) 2",
    explanation: "A single insertion can only trigger either a single rotation (1) or a double rotation (2) at the first unbalanced ancestor node. Once fixed, the balance of the entire path is restored."
  },
  {
    id: 10,
    difficulty: "Medium",
    questionText: "Which statement accurately captures the architectural relationship between AVL trees and Red-Black trees?",
    options: [
      "A) They are the same structure",
      "B) Both are self-balancing BSTs",
      "C) AVL trees are always faster",
      "D) Red-Black trees require more rotations"
    ],
    answer: "B) Both are self-balancing BSTs",
    explanation: "Both are self-balancing binary search trees. AVL trees are more strictly balanced (requiring faster lookups but potentially more rebalancing rotations), whereas Red-Black trees tolerate a bit more skew to speed up structural edits."
  }
];

const AVLTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [localHistory, setLocalHistory] = useState<LocalQuizAttempt[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("algo_quiz_username");
    if (storedUser) {
      setUsername(storedUser);
      const historyKey = `algo_avl_history_${storedUser.toLowerCase()}`;
      const savedHistory = localStorage.getItem(historyKey);
      if (savedHistory) setLocalHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (showResult || !username) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showResult, username]);

  const score = useMemo(() => {
    return userAnswers.reduce((acc, ans, idx) => {
      return ans === QUESTIONS[idx]?.answer ? acc + 1 : acc;
    }, 0);
  }, [userAnswers]);

  const selectedOption = userAnswers[currentQuestion] || null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    const cleanName = usernameInput.trim();
    localStorage.setItem("algo_quiz_username", cleanName);
    setUsername(cleanName);

    const historyKey = `algo_avl_history_${cleanName.toLowerCase()}`;
    const savedHistory = localStorage.getItem(historyKey);
    setLocalHistory(savedHistory ? JSON.parse(savedHistory) : []);
  };

  const handleLogout = () => {
    localStorage.removeItem("algo_quiz_username");
    setUsername(null);
    setUsernameInput("");
    setLocalHistory([]);
    handleRetry();
  };

  const handleSelectAnswer = (option: string) => {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestion] = option;
      return copy;
    });
  };

  const handleNext = () => {
    if (!selectedOption) return;
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      if (username) {
        const newAttempt: LocalQuizAttempt = {
          timestamp: Date.now(),
          answers: userAnswers,
          score: score,
          timeSpent: timeSpent
        };
        const updatedHistory = [newAttempt, ...localHistory].slice(0, 5);
        setLocalHistory(updatedHistory);
        localStorage.setItem(
          "algo_avl_history_" + username.toLowerCase(),
          JSON.stringify(updatedHistory)
        );
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setUserAnswers([]);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  if (!isMounted) return null;

  if (!username) {
    return (
      <Layout title="AVL Balancing Engine Arena" description="Evaluate self-balancing binary search operations, height metrics, and rotation tracking workflows.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 shadow-md rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-purple-500/20">
              <FaProjectDiagram />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">AVL Balancing Arena</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Verify your tree height calculations, factor offsets, and complex double rotation steps. Enter your handle name to open the terminal.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter handle identity (e.g. TreeWalker)"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[var(--ifm-color-primary)] text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-[var(--ifm-color-primary)] hover:opacity-90 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-sm"
              >
                Access Evaluation Core
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="AVL Tree Quiz Evaluation">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Top Control Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                ACTIVE TERMINAL: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Change Identity
            </button>
          </div>

          {/* Interactive Card Board Box */}
          <div className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
            
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="active-quiz-flow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Performance metrics tracker banner */}
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Matrix Index</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Runtime Elapse
                      </span>
                      <div className="text-base font-mono font-bold text-purple-600 dark:text-purple-400">
                        {formatTime(timeSpent)}
                      </div>
                    </div>
                  </div>

                  {/* Synchronized Componentized Bars */}
                  <div className="space-y-3">
                    <QuestionProgress currentQuestion={currentQuestion} totalQuestions={QUESTIONS.length} />
                    <QuestionNavigator
                      questions={QUESTIONS}
                      currentQuestion={currentQuestion}
                      userAnswers={userAnswers}
                      setCurrentQuestionIndex={setCurrentQuestion}
                    />
                  </div>

                  {/* Node Problem Card Area */}
                  <div className="space-y-3 text-left pt-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-solid ${
                        QUESTIONS[currentQuestion].difficulty === "Easy" 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : QUESTIONS[currentQuestion].difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                      }`}>
                        {QUESTIONS[currentQuestion].difficulty}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
                      {QUESTIONS[currentQuestion].questionText}
                    </h3>
                  </div>

                  {/* Options Selection Stack */}
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSelectAnswer(option)}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)] text-white shadow-sm"
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

                  {/* Flow Trigger Button */}
                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Compile Answers & Results" : "Next Balanced Node"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                /* --- DIAGNOSTIC COMPILATION REPORT PANEL --- */
                <motion.div
                  key="quiz-diagnostic-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.04),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Tree Structure Verification</h3>
                    
                    <div className="inline-flex items-baseline gap-1 text-5xl font-black text-[var(--ifm-color-primary)] font-mono">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-sm mx-auto leading-relaxed">
                      {score === QUESTIONS.length ? "Perfect balance metrics verified! Rotations perfectly managed across every case configuration." : score >= 6 ? "Solid conceptual comprehension of AVL conditions. Your height bounds look secure." : "Imbalance detected in sub-nodes. Trace rotation strategies and re-verify calculation parameters."}
                    </p>

                    <QuizResultActions onRetry={handleRetry} />
                  </div>

                  {/* Static Explanatory Logs */}
                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Trace Debugger Stream</h4>
                    
                    {QUESTIONS.map((q, index) => {
                      const userAns = userAnswers[index];
                      const isCorrect = userAns === q.answer;

                      return (
                        <div key={q.id} className="bg-slate-50/50 dark:bg-slate-950/30 border border-solid border-slate-200/80 dark:border-slate-800/60 rounded-xl p-5 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white m-0 leading-relaxed max-w-2xl">
                              {index + 1}. {q.questionText}
                            </h5>
                            <span className={`text-base shrink-0 ${isCorrect ? "text-emerald-500" : "text-rose-500"}`}>
                              {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                            <div className={`p-2.5 rounded-lg border border-solid ${isCorrect ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-rose-500/5 border-rose-500/10 text-rose-700 dark:text-rose-400"}`}>
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Your Evaluation:</span>
                              {userAns || "[EMPTY_REGISTER_STACK]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Correct Baseline:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Structural Node Logs:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Persistent Run Execution Logs History */}
            {localHistory.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" /> 
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Terminal Balance History Metrics</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {localHistory.map((att, idx) => (
                    <div 
                      key={att.timestamp || idx} 
                      className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/60 rounded-xl p-4 flex justify-between items-center text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                          Compilation Cycle #{localHistory.length - idx}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(att.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-mono font-black text-sm text-[var(--ifm-color-primary)]">
                          {att.score} <span className="text-[10px] text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Duration: {formatTime(att.timeSpent)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AVLTreeQuiz;