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
  FaCode, 
  FaChevronRight, 
  FaHistory,
  FaLayerGroup
} from "react-icons/fa";
import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface QueueQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  codeSnippet?: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface AttemptHistory {
  timestamp: number;
  score: number;
  timeSpent: number;
}

const QUESTIONS: QueueQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    questionText: "What will happen if you attempt to dequeue an item from a queue that is currently empty?",
    options: [
      "A) The operation returns null and continues",
      "B) It typically triggers a Queue Underflow error/exception",
      "C) The operation returns undefined",
      "D) No operation is performed and state remains same"
    ],
    answer: "B) It typically triggers a Queue Underflow error/exception",
    explanation: "Attempting to remove an element from an empty data structure is a boundary case known as underflow. In most robust implementations, this throws an exception to prevent logic errors."
  },
  {
    id: 2,
    difficulty: "Easy",
    questionText: "In a circular queue implementation, what is the primary structural benefit compared to a standard linear array queue?",
    options: [
      "A) It consumes more memory for faster buffering",
      "B) It provides faster O(log n) access time",
      "C) It allows for efficient reuse of empty spaces (space efficiency)",
      "D) It is significantly simpler to implement with pointers"
    ],
    answer: "C) It allows for efficient reuse of empty spaces (space efficiency)",
    explanation: "Linear queues can suffer from 'false overflow' where space at the front is wasted after dequeues. Circular queues wrap the rear pointer back to the start, utilizing every available slot."
  },
  {
    id: 3,
    difficulty: "Medium",
    questionText: "Consider the following sequence of operations. What values will be returned by the two dequeue() calls respectively?",
    codeSnippet: `enqueue(1);\nenqueue(2);\nenqueue(3);\ndequeue();\nenqueue(4);\ndequeue();`,
    options: ["A) 1, 2", "B) 1, 3", "C) 2, 4", "D) 3, 4"],
    answer: "A) 1, 2",
    explanation: "Queues follow First-In-First-Out (FIFO). The first dequeue removes the first item added (1). The second dequeue removes the next item that was in line (2), regardless of the fact that 4 was added later."
  },
  {
    id: 4,
    difficulty: "Easy",
    questionText: "Which of the following data structures can be used as the underlying foundation to implement a Queue?",
    options: ["A) Static Arrays", "B) Singly or Doubly Linked Lists", "C) Stacks (using two of them)", "D) All of the above"],
    answer: "D) All of the above",
    explanation: "Queues are abstract data types. While Arrays and Linked Lists are common, you can even simulate FIFO behavior using two LIFO Stacks."
  },
  {
    id: 5,
    difficulty: "Medium",
    questionText: "What is the time complexity of the enqueue and dequeue operations in an optimized Linked List-based queue?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n^2)"],
    answer: "A) O(1)",
    explanation: "By maintaining both a 'Head' and a 'Tail' pointer, we can add to the back and remove from the front in constant time without traversing the list."
  },
  {
    id: 6,
    difficulty: "Hard",
    questionText: "Examine this pseudocode snippet. Which operation does it accurately represent in a typical array-based implementation?",
    codeSnippet: `if (front == -1) {\n    front = 0;\n}\nrear++;\nqueue[rear] = value;`,
    options: [
      "A) Dequeue Operation",
      "B) Peek Operation",
      "C) Enqueue Operation",
      "D) IsEmpty Check"
    ],
    answer: "C) Enqueue Operation",
    explanation: "This code handles the insertion logic: initializing the front pointer if the queue was empty, incrementing the rear index, and placing the new value at that position."
  },
  {
    id: 7,
    difficulty: "Medium",
    questionText: "In a Priority Queue, how is the order of element removal (dequeue) determined?",
    options: [
      "A) Strictly by the order of arrival (FIFO)",
      "B) Based on the priority level associated with each element",
      "C) Based on the alphabetical order of the data",
      "D) By the physical memory address of the node"
    ],
    answer: "B) Based on the priority level associated with each element",
    explanation: "A Priority Queue breaks the standard FIFO rule. Elements with higher priority are dequeued before elements with lower priority, regardless of when they entered the queue."
  },
  {
    id: 8,
    difficulty: "Hard",
    questionText: "If a queue is initially empty, what is the current 'Front' element after this specific sequence?",
    codeSnippet: `enqueue(10);\nenqueue(20);\ndequeue();\nenqueue(30);`,
    options: ["A) 10", "B) 20", "C) 30", "D) The queue is empty"],
    answer: "B) 20",
    explanation: "1. Enqueue 10 (Front: 10). 2. Enqueue 20 (Front: 10, Rear: 20). 3. Dequeue removes 10. 4. Front moves to 20. 5. Enqueue 30 (Front remains 20, Rear becomes 30)."
  }
];

const QueueQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [history, setHistory] = useState<AttemptHistory[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem("quiz_user_queue_alt");
    if (savedUser) {
      setUsername(savedUser);
      const savedHistory = localStorage.getItem(`quiz_history_${savedUser}_queue_alt`);
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    }
  }, []);

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
    localStorage.setItem("quiz_user_queue_alt", usernameInput.trim());
    setUsername(usernameInput.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("quiz_user_queue_alt");
    setUsername(null);
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
      const newAttempt = { timestamp: Date.now(), score, timeSpent };
      const updatedHistory = [newAttempt, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem(`quiz_history_${username}_queue_alt`, JSON.stringify(updatedHistory));
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
      <Layout title="Queue Assessment">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <FaLayerGroup />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Initialize Session</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              Verify your knowledge of FIFO architectures, circular buffering, and priority logic. Enter a username to begin.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input type="text" placeholder="Developer Alias" value={usernameInput} onChange={e => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" required />
              <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 border-none cursor-pointer">
                Launch Workspace
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Queue Assessment Engine">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Top Identity Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-8 shadow-sm">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-indigo-500" />
              <span className="text-xs font-mono font-bold text-slate-500">TERMINAL_USER: <strong className="text-slate-900 dark:text-white uppercase">{username}</strong></span>
            </div>
            <div className="flex items-center gap-4">
               {!showResult && <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-indigo-600"><FaClock className="inline mr-1"/> {formatTime(timeSpent)}</div>}
               <button onClick={handleLogout} className="text-rose-500 hover:bg-rose-500/10 px-3 py-1 rounded-lg text-xs font-bold transition-all border-none bg-transparent cursor-pointer"><FaSignOutAlt className="inline mr-1"/> EXIT</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 shadow-sm">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      Module: Linear Collections
                    </span>
                    <span className="text-xs font-mono text-slate-400">Step {currentQuestion + 1} of {QUESTIONS.length}</span>
                  </div>

                  <div className="space-y-6 text-left">
                    <div className="flex items-center gap-2">
                       <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${QUESTIONS[currentQuestion].difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {QUESTIONS[currentQuestion].difficulty} Tier
                       </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold leading-relaxed">{QUESTIONS[currentQuestion].questionText}</h3>

                    {QUESTIONS[currentQuestion].codeSnippet && (
                      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-[#0d1117] text-sm">
                        <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400"><FaCode className="inline mr-2"/> queue_ops.cpp</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-slate-300 font-mono leading-relaxed"><code>{QUESTIONS[currentQuestion].codeSnippet}</code></pre>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 pt-4">
                      {QUESTIONS[currentQuestion].options.map((opt, i) => (
                        <button key={i} onClick={() => handleAnswer(opt)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${userAnswers[currentQuestion] === opt ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-indigo-400'}`}>
                          <span className="text-sm font-semibold">{opt}</span>
                          <div className={`w-4 h-4 rounded-full border ${userAnswers[currentQuestion] === opt ? 'bg-white border-white' : 'border-slate-300 dark:border-slate-700'}`}></div>
                        </button>
                      ))}
                    </div>

                    <button onClick={handleNext} disabled={!userAnswers[currentQuestion]}
                      className={`w-full py-4 mt-8 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-none ${userAnswers[currentQuestion] ? 'bg-slate-900 text-white dark:bg-indigo-600 hover:opacity-90 shadow-lg cursor-pointer' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                      {currentQuestion === QUESTIONS.length - 1 ? 'Evaluate System' : 'Next Node'} <FaChevronRight className="text-[10px]"/>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                  <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8 text-center">
                    <h3 className="text-xl font-black uppercase text-indigo-500 mb-6">Diagnostic Results</h3>
                    <div className="inline-flex items-baseline gap-2 text-6xl font-black text-slate-900 dark:text-white font-mono">
                      {score}<span className="text-2xl text-slate-400 font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {score === QUESTIONS.length ? 'Perfect Score! FIFO logic mastery verified.' : 'Execution complete. Review node trace logs below.'}
                    </p>
                    <div className="flex gap-3 justify-center mt-8">
                       <button onClick={handleRetry} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-xs hover:opacity-90 transition-all border-none cursor-pointer shadow-md"><FaRedoAlt className="inline mr-2"/> RETRY</button>
                    </div>
                  </div>

                  <div className="text-left space-y-8">
                    <h4 className="text-sm font-mono font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">Trace Logic Log</h4>
                    {QUESTIONS.map((q, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h5 className="text-sm font-bold leading-relaxed">{idx + 1}. {q.questionText}</h5>
                          {userAnswers[idx] === q.answer ? <FaCheckCircle className="text-emerald-500 shrink-0"/> : <FaTimesCircle className="text-rose-500 shrink-0"/>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div className={`p-3 rounded-lg border ${userAnswers[idx] === q.answer ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600' : 'bg-rose-500/5 border-rose-500/10 text-rose-500'}`}>
                            <span className="block text-[8px] font-black uppercase mb-1 opacity-60">Input</span> {userAnswers[idx] || '[NO_INPUT]'}
                          </div>
                          {userAnswers[idx] !== q.answer && <div className="p-3 rounded-lg border bg-emerald-500/5 border-emerald-500/10 text-emerald-600">
                             <span className="block text-[8px] font-black uppercase mb-1 opacity-60">Baseline</span> {q.answer}
                          </div>}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/50 p-4 rounded-xl italic border border-dashed border-slate-200 dark:border-slate-800">
                          <strong className="text-indigo-500 not-italic block mb-1">Compiler Insight:</strong> {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {history.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-left">
                <div className="flex items-center gap-2 mb-6">
                  <FaHistory className="text-slate-400 text-xs" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Execution History</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {history.map((h, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center transition-all hover:border-indigo-500/30">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">{new Date(h.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-200">Attempt #{history.length - i}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-indigo-500 font-mono">{h.score}/{QUESTIONS.length}</div>
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

export default QueueQuiz;