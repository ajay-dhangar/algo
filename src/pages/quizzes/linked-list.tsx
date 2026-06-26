import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaLink,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface LinkedListQuestion {
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

const QUESTIONS: LinkedListQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is a Linked List?",
    options: [
      "A) A collection of elements stored in contiguous memory locations",
      "B) A linear data structure where elements (nodes) are connected via pointers/references",
      "C) A tree-based structure with parent-child relationships",
      "D) A fixed-size data structure that cannot grow or shrink"
    ],
    answer: "B) A linear data structure where elements (nodes) are connected via pointers/references",
    explanation: "A linked list is a linear data structure made up of nodes, where each node holds data plus a reference (pointer) to the next node. Unlike arrays, nodes need not be stored contiguously in memory."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "In a Singly Linked List, each node typically contains which of the following?",
    options: [
      "A) Data and a pointer to the previous node only",
      "B) Data and a pointer to the next node only",
      "C) Data and pointers to both the next and previous nodes",
      "D) Only data, with no pointers"
    ],
    answer: "B) Data and a pointer to the next node only",
    explanation: "A singly linked list node stores its data along with a single pointer ('next') referencing the following node. Traversal is only possible in the forward direction."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What distinguishes a Doubly Linked List from a Singly Linked List?",
    options: [
      "A) It stores two copies of every value",
      "B) Each node has pointers to both the next and the previous node",
      "C) It can only be traversed in one direction",
      "D) It does not support insertion at the head"
    ],
    answer: "B) Each node has pointers to both the next and the previous node",
    explanation: "A doubly linked list node maintains two pointers — 'next' and 'prev' — allowing traversal in both forward and backward directions, at the cost of extra memory per node."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What is a key characteristic of a Circular Linked List?",
    options: [
      "A) The last node points to null, just like a normal singly linked list",
      "B) The last node points back to the first node, forming a loop",
      "C) It can only contain numeric data",
      "D) It does not allow traversal at all"
    ],
    answer: "B) The last node points back to the first node, forming a loop",
    explanation: "In a circular linked list, the last node's next pointer references the head node instead of null, forming a continuous loop. This is useful for round-robin scheduling and similar cyclic processes."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "What is the time complexity of inserting a node at the head of a singly linked list?",
    options: [
      "A) O(1)",
      "B) O(n)",
      "C) O(log n)",
      "D) O(n²)"
    ],
    answer: "A) O(1)",
    explanation: "Inserting at the head only requires creating a new node and updating the head pointer to point to it — a constant-time operation that does not depend on the list's size."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the time complexity of inserting a node at the tail of a singly linked list when only a head pointer is maintained (no tail pointer)?",
    options: [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n log n)"
    ],
    answer: "C) O(n)",
    explanation: "Without a tail pointer, you must traverse the entire list from the head to reach the last node before inserting, which takes O(n) time. Maintaining a tail pointer reduces this to O(1)."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "Which traversal approach is commonly used to detect a cycle in a linked list?",
    options: [
      "A) Binary Search",
      "B) Floyd's Cycle Detection (Tortoise and Hare)",
      "C) Depth First Search",
      "D) Dijkstra's Algorithm"
    ],
    answer: "B) Floyd's Cycle Detection (Tortoise and Hare)",
    explanation: "Floyd's algorithm uses two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps). If a cycle exists, the fast pointer eventually meets the slow pointer; otherwise, it reaches null."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What is the time complexity of deleting a node from the middle of a singly linked list, given a direct pointer to that node (not its predecessor)?",
    options: [
      "A) O(1), always possible regardless of list type",
      "B) O(n), since you must search for the predecessor",
      "C) Not possible without a predecessor pointer in a singly linked list",
      "D) O(log n) using binary search"
    ],
    answer: "C) Not possible without a predecessor pointer in a singly linked list",
    explanation: "In a singly linked list, deleting a node requires updating the predecessor's 'next' pointer. Since you can't traverse backward, you need either the predecessor's reference or must traverse from the head — true O(1) deletion of an arbitrary node isn't directly possible."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "What is the space complexity of a linked list containing n nodes, where each node stores one data field and one pointer?",
    options: [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n²)"
    ],
    answer: "C) O(n)",
    explanation: "Each node requires a fixed amount of memory (data + pointer), and there are n nodes, so total space scales linearly with the number of elements: O(n)."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "When reversing a singly linked list iteratively, which three pointers are typically tracked during traversal?",
    options: [
      "A) head, tail, and mid",
      "B) prev, curr, and next",
      "C) root, left, and right",
      "D) first, second, and third"
    ],
    answer: "B) prev, curr, and next",
    explanation: "Iterative reversal tracks 'prev' (the previously processed node), 'curr' (the node being processed), and 'next' (a temporary reference to curr's original next node) to safely redirect pointers without losing the rest of the list."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "What is the primary advantage of a Doubly Linked List over a Singly Linked List when implementing an LRU (Least Recently Used) cache?",
    options: [
      "A) It uses less memory per node",
      "B) It allows O(1) removal of any node given its reference, since the previous node is directly accessible",
      "C) It guarantees sorted order automatically",
      "D) It prevents memory leaks entirely"
    ],
    answer: "B) It allows O(1) removal of any node given its reference, since the previous node is directly accessible",
    explanation: "LRU caches frequently need to remove arbitrary nodes (e.g., the least recently used one) in O(1) time. A doubly linked list allows direct access to both neighbors of a node, enabling true O(1) removal without traversal — a singly linked list cannot do this without extra bookkeeping."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "Given a singly linked list, what is the most space-efficient way to find the middle node in a single pass?",
    options: [
      "A) Store all nodes in an array, then access the middle index",
      "B) Use a hash map to store node positions",
      "C) Use the slow/fast pointer technique, where fast moves twice as fast as slow",
      "D) Recursively count nodes from the tail backward"
    ],
    answer: "C) Use the slow/fast pointer technique, where fast moves twice as fast as slow",
    explanation: "The slow/fast (tortoise and hare) pointer technique advances slow by 1 step and fast by 2 steps per iteration. When fast reaches the end, slow is at the middle — achieved in a single pass with O(1) extra space, unlike array-based or hashmap-based approaches which use O(n) space."
  }
];

const LinkedListQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const { attempts, isLoading, fetchAttempts, submitAttempt, setAttempts } = useQuizData({ quizId: "linked-list" });
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
      <Layout title="Linked List Quiz" description="Test your knowledge of singly, doubly, and circular linked lists.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-cyan-500/10 text-cyan-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-cyan-500/20">
              <FaLink />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Linked List Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of singly, doubly, and circular linked lists, core operations, and complexity analysis.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start Linked List Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Linked List Quiz — Singly, Doubly & Circular">
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
                      <div className="text-base font-mono font-bold text-cyan-600 dark:text-cyan-400">
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

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className={`w-full text-left p-4 rounded-xl border border-solid transition-all text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-cyan-600 border-cyan-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-cyan-600 dark:text-cyan-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered linked list structures and operations."
                        : score >= 9
                          ? "Excellent! Your understanding of linked lists is strong."
                          : score >= 6
                            ? "Good effort! Review pointer manipulation and complexity trade-offs."
                            : "Keep practicing! Focus on singly vs doubly linked list operations and traversal techniques."}
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
                          <div className="font-mono font-black text-sm text-cyan-600 dark:text-cyan-400">
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

export default LinkedListQuiz;
