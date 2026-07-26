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
  FaSyncAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface RecursionQuestion {
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

const QUESTIONS: RecursionQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is Recursion?",
    options: [
      "A) A loop that runs a fixed number of times",
      "B) A technique where a function calls itself, directly or indirectly, to solve a problem",
      "C) A data structure used to store function calls",
      "D) A method of sorting an array"
    ],
    answer: "B) A technique where a function calls itself, directly or indirectly, to solve a problem",
    explanation: "Recursion is a programming technique in which a function solves a problem by calling itself with a smaller or simpler version of the same problem, until it reaches a condition that stops the recursive calls."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is a 'Base Case' in recursion?",
    options: [
      "A) The first call made to the recursive function",
      "B) A condition that stops the recursive calls, preventing infinite recursion",
      "C) The most complex case the function can handle",
      "D) A case that always causes an error"
    ],
    answer: "B) A condition that stops the recursive calls, preventing infinite recursion",
    explanation: "The base case is the condition under which the function returns a result directly without making further recursive calls. Without a base case, recursion would continue indefinitely, eventually causing a stack overflow."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What is the 'Recursive Case' in a recursive function?",
    options: [
      "A) The part of the function that handles the simplest possible input",
      "B) The part where the function calls itself with a modified (typically smaller) input, moving toward the base case",
      "C) An error condition that must be avoided",
      "D) A case where the function never returns"
    ],
    answer: "B) The part where the function calls itself with a modified (typically smaller) input, moving toward the base case",
    explanation: "The recursive case defines how the problem is broken down into a smaller subproblem and calls the function again on that subproblem, gradually approaching the base case."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What data structure does the system use internally to manage recursive function calls?",
    options: [
      "A) Queue",
      "B) Call Stack",
      "C) Hash Table",
      "D) Heap (priority queue)"
    ],
    answer: "B) Call Stack",
    explanation: "Each recursive call is pushed onto the call stack, storing its local variables and return address. When a call returns, its frame is popped off the stack. This is why excessive recursion depth can cause a 'stack overflow.'"
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "What happens if a recursive function has no base case, or the base case is never reached?",
    options: [
      "A) The function automatically optimizes itself",
      "B) The function call stack grows indefinitely, eventually causing a stack overflow error",
      "C) The function simply returns null after one call",
      "D) Nothing unusual happens; it behaves like a normal loop"
    ],
    answer: "B) The function call stack grows indefinitely, eventually causing a stack overflow error",
    explanation: "Without a reachable base case, the function keeps calling itself, continuously pushing new frames onto the call stack until the stack's memory limit is exceeded, resulting in a stack overflow."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the time complexity of a recursive function that computes the nth Fibonacci number using the naive approach (two recursive calls per invocation, no memoization)?",
    options: [
      "A) O(n)",
      "B) O(n log n)",
      "C) O(2ⁿ)",
      "D) O(log n)"
    ],
    answer: "C) O(2ⁿ)",
    explanation: "The naive recursive Fibonacci makes two recursive calls per invocation (fib(n-1) and fib(n-2)) without caching results, leading to exponential growth in the number of calls — approximately O(2ⁿ) time complexity due to massive redundant recomputation."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "What is 'Tail Recursion'?",
    options: [
      "A) A recursive call that occurs at the very beginning of a function",
      "B) A recursive call that is the last operation performed in a function, with no pending work after it returns",
      "C) A function that never calls itself",
      "D) A recursive function with multiple base cases"
    ],
    answer: "B) A recursive call that is the last operation performed in a function, with no pending work after it returns",
    explanation: "In tail recursion, the recursive call is the final action in the function — nothing happens after it returns. This allows some compilers/interpreters to optimize it into an iterative loop (tail call optimization), avoiding additional stack frames."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What is the space complexity of a recursive function with maximum recursion depth d, assuming O(1) space is used per call frame (excluding the recursive calls themselves)?",
    options: [
      "A) O(1)",
      "B) O(d)",
      "C) O(d²)",
      "D) O(log d)"
    ],
    answer: "B) O(d)",
    explanation: "Each active recursive call occupies a frame on the call stack. If the maximum depth of recursion is d, then at most d frames exist simultaneously, giving a space complexity of O(d), even if each frame itself only uses constant extra space."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Which of the following problems is most naturally and commonly solved using recursion?",
    options: [
      "A) Adding two numbers together",
      "B) Traversing a tree structure (e.g., inorder traversal of a binary tree)",
      "C) Printing a single string to the console",
      "D) Checking if a number is even or odd"
    ],
    answer: "B) Traversing a tree structure (e.g., inorder traversal of a binary tree)",
    explanation: "Tree traversal is a classic example where recursion shines: each subtree is itself a smaller tree, so the same traversal logic naturally applies recursively to left and right children until reaching null (the base case)."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "How does 'memoization' improve the efficiency of a recursive algorithm, and what is its effect on the time complexity of naive recursive Fibonacci?",
    options: [
      "A) It has no effect on time complexity, only on code readability",
      "B) Memoization caches results of previously computed subproblems, reducing recursive Fibonacci's time complexity from O(2ⁿ) to O(n)",
      "C) Memoization always increases time complexity due to caching overhead",
      "D) Memoization eliminates the need for a base case"
    ],
    answer: "B) Memoization caches results of previously computed subproblems, reducing recursive Fibonacci's time complexity from O(2ⁿ) to O(n)",
    explanation: "Memoization stores the result of each subproblem (e.g., fib(k)) the first time it's computed, and returns the cached value on subsequent calls instead of recomputing. This eliminates redundant work, transforming exponential O(2ⁿ) recursion into linear O(n) time (at the cost of O(n) extra space for the cache)."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "What is the relationship between recursion and the 'divide and conquer' algorithmic paradigm, and which complexity class do many divide-and-conquer algorithms (like Merge Sort) fall into?",
    options: [
      "A) Divide and conquer never uses recursion",
      "B) Divide and conquer algorithms typically use recursion to split a problem into smaller subproblems, solve them recursively, and combine results — many such algorithms (e.g., Merge Sort) achieve O(n log n)",
      "C) All recursive algorithms are automatically O(n log n)",
      "D) Divide and conquer always results in O(n²) complexity"
    ],
    answer: "B) Divide and conquer algorithms typically use recursion to split a problem into smaller subproblems, solve them recursively, and combine results — many such algorithms (e.g., Merge Sort) achieve O(n log n)",
    explanation: "Divide and conquer relies on recursion to break a problem into smaller independent subproblems, solve each recursively, then merge the results. Merge Sort, for example, recursively splits the array in half (log n levels) and does O(n) work merging at each level, yielding O(n log n) overall — captured precisely by the Master Theorem for recurrence relations."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "Why might converting a recursive algorithm into an iterative one (using an explicit stack or loop) be preferred in production systems, despite recursion being more elegant?",
    options: [
      "A) Iterative solutions are always asymptotically faster in Big-O terms",
      "B) Iterative solutions avoid the risk of stack overflow from excessive call depth and can reduce function-call overhead, which matters for very deep recursion or performance-critical code",
      "C) Recursive solutions cannot be correctly implemented in most languages",
      "D) There is never a reason to prefer iteration over recursion"
    ],
    answer: "B) Iterative solutions avoid the risk of stack overflow from excessive call depth and can reduce function-call overhead, which matters for very deep recursion or performance-critical code",
    explanation: "While recursion often expresses an algorithm's logic more clearly, deep recursion risks stack overflow (since most languages don't guarantee tail-call optimization), and each function call carries overhead (stack frame setup/teardown). Converting to an explicit iterative version with a manual stack can avoid these issues in performance-critical or very deep-recursion scenarios, though it may sacrifice some code clarity."
  }
];

const RecursionQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "recursion" });
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
      <Layout title="Recursion Fundamentals Quiz" description="Test your knowledge of call stack behavior, base/recursive cases, and recursive complexity.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-fuchsia-500/10 text-fuchsia-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-fuchsia-500/20">
              <FaSyncAlt />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Recursion Fundamentals Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of call stack behavior, base and recursive cases, and recursive complexity analysis.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-fuchsia-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Recursion Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Recursion Fundamentals Quiz — Call Stack & Complexity">
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
                      <div className="text-base font-mono font-bold text-fuchsia-600 dark:text-fuchsia-400">
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
                              ? "bg-fuchsia-600 border-fuchsia-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-fuchsia-600 dark:text-fuchsia-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered recursion fundamentals and call stack mechanics."
                        : score >= 9
                          ? "Excellent! Your understanding of recursion is strong."
                          : score >= 6
                            ? "Good effort! Review base cases, recursive cases, and how the call stack manages recursive calls."
                            : "Keep practicing! Focus on tracing the call stack and analyzing recursive time/space complexity."}
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
                          <div className="font-mono font-black text-sm text-fuchsia-600 dark:text-fuchsia-400">
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

export default RecursionQuiz;
