import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaClock, 
  FaTree, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChevronRight, 
  FaHistory, 
  FaAward,
  FaRedoAlt
} from "react-icons/fa";

// Existing custom quiz sub-components (assumed available in your project)
import { safeJsonParse } from "../../utils/safeStorage";

interface RBTQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface AttemptRecord {
  score: number;
  timeSpent: number;
  completedAt: string;
}

const QUESTIONS: RBTQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "Which fundamental property characterizes a Red-Black Tree (RBT)?",
    options: [
      "A) A binary search tree where every node is red.",
      "B) A self-balancing binary search tree with an extra bit for node color.",
      "C) A complete binary tree where all levels are filled.",
      "D) A tree where left children are always red and right are black."
    ],
    answer: "B) A self-balancing binary search tree with an extra bit for node color.",
    explanation: "Red-Black trees use a color bit (Red or Black) per node. This metadata, combined with specific rules, ensures the tree remains approximately balanced during mutations."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "In a valid Red-Black Tree configuration, what must be the color of the Root node?",
    options: ["A) Red", "B) Black", "C) Either Red or Black", "D) Transparent"],
    answer: "B) Black",
    explanation: "Property 2 of Red-Black trees strictly states that the root must be Black. This is crucial for maintaining the black-height stability of the tree."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What color are the leaves (NIL/External nodes) in a Red-Black Tree?",
    options: ["A) Red", "B) Black", "C) Grey", "D) Leaves do not have colors"],
    answer: "B) Black",
    explanation: "All leaf nodes (NIL) are considered Black. This allows every path from a node to reach a black 'endpoint'."
  },
  {
    id: 4,
    difficulty: "Medium",
    question: "If a node is Red, what constraint applies to its children?",
    options: [
      "A) Both children must be Red.",
      "B) At least one child must be Black.",
      "C) Both children must be Black.",
      "D) Red nodes cannot have children."
    ],
    answer: "C) Both children must be Black.",
    explanation: "The 'No Two Red Nodes' rule: A Red node cannot have a Red child. This prevents the tree from becoming too skewed or 'heavy' on one side."
  },
  {
    id: 5,
    difficulty: "Medium",
    question: "What is the 'Black-Height' property regarding paths from a node to its leaves?",
    options: [
      "A) Every path must have more red nodes than black nodes.",
      "B) Every path from a node to its descendant leaves must contain the same number of black nodes.",
      "C) The total number of nodes in any path must be even.",
      "D) The root to leaf path must be shorter than log(n)."
    ],
    answer: "B) Every path from a node to its descendant leaves must contain the same number of black nodes.",
    explanation: "This is the most critical property. By ensuring all paths have the same number of black nodes, we guarantee that no path is more than twice as long as any other path."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the maximum theoretical height of a Red-Black tree with 'n' internal nodes?",
    options: ["A) O(n)", "B) O(log n)", "C) Approximately 2 * log(n + 1)", "D) O(sqrt(n))"],
    answer: "C) Approximately 2 * log(n + 1)",
    explanation: "Because of the balance properties, the height of a Red-Black tree is guaranteed to be logarithmic, specifically at most twice the height of a perfectly balanced BST."
  },
  {
    id: 7,
    difficulty: "Hard",
    question: "When inserting a new node into an RBT, what is its initial color before rebalancing begins?",
    options: ["A) Black", "B) Red", "C) Random", "D) Depends on the parent's color"],
    answer: "B) Red",
    explanation: "New nodes are always inserted as Red. This avoids violating the black-height property (Prop 5) immediately, though it may violate the red-child rule (Prop 4), which is then fixed via rotations."
  },
  {
    id: 8,
    difficulty: "Hard",
    question: "Which of the following operations is used during rebalancing if an inserted node's uncle is also Red?",
    options: [
      "A) Only Left Rotation",
      "B) Only Right Rotation",
      "C) Recoloring (flipping colors of parent, uncle, and grandparent)",
      "D) Deleting the node"
    ],
    answer: "C) Recoloring (flipping colors of parent, uncle, and grandparent)",
    explanation: "If the uncle is Red, we can simply flip the colors of the parent, uncle, and grandparent without needing complex rotations. We then move our focus up to the grandparent to ensure no new violations were created."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "What is the primary advantage of a Red-Black Tree over a standard Binary Search Tree?",
    options: [
      "A) It uses less memory than a BST.",
      "B) It guarantees O(log n) performance for search, insert, and delete operations.",
      "C) It is easier to implement code-wise.",
      "D) It keeps nodes sorted in reverse order."
    ],
    answer: "B) It guarantees O(log n) performance for search, insert, and delete operations.",
    explanation: "A standard BST can become a 'linked list' (O(n)) if data is inserted in sorted order. An RBT forces balance, ensuring O(log n) even in the worst-case insertion scenarios."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "Which rotation is required if we have a 'Left-Right' violation (inserted node is right child of a left child)?",
    options: [
      "A) Single Right Rotation",
      "B) Single Left Rotation",
      "C) Left Rotation on child, then Right Rotation on parent",
      "D) No rotation is needed for this case"
    ],
    answer: "C) Left Rotation on child, then Right Rotation on parent",
    explanation: "A double rotation is needed to fix the zig-zag. We first rotate the child to turn the zig-zag into a straight line, then rotate the parent to restore balance."
  }
];

const RedBlackTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [history, setHistory] = useState<AttemptRecord[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem("quiz_username");
    if (savedUser) {
      setUsername(savedUser);
      setHistory(safeJsonParse<AttemptRecord[]>(`quiz_attempts_${savedUser}_red-black-trees`, []));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (showResult || !username) return;
    const timer = setInterval(() => setTimeSpent(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, [showResult, username]);

  const score = useMemo(() => {
    return userAnswers.reduce((acc, ans, idx) => (ans === QUESTIONS[idx]?.answer ? acc + 1 : acc), 0);
  }, [userAnswers]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    const cleanName = usernameInput.trim();
    localStorage.setItem("quiz_username", cleanName);
    setUsername(cleanName);
    setHistory(safeJsonParse<AttemptRecord[]>(`quiz_attempts_${cleanName}_red-black-trees`, []));
  };
  const handleLogout = () => {
    localStorage.removeItem("quiz_username");
    setUsername(null);
    setUsernameInput("");
    setHistory([]);
    handleRetry();
  };

  const handleAnswer = (selected: string) => {
    const updated = [...userAnswers];
    updated[currentQuestion] = selected;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      const newAttempt = { score, timeSpent, completedAt: new Date().toISOString() };
      const updatedHistory = [newAttempt, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("quiz_attempts_" + username?.toLowerCase() + "_red-black-trees", JSON.stringify(updatedHistory));
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setUserAnswers([]);
    setTimeSpent(0);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  if (!isMounted) return null;

  if (!username) {
    return (
      <Layout title="Red-Black Tree Quiz">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-500/10 text-red-800 dark:text-red-400 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
              <FaTree />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">RB-Tree Terminal</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              Analyze balance factors, recoloring cases, and rotation logic. Please initialize your developer alias to begin.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input type="text" placeholder="Alias (e.g. AlgoExpert)" value={usernameInput} onChange={e => setUsernameInput(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 transition-all font-semibold" required />
              <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 border-none cursor-pointer">
                Enter Terminal
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Red-Black Tree Assessment">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Identity & Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-8 shadow-sm">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-red-800 dark:text-red-400" />
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">USER_SESSION: <strong className="text-slate-900 dark:text-white">{username}</strong></span>
            </div>
            <div className="flex items-center gap-4">
               {!showResult && <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-red-800 dark:text-red-400 border border-red-500/20"><FaClock className="inline mr-1"/> {formatTime(timeSpent)}</div>}
               <button onClick={handleLogout} className="text-slate-400 hover:text-red-800 dark:text-red-400 transition-colors border-none bg-transparent cursor-pointer text-xs font-bold"><FaSignOutAlt className="inline mr-1"/> DISCONNECT</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-800 dark:text-red-400 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
                      Module 08: Balanced Trees
                    </span>
                    <span className="text-xs font-mono text-slate-400">Question {currentQuestion + 1} / {QUESTIONS.length}</span>
                  </div>

                  <div className="space-y-8 text-left">
                    <div className="flex items-center gap-3">
                       <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${QUESTIONS[currentQuestion].difficulty === 'Hard' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
                        {QUESTIONS[currentQuestion].difficulty}
                       </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold leading-snug text-slate-900 dark:text-white">
                      {QUESTIONS[currentQuestion].question}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 pt-4">
                      {QUESTIONS[currentQuestion].options.map((opt, i) => (
                        <button key={i} onClick={() => handleAnswer(opt)} role="radio" aria-checked={userAnswers[currentQuestion] === opt}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer ${userAnswers[currentQuestion] === opt ? 'bg-red-600/5 border-red-600 dark:bg-red-600/10' : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-red-600/50'}`}>
                          <span className={`text-sm md:text-base font-semibold ${userAnswers[currentQuestion] === opt ? 'text-red-800 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>{opt}</span>
                          <div className={`w-5 h-5 rounded-full border-2 ${userAnswers[currentQuestion] === opt ? 'border-red-600 bg-red-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-red-600/50'}`}>
                            {userAnswers[currentQuestion] === opt && <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>}
                          </div>
                        </button>
                      ))}
                    </div>

                    <button onClick={handleNext} disabled={!userAnswers[currentQuestion]}
                      className={`w-full py-4 mt-10 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-none ${userAnswers[currentQuestion] ? 'bg-slate-900 dark:bg-red-600 text-white hover:opacity-90 shadow-xl cursor-pointer' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                      {currentQuestion === QUESTIONS.length - 1 ? 'Compile Results' : 'Proceed to Next Node'} <FaChevronRight className="text-[10px]"/>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* RESULTS VIEW */
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                  <div className="bg-red-600/5 dark:bg-red-600/10 border border-red-600/20 rounded-3xl p-10 text-center">
                    <FaAward className="text-5xl text-red-800 dark:text-red-400 mb-4 mx-auto" />
                    <h3 className="text-xl font-black uppercase text-red-800 dark:text-red-400 mb-2 tracking-widest">Diagnostic Report</h3>
                    <div className="inline-flex items-baseline gap-2 text-7xl font-black text-slate-900 dark:text-white font-mono">
                      {score}<span className="text-2xl text-slate-400 font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm font-medium max-w-sm mx-auto">
                      {score === QUESTIONS.length ? 'Perfect balance! Your understanding of RBT invariants is flawlessly optimized.' : 'Calibration required. Trace the red-child and black-height violations below.'}
                    </p>
                    <button onClick={handleRetry} className="mt-8 bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all cursor-pointer border-none shadow-lg"><FaRedoAlt className="inline mr-2"/> RETRY SIMULATION</button>
                  </div>

                  <div className="text-left space-y-10">
                    <h4 className="text-sm font-mono font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
                       <FaTree className="text-red-800 dark:text-red-400"/> Structural Logic Tracing
                    </h4>
                    {QUESTIONS.map((q, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-start justify-between gap-4">
                          <h5 className="text-sm md:text-base font-bold leading-relaxed">{idx + 1}. {q.question}</h5>
                          {userAnswers[idx] === q.answer ? <FaCheckCircle className="text-emerald-500 shrink-0 text-xl"/> : <FaTimesCircle className="text-red-800 dark:text-red-400 shrink-0 text-xl"/>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono uppercase tracking-tighter">
                          <div className={`p-4 rounded-xl border ${userAnswers[idx] === q.answer ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600' : 'bg-red-500/5 border-red-500/20 text-red-800 dark:text-red-400'}`}>
                            <span className="block text-[8px] font-black opacity-60 mb-2">User Registry</span> {userAnswers[idx] || '[NULL_ENTRY]'}
                          </div>
                          {userAnswers[idx] !== q.answer && <div className="p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/20 text-emerald-600">
                             <span className="block text-[8px] font-black opacity-60 mb-2">Expected Invariant</span> {q.answer}
                          </div>}
                        </div>
                        <p className="text-[11px] md:text-xs leading-relaxed text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                          <strong className="text-red-800 dark:text-red-400 not-italic block mb-2 uppercase font-black tracking-widest text-[9px]">Compiler Insight:</strong> {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ATTEMPT HISTORY (LOCAL STORAGE) */}
            {history.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 text-left">
                <div className="flex items-center gap-2 mb-8">
                  <FaHistory className="text-red-800 dark:text-red-400 text-xs" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terminal History (Last 5 Runs)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {history.map((h, i) => (
                    <div key={i} className="bg-slate-100/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex justify-between items-center group hover:border-red-600/30 transition-all">
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{new Date(h.timestamp).toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'short'})}</div>
                        <div className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase">RUN_#{history.length - i}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-red-800 dark:text-red-400 font-mono">{h.score}/{QUESTIONS.length}</div>
                        <div className="text-[9px] text-slate-400 uppercase font-bold">{formatTime(h.timeSpent)}</div>
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

export default RedBlackTreeQuiz;