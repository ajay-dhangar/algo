import React, { useState } from "react";
import Layout from "@theme/Layout";
import QuizProgress from "./QuizProgress";

const AVLTreeQuiz: React.FC = () => {
  const questions = [
  {
    question: "1. What is an AVL tree?",
    options: [
      "A) A tree where all nodes have equal height",
      "B) A self-balancing binary search tree",
      "C) A tree with no duplicate values",
      "D) A complete binary tree"
    ],
    answer: "B) A self-balancing binary search tree",
    explanation: "An AVL tree is a self-balancing BST where the height difference between left and right subtrees (balance factor) is at most 1 for every node."
  },

  {
    question: "2. What is the balance factor of a node in an AVL tree?",
    options: [
      "A) Left subtree height + Right subtree height",
      "B) Left subtree height - Right subtree height",
      "C) Right subtree height - Left subtree height",
      "D) Height of the node"
    ],
    answer: "B) Left subtree height - Right subtree height",
    explanation: "Balance factor = height(left subtree) - height(right subtree). This value determines if the tree needs rebalancing."
  },

  {
    question: "3. What are the valid balance factor values in an AVL tree?",
    options: [
      "A) -2, -1, 0",
      "B) 0, 1, 2",
      "C) -1, 0, 1",
      "D) Any integer"
    ],
    answer: "C) -1, 0, 1",
    explanation: "AVL trees allow balance factors of -1, 0, or 1 only. Any value outside this range triggers a rotation to rebalance."
  },

  {
    question: "4. Which rotation is applied when a node is inserted into the right subtree of the right child?",
    options: [
      "A) Left-Left rotation",
      "B) Right-Right rotation",
      "C) Left-Right rotation",
      "D) Right-Left rotation"
    ],
    answer: "B) Right-Right rotation",
    explanation: "RR imbalance occurs when insertion is in the right subtree of the right child. A single left rotation on the unbalanced node fixes it."
  },

  {
    question: "5. What is the time complexity of search in an AVL tree?",
    options: [
      "A) O(n)",
      "B) O(n log n)",
      "C) O(log n)",
      "D) O(1)"
    ],
    answer: "C) O(log n)",
    explanation: "Since AVL trees are always balanced, the height is always O(log n), guaranteeing O(log n) search time."
  },

  {
    question: "6. Which rotation fixes a Left-Right imbalance?",
    options: [
      "A) Single right rotation",
      "B) Single left rotation",
      "C) Left rotation followed by right rotation",
      "D) Right rotation followed by left rotation"
    ],
    answer: "C) Left rotation followed by right rotation",
    explanation: "LR imbalance requires two rotations: first a left rotation on the left child, then a right rotation on the unbalanced node."
  },

  {
    question: "7. What is the minimum number of nodes in an AVL tree of height 3?",
    options: [
      "A) 4",
      "B) 5",
      "C) 6",
      "D) 7"
    ],
    answer: "D) 7",
    explanation: "Using the recurrence N(h) = N(h-1) + N(h-2) + 1, with N(0)=1, N(1)=2: N(2)=4, N(3)=7."
  },

  {
    question: "8. AVL trees are named after?",
    options: [
      "A) Adelson-Velsky and Landis",
      "B) Allen and Livingston",
      "C) Aho, Vitter and Leiserson",
      "D) None of the above"
    ],
    answer: "A) Adelson-Velsky and Landis",
    explanation: "AVL stands for Adelson-Velsky and Landis, the two Soviet inventors who introduced this data structure in 1962."
  },

  {
    question: "9. What is the worst-case height of an AVL tree with n nodes?",
    options: [
      "A) O(n)",
      "B) O(log n)",
      "C) O(n log n)",
      "D) O(√n)"
    ],
    answer: "B) O(log n)",
    explanation: "AVL trees guarantee O(log n) height even in the worst case due to mandatory rebalancing after every insert/delete."
  },

  {
    question: "10. Which of the following is NOT an advantage of AVL trees over regular BSTs?",
    options: [
      "A) Guaranteed O(log n) search",
      "B) Self-balancing",
      "C) Simpler implementation",
      "D) Better worst-case performance"
    ],
    answer: "C) Simpler implementation",
    explanation: "AVL trees are more complex to implement than regular BSTs due to rotation logic. The other options are genuine advantages."
  }
];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleAnswer = (selected: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(selected);
    setUserAnswers((prevAnswers) => [...prevAnswers, selected]);
    if (selected === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
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
    <Layout title="AVL Tree Quiz" description="Test your skills on the balancing properties of AVL Trees.">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Quiz on AVL Trees</h2>
          {!showResult && <QuizProgress current={currentQuestion} total={questions.length} />}
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

export default AVLTreeQuiz;
