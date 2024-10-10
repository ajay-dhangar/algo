import React, { useState } from "react";
import Layout from "@theme/Layout";

const ArrayQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1.What will the output of the below code?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
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
      question:
        "2.The minimum number of comparisons required to determine if an integer appears more than n/2 times in a sorted array of n integers is",
      options: ["A) Θ(n)", "B) Θ(logn)", "C) Θ(n*logn)", "D) Θ(1)"],
      answer: "A) Θ(n)",
    },
    {
      question: (
        <>
          3.An algorithm performs (logN) find operations, N insert operations,
          (logN) delete operations, and (logN) decrease-key operations on a
          set of data items with keys drawn from a linearly ordered set. Which
          one of the following data structures is most suited for the algorithm
          to achieve the best total asymptotic complexity?
        </>
      ),
      options: [
        "A) Unsorted array",
        "B) Min-heap",
        "C) Sorted array",
        "D) Sorted doubly linked list",
      ],
      answer: "B) Min-heap",
    },
    // Average Questions
    {
      question:
        "4.Consider an array consisting of –ve and +ve numbers. What would be the worst-case time complexity of an algorithm to segregate the numbers having the same sign altogether?",
      options: ["A) O(N)", "B) O(N Log N)", "C) O(N * N)", "D) O(N Log Log N)"],
      answer: "A) O(N)",
    },
    {
      question: (
        <>
          5.Let A[1...n] be an array of n distinct numbers. If i &lt; j and
          A[i] &gt; A[j], then the pair (i, j) is called an inversion of A. What
          is the expected number of inversions in any permutation on n elements?
        </>
      ),
      options: [
        "A) n(n-1)/2",
        "B) n(n-1)/4",
        "C) n(n+1)/4",
        "D) 2n[logn]",
      ],
      answer: "A) n(n-1)/2",
    },
    {
      question: (
        <>
          6.Consider a two-dimensional array A[20][10]. Assume 4 words per
          memory cell, the base address of array A is 100, elements are stored
          in row-major order. What is the address of A[11][5]?
        </>
      ),
      options: ["A) 560", "B) 460", "C) 570", "D) 575"],
      answer: "A) 560",
    },
    {
      question: (
        <>
          7.An array A consists of n integers in locations A[0], A[1], ...,
          A[n-1]. Complete the following algorithm to cyclically shift the
          elements of the array to the left by k places:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`min = n; i = 0;
while (___________) {
    temp = A[i]; j = i;
    while (________) {
        A[j] = ________;
        j= (j + k) mod n;
        if (j < min) then min = j;
    }
    A[(n + i — k) mod n] = _________;
    i = __________;`}
          </pre>
        </>
      ),
      options: [
        "A) i > min; j != (n+i) mod n; A[j + k]; temp; i + 1;",
        "B) i < min; j != (n+i) mod n; A[j + k]; temp; i + 1;",
        "C) i > min; j != (n+i+k) mod n; A[(j + k)]; temp; i + 1;",
        "D) i < min; j != (n+i-k) mod n; A[(j + k)]; temp; i + 1;",
      ],
      answer: "A) i > min; j != (n+i) mod n; A[j + k]; temp; i + 1;",
    },
    // Difficult Questions
    {
      question: "8.Which of the following correctly declares an array?",
      options: ["A) int algo[20];", "B) int algo;", "C) algo{20};", "D) array algo[20];"],
      answer: "A) int algo[20];",
    },
    {
      question: (
        <>
          9.A three-dimensional array in ‘C++’ is declared as int A[x][y][z]. What is the address of an item at the location A[p][q][r]?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            
          </pre>
        </>
      ),
      options: [
        "A) &A[0][0][0] + w(y * z * q + z * p + r)",
        "B) &A[0][0][0] + w(y * z * p + z * q + r)",
        "C) &A[0][0][0] + w(x * y * p + z * q + r)",
        "D) &A[0][0][0] + w(x * y * q + z * p + r)",
      ],
      answer: "A) &A[0][0][0] + w(y * z * q + z * p + r)",
    },
    {
      question: (
        <>
          10.Let A be a square matrix of size n x n. What is the expected output of the following program?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`C = 100
for i = 1 to n do
    for j = 1 to n do
    {
        Temp = A[i][j] + C
        A[i][j] = A[j][i]
        A[j][i] = Temp - C
    }
for i = 1 to n do
    for j = 1 to n do
        Output(A[i][j]);`}
          </pre>
        </>
      ),
      options: [
        "A) Output the transposed matrix",
        "B) Output the original matrix",
        "C) Output an identity matrix",
        "D) Output an error",
      ],
      answer: "A) Output the transposed matrix",
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
        <h2 style={{ textAlign: "center" }}>Quiz on Arrays</h2>
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

export default ArrayQuiz;

