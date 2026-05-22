---
slug: dynamic-programming-introduction
title: 'Dynamic Programming: A Beginner-Friendly Guide'
authors: [Riya-Sharma]
tags: [dynamic-programming, dp, dsa, java, recursion, algorithms]
---

Dynamic Programming (DP) is one of the most important techniques in Data Structures and Algorithms. It is used to solve complex problems efficiently by breaking them into smaller overlapping subproblems and storing their results.

DP is widely used in coding interviews, competitive programming, and optimization problems.

<!-- truncate -->


## What is Dynamic Programming?

Dynamic Programming is an optimization technique used when a problem can be broken into smaller subproblems, and the same subproblems are solved multiple times.

Instead of solving the same problem again and again, we store the result and reuse it.

---


## When to Use DP?

A problem can be solved using DP if it has:

### 1. Overlapping Subproblems
Same subproblems are solved multiple times.

### 2. Optimal Substructure
Final solution can be built using solutions of smaller subproblems.

---


## Simple Example: Fibonacci Series

Fibonacci is the best example to understand DP.

:contentReference[oaicite:0]{index=0}

### Recursive Approach (Slow)

```java
import java.util.*;
class Main {
    static int fib(int n) {
        if (n <= 1) return n;

        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fib(6));
    }
}
```
Time Complexity: O(2^n) (very slow)

---


## DP Approach 1: Memoization (Top-Down)

We store already computed results.
```java
import java.util.Arrays;

class Main {

    static int[] dp = new int[1000];

    static int fib(int n) {

        if (n <= 1) return n;

        if (dp[n] != -1) return dp[n];

        return dp[n] = fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {

        Arrays.fill(dp, -1);

        System.out.println(fib(6));
    }
}
```
Time Complexity: O(n)
Space Complexity: O(n)

---


## DP Approach 2: Tabulation (Bottom-Up)

We solve from smallest subproblems first.

```java
import java.util.*;
class Main {

    static int fib(int n) {

        if (n <= 1) return n;

        int[] dp = new int[n + 1];

        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println(fib(6));
    }
}
```
---


## Space Optimization in DP

We can further reduce space.

```java
import java.util.*;
class Main {

    static int fib(int n) {

        if (n <= 1) return n;

        int prev2 = 0;
        int prev1 = 1;

        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }

    public static void main(String[] args) {
        System.out.println(fib(6));
    }
}
```

---


## Key Idea of DP

Instead of recomputing:

- **Solve once**
- **Store result**
- **Reuse when needed**

---


## Steps to Solve DP Problems

1. **Identify recursion**
2. **Find overlapping subproblems**
3. **Store results (memoization)**
4. **Convert to iteration (tabulation)**
5. **Optimize space if possible**

---


## Common DP Problems

- Fibonacci Number
- Climbing Stairs
- Coin Change
- House Robber
- Longest Common Subsequence (LCS)
- 0/1 Knapsack
- Longest Increasing Subsequence (LIS)

---


## Advantages of Dynamic Programming

- Reduces time complexity
- Avoids repeated calculations
- Helps solve optimization problems
- Very useful in interviews

---


## Conclusion

Dynamic Programming is a powerful technique that helps solve problems efficiently by storing previously computed results. It becomes easy once you understand recursion and start recognizing patterns.

Practice is the key to mastering DP.
