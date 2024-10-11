import React, { useState } from "react";
import Layout from "@theme/Layout";

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
            <div style={{ marginBottom: "20px" }}>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="quizOption"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleAnswer(option)}
                  />
                  <label htmlFor={`option${index}`} style={{ marginLeft: "8px" }}>{option}</label>
                </div>
              ))}
            </div>
            <button onClick={nextQuestion} disabled={!selectedOption} style={{ backgroundColor: "green", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QueueQuiz;
