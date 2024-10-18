---
id: function-declaration
title: Function Declaration
sidebar_label: Function Declaration
sidebar_position: 1
description: Learn about how functions are declared in various programming languages.
tags: [functions, fundamental, programming fundamentals, syntax]
---

## Overview
A **function declaration** introduces the function to the program, specifying its **name**, **return type**, and **parameters** without including the function body. This is different from the **function definition**, which also includes the function’s logic (body). Function declarations are typically used in languages where the compiler needs to know about a function before it's called in the code.

## Syntax
### C++
```c++
// Function declaration (without body)
return_type function_name(parameter1_type parameter1, parameter2_type parameter2);
```


## Example
### C++ Example
```c++
// Declaration
int add(int a, int b);
```

```c++
// Definition
int add(int a, int b) {
    return a + b;
}
```



## Syntax
### Python
// Python does not separate function declarations from function definitions. The function is defined and declared in one step.

```py
// Function definition (Python inherently defines and declares in one step)
def function_name(parameter1, parameter2):
    # function body
```

## Example
### Python Example
```py
// In Python, declaration and definition occur together
def add(a, b):
    return a + b
```

## Key Points:
1. Function declaration tells the compiler or interpreter about the function's name, parameters, and return type, without implementing the function body.
2. In languages like C++, function declarations allow function prototypes to be written in one place, while the actual implementation can be defined later.
3. Function definition includes the function body and specifies what the function does.
4. In some languages (like Python), there's no need to declare a function separately from its definition.
5. Declarations are often written in header files (C++) or at the beginning of the program before any function calls.


