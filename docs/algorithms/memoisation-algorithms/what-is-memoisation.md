---
id: memoization-algorithms
sidebar_position: 1
title: What is Memoization?
sidebar_label: What is Memoization?
description: "Memoization is an optimization technique used primarily to speed up recursive algorithms by caching previously computed results."
tags: [dsa, algorithms, memoization, dynamic programming]
---

## Memoization

Memoization is an optimization technique used in computer science to improve the efficiency of recursive algorithms by storing the results of expensive function calls and reusing them when the same inputs occur again. This technique is particularly useful in dynamic programming, where problems can often be broken down into overlapping subproblems.

### Importance of Memoization

Memoization is vital for several reasons:

1. **Improved Performance**: By caching results of expensive function calls, memoization significantly reduces the time complexity of algorithms that would otherwise perform redundant calculations.
2. **Optimal Resource Utilization**: It helps in optimizing resource usage by avoiding unnecessary computations, leading to faster execution times and lower memory consumption in some scenarios.
3. **Simplifying Recursive Algorithms**: Memoization allows complex recursive algorithms to be implemented more straightforwardly, enhancing readability and maintainability of the code.
4. **Foundation for Dynamic Programming**: Understanding memoization is essential for grasping dynamic programming concepts, which are critical for solving many algorithmic challenges.

### Common Problems Utilizing Memoization

Here are some commonly encountered problems that can be efficiently solved using memoization:

- **Fibonacci Sequence**: Calculating Fibonacci numbers using memoization avoids the exponential time complexity of naive recursive approaches.
- **Longest Common Subsequence**: Finding the length of the longest common subsequence between two strings can be optimized with memoization.
- **Knapsack Problem**: Solving the 0/1 knapsack problem using memoization allows for efficient computation of maximum value.
- **Edit Distance**: Calculating the minimum edit distance between two strings can be optimized with memoization.

### Memoization Implementation Examples

#### 1. **Fibonacci Sequence**

**Problem**: Compute the n-th Fibonacci number using memoization.

**Python Implementation**:
```python
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

# Example usage
print(fibonacci(10))  # Output: 55
```

**C++ Implementation**:
```C++
#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<int, long long> memo;

long long fibonacci(int n) {
    if (memo.count(n)) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return memo[n];
}

int main() {
    cout << fibonacci(10) << endl;  // Output: 55
    return 0;
}

```

#### 2. **Longest Common Subsequence**

**Problem**: Find the length of the longest common subsequence between two strings.
**Python Implementation**:
```python
def lcs(x, y, m, n, memo={}):
    if (m, n) in memo:
        return memo[(m, n)]
    if m == 0 or n == 0:
        return 0
    if x[m - 1] == y[n - 1]:
        memo[(m, n)] = 1 + lcs(x, y, m - 1, n - 1, memo)
    else:
        memo[(m, n)] = max(lcs(x, y, m, n - 1, memo), lcs(x, y, m - 1, n, memo))
    return memo[(m, n)]

# Example usage
x = "AGGTAB"
y = "GXTXAYB"
print(lcs(x, y, len(x), len(y)))  # Output: 4
```

**C++ Implementation**:
```C++
#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<string, int> memo;

int lcs(string x, string y, int m, int n) {
    if (m == 0 || n == 0) return 0;
    string key = to_string(m) + "|" + to_string(n);
    if (memo.count(key)) return memo[key];
    
    if (x[m - 1] == y[n - 1]) {
        memo[key] = 1 + lcs(x, y, m - 1, n - 1);
    } else {
        memo[key] = max(lcs(x, y, m, n - 1), lcs(x, y, m - 1, n));
    }
    return memo[key];
}

int main() {
    string x = "AGGTAB";
    string y = "GXTXAYB";
    cout << lcs(x, y, x.size(), y.size()) << endl;  // Output: 4
    return 0;
}
```


#### 3. **0/1 Knapsack Problem**

**Problem**: Find the maximum value that can be obtained in a knapsack of a given capacity.

**Python Implementation**:
```python
def knapsack(weights, values, capacity, n, memo={}):
    if (n, capacity) in memo:
        return memo[(n, capacity)]
    if n == 0 or capacity == 0:
        return 0
    if weights[n - 1] > capacity:
        memo[(n, capacity)] = knapsack(weights, values, capacity, n - 1, memo)
    else:
        memo[(n, capacity)] = max(values[n - 1] + knapsack(weights, values, capacity - weights[n - 1], n - 1, memo),
                                   knapsack(weights, values, capacity, n - 1, memo))
    return memo[(n, capacity)]

# Example usage
weights = [1, 2, 3]
values = [10, 15, 40]
capacity = 6
n = len(values)
print(knapsack(weights, values, capacity, n))  # Output: 55

```

**C++ Implementation**:
```C++
#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<string, int> memo;

int knapsack(int weights[], int values[], int capacity, int n) {
    if (n == 0 || capacity == 0) return 0;
    string key = to_string(n) + "|" + to_string(capacity);
    if (memo.count(key)) return memo[key];
    
    if (weights[n - 1] > capacity) {
        memo[key] = knapsack(weights, values, capacity, n - 1);
    } else {
        memo[key] = max(values[n - 1] + knapsack(weights, values, capacity - weights[n - 1], n - 1),
                        knapsack(weights, values, capacity, n - 1));
    }
    return memo[key];
}

int main() {
    int weights[] = {1, 2, 3};
    int values[] = {10, 15, 40};
    int capacity = 6;
    int n = sizeof(values) / sizeof(values[0]);
    cout << knapsack(weights, values, capacity, n) << endl;  // Output: 55
    return 0;
}

```

## Applications of Memoization in Competitive Programming

In competitive programming, memoization is widely used for solving problems that involve recursive algorithms with overlapping subproblems. Some of its applications include:

1. **Dynamic Programming**: Many dynamic programming problems, such as Fibonacci numbers, knapsack problems, and longest common subsequence, can be solved using memoization to optimize recursive solutions.

2. **Combinatorial Problems**: Problems that involve combinations and permutations often benefit from memoization, allowing efficient computation of results without repeated calculations.

3. **Game Theory**: In game theory problems, memoization can help efficiently compute the outcomes of recursive game scenarios.

4. **Graph Problems**: Some graph problems, particularly those that involve paths and cycles, can also be optimized using memoization.

## Conclusion

Memoization is a powerful technique in computer science that enhances the performance of recursive algorithms by storing previously computed results. Its applications span various domains, particularly in dynamic programming and competitive programming. Mastering memoization equips programmers with essential tools to tackle complex problems efficiently, providing a significant advantage in both academic and professional settings.

