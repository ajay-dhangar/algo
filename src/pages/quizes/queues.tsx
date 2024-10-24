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
    // Difficult QuestionsclassName="options"
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
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleAnswer = (selected: string) => {
    setSelectedOption(selected);
    setUserAnswers((prevAnswers) => [...prevAnswers, selected]);
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
    <Layout title="Queues Quiz" description="Challenge your knowledge on queue implementations and their use cases.">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on Queues</h2>
          {showResult ? (
            <div>
              <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">
                  Your Score: <span className="text-4xl">{score}</span> 🎉
                </h3>
                <p className="mt-4 text-lg">
                  {score <= 5 ? "Better luck next time!" : score <= 8 ? "Good job!" : "Excellent work!"}
                </p>
              </div>

              {/* Solutions Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Solutions:</h3>
                {questions.map((q, index) => (
                  <div key={index} className="mb-6 text-left">
                    <p className="text-lg font-semibold">{q.question}</p>
                    <p className="text-md">
                      <span className="font-bold">Your Answer:</span> {userAnswers[index]}
                    </p>
                    <p className="text-md">
                      <span className="font-bold">Correct Answer:</span> {q.answer}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <span className="font-bold">Explanation:</span> {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 text-left">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`block w-full py-3 px-5 rounded-lg text-left border border-transparent transition-all duration-300 text-gray-800 dark:text-gray-100 ${selectedOption === option
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white rounded-lg w-full transition-colors duration-300 border-none"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QueueQuiz;
