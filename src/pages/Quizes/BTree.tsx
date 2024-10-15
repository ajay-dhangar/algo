import React, { useState } from "react";
import Layout from "@theme/Layout";

const BTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1. What is a B-Tree?
        </>
      ),
      options: [
        "A) A binary search tree that is balanced.",
        "B) A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.",
        "C) A type of tree that only allows three children per node.",
        "D) A tree used exclusively for storing strings.",
      ],
      answer: "B) A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.",
    },
    {
      question: (
        <>
          2. What is the minimum degree of a B-Tree?
        </>
      ),
      options: [
        "A) The minimum number of keys a node can contain.",
        "B) The maximum number of children a node can have.",
        "C) The maximum number of keys a node can contain.",
        "D) The number of levels in the tree.",
      ],
      answer: "A) The minimum number of keys a node can contain.",
    },
    {
      question: (
        <>
          3. In a B-Tree, each node can have a maximum of how many children?
        </>
      ),
      options: [
        "A) 2",
        "B) 3",
        "C) 2t",
        "D) t",
      ],
      answer: "C) 2t",
    },
    // Average Questions
    {
      question: (
        <>
          4. What is the main advantage of using a B-Tree over a binary search tree?
        </>
      ),
      options: [
        "A) Faster search times.",
        "B) Less memory usage.",
        "C) Better balance and reduced height.",
        "D) Simplicity of implementation.",
      ],
      answer: "C) Better balance and reduced height.",
    },
    {
      question: (
        <>
          5. When inserting into a B-Tree, what happens if a node exceeds the maximum number of keys?
        </>
      ),
      options: [
        "A) The node is deleted.",
        "B) The tree is restructured.",
        "C) The node is split into two nodes.",
        "D) No action is taken.",
      ],
      answer: "C) The node is split into two nodes.",
    },
    {
      question: (
        <>
          6. What does it mean for a B-Tree to be balanced?
        </>
      ),
      options: [
        "A) All leaves are at the same depth.",
        "B) The number of keys in each node is equal.",
        "C) Each node contains the same number of children.",
        "D) The tree is a complete binary tree.",
      ],
      answer: "A) All leaves are at the same depth.",
    },
    // Difficult Questions
    {
      question: (
        <>
          7. How is deletion handled in a B-Tree?
        </>
      ),
      options: [
        "A) Simply remove the key from the node.",
        "B) Reorganize keys within the node only.",
        "C) It may require borrowing a key from a sibling or merging nodes.",
        "D) Deletion is not allowed in B-Trees.",
      ],
      answer: "C) It may require borrowing a key from a sibling or merging nodes.",
    },
    {
      question: (
        <>
          8. Which of the following properties is NOT true for B-Trees?
        </>
      ),
      options: [
        "A) All leaf nodes are at the same level.",
        "B) Each internal node has at least t-1 keys.",
        "C) The root node can have fewer than t keys.",
        "D) Every node can have an arbitrary number of children.",
      ],
      answer: "D) Every node can have an arbitrary number of children.",
    },
    {
      question: (
        <>
          9. In which applications are B-Trees commonly used?
        </>
      ),
      options: [
        "A) In-memory data structures.",
        "B) File systems and databases.",
        "C) Simple data retrieval tasks.",
        "D) Small data storage.",
      ],
      answer: "B) File systems and databases.",
    },
    {
      question: (
        <>
          10. What is the relationship between the height of a B-Tree and its order?
        </>
      ),
      options: [
        "A) The height increases as the order increases.",
        "B) The height decreases as the order increases.",
        "C) The height is independent of the order.",
        "D) The height and order are always equal.",
      ],
      answer: "B) The height decreases as the order increases.",
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
        <h2 style={{ textAlign: "center" }}>Quiz on B-Trees</h2>
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

export default BTreeQuiz;
