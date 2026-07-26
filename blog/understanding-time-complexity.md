---
slug: understanding-time-complexity
title: 'Understanding Time Complexity'
authors: [Aswani-Bolisetti]
tags: [algorithms, theory, big-o, time-complexity]
---

Time complexity is a computational concept that helps us measure the 
efficiency of an algorithm. It describes the amount of time an algorithm 
takes to run, as a function of the size of its input.

<!-- truncate -->

## Why Time Complexity Matters

When designing algorithms, we are interested in how fast they can solve 
a problem. Time complexity provides a way to estimate the performance of 
an algorithm without having to test it on every possible input.


## Big-O Notation

Time complexity is often expressed using Big-O notation, which describes 
the upper bound of an algorithm's running time:

- **O(1)** – Constant Time: Same time regardless of input size. Example: Accessing an array element by index.
- **O(log n)** – Logarithmic Time: Runtime increases logarithmically. Example: Binary search.
- **O(n)** – Linear Time: Runtime increases linearly. Example: Iterating through an array.
- **O(n log n)** – Log-Linear Time: Common in efficient sorting algorithms like Merge Sort and Quick Sort.
- **O(n²)** – Quadratic Time: Runtime increases quadratically. Example: Bubble Sort.
- **O(2ⁿ)** – Exponential Time: Runtime doubles with every additional input. Example: Fibonacci via simple recursion.

## Practical Example

Consider checking whether a number exists in a list:
- **Linear search** scans each element one by one → O(n)
- **Binary search** (on a sorted list) halves the search space each step → O(log n)

## Best, Worst, and Average Cases

- **Best Case**: Fastest execution (e.g., element found at start of array)
- **Worst Case**: Slowest execution (e.g., element not in array)
- **Average Case**: Expected time based on random input distribution

## Conclusion

Understanding time complexity helps in choosing the best algorithm for 
the task and predicting how it will perform as data grows. Along with 
space complexity, it forms the foundation for building scalable, 
high-performance algorithms.