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
import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface ArrayQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
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

const QUESTIONS: ArrayQuestion[] = [
  {
    id: 1,
    difficulty: "Medium",
    questionText: "What will be the exact operational output of the following C++ code sequence?",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[2] = { 1, 2 };\n    cout << 0[arr] << ", " << 1[arr] << endl;\n    return 0;\n}`,
    options: ["A) 1, 2", "B) Syntax error", "C) Run time error", "D) None of the above"],
    answer: "A) 1, 2",
    explanation: "In C++, internal array element accesses are compiled directly using pointer arithmetic: arr[i] evaluates to *(arr + i). Because mathematical addition is commutative, *(arr + i) is identical to *(i + arr), meaning i[arr] is syntactic sugar for arr[i]."
  },
  {
    id: 2,
    difficulty: "Medium",
    questionText: "What will be the output or behavior when executing the code below?",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = { 1, 2, 3, 4, 5 };\n    cout << arr[5] << endl;\n    return 0;\n}`,
    options: ["A) 5", "B) 0", "C) Garbage value", "D) Out of bounds compilation error"],
    answer: "C) Garbage value",
    explanation: "An array initialized with 5 elements maps indexes from 0 to 4. Accessing arr[5] goes past the allocated boundary, triggering undefined behavior by referencing unmanaged stack memory, resulting in a garbage value at runtime."
  },
  {
    id: 3,
    difficulty: "Easy",
    questionText: "What value prints to the console terminal during execution here?",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = { 1, 2, 3, 4, 5 };\n    cout << arr[4] << endl;\n    return 0;\n}`,
    options: ["A) 5", "B) 0", "C) 4", "D) None of the above"],
    answer: "A) 5",
    explanation: "Arrays are zero-indexed. For an array of size 5, the terminal index position is size - 1, which is index 4. This references the fifth element, returning 5."
  },
  {
    id: 4,
    difficulty: "Easy",
    questionText: "What value prints to the console terminal during execution here?",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = { 1, 2, 3, 4, 5 };\n    cout << arr[0] << endl;\n    return 0;\n}`,
    options: ["A) 1", "B) 0", "C) 5", "D) Undefined behavior"],
    answer: "A) 1",
    explanation: "Index 0 targets the initial base block memory offset of our array, returning the first stored integer element: 1."
  },
  {
    id: 5,
    difficulty: "Easy",
    questionText: "What is the true asymptotic worst-case time complexity of accessing an individual element inside an array given its valid index?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n^2)"],
    answer: "A) O(1)",
    explanation: "Array memory blocks are contiguous. Calculating an item address requires only one multiplication and one addition operation: Base_Address + (Index * Element_Size). This constant-time calculation runs in O(1) complexity."
  },
  {
    id: 6,
    difficulty: "Easy",
    questionText: "Which of the following conceptual architectural descriptions is entirely true regarding native arrays in C++?",
    options: [
      "A) The elements of an array are stored in contiguous memory locations",
      "B) The elements of an array are stored in non-contiguous memory locations",
      "C) The elements of an array are stored in random memory locations",
      "D) Elements scale dynamically across virtual page boundaries automatically"
    ],
    answer: "A) The elements of an array are stored in contiguous memory locations",
    explanation: "By definition, native primitives group elements in unbroken, back-to-back sequential memory slots. This uniform, predictable arrangement enables fast O(1) random access operations."
  },
  {
    id: 7,
    difficulty: "Medium",
    questionText: "In C++, if a primitive local array is declared as 'int arr[5];' within a local stack frame block, what will be the default values inside its elements?",
    options: ["A) 0", "B) 1", "C) Random value (Garbage)", "D) Compile-time allocation error"],
    answer: "C) Random value (Garbage)",
    explanation: "Locally scoped automatic variables declared inside block functions are not zero-initialized by C++ runtime frameworks. They inherit whatever residual binary configurations existed previously in those stack memory registers, returning garbage values until explicitly written to."
  },
  {
    id: 8,
    difficulty: "Hard",
    questionText: "What will be the output or behavior when executing the uninitialized array block below?",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5];\n    cout << arr[0] << endl;\n    return 0;\n}`,
    options: ["A) Always 0", "B) Always 1", "C) Random garbage value", "D) Segmentation faults"],
    answer: "C) Random garbage value",
    explanation: "Because local stack-allocated arrays do not undergo default value cleaning loops, reading arr[0] fetches whatever unmanaged random garbage remains at that raw memory offset."
  },
  {
    id: 9,
    difficulty: "Hard",
    questionText: "What does the console display when attempting to print the unindexed array variable pointer label directly?",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = { 1, 2, 3, 4, 5 };\n    cout << arr << endl;\n    return 0;\n}`,
    options: ["A) Address of the first element", "B) 1", "C) 2", "D) Hexadecimal hash of total element counts"],
    answer: "A) Address of the first element",
    explanation: "In C++, the identifier label of an array decays into a pointer reference targeting its zero-index base offset address (&arr[0]) when compiled inside streaming operators."
  }
];

const ArrayQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [localHistory, setLocalHistory] = useState<LocalAttempt[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("algo_quiz_username");
    if (storedUser) {
      setUsername(storedUser);
      const historyKey = `algo_array_history_${storedUser.toLowerCase()}`;
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

    const historyKey = `algo_array_history_${cleanName.toLowerCase()}`;
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
        const newAttempt: LocalAttempt = {
          timestamp: Date.now(),
          answers: userAnswers,
          score: score,
          timeSpent: timeSpent
        };
        const updatedHistory = [newAttempt, ...localHistory].slice(0, 5);
        setLocalHistory(updatedHistory);
        localStorage.setItem(
          "algo_array_history_" + username.toLowerCase(),
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
      <Layout title="Arrays Evaluation Arena" description="Evaluate contiguous element strategies, memory indexes, and algorithmic tracking parameters.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 shadow-md rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-blue-500/20">
              <FaAward />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Arrays Quiz Arena</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Analyze pointer shifts, indexing logic, and contiguous memory architectures. Enter your username below to begin.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter handle identity (e.g. CodeMaster)"
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
                Initialize Module Terminal
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Arrays Quiz Arena">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Identity Header Grid Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xs">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-2xl text-slate-400 dark:text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-500">
                ACTIVE TERMINAL: <strong className="text-slate-900 dark:text-white uppercase font-sans tracking-wide">{username}</strong>
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-800 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> Change Identity
            </button>
          </div>

          {/* Core Interactive Display Wrapper Frame */}
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
                  {/* Status telemetry row metrics */}
                  <div className="flex items-center justify-between border-b border-solid border-slate-100 dark:border-slate-800/60 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black">Matrix Pointer</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {currentQuestion + 1} <span className="text-slate-300 dark:text-slate-700 font-normal">/</span> {QUESTIONS.length}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-black flex items-center gap-1 justify-end">
                        <FaClock /> Runtime Elapse
                      </span>
                      <div className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">
                        {formatTime(timeSpent)}
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Linear Pipeline Steps */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                    {QUESTIONS.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-full flex-1 transition-all duration-300 ${
                          idx === currentQuestion 
                            ? "bg-[var(--ifm-color-primary)]" 
                            : userAnswers[idx] 
                              ? "bg-blue-500/40 dark:bg-blue-400/20" 
                              : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Active Question Structure Element */}
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
                      {QUESTIONS[currentQuestion].questionText}
                    </h3>

                    {/* Syntax Highlight Mock Terminal Console */}
                    {QUESTIONS[currentQuestion].codeSnippet && (
                      <div className="rounded-xl border border-solid border-slate-200 dark:border-slate-800 overflow-hidden text-left bg-[#090d16]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-solid border-slate-200/10 bg-slate-900/40">
                          <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1.5">
                            <FaCode className="text-slate-500" /> main_runtime.cpp
                          </span>
                        </div>
                        <pre className="p-4 m-0 overflow-x-auto font-mono text-xs md:text-sm text-slate-300 leading-relaxed">
                          <code>{QUESTIONS[currentQuestion].codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Options Selections Loop Blocks Grid */}
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSelectAnswer(option)}
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

                  {/* Flow control action submit buttons */}
                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase border-none transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                      selectedOption
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 cursor-pointer shadow-xs"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-950 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "Compile & View Scores" : "Next Evaluation Node"}
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </motion.div>
              ) : (
                /* --- EVALUATION RESULT DIAGNOSTICS ARCHIVE PANELS --- */
                <motion.div
                  key="quiz-diagnostic-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Performance graphical metrics layout frame banner */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.04),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Diagnostic Score Report</h3>
                    
                    <div className="inline-flex items-baseline gap-1 text-5xl font-black text-[var(--ifm-color-primary)] font-mono">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-sm mx-auto leading-relaxed">
                      {score === QUESTIONS.length ? "Contiguous sequence mechanics perfectly verified. Array reference bounds stable." : score >= 6 ? "Good conceptual validation parameters. Memory layout tracking looks optimal." : "Underlying structural logic discrepancies identified. Inspect memory trace elements below."}
                    </p>

                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-none bg-[var(--ifm-color-primary)] text-white text-xs font-bold transition-all shadow-xs hover:opacity-90 cursor-pointer min-h-[38px]"
                    >
                      <FaRedoAlt className="text-[10px]" /> Re-Initialize Quiz Run
                    </button>
                  </div>

                  {/* Solutions list loop tracing details */}
                  <div className="text-left space-y-6">
                    <h4 className="text-sm font-mono font-black tracking-wider uppercase text-slate-400 m-0 border-b border-solid border-slate-100 dark:border-slate-800/60 pb-3">Trace Solutions Stream</h4>
                    
                    {QUESTIONS.map((q, index) => {
                      const userAns = userAnswers[index];
                      const isCorrect = userAns === q.answer;

                      return (
                        <div key={q.id} className="bg-slate-50/50 dark:bg-slate-950/30 border border-solid border-slate-200/80 dark:border-slate-800/60 rounded-xl p-5 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white m-0 leading-relaxed max-w-2xl">
                              {index + 1}. {q.questionText}
                            </h5>
                            <span className={`text-base shrink-0 ${isCorrect ? "text-emerald-500" : "text-rose-800 dark:text-rose-400"}`}>
                              {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                            <div className={`p-2.5 rounded-lg border border-solid ${isCorrect ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-rose-500/5 border-rose-500/10 text-rose-700 dark:text-rose-400"}`}>
                              <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Your Submission:</span>
                              {userAns || "[NULL_VAL]"}
                            </div>
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg border border-solid bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                <span className="font-bold uppercase tracking-wider block text-[9px] text-slate-400 mb-1">Correct Blueprint:</span>
                                {q.answer}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                            <strong className="text-slate-700 dark:text-slate-300 font-sans block text-[10px] font-bold uppercase tracking-wider mb-1">Compiler Explanatory Log:</strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- COMPONENTIZED LOCALSTORAGE PERSISTENT HISTORY SHEET --- */}
            {localHistory.length > 0 && (
              <div className="mt-12 border-t border-solid border-slate-200 dark:border-slate-800/80 pt-8 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                  <FaHistory className="text-slate-400 text-xs" /> 
                  <span className="font-mono font-black uppercase tracking-wider text-xs text-slate-400">Terminal Local Execution Logs</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {localHistory.map((att, idx) => (
                    <div 
                      key={att.timestamp || idx} 
                      className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800/60 rounded-xl p-4 flex justify-between items-center text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                          Execution Sequence #{localHistory.length - idx}
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

export default ArrayQuiz;