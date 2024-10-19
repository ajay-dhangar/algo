---
id: function-memoization
title: Function Memoization
sidebar_label: Function Memoization
sidebar_position: 11
description: Learn about function memoization, a technique to optimize performance by caching results of expensive function calls.
tags: [functions, fundamental, programming fundamentals, optimization, caching]
---

## Overview
**Function memoization** is an optimization technique used to improve the performance of functions by storing the results of expensive function calls and returning the cached result when the same inputs occur again. This technique is particularly useful in scenarios involving recursive functions or functions that perform expensive computations.

## Syntax
### C++
```cpp
#include <iostream>
#include <unordered_map>

// Memoization Syntax Example
std::unordered_map<int, int> cache;

int fibonacci(int n) {
    if (n <= 1) return n;
    if (cache.find(n) != cache.end()) return cache[n]; // Check cache
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2); // Store result
    return cache[n];
}

```

## Example
### C++ Example
```c++
#include <iostream>
#include <unordered_map>

std::unordered_map<int, int> cache;

int fibonacci(int n) {
    if (n <= 1) return n;
    if (cache.find(n) != cache.end()) return cache[n]; // Check cache
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2); // Store result
    return cache[n];
}

int main() {
    std::cout << "Fibonacci of 10: " << fibonacci(10) << std::endl; // Output: 55
    return 0;
}


```



## Syntax
### Python
```py
# Memoization Syntax Example
cache = {}

def fibonacci(n):
    if n <= 1:
        return n
    if n in cache:  # Check cache
        return cache[n]
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2)  # Store result
    return cache[n]


```

## Example
### Python Example
```py
cache = {}

def fibonacci(n):
    if n <= 1:
        return n
    if n in cache:  # Check cache
        return cache[n]
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2)  # Store result
    return cache[n]

result = fibonacci(10)
print("Fibonacci of 10:", result)  # Output: 55


```


## Key Points:
1. Performance Improvement: Memoization significantly improves performance by reducing the number of function calls and avoiding redundant calculations.
2. Cache Utilization: The results of function calls are stored in a cache (often a dictionary or hash map) for quick retrieval.
3. Recursive Functions: Memoization is particularly effective with recursive functions, such as calculating Fibonacci numbers, where many calls with the same inputs can occur.
4. Trade-off: While memoization can improve time complexity, it may increase space complexity due to the storage of results.
5. Dynamic Programming: Memoization is often a key component in dynamic programming approaches, where overlapping subproblems are solved efficiently.
