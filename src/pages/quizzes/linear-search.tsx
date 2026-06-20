import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaSearchPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface LinearSearchQuestion {
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

const QUESTIONS: LinearSearchQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is Linear Search?",
    options: [
      "A) A search algorithm that repeatedly divides the search interval in half",
      "B) A search algorithm that checks every element sequentially until the target is found or the list ends",
      "C) A search algorithm that only works on sorted arrays",
      "D) A search algorithm that uses a hash function to locate elements"
    ],
    answer: "B) A search algorithm that checks every element sequentially until the target is found or the list ends",
    explanation: "Linear search examines each element of a list one by one, in order, comparing it to the target value, until a match is found or the entire list has been checked."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "Does Linear Search require the input array to be sorted?",
    options: [
      "A) Yes, it only works on sorted arrays",
      "B) No, it works on both sorted and unsorted data",
      "C) Yes, but only for numeric data",
      "D) No, but it only works on sorted strings"
    ],
    answer: "B) No, it works on both sorted and unsorted data",
    explanation: "Unlike binary search, linear search does not rely on any ordering of elements. It checks each element sequentially, so it works correctly on both sorted and unsorted data."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What is the time complexity of Linear Search in the worst case?",
    options: [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n²)"
    ],
    answer: "C) O(n)",
    explanation: "In the worst case (target is the last element or not present at all), linear search must examine every one of the n elements, giving a time complexity of O(n)."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is the best-case time complexity of Linear Search?",
    options: [
      "A) O(n)",
      "B) O(log n)",
      "C) O(1)",
      "D) O(n²)"
    ],
    answer: "C) O(1)",
    explanation: "The best case occurs when the target element is found at the very first position checked, requiring only a single comparison — O(1) time."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "Which of these is a practical use case where Linear Search would be appropriate?",
    options: [
      "A) Searching a huge sorted database with millions of records",
      "B) Searching a small, unsorted list of items, such as checking if a value exists in a short array",
      "C) Finding the median of a sorted dataset",
      "D) Performing range queries on a balanced tree"
    ],
    answer: "B) Searching a small, unsorted list of items, such as checking if a value exists in a short array",
    explanation: "Linear search is best suited for small datasets or unsorted data, where the overhead of sorting or building an index would outweigh the simplicity of just scanning each element directly."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the average-case time complexity of Linear Search, assuming the target is equally likely to be at any position (or absent)?",
    options: [
      "A) O(1)",
      "B) O(n)",
      "C) O(log n)",
      "D) O(n log n)"
    ],
    answer: "B) O(n)",
    explanation: "On average, assuming a uniform probability distribution, the algorithm examines roughly n/2 elements before finding the target (or n elements if the search may fail), which is still O(n) asymptotically."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "What is the space complexity of a standard iterative Linear Search implementation?",
    options: [
      "A) O(n)",
      "B) O(log n)",
      "C) O(1)",
      "D) O(n²)"
    ],
    answer: "C) O(1)",
    explanation: "Linear search only needs a constant amount of extra space (e.g., a loop index variable) regardless of input size, making its space complexity O(1)."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "How does Linear Search's time complexity compare to Binary Search for a sorted array of n elements?",
    options: [
      "A) Linear search is O(log n), faster than binary search's O(n)",
      "B) Linear search is O(n) in the worst case, while binary search achieves O(log n) on sorted data",
      "C) Both have identical O(n) complexity in all cases",
      "D) Binary search is always slower regardless of data size"
    ],
    answer: "B) Linear search is O(n) in the worst case, while binary search achieves O(log n) on sorted data",
    explanation: "When data is sorted, binary search's divide-and-conquer approach achieves O(log n) — far faster than linear search's O(n) for large datasets. However, binary search requires sorted input, while linear search does not."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "In a 'Sentinel Linear Search' optimization, what technique is used to reduce the number of comparisons per iteration?",
    options: [
      "A) Sorting the array first",
      "B) Placing the target value at the end of the array as a sentinel, eliminating the need for an explicit bounds check each iteration",
      "C) Searching from both ends simultaneously",
      "D) Using a hash table internally"
    ],
    answer: "B) Placing the target value at the end of the array as a sentinel, eliminating the need for an explicit bounds check each iteration",
    explanation: "Sentinel linear search temporarily places the search key at the end of the array. This removes the need to check 'have we reached the end of the array?' on every iteration — only a single equality check is needed per loop, reducing constant-factor overhead (though asymptotic complexity remains O(n))."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "If you need to perform Linear Search repeatedly (many times) on the same static dataset, what is a better long-term strategy and why?",
    options: [
      "A) Keep using linear search every time, since no alternative exists",
      "B) Pre-process the data once (e.g., sort it for binary search, or build a hash table for O(1) average lookups) to amortize the one-time cost across many faster subsequent searches",
      "C) Linear search is always optimal regardless of query frequency",
      "D) Convert the data into a linked list to speed up search"
    ],
    answer: "B) Pre-process the data once (e.g., sort it for binary search, or build a hash table for O(1) average lookups) to amortize the one-time cost across many faster subsequent searches",
    explanation: "When search is performed many times on largely static data, investing in preprocessing (sorting for O(log n) binary search, or hashing for O(1) average lookups) pays off because the one-time cost is amortized over many fast queries — unlike linear search's repeated O(n) cost each time."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "What is the lower bound (worst-case comparisons) proven for any comparison-based search algorithm on an arbitrary unsorted array of n elements, and how does Linear Search relate to it?",
    options: [
      "A) Ω(log n); linear search is asymptotically suboptimal",
      "B) Ω(n); linear search is asymptotically optimal for unsorted data since every element may need to be inspected",
      "C) Ω(1); any search algorithm can theoretically solve this in constant time",
      "D) Ω(n²); no algorithm can do better than quadratic time"
    ],
    answer: "B) Ω(n); linear search is asymptotically optimal for unsorted data since every element may need to be inspected",
    explanation: "For an arbitrary unsorted array, no algorithm can guarantee finding (or ruling out) a target without potentially inspecting every element in the worst case — this gives a lower bound of Ω(n). Linear search achieves this bound, making it asymptotically optimal for unsorted data, even though faster average-case heuristics may exist for specific data distributions."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "In parallel computing, how can Linear Search be adapted to take advantage of multiple processors, and what complexity can be achieved?",
    options: [
      "A) It cannot be parallelized under any circumstances",
      "B) By dividing the array into p segments and searching each segment concurrently on a separate processor, achieving O(n/p) time with p processors",
      "C) Parallelization always makes linear search slower",
      "D) Parallel linear search achieves O(log n) regardless of processor count"
    ],
    answer: "B) By dividing the array into p segments and searching each segment concurrently on a separate processor, achieving O(n/p) time with p processors",
    explanation: "Linear search parallelizes naturally: split the array into p roughly equal segments, assign each to a separate processor, and have all processors search concurrently. The overall time becomes O(n/p) (ignoring synchronization overhead), demonstrating near-linear speedup with additional processors — though this requires coordination to report which processor found the result."
  }
];

const LinearSearchQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [attempts, setAttempts] = useState<HistoryAttempt[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const apiBaseUrl = useApiBaseUrl();

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
    if (userId) fetchAttempts(userId);
  }, [userId, apiBaseUrl]);

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

  const fetchAttempts = async (uId: string) => {
    try {
      const res = await axios.get(buildApiUrl(apiBaseUrl, `/api/quiz-attempts/${uId}/linear-search`));
      if (res.data?.success && Array.isArray(res.data.attempts)) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching linear search quiz history:", e);
    }
  };

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

  const submitAttempt = async (finalAnswers: string[]) => {
    if (!userId) return;
    try {
      await axios.post(buildApiUrl(apiBaseUrl, "/api/quiz-attempts"), {
        userId,
        quizId: "linear-search",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Failed to submit linear search quiz attempt:", e);
    }
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
      <Layout title="Linear Search Quiz" description="Test your knowledge of linear search mechanics and complexity analysis.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-teal-500/10 text-teal-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-teal-500/20">
              <FaSearchPlus />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Linear Search Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of search mechanics, best/average/worst case complexity, and practical use cases.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Linear Search Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Linear Search Quiz — Mechanics & Complexity">
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-rose-200 dark:border-rose-950/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
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
                      <div className="text-base font-mono font-bold text-teal-600 dark:text-teal-400">
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
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                      }`}>
                        {QUESTIONS[currentQuestion].difficulty}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0 leading-relaxed font-sans">
                      {QUESTIONS[currentQuestion].question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-teal-600 border-teal-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-teal-600 dark:text-teal-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered linear search mechanics and complexity analysis."
                        : score >= 9
                          ? "Excellent! Your understanding of linear search is strong."
                          : score >= 6
                            ? "Good effort! Review best/average/worst case scenarios and how linear search compares to other algorithms."
                            : "Keep practicing! Focus on time/space complexity fundamentals and when linear search is appropriate."}
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
                            <span className={`text-base shrink-0 ${isCorrect ? "text-emerald-500" : "text-rose-500"}`}>
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
                          <div className="font-mono font-black text-sm text-teal-600 dark:text-teal-400">
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

export default LinearSearchQuiz;
