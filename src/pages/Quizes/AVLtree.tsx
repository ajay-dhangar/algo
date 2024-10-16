import React, { useState } from "react";
import Layout from "@theme/Layout";

const AVLTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1. What is an AVL tree?
        </>
      ),
      options: [
        "A) A binary search tree that is balanced.",
        "B) A tree where the left subtree is larger than the right.",
        "C) A tree that allows duplicate values.",
        "D) A tree where all nodes have two children.",
      ],
      answer: "A) A binary search tree that is balanced.",
    },
    {
      question: (
        <>
          2. What is the main property of an AVL tree?
        </>
      ),
      options: [
        "A) All nodes have two children.",
        "B) The height of the left and right subtrees differ by at most 1.",
        "C) All nodes are less than their parent.",
        "D) All values are unique.",
      ],
      answer: "B) The height of the left and right subtrees differ by at most 1.",
    },
    {
      question: (
        <>
          3. What operation is performed to maintain the balance in an AVL tree?
        </>
      ),
      options: [
        "A) Rotation",
        "B) Traversal",
        "C) Insertion",
        "D) Deletion",
      ],
      answer: "A) Rotation",
    },
    // Average Questions
    {
      question: (
        <>
          4. What is the time complexity of searching for an element in an AVL tree?
        </>
      ),
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(log n)",
    },
    {
      question: (
        <>
          5. After inserting a node, how do you determine if a rotation is needed?
        </>
      ),
      options: [
        "A) By checking the depth of the node.",
        "B) By checking the balance factor of the nodes.",
        "C) By comparing values of nodes.",
        "D) By traversing the tree.",
      ],
      answer: "B) By checking the balance factor of the nodes.",
    },
    {
      question: (
        <>
          6. Which of the following is not a type of rotation used in AVL trees?
        </>
      ),
      options: [
        "A) Single Right Rotation",
        "B) Single Left Rotation",
        "C) Double Right Rotation",
        "D) Double Left Rotation",
      ],
      answer: "C) Double Right Rotation",
    },
    // Difficult Questions
    {
      question: (
        <>
          7. What is the balance factor of a node in an AVL tree?
        </>
      ),
      options: [
        "A) Height of the left subtree - height of the right subtree",
        "B) Height of the right subtree - height of the left subtree",
        "C) Height of the left subtree + height of the right subtree",
        "D) Height of the left subtree / height of the right subtree",
      ],
      answer: "A) Height of the left subtree - height of the right subtree",
    },
    {
      question: (
        <>
          8. In which scenario would a left-right rotation be necessary?
        </>
      ),
      options: [
        "A) Inserting into the left subtree of the left child.",
        "B) Inserting into the right subtree of the right child.",
        "C) Inserting into the left subtree of the right child.",
        "D) Inserting into the right subtree of the left child.",
      ],
      answer: "D) Inserting into the right subtree of the left child.",
    },
    {
      question: (
        <>
          9. Which of the following operations requires rebalancing in an AVL tree?
        </>
      ),
      options: [
        "A) Insertion",
        "B) Deletion",
        "C) Both A and B",
        "D) None of the above",
      ],
      answer: "C) Both A and B",
    },
    {
      question: (
        <>
          10. What is the maximum height of an AVL tree with n nodes?
        </>
      ),
      options: [
        "A) O(n)",
        "B) O(log n)",
        "C) O(sqrt(n))",
        "D) O(log² n)",
      ],
      answer: "B) O(log n)",
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
      <div style={{ backgroundColor: "lightgreen", padding: "20px", borderRadius: "8px", color: "black", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Quiz on AVL Trees</h2>
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

export default AVLTreeQuiz;
