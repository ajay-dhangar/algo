import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import axios from "axios";

import QuestionProgress
from "../../components/Quiz/QuestionProgress";

import QuestionNavigator
from "../../components/Quiz/QuestionNavigator";

const QueueQuiz: React.FC = () => {
  const questions = [
    {
      question: (
        <>
          1. Following is C like pseudo-code of a function that takes a Queue as an argument, and uses a stack S to do processing.
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`void fun(Queue *Q)
{
    Stack S;  // Say it creates an empty stack S

    // Run while Q is not empty
    while (!isEmpty(Q))
    {
        // deQueue an item from Q and push the dequeued item to S
        push(&S, deQueue(Q));
    }

    // Run while Stack S is not empty
    while (!isEmpty(&S))
    {
      // Pop an item from S and enqueue the popped item to Q
      enQueue(Q, pop(&S));
    }
}`}
          </pre>
        </>
      ),
      options: [
        "A) Removes the last from Q",
        "B) Keeps the Q same as it was before the call",
        "C) Makes Q empty",
        "D) Reverses the Q"
      ],
      answer: "D) Reverses the Q",
    },
    {
      question: "2. How many stacks are needed to implement a queue? Consider the situation where no other data structure like arrays, linked list is available to you.",
      options: ["A) 1", "B) 2", "C) 3", "D) 4"],
      answer: "B) 2",
    },
    {
      question: "3. Which of the following operations on a queue data structure has a time complexity of O(1)?",
      options: ["A) Enqueue", "B) Dequeue", "C) Peek", "D) Clear"],
      answer: "A and B",
    },
    {
      question: "4. A priority queue can be efficiently implemented using which of the following data structures?",
      options: ["A) Array", "B) Linked List", "C) Heap Data Structures like Binary Heap, Fibonacci Heap", "D) None of the above"],
      answer: "C) Heap Data Structures like Binary Heap, Fibonacci Heap",
    },
    {
      question: "5. Which of the following is true about linked list implementation of a queue?",
      options: [
        "A) In push operation, if new nodes are inserted at the beginning of linked list, then in pop operation, nodes must be removed from end.",
        "B) In push operation, if new nodes are inserted at the end, then in pop operation, nodes must be removed from the beginning.",
        "C) Both of the above",
        "D) None of the above"
      ],
      answer: "C) Both of the above",
    },
    {
      question: "6. A Priority-Queue is implemented as a Max-Heap. Initially, it has 5 elements. The level-order traversal of the heap is given below: 10, 8, 5, 3, 2. Two new elements '1' and '7' are inserted in the heap in that order. The level-order traversal of the heap after the insertion of the elements is:",
      options: [
        "A) 10, 8, 7, 5, 3, 2, 1",
        "B) 10, 8, 7, 2, 3, 1, 5",
        "C) 10, 8, 7, 1, 2, 3, 5",
        "D) 10, 8, 7, 3, 2, 1, 5"
      ],
      answer: "A) 10, 8, 7, 5, 3, 2, 1",
    },
    {
      question: (
        <>
          7. An implementation of a queue Q, using two stacks S1 and S2, is given below:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`void insert(Q, x) {
   push(S1, x);
}
 
void delete(Q){
   if(stack-empty(S2)) then 
      if(stack-empty(S1)) then {
          print(“Q is empty”);
          return;
      }
      else while (!(stack-empty(S1))){
          x=pop(S1);
          push(S2,x);
      }
   x=pop(S2);
}`}
          </pre>
        </>
      ),
      options: [
        "A) n+m <= x < 2n and 2m <= y <= n+m",
        "B) n+m <= x < 2n and 2m <= y <= 2n",
        "C) 2m <= x < 2n and 2m <= y <= n+m",
        "D) 2m <= x < 2n and 2m <= y <= 2n"
      ],
      answer: "A) n+m <= x < 2n and 2m <= y <= n+m",
    },
    {
      question: (
        <>
          8. Consider the following operation along with Enqueue and Dequeue operations on queues, where k is a global parameter.
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`MultiDequeue(Q){
   m = k
   while (Q is not empty and m  > 0) {
      Dequeue(Q)
      m = m - 1
   }
}`}
          </pre>
          What is the worst-case time complexity of a sequence of n MultiDequeue() operations on an initially empty queue?
        </>
      ),
      options: [
        "A) Θ(n)",
        "B) Θ(n + k)",
        "C) Θ(nk)",
        "D) Θ(n²)"
      ],
      answer: "B) Θ(n + k)",
    },
    {
      question: (
        <>
          9. Consider the following pseudo code. Assume that IntQueue is an integer queue. What does the function fun do?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`fun(int n)
{
   IntQueue q = new IntQueue();
   q.enqueue(0);
   q.enqueue(1);
   for (int i = 0; i < n; i++)
   {
      int a = q.dequeue();
      int b = q.dequeue();
      q.enqueue(b);
      q.enqueue(a + b);
      print(a);
   }
}`}
          </pre>
        </>
      ),
      options: [
        "A) Prints numbers from 0 to n-1",
        "B) Prints numbers from n-1 to 0",
        "C) Prints first n Fibonacci numbers",
        "D) Prints first n Fibonacci numbers in reverse order"
      ],
      answer: "C) Prints first n Fibonacci numbers",
    },
    {
      question: "10. Which of the following is NOT a common operation in a queue data structure?",
      options: ["A) Enqueue", "B) Dequeue", "C) Peek", "D) Shuffle"],
      answer: "D) Shuffle",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Custom states for persistence, timer, and history
  const [usernameInput, setUsernameInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem("quiz_userId");
    const storedName = localStorage.getItem("quiz_username");
    if (storedId && storedName) {
      setUserId(storedId);
      setUsername(storedName);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAttempts(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (showResult || !userId) return;
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult, userId]);

  const fetchAttempts = async (uId: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/quiz-attempts/${uId}/queue`);
      if (res.data?.success) {
        setAttempts(res.data.attempts);
      }
    } catch (e) {
      console.error("Error fetching attempt history:", e);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    const slug = usernameInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    localStorage.setItem("quiz_userId", slug);
    localStorage.setItem("quiz_username", usernameInput.trim());
    setUserId(slug);
    setUsername(usernameInput.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("quiz_userId");
    localStorage.removeItem("quiz_username");
    setUserId(null);
    setUsername(null);
    setAttempts([]);
  };

  const submitAttempt = async (finalAnswers: string[]) => {
    if (!userId) return;
    try {
      await axios.post("http://localhost:5000/api/quiz-attempts", {
        userId,
        quizId: "queue",
        userAnswers: finalAnswers,
        timeSpent
      });
      fetchAttempts(userId);
    } catch (e) {
      console.error("Error submitting attempt:", e);
    }
  };

  const handleAnswer = (selected: string) => {
    setSelectedOption(selected);
  };

  const nextQuestion = () => {
    if (selectedOption === null) return;

    setUserAnswers((prev) => [...prev, selectedOption]);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      const finalAnswers = [...userAnswers, selectedOption];
      submitAttempt(finalAnswers);
    }
  };

  if (!userId) {
    return (
      <Layout title="Queue Quiz" description="Test your knowledge of queues with this quiz!">
        <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md text-center border border-gray-100 dark:border-gray-700">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome to the Quiz!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Please enter your username to track your progress, save your attempts, and compete on the global leaderboard.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Enter username (e.g. JohnDoe)"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer border-none"
              >
                Let's Begin!
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Queue Quiz" description="Test your knowledge of queues with this quiz!">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
            <span>Logged in as: <strong className="text-gray-900 dark:text-white">{username}</strong></span>
            <button onClick={handleLogout} className="text-red-500 hover:underline border-none bg-transparent cursor-pointer">Change User</button>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Quiz on Queues</h2>

          <QuestionProgress
currentQuestion={currentQuestion}
totalQuestions={questions.length}
/>

<QuestionNavigator
questions={questions}
currentQuestion={currentQuestion}
userAnswers={userAnswers}
setCurrentQuestionIndex={setCurrentQuestion}
/>

          {!showResult && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-right">
              ⏱ Time: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </div>
          )}

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
                    <div className="text-lg font-semibold">{q.question}</div>
                    <p className="text-md">
                      <span className="font-bold">Your Answer:</span> {userAnswers[index]}
                    </p>
                    <p className="text-md">
                      <span className="font-bold">Correct Answer:</span> {q.answer}
                    </p>
                    {q.explanation && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        <span className="font-bold">Explanation:</span> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 text-left">
                {questions[currentQuestion].question}
              </div>
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
                disabled={selectedOption === null}
                className={`mt-6 py-2 px-4 text-white rounded-lg w-full transition-colors duration-300 border-none font-semibold ${
                  selectedOption === null
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 cursor-pointer"
                }`}
              >
                Next Question
              </button>
            </div>
          )}

          {/* Attempts History */}
          {attempts.length > 0 && (
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-left w-full">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Attempt History:</h3>
              <div className="space-y-3">
                {attempts.map((att, index) => (
                  <div key={att.id || index} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(att.completedAt).toLocaleString()}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Attempt #{attempts.length - index}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {att.score} / {att.totalQuestions} ({Math.round((att.score / att.totalQuestions) * 100)}%)
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Time spent: {Math.floor(att.timeSpent / 60)}m {att.timeSpent % 60}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default QueueQuiz;
