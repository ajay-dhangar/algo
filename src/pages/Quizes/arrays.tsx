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

  const handleAnswer = (selected: string) => {
    setSelectedOption(selected);
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
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Quiz on Arrays
          </h2>
          {showResult ? (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Your Score: <span className="text-indigo-500">{score}</span> 🎉
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {score <= 5
                  ? "Better luck next time!"
                  : score <= 8
                  ? "Good job!"
                  : "Excellent work!"}
              </p>
            </div>
          ) : (
            <div>
              <div className="text-gray-800 dark:text-gray-200 mb-4">
                {questions[currentQuestion].question}
              </div>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-2 px-4 rounded-lg border transition-colors duration-300 ${
                      selectedOption === option
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    } hover:bg-indigo-400 dark:hover:bg-indigo-600 text-left`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                className="mt-6 w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all duration-300"
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
