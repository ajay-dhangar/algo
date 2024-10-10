import React, { useState } from "react";
import Layout from "@theme/Layout";

const ArrayQuiz: React.FC = () => {
  const questions = [
    { question: "What is the time complexity of array access?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(1)" },
    { question: "What is the time complexity of inserting at the end of an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(1)" },
    // Add more questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Layout title="Arrays Quiz" description="Test your knowledge of array operations">
      <div className="container mx-auto py-16 px-8 text-center">
        {showResult ? (
          <div>
            <h2>Your Score: {score} / {questions.length}</h2>
            <p>Review the correct answers below:</p>
            {/* Display the answers */}
          </div>
        ) : (
          <div>
            <h1>{questions[currentQuestion].question}</h1>
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ArrayQuiz;
