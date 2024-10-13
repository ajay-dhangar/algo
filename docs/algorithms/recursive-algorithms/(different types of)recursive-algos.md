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
  
  ![image](https://github.com/user-attachments/assets/31fb0686-350b-4c8d-9d28-7923fbc384cb)
- **Example**: Calculating the factorial of a number.

```java
public class Factorial {
    public static int factorial(int n) {
        if (n == 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    public static void main(String args[]) {
        int number = 5; 
        int result = factorial(number);
        System.out.println("The factorial of " + number + " is: " + result);
    }
}
```

### 2. Tail Recursion

- **Description**: The recursive call is the last operation in the function. Optimizes the call stack.
  
  ![image](https://github.com/user-attachments/assets/deb318ce-a496-4326-b2f9-d821e1d9ef93)

- **Example**: Calculating the factorial with tail recursion.

```java
public class TailRecursiveFactorial {

    public static int factorial(int n) {
        return factorialHelper(n, 1);
    }
    private static int factorialHelper(int n, int accumulator) {
        if (n == 0) {
            return accumulator;
        } else { return factorialHelper(n - 1, n * accumulator); }
    }
    public static void main(String[] args) {
        int number = 5;
        int result = factorial(number);
        System.out.println("The factorial of " + number + " is: " + result);
    }
}
```

### 3. Binary Recursion

- **Description**: Makes two recursive calls per iteration.

  ![image](https://github.com/user-attachments/assets/70747a92-6678-4e87-8644-14d55c473546)

- **Example**: Calculate fibonacci numbers.


```java
public class FibonacciBinaryRecursion {
    public static int fibonacci(int n) {
        if (n <= 1) {return n;}
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    public static void main(String[] args) {
        int number = 10; 
        for (int i = 0; i <= number; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}
```

### 4. Multiple Recursion

- **Description**: Calls itself multiple times in different branches.
- **Example**: Towers of Hanoi problem.

```java
public class TowerOfHanoi {
    public static void towerOfHanoi(int n, char from, char to, char aux) {
        if (n == 1) {
            System.out.println("Move disk 1 from rod " + from + " to rod " + to);
            return;
        }
        towerOfHanoi(n - 1, from, aux, to);
        System.out.println("Move disk " + n + " from rod " + from + " to rod " + to);
        towerOfHanoi(n - 1, aux, to, from);
    }
    public static void main(String[] args) {
        int n = 3; // No. of disks
        towerOfHanoi(n, 'P', 'Q', 'R'); // P, Q, R are names of rods
    }
}
```

### 5. Nested Recursion

- **Description**: A function calls itself within the arguments of a call to itself.

  ![image](https://github.com/user-attachments/assets/f212d8e4-6774-40f2-8f13-05a0434bce9a)

- **Example**: Ackermann function.

```java
public class AckermannFunction {
    public static int ackermann(int m, int n) {
        if (m == 0) {
            return n + 1;
        } else if (m > 0 && n == 0) {
            return ackermann(m - 1, 1);
        } else if (m > 0 && n > 0) {
            return ackermann(m - 1, ackermann(m, n - 1));
        } else {return -1; // This case will never be reached}
    }
    public static void main(String[] args) {
        int m = 3;  
        int n = 2;
        int result = ackermann(m, n);
        System.out.println("Ackermann(" + m + ", " + n + ") = " + result);
    }
}
```

## Conclusion
Each type of recursion has its own unique use cases and benefits, making recursion a versatile tool in solving complex problems. Whether you're calculating factorials, solving the Towers of Hanoi, or implementing the Ackermann function, understanding these types will enhance your problem-solving toolkit.
