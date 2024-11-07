import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";

const DataStructuresQuiz = () => {
  const questions = [
    {
      question:
        "1. Let A[1...n] be an array of n distinct numbers. If i < j and A[i] > A[j], then the pair (i, j) is called an inversion of A. What is the expected number of inversions in any permutation on n elements?",
      options: ["n(n-1)/2", "n(n-1)/4", "n(n+1)/4", "2n[logn]"],
      answer: "n(n-1)/4",
    },
    {
      question:
        "2. Consider a two-dimensional array A[20][10]. Assume 4 words per memory cell, the base address of array A is 100, elements are stored in row-major order and first element is A[0][0]. What is the address of A[11][5]?",
      options: ["560", "460", "570", "575"],
      answer: "570",
    },
    {
      question:
        "3. An array A consists of n integers in locations A[0], A[1] ....A[n-1]. It is required to shift the elements of the array cyclically to the left by k places, where 1 <= k <= (n-1). Which is the correct algorithm to complete this?",
      options: [
        "i > min; j!= (n+i)mod n; A[j + k]; temp; i + 1;",
        "i < min; j!= (n+i)mod n; A[j + k]; temp; i + 1;",
        "i > min; j!= (n+i+k)mod n; A[(j + k)]; temp; i + 1;",
        "i < min; j!= (n+i-k)mod n; A[(j + k)mod n]; temp; i + 1;",
      ],
      answer: "i < min; j!= (n+i-k)mod n; A[(j + k)mod n]; temp; i + 1;",
    },
    {
      question: "4. Which of the following correctly declares an array?",
      options: [
        "int geeks[20];",
        "int geeks;",
        "geeks{20};",
        "array geeks[20];",
      ],
      answer: "int geeks[20];",
    },
    {
      question:
        "5. A three-dimensional array in C++ is declared as int A[x][y][z]. The address of an item at the location A[p][q][r] can be computed as:",
      options: [
        "&A[0][0][0] + w(y * z * q + z * p + r)",
        "&A[0][0][0] + w(y * z * p + z*q + r)",
        "&A[0][0][0] + w(x * y * p + z * q + r)",
        "&A[0][0][0] + w(x * y * q + z * p + r)",
      ],
      answer: "&A[0][0][0] + w(y * z * p + z*q + r)",
    },
    {
      question:
        "6. Let A be a square matrix of size n x n. Consider the following program. What is the expected output?",
      options: [
        "The matrix A itself",
        "Transpose of matrix A",
        "Adding 100 to the upper diagonal elements and subtracting 100 from diagonal elements of A",
        "Inverse of matrix A",
      ],
      answer: "Transpose of matrix A",
    },
    {
      question:
        "7. Assume that the size of an integer is 32 bit. What is the output of the following program?",
      options: ["4", "8", "Compiler Error", "Runtime Error"],
      answer: "Compiler Error",
    },
    {
      question: "8. The above C declaration defines 's' to be:",
      options: [
        "An array, each element of which is a pointer to a structure of type node",
        "A structure of 2 fields, each field being a pointer to an array of 10 elements",
        "A structure of 3 fields: an integer, a float, and an array of 10 elements",
        "An array, each element of which is a structure of type node.",
      ],
      answer:
        "An array, each element of which is a pointer to a structure of type node",
    },
    {
      question: "9. Choose the correct output from the options given below:",
      options: ["Compiler Error", "10", "Runtime Error", "Garbage Value"],
      answer: "Compiler Error",
    },
    {
      question: "10. Predict the output of the program:",
      options: ["12", "16", "8", "Compiler Error"],
      answer: "8",
    },
    {
      question: "11. Predict the output of the following program:",
      options: [
        "Nothing is printed",
        "G",
        "Garbage character followed by 'G'",
        "Garbage character followed by 'G', followed by more garbage characters",
      ],
      answer:
        "Garbage character followed by 'G', followed by more garbage characters",
    },
    {
      question:
        "12. Which of the following ways can be used to declare a node for a singly linked list?",
      options: ["TRUE", "FALSE"],
      answer: "TRUE",
    },
    {
      question: "13. What is a full binary tree?",
      options: [
        "Each node has exactly zero or two children",
        "Each node has exactly two children",
        "All the leaves are at the same level",
        "Each node has exactly one or two children",
      ],
      answer: "Each node has exactly zero or two children",
    },
    {
      question: "14. Which traversal's pseudo code is written here?",
      options: ["Level order", "Pre-order", "Post-order", "In-order"],
      answer: "Level order",
    },
    {
      question:
        "15. The time complexity of calculating the sum of all leaf nodes in an n-order binary tree is __________",
      options: ["O(n^2)", "O(n+1)", "O(1)", "O(n)"],
      answer: "O(n)",
    },
    {
      question: "16. An important application of a binary tree is ______",
      options: [
        "Huffman coding",
        "Stack implementation",
        "Queue implementation",
        "Traverse a cyclic graph",
      ],
      answer: "Huffman coding",
    },
    {
      question:
        "17. In a full binary tree, if there are L leaves, then the total number of nodes N are?",
      options: ["N = 2*L", "N = L + 1", "N = L – 1", "N = 2*L – 1"],
      answer: "N = 2*L – 1",
    },
    {
      question:
        "18. Which among the following is the pseudo code for post-order traversal?",
      options: [
        "Order(node): if node is not null: Order(node.left) Order(node.right) print node.value",
        "Order(node): if node is not null: Order(node.right) Order(node.left) print node.value",
        "Order(node): if node is not null: Order(node.left) print node.value",
        "None of the above",
      ],
      answer:
        "Order(node): if node is not null: Order(node.left) Order(node.right) print node.value",
    },
    {
      question:
        "19. For the expression (7-(4*5))+(9/3), which of the following is the post order tree traversal?",
      options: ["*745-93/+", "93/+745*-", "745*-93/+", "74*+593/-"],
      answer: "*745-93/+",
    },
    {
      question:
        "20. Which traversal is shown by the pseudo code?\nOrder(node):\n  if node is not null:\n   Order(node.left)\n  print node.value\n    Order(node.right)",
      options: ["In-order", "Level Order", "Post-order", "Pre-order"],
      answer: "In-order",
    },
    // Questions 21 to 30
    {
      question:
        "21. Which of the following ways can be used to represent a graph?",
      options: [
        "Adjacency List and Adjacency Matrix",
        "Incidence Matrix",
        "Adjacency List, Adjacency Matrix and Incidence Matrix",
      ],
      answer: "Adjacency List, Adjacency Matrix and Incidence Matrix",
    },
    {
      question: "22. What is the output of the following C program snippet?",
      options: ["Compiler Error", "2 0 1", "0 1 2", "2 1 0"],
      answer: "2 0 1",
    },
    // ... Continue adding questions from 23 to 30 here
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
