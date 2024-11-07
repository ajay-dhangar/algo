---
id: recusrion-in-dsa
title: Recursion data structure
sidebar_label: Recursion
sidebar_position: 1
description: "Recursion is a programming technique where a function calls itself directly or indirectly in order to solve a larger problem by breaking it down into smaller, more manageable sub-problems. It is commonly used in algorithms involving divide and conquer strategies, tree traversal, and dynamic programming."
tags: [recursion, algorithms, dsa]
---

# Recursion

## Introduction
Recursion is a programming technique in which a function calls itself directly or indirectly to solve a problem. It involves breaking down a problem into smaller sub-problems that are easier to solve. Recursion is widely used in problems involving trees, graphs, backtracking, and dynamic programming.

## How Recursion Works
Every recursive function consists of two main parts:
1. **Base Case**: This condition stops the recursion. It prevents the function from calling itself indefinitely.
2. **Recursive Case**: The part where the function calls itself with modified arguments, moving towards the base case.

```cpp
// Example: Factorial of a number using recursion
int factorial(int n) {
    if (n == 0) 
        return 1; // Base case
    else 
        return n * factorial(n - 1); // Recursive case
}
```
In the above example, the base case is when n == 0, and the recursive case multiplies n with factorial(n - 1) until the base case is reached.

## Types of Recursion
1. Direct Recursion
When a function calls itself directly, it's called direct recursion.
```cpp
void function() {
    // Some code
    function(); // Direct recursive call
}
```

## 2. Indirect Recursion
In indirect recursion, a function calls another function, which in turn calls the original function.
```cpp
void functionA() {
    // Some code
    functionB(); // Calls functionB
}

void functionB() {
    // Some code
    functionA(); // Calls functionA
}
```

## Key Concepts in Recursion
1. Stack Memory
Recursion uses the call stack to keep track of the recursive calls. Each function call is stored in the stack until it reaches the base case. After that, the calls are resolved in reverse order, one by one.

2. Recursive Depth
The number of times a recursive function calls itself is known as recursive depth. Too many recursive calls may lead to a stack overflow error.

3. Tail Recursion
If the recursive call is the last operation in the function, it's known as tail recursion. Tail-recursive functions are often optimized by compilers to prevent stack overflow.
```cpp
// Example: Tail recursion
int tailFactorial(int n, int result = 1) {
    if (n == 0) return result;  // Base case
    return tailFactorial(n - 1, result * n); // Tail recursive case
}
```

## Advantages of Recursion
- Simplifies the solution for problems that can be broken down into similar sub-problems.
- Makes code more elegant and easier to understand for certain problems (e.g., tree traversal, Fibonacci sequence).

## Disadvantages of Recursion
- Recursive solutions are often less efficient than their iterative counterparts due to the overhead of function calls and the use of stack memory.
- May cause stack overflow errors if the recursion depth is too large.

## Common Applications of Recursion
- Tree and Graph Traversal: Depth-First Search (DFS), Inorder, Preorder, and Postorder traversals.
- Backtracking Algorithms: Solving puzzles like Sudoku, N-Queens Problem, etc.
- Divide and Conquer Algorithms: Merge Sort, Quick Sort.
- Mathematical Problems: Factorials, Fibonacci numbers, Greatest Common Divisor (GCD).

## Example Problems
1. Fibonacci Sequence
```cpp
int fibonacci(int n) {
    if (n <= 1) 
        return n;  // Base case
    return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive case
}
```

2. Sum of Natural Numbers
```cpp
int sumOfNaturalNumbers(int n) {
    if (n == 0)
        return 0;  // Base case
    return n + sumOfNaturalNumbers(n - 1);  // Recursive case
}
```

## Conclusion
Recursion is a powerful tool in programming that can simplify complex problems by breaking them into sub-problems. However, it requires careful handling of base cases and optimization (like tail recursion) to avoid issues like stack overflow.
