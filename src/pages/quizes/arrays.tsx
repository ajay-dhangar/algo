import React, { useState } from "react";
import Layout from "@theme/Layout";

const ArrayQuiz: React.FC = () => {
  const questions = [
    {
      question: (
        <>
          1. What will the output of the below code?
          <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 dark:bg-gray-900">
            {`#include <iostream>
using namespace std;

int main()
{
    int arr[2] = { 1, 2 };
    cout << 0[arr] << ", " << 1[arr] << endl;
    return 0;
}`}
          </pre>
        </>
      ),
      options: ["A) 1, 2", "B) Syntax error", "C) Run time error", "D) None"],
      answer: "A) 1, 2",
    },
    {
      question: (
        <>
          2. What will the output of the below code?
          <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 dark:bg-gray-900">
            {`#include <iostream>
using namespace std;

int main()
{
    int arr[5] = { 1, 2, 3, 4, 5 };
    cout << arr[5] << endl;
    return 0;
}`}
          </pre>
        </>
      ),
      options: ["A) 5", "B) 0", "C) Garbage value", "D) None"],
      answer: "C) Garbage value",
    },
    {
      question: (
        <>
          3. What will the output of the below code?
          <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 dark:bg-gray-900">
            {`#include <iostream>
using namespace std;

int main()
{
    int arr[5] = { 1, 2, 3, 4, 5 };
    cout << arr[4] << endl;
    return 0;
}`}
          </pre>
        </>
      ),
      options: ["A) 5", "B) 0", "C) 4", "D) None"],
      answer: "A) 5",
    },
    {
      question: (
        <>
          4. What will the output of the below code?
          <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 dark:bg-gray-900">
            {`#include <iostream>
using namespace std;

int main()
{
    int arr[5] = { 1, 2, 3, 4, 5 };
    cout << arr[0] << endl;
    return 0;
}`}
          </pre>
        </>
      ),
      options: ["A) 1", "B) 0", "C) 5", "D) None"],
      answer: "A) 1",
    },
    {
      question: (
        <>
          5. What is the time complexity of accessing an element in an array by
          its index?
        </>
      ),
      options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n^2)"],
      answer: "A) O(1)",
    },
    {
      question: (
        <>6. Which of the following statements is true about arrays in C++?</>
      ),
      options: [
        "A) The elements of an array are stored in contiguous memory locations",
        "B) The elements of an array are stored in non-contiguous memory locations",
        "C) The elements of an array are stored in random memory locations",
        "D) None of the above",
      ],
      answer:
        "A) The elements of an array are stored in contiguous memory locations",
    },
    {
      question: (
        <>
          7. In C++, if an array is declared as int arr[5];, what will be the
          default value of its elements?
        </>
      ),
      options: ["A) 0", "B) 1", "C) Random value", "D) None"],
      answer: "A) 0",
    },
    {
      question: (
        <>
          8. What will be the output of the below code?
          <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 dark:bg-gray-900">
            {`#include <iostream>
using namespace std;

int main()
{
    int arr[5];
    cout << arr[0] << endl;
    return 0;
}`}
          </pre>
        </>
      ),
      options: ["A) 0", "B) 1", "C) Random value", "D) None"],
      answer: "A) 0",
    },
    {
      question: (
        <>
          9. What will be the output of the below code?
          <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 dark:bg-gray-900">
            {`#include <iostream>
using namespace std;

int main()
{
    int arr[5] = { 1, 2, 3, 4, 5 };
    cout << arr << endl;
    return 0;
}`}
          </pre>
        </>
      ),
      options: ["A) Address of the first element", "B) 1", "C) 2", "D) None"],
      answer: "A) Address of the first element",
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
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Layout title="Arrays Quiz" description="Test your knowledge on array operations and algorithms.">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on Arrays</h2>
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

export default ArrayQuiz;
