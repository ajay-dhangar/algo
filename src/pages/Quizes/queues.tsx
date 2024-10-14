import React, { useState } from "react";
import Layout from "@theme/Layout";

const QueueQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: "1. What will happen if you try to dequeue an item from an empty queue?",
      options: ["A) Returns null", "B) Throws an error", "C) Returns undefined", "D) No operation"],
      answer: "B) Throws an error",
    },
    {
      question: "2. In a circular queue, what is the primary benefit compared to a linear queue?",
      options: ["A) More memory usage", "B) Faster access time", "C) Efficient use of space", "D) Simpler implementation"],
      answer: "C) Efficient use of space",
    },
    {
      question: (
        <>
          3. Consider the following operations on a queue: 
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`enqueue(1);
enqueue(2);
enqueue(3);
dequeue();
enqueue(4);
dequeue();`}
          </pre>
          What will be the output of the dequeue operations?
        </>
      ),
      options: ["A) 1, 2", "B) 1, 3", "C) 2, 4", "D) 3, 4"],
      answer: "A) 1, 2",
    },
    // Average Questions
    {
      question: "4. Which data structure is commonly used to implement a queue?",
      options: ["A) Array", "B) Linked List", "C) Stack", "D) Both A and B"],
      answer: "D) Both A and B",
    },
    {
      question: "5. What is the time complexity of enqueue and dequeue operations in a linked list-based queue?",
      options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n^2)"],
      answer: "A) O(1)",
    },
    {
      question: "6. In a queue, which operation is used to remove an element from the front?",
      options: ["A) push", "B) pop", "C) enqueue", "D) dequeue"],
      answer: "D) dequeue",
    },
    {
      question: (
        <>
          7. Given the following pseudocode for a queue operation:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`if (front == -1) {
    front = 0;
}
rear++;
queue[rear] = value;`}
          </pre>
          What does this pseudocode represent?
        </>
      ),
      options: [
        "A) Enqueue operation",
        "B) Dequeue operation",
        "C) Peek operation",
        "D) IsEmpty operation",
      ],
      answer: "A) Enqueue operation",
    },
    // Difficult Questions
    {
      question: "8. Which of the following is not a type of queue?",
      options: ["A) Simple Queue", "B) Circular Queue", "C) Double-ended Queue", "D) Random Queue"],
      answer: "D) Random Queue",
    },
    {
      question: (
        <>
          9. In a priority queue, elements are dequeued based on:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`1. Their position in the queue
2. Their priority level`}
          </pre>
          Which statement is correct?
        </>
      ),
      options: [
        "A) Only by position",
        "B) Only by priority level",
        "C) Both position and priority level",
        "D) Neither",
      ],
      answer: "B) Only by priority level",
    },
    {
      question: (
        <>
          10. What will be the output of the following queue operations if the initial queue is empty?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`enqueue(10);
enqueue(20);
dequeue();
enqueue(30);`}
          </pre>
          What will be the current front of the queue?
        </>
      ),
      options: ["A) 10", "B) 20", "C) 30", "D) Queue is empty"],
      answer: "C) 30",
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
        <h2 style={{ textAlign: "center" }}>Quiz on Queues</h2>
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

export default QueueQuiz;
