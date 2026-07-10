---
id: default-parameters
title: "Default Parameters"
sidebar_label: "Default Parameters"
sidebar_position: 6
description: "Learn about Default Parameters, their syntax, usage rules, and important gotchas across programming languages."
tags: [functions, default-parameters, parameters, javascript, python, cpp]
---

## 1. Introduction

A **default parameter** is a function parameter that assumes a pre-defined value if the caller does not provide an argument for it during the function invocation. 

Default parameters help:
- Make function calls more concise when standard parameters are usually the same.
- Increase function flexibility and backward compatibility without breaking existing calls.
- Reduce the need to overload functions with multiple signatures.

---

## 2. Syntax, Examples, and Explanations

### 2.1 In JavaScript (ES6+)

In JavaScript, default parameters allow parameters to be initialized with default values if no value or `undefined` is passed.

**Syntax:**
```javascript
function multiply(a, b = 1) {
  return a * b;
}
```

**Example:**
```javascript
// Calling with both arguments
console.log(multiply(5, 2)); // Output: 10

// Calling with only one argument (b defaults to 1)
console.log(multiply(5));    // Output: 5

// Passing undefined triggers the default value
console.log(multiply(5, undefined)); // Output: 5

// Passing null does NOT trigger the default value (null is treated as a valid value)
console.log(multiply(5, null)); // Output: 0 (5 * 0)
```

---

### 2.2 In Python

Python supports default arguments by defining them in the function signature. However, Python has a famous gotcha when using **mutable** default arguments.

**Syntax:**
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

**Example:**
```python
print(greet("Alice"))                 # Output: Hello, Alice!
print(greet("Bob", greeting="Hi"))    # Output: Hi, Bob!
```

#### ⚠️ Critical Python Gotcha: Mutable Default Arguments
In Python, default parameter expressions are evaluated **once** when the function is defined, not when it is called. If you use a mutable object (like a list, dictionary, or set) as a default argument, that object will be shared across all subsequent calls.

```python
# Avoid this:
def add_to_list(item, target_list=[]):
    target_list.append(item)
    return target_list

print(add_to_list(1)) # Output: [1]
print(add_to_list(2)) # Output: [1, 2] -- Unexpected! The list was shared.

# Correct approach:
def add_to_list_correct(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list

print(add_to_list_correct(1)) # Output: [1]
print(add_to_list_correct(2)) # Output: [2] -- Works correctly.
```

---

### 2.3 In C++

In C++, default parameters are specified in the function declaration (usually in header files). The compiler evaluates these values at compile-time.

**Syntax:**
```cpp
void printMessage(std::string msg, int count = 1);
```

**Example:**
```cpp
#include <iostream>
#include <string>

// Default parameters must be trailing (placed at the end of the parameter list)
void log(std::string message, std::string level = "INFO") {
    std::cout << "[" << level << "] " << message << std::endl;
}

int main() {
    log("System starting");         // Output: [INFO] System starting
    log("Disk space low", "WARN");  // Output: [WARN] Disk space low
    return 0;
}
```

---

## 3. General Rules and Best Practices

1. **Trailing Parameter Rule**: In almost all programming languages, all default parameters must be defined to the right of any parameters without default values. Placing a non-default parameter after a default parameter results in a syntax error.
   
   ```javascript
   // Syntax Error:
   function invalidFunc(a = 10, b) { ... }
   ```
2. **Backward Compatibility**: When updating library APIs, adding default values to new parameters ensures that existing applications calling the function do not break.
3. **Use Immutable Defaults**: As highlighted in the Python example, avoid using mutable data types as default parameter values. Use `null`, `None`, or primitive constants instead.

---

## 4. Video Explanation

<LiteYouTubeEmbed
  id="lM2_Qx4rR4Y"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Default Parameters in Javascript (ES6)"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
