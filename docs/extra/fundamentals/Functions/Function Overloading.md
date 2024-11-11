---
id: function-overloading
title: Function Overloading
sidebar_label: Function Overloading
sidebar_position: 6
description: Understand the concept of function overloading in various programming languages.
tags: [functions, fundamental, programming fundamentals, overloading]
---

## Overview
**Function overloading** is a feature in many programming languages that allows multiple functions to have the same name but different parameter lists (types, number, or both). This enables functions to perform similar operations on different types of data, enhancing code readability and reusability.

## Syntax
### C++
```c++
// Function Overloading Example
void display(int value);
void display(double value);
void display(string value);

```

## Example
### C++ Example
```c++
// Function Overloading in C++
#include <iostream>
using namespace std;

// Function declarations
void display(int value) {
    cout << "Integer: " << value << endl;
}

void display(double value) {
    cout << "Double: " << value << endl;
}

void display(string value) {
    cout << "String: " << value << endl;
}

int main() {
    display(10);          // Calls display(int)
    display(10.5);       // Calls display(double)
    display("Hello");    // Calls display(string)
    return 0;
}


```



## Syntax
### Python
```py
# Python does not support function overloading directly,
# but you can use default arguments or variable-length arguments.

def display(value):
    print(value)

```

## Example
### Python Example
```py
# Function Overloading in Python
def display(value):
    print(value)

display(10)          # Calls display
display(10.5)       # Calls display
display("Hello")    # Calls display


```


## Key Points:
1. Function Signature: Overloading is determined by the function signature, which includes the function name and the type and number of its parameters.
2. Compile-Time Polymorphism: Function overloading is a form of compile-time polymorphism, allowing the correct function to be called based on the arguments passed.
3. Default Parameters: In languages like Python, function overloading can be mimicked using default arguments or variable-length argument lists.
4. Readability: Function overloading enhances code readability by allowing functions that perform similar tasks to share the same name, reducing the need for different names for similar operations.
5. Limitations: Overloading is based on parameter types and counts; two functions with the same name and parameters will result in a compilation error.

