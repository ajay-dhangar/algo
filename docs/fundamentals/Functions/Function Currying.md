---
id: function-currying
title: Function Currying
sidebar_label: Function Currying
sidebar_position: 9
description: Learn about function currying and how it enables the transformation of functions for better modularity and reusability.
tags: [functions, fundamental, programming fundamentals, currying]
---

## Overview
**Function currying** is a technique in functional programming where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. This approach allows partial application of functions, making them more modular and reusable. Currying helps in creating specialized functions by fixing some of the parameters of a function, leading to more expressive and concise code.

## Syntax
### JavaScript
```javascript
// Currying Syntax Example
function add(a) {
    return function(b) {
        return a + b;
    };
}
  
```

## Example
### JavaScript Example
```JavaScript
// Using Currying in JavaScript
function multiply(x) {
    return function(y) {
        return x * y;
    };
}

const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(5)); // Output: 10


```



## Syntax
### Python
```py
# Currying Syntax Example
def add(a):
    def inner(b):
        return a + b
    return inner

```

## Example
### Python Example
```py
# Using Currying in Python
def multiply(x):
    def inner(y):
        return x * y
    return inner

multiply_by_three = multiply(3)
print(multiply_by_three(4))  # Output: 12

```

## C++ 
Function currying is not a built-in feature of C++, as it is in some functional programming languages like JavaScript or Python. However, you can achieve a similar effect using function objects or lambda expressions.

## Key Points:
1. Partial Application: Currying allows you to fix a number of arguments and create a new function that takes the remaining arguments.
2. Higher-Order Functions: Currying transforms a function into a higher-order function, enabling the creation of more flexible and reusable code.
3. Enhanced Readability: By breaking down functions into smaller, single-argument functions, currying can improve the readability and maintainability of code.
4. Functional Composition: Currying facilitates functional composition, allowing functions to be easily combined and reused.
5. Compatibility: Currying is a common practice in languages that support first-class functions, such as JavaScript and Python, but can also be implemented in other languages.

