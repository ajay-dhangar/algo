
import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";

const DataStructuresQuiz = () => {
  const questions = [
    {
      question: "1. What is the time complexity of accessing an element in an array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "2. Which data structure uses LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
    },
    {
      question: "3. What is the average time complexity of searching in a binary search tree?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "4. In a linked list, what is the time complexity of adding an element at the head?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "5. What type of data structure is a heap?",
      options: ["Linear", "Non-linear", "Static", "Dynamic"],
      answer: "Non-linear",
    },
    {
      question: "6. Which data structure is used to implement recursion?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
    },
    {
      question: "7. What is the worst-case time complexity for inserting an element in a balanced binary search tree?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "8. Which of the following is not a type of linked list?",
      options: ["Singly linked list", "Doubly linked list", "Circular linked list", "Multi-linked list"],
      answer: "Multi-linked list",
    },
    {
      question: "9. What is a common use of a queue data structure?",
      options: ["Undo functionality in text editors", "Call center systems", "Browser history", "Memory management"],
      answer: "Call center systems",
    },
    {
      question: "10. What is the primary characteristic of a binary tree?",
      options: ["Each node has at most two children", "Nodes are connected in a linear manner", "Each node can have multiple children", "Only the last node can have children"],
      answer: "Each node has at most two children",
    },
    {
      question: "11. What is the time complexity of inserting an element at the end of a dynamic array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "12. What data structure is commonly used to represent a priority queue?",
      options: ["Heap", "Queue", "Stack", "Array"],
      answer: "Heap",
    },
    {
      question: "13. Which sorting algorithm has the best time complexity in the worst case?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      answer: "Merge Sort",
    },
    {
      question: "14. What is the time complexity of deleting an element from a hash table (average case)?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "15. Which of the following is true about a graph data structure?",
      options: ["Graphs are always acyclic", "Graphs are trees with multiple roots", "Graphs can have cycles", "Graphs only contain nodes and no edges"],
      answer: "Graphs can have cycles",
    },
    {
      question: "16. What is the time complexity of searching for an element in a balanced binary search tree (BST)?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(log n)",
    },
    {
      question: "17. Which of the following is used to traverse a graph?",
      options: ["DFS", "BFS", "Both DFS and BFS", "None of the above"],
      answer: "Both DFS and BFS",
    },
    {
      question: "18. In a max heap, the root node contains:",
      options: ["The smallest element", "The largest element", "The middle element", "A random element"],
      answer: "The largest element",
    },
    {
      question: "19. What is the time complexity of accessing an element in a hash table (average case)?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "20. Which data structure is typically used for implementing BFS on a graph?",
      options: ["Stack", "Queue", "Heap", "Array"],
      answer: "Queue",
    },
    {
      question: "21. What is the time complexity of deleting an element from a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(n)",
    },
    {
      question: "22. Which data structure allows elements to be inserted and deleted from both ends?",
      options: ["Queue", "Deque", "Stack", "Priority Queue"],
      answer: "Deque",
    },
    {
      question: "23. What is the time complexity of searching for an element in an unsorted array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(n)",
    },
    {
      question: "24. What is a complete binary tree?",
      options: ["A binary tree where each node has exactly two children", "A binary tree where all levels except possibly the last are fully filled", "A binary tree where all leaves are at the same level", "None of the above"],
      answer: "A binary tree where all levels except possibly the last are fully filled",
    },
    {
      question: "25. What is the main difference between a stack and a queue?",
      options: ["Stack uses LIFO, Queue uses FIFO", "Queue uses LIFO, Stack uses FIFO", "Stack is dynamic, Queue is static", "Queue is dynamic, Stack is static"],
      answer: "Stack uses LIFO, Queue uses FIFO",
    },
    {
      question: "26. What is the time complexity of inserting an element into a min heap?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(log n)",
    },
    {
      question: "27. Which of the following is not a balanced tree?",
      options: ["AVL Tree", "Red-Black Tree", "Binary Search Tree", "B-tree"],
      answer: "Binary Search Tree",
    },
    {
      question: "28. What is the time complexity of traversing a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(n)",
    },
    {
      question: "29. In a circular queue, what happens when you try to insert an element and the queue is full?",
      options: ["The first element is overwritten", "The queue overflows", "The last element is overwritten", "The queue is resized"],
      answer: "The queue overflows",
    },
    {
      question: "30. What is the main advantage of using a doubly linked list over a singly linked list?",
      options: ["Easier to traverse both directions", "Uses less memory", "Easier to implement", "Faster to access elements"],
      answer: "Easier to traverse both directions",
    },
    // Add all your 50 questions here...
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds

  // Timer interval reference for clearing the interval later
  let intervalRef: NodeJS.Timeout;

  // Initialize the timer and stop it when the quiz ends
  useEffect(() => {
    if (!quizEnded) {
      intervalRef = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    // Clean up the interval when quiz ends or when component unmounts
    return () => clearInterval(intervalRef);
  }, [quizEnded]);

  useEffect(() => {
    if (timer === 0) {
      setQuizEnded(true);
      clearInterval(intervalRef); // Ensure timer stops at 0
    }
  }, [timer]);

  const handleAnswerOptionClick = (selectedOption: string) => {
    if (quizEnded) return;

    setUserAnswers([...userAnswers, selectedOption]);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizEnded(true);
      clearInterval(intervalRef); // Stop timer when quiz is submitted
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "20px",
          fontFamily: "'Roboto', sans-serif",
          borderRadius: "10px",
          maxWidth: "800px",
          margin: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>Data Structures Quiz - Challenge 2</h1>
        {!quizEnded ? (
          <>
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#2c3e50" }}>{questions[currentQuestion].question}</h3>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {questions[currentQuestion].options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswerOptionClick(option)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "5px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: "1.2rem", color: "#e74c3c" }}>Timer: {formatTime(timer)}</div>
            </div>
          </>
        ) : (
          <div>
            <h2 style={{ color: "#27ae60" }}>Your Score: {score} / {questions.length}</h2>
            <h3 style={{ color: "#e74c3c" }}>Time Left: {formatTime(timer)}</h3>
            <h3 style={{ color: "#2980b9" }}>Thank you for taking the quiz!</h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DataStructuresQuiz;
