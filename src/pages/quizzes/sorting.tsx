import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaSortAmountDown,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface SortingQuestion {
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

const QUESTIONS: SortingQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "Which of the following sorting algorithms is stable by default?",
    options: [
      "A) Quick Sort",
      "B) Merge Sort",
      "C) Heap Sort",
      "D) Selection Sort"
    ],
    answer: "B) Merge Sort",
    explanation: "Merge Sort is stable because it preserves the relative order of equal elements during the merge step, unlike Quick Sort, Heap Sort, or Selection Sort which can swap equal elements across large distances."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is the worst-case time complexity of Bubble Sort?",
    options: [
      "A) O(n)",
      "B) O(n log n)",
      "C) O(n²)",
      "D) O(1)"
    ],
    answer: "C) O(n²)",
    explanation: "In the worst case (when the array is sorted in reverse order), Bubble Sort requires n-1 passes, with each pass performing comparisons and swaps, resulting in O(n²) comparisons and swaps."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "Which sorting algorithm has a best-case time complexity of O(n) when the array is already sorted?",
    options: [
      "A) Selection Sort",
      "B) Merge Sort",
      "C) Insertion Sort",
      "D) Heap Sort"
    ],
    answer: "C) Insertion Sort",
    explanation: "Insertion Sort only does one comparison per element and no swaps if the array is already sorted, resulting in a best-case time complexity of O(n). Selection Sort always does O(n²) comparisons regardless of the initial order."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is the auxiliary space complexity of Heap Sort?",
    options: [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n log n)"
    ],
    answer: "A) O(1)",
    explanation: "Heap Sort is an in-place sorting algorithm because it re-arranges the elements inside the input array itself, requiring only a constant amount of auxiliary space — O(1)."
  },
  {
    id: 5,
    difficulty: "Medium",
    question: "Why is Quick Sort preferred over Merge Sort for sorting arrays in-place, despite having a worst-case complexity of O(n²)?",
    options: [
      "A) Quick Sort is always stable",
      "B) Quick Sort is in-place (requiring only O(log n) auxiliary stack space) and has excellent cache locality in practice",
      "C) Merge Sort has a worse average-case time complexity",
      "D) Quick Sort requires no comparisons"
    ],
    answer: "B) Quick Sort is in-place (requiring only O(log n) auxiliary stack space) and has excellent cache locality in practice",
    explanation: "Quick Sort operates in-place (requiring only O(log n) stack space for recursion), whereas Merge Sort requires O(n) auxiliary space to merge subarrays. Quick Sort also exhibits excellent cache localization (sequential memory access patterns during partitioning), making it very fast in practice."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the time complexity of building a binary heap of size n from an unsorted array of n elements?",
    options: [
      "A) O(1)",
      "B) O(n)",
      "C) O(n log n)",
      "D) O(n²)"
    ],
    answer: "B) O(n)",
    explanation: "Using the bottom-up heap construction algorithm (heapify from the lowest non-leaf nodes up to the root), the time complexity is bounded by O(n). This is because the height of the nodes decreases as we move down the tree, and the work done at each level is proportional to the height of that level."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "Which of the following is a hybrid sorting algorithm that combines Merge Sort and Insertion Sort, and is the default sorting algorithm in Python and Java?",
    options: [
      "A) Intro Sort",
      "B) Tim Sort",
      "C) Block Sort",
      "D) Shell Sort"
    ],
    answer: "B) Tim Sort",
    explanation: "Timsort is a hybrid stable sorting algorithm derived from Merge Sort and Insertion Sort. It identifies natural runs (already sorted subsegments) and uses Insertion Sort for small runs, then merges them using Merge Sort. It is the default sorting algorithm for Python, Java (for objects), and Rust."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What happens during the partitioning step of Quick Sort using Lomuto's partition scheme?",
    options: [
      "A) The array is split into two equal halves",
      "B) Elements smaller than or equal to the pivot are moved to the left, and elements greater are moved to the right",
      "C) The array is sorted completely",
      "D) The smallest element is placed at the first position"
    ],
    answer: "B) Elements smaller than or equal to the pivot are moved to the left, and elements greater are moved to the right",
    explanation: "The partitioning step in Quick Sort chooses a pivot element and rearranges the array so that all elements smaller than or equal to the pivot are placed to its left, and all elements larger than the pivot are placed to its right, leaving the pivot in its final sorted position."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "In which scenario would Selection Sort be preferred over other O(n²) algorithms like Insertion Sort?",
    options: [
      "A) When the array is already sorted",
      "B) When minimizing the number of write operations (swaps) to memory is critical",
      "C) When stability is required",
      "D) When auxiliary space is limited"
    ],
    answer: "B) When minimizing the number of write operations (swaps) to memory is critical",
    explanation: "Selection Sort performs at most O(n) swaps (write operations) in the worst case, whereas Bubble Sort and Insertion Sort can perform up to O(n²) swaps. If writes to memory are very expensive (e.g., in flash memory or EEPROM), Selection Sort can be advantageous."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "Which sorting algorithm does Intro Sort use as a fallback when the recursion depth exceeds a certain limit (usually 2 * log n)?",
    options: [
      "A) Merge Sort",
      "B) Heap Sort",
      "C) Insertion Sort",
      "D) Bubble Sort"
    ],
    answer: "B) Heap Sort",
    explanation: "Intro Sort (Introspective Sort) starts with Quick Sort. If the recursion depth exceeds a threshold (indicating a worst-case O(n²) partitioning behavior), it switches to Heap Sort to guarantee O(n log n) worst-case time complexity, while maintaining Quick Sort's practical speed for most inputs. It also switches to Insertion Sort for very small subarrays."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "What is the theoretical lower bound for the time complexity of any comparison-based sorting algorithm in the worst case?",
    options: [
      "A) Ω(n)",
      "B) Ω(n log n)",
      "C) Ω(n²)",
      "D) Ω(2^n)"
    ],
    answer: "B) Ω(n log n)",
    explanation: "The decision tree model shows that to sort n elements, there are n! possible permutations. A binary decision tree must have at least n! leaves, meaning its height (the minimum number of comparisons in the worst case) is at least log(n!) = Ω(n log n) by Stirling's approximation."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "Which of the following non-comparison-based sorting algorithms has a time complexity of O(n + k), where n is the number of elements and k is the range of the input values?",
    options: [
      "A) Radix Sort",
      "B) Bucket Sort",
      "C) Counting Sort",
      "D) Shell Sort"
    ],
    answer: "C) Counting Sort",
    explanation: "Counting Sort is a non-comparison-based algorithm that operates by counting the number of occurrences of each unique value in the input array. It uses this count to place elements in their correct positions in the sorted output, achieving O(n + k) time complexity, where k is the range of key values."
  }
];

const SortingQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [attempts, setAttempts] = useState<HistoryAttempt[]>([]);
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

  const fetchAttempts = useCallback((uId: string) => {
    const historyKey = `quiz_attempts_${uId}_sorting`;
    const savedAttempts = localStorage.getItem(historyKey);
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (e) {
        console.error("Error parsing history attempts:", e);
        setAttempts([]);
      }
    } else {
      setAttempts([]);
    }
  }, []);

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

  const submitAttempt = (finalAnswers: string[]) => {
    if (!userId) return;
    const newAttempt: HistoryAttempt = {
      id: Math.random().toString(36).substring(2, 9),
      score: score,
      totalQuestions: QUESTIONS.length,
      timeSpent: timeSpent,
      completedAt: new Date().toISOString()
    };
    const historyKey = `quiz_attempts_${userId}_sorting`;
    const savedAttempts = localStorage.getItem(historyKey);
    let existing: HistoryAttempt[] = [];
    if (savedAttempts) {
      try {
        existing = JSON.parse(savedAttempts);
        if (!Array.isArray(existing)) {
          existing = [];
        }
      } catch (e) {
        console.error("Error parsing history attempts:", e);
      }
    }
    const updated = [newAttempt, ...existing].slice(0, 5);
    localStorage.setItem(historyKey, JSON.stringify(updated));
    setAttempts(updated);
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
      submitAttempt(userAnswers);
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
      <Layout title="Sorting Algorithms Quiz" description="Test your knowledge of sorting complexities, stability, sorting steps, and recursion.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-14 h-14 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-indigo-500/20">
              <FaSortAmountDown />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Sorting Algorithms Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of stable vs unstable sorts, complexities, in-place sorting behaviors, and hybrid algorithms.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Sorting Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Sorting Algorithms Quiz — Stability & Complexity">
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
                      <div className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400">
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
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
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
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Quiz Results</h3>
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-indigo-600 dark:text-indigo-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered sorting algorithms complexities, stability, and hybrid schemes."
                        : score >= 9
                          ? "Excellent! Your understanding of sorting concepts is very strong."
                          : score >= 6
                            ? "Good effort! Review stable vs unstable sorts and fallback mechanisms in hybrid sorts."
                            : "Keep practicing! Focus on worst-case complexities, heap operations, and recursive partitions."}
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
                          <div className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400">
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
    </Layout>
  );
};

export default SortingQuiz;
