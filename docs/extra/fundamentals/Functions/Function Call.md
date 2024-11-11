---
id: function-call
title: Function Call
sidebar_label: Function Call
sidebar_position: 2
description: Learn how to invoke functions in various programming languages.
tags: [functions, programming, programming fundamental, syntax]
---


## Overview
A **function call** is the process of invoking a function in a program. When a function is called, the control of the program is passed to the function, its statements are executed, and the result (if any) is returned to the calling location. Function calls are an essential part of modular programming, allowing the reuse of code blocks across various parts of the program.


## Syntax
### C++
```c++
// Function call
function_name(argument1, argument2, ...);
```

## Example
### C++ Example
```c++
// Function declaration
int add(int a, int b);

// Function call
int result = add(3, 5);  // Calls the 'add' function with arguments 3 and 5
```

```c++
// Definition
int add(int a, int b) {
    return a + b;
}
```


## Syntax
### Python
Python does not separate function declarations from function definitions. The function is defined and declared in one step.

```py
# Function definition (Python inherently defines and declares in one step)
def function_name(parameter1, parameter2):
    # function body
```

## Example
### Python Example
```py
# Function definition
def add(a, b):
    return a + b

# Function call
result = add(3, 5)  # Calls the 'add' function with arguments 3 and 5
```


## Key Points:
1. Function calls transfer control from the calling point to the function, where its logic is executed.
2. In a function call, arguments are passed to the function to be processed as parameters.
3. In languages like C++ and Python, the return value of the function (if any) can be stored in a variable or used directly in an expression.
4. Function calls can be made within other function calls or expressions to build more complex logic.
5. Recursive function calls occur when a function calls itself, enabling the solution of problems that can be broken down into simpler subproblems.

   
