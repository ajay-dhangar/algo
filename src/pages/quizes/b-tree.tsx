import React, { useState } from "react";
import Layout from "@theme/Layout";

const BTree: React.FC = () => {
  const questions = [
    {
      question: "1. What is a B-Tree?",
      options: [
        "A) A binary search tree that is balanced.",
        "B) A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.",
        "C) A type of tree that only allows three children per node.",
        "D) A tree used exclusively for storing strings.",
      ],
      answer:
        "B) A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.",
    },
    {
      question: "2. What is the minimum degree of a B-Tree?",
      options: [
        "A) The minimum number of keys a node can contain.",
        "B) The maximum number of children a node can have.",
        "C) The maximum number of keys a node can contain.",
        "D) The number of levels in the tree.",
      ],
      answer: "A) The minimum number of keys a node can contain.",
    },
    {
      question:
        "3. In a B-Tree, each node can have a maximum of how many children?",
      options: ["A) 2", "B) 3", "C) 2t", "D) t"],
      answer: "C) 2t",
    },
    {
      question:
        "4. What is the main advantage of using a B-Tree over a binary search tree?",
      options: [
        "A) Faster search times.",
        "B) Less memory usage.",
        "C) Better balance and reduced height.",
        "D) Simplicity of implementation.",
      ],
      answer: "C) Better balance and reduced height.",
    },
    {
      question:
        "5. When inserting into a B-Tree, what happens if a node exceeds the maximum number of keys?",
      options: [
        "A) The node is deleted.",
        "B) The tree is restructured.",
        "C) The node is split into two nodes.",
        "D) No action is taken.",
      ],
      answer: "C) The node is split into two nodes.",
    },
    {
      question: "6. What does it mean for a B-Tree to be balanced?",
      options: [
        "A) All leaves are at the same depth.",
        "B) The number of keys in each node is equal.",
        "C) Each node contains the same number of children.",
        "D) The tree is a complete binary tree.",
      ],
      answer: "A) All leaves are at the same depth.",
    },
    {
      question: "7. How is deletion handled in a B-Tree?",
      options: [
        "A) Simply remove the key from the node.",
        "B) Reorganize keys within the node only.",
        "C) It may require borrowing a key from a sibling or merging nodes.",
        "D) Deletion is not allowed in B-Trees.",
      ],
      answer:
        "C) It may require borrowing a key from a sibling or merging nodes.",
    },
    {
      question: "8. Which of the following properties is NOT true for B-Trees?",
      options: [
        "A) All leaf nodes are at the same level.",
        "B) Each internal node has at least t-1 keys.",
        "C) The root node can have fewer than t keys.",
        "D) Every node can have an arbitrary number of children.",
      ],
      answer: "D) Every node can have an arbitrary number of children.",
    },
    {
      question: "9. In which applications are B-Trees commonly used?",
      options: [
        "A) In-memory data structures.",
        "B) File systems and databases.",
        "C) Simple data retrieval tasks.",
        "D) Small data storage.",
      ],
      answer: "B) File systems and databases.",
    },
    {
      question:
        "10. What is the relationship between the height of a B-Tree and its order?",
      options: [
        "A) The height increases as the order increases.",
        "B) The height decreases as the order increases.",
        "C) The height is independent of the order.",
        "D) The height and order are always equal.",
      ],
      answer: "B) The height decreases as the order increases.",
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
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      setShowResult(true);
    }
  };

  return (
    <Layout
      title="Quiz on B-Trees"
      description="Test your knowledge of B-Trees with this quiz!"
    >
      <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xl transition-colors duration-300">
          <h2 className="text-2xl font-bold text-center mb-4">
            Quiz on B-Trees
          </h2>
          {showResult ? (
            <div className="text-center mt-6">
              <h3 className="text-2xl font-semibold">
                Your Score:{" "}
                <span className="text-green-500 dark:text-green-400">
                  {score}
                </span>{" "}
                🎉
              </h3>
              <p className="mt-4 text-lg">
                {score <= 5
                  ? "Better luck next time!"
                  : score <= 8
                  ? "Good job!"
                  : "Excellent work!"}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium mb-4">
                {questions[currentQuestion].question}
              </h3>
              <div className="flex flex-col space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors text-left text-gray-800 dark:text-gray-100 ${
                      selectedOption === option
                        ? "bg-gray-600 text-white dark:bg-gray-500" 
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 rounded-lg w-full transition-colors duration-300 text-white font-semibold border-none"
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

export default BTree;
