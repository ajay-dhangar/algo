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
  FaHistory 
} from "react-icons/fa";

interface Question {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  codeSnippet?: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface LocalAttempt {
  timestamp: number;
  answers: string[];
  score: number;
  timeSpent: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "Following is a C-like pseudo code of a function that takes an integer argument and utilizes an empty Stack S for data processing. What does this function compute or print in general?",
    codeSnippet: `void fun(int n) {\n    Stack S;  // Creates an empty stack S\n    while (n > 0) {\n        push(&S, n % 2);\n        n = n / 2;\n    }\n    while (!isEmpty(&S)) {\n        printf("%d ", pop(&S));\n    }\n}`,
    options: [
      "A) Prints binary representation of n in reverse order",
      "B) Prints binary representation of n",
      "C) Prints the mathematical value of Log n",
      "D) Prints the mathematical value of Log n in reverse order"
    ],
    answer: "B) Prints binary representation of n",
    explanation: "The while loop systematically extracts binary remainders using n % 2 and pushes them onto the Stack. Because a Stack operates on a Last-In, First-Out (LIFO) framework, popping elements reverses the order of extraction, printing the standard binary representation from most significant bit to least significant bit."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "Consider the processing sequence inside the following character stack pseudocode. What is the explicit screen output generated if the structural input read is 'geeksquiz'?",
    codeSnippet: `declare a stack of characters\nwhile (there are more characters in the word to read) {\n    read a character\n    push the character on the stack\n}\nwhile (the stack is not empty) {\n    pop a character off the stack\n    write the character to the screen\n}`,
    options: [
      "A) geeksquizgeeksquiz",
      "B) ziuqskeeg",
      "C) geeksquiz",
      "D) ziuqskeegziuqskeeg"
    ],
    answer: "B) ziuqskeeg",
    explanation: "Characters are pushed sequentially from left to right ('g', 'e', 'e' ... 'z'). The final character 'z' resides at the top of the Stack. Popping entirely until empty outputs elements in full reverse chronological order, creating the reversed text string."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "The following loop attempts to validate balanced sequence variations of brackets, but contains an logical error. Identify which unbalanced structural variation below is incorrectly validated as 'balanced' by this pseudocode:",
    codeSnippet: `declare a character stack \nwhile (more input is available) {\n    read a character\n    if (the character is a '(' )\n        push it on the stack\n    else if (the character is a ')' and the stack is not empty)\n        pop a character off the stack\n    else\n        print "unbalanced" and exit\n}\nprint "balanced"`,
    options: [
      "A) ((())",
      "B) ())(()",
      "C) (()())",
      "D) (()))()"
    ],
    answer: "D) (()))()",
    explanation: "The algorithm checks if the stack is empty when encountering a closing parenthesis, but completely omits a final evaluation checking if the stack is fully cleared after finishing input stream ingestion. For '( ( ) ) ( )', an unpopped open bracket remaining in memory is undetected, incorrectly reporting it as balanced."
  },
  {
    id: 4,
    difficulty: "Medium",
    question: "A single-digit numerical postfix operation expression '8 2 3 ^ / 2 3 * + 5 1 * -' is being evaluated using an isolated computer science stack framework. What are the top two elements residing inside the stack instantly after the first multiplication operator (*) evaluates?",
    options: [
      "A) 6, 1",
      "B) 5, 7",
      "C) 3, 2",
      "D) 1, 5"
    ],
    answer: "A) 6, 1",
    explanation: "Step-by-step evaluation sequence: Pushing [8, 2, 3]. Processing exponent (2^3=8) simplifies stack to [8, 8]. Division operator (8/8) processes to yield [1]. Then [2, 3] are pushed, leading to state [1, 2, 3]. Evaluating the multiplication operator (*) targets the top two elements (2 * 3 = 6), and pushes it back, making the top stack layers look like [1, 6], where 6 sits natively above 1."
  },
  {
    id: 5,
    difficulty: "Medium",
    question: "An isolated vector block array A[1..MAXSIZE] concurrently holds two discrete stack structures growing sequentially from absolute opposing endpoints. To maximize memory allocations dynamically, what is the exact operational condition representing a 'Stack Full' event?",
    options: [
      "A) (top1 = MAXSIZE/2) and (top2 = MAXSIZE/2+1)",
      "B) top1 + top2 + 1 = MAXSIZE",
      "C) (top1 = MAXSIZE/2) or (top2 = MAXSIZE)",
      "D) top1 = top2 - 1"
    ],
    answer: "D) top1 = top2 - 1",
    explanation: "When implementing two stacks from opposite sides of a single block allocation array, Stack 1 scales up sequentially (index incrementing) while Stack 2 shrinks down sequentially (index decrementing). Memory resources are optimized until their boundary indexes meet directly adjacently, meaning no index space exists between them."
  },
  {
    id: 6,
    difficulty: "Hard",
    question: "Assume mathematical operator values +, -, * are left-associative, while the exponential ^ token is right-associative. Precedence hierarchy scales downwards as (^, *, +, -). Map out the mathematically equivalent postfix notation configuration string for the infix assignment: a + b * c - d ^ e ^ f",
    options: [
      "A) abc * + def ^ ^ -",
      "B) abc * + de ^ f ^ -",
      "C) ab + c * d - e ^ f ^",
      "D) - + a * bc ^ ^ def"
    ],
    answer: "A) abc * + def ^ ^ -",
    explanation: "Following mathematical precedence logic structures, order conversions proceed: Evaluate (b * c) -> bc*. Evaluate addition next: (a + bc*) -> abc*+. Due to right-associativity profiles on exponent markers, process the power towers first: (e ^ f) -> ef^, then d ^ (ef^) -> def^^. Merging via structural subtraction outputs: abc*+def^^-."
  },
  {
    id: 7,
    difficulty: "Hard",
    question: "A data structure mapping function f defined explicitly on integer-based memory stack blocks satisfies these exact logical rules: f(empty) = 0 and f(push(S, i)) = max(f(S), 0) + i. If our linear stack array variable S systematically stores integers [2, -3, 2, -1, 2] packed from bottom-to-top boundaries, evaluate f(S):",
    options: [
      "A) 6",
      "B) 4",
      "C) 3",
      "D) 2"
    ],
    answer: "C) 3",
    explanation: "Working step-by-step from bottom up: Initial state f(empty) = 0. Base element 2: max(0,0)+2 = 2. Element -3: max(2,0)-3 = -1. Element 2: max(-1,0)+2 = 2. Element -1: max(2,0)-1 = 1. Topmost element 2: max(1,0)+2 = 3. Let's recalculate the strict iterative sequence tracking max values: Stack elements parsed in standard recursion sequence evaluate cleanly to a value of 3."
  },
  {
    id: 8,
    difficulty: "Hard",
    question: "A prioritized queue structure Q is used behind the scenes to model a computer science LIFO stack array S. Push operations are handled inside the backend engine via INSERT(Q, character, key) where 'key' represents a numeric weight assignment. To successfully enforce true stack logic, what sequencing format must keys follow across incoming requests?",
    options: [
      "A) Non-increasing order",
      "B) Non-decreasing order",
      "C) Strictly increasing order",
      "D) Strictly decreasing order"
    ],
    answer: "C) Strictly increasing order",
    explanation: "A priority queue extracts items with higher priority values first. To mimic a Last-In-First-Out (LIFO) stack layout using a Priority Queue, newly added elements must always take precedence over older ones. Assigning keys in a strictly increasing format guarantees newer elements receive the highest extraction properties."
  }
];

const StackQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  
  // Clean Front-End Local Storage Identity Anchors
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [localHistory, setLocalHistory] = useState<LocalAttempt[]>([]);

  // Track client mounting state to avoid hydration variance errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("algo_quiz_username");
    if (storedUser) {
      setUsername(storedUser);
      const historyKey = `algo_quiz_history_${storedUser.toLowerCase()}`;
      const savedHistory = localStorage.getItem(historyKey);
      if (savedHistory) setLocalHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sync Timer Controls
  useEffect(() => {
    if (showResult || !username) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showResult, username]);

  // Derive score states
  const score = useMemo(() => {
    return userAnswers.reduce((acc, ans, idx) => {
      return ans === QUESTIONS[idx]?.answer ? acc + 1 : acc;
    }, 0);
  }, [userAnswers]);

  const selectedOption = userAnswers[currentQuestion] || null;

  const handleKeyDown = (e: React.KeyboardEvent, option: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRegister(option);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    const cleanName = usernameInput.trim();
    localStorage.setItem("algo_quiz_username", cleanName);
    setUsername(cleanName);

    const historyKey = `algo_quiz_history_${cleanName.toLowerCase()}`;
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
      // Persist results locally
      if (username) {
        const newAttempt: LocalAttempt = {
          timestamp: Date.now(),
          answers: userAnswers,
          score: score,
          timeSpent: timeSpent
        };
        const updatedHistory = [newAttempt, ...localHistory].slice(0, 5);
        setLocalHistory(updatedHistory);
        localStorage.setItem(
          "algo_quiz_history_" + username.toLowerCase(),
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
      <Layout title="Stack Assessment Module" description="Evaluate execution sequences, binary translations, and operator tracking arrays.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 shadow-md rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-14 h-14 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-indigo-500/20">
              <FaAward />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Stack Assessment</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your understanding of LIFO architectures, stack operations, and algebraic parsing. Enter a handle below to begin.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter workspace identity (e.g. Developer)"
                aria-label="Enter workspace identity (e.g. Developer)"
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
                Initialize Terminal
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Stack Assessment Module">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Top Identity Meta Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                WORKSPACE TERMINAL: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-800 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Deauth
            </button>
          </div>

          {/* Main Assessment Card Loop */}
          <div className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
            
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="active-quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Status Metrics Bar */}
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Question Indexing</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Runtime Elapse
                      </span>
                      <div className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {formatTime(timeSpent)}
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Linear Tracking Pipeline */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                    {QUESTIONS.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-full flex-1 transition-all duration-300 ${
                          idx === currentQuestion 
                            ? "bg-[var(--ifm-color-primary)]" 
                            : userAnswers[idx] 
                              ? "bg-indigo-500/40 dark:bg-indigo-400/20" 
                              : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Current Active Question Display Block */}
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2">
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

                    {/* Integrated Interactive Code Editor Simulation Component Frame */}
                    {QUESTIONS[currentQuestion].codeSnippet && (
                      <div className="rounded-xl border border-solid border-slate-200 dark:border-slate-800 overflow-hidden text-left bg-[#090d16]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-solid border-slate-200/10 bg-slate-900/40">
                          <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1.5">
                            <FaCode className="text-slate-500" /> pseudo_compilation.c
                          </span>
                        </div>
                        <pre className="p-4 m-0 overflow-x-auto font-mono text-xs md:text-sm text-slate-300 leading-relaxed">
                          <code>{QUESTIONS[currentQuestion].codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Interactive Option Selection Layout Blocks */}
                  <div className="grid grid-cols-1 gap-3 pt-2" role="radiogroup" aria-label="Quiz Options">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSelectAnswer(option)} role="radio" aria-checked={isSelected}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[52px] ${
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

                  {/* Control Workflow CTA Buttons */}
                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Evaluate & Terminate" : "Proceed Loop"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                /* --- DIAGNOSTIC COMPILATION METRICS RECTANGLE --- */
                <motion.div
                  key="quiz-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Score Matrix Core Graphics banner */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.04),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Diagnostic Summary</h3>
                    
                    <div className="inline-flex items-baseline gap-1 text-5xl font-black text-[var(--ifm-color-primary)] font-mono">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-sm mx-auto leading-relaxed">
                      {score === QUESTIONS.length ? "Absolute data precision achieved. LIFO pipeline behaviors perfectly modeled." : score >= 5 ? "Solid optimization metrics. Core structural flows verified successfully." : "Stack diagnostics identify runtime logic failures. Review trace records below."}
                    </p>

                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-none bg-[var(--ifm-color-primary)] text-white text-xs font-bold transition-all shadow-xs hover:opacity-90 cursor-pointer min-h-[38px]"
                    >
                      <FaRedoAlt className="text-[10px]" /> Re-Initialize Assessment
                    </button>
                  </div>

                  {/* Comprehensive solutions log list */}
                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Trace Log Solutions</h4>
                    
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
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Your Selection:</span>
                              {userAns || "[NULL ENTRY]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Target Answer:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Compiler Insights:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- COMPLETELY CLIENT-SIDE LOCALSTORAGE HISTORY STREAM --- */}
            {localHistory.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" /> 
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Terminal Attempt Metrics</span>
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

export default StackQuiz;