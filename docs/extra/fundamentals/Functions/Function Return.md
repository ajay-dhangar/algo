---
id: function-return
title: Function Return
sidebar_label: Function Return
sidebar_position: 4
description: Learn about how functions return values in various programming languages.
tags: [functions, fundamentals, programming fundamentals, return_values]
---

## Overview
A **function return** specifies the value or result that a function sends back to the part of the program that called it. The return value is used to pass a result from the function execution to its caller. If no return value is specified, some languages return a default value (such as `void` in C++ or `None` in Python).


## Syntax
### C++
```c++
// Function returning a value
return_type function_name(parameter1_type parameter1) {
    // function body
    return value;
}
```

## Example
### C++ Example
```c++
// Function returning an integer
int add(int a, int b) {
    return a + b;
}

// Function call and storing the return value
int result = add(10, 20);  // result is now 30
```



## Syntax
### Python
```py
# Function returning a value
def function_name(parameter1):
    # function body
    return value

```

## Example
### Python Example
```py
# Function returning a value
def add(a, b):
    return a + b

# Function call and storing the return value
result = add(10, 20)  # result is now 30
```




## Key Points:
1. Return value is the result that a function sends back to the caller after its execution.
2. In C++, the return type is declared in the function signature (e.g., int for returning integers, void for no return value).
3. Python functions return None if no explicit return statement is provided.
4. The return keyword is used in both C++ and Python to send a value back to the caller.
5. Multiple values can be returned from a function in some languages (e.g., using tuples in Python).


