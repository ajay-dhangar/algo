---
id: pow-x-n
sidebar_position: 7
title: Pow(x, n)
sidebar_label: Pow(x, n)
description: "This document explains the Pow(x, n) problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# Pow(x, n)

## Description
Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., `x^n`).

### Example 1:
**Input**: `x = 2.00000`, `n = 10`  
**Output**: `1024.00000`

### Example 2:
**Input**: `x = 2.10000`, `n = 3`  
**Output**: `9.26100`

### Example 3:
**Input**: `x = 2.00000`, `n = -2`  
**Output**: `0.25000`  
**Explanation**: `2^(-2) = 1 / (2^2) = 1 / 4 = 0.25`

## Approach
The goal is to efficiently compute `x^n` using **binary exponentiation** (also known as exponentiation by squaring), which reduces the time complexity to logarithmic.

### Steps:
1. **Handle Negative Exponent**: If `n` is negative, we can convert the problem into `pow(1/x, -n)` to deal with the negative exponent.
2. **Binary Exponentiation**: The key observation is that:
    - If `n` is even, then `x^n = (x^(n/2))^2`.
    - If `n` is odd, then `x^n = x * x^(n-1)`.
3. **Iterative Method**: Use an iterative approach to calculate the power in logarithmic time.

## C++ Implementation

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;  // Use long long to handle n = -2^31 case
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        
        double result = 1;
        double current_product = x;

        while (N > 0) {
            if (N % 2 == 1) {
                result *= current_product;  // If N is odd, multiply the result by current_product
            }
            current_product *= current_product;  // Square the base
            N /= 2;  // Divide the exponent by 2
        }

        return result;
    }
};
```
### Time Complexity
**O(log n): Each step either squares the base or multiplies it to the result, halving the exponent at each step.**
### Space Complexity
**O(1): The algorithm uses constant extra space.**