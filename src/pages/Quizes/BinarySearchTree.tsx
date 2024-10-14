import React, { useState } from "react";
import Layout from "@theme/Layout";

const BinarySearchTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1. What is a binary search tree (BST)?
        </>
      ),
      options: [
        "A) A tree where each node has at most two children.",
        "B) A tree where the left child is greater than the parent.",
        "C) A tree where the left child is less than the parent and the right child is greater.",
        "D) A tree where all nodes are on one side.",
      ],
      answer: "C) A tree where the left child is less than the parent and the right child is greater.",
    },
    {
      question: (
        <>
          2. What is the time complexity for searching an element in a balanced binary search tree?
        </>
      ),
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
    },
    {
      question: (
        <>
          3. Which of the following is true about the in-order traversal of a binary search tree?
        </>
      ),
      options: [
        "A) It visits the nodes in descending order.",
        "B) It visits the nodes in ascending order.",
        "C) It visits nodes in random order.",
        "D) It does not visit all nodes.",
      ],
      answer: "B) It visits the nodes in ascending order.",
    },
    // Average Questions
    {
      question: (
        <>
          4. Which operation in a binary search tree can have a worst-case time complexity of O(n)?
        </>
      ),
      options: [
        "A) Insertion",
        "B) Deletion",
        "C) Searching",
        "D) All of the above",
      ],
      answer: "D) All of the above",
    },
    {
      question: (
        <>
          5. What is the maximum number of nodes in a binary search tree with a height of 'h'?
        </>
      ),
      options: [
        "A) h",
        "B) 2^h - 1",
        "C) 2^h",
        "D) h^2",
      ],
      answer: "B) 2^h - 1",
    },
    {
      question: (
        <>
          6. Which of the following traversals can be used to get a sorted order of elements in a binary search tree?
        </>
      ),
      options: [
        "A) Pre-order",
        "B) In-order",
        "C) Post-order",
        "D) Level-order",
      ],
      answer: "B) In-order",
    },
    // Difficult Questions
    {
      question: (
        <>
          7. In a binary search tree, what would happen if you tried to insert a duplicate value?
        </>
      ),
      options: [
        "A) It will replace the existing value.",
        "B) It will be ignored.",
        "C) It will cause an error.",
        "D) It will create a duplicate node.",
      ],
      answer: "B) It will be ignored.",
    },
    {
      question: (
        <>
          8. What is the time complexity for finding the lowest common ancestor (LCA) of two nodes in a binary search tree?
        </>
      ),
      options: ["A) O(n)", "B) O(log n)", "C) O(h)", "D) O(1)"],
      answer: "C) O(h)",
    },
    {
      question: (
        <>
          9. Which of the following operations requires tree rotation in a binary search tree?
        </>
      ),
      options: [
        "A) Insertion",
        "B) Deletion",
        "C) Balancing",
        "D) Both A and B",
      ],
      answer: "C) Balancing",
    },
    {
      question: (
        <>
          10. How can you check if a binary tree is a binary search tree?
        </>
      ),
      options: [
        "A) By checking if in-order traversal is sorted.",
        "B) By checking if all nodes have two children.",
        "C) By checking if all nodes have unique values.",
        "D) By performing a pre-order traversal.",
      ],
      answer: "A) By checking if in-order traversal is sorted.",
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
    <Layout>
      <div style={{ backgroundColor: "lightblue", padding: "20px", borderRadius: "8px", color: "black", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Quiz on Binary Search Trees</h2>
        {showResult ? (
          <div style={{ textAlign: "center", marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: "white" }}>
            <h3 style={{ color: "black" }}>Your Score: <span style={{ fontWeight: "bold", fontSize: "24px" }}>{score}</span> 🎉</h3>
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              {score <= 5 ? "Better luck next time!" : score <= 8 ? "Good job!" : "Excellent work!"}
            </p>
          </div>
        ) : (
          <div>
            <h3 style={{ color: "black" }}>{questions[currentQuestion].question}</h3>
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  style={{
                    display: "block",
                    margin: "10px auto",
                    padding: "10px",
                    backgroundColor: selectedOption === option ? "orange" : "white",
                    border: "1px solid black",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "80%",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button onClick={nextQuestion} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BinarySearchTreeQuiz;
