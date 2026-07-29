---
id: function-memoization
sidebar_position: 12
title: "Function Memoization"
sidebar_label: "Memoization"
description: "A guide to memoization - optimizing recursive functions by caching results."
tags: [programming-fundamentals, functions, optimization, dynamic-programming]
---

# Function Memoization

## Introduction

Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again. It transforms exponential-time recursive algorithms into polynomial-time algorithms.

## How It Works

1. Before computing a result, check if the result is already cached.
2. If cached, return the cached result.
3. If not, compute the result, store it in the cache, and return it.

## Implementation

```javascript
// Generic memoization function
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Memoized Fibonacci
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(50)); // Returns instantly with memoization
```

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))  # Returns instantly with memoization
```

## Complexity Improvement

| Approach | Time | Space |
|----------|------|-------|
| Naive Fibonacci | O(2^n) | O(n) |
| Memoized Fibonacci | O(n) | O(n) |

## When to Use Memoization

- Pure functions with repeated inputs
- Recursive algorithms with overlapping subproblems
- Dynamic programming implementations
- Expensive computations with limited input domains

## Caveats

- Only works for pure functions (same input always produces same output)
- Cache can grow large; consider size limits
- May not be worth it for one-time computations
