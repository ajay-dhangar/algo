import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaServer,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaHistory
} from "react-icons/fa";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";

import QuestionProgress from "../../components/Quiz/QuestionProgress";
import QuestionNavigator from "../../components/Quiz/QuestionNavigator";
import QuizResultActions from "../../components/Quiz/QuizResultActions";

interface ExternalHashingQuestion {
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

const QUESTIONS: ExternalHashingQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    question: "What distinguishes 'External Hashing' from standard in-memory hashing?",
    options: [
      "A) External hashing only works with text files, never with numeric data",
      "B) External hashing is designed for data stored on disk, organizing records into disk-block-sized buckets rather than assuming everything fits in memory",
      "C) External hashing does not use a hash function at all",
      "D) External hashing is identical to in-memory hashing with no practical differences"
    ],
    answer: "B) External hashing is designed for data stored on disk, organizing records into disk-block-sized buckets rather than assuming everything fits in memory",
    explanation: "External hashing extends hashing concepts to disk-resident data, where buckets are sized to align with disk blocks. This minimizes the number of disk I/O operations needed to locate or store a record, which is the primary performance bottleneck for on-disk structures."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "What is a 'Bucket' in the context of external hashing?",
    options: [
      "A) A temporary in-memory cache that is never written to disk",
      "B) A unit of storage, typically the size of one or more disk blocks, that holds multiple records hashed to the same location",
      "C) A single record stored anywhere on disk",
      "D) An index entry that points to the root of a B-Tree"
    ],
    answer: "B) A unit of storage, typically the size of one or more disk blocks, that holds multiple records hashed to the same location",
    explanation: "A bucket in external hashing corresponds to one or more disk blocks. The hash function maps a key to a specific bucket, and that entire bucket (potentially containing multiple records) is read or written as a unit during disk I/O."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "Why does external hashing organize data into disk-block-aligned buckets rather than individual disk-addressed records?",
    options: [
      "A) Because disk I/O is performed in block-sized units, so aligning buckets with blocks minimizes the number of I/O operations needed per access",
      "B) Because disk drives cannot read individual records under any circumstances",
      "C) Block alignment has no effect on performance",
      "D) Because hash functions require block-sized inputs to function correctly"
    ],
    answer: "A) Because disk I/O is performed in block-sized units, so aligning buckets with blocks minimizes the number of I/O operations needed per access",
    explanation: "Disk drives read and write data in fixed-size blocks regardless of how much of that block is actually needed. By sizing buckets to match block boundaries, external hashing ensures that retrieving a bucket requires only a single disk I/O operation."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "What happens when a bucket in external hashing becomes full and a new record needs to be inserted into it?",
    options: [
      "A) The new record is automatically discarded",
      "B) An overflow block is allocated and linked to the original bucket, holding records that exceed the bucket's primary capacity",
      "C) The entire database is shut down for maintenance",
      "D) The record is converted into a different data type"
    ],
    answer: "B) An overflow block is allocated and linked to the original bucket, holding records that exceed the bucket's primary capacity",
    explanation: "When a primary bucket reaches capacity, external hashing schemes typically chain an overflow block to it. The new record is placed in this overflow block, which is linked from the primary bucket — though excessive overflow chaining degrades performance, similar to ISAM's overflow pages."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "What is the main performance goal of external hashing, given that disk I/O is much slower than memory access?",
    options: [
      "A) Minimizing the number of disk block accesses required to locate or store a record",
      "B) Maximizing the number of disk reads performed per query",
      "C) Ensuring every record requires a full disk scan",
      "D) Avoiding the use of any indexing structures whatsoever"
    ],
    answer: "A) Minimizing the number of disk block accesses required to locate or store a record",
    explanation: "Since each disk I/O operation is orders of magnitude slower than an in-memory operation, external hashing is specifically designed to compute a record's likely bucket and retrieve it in as few disk block reads as possible — ideally just one."
  },
  {
    id: 6,
    difficulty: "Medium",
    question: "How does the choice of bucket size in external hashing affect the trade-off between space utilization and overflow frequency?",
    options: [
      "A) Bucket size has no effect on either space utilization or overflow",
      "B) Larger buckets reduce overflow frequency (more room per bucket) but may waste space if buckets are often underfilled; smaller buckets use space more precisely but overflow more frequently under uneven data distribution",
      "C) Bucket size only affects in-memory hashing, never external/disk-based hashing",
      "D) Smaller buckets always perform strictly better than larger buckets in every case"
    ],
    answer: "B) Larger buckets reduce overflow frequency (more room per bucket) but may waste space if buckets are often underfilled; smaller buckets use space more precisely but overflow more frequently under uneven data distribution",
    explanation: "Bucket size is a tunable trade-off: larger buckets tolerate more keys hashing to the same location before overflowing, but consume more space per bucket (especially if many buckets are sparsely filled). Smaller buckets are more space-efficient on average but are more prone to overflow when key distribution isn't perfectly uniform."
  },
  {
    id: 7,
    difficulty: "Medium",
    question: "What is a key disadvantage of excessive overflow chaining in external hashing, in terms of disk I/O cost?",
    options: [
      "A) There is no disadvantage; overflow chains are always resolved in a single disk access",
      "B) Each additional overflow block in a chain requires a separate disk access to traverse, so a long overflow chain can turn what should be a single-I/O lookup into multiple sequential disk reads",
      "C) Overflow chains automatically convert into B-Trees to avoid this problem",
      "D) Overflow chaining eliminates the need for a hash function entirely"
    ],
    answer: "B) Each additional overflow block in a chain requires a separate disk access to traverse, so a long overflow chain can turn what should be a single-I/O lookup into multiple sequential disk reads",
    explanation: "The core efficiency goal of external hashing — one disk access per lookup — breaks down when overflow chains grow long, since each overflow block typically resides at a different disk location, requiring an additional I/O operation to follow each link in the chain."
  },
  {
    id: 8,
    difficulty: "Medium",
    question: "How can extendible or linear hashing techniques specifically benefit external (disk-based) hashing systems?",
    options: [
      "A) They provide no benefit to disk-based systems; they only apply to in-memory structures",
      "B) By dynamically growing the number of buckets as data increases, they reduce the likelihood and length of overflow chains, keeping average disk I/O per lookup closer to the ideal single access",
      "C) They guarantee that overflow chaining will never occur under any circumstances",
      "D) They eliminate the need for bucket-based storage entirely"
    ],
    answer: "B) By dynamically growing the number of buckets as data increases, they reduce the likelihood and length of overflow chains, keeping average disk I/O per lookup closer to the ideal single access",
    explanation: "Applying dynamic hashing schemes (extendible or linear hashing) to external/disk-based storage allows the bucket count to scale with data volume, which directly reduces overflow chain length and helps preserve the near-single-I/O performance that makes hashing attractive for disk storage."
  },
  {
    id: 9,
    difficulty: "Medium",
    question: "Why is choosing a hash function with good 'uniformity' (even key distribution across buckets) especially critical in external hashing compared to in-memory hashing?",
    options: [
      "A) Uniformity doesn't matter for external hashing since disk space is unlimited",
      "B) Because uneven distribution causes some buckets to overflow heavily (triggering extra costly disk I/O for overflow chains) while others remain underutilized, and disk I/O penalties are far more severe than in-memory access penalties",
      "C) External hashing never uses a hash function, so uniformity is irrelevant",
      "D) Uniformity only matters when using static hashing, never with dynamic hashing"
    ],
    answer: "B) Because uneven distribution causes some buckets to overflow heavily (triggering extra costly disk I/O for overflow chains) while others remain underutilized, and disk I/O penalties are far more severe than in-memory access penalties",
    explanation: "While poor hash distribution is undesirable in any hashing scheme, its consequences are magnified in external hashing: an overflowing bucket means additional disk I/O (orders of magnitude slower than memory access), making uniform key distribution a much higher-stakes design consideration for disk-based systems."
  },
  {
    id: 10,
    difficulty: "Hard",
    question: "In a distributed database system using external hashing across multiple disk-based storage nodes, what additional challenge arises when the system needs to dynamically add or remove storage nodes?",
    options: [
      "A) There is no additional challenge; hashing automatically redistributes across all nodes without any data movement",
      "B) A naive hash function would require most of the data to be relocated and rehashed across nodes whenever the node count changes; techniques like consistent hashing minimize this disruption",
      "C) Distributed external hashing is functionally identical to single-disk external hashing with no added complexity",
      "D) Adding or removing nodes is impossible once data has been hashed"
    ],
    answer: "B) A naive hash function would require most of the data to be relocated and rehashed across nodes whenever the node count changes; techniques like consistent hashing minimize this disruption",
    explanation: "A simple modulo-based hash (key % number_of_nodes) would cause nearly all keys to map to different nodes whenever the node count changes, triggering massive data movement. Consistent hashing addresses this by ensuring that adding or removing a node only affects a small, bounded fraction of keys, making it the standard approach for distributed hashing-based storage systems."
  },
  {
    id: 11,
    difficulty: "Hard",
    question: "How might a hybrid approach combining external hashing with a secondary structure (e.g., a small in-memory B+ Tree cache of frequently accessed buckets) improve overall system performance?",
    options: [
      "A) Hybrid approaches provide no measurable benefit over pure hashing or pure tree-based approaches",
      "B) Frequently accessed buckets can be cached in memory, avoiding repeated disk I/O for hot data, while the on-disk hash structure still efficiently handles the long tail of less-frequently accessed records",
      "C) Combining structures always doubles the storage requirements with no performance benefit",
      "D) Hybrid approaches are only theoretical and have no practical real-world application"
    ],
    answer: "B) Frequently accessed buckets can be cached in memory, avoiding repeated disk I/O for hot data, while the on-disk hash structure still efficiently handles the long tail of less-frequently accessed records",
    explanation: "Many real-world database systems use exactly this kind of hybrid: an in-memory cache (sometimes structured as a tree or simple LRU map) absorbs the most frequent lookups, dramatically reducing average disk I/O, while the underlying external hash structure remains responsible for the complete dataset, handling cache misses with its normal bucket-based access pattern."
  },
  {
    id: 12,
    difficulty: "Hard",
    question: "When analyzing the performance of external hashing under a heavy insertion workload with overflow chaining, what is the relationship between load factor and expected disk I/O count per operation?",
    options: [
      "A) Load factor has no measurable relationship to disk I/O count",
      "B) As load factor (ratio of records to total bucket capacity) increases, the expected number of overflow blocks per chain grows, increasing the expected number of disk I/O operations needed per insertion or lookup",
      "C) Disk I/O count always remains exactly 1 regardless of load factor",
      "D) Increasing load factor always decreases the number of disk I/O operations required"
    ],
    answer: "B) As load factor (ratio of records to total bucket capacity) increases, the expected number of overflow blocks per chain grows, increasing the expected number of disk I/O operations needed per insertion or lookup",
    explanation: "Load factor directly correlates with overflow chain length: as more records compete for the same fixed bucket capacity, overflow blocks accumulate, and each one adds a potential extra disk I/O to traverse during a lookup or insertion. This is precisely why dynamic hashing schemes monitor and control load factor — keeping it within a target range preserves the near-O(1) disk I/O performance external hashing aims to provide."
  }
];

const ExternalHashingQuiz: React.FC = () => {
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
      const res = await axios.get(buildApiUrl(apiBaseUrl, `/api/quiz-attempts/${uId}/external-hashing`));
      if (res.data?.success && Array.isArray(res.data.attempts)) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching external hashing quiz history:", e);
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
        quizId: "external-hashing",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Failed to submit external hashing quiz attempt:", e);
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
      <Layout title="External Hashing Quiz" description="Test your knowledge of bucket organization, disk block management, overflow handling, and performance.">
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-14 h-14 bg-lime-500/10 text-lime-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border border-solid border-lime-500/20">
              <FaServer />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0 mb-2">External Hashing Quiz</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 mb-6 font-medium leading-relaxed">
              Test your knowledge of bucket organization, disk block management, overflow handling, and disk-based performance analysis.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your identifier to begin"
                aria-label="Enter your identifier to begin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                maxLength={24}
                className="w-full px-4 py-3 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-lime-500 text-sm font-semibold transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-white font-bold rounded-xl border-none transition-all cursor-pointer text-sm shadow-xs"
              >
                Start External Hashing Quiz
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="External Hashing Quiz — Disk Buckets & Overflow">
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solid border-lime-200 dark:border-lime-950/40 bg-lime-500/5 hover:bg-lime-500/10 text-lime-600 dark:text-lime-400 text-xs font-bold transition-all cursor-pointer"
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
                      <div className="text-base font-mono font-bold text-lime-600 dark:text-lime-400">
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
                            ? "bg-lime-500/10 text-lime-600 border-lime-500/20"
                            : "bg-lime-500/10 text-lime-600 border-lime-500/20"
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
                              ? "bg-lime-600 border-lime-600 text-white shadow-xs"
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
                    <div className="inline-flex items-baseline gap-1 text-5xl font-mono font-black text-lime-600 dark:text-lime-500">
                      {score}
                      <span className="text-xl text-slate-400 font-sans font-normal">/ {QUESTIONS.length}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 mb-6 max-w-md mx-auto leading-relaxed">
                      {score === QUESTIONS.length
                        ? "Perfect score! You have mastered external hashing, bucket organization, and disk I/O trade-offs."
                        : score >= 9
                          ? "Excellent! Your understanding of external hashing is strong."
                          : score >= 6
                            ? "Good effort! Review bucket/overflow block organization and how load factor affects disk I/O."
                            : "Keep practicing! Focus on why disk-block-aligned buckets matter and how overflow chains impact performance."}
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
                            <span className={`text-base shrink-0 ${isCorrect ? "text-emerald-500" : "text-lime-500"}`}>
                              {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                            <div className={`p-2.5 rounded-lg border border-solid ${isCorrect ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-lime-500/5 border-lime-500/10 text-lime-700 dark:text-lime-400"}`}>
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
                          <div className="font-mono font-black text-sm text-lime-600 dark:text-lime-400">
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

export default ExternalHashingQuiz;
