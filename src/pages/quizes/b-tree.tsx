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
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleAnswer = (selected: string) => {
    setSelectedOption(selected);
    setUserAnswers((prevAnswers) => [...prevAnswers, selected]);
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
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on B-Trees</h2>
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

export default BTree;
