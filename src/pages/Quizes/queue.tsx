import React, { useState } from "react";
import Layout from "@theme/Layout";

const QueueQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          1. Following is C like pseudo-code of a function that takes a Queue as an argument and uses a stack S to do processing. What does the function do in general?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`void fun(Queue *Q)
{
    Stack S;
    while (!isEmpty(Q)) {
        push(&S, deQueue(Q));
    }
    while (!isEmpty(&S)) {
        enQueue(Q, pop(&S));
    }
}`}
          </pre>
        </>
      ),
      options: [
        "A) Removes the last from Q",
        "B) Keeps Q same as it was before the call",
        "C) Makes Q empty",
        "D) Reverses the Q",
      ],
      answer: "D) Reverses the Q",
    },
    {
      question: (
        <>
          2. How many stacks are needed to implement a queue? Consider the situation where no other data structure like arrays, linked list is available.
        </>
      ),
      options: ["A) 1", "B) 2", "C) 3", "D) 4"],
      answer: "B) 2",
    },
    {
      question: (
        <>
          3. Which of the following operations on a queue data structure has a time complexity of O(1)?
        </>
      ),
      options: [
        "A) Enqueue and Dequeue",
        "B) Dequeue only",
        "C) Peek only",
        "D) Enqueue and Clear",
      ],
      answer: "A) Enqueue and Dequeue",
    },
    // Average Questions
    {
      question: (
        <>
          4. A priority queue can be efficiently implemented using which of the following data structures? Assume that the number of insert, peek, and extraction operations are almost the same.
        </>
      ),
      options: [
        "A) Array",
        "B) Linked List",
        "C) Heap Data Structures like Binary Heap, Fibonacci Heap",
        "D) None of the above",
      ],
      answer: "C) Heap Data Structures like Binary Heap, Fibonacci Heap",
    },
    {
      question: (
        <>
          5. Which of the following is true about the linked list implementation of a queue?
        </>
      ),
      options: [
        "A) In push operation, if new nodes are inserted at the beginning of the linked list, then in pop operation, nodes must be removed from the end.",
        "B) In push operation, if new nodes are inserted at the end, then in pop operation, nodes must be removed from the beginning.",
        "C) Both of the above",
        "D) None of the above",
      ],
      answer: "B) In push operation, if new nodes are inserted at the end, then in pop operation, nodes must be removed from the beginning.",
    },
    // Difficult Questions
    {
      question: (
        <>
          6. A Priority-Queue is implemented as a Max-Heap. Initially, it has 5 elements. The level-order traversal of the heap is: 10, 8, 5, 3, 2. Two new elements “1” and “7” are inserted in that order. What will be the level-order traversal after the insertion?
        </>
      ),
      options: [
        "A) 10, 8, 7, 5, 3, 2, 1",
        "B) 10, 8, 7, 2, 3, 1, 5",
        "C) 10, 8, 7, 1, 2, 3, 5",
        "D) 10, 8, 7, 3, 2, 1, 5",
      ],
      answer: "A) 10, 8, 7, 5, 3, 2, 1",
    },
    {
      question: (
        <>
          7. An implementation of a queue Q, using two stacks S1 and S2, is given. Let n insert and m (≤n) delete operations be performed in an arbitrary order on an empty queue Q. Let x and y be the number of push and pop operations performed respectively. Which is true for all m and n?
        </>
      ),
      options: [
        "A) n+m ≤ x < 2n and 2m ≤ y ≤ n+m",
        "B) n+m ≤ x < 2n and 2m ≤ y ≤ 2n",
        "C) 2m ≤ x < 2n and 2m ≤ y ≤ n+m",
        "D) 2m ≤ x < 2n and 2m ≤ y ≤ 2n",
      ],
      answer: "B) n+m ≤ x < 2n and 2m ≤ y ≤ 2n",
    },
    {
      question: (
        <>
          8. Consider the following operation along with Enqueue and Dequeue operations on queues, where k is a global parameter:
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
        "A) Theta(n)",
        "B) Theta(n+k)",
        "C) Theta(nk)",
        "D) Theta(n²)",
      ],
      answer: "A) Theta(n)",
    },
    {
      question: (
        <>
          9. Consider the following pseudo-code. Assume that IntQueue is an integer queue. What does the function fun do?
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`fun(int n){
   IntQueue q = new IntQueue();
   q.enqueue(0);
   q.enqueue(1);
   for (int i = 0; i < n; i++) {
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
        "D) Prints first n Fibonacci numbers in reverse order",
      ],
      answer: "C) Prints first n Fibonacci numbers",
    },
    {
      question: (
        <>
          10. In the context of queue data structures, what is a circular queue?
        </>
      ),
      options: [
        "A) A queue that does not have a fixed size.",
        "B) A queue where the last element is connected back to the first element.",
        "C) A queue that can only be used in a single-threaded environment.",
        "D) A queue that allows for elements to be added and removed simultaneously.",
      ],
      answer: "B) A queue where the last element is connected back to the first element.",
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
      <div style={{ backgroundColor: "lightblue", padding: "20px", borderRadius: "8px", color: "black", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Quiz on Queues</h2>
        {showResult ? (
          <div style={{ textAlign: "center", marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: "white" }}>
            <h3 style={{ color: "black" }}>Your Score: <span style={{ fontWeight: "bold", fontSize: "24px" }}>{score}</span> 🎉</h3>
          </div>
        ) : (
          <div>
            <h3>{questions[currentQuestion].question}</h3>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedOption}
              >
                {option}
              </button>
            ))}
            {selectedOption && (
              <div style={{ marginTop: "20px" }}>
                <h4 style={{ color: selectedOption === questions[currentQuestion].answer ? "green" : "red" }}>
                  {selectedOption === questions[currentQuestion].answer ? "Correct!" : "Wrong!"}
                </h4>
                <button onClick={nextQuestion} style={{ marginTop: "10px" }}>
                  Next Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QueueQuiz;
