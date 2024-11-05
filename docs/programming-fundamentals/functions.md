---
id: functions
title: Introduction to functions fundamentals
sidebar_label: Functions
sidebar_position: 4
description: "Information About functions in programming"
tags: [functions, fundamentals]
---


## What are Functions?
Functions in C are self-contained blocks of code that perform a specific task. They allow for code reuse, modular programming, and improve the clarity of the code.

## Defining a Function
A function is defined by specifying its return type, name, parameters (if any), and the body of the function.

### Syntax:
```c
return_type function_name(parameter1_type parameter1, parameter2_type parameter2) {
    // function body
    // return statement (if return_type is not void)
}
```

### Example:
```C
int add(int a, int b) {
    return a + b;
}
```

## Calling a Function
To use a function, you need to call it by its name and pass the required arguments.

### Example:
```C
int sum = add(5, 10); // Calling the add function
printf("Sum: %d\n", sum);
```

## Types of Functions
### 1. Standard Library Functions
These are built-in functions provided by C libraries, such as printf(), scanf(), strlen(), etc.

#### Example:
```C
#include <stdio.h>

int main() {
    printf("Hello, World!\n"); // Standard library function
    return 0;
}
```

### 2. User-Defined Functions
These are functions defined by the user to perform specific tasks.

#### Example:
```C
void greet() {
    printf("Hello, User!\n");
}
```

##Function Parameters
Functions can accept parameters, which allow you to pass data into the function.

### Types of Parameters:
1. Value Parameters: The function receives a copy of the argument.
2. Reference Parameters: The function receives a reference (address) to the argument.
   
### Example of Value Parameter:
```C
void square(int num) {
    num = num * num; // This does not affect the original argument
}
```

### Example of Reference Parameter:
```C
void square(int *num) {
    *num = *num * *num; // This affects the original argument
}
```

## Return Statement
The return statement is used to return a value from a function. If the return type is void, the function does not return a value.

### Example:
```C
double multiply(double x, double y) {
    return x * y; // Returns the product of x and y
}
```

## Function Overloading
C does not support function overloading (defining multiple functions with the same name but different parameters) like C++. However, you can achieve similar functionality by using different names for functions.

## Recursion
A function can call itself, which is known as recursion. It's useful for solving problems that can be broken down into smaller subproblems.

### Example:
```C
int factorial(int n) {
    if (n == 0) {
        return 1; // Base case
    }
    return n * factorial(n - 1); // Recursive case
}
```

## Summary
- Functions are reusable blocks of code that perform specific tasks.
- They can accept parameters and return values.
- Functions can be standard library functions or user-defined functions.
Recursion allows functions to call themselves.
