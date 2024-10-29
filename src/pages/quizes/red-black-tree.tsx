import React, { useState } from "react";
import Layout from "@theme/Layout";

const RedBlackTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1. What is a Red-Black Tree?
        </>
      ),
      options: [
        "A) A binary search tree with additional color properties.",
        "B) A tree that only allows red nodes.",
        "C) A tree where all nodes are black.",
        "D) A tree with no duplicate values.",
      ],
      answer: "A) A binary search tree with additional color properties.",
    },
    {
      question: (
        <>
          2. What are the two colors used in a Red-Black Tree?
        </>
      ),
      options: [
        "A) Red and Blue",
        "B) Black and White",
        "C) Red and Black",
        "D) Green and Yellow",
      ],
      answer: "C) Red and Black",
    },
    {
      question: (
        <>
          3. What is the maximum height of a Red-Black Tree with n nodes?
        </>
      ),
      options: [
        "A) O(n)",
        "B) O(log n)",
        "C) O(2 log n)",
        "D) O(sqrt(n))",
      ],
      answer: "B) O(log n)",
    },
    // Average Questions
    {
      question: (
        <>
          4. Which of the following properties must be true for a Red-Black Tree?
        </>
      ),
      options: [
        "A) The root must be red.",
        "B) Red nodes cannot have red children.",
        "C) All leaves are red.",
        "D) Every path from a node to its leaves must have the same number of red nodes.",
      ],
      answer: "B) Red nodes cannot have red children.",
    },
    {
      question: (
        <>
          5. What is the role of rotations in Red-Black Trees?
        </>
      ),
      options: [
        "A) To delete nodes.",
        "B) To maintain the balance of the tree.",
        "C) To insert nodes.",
        "D) To traverse the tree.",
      ],
      answer: "B) To maintain the balance of the tree.",
    },
    {
      question: (
        <>
          6. When a new node is inserted into a Red-Black Tree, what color is it initially?
        </>
      ),
      options: [
        "A) Red",
        "B) Black",
        "C) Blue",
        "D) Green",
      ],
      answer: "A) Red",
    },
    // Difficult Questions
    {
      question: (
        <>
          7. In a Red-Black Tree, how do you ensure that the tree remains balanced after an insertion?
        </>
      ),
      options: [
        "A) By performing rotations and recoloring nodes.",
        "B) By deleting the inserted node.",
        "C) By adjusting the tree's height.",
        "D) By increasing the tree's depth.",
      ],
      answer: "A) By performing rotations and recoloring nodes.",
    },
    {
      question: (
        <>
          8. Which of the following scenarios requires a right rotation in a Red-Black Tree?
        </>
      ),
      options: [
        "A) Inserting a red node in the left subtree of a left child.",
        "B) Inserting a red node in the right subtree of a right child.",
        "C) Inserting a red node in the right subtree of a left child.",
        "D) Inserting a black node.",
      ],
      answer: "A) Inserting a red node in the left subtree of a left child.",
    },
    {
      question: (
        <>
          9. What happens if a Red-Black Tree property is violated during an insertion?
        </>
      ),
      options: [
        "A) The tree is deleted.",
        "B) The tree is rebalanced.",
        "C) The insertion is aborted.",
        "D) No action is taken.",
      ],
      answer: "B) The tree is rebalanced.",
    },
    {
      question: (
        <>
          10. What is the primary advantage of using a Red-Black Tree over a regular Binary Search Tree?
        </>
      ),
      options: [
        "A) It requires less memory.",
        "B) It guarantees O(log n) time complexity for insertions, deletions, and searches.",
        "C) It can store duplicate values.",
        "D) It allows for faster traversals.",
      ],
      answer: "B) It guarantees O(log n) time complexity for insertions, deletions, and searches.",
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
    <Layout title="Quiz on Red-Black Trees" description="Challenge your understanding of the properties and algorithms of Red-Black Trees.">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on Red-Black Trees</h2>
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

export default RedBlackTreeQuiz;
