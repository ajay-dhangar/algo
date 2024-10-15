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
      <div style={{ backgroundColor: "lightcoral", padding: "20px", borderRadius: "8px", color: "black", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Quiz on Red-Black Trees</h2>
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

export default RedBlackTreeQuiz;
