import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaArrowsAltH,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface DequeQuestion {
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

const QUESTIONS: DequeQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What does 'Deque' stand for?",
    options: [
      "A) Double Queue",
      "B) Double-Ended Queue",
      "C) Dynamic Queue",
      "D) Delayed Queue"
    ],
    answer: "B) Double-Ended Queue",
    explanation: "Deque stands for 'Double-Ended Queue' — a linear data structure that allows insertion and deletion of elements from both the front and the rear ends."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "Which operations are typically supported by a Deque?",
    options: [
      "A) Only enqueue at the rear and dequeue from the front",
      "B) Only push and pop from one end, like a stack",
      "C) Insertion and deletion from both the front and the rear",
      "D) Only random access by index"
    ],
    answer: "C) Insertion and deletion from both the front and the rear",
    explanation: "A deque supports four primary operations: insertFront, insertRear, deleteFront, and deleteRear — giving it the combined flexibility of both a stack and a queue."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "Can a Deque be used to implement both a Stack and a Queue?",
    options: [
      "A) No, a deque can only function as a queue",
      "B) No, a deque can only function as a stack",
      "C) Yes, because it supports insertion/removal at both ends",
      "D) No, a deque is unrelated to stacks and queues"
    ],
    answer: "C) Yes, because it supports insertion/removal at both ends",
    explanation: "Since a deque allows operations at both ends, it can simulate a stack (using only one end for both push and pop) or a queue (inserting at one end, removing from the other)."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is a real-world use case of a Deque?",
    options: [
      "A) Implementing a sliding window for finding maximums/minimums in subarrays",
      "B) Storing key-value pairs for O(1) lookup",
      "C) Representing hierarchical parent-child relationships",
      "D) Sorting a list of numbers"
    ],
    answer: "A) Implementing a sliding window for finding maximums/minimums in subarrays",
    explanation: "Deques are commonly used in sliding window problems (e.g., finding the maximum in every window of size k) because elements can be efficiently added/removed from both ends as the window slides."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "What is the time complexity of inserting or removing an element at either end of a Deque implemented with a doubly linked list?",
    options: [
      "A) O(n)",
      "B) O(log n)",
      "C) O(1)",
      "D) O(n log n)"
    ],
    answer: "C) O(1)",
    explanation: "When implemented with a doubly linked list (or a circular array/buffer), both ends are directly accessible, allowing insertion and deletion at the front or rear in constant time."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "Which of the following is NOT a standard Deque operation?",
    options: [
      "A) insertFront",
      "B) insertRear",
      "C) deleteFront",
      "D) insertMiddle"
    ],
    answer: "D) insertMiddle",
    explanation: "Standard deque operations are limited to the two ends: insertFront, insertRear, deleteFront, and deleteRear. Inserting at an arbitrary middle position is not a core deque operation and would require O(n) time in most implementations."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "In the 'Sliding Window Maximum' problem, why is a Deque preferred over a simple array or stack?",
    options: [
      "A) It automatically sorts all elements",
      "B) It allows efficient removal of elements from both the front (out-of-window) and rear (smaller, useless elements) in O(1) per operation",
      "C) It guarantees O(1) search for any value",
      "D) It uses less memory than an array"
    ],
    answer: "B) It allows efficient removal of elements from both the front (out-of-window) and rear (smaller, useless elements) in O(1) per operation",
    explanation: "A monotonic deque maintains indices of useful elements. As the window slides, elements that fall out of range are removed from the front, and smaller elements that can never be the maximum are removed from the rear — both in O(1), yielding an overall O(n) algorithm."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What is the main difference between a Deque and a standard Queue in terms of access?",
    options: [
      "A) A queue allows access from both ends; a deque only allows access from the front",
      "B) A deque allows access (insertion/removal) from both ends; a queue only allows insertion at the rear and removal from the front",
      "C) There is no difference; they are the same structure",
      "D) A queue allows random access; a deque does not"
    ],
    answer: "B) A deque allows access (insertion/removal) from both ends; a queue only allows insertion at the rear and removal from the front",
    explanation: "A standard FIFO queue restricts insertion to the rear and removal to the front. A deque relaxes this restriction, allowing both insertion and removal at either end."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "If a Deque is implemented using a fixed-size circular array, what happens when you try to insert into a full deque?",
    options: [
      "A) The oldest element is automatically overwritten",
      "B) It causes an overflow condition that must be explicitly handled",
      "C) The array automatically doubles in size with no developer intervention required",
      "D) Nothing; circular arrays have unlimited capacity"
    ],
    answer: "B) It causes an overflow condition that must be explicitly handled",
    explanation: "A fixed-size circular array deque has a maximum capacity. Attempting to insert when full results in an overflow condition that the implementation must detect and handle (e.g., by rejecting the insert or resizing if using a dynamic array)."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "Which data structure choice is most appropriate for implementing an efficient Deque with O(1) amortized insertion/removal at both ends, while also supporting dynamic resizing?",
    options: [
      "A) A singly linked list with only a head pointer",
      "B) A static, fixed-size array",
      "C) A doubly linked list, or a dynamic circular array (resizable ring buffer)",
      "D) A binary search tree"
    ],
    answer: "C) A doubly linked list, or a dynamic circular array (resizable ring buffer)",
    explanation: "Both a doubly linked list and a dynamic circular array (ring buffer that resizes when full) support O(1) operations at both ends. A doubly linked list avoids resizing overhead but uses more memory per element due to pointers; a dynamic array is more memory-efficient but requires occasional O(n) resizing (amortized O(1))."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "How can a Deque be used to implement an efficient algorithm for the 'maximum of all subarrays of size k' problem, and what is its time complexity?",
    options: [
      "A) By sorting each window — O(n log k)",
      "B) By maintaining a monotonically decreasing deque of indices, achieving O(n) overall",
      "C) By comparing every pair within the window — O(n·k)",
      "D) It cannot be solved using a deque"
    ],
    answer: "B) By maintaining a monotonically decreasing deque of indices, achieving O(n) overall",
    explanation: "The deque stores indices of elements in decreasing order of value. For each new element, pop smaller elements from the rear before pushing (since they can never be the max while the new larger one is in the window), and pop from the front when the index falls outside the window. Each element is pushed and popped at most once, giving O(n) total time."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "In a multi-threaded environment, what is a key challenge when using a Deque shared across threads (e.g., as in work-stealing schedulers)?",
    options: [
      "A) Deques cannot be used in multi-threaded contexts at all",
      "B) Ensuring thread-safe concurrent access at both ends, often requiring lock-free or fine-grained locking strategies to avoid contention",
      "C) Deques automatically handle all concurrency without any synchronization",
      "D) Multi-threading has no effect on deque behavior"
    ],
    answer: "B) Ensuring thread-safe concurrent access at both ends, often requiring lock-free or fine-grained locking strategies to avoid contention",
    explanation: "Work-stealing schedulers use deques where a thread pushes/pops from one end (its own work) while other threads 'steal' work from the opposite end. This requires careful concurrent design — often lock-free algorithms — to prevent race conditions while minimizing contention between the owning thread and stealing threads."
  }
];

const DequeQuiz: React.FC = () => {
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
      const res = await axios.get(buildApiUrl(apiBaseUrl, `/api/quiz-attempts/${uId}/deque`));
      if (res.data?.success && Array.isArray(res.data.attempts)) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching deque quiz history:", e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, option: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRegister(option);
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
        quizId: "deque",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Failed to submit deque quiz attempt:", e);
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
      <Layout title="Deque Quiz" description="Test your knowledge of double-ended queues, operations, and complexity.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-violet-500/10 text-violet-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-violet-500/20">
              <FaArrowsAltH />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Deque Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of double-ended queue concepts, real-world use cases, and complexity analysis.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Deque Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Deque Quiz — Double-Ended Queue Concepts">
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
                      <div className="text-base font-mono font-bold text-violet-600 dark:text-violet-400">
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
                          onClick={() => handleAnswer(option)}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-violet-600 border-violet-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-violet-600 dark:text-violet-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered deque concepts and operations."
                        : score >= 9
                          ? "Excellent! Your understanding of deques is strong."
                          : score >= 6
                            ? "Good effort! Review deque operations and sliding window applications."
                            : "Keep practicing! Focus on the difference between deques, stacks, and queues."}
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
                          <div className="font-mono font-black text-sm text-violet-600 dark:text-violet-400">
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

export default DequeQuiz;
