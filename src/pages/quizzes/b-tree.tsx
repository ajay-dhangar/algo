import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaClock, 
  FaDatabase, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChevronRight, 
  FaHistory, 
  FaAward 
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface BTreeQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface DBAttempt {
  id?: string;
  score: number;
  totalQuestions?: number;
  timeSpent: number;
  completedAt: string;
}

const QUESTIONS: BTreeQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is the core defining structural property of a B-Tree?",
    options: [
      "A) A binary search tree that is strictly balanced height-wise.",
      "B) A self-balancing search tree layout that keeps keys sorted and allows logarithmic lookups, inserts, and structural deletes.",
      "C) A narrow tree structure restricted exactly to three node pathways.",
      "D) A specialized radix tree structure built exclusively to store string sets."
    ],
    answer: "B) A self-balancing search tree layout that keeps keys sorted and allows logarithmic lookups, inserts, and structural deletes.",
    explanation: "A B-Tree is a self-balancing search tree engineered optimized for files and high-density database storage layers. By allowing nodes to house more than two branch links, it drops traversal depths while ensuring stable O(log n) performance lines."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "How does the minimum degree 't' dictate the bounds of non-root nodes in a B-Tree?",
    options: [
      "A) It dictates the absolute minimum number of keys a non-root node can contain.",
      "B) It sets the absolute upper threshold of children branches allowed.",
      "C) It represents the maximum key capacity of a leaf cluster.",
      "D) It specifies the exact count of depth levels allowed inside the workspace."
    ],
    answer: "A) It dictates the absolute minimum number of keys a non-root node can contain.",
    explanation: "The factor 't' sets lower structural floor allocations. Non-root nodes must retain at minimum t - 1 keys. Consequently, they hold a minimum of 't' branching child references."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "In a B-Tree configuration with minimum degree 't', what is the maximum number of children any node can maintain?",
    options: ["A) 2", "B) 3", "C) 2t", "D) t"],
    answer: "C) 2t",
    explanation: "A node can accept up to 2t - 1 keys maximum. Exceeding this boundary requires a split, meaning the upper threshold limit for children paths caps out cleanly at exactly 2t."
  },
  {
    id: 4,
    difficulty: "Medium",
    question: "What architectural advantage makes B-Trees preferred over classic self-balancing BSTs for external disk memory structures?",
    options: [
      "A) Faster processing cycles across local CPU registries.",
      "B) Minimal footprint allocations inside active virtual memory maps.",
      "C) Extreme horizontal node fan-out which ensures low height paths to minimize costly storage read operations.",
      "D) Streamlined implementation simplicity during multi-threaded executions."
    ],
    answer: "C) Extreme horizontal node fan-out which ensures low height paths to minimize costly storage read operations.",
    explanation: "B-Trees maximize horizontal data density per block. Storing multiple keys together ensures high fan-out, reducing tree height. This directly minimizes expensive disk or system I/O cycles."
  },
  {
    id: 5,
    difficulty: "Medium",
    question: "What workflow is executed when an insertion step causes a target node to surpass its maximum permitted key allowance?",
    options: [
      "A) The node undergoes deletion and the storage block gets scrubbed.",
      "B) The complete tree path gets purged and rebuilt from scratch.",
      "C) The target node splits into two parts, and its median key is pushed up to its parent.",
      "D) Overflows are cached loosely in memory without mutating the tree structures."
    ],
    answer: "C) The target node splits into two parts, and its median key is pushed up to its parent.",
    explanation: "When a node exceeds 2t - 1 keys, it splits. The middle key moves into the parent node, and the remaining keys form two balanced sibling nodes of size t - 1."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What exact height invariant must be continually maintained for a B-Tree to be classified as fully balanced?",
    options: [
      "A) Every leaf node must reside at the exact same depth level.",
      "B) The key distributions across all nodes must match perfectly.",
      "C) Every active internal node must hold a uniform count of branches.",
      "D) The structural outline must simulate a dense complete binary profile."
    ],
    answer: "A) Every leaf node must reside at the exact same depth level.",
    explanation: "Unlike AVL trees where leaf heights vary slightly, B-Trees are perfectly balanced from the bottom up—meaning every single leaf node sits at the exact same depth level."
  },
  {
    id: 7,
    difficulty: "Hard",
    question: "How does a B-Tree process a key deletion when the target node drops below its minimum key threshold?",
    options: [
      "A) The key is cleared out immediately, ignoring underflow bounds.",
      "B) Keys are shifted around locally within that single isolated node block.",
      "C) The node borrows a key from a valid adjacent sibling or merges with it, pulling a key from its parent node.",
      "D) Deletions are forbidden to protect the integrity of historical node configurations."
    ],
    answer: "C) The node borrows a key from a valid adjacent sibling or merges with it, pulling a key from its parent node.",
    explanation: "If a node underflows (falling below t - 1 keys), it must rebalance. It borrows a key from an immediate sibling via a rotation step or merges with a sibling by bringing down a parent key."
  },
  {
    id: 8,
    difficulty: "Hard",
    question: "Which of the following structural assertions is FALSE regarding standard B-Tree constraints?",
    options: [
      "A) Every leaf node is located at the identical level boundary.",
      "B) Internal nodes are guaranteed to house at least t - 1 keys.",
      "C) The root node is required to contain at minimum 't' keys at all times.",
      "D) Nodes cannot support an un-bounded or arbitrary count of children slots."
    ],
    answer: "C) The root node is required to contain at minimum 't' keys at all times.",
    explanation: "The root node is exempt from the typical lower bound constraint. It can operate legally with as little as one single key and two children, even if the tree's overall degree 't' is much higher."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "In which software engineering domains do B-Trees and their variations find their most widespread application?",
    options: [
      "A) Volatile low-latency register stores.",
      "B) Solid-state file system layers and relational database index systems.",
      "C) Standard in-memory stack configurations.",
      "D) Ephemeral string pattern matching maps."
    ],
    answer: "B) Solid-state file system layers and relational database index systems.",
    explanation: "B-Trees form the baseline architecture for major disk indexing components—including database configurations like InnoDB, PostgreSQL, and robust file system architectures like NTFS and ext4."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "How do adjustments to the overall tree order or degree ('t') directly affect the net height metrics of a B-Tree?",
    options: [
      "A) Height parameters scale upward in direct proportion to order expansions.",
      "B) Height metrics decrease because a higher order increases node capacity and fan-out.",
      "C) Height variables remain decoupled from node capacity limits.",
      "D) Order values and overall height indices are locked to equivalent figures."
    ],
    answer: "B) Height metrics decrease because a higher order increases node capacity and fan-out.",
    explanation: "The formal height ceiling of a B-Tree scales as O(log_t n). Increasing the minimum degree 't' allows each node to store more keys, creating a wider tree that requires fewer levels to house the dataset."
  }
];

const BTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Analytics, Session, and Timer Core States
  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "b-tree" });
  const [isMounted, setIsMounted] = useState(false);
  
  // Fallback anchor configuration for context boundaries
   

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
      const copy = [...prev];
      copy[currentQuestion] = selected;
      return copy;
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
      <Layout title="B-Tree Performance Evaluation" description="Verify operational index trees, fan-out parameters, and block layout tracking schemas.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 shadow-md rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-blue-500/20">
              <FaDatabase />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">B-Tree Matrix Core</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Verify your key calculations, horizontal node balance capabilities, and tree structure assertions. Enter your platform handle identifier below.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter handle workspace ID (e.g. NodeSplitter)"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-sm"
              >
                Access Evaluation Stack
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="B-Tree Node Evaluation Interface">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Identity Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                CONNECTED SYSTEM IDENTITY: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-800 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Disconnect Terminal
            </button>
          </div>

          {/* Interactive Workspace Board */}
          <div className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
            
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="active-quiz-frame"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Performance metrics banner */}
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Question Stack Node</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Engine Runtime
                      </span>
                      <div className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">
                        {formatDuration(timeSpent)}
                      </div>
                    </div>
                  </div>

                  {/* Shared Navigation Elements */}
                  <div className="space-y-3">
                    <QuestionProgress currentQuestion={currentQuestion} totalQuestions={QUESTIONS.length} />
                    <QuestionNavigator
                      questions={QUESTIONS}
                      currentQuestion={currentQuestion}
                      userAnswers={userAnswers}
                      setCurrentQuestionIndex={setCurrentQuestion}
                    />
                  </div>

                  {/* Problem Statement Card Area */}
                  <div className="space-y-3 text-left pt-2">
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-solid ${
                        QUESTIONS[currentQuestion].difficulty === "Easy" 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : QUESTIONS[currentQuestion].difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20"
                      }`}>
                        {QUESTIONS[currentQuestion].difficulty} Tier
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
                      {QUESTIONS[currentQuestion].question}
                    </h3>
                  </div>

                  {/* Option Choice Grid Stack */}
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-sm"
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

                  {/* Forward Interaction Button */}
                  <button
                    onClick={nextQuestion}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Compile & Submit Parameters" : "Advance to next node"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                /* Diagnostic Report Stream Panel */
                <motion.div
                  key="quiz-diagnostic-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.04),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Tree Balancing Audit</h3>
                    
                    <div className="inline-flex items-baseline gap-1 text-5xl font-black text-blue-600 dark:text-blue-500 font-mono">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-sm mx-auto leading-relaxed">
                      {score === QUESTIONS.length ? "Invariants fully satisfied! All node capacity guidelines and structural divisions executed perfectly." : score >= 6 ? "Good evaluation trace! You have a solid grasp on disk-optimized tree metrics." : "Imbalance detected. Review minimum structural constraints, boundary degree calculations, and parent-promotion operations."}
                    </p>

                    <QuizResultActions onRetry={handleRetry} />
                  </div>

                  {/* Solutions list */}
                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Operational Debug Trace</h4>
                    
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
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Your Registry Entry:</span>
                              {userAns || "[EMPTY_STACK_ERROR]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Baseline Standard:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Architectural Verification Notes:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            

            {/* Historical Verification Track Log */}
            {attempts.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" /> 
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Historic Processing Sequences</span>
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
                            {att.completedAt ? new Date(att.completedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : "Stored Profile Record"}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-mono font-black text-sm text-blue-600 dark:text-blue-400">
                            {att.score} <span className="text-[10px] text-slate-400 font-sans font-normal">/ {totalCount}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Runtime: {formatDuration(att.timeSpent)}
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

export default BTreeQuiz;