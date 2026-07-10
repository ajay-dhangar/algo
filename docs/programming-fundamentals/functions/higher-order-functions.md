---
id: higher-order-functions
title: "Higher-Order Functions"
sidebar_label: "Higher-Order Functions"
sidebar_position: 4
description: "Learn about Higher-Order Functions (HOFs), how they accept or return other functions, and explore standard examples like map, filter, and reduce."
tags: [functions, higher-order-functions, functional-programming, map, filter, reduce]
---

## 1. Introduction

A **higher-order function** (HOF) is a function that does at least one of the following:
1. **Takes one or more functions as arguments** (parameters).
2. **Returns a function** as its result.

All other functions are called *first-order functions*. Higher-order functions are a core concept in functional programming and are heavily utilized in modern programming paradigms to write clean, declarative, and reusable code.

---

## 2. Syntax, Examples, and Explanations

### 2.1 In JavaScript

JavaScript treats functions as first-class citizens, making HOFs straightforward to implement and use.

#### A. Accepting a Function as an Argument
```javascript
// A higher-order function that takes a function 'operation'
function calculate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(calculate(5, 3, add));      // Output: 8
console.log(calculate(5, 3, multiply)); // Output: 15
```

#### B. Returning a Function
```javascript
// A HOF that returns a greeting function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
```

---

### 2.2 In Python

In Python, functions are also first-class objects. We can write higher-order functions easily.

#### A. Accepting a Function as an Argument
```python
def apply_operation(x, y, op):
    return op(x, y)

def add(a, b):
    return a + b

print(apply_operation(4, 5, add)) # Output: 9
```

#### B. Returning a Function
```python
def make_power_function(exponent):
    def power(base):
        return base ** exponent
    return power

square = make_power_function(2)
cube = make_power_function(3)

print(square(4)) # Output: 16
print(cube(4))   # Output: 64
```

---

### 2.3 In C++

In C++, HOFs can be created using function templates or by using `std::function` (from `<functional>` header).

```cpp
#include <iostream>
#include <functional>

// HOF accepting std::function as argument
void performOperation(int a, int b, std::function<int(int, int)> op) {
    std::cout << "Result: " << op(a, b) << std::endl;
}

// HOF returning std::function
std::function<int(int)> makeIncrementer(int increment) {
    return [increment](int val) {
        return val + increment;
    };
}

int main() {
    auto add = [](int x, int y) { return x + y; };
    performOperation(10, 5, add); // Output: Result: 15

    auto addFive = makeIncrementer(5);
    std::cout << addFive(20) << std::endl; // Output: 25

    return 0;
}
```

---

## 3. Built-in Higher-Order Functions

Most programming languages provide standard higher-order functions for manipulating arrays/lists:

### 3.1 Map
Transforms each element of a collection using a provided function.
- **JavaScript:** `array.map(fn)`
- **Python:** `map(fn, iterable)`

### 3.2 Filter
Creates a new collection with all elements that pass the test implemented by the provided function.
- **JavaScript:** `array.filter(fn)`
- **Python:** `filter(fn, iterable)`

### 3.3 Reduce / Fold
Applies a function against an accumulator and each element in the collection to reduce it to a single value.
- **JavaScript:** `array.reduce(fn, initialValue)`
- **Python:** `functools.reduce(fn, iterable)`

### Comparison Example: JS vs Python vs C++

Let's say we want to take an array of numbers, filter out the odd numbers, and square the remaining even numbers.

**JavaScript:**
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const result = nums
  .filter(n => n % 2 === 0)
  .map(n => n * n);

console.log(result); // Output: [4, 16, 36]
```

**Python:**
```python
nums = [1, 2, 3, 4, 5, 6]
evens = filter(lambda n: n % 2 == 0, nums)
squared = map(lambda n: n * n, evens)

print(list(squared)) # Output: [4, 16, 36]
```

**C++ (using `<algorithm>`):**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6};
    std::vector<int> result;

    // Filter and transform using copy_if & transform
    std::vector<int> evens;
    std::copy_if(nums.begin(), nums.end(), std::back_inserter(evens), [](int n) {
        return n % 2 == 0;
    });

    std::transform(evens.begin(), evens.end(), std::back_inserter(result), [](int n) {
        return n * n;
    });

    for (int n : result) std::cout << n << " "; // Output: 4 16 36
    return 0;
}
```

---

## 4. Video Explanation

<LiteYouTubeEmbed
  id="H4awPx81850"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Higher Order Functions - Map, Filter, Reduce"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
