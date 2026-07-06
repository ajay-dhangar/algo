---
id: arguments-vs-parameters
title: "Arguments vs. Parameters"
sidebar_label: "Arguments vs. Parameters"
sidebar_position: 7
description: "Understand the clear conceptual difference between parameters and arguments with examples and comparison tables."
tags: [functions, parameters, arguments, terminology, basics]
---

## 1. Introduction

Although the terms **parameter** and **argument** are often used interchangeably in casual developer conversation, they have distinct meanings in computer science and programming. 

- A **parameter** is the variable defined in the function's signature. It acts as a placeholder.
- An **argument** is the actual value or expression passed to the function when it is called.

---

## 2. Definitions and Visualizing the Difference

```
// FUNCTION DEFINITION (Declaration)
function add(num1, num2) {   <--- num1 and num2 are PARAMETERS (placeholders)
  return num1 + num2;
}

// FUNCTION INVOCATION (Call)
add(5, 10);                  <--- 5 and 10 are ARGUMENTS (actual values)
```

### 2.1 Parameters (Formal Parameters)
- Defined inside the parentheses of the function definition.
- Define what kind of data the function expects.
- Behave like local variables initialized inside the function scope.

### 2.2 Arguments (Actual Parameters)
- Provided inside the parentheses when calling/invoking the function.
- Represent the actual data that will be assigned to the parameters.
- Can be literals (e.g. `5`, `"hello"`), variables (e.g. `x`), or complex expressions (e.g. `y * 2 + z`).

---

## 3. Side-by-Side Comparison

| Feature | Parameter | Argument |
|---------|-----------|----------|
| **Synonyms** | Formal Parameter, Formal Argument | Actual Parameter, Actual Argument |
| **Location** | Defined in the function declaration/signature | Passed in the function call/invocation |
| **Purpose** | Specifies the interface and imports data into the local scope | Supplies the specific values/references for processing |
| **Lifecycle** | Exists for the duration of the function call | Exists before the function call, evaluated before passing |
| **Changeability**| Stays constant in code structure | Varies with each function invocation |

---

## 4. Advanced Concepts

### 4.1 Function Arity
**Arity** is the number of parameters a function expects.
- **Nullary**: 0 parameters (e.g., `greet()`)
- **Unary**: 1 parameter (e.g., `square(x)`)
- **Binary**: 2 parameters (e.g., `add(x, y)`)
- **Variadic**: Accepts a variable number of arguments.

### 4.2 Handling Variadic Arguments

When the number of arguments supplied exceeds or varies from the number of parameters, different languages handle them in various ways:

#### A. JavaScript (Rest Parameters)
JavaScript allows you to gather all remaining arguments into a single array parameter using the rest operator (`...`).

```javascript
// 'numbers' is a rest parameter, collecting all arguments into an array
function sumAll(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// 5 arguments are passed
console.log(sumAll(1, 2, 3, 4, 5)); // Output: 15
```

#### B. Python (`*args` and `**kwargs`)
Python uses `*args` to collect extra positional arguments as a tuple, and `**kwargs` to collect extra keyword arguments as a dictionary.

```python
def print_details(*args, **kwargs):
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)

print_details(1, 2, 3, name="Bob", age=30)
# Output:
# Positional arguments: (1, 2, 3)
# Keyword arguments: {'name': 'Bob', 'age': 30}
```

#### C. C++ (Variadic Templates)
Modern C++ uses variadic templates to accept any number of arguments of any types safely.

```cpp
#include <iostream>

// Base case
void print() {
    std::cout << std::endl;
}

// Recursive variadic template function
template<typename T, typename... Args>
void print(T first, Args... args) {
    std::cout << first << " ";
    print(args...);
}

int main() {
    print(1, 2.5, "hello", 'C'); // Output: 1 2.5 hello C 
    return 0;
}
```

---

## 5. Video Explanation

<LiteYouTubeEmbed
  id="_ztGoCKDLHs"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Function Parameters VS. Arguments | C Programming Tutorial"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
