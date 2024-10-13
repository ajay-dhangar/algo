import React, { useState } from "react";
import Layout from "@theme/Layout";

const AVLTreeQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: "1. What is an AVL tree?",
      options: [
        "A) a tree which is balanced and is a height balanced tree",
        "B) a tree which is unbalanced and is a height balanced tree",
        "C) a tree with three children",
        "D) a tree with at most 3 children",
      ],
      answer: "A) a tree which is balanced and is a height balanced tree",
    },
    {
      question:
        "2. Why do we need a binary tree which is height balanced?",
      options: [
        "A) to avoid formation of skew trees",
        "B) to save memory",
        "C) to attain faster memory access",
        "D) to simplify storing",
      ],
      answer: "A) to avoid formation of skew trees",
    },
    {
      question: (
        <>
          3. Which of the below diagram is following AVL tree property?
          <br />
          i. AVL tree property height balanced tree with difference of 1 between left & right subtrees
          <br />
          ii. AVL tree property is binary search tree
        </>
      ),
      options: [
        "A) only i",
        "B) both i and ii",
        "C) only ii",
        "D) i is not a binary search tree",
      ],
      answer: "B) both i and ii",
    },
    // Average Questions
    {
      question: "4. What is the maximum height of an AVL tree with p nodes?",
      options: [
        "A) p",
        "B) log(p)",
        "C) log(p)/2",
        "D) p⁄2",
      ],
      answer: "B) log(p)",
    },
    {
      question:
        "5. To restore the AVL property after inserting an element, we start at the insertion point and move towards the root of the tree. Is this statement true?",
      options: ["A) true", "B) false"],
      answer: "A) true",
    },
    {
      question:
        "6. Given an empty AVL tree, how would you construct an AVL tree when a set of numbers are given without performing any rotations?",
      options: [
        "A) just build the tree with the given input",
        "B) find the median of the set of elements given, make it as root and construct the tree",
        "C) use trial and error",
        "D) use dynamic programming to build the tree",
      ],
      answer: "B) find the median of the set of elements given, make it as root and construct the tree",
    },
    {
      question:
        "7. What is the maximum difference in heights between the leafs of an AVL tree?",
      options: [
        "A) log(n) where n is the number of nodes",
        "B) n where n is the number of nodes",
        "C) 0 or 1",
        "D) at most 1",
      ],
      answer: "D) at most 1",
    },
    // Difficult Questions
    {
      question: (
        <>
          8. Consider the pseudo code:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`int avl(binarysearchtree root):
  if(not root)
    return 0
  left_tree_height = avl(left_of_root)
  
  if(left_tree_height == -1)
    return left_tree_height
  
  right_tree_height = avl(right_of_root)
  
  if(right_tree_height == -1)
    return right_tree_height`}
          </pre>
          Does the above code check if a binary search tree is an AVL tree?
        </>
      ),
      options: ["A) yes", "B) no"],
      answer: "A) yes",
    },
    {
      question: (
        <>
          9. Consider the following left-left rotation pseudo code:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`avltree leftrotation(avltreenode z):
  avltreenode w = x-left
  x-left = w-right
  w-right = x
  x-height = max(Height(x-left), Height(x-right)) + 1
  w-height = max(missing) + 1
  return w`}
          </pre>
          What is missing?
        </>
      ),
      options: [
        "A) Height(w-left), x-height",
        "B) Height(w-right), x-height",
        "C) Height(w-left), x",
        "D) Height(w-left)",
      ],
      answer: "A) Height(w-left), x-height",
    },
    {
      question:
        "10. Why prefer red-black trees over AVL trees?",
      options: [
        "A) Because red-black is more rigidly balanced",
        "B) AVL trees store balance factor in every node which costs space",
        "C) AVL trees fail at scale",
        "D) Red-black trees are more efficient",
      ],
      answer: "B) AVL trees store balance factor in every node which costs space",
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
        <h2 style={{ textAlign: "center" }}>Quiz on AVL Trees</h2>
        {showResult ? (
          <div style={{ textAlign: "center", marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: "white" }}>
            <h3 style={{ color: "black" }}>
              Your Score: <span style={{ fontWeight: "bold", fontSize: "24px" }}>{score}</span> 🎉
            </h3>
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
