---
id: function-parameters
title: Function Parameters
sidebar_label: Function Parameters
sidebar_position: 3
description: Learn about how function parameters work in various programming languages.
tags: [functions, fundamentals, programming fundamentals, parameters]
---

## Overview
**Function parameters** are variables listed in the function declaration that allow the function to accept input values when it is called. These inputs are called **arguments**, and they are passed to the function during the function call. Parameters help make functions more flexible and reusable by allowing different inputs to be processed without changing the function's code.

## Syntax
### C++
```c++
// Function with parameters
return_type function_name(parameter1_type parameter1, parameter2_type parameter2);
```

## Example
### C++ Example
```c++
// Function declaration with parameters
int add(int a, int b);

// Function definition
int add(int a, int b) {
    return a + b;
}

// Function call with arguments
int result = add(10, 20);  // Calls 'add' with arguments 10 and 20

```



## Syntax
### Python
```py
# Function with parameters
def function_name(parameter1, parameter2):
    # function body

```

## Example
### Python Example
```py
# Function definition with parameters
def add(a, b):
    return a + b

# Function call with arguments
result = add(10, 20)  # Calls 'add' with arguments 10 and 20

```


## Key Points:
1. Parameters are placeholders defined in the function declaration that allow it to accept input values (arguments) during function calls.
2. In C++, each parameter must have a type specified, while Python allows for dynamic typing.
3. Functions can have multiple parameters, separated by commas, to accept multiple inputs.
4. In some languages, like Python, parameters can have default values that are used if no argument is provided for that parameter during the function call.
5. Parameters increase the flexibility of functions by allowing the same function to handle a variety of inputs without modifying its code.


