import React, { useState } from "react";
import Layout from "@theme/Layout";

import QuestionProgress
from "../../components/Quiz/QuestionProgress";

import QuestionNavigator
from "../../components/Quiz/QuestionNavigator";

import QuizResultActions from "../../components/Quiz/QuizResultActions";

const AVLTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: "1. What is the key property of an AVL tree?",
      options: [
        "A) All nodes have at most 2 children",
        "B) The height difference between left and right subtrees is at most 1",
        "C) All leaf nodes are at the same level",
        "D) The tree is a complete binary tree",
      ],
      answer: "B) The height difference between left and right subtrees is at most 1",
      explanation: "An AVL tree is a self-balancing BST where the balance factor (height difference) of any node is at most 1.",
    },
    {
      question: "2. What is the balance factor of a node in an AVL tree?",
      options: [
        "A) Height of left subtree - Height of right subtree",
        "B) Height of right subtree - Height of left subtree",
        "C) Height of left subtree + Height of right subtree",
        "D) Number of left children - Number of right children",
      ],
      answer: "A) Height of left subtree - Height of right subtree",
      explanation: "Balance factor = height(left subtree) - height(right subtree). For AVL trees, this must be -1, 0, or 1.",
    },
    {
      question: "3. Which rotation is used when a node's left child's left subtree becomes too tall?",
      options: ["A) Left rotation", "B) Right rotation", "C) Left-Right rotation", "D) Right-Left rotation"],
      answer: "B) Right rotation",
      explanation: "Left-Left case requires a right rotation to rebalance the tree.",
    },
    // Average Questions
    {
      question: "4. What is the time complexity for search operations in an AVL tree with n nodes?",
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
      explanation: "AVL trees maintain balance, ensuring logarithmic height and thus O(log n) search complexity.",
    },
    {
      question: "5. What is the maximum height of an AVL tree with 7 nodes?",
      options: ["A) 2", "B) 3", "C) 4", "D) 5"],
      answer: "B) 3",
      explanation: "An AVL tree with 7 nodes can have a maximum height of 3 due to its balancing properties.",
    },
    {
      question: "6. Which of the following is NOT a valid balance factor in an AVL tree?",
      options: ["A) 0", "B) 1", "C) -1", "D) 2"],
      answer: "D) 2",
      explanation: "Valid balance factors in AVL trees are -1, 0, and 1. A balance factor of 2 violates the AVL property.",
    },
    // Difficult Questions
    {
      question: "7. In an AVL tree insertion, when do we need a Left-Right rotation?",
      options: [
        "A) When the left child has a right-heavy subtree",
        "B) When the right child has a left-heavy subtree",
        "C) When the left child has a left-heavy subtree",
        "D) When the root node becomes unbalanced",
      ],
      answer: "A) When the left child has a right-heavy subtree",
      explanation: "Left-Right case occurs when a node is left-heavy but its left child is right-heavy, requiring two rotations.",
    },
    {
      question: "8. What is the worst-case time complexity for insertion in an AVL tree with n nodes?",
      options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"],
      answer: "B) O(log n)",
      explanation: "AVL tree insertion is O(log n) including rebalancing operations in the worst case.",
    },
    {
      question: "9. How many rotations are needed at most during a single insertion in an AVL tree?",
      options: ["A) 1", "B) 2", "C) O(log n)", "D) O(n)"],
      answer: "B) 2",
      explanation: "At most 2 rotations (double rotation) are needed to rebalance an AVL tree after a single insertion.",
    },
    {
      question: "10. What is the relationship between an AVL tree and a Red-Black tree?",
      options: [
        "A) They are the same structure",
        "B) Both are self-balancing BSTs",
        "C) AVL trees are always faster",
        "D) Red-Black trees require more rotations",
      ],
      answer: "B) Both are self-balancing BSTs",
      explanation: "Both AVL and Red-Black trees are self-balancing binary search trees with different balancing strategies.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Derived state: eliminates score desync and selectedOption carry-over bugs
  const selectedOption = userAnswers[currentQuestion] || null;
  const score = userAnswers.reduce(
    (acc, answer, index) => (answer === questions[index]?.answer ? acc + 1 : acc),
    0
  );

  const handleAnswer = (selected: string) => {
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestion] = selected;
      return updatedAnswers;
    });
  };

  const nextQuestion = () => {
    if (!selectedOption) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  return (
    <Layout
      title="AVL Tree Quiz"
      description="Test your knowledge of AVL trees with this interactive quiz!"
    >
      <div className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on AVL Trees</h2>

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

              <QuizResultActions onRetry={handleRetry} />

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
                    className={`block w-full py-3 px-5 rounded-lg text-left border border-transparent transition-all duration-300 text-gray-800 dark:text-gray-100 ${
                      selectedOption === option
                        ? "bg-purple-600 text-white dark:bg-purple-500"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                disabled={selectedOption === null}
                className={`mt-6 py-2 px-4 text-white rounded-lg w-full transition-colors duration-300 border-none ${selectedOption === null
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400"
                  }`}
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

export default AVLTreeQuiz;
