---
id: swift-dynamic-programming
title: Dynamic Programming in Swift
sidebar_label: Dynamic Programming
sidebar_position: 11
description: Learn how to solve Dynamic Programming problems in Swift, including Fibonacci and Longest Common Subsequence (LCS) with complexity analysis.
tags: [swift, algorithms, dynamic-programming, dp]
---

# Dynamic Programming in Swift

Dynamic Programming (DP) is an algorithmic paradigm that solves a complex problem by breaking it into subproblems, solving each subproblem just once, and storing their solutions (often using memoization or tabulation) to avoid redundant computations.

Here, we explore two classic Dynamic Programming problems and their implementations in Swift.

---

## 1. Fibonacci Number

The Fibonacci sequence is defined as:
- $F(0) = 0, F(1) = 1$
- $F(n) = F(n-1) + F(n-2)$ for $n > 1$.

### Tabulation (Bottom-Up) Implementation

This implementation optimizes space usage to $O(1)$ by only storing the last two calculated values.

```swift
func fibonacci(_ n: Int) -> Int {
    guard n > 1 else { return n }
    
    var prev2 = 0
    var prev1 = 1
    var current = 0
    
    for _ in 2...n {
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    }
    
    return current
}

// Example usage:
print("Fibonacci(10): \(fibonacci(10))")
// Output: Fibonacci(10): 55
```

### Complexity Analysis
- **Time Complexity**: $O(n)$ because we iterate from 2 to $n$.
- **Space Complexity**: $O(1)$ auxiliary space.

---

## 2. Longest Common Subsequence (LCS)

Given two strings `text1` and `text2`, return the length of their longest common subsequence. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

### Tabulation (Bottom-Up) Implementation

```swift
func longestCommonSubsequence(_ text1: String, _ text2: String) -> Int {
    let t1 = Array(text1)
    let t2 = Array(text2)
    let m = t1.count
    let n = t2.count
    
    // Create a 2D array of size (m+1) x (n+1) initialized with 0
    var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
    
    for i in 1...m {
        for j in 1...n {
            if t1[i - 1] == t2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    
    return dp[m][n]
}

// Example usage:
let lcsLength = longestCommonSubsequence("abcde", "ace")
print("LCS Length: \(lcsLength)")
// Output: LCS Length: 3 (Subsequence: "ace")
```

### Complexity Analysis
- **Time Complexity**: $O(m \times n)$ where $m$ and $n$ are the lengths of `text1` and `text2`.
- **Space Complexity**: $O(m \times n)$ to store the DP table.
