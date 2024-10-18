import React, { useState } from "react";
import Layout from "@theme/Layout";

const BinarySearchTreeQuiz: React.FC = () => {
  const questions = [
    {
      question: "1. What is a binary search tree (BST)?",
      options: [
        "A) A tree where each node has at most two children.",
        "B) A tree where the left child is greater than the parent.",
        "C) A tree where the left child is less than the parent and the right child is greater.",
        "D) A tree where all nodes are on one side.",
      ],
      answer: "C) A tree where the left child is less than the parent and the right child is greater.",
    },
    {
      question: "2. What is the time complexity for searching an element in a balanced binary search tree?",
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
    },
    // Additional questions...
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = (selected: string) => {
    setSelectedOption(selected);
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Layout title="Binary Search Tree Quiz" description="Test your knowledge of binary search trees with this quiz!">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on Binary Search Trees</h2>
          {showResult ? (
            <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">
                Your Score: <span className="text-4xl">{score}</span> 🎉
              </h3>
              <p className="mt-4 text-lg">
                {score <= 5 ? "Better luck next time!" : score <= 8 ? "Good job!" : "Excellent work!"}
              </p>
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
                    className={`block w-full py-3 px-5 rounded-lg text-left border border-transparent transition-all duration-300 text-gray-800 dark:text-gray-100 ${
                      selectedOption === option
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
                className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white rounded-lg w-full transition-colors duration-300 border-none"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BinarySearchTreeQuiz;
