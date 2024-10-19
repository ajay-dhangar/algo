import React, { useState } from "react";
import Layout from "@theme/Layout";

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
    <Layout
      title="Binary Tree Quiz"
      description="Test your knowledge of binary trees with this quiz!"
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 dark:bg-gray-800">
        <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Quiz on Binary Trees
          </h2>
          {showResult ? (
            <div className="text-center mt-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Your Score:{" "}
                <span className="text-3xl font-bold text-blue-500 dark:text-blue-300">
                  {score}
                </span>{" "}
                🎉
              </h3>
              <p className="mt-4 text-gray-600 text-lg dark:text-gray-300">
                {score <= 5
                  ? "Better luck next time!"
                  : score <= 8
                  ? "Good job!"
                  : "Excellent work!"}
              </p>
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                Retry Quiz
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mt-4 text-left dark:text-gray-200">
                {questions[currentQuestion].question}
              </h3>
              <div className="mt-6 space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full px-4 py-2 text-left border-none rounded-lg text-gray-800 dark:text-gray-100 
                      ${
                        selectedOption === option
                          ? "bg-gray-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      } 
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                className="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors border-none"
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

export default BinaryTreeQuiz;
