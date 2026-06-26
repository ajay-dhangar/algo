import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaProjectDiagram,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface GraphQuestion {
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

const QUESTIONS: GraphQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What is a Graph in data structures?",
    options: [
      "A) A linear collection of elements accessed by index",
      "B) A non-linear data structure consisting of vertices and edges",
      "C) A hierarchical structure with a single root node",
      "D) A fixed-size array of key-value pairs"
    ],
    answer: "B) A non-linear data structure consisting of vertices and edges",
    explanation: "A graph is a non-linear data structure made up of a finite set of vertices (nodes) and a set of edges connecting pairs of vertices. It is used to model pairwise relations between objects."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "In an undirected graph, if there is an edge between vertex A and vertex B, which of the following is true?",
    options: [
      "A) You can traverse only from A to B",
      "B) You can traverse only from B to A",
      "C) You can traverse from A to B and from B to A",
      "D) No traversal is possible between A and B"
    ],
    answer: "C) You can traverse from A to B and from B to A",
    explanation: "In an undirected graph, edges have no direction. If an edge exists between A and B, the connection is bidirectional — you can move freely between A and B in either direction."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "What is the 'degree' of a vertex in an undirected graph?",
    options: [
      "A) The total number of vertices in the graph",
      "B) The number of edges connected to that vertex",
      "C) The shortest distance from that vertex to any other",
      "D) The maximum weight of edges adjacent to the vertex"
    ],
    answer: "B) The number of edges connected to that vertex",
    explanation: "The degree of a vertex in an undirected graph is the count of edges incident to it. A vertex with no edges has degree 0 and is called an isolated vertex."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "Which data structure does Breadth First Search (BFS) primarily use for traversal?",
    options: [
      "A) Stack",
      "B) Priority Queue",
      "C) Queue",
      "D) Linked List"
    ],
    answer: "C) Queue",
    explanation: "BFS explores a graph level by level. It uses a Queue (FIFO) to track which node to visit next, ensuring all neighbors of the current node are processed before moving deeper."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "Which data structure does Depth First Search (DFS) primarily use for traversal?",
    options: [
      "A) Queue",
      "B) Stack (or recursion call stack)",
      "C) Heap",
      "D) Hash Map"
    ],
    answer: "B) Stack (or recursion call stack)",
    explanation: "DFS dives as deep as possible down a path before backtracking. It uses a Stack — either explicitly or via the program's recursion call stack — to remember the path and backtrack when needed."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "What is the space complexity of representing a graph with V vertices and E edges using an Adjacency List?",
    options: [
      "A) O(V²)",
      "B) O(V + E)",
      "C) O(E²)",
      "D) O(V × E)"
    ],
    answer: "B) O(V + E)",
    explanation: "An adjacency list stores each vertex along with a list of its neighbors. Total space = O(V) for the vertex array + O(E) for all edge entries across all lists = O(V + E). This makes it memory-efficient for sparse graphs."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "In a directed graph, what is the difference between 'in-degree' and 'out-degree' of a vertex?",
    options: [
      "A) In-degree counts outgoing edges; out-degree counts incoming edges",
      "B) In-degree counts incoming edges; out-degree counts outgoing edges",
      "C) Both refer to the total number of edges connected to the vertex",
      "D) In-degree applies only to weighted graphs"
    ],
    answer: "B) In-degree counts incoming edges; out-degree counts outgoing edges",
    explanation: "In a directed graph, edges have direction. The in-degree of a vertex is the number of edges pointing INTO it, while out-degree is the number of edges pointing OUT of it. These can differ for the same vertex."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "What is a 'cycle' in a graph?",
    options: [
      "A) A path that visits every vertex exactly once",
      "B) A path where the start vertex and end vertex are the same, with no repeated edges",
      "C) A sequence of edges connecting two disconnected components",
      "D) The longest possible path between any two vertices"
    ],
    answer: "B) A path where the start vertex and end vertex are the same, with no repeated edges",
    explanation: "A cycle is a closed path — it starts and ends at the same vertex without reusing any edge. Detecting cycles is important in many algorithms (e.g., deadlock detection, topological sorting)."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "What is the time complexity of BFS on a graph represented using an Adjacency List with V vertices and E edges?",
    options: [
      "A) O(V²)",
      "B) O(V log V)",
      "C) O(V + E)",
      "D) O(E²)"
    ],
    answer: "C) O(V + E)",
    explanation: "In BFS using an adjacency list, each vertex is enqueued and dequeued once — O(V) — and each edge is examined once when processing the adjacency list of each vertex — O(E). Total: O(V + E)."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "Which of the following is a real-world application of Graph data structures?",
    options: [
      "A) Storing sorted integers for binary search",
      "B) Modeling social networks where users are vertices and friendships are edges",
      "C) Implementing a LIFO-based undo mechanism",
      "D) Performing prefix-based string lookups"
    ],
    answer: "B) Modeling social networks where users are vertices and friendships are edges",
    explanation: "Graphs are widely used to model social networks (Facebook friends, LinkedIn connections), road maps (GPS navigation), web crawlers (web pages as vertices, hyperlinks as edges), dependency resolution, and more."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "In a weighted directed graph, which algorithm is most suitable for finding the shortest path from a single source to all other vertices when all edge weights are non-negative?",
    options: [
      "A) Depth First Search (DFS)",
      "B) Breadth First Search (BFS)",
      "C) Dijkstra's Algorithm",
      "D) Topological Sort"
    ],
    answer: "C) Dijkstra's Algorithm",
    explanation: "Dijkstra's algorithm is designed specifically for single-source shortest paths in graphs with non-negative weights. It uses a priority queue to greedily pick the vertex with the smallest known distance at each step, achieving O((V + E) log V) complexity with a min-heap."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "What is the key advantage of an Adjacency Matrix over an Adjacency List representation for graphs?",
    options: [
      "A) Uses less memory for sparse graphs",
      "B) Allows O(1) time to check whether an edge exists between two vertices",
      "C) Supports faster BFS traversal on all graph types",
      "D) Automatically handles disconnected components"
    ],
    answer: "B) Allows O(1) time to check whether an edge exists between two vertices",
    explanation: "An adjacency matrix stores a V×V grid where matrix[i][j] = 1 (or weight) if edge (i,j) exists. This enables O(1) edge lookup. However, it uses O(V²) memory regardless of edge count, making it inefficient for sparse graphs."
  }
];

const GraphQuiz: React.FC = () => {
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
    const historyKey = `quiz_attempts_${uId}_graph`;
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
    const historyKey = `quiz_attempts_${userId}_graph`;
    const savedAttempts = localStorage.getItem(historyKey);
    const existing = savedAttempts ? JSON.parse(savedAttempts) : [];
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
      <Layout title="Graph Quiz" description="Test your knowledge of graph theory, BFS, DFS, and graph representations.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-indigo-500/20">
              <FaProjectDiagram />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">Graph Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Challenge your understanding of graph theory, traversal algorithms (BFS &amp; DFS), representations, and real-world applications.
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
                Start Graph Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Graph Quiz — Vertices, Edges & Traversals">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">

            {/* Top Bar */}
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

          {/* Quiz Shell */}
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
                  {/* Progress Bar */}
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

                  {/* Difficulty Badge + Question */}
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

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3 pt-2" role="radiogroup" aria-label="Quiz Options">
                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
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

                  {/* Next Button */}
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
                /* Results Panel */
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-950 border border-solid border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-4">Quiz Results</h3>
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-indigo-600 dark:text-indigo-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered graph theory, traversal algorithms, and representations."
                        : score >= 9
                          ? "Excellent! Your understanding of graphs, BFS, DFS, and applications is strong."
                          : score >= 6
                            ? "Good effort! Review cycle detection, adjacency representations, and Dijkstra's algorithm."
                            : "Keep practicing! Focus on graph basics, BFS vs DFS differences, and adjacency list vs matrix."}
                    </p>
                    <QuizResultActions onRetry={handleRetry} />
                  </div>

                  {/* Detailed Breakdown */}
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

            {/* History */}
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

export default GraphQuiz;