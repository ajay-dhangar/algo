---
id: function-expressions-tutorial
title: "Function Expressions"
sidebar_label: "Function Expressions"
sidebar_position: 2
description: "Learn about Function Expressions, their syntax, usage, and key differences from Function Declarations."
tags: [functions, expressions, fundamentals, javascript]
---

## 1. Introduction

A **function expression** is a way to define a function by assigning it to a variable or passing it as a value. Unlike a function declaration, which stands on its own as a statement, a function expression is part of a larger expression syntax (typically an assignment statement).

Function expressions can be either **anonymous** (without a name) or **named** (with a local name that can be referenced inside the function body for recursion).

One of the most significant differences between function declarations and function expressions is **hoisting**. Function declarations are hoisted to the top of their enclosing scope, meaning they can be called before they are defined in the code. Function expressions, however, are not hoisted and cannot be called before they are defined.

---

## 2. Syntax, Examples, and Explanations

### 2.1 In JavaScript

In JavaScript, function expressions are extremely common. They allow functions to be treated as values (First-Class Citizens).

**Syntax (Anonymous Function Expression):**
```javascript
const variableName = function(parameters) {
  // function body
  return value;
};
```

**Syntax (Arrow Function Expression - ES6+):**
```javascript
const variableName = (parameters) => {
  // function body
  return value;
};
```

**Example:**
```javascript
// Anonymous function expression
const add = function(a, b) {
  return a + b;
};

console.log(add(5, 3)); // Output: 8

// Arrow function expression
const multiply = (a, b) => a * b;

console.log(multiply(5, 3)); // Output: 15
```

---

### 2.2 In Python

In Python, function expressions are represented by `lambda` expressions. Lambdas are small, anonymous, single-expression functions.

**Syntax:**
```python
variable_name = lambda parameter1, parameter2: expression
```

**Example:**
```python
# Lambda expression assigned to a variable
add = lambda a, b: a + b

print(add(5, 3)) # Output: 8

# Lambda expression for sorting key
pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
pairs.sort(key=lambda pair: pair[1])
print(pairs) # Output: [(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]
```

---

### 2.3 In C++

C++ introduced lambda expressions in C++11, which serve as function expressions. They are highly useful for passing inline code block functions to algorithms.

**Syntax:**
```cpp
auto variable_name = [capture_clause](parameters) -> return_type {
    // function body
};
```

**Example:**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // Lambda function expression
    auto add = [](int a, int b) {
        return a + b;
    };

    std::cout << add(5, 3) << std::endl; // Output: 8

    // Using lambda with standard library algorithms
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int multiplier = 3;
    
    // Capture 'multiplier' by value
    std::for_each(numbers.begin(), numbers.end(), [multiplier](int &n) {
        n *= multiplier;
    });

    for(int n : numbers) {
        std::cout << n << " "; // Output: 3 6 9 12 15
    }
    return 0;
}
```

---

## 3. Function Declarations vs. Function Expressions

Understanding the difference between a Function Declaration and a Function Expression is a common interview topic and critical for debugging scope issues.

| Feature | Function Declaration | Function Expression |
|---------|----------------------|---------------------|
| **Syntax** | `function name() { ... }` | `const name = function() { ... }` |
| **Hoisting** | Yes (can be called before definition) | No (must be defined before calling) |
| **Execution** | Loaded before any code is executed | Created when the execution reaches the line |
| **Anonymity** | Must always have a name | Can be anonymous or named |
| **Use Case** | Global utility functions, standard definitions | Callbacks, IIFEs, closures, arrow functions |

### Hoisting Demonstration (JavaScript)

```javascript
// Calling a declared function before its definition works!
sayHello(); // Output: "Hello!"

function sayHello() {
  console.log("Hello!");
}

// Calling a function expression before its definition fails!
try {
  sayGoodbye();
} catch (error) {
  console.log(error.message); // Output: "Cannot access 'sayGoodbye' before initialization"
}

const sayGoodbye = function() {
  console.log("Goodbye!");
};
```

---

## 4. Video Explanation

<LiteYouTubeEmbed
  id="gict38yap7c"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Function Declarations vs Function Expressions"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
