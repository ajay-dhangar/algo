import React, { useState } from "react";
import Layout from "@theme/Layout";

const BinaryTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1. What is the height of a binary tree with a single node?
        </>
      ),
      options: ["A) 0", "B) 1", "C) 2", "D) Depends on the tree"],
      answer: "B) 1",
    },
    {
      question: (
        <>
          2. Which traversal of a binary tree visits nodes in the order: left, root, right?
        </>
      ),
      options: ["A) Pre-order", "B) In-order", "C) Post-order", "D) Level-order"],
      answer: "B) In-order",
    },
    {
      question: (
        <>
          3. In a binary tree, what is the maximum number of nodes at depth 'd'?
        </>
      ),
      options: [
        "A) 2^d",
        "B) 2^(d+1) - 1",
        "C) 2d",
        "D) d^2",
      ],
      answer: "A) 2^d",
    },
    // Average Questions
    {
      question: (
        <>
          4. What is the time complexity of searching for an element in a balanced binary search tree?
        </>
      ),
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
    },
    {
      question: (
        <>
          5. Which of the following statements is true about a binary search tree?
        </>
      ),
      options: [
        "A) The left subtree of a node contains only nodes with keys less than the node's key.",
        "B) The right subtree of a node contains only nodes with keys greater than the node's key.",
        "C) Both A and B.",
        "D) None of the above.",
      ],
      answer: "C) Both A and B.",
    },
    {
      question: (
        <>
          6. In a binary tree, which of the following properties is true for a complete binary tree?
        </>
      ),
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
      question: (
        <>
          7. What is the maximum depth of a binary tree with 'n' nodes?
        </>
      ),
      options: ["A) n", "B) log n", "C) n/2", "D) n - 1"],
      answer: "A) n",
    },
    {
      question: (
        <>
          8. Which of the following algorithms can be used to find the lowest common ancestor (LCA) in a binary tree?
        </>
      ),
      options: [
        "A) Recursive approach",
        "B) Iterative approach",
        "C) Both A and B",
        "D) None of the above",
      ],
      answer: "C) Both A and B",
    },
    {
      question: (
        <>
          9. Which of the following traversal methods would give the nodes of a binary tree in descending order?
        </>
      ),
      options: [
        "A) In-order traversal",
        "B) Pre-order traversal",
        "C) Post-order traversal",
        "D) Reverse in-order traversal",
      ],
      answer: "D) Reverse in-order traversal",
    },
    {
      question: (
        <>
          10. What is the worst-case time complexity for inserting an element in a binary search tree?
        </>
      ),
      options: [
        "A) O(log n)",
        "B) O(n)",
        "C) O(n log n)",
        "D) O(1)",
      ],
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
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      setShowResult(true);
    }
  };

  return (
    <Layout>
      <div style={{ backgroundColor: "lightblue", padding: "20px", borderRadius: "8px", color: "black", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Quiz on Binary Trees</h2>
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

export default BinaryTreeQuiz;
