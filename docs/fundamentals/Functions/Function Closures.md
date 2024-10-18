---
id: function-closures
title: Function Closures
sidebar_label: Function Closures
sidebar_position: 8
description: Understand the concept of closures in programming and their usage.
tags: [functions, fundamental, programming fundamentals, closures]
---

## Overview
**Function closures** are a powerful feature in many programming languages that allow a function to retain access to its lexical scope, even when the function is executed outside that scope. This means a closure can remember the environment in which it was created, enabling it to access variables that are no longer in the current scope. Closures are commonly used for data encapsulation, callback functions, and maintaining state in asynchronous programming.

## Syntax
### JavaScript
```javascript
// Closure Syntax Example
function outerFunction() {
    let outerVariable = 'I am from outer scope';
    
    function innerFunction() {
        console.log(outerVariable); // Accessing the outer variable
    }
    
    return innerFunction; // Returning the inner function
}

```

## Example
### JavaScript Example
```JavaScript
// Using Closure in JavaScript
function createCounter() {
    let count = 0; // Private variable

    return function() {
        count += 1; // Incrementing the count
        return count; // Returning the current count
    };
}

const counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2

```



## Syntax
### Python
```py
# Closure Syntax Example
def outer_function():
    outer_variable = 'I am from outer scope'
    
    def inner_function():
        print(outer_variable)  # Accessing the outer variable
    
    return inner_function  # Returning the inner function

```

## Example
### Python Example
```py
# Using Closure in Python
def create_counter():
    count = 0  # Private variable

    def counter():
        nonlocal count  # Accessing the outer variable
        count += 1
        return count  # Returning the current count

    return counter  # Returning the inner function

counter = create_counter()
print(counter())  # Output: 1
print(counter())  # Output: 2

```


## Key Points:
1. Lexical Scope: Closures allow a function to access variables from its lexical scope, even when invoked outside that scope.
2. Data Encapsulation: Closures can be used to create private variables, encapsulating the state of the function.
3. Memory Management: Closures maintain references to the variables in the scope they were created in, which can lead to increased memory usage if not managed properly.
4. Use in Callbacks: Closures are commonly used in asynchronous programming and callbacks, allowing functions to maintain state between calls.
5. Non-local Variables: In languages like Python, the nonlocal keyword is used to declare that a variable refers to a variable in the nearest enclosing scope that is not global.

