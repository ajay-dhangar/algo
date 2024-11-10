import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";

const DataStructuresQuiz = () => {
  const questions = [
    {
      question:
        "1. Which of the following statement is true about Red-Black Tree?",
      options: ["P1 & P4", "P2 & P3", "P1 & P3", "P1 & P2"],
      answer: "P1 & P2",
    },
    {
      question:
        "2. The condition in which Red-Black trees are preferred over AVL trees?",
      options: [
        "When tree must be balanced",
        "When tree must be balanced",
        "When tree must be sorted",
        "When there are more insertions or deletions",
      ],
      answer: "When there are more insertions or deletions",
    },
    {
      question:
        "3. A self-balancing binary search tree that optimizes for insertions and deletions rather than strict balance is called:",
      options: ["AVL tree", "Red-Black tree", "Splay tree", "B + Tree"],
      answer: "Red-Black tree",
    },
    {
      question:
        "4. ________is an advanced data structure based on a trie that is optimized for palindromic strings.",
      options: ["Splay Tree", "B tree", "AVL tree", "Palindromic tree"],
      answer: "Palindromic tree",
    },
    {
      question: "5. Which of the following statements about Tries is false?",
      options: [
        "Tries are space-efficient compared to hash tables.",
        "Tries can efficiently perform prefix searches.",
        "Tries are typically used for searching in sorted arrays.",
        "Tries can handle large dictionaries efficiently.",
      ],
      answer: "Tries are typically used for searching in sorted arrays.",
    },
    {
      question: "6. Which of the following statement is true for an AVL tree?",
      options: [
        "The AVL tree must be a B-tree",
        "The AVL tree must be a Binary Search Tree.",
        "The difference between the heights of left and right subtrees for any node cannot be more than one.",
        "The AVL Tree is a self-balancing tree.",
      ],
      answer: "P2, P3 And P4.",
    },
    {
      question:
        "7. What makes an XOR Linked list better than an ordinary linked List?",
      options: [
        "XOR linked list uses more memory",
        "XOR linked list uses less time",
        "XOR linked list uses less memory than an ordinary Linked list",
        "None",
      ],
      answer: "XOR linked list uses less memory than an ordinary Linked list",
    },
    {
      question:
        "8. What is the time complexity taken by Red-Black Tree in insertion, deletion, and searching Operations?",
      options: ["O(N)", "O(1)", "O(h)", "O(LogN)"],
      answer: "O(LogN)",
    },
    {
      question:
        "9. Which operation is used to fix violations in a Red-Black Tree after a node deletion?",
      options: ["Trimming", "Recoloring", "Balancing", "None"],
      answer: "Recoloring",
    },
    {
      question: "10. What is the main disadvantage of using a Trie?",
      options: [
        "High memory usage for certain datasets.",
        "Slow search speed for long strings",
        "Limited support for non-string data types.",
        "Difficulty in insertion and deletion operations.",
      ],
      answer: "High memory usage for certain datasets.",
    },
    {
      question:
        "11. What is the time complexity for searching an element in the Trie?",
      options: ["O(1)", "O(LogN)", "O(N)", "O(N^2)"],
      answer: "O(N)",
    },
    {
      question:
        "12. What should be placed in the below blank space to complete the find function in Disjoint set?",
      options: ["i", "0", "find(i)", "find(parent[i])"],
      answer: "find(parent[i])",
    },
    {
      question:
        "13. What is the main purpose of the disjoint-set data structure?",
      options: [
        "To efficiently find the maximum element in a set",
        "To quickly find the minimum element in a set",
        "To efficiently perform union and find operations on disjoint sets",
        "To optimize searching in a sorted list",
      ],
      answer:
        "To efficiently perform union and find operations on disjoint sets",
    },
    {
      question:
        "14. A suffix array can be constructed from____ traversal of the suffix tree.",
      options: [
        "Breadth-first - search",
        "Depth-first - search",
        "Level- order",
        "None",
      ],
      answer: "Depth-first - search",
    },
    {
      question:
        "15. Which of the following statements are true about Trie Data structure?",
      options: [
        "P1: There is one root node in each Trie.",
        "P2: Each path from the root to any node represents a word or string.",
        "P3: We can not do prefix search (or auto-complete) with Trie.",
        "P4: There is no overhead of Hash functions in a Trie data structure.",
      ],
      answer: "P1, P2 and P4",
    },
    {
      question: "16. What is a generic tree?",
      options: [
        "A tree in which each node has at most two children.",
        "A tree in which all nodes have the same value.",
        "A tree in which each node can have an arbitrary number of children",
        "A tree with no cycles.",
      ],
      answer:
        "A tree in which each node can have an arbitrary number of children",
    },
    {
      question: "17. Which of the following is rotation in splay tree?",
      options: [
        "Zig- Zag Rotation",
        "Zag Rotation",
        "Zag - Zag Rotation",
        "All of these",
      ],
      answer: "All of these",
    },
    {
      question:
        "18. Unlike trie(standard) data structure where each node contains 26 pointers for its children, each node in a ternary search tree contains ________ pointers:",
      options: ["Only 2", "Only 3", "Only 1", "None"],
      answer: "Only 3",
    },
    {
      question:
        "19. Path Compression algorithm used in the Union-Find (Disjoint-Set) data structure, performs in which of the following operations?",
      options: [
        "Create operation",
        "Insert operation",
        "Find operation",
        "Delete operation",
      ],
      answer: "Find operation",
    },
    {
      question: "20. Which of the following is the application of the Trie?",
      options: [
        "Integer arithmetic operations.",
        "Pattern Searching",
        "Sorting and merging large datasets.",
        "Implementation of Heap",
      ],
      answer: "Pattern Searching",
    },
    {
      question:
        "21. Which of the following is true about persistence data structure?",
      options: [
        "The data structure should be sorted.",
        "Insertion is done in O(1)",
        "Always stores the previous data",
        "None",
      ],
      answer: "Always stores the previous data",
    },
    {
      question: "22. What is the necessary condition for the Cartesian Tree?",
      options: [
        "Binary Tree",
        "Binary Search Tree",
        "An inorder traversal of the nodes yields the values in the same order",
        "None",
      ],
      answer:
        "An inorder traversal of the nodes yields the values in the same order",
    },
    {
      question:
        "23. Which of the following is the application of the BK - Tree?",
      options: [
        "Spell checker",
        "Approximate string matching",
        "Both of the above",
        "None",
      ],
      answer: "Both of the above",
    },
    {
      question:
        "24. Which of the following is the self-balancing binary search tree?",
      options: ["AVL Tree", "Red Black Tree", "Splay Tree", "All of the Above"],
      answer: "All of the Above",
    },
    {
      question:
        "25. Which one of the following data structures is preferred in database-system implementation?",
      options: ["Binary Search tree", "B+ tree", "Splay Tree", "AVL tree"],
      answer: "B+ tree",
    },
    {
      question: "26. Which of the following statement is true for an AVL tree?",
      options: [
        "The AVL tree must be a B-tree",
        "The AVL tree must be a Binary Search Tree.",
        "The difference between the heights of left and right subtrees for any node cannot be more than one.",
        "The AVL Tree is a self-balancing tree.",
      ],
      answer: "P2, P3 And P4.",
    },
    {
      question:
        "27. What makes an XOR Linked list better than an ordinary linked List?",
      options: [
        "XOR linked list uses more memory",
        "XOR linked list uses less time",
        "XOR linked list uses less memory than an ordinary Linked list",
        "None",
      ],
      answer: "XOR linked list uses less memory than an ordinary Linked list",
    },
    {
      question:
        "28. What is the time complexity taken by Red-Black Tree in insertion, deletion, and searching Operations?",
      options: ["O(N)", "O(1)", "O(h)", "O(LogN)"],
      answer: "O(LogN)",
    },
    {
      question:
        "29. Which operation is used to fix violations in a Red-Black Tree after a node deletion?",
      options: ["Trimming", "Recoloring", "Balancing", "None"],
      answer: "Recoloring",
    },
    {
      question: "30. What is the main disadvantage of using a Trie?",
      options: [
        "High memory usage for certain datasets.",
        "Slow search speed for long strings",
        "Limited support for non-string data types.",
        "Difficulty in insertion and deletion operations.",
      ],
      answer: "High memory usage for certain datasets.",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [timerId, setTimerId] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0); // To store the time spent on solving the quiz
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const id = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setTimerId(id);
    } else {
      handleFinishQuiz(); // Automatically finish the quiz when time runs out
    }

    return () => clearInterval(timerId); // Clean up timer on unmount
  }, [timeLeft]);

  // Handle option selection
  const handleOptionSelect = (option:string) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setUserAnswers(updatedAnswers);
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (selectedOption) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }
  };

  // Function to finish the quiz
  const handleFinishQuiz = () => {
    clearInterval(timerId); // Stop the timer when the quiz is finished
    setTimeSpent(1800 - timeLeft); // Calculate time spent
    setShowResult(true);
  };

  // Function to submit the quiz
  const handleSubmitQuiz = () => {
    handleFinishQuiz(); // Call finish quiz function
  };

  // Automatically finish quiz when all questions are answered
  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      handleFinishQuiz();
    }
  }, [currentQuestionIndex]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Layout
      title="Data Structures Quiz"
      description="Test your knowledge of data structures with this quiz."
    >
      <div className="bg-blue-100 text-sky-800 max-w-2xl mx-auto rounded-2xl my-10 rounded-3xl p-10">
        <h2 className="text-center text-blue-600">Data Structures Challenge-1</h2>
        {showResult ? (
          <div>
            <h2>
              Your Score: {correctAnswers} out of {questions.length}
            </h2>
            <h2>Time Spent: {formatTime(timeSpent)}</h2>{" "}
            {/* Show time spent here */}
            <div style={{ textAlign: "left", marginTop: "20px" }}>              
              <h4 style={{ color: "black", marginBottom: "10px" }}>Review Your Answers:</h4>
              <ul>
                {questions.map((question, index) => (
                  <li key={index} style={{ marginBottom: "15px" }}>
                    <p><strong>{question.question}</strong></p>
                    <p>
                      Your Answer: <span style={{ color: userAnswers[index] === question.answer ? "green" : "red" }}>
                        {userAnswers[index]}
                      </span>
                    </p>
                    <p>Correct Answer: <span style={{ color: "green" }}>{question.answer}</span></p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-center text-rose-900">Time Left: {formatTime(timeLeft)}</h3>{" "}
            {/* Show running timer */}
            <div className="bg-gray-100 text-neutral-800 rounded-2xl p-4">
              <h3>{questions[currentQuestionIndex].question}</h3>
              <div>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div
                      key={index}
                      className="text-left my-2 rounded-md p-3 w-full"
                      style={{
                        border: selectedOption === option ? "2px solid blue" : "1px solid #ddd",
                        backgroundColor: selectedOption === option ? "rgba(11, 19, 43, 0.1)" : "white",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </div>
                  )
                )}
              </div>
              <button className="mt-5 bg-blue-600 rounded-lg text-white border border-blue-600 p-3 disabled:bg-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed" onClick={handleNextQuestion} disabled={!selectedOption}>
                Next Question
              </button>
              <button className="mt-5 bg-gray-200 border border-gray-800 rounded-lg text-gray-800 ml-2 p-3" onClick={handleSubmitQuiz}>Submit Quiz</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DataStructuresQuiz;
