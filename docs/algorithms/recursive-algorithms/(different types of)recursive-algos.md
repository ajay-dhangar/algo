---
title: Types of recursive algos
sidebar_label: recursive algorithm
sidebar_position: 2
description: Recursive algorithms are powerful techniques for solving problems by breaking them down into smaller, more manageable subproblems.
tags: [recursive-algos]
---

<hr>

# Types of Recursive Algorithms

## Overview
Recursive algorithms are powerful techniques for solving problems by breaking them down into smaller, more manageable subproblems. Here are some common types of recursive algorithms:

### 1. Linear Recursion

- **Description**: Calls itself once per iteration.
- **Example**: Calculating the factorial of a number.

```java
public int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```

### 2. Tail Recursion

- **Description**: The recursive call is the last operation in the function. Optimizes the call stack.
- **Example**: Calculating the factorial with tail recursion.

```java
public int tailFactorial(int n, int result) {
    if (n == 0) return result;
    return tailFactorial(n - 1, n * result);
}
```

### 3. Binary Recursion

- **Description**: Makes two recursive calls per iteration.
- **Example**: Calculating Fibonacci numbers.

```java
public int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### 4. Multiple Recursion

- **Description**: Calls itself multiple times in different branches.
- **Example**: Towers of Hanoi problem.

```java
public void towersOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        System.out.println("Move disk 1 from " + from + " to " + to);
        return;
    }
    towersOfHanoi(n - 1, from, aux, to);
    System.out.println("Move disk " + n + " from " + from + " to " + to);
    towersOfHanoi(n - 1, aux, to, from);
}
```

### 5. Nested Recursion

- **Description**: A function calls itself within the arguments of a call to itself.
- **Example**: Ackermann function.

```java
public int ackermann(int m, int n) {
    if (m == 0) return n + 1;
    if (m > 0 && n == 0) return ackermann(m - 1, 1);
    if (m > 0 && n > 0) return ackermann(m - 1, ackermann(m, n - 1));
    return -1; // Unreachable but satisfies the compiler
}
```

## Conclusion
Each type of recursion has its own unique use cases and benefits, making recursion a versatile tool in solving complex problems. Whether you're calculating factorials, solving the Towers of Hanoi, or implementing the Ackermann function, understanding these types will enhance your problem-solving toolkit.
