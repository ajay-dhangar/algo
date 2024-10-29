---
id: function-composition
title: Function Composition
sidebar_label: Function Composition
sidebar_position: 10
description: Learn about function composition and how to combine multiple functions into one in C++ and Python.
tags: [functions, fundamental, programming fundamentals, composition, c++, python]
---

## Overview
**Function composition** is a programming technique where two or more functions are combined to create a new function. This new function takes the output of one function as the input for another, allowing for more complex operations to be constructed from simpler ones. Function composition enhances modularity, reusability, and readability of code.

## Syntax
### C++
```cpp
#include <iostream>
#include <functional>

// Function Composition Syntax Example
template<typename T>
std::function<T(T)> compose(std::function<T(T)> f, std::function<T(T)> g) {
    return [=](T x) {
        return f(g(x));
    };
}

```

## Example
### C++ Example
```c++
#include <iostream>
#include <functional>

// Function to double a number
int doubleValue(int x) {
    return x * 2;
}

// Function to increment a number
int increment(int x) {
    return x + 1;
}

// Function to compose two functions
template<typename T>
std::function<T(T)> compose(std::function<T(T)> f, std::function<T(T)> g) {
    return [=](T x) {
        return f(g(x));
    };
}

int main() {
    auto composedFunction = compose(doubleValue, increment);
    std::cout << composedFunction(3) << std::endl; // Output: 8
    return 0;
}


```



## Syntax
### Python
```py
# Function Composition Syntax Example
def compose(f, g):
    return lambda x: f(g(x))

```

## Example
### Python Example
```py
# Function to double a number
def double(x):
    return x * 2

# Function to increment a number
def increment(x):
    return x + 1

# Composing the functions
increment_and_double = compose(double, increment)

# Using the composed function
result = increment_and_double(3)
print(result)  # Output: 8


```


## Key Points:
1. Combining Functions: Function composition allows for the creation of new functions by combining existing ones, which enhances reusability and modularity.
2. Order of Execution: The order in which functions are composed is significant; the output of the inner function becomes the input for the outer function.
3. Higher-Order Functions: Function composition typically involves higher-order functions, which take other functions as arguments or return them.
4. Functional Programming: This technique is a key aspect of functional programming paradigms, emphasizing immutability and pure functions.
5. Improved Code Clarity: By breaking down complex logic into smaller, composable functions, the overall clarity and maintainability of the code are improved.


