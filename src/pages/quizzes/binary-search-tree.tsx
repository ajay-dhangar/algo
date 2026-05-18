import React, { useState } from "react";
import Layout from "@theme/Layout";
import QuizProgress from "./QuizProgress";

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
      explanation: "In a BST, each node's left child is less than the node, and the right child is greater, maintaining the sorted order.",
    },
    {
      question: "2. What is the time complexity for searching an element in a balanced binary search tree?",
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
      explanation: "In a balanced BST, the height of the tree is log(n), making search operations efficient at O(log n).",
    },
    {
      question: "3. What is the worst-case time complexity for searching in an unbalanced BST?",
      options: ["A) O(log n)", "B) O(n log n)", "C) O(n)", "D) O(1)"],
      answer: "C) O(n)",
      explanation: "In the worst case, a BST can degenerate into a linked list, making search O(n).",
    },
    {
      question: "4. Which traversal of a BST gives elements in sorted order?",
      options: ["A) Pre-order", "B) Post-order", "C) In-order", "D) Level-order"],
      answer: "C) In-order",
      explanation: "In-order traversal (left → root → right) visits nodes in ascending sorted order in a BST.",
    },
    {
      question: "5. What happens when you delete a node with two children in a BST?",
      options: ["A) The node is simply removed", "B) It is replaced by its in-order successor or predecessor", "C) The entire subtree is deleted", "D) The tree is rebuilt"],
      answer: "B) It is replaced by its in-order successor or predecessor",
      explanation: "When deleting a node with two children, it is replaced by its in-order successor (smallest in right subtree) or predecessor.",
    },
    {
      question: "6. Which of the following is a valid BST?",
      options: ["A) Root=5, Left=7, Right=3", "B) Root=5, Left=3, Right=7", "C) Root=5, Left=3, Right=4", "D) Root=5, Left=6, Right=7"],
      answer: "B) Root=5, Left=3, Right=7",
      explanation: "In a valid BST, all left children must be less than the root and all right children must be greater.",
    },
    {
      question: "7. What is the time complexity of inserting an element into a balanced BST?",
      options: ["A) O(1)", "B) O(n)", "C) O(n log n)", "D) O(log n)"],
      answer: "D) O(log n)",
      explanation: "Insertion in a balanced BST follows the tree height, which is O(log n).",
    },
    {
      question: "8. Which of the following is NOT a self-balancing BST?",
      options: ["A) AVL Tree", "B) Red-Black Tree", "C) Binary Heap", "D) Splay Tree"],
      answer: "C) Binary Heap",
      explanation: "A Binary Heap is not a BST at all — it satisfies the heap property, not the BST ordering property.",
    },
    {
      question: "9. What is the minimum number of nodes in a BST of height h?",
      options: ["A) h", "B) h + 1", "C) 2h", "D) 2h - 1"],
      answer: "B) h + 1",
      explanation: "The minimum nodes occur when every level has exactly one node, giving h + 1 total nodes.",
    },
    {
      question: "10. In a BST, where is the largest element always found?",
      options: ["A) Root", "B) Leftmost node", "C) Rightmost node", "D) Last level"],
      answer: "C) Rightmost node",
      explanation: "In a BST, the rightmost node is always the largest since every right child is greater than its parent.",
    },
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
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Layout title="Binary Search Tree Quiz" description="Test your knowledge of binary search trees with this quiz!">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Quiz on Binary Search Trees</h2>
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

export default BinarySearchTreeQuiz;
