---
id: function-recursion
title: Function Recursion
sidebar_label: Function Recursion
sidebar_position: 7
description: Understand the concept of recursion in programming functions.
tags: [functions, fundamental, programming fundamentals, function-recursion]
---

## Overview
**Function recursion** is a programming technique where a function calls itself to solve a problem. This approach is useful for breaking down complex problems into simpler sub-problems. Each recursive call processes a portion of the problem until a base condition is met, at which point the recursion stops.

## Syntax
### C++
```c++
// Recursive Function Syntax
return_type function_name(parameters) {
    if (base_condition) {
        return base_case_value;  // Base condition to stop recursion
    }
    return function_name(modified_parameters);  // Recursive call
}

```

## Example
### C++ Example
```c++
// Factorial using Recursion in C++
#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) {
        return 1;  // Base condition
    }
    return n * factorial(n - 1);  // Recursive call
}

int main() {
    int number = 5;
    cout << "Factorial of " << number << " is " << factorial(number) << endl;  // Output: 120
    return 0;
}

```



## Syntax
### Python
```py
# Recursive Function Syntax
def function_name(parameters):
    if base_condition:
        return base_case_value  # Base condition to stop recursion
    return function_name(modified_parameters)  # Recursive call

```

## Example
### Python Example
```py
# Factorial using Recursion in Python
def factorial(n):
    if n <= 1:
        return 1  # Base condition
    return n * factorial(n - 1)  # Recursive call

number = 5
print(f"Factorial of {number} is {factorial(number)}")  # Output: 120


```


## Key Points:
1. Base Condition: Every recursive function must have a base condition to prevent infinite recursion, which leads to stack overflow errors.
2. Recursive Case: The part of the function that includes the recursive call, which breaks the problem into smaller sub-problems.
3. Stack Overflow: Recursion uses the call stack to keep track of function calls; excessive recursion depth can lead to stack overflow.
4. Tail Recursion: A specific type of recursion where the recursive call is the last operation in the function, allowing some languages to optimize it and avoid increasing the call stack.
5. Use Cases: Recursion is commonly used in algorithms that require a divide-and-conquer approach, such as sorting algorithms (e.g., quicksort, mergesort), tree traversals, and combinatorial problems.

