---
id: first-class-functions
title: "First-Class Functions"
sidebar_label: "First-Class Functions"
sidebar_position: 10
description: "Learn about First-Class Functions, the criteria that make functions first-class citizens, and examples across major programming languages."
tags: [functions, first-class, first-class-citizens, fundamentals, javascript, python]
---

## 1. Introduction

A programming language is said to have **First-Class Functions** when functions in that language are treated like any other variable. In other words, functions are treated as **First-Class Citizens**.

This means that functions can be:
1. Assigned as a value to a variable or constant.
2. Passed as an argument to another function.
3. Returned from another function as a result.

Having first-class functions is a prerequisite for functional programming, enabling powerful design patterns like callbacks, currying, and closures.

---

## 2. The Three Key Criteria with Examples

Let's look at how JavaScript, Python, and C++ satisfy the three criteria.

### 2.1 Criterion 1: Assigning Functions to Variables

#### JavaScript
```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet("Alice")); // Output: Hello, Alice!
```

#### Python
```python
def greet(name):
    return f"Hello, {name}!"

say_hello = greet # Assigning the function object to another variable
print(say_hello("Bob")) # Output: Hello, Bob!
```

#### C++ (C++11+)
```cpp
#include <iostream>
#include <functional>
#include <string>

std::string greet(std::string name) {
    return "Hello, " + name + "!";
}

int main() {
    // Assigning function pointer using std::function
    std::function<std::string(std::string)> sayHello = greet;
    std::cout << sayHello("Charlie") << std::endl; // Output: Hello, Charlie!
    return 0;
}
```

---

### 2.2 Criterion 2: Passing Functions as Arguments

#### JavaScript
```javascript
function executeFunction(fn, value) {
  return fn(value);
}

const square = x => x * x;
console.log(executeFunction(square, 5)); // Output: 25
```

#### Python
```python
def execute_function(fn, value):
    return fn(value)

def square(x):
    return x * x

print(execute_function(square, 5)) # Output: 25
```

#### C++
```cpp
#include <iostream>
#include <functional>

void run(std::function<int(int)> fn, int value) {
    std::cout << "Result: " << fn(value) << std::endl;
}

int main() {
    auto square = [](int x) { return x * x; };
    run(square, 5); // Output: Result: 25
    return 0;
}
```

---

### 2.3 Criterion 3: Returning Functions from Functions

#### JavaScript
```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(10)); // Output: 20
```

#### Python
```python
def multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

double = multiplier(2)
print(double(10)) # Output: 20
```

#### C++
```cpp
#include <iostream>
#include <functional>

std::function<int(int)> multiplier(int factor) {
    return [factor](int number) {
        return number * factor;
    };
}

int main() {
    auto doubleFunc = multiplier(2);
    std::cout << doubleFunc(10) << std::endl; // Output: 20
    return 0;
}
```

---

## 3. First-Class Functions vs. Higher-Order Functions

It is common to confuse **First-Class Functions** with **Higher-Order Functions**. 

- **First-Class Functions** is a *property of the programming language*. It means the language syntax permits functions to behave like regular values.
- **Higher-Order Functions** is a *functional programming concept*. It refers to functions that take other functions as arguments or return them. 

> **Analogy**: You cannot easily write Higher-Order Functions in a language unless it supports First-Class Functions. First-Class Functions are the tools, and Higher-Order Functions are what you build with them.

---

## 4. Video Explanation

<LiteYouTubeEmbed
  id="kr0mpwqttM0"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="First-Class Citizens / First-Class Functions"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
