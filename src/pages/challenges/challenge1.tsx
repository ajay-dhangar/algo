import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";

const DataStructuresQuiz: React.FC = () => {
  const questions = [
    {
      question: "1. What is the time complexity of accessing an element in an array?",
      options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n^2)"],
      answer: "A) O(1)",
    },
    {
      question: "2. Which data structure uses LIFO order?",
      options: ["A) Queue", "B) Stack", "C) Array", "D) Linked List"],
      answer: "B) Stack",
    },
    {
      question: "3. Which of the following is a valid operation on a queue?",
      options: ["A) Push", "B) Pop", "C) Enqueue", "D) Insert"],
      answer: "C) Enqueue",
    },
    {
      question: "4. The minimum number of stacks needed to implement a queue is:",
      options: ["A) 1", "B) 2", "C) 3", "D) 4"],
      answer: "B) 2",
    },
    {
      question: "5. What data structure is used to implement recursion?",
      options: ["A) Queue", "B) Array", "C) Stack", "D) Linked List"],
      answer: "C) Stack",
    },
    {
      question: "6. Which of the following is not a type of linked list?",
      options: ["A) Singly linked list", "B) Doubly linked list", "C) Circular linked list", "D) Quadruple linked list"],
      answer: "D) Quadruple linked list",
    },
    {
      question: "7. What is the main advantage of using a linked list over an array?",
      options: ["A) Faster access time", "B) Dynamic size", "C) Better memory utilization", "D) Simplicity"],
      answer: "B) Dynamic size",
    },
    {
      question: "8. Which traversal technique is used to visit all nodes in a binary tree?",
      options: ["A) In-order", "B) Pre-order", "C) Post-order", "D) All of the above"],
      answer: "D) All of the above",
    },
    {
      question: "9. What is the height of a balanced binary tree with n nodes?",
      options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"],
      answer: "B) O(log n)",
    },
    {
      question: "10. What is the main characteristic of a binary search tree?",
      options: ["A) All nodes have two children", "B) Left subtree has lesser values, right subtree has greater values", "C) Balanced height", "D) None of the above"],
      answer: "B) Left subtree has lesser values, right subtree has greater values",
    },
    {
      question: "11. Which of the following is an application of Queue Data Structure?",
      options: ["A) When a resource is shared among multiple consumers", "B) When data is transferred asynchronously", "C) Load Balancing", "D) All of the above"],
      answer: "D) All of the above",
    },
    {
      question: "12. Consider the following statements about binary trees: i. First-in-first-out computations are efficiently supported by STACKS. ii. Implementing LISTS on linked lists is more efficient than on arrays. iii. Implementing QUEUES on a circular array is more efficient than on a linear array with two indices. Which is correct?",
      options: ["A) (ii) is true", "B) (i) and (ii) are true", "C) (iii) is true", "D) (ii) and (iv) are true"],
      answer: "A) (ii) is true",
    },
    {
      question: "13. Which of the following option is not correct?",
      options: ["A) If the queue is implemented with a linked list, only rear pointer will change during insertion", "B) Queue data structure can implement LRU page fault algorithm", "C) Queue data structure can implement Quick sort algorithm but not LRU", "D) Both A and C"],
      answer: "D) Both A and C",
    },
    {
      question: "14. The conditions to detect queue full and queue empty in a circular queue are:",
      options: ["A) Full: (REAR+1) mod n == FRONT, empty: REAR == FRONT", "B) Full: REAR == FRONT, empty: (REAR+1) mod n == FRONT", "C) Full: (FRONT+1) mod n == REAR, empty: REAR == FRONT", "D) Full: (REAR+1) mod n == FRONT, empty: (FRONT+1) mod n == REAR"],
      answer: "A) Full: (REAR+1) mod n == FRONT, empty: REAR == FRONT",
    },
    {
      question: "15. The average depth of a binary search tree is:",
      options: ["A) O(n^0.5)", "B) O(n)", "C) O(log n)", "D) O(n log n)"],
      answer: "C) O(log n)",
    },
    {
      question: "16. The in-order traversal of a binary search tree yields:",
      options: ["A) The values in descending order", "B) The values in random order", "C) The values in ascending order", "D) The values in sorted order based on depth"],
      answer: "C) The values in ascending order",
    },
    {
      question: "17. The postorder traversal of a binary tree visits nodes in what order?",
      options: ["A) Left, Right, Root", "B) Root, Left, Right", "C) Right, Left, Root", "D) Root, Right, Left"],
      answer: "A) Left, Right, Root",
    },
    {
      question: "18. Which data structure is best suited for implementing a priority queue?",
      options: ["A) Array", "B) Linked List", "C) Heap", "D) Stack"],
      answer: "C) Heap",
    },
    {
      question: "19. What is the time complexity for inserting an element in a binary heap?",
      options: ["A) O(log n)", "B) O(n)", "C) O(1)", "D) O(n log n)"],
      answer: "A) O(log n)",
    },
    {
      question: "20. In a hash table, what is the purpose of a hash function?",
      options: ["A) To store values", "B) To retrieve values", "C) To convert keys into array indices", "D) To sort the data"],
      answer: "C) To convert keys into array indices",
    },
    {
      question: "21. Which of the following is NOT a characteristic of a binary tree?",
      options: ["A) Each node can have at most two children", "B) A binary tree can be empty", "C) A binary tree has a maximum depth of log n", "D) Every node in a binary tree has two children"],
      answer: "D) Every node in a binary tree has two children",
    },
    {
      question: "22. Which tree structure allows for efficient searching, inserting, and deleting operations?",
      options: ["A) Binary Tree", "B) AVL Tree", "C) Linked List", "D) Stack"],
      answer: "B) AVL Tree",
    },
    {
      question: "23. In which data structure can you not delete an arbitrary element?",
      options: ["A) Array", "B) Stack", "C) Queue", "D) All of the above"],
      answer: "B) Stack",
    },
    {
      question: "24. What traversal method is used in a level order traversal of a binary tree?",
      options: ["A) Depth-First Search", "B) Breadth-First Search", "C) In-order", "D) Pre-order"],
      answer: "B) Breadth-First Search",
    },
    {
      question: "25. What is the space complexity of a recursive function that uses O(n) stack space?",
      options: ["A) O(1)", "B) O(n)", "C) O(n^2)", "D) O(log n)"],
      answer: "B) O(n)",
    },
    {
      question: "26. Which of the following data structures can be used to implement a recursive function?",
      options: ["A) Queue", "B) Stack", "C) Array", "D) Linked List"],
      answer: "B) Stack",
    },
    {
      question: "27. What is the worst-case time complexity for searching an element in a binary search tree?",
      options: ["A) O(log n)", "B) O(n)", "C) O(n log n)", "D) O(1)"],
      answer: "B) O(n)",
    },
    {
      question: "28. Which of the following is true for the adjacency list representation of a graph?",
      options: ["A) It uses more memory than an adjacency matrix", "B) It is faster to find if an edge exists", "C) It is more space-efficient for sparse graphs", "D) None of the above"],
      answer: "C) It is more space-efficient for sparse graphs",
    },
    {
      question: "29. Which data structure would you use to implement a function that reverses a string?",
      options: ["A) Queue", "B) Stack", "C) Array", "D) Linked List"],
      answer: "B) Stack",
    },
    {
      question: "30. What is a disadvantage of using a linked list over an array?",
      options: [
        "A) More memory usage",
        "B) Random access",
        "C) Simplicity",
        "D) Flexibility",
      ],
      answer: "A) More memory usage",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

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
      <div className="bg-gray-200 my-10 mx-auto p-10 rounded-3xl" style={{ color: "black", maxWidth: "600px" }}>
        <h2 style={{ textAlign: "center" }}>Data Structures Challenge-1</h2>
        <h3 style={{ textAlign: "center" }}>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h3>
        {showResult ? (
          <div style={{ textAlign: "center", marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: "white" }}>
            <h3 style={{ color: "black" }}>Your Score: <span style={{ fontWeight: "bold", fontSize: "24px" }}>{score}</span> 🎉</h3>
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              {score <= 15 ? "Better luck next time!" : score <= 25 ? "Good job!" : "Excellent work!"}
            </p>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-2xl">
            <h3 style={{ color: "black" }}>{questions[currentQuestion].question}</h3>
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="text-left my-2 bg-white rounded-md p-3 w-full"
                  style={{
                    display: "block",
                    border: selectedOption === option ? "2px solid orange" : "1px solid #ddd",
                    backgroundColor: selectedOption === option ? "rgba(255, 165, 0, 0.1)" : "white",
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button onClick={nextQuestion} className="bg-gray-800 rounded-lg text-white border border-gray-800" style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DataStructuresQuiz;
