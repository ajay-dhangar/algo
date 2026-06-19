import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaSortAmountUp,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface PriorityQueueQuestion {
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

const QUESTIONS: PriorityQueueQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is a Priority Queue?",
    options: [
      "A) A queue where elements are removed strictly in FIFO order",
      "B) An abstract data structure where each element has a priority, and elements are served based on priority rather than insertion order",
      "C) A stack where only the last inserted element can be removed",
      "D) A queue that only stores numeric values"
    ],
    answer: "B) An abstract data structure where each element has a priority, and elements are served based on priority rather than insertion order",
    explanation: "A priority queue is an abstract data type where each element has an associated priority. Elements with higher priority are dequeued before elements with lower priority, regardless of insertion order."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is the key difference between a standard Queue and a Priority Queue?",
    options: [
      "A) A standard queue serves elements by priority; a priority queue serves elements by insertion order",
      "B) A standard queue serves elements in FIFO order; a priority queue serves elements based on priority value",
      "C) There is no difference between the two",
      "D) A priority queue can only hold one element at a time"
    ],
    answer: "B) A standard queue serves elements in FIFO order; a priority queue serves elements based on priority value",
    explanation: "A standard queue strictly follows First-In-First-Out order. A priority queue instead removes the element with the highest (or lowest, depending on convention) priority first, irrespective of when it was inserted."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "Which underlying data structure is most commonly used to implement an efficient Priority Queue?",
    options: [
      "A) Singly Linked List",
      "B) Heap (Binary Heap)",
      "C) Hash Table",
      "D) Plain unsorted array only"
    ],
    answer: "B) Heap (Binary Heap)",
    explanation: "Binary heaps (min-heap or max-heap) are the standard implementation for priority queues because they provide O(log n) insertion and O(log n) removal of the highest/lowest priority element, with O(1) access to the top element."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is a common real-world application of a Priority Queue?",
    options: [
      "A) Implementing undo functionality in a text editor",
      "B) CPU task scheduling, where higher-priority processes run before lower-priority ones",
      "C) Storing items for simple FIFO order processing",
      "D) Reversing the order of a sequence of elements"
    ],
    answer: "B) CPU task scheduling, where higher-priority processes run before lower-priority ones",
    explanation: "Priority queues are widely used in operating system schedulers, Dijkstra's shortest path algorithm, Huffman coding, and event-driven simulations — anywhere tasks must be processed in order of importance rather than arrival."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "In a Min-Priority Queue, which element is removed first?",
    options: [
      "A) The element with the highest priority value",
      "B) The element with the lowest priority value",
      "C) The first element that was inserted",
      "D) The last element that was inserted"
    ],
    answer: "B) The element with the lowest priority value",
    explanation: "In a min-priority queue, the element with the smallest priority value is always at the front and is removed first. This is the basis of a min-heap implementation."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the time complexity of inserting an element into a Priority Queue implemented with a binary heap?",
    options: [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n log n)"
    ],
    answer: "B) O(log n)",
    explanation: "Inserting into a binary heap involves adding the element at the end and then 'bubbling up' (sift-up) to restore the heap property, which takes O(log n) time in the worst case since the heap has height log n."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "What is the time complexity of extracting the minimum (or maximum) element from a binary heap-based Priority Queue?",
    options: [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n²)"
    ],
    answer: "B) O(log n)",
    explanation: "Removing the top element requires replacing it with the last element in the heap and then 'sifting down' to restore the heap property — an O(log n) operation."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "If two elements in a Priority Queue have the same priority, what typically determines their relative order?",
    options: [
      "A) It's undefined unless the implementation explicitly defines a tie-breaking rule (e.g., insertion order for stability)",
      "B) The element inserted first is always removed last",
      "C) Priority queues never allow duplicate priorities",
      "D) Both elements are removed simultaneously"
    ],
    answer: "A) It's undefined unless the implementation explicitly defines a tie-breaking rule (e.g., insertion order for stability)",
    explanation: "Standard priority queue implementations (like binary heaps) do not guarantee order among equal-priority elements. If stable ordering is required, the implementation must add a secondary tie-breaker, such as insertion sequence number."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Which algorithm relies heavily on a Priority Queue (typically a min-heap) to efficiently find the shortest path in a weighted graph?",
    options: [
      "A) Breadth First Search (BFS)",
      "B) Depth First Search (DFS)",
      "C) Dijkstra's Algorithm",
      "D) Binary Search"
    ],
    answer: "C) Dijkstra's Algorithm",
    explanation: "Dijkstra's algorithm uses a min-priority queue to always process the unvisited vertex with the smallest known distance next, which is what allows it to achieve O((V + E) log V) time complexity."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "What is the time complexity of building a binary heap (heapify) from an unsorted array of n elements?",
    options: [
      "A) O(n log n)",
      "B) O(n)",
      "C) O(n²)",
      "D) O(log n)"
    ],
    answer: "B) O(n)",
    explanation: "Although a naive analysis might suggest O(n log n) (n sift-down calls, each O(log n)), a tighter amortized analysis shows that building a heap from the bottom up actually takes O(n) time overall, since most nodes are near the bottom and require very little work."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "Compared to a binary heap, what advantage does a Fibonacci heap offer for priority queue operations, and in what context is this significant?",
    options: [
      "A) Fibonacci heaps offer O(1) extraction of the minimum element in all cases",
      "B) Fibonacci heaps offer amortized O(1) for insert and decrease-key operations, which significantly speeds up algorithms like Dijkstra's and Prim's that perform many decrease-key operations",
      "C) Fibonacci heaps eliminate the need for any priority comparisons",
      "D) Fibonacci heaps guarantee O(1) for every single operation including extract-min"
    ],
    answer: "B) Fibonacci heaps offer amortized O(1) for insert and decrease-key operations, which significantly speeds up algorithms like Dijkstra's and Prim's that perform many decrease-key operations",
    explanation: "Fibonacci heaps achieve amortized O(1) time for insert and decrease-key (versus O(log n) for binary heaps), while extract-min remains O(log n) amortized. This makes them theoretically advantageous for graph algorithms with many decrease-key calls, though binary heaps are often preferred in practice due to lower constant-factor overhead."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "When implementing a Priority Queue using two regular queues or a sorted linked list instead of a heap, what is the typical trade-off?",
    options: [
      "A) There is no trade-off; performance is identical to a heap-based implementation",
      "B) Insertion or extraction (depending on the design) degrades to O(n) time, sacrificing efficiency for simplicity of implementation",
      "C) These alternatives always outperform heaps",
      "D) These alternatives cannot represent priorities at all"
    ],
    answer: "B) Insertion or extraction (depending on the design) degrades to O(n) time, sacrificing efficiency for simplicity of implementation",
    explanation: "A sorted linked list keeps extraction at O(1) but makes insertion O(n) (must find the correct sorted position). An unsorted list/array makes insertion O(1) but extraction O(n) (must scan for the highest priority). A binary heap balances both at O(log n), which is why it's the standard choice for performance-critical applications."
  }
];

const PriorityQueueQuiz: React.FC = () => {
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
      const res = await axios.get(buildApiUrl(apiBaseUrl, `/api/quiz-attempts/${uId}/priority-queue`));
      if (res.data?.success && Array.isArray(res.data.attempts)) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching priority queue quiz history:", e);
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
        quizId: "priority-queue",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Failed to submit priority queue quiz attempt:", e);
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
      <Layout title="Priority Queue Quiz" description="Test your knowledge of priority queues, heaps, and scheduling applications.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-orange-500/20">
              <FaSortAmountUp />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Priority Queue Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of priority queue concepts, heap-based implementations, and common applications.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Priority Queue Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Priority Queue Quiz — Heaps & Scheduling">
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
                      <div className="text-base font-mono font-bold text-orange-600 dark:text-orange-400">
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
                              ? "bg-orange-600 border-orange-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-orange-600 dark:text-orange-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered priority queue concepts and heap operations."
                        : score >= 9
                          ? "Excellent! Your understanding of priority queues is strong."
                          : score >= 6
                            ? "Good effort! Review heap operations and the difference between priority queues and regular queues."
                            : "Keep practicing! Focus on heap-based insertion, extraction, and real-world scheduling use cases."}
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
                          <div className="font-mono font-black text-sm text-orange-600 dark:text-orange-400">
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

export default PriorityQueueQuiz;
