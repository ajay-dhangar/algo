import React, { useState } from "react";
import Layout from "@theme/Layout";

const StackQuiz: React.FC = () => {
  const questions = [
    // Easy Questions
    {
      question: (
        <>
          Following is C like pseudo code of a function that takes a number as an argument, and uses a stack S to do processing.
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`void fun(int n)
{
    Stack S;  // Say it creates an empty stack S
    while (n > 0)
    {
      push(&S, n%2);
      n = n/2;
    }

    while (!isEmpty(&S))
      printf("%d ", pop(&S));
}`}
          </pre>
          What does the above function do in general?
        </>
      ),
      options: [
        "A) Prints binary representation of n in reverse order",
        "B) Prints binary representation of n",
        "C) Prints the value of Logn",
        "D) Prints the value of Logn in reverse order",
      ],
      answer: "A) Prints binary representation of n in reverse order",
    },
    {
      question: (
        <>
          Consider the following pseudocode that uses a stack:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`declare a stack of characters
while (there are more characters in the word to read)
{
    read a character
    push the character on the stack
}
while (the stack is not empty)
{
    pop a character off the stack
    write the character to the screen
}`}
          </pre>
          What is output for input "geeksquiz"?
        </>
      ),
      options: [
        "A) geeksquizgeeksquiz",
        "B) ziuqskeeg",
        "C) geeksquiz",
        "D) ziuqskeegziuqskeeg",
      ],
      answer: "B) ziuqskeeg",
    },
    {
      question: (
        <>
          Following is an incorrect pseudocode for the algorithm which is supposed to determine whether a sequence of parentheses is balanced:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`declare a character stack 
while (more input is available)
{
    read a character
    if (the character is a '(' ) 
        push it on the stack
    else if (the character is a ')' and the stack is not empty)
        pop a character off the stack
    else
        print "unbalanced" and exit
}
print "balanced"`}
          </pre>
          Which of these unbalanced sequences does the above code think is balanced?
        </>
      ),
      options: [
        "A) ((())",
        "B) ())(()",
        "C) (()())",
        "D) (()))()",
      ],
      answer: "D) (()))()",
    },
    // Average Questions
    {
      question: (
        <>
          The following postfix expression with single digit operands is evaluated using a stack:
          <pre style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
            {`8 2 3 ^ / 2 3 * + 5 1 * -`}
          </pre>
          The top two elements of the stack after the first * is evaluated are:
        </>
      ),
      options: [
        "A) 6, 1",
        "B) 5, 7",
        "C) 3, 2",
        "D) 1, 5",
      ],
      answer: "A) 6, 1",
    },
    {
      question: (
        <>
          A single array A[1..MAXSIZE] is used to implement two stacks. The two stacks grow from opposite ends of the array. If the space is to be used efficiently, the condition for “stack full” is:
        </>
      ),
      options: [
        "A) (top1 = MAXSIZE/2) and (top2 = MAXSIZE/2+1)",
        "B) top1 + top2 + 1 = MAXSIZE",
        "C) (top1= MAXSIZE/2) or (top2 = MAXSIZE)",
        "D) top1= top2 -1",
      ],
      answer: "B) top1 + top2 + 1 = MAXSIZE",
    },
    {
      question: (
        <>
          Assume that the operators +, -, × are left associative and ^ is right associative. The order of precedence (from highest to lowest) is ^, x , +, -. The postfix expression corresponding to the infix expression a + b × c - d ^ e ^ f is
        </>
      ),
      options: [
        "A) abc × + def ^ ^ -",
        "B) abc × + de ^ f ^ -",
        "C) ab + c × d - e ^ f ^",
        "D) - + a × bc ^ ^ def",
      ],
      answer: "A) abc × + def ^ ^ -",
    },
    // Difficult Questions
    {
      question: (
        <>
          The result evaluating the postfix expression 10 5 + 60 6 / * 8 – is
        </>
      ),
      options: [
        "A) 284",
        "B) 213",
        "C) 142",
        "D) 71",
      ],
      answer: "C) 142", // Removed answer
    },
    {
      question: (
        <>
          A function f defined on stacks of integers satisfies the following properties. f(∅) = 0 and f(push(S, i)) = max(f(S), 0) + i for all stacks S and integers i.
          If a stack S contains the integers 2, -3, 2, -1, 2 in order from bottom to top, what is f(S)?
        </>
      ),
      options: [
        "A) 6",
        "B) 4",
        "C) 3",
        "D) 2",
      ],
      answer: "A) 6",
    },
    {
      question: (
        <>
          A priority queue Q is used to implement a stack S that stores characters. PUSH(C) is implemented as INSERT(Q, C, K) where K is an appropriate integer key chosen by the implementation. For a sequence of operations, the keys chosen are in
        </>
      ),
      options: [
        "A) Non-increasing order",
        "B) Non-decreasing order",
        "C) strictly increasing order",
        "D) strictly decreasing order",
      ],
      answer: "C) strictly increasing order",
    },
    {
      question: (
        <>
          If the sequence of operations - push (1), push (2), pop, push (1), push (2), pop, pop, pop, push (2), pop are performed on a stack, the sequence of popped out values
        </>
      ),
      options: [
        "A) 2,2,1,1,2",
        "B) 2,2,1,2,2",
        "C) 2,1,2,2,1",
        "D) 2,1,2,2,2",
      ],
      answer: "C) 2,1,2,2,1",
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
    <Layout title="Stack Quiz" description="Evaluate your understanding of stack operations and applications.">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-center transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz on Stack</h2>
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

export default StackQuiz;
