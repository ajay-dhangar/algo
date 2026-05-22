import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import axios from "axios";

import QuestionProgress
from "../../components/Quiz/QuestionProgress";

import QuestionNavigator
from "../../components/Quiz/QuestionNavigator";

const BinaryTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: "1. What is the height of a binary tree with a single node?",
      options: ["A) 0", "B) 1", "C) 2", "D) Depends on the tree"],
      answer: "B) 1",
    },
    {
      question:
        "2. Which traversal of a binary tree visits nodes in the order: left, root, right?",
      options: [
        "A) Pre-order",
        "B) In-order",
        "C) Post-order",
        "D) Level-order",
      ],
      answer: "B) In-order",
    },
    {
      question:
        "3. In a binary tree, what is the maximum number of nodes at depth 'd'?",
      options: ["A) 2^d", "B) 2^(d+1) - 1", "C) 2d", "D) d^2"],
      answer: "A) 2^d",
    },
    // Average Questions
    {
      question:
        "4. What is the time complexity of searching for an element in a balanced binary search tree?",
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
    },
    {
      question:
        "5. Which of the following statements is true about a binary search tree?",
      options: [
        "A) The left subtree of a node contains only nodes with keys less than the node's key.",
        "B) The right subtree of a node contains only nodes with keys greater than the node's key.",
        "C) Both A and B.",
        "D) None of the above.",
      ],
      answer: "C) Both A and B.",
    },
    {
      question:
        "6. In a binary tree, which of the following properties is true for a complete binary tree?",
      options: [
        "A) All levels are completely filled except possibly the last level.",
        "B) All nodes are as far left as possible.",
        "C) All leaves are at the same level.",
        "D) A and B.",
      ],
      answer: "D) A and B.",
    },
    // Difficult Questions
    {
      question: "7. What is the maximum depth of a binary tree with 'n' nodes?",
      options: ["A) n", "B) log n", "C) n/2", "D) n - 1"],
      answer: "A) n",
    },
    {
      question:
        "8. Which of the following algorithms can be used to find the lowest common ancestor (LCA) in a binary tree?",
      options: [
        "A) Recursive approach",
        "B) Iterative approach",
        "C) Both A and B",
        "D) None of the above",
      ],
      answer: "C) Both A and B",
    },
    {
      question:
        "9. Which of the following traversal methods would give the nodes of a binary tree in descending order?",
      options: [
        "A) In-order traversal",
        "B) Pre-order traversal",
        "C) Post-order traversal",
        "D) Reverse in-order traversal",
      ],
      answer: "D) Reverse in-order traversal",
    },
    {
      question:
        "10. What is the worst-case time complexity for inserting an element in a binary search tree?",
      options: ["A) O(log n)", "B) O(n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(n)",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Custom states for persistence, timer, and history
  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem("quiz_userId");
    const storedName = localStorage.getItem("quiz_username");
    if (storedId && storedName) {
      setUserId(storedId);
      setUsername(storedName);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAttempts(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (showResult || !userId) return;
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult, userId]);

  const fetchAttempts = async (uId: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/quiz-attempts/${uId}/binary-tree`);
      if (res.data?.success) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching attempt history:", e);
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
  };

  const submitAttempt = async (finalAnswers: string[]) => {
    if (!userId) return;
    try {
      await axios.post("http://localhost:5000/api/quiz-attempts", {
        userId,
        quizId: "binary-tree",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Error submitting attempt:", e);
    }
  };

  const handleAnswer=(selected:string)=>{

 setSelectedOption(selected);

 const updatedAnswers=[...userAnswers];

 updatedAnswers[currentQuestion]=selected;

 setUserAnswers(updatedAnswers);

}

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      const finalAnswers = [...userAnswers];
      submitAttempt(finalAnswers);
    }
  };

  if (!userId) {
    return (
      <Layout title="Binary Tree Quiz" description="Test your knowledge of binary trees with this quiz!">
        <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md text-center border border-gray-100 dark:border-gray-700">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome to the Quiz!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Please enter your username to track your progress, save your attempts, and compete on the global leaderboard.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter username (e.g. JohnDoe)"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer border-none"
              >
                Let's Begin!
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Binary Tree Quiz"
      description="Test your knowledge of binary trees with this quiz!"
    >
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
            <span>Logged in as: <strong className="text-gray-900 dark:text-white">{username}</strong></span>
            <button onClick={handleLogout} className="text-red-500 hover:underline border-none bg-transparent cursor-pointer">Change User</button>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Quiz on Binary Tree</h2>

          <QuestionProgress
currentQuestion={currentQuestion}
totalQuestions={questions.length}
/>

<QuestionNavigator
questions={questions}
currentQuestion={currentQuestion}
userAnswers={userAnswers}
setCurrentQuestionIndex={setCurrentQuestion}
/>

          {!showResult && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-right">
              ⏱ Time: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </div>
          )}

          {showResult ? (
            <div>
              <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">
                  Your Score: <span className="text-4xl">{score}</span> 🎉
                </h3>
                <p className="mt-4 text-lg">
                  {score <= 5 ? "Better luck next time!" : score <= 8 ? "Good job!" : "Excellent work!"}
                </p>
              </div>

              {/* Solutions Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Solutions:</h3>
                {questions.map((q, index) => (
                  <div key={index} className="mb-6 text-left">
                    <p className="text-lg font-semibold">{q.question}</p>
                    <p className="text-md">
                      <span className="font-bold">Your Answer:</span> {userAnswers[index]}
                    </p>
                    <p className="text-md">
                      <span className="font-bold">Correct Answer:</span> {q.answer}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <span className="font-bold">Explanation:</span> {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 text-left">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`block w-full py-3 px-5 rounded-lg text-left border border-transparent transition-all duration-300 text-gray-800 dark:text-gray-100 ${selectedOption === option
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white rounded-lg w-full transition-colors duration-300 border-none cursor-pointer font-semibold"
              >
                Next Question
              </button>
            </div>
          )}

          {/* Attempts History */}
          {attempts.length > 0 && (
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-left w-full">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Attempt History:</h3>
              <div className="space-y-3">
                {attempts.map((att, index) => (
                  <div key={att.id || index} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(att.completedAt).toLocaleString()}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Attempt #{attempts.length - index}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {att.score} / {att.totalQuestions} ({Math.round((att.score / att.totalQuestions) * 100)}%)
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Time spent: {Math.floor(att.timeSpent / 60)}m {att.timeSpent % 60}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default BinaryTreeQuiz;
