---
id: pure-vs-impure-functions
title: "Pure vs. Impure Functions"
sidebar_label: "Pure vs. Impure Functions"
sidebar_position: 11
description: "Learn about the differences between Pure and Impure functions, the concept of side effects, and why purity is important in functional programming."
tags: [functions, pure-functions, impure-functions, side-effects, functional-programming]
---

## 1. Introduction

In programming, functions can be categorized as either **pure** or **impure** based on how they interact with external state and whether their behavior is deterministic.

- A **pure function** is a function that always returns the exact same output for the same set of inputs and has absolutely no side effects.
- An **impure function** is a function that may return different outputs for the same inputs, or produces side effects (e.g., modifying external variables, executing I/O operations).

Understanding function purity is critical for functional programming, state management (e.g., Redux, React), and writing reliable, testable code.

---

## 2. What makes a function Pure?

A function is considered **pure** if it satisfies the following two conditions:

### 2.1 Same Input, Same Output (Determinism)
Every time you call the function with a specific set of arguments, it must return the exact same result. It does not depend on any hidden, changing, or external state.

```javascript
// Deterministic (Pure)
function add(a, b) {
  return a + b;
}
add(2, 3); // Always returns 5

// Non-Deterministic (Impure)
function addRandom(a) {
  return a + Math.random(); // Output is unpredictable
}
```

### 2.2 No Side Effects
A **side effect** is any change in the program's state that is observable outside the called function itself. Pure functions must not perform any of the following side effects:
- Modifying a global variable or static variable.
- Modifying any of the arguments passed to the function (mutating data).
- Performing input/output (I/O) operations (e.g., writing to files, fetching data from a database, printing to the console/terminal).
- Calling other impure functions.

```javascript
let count = 0;

// Side Effect (Impure)
function increment() {
  count += 1; // Modifies external state
  return count;
}
```

---

## 3. Code Examples

### 3.1 Pure Functions

#### JavaScript
```javascript
// Pure: does not modify inputs or external variables
const doubleArray = (arr) => arr.map(item => item * 2);

const original = [1, 2, 3];
const doubled = doubleArray(original);

console.log(original); // Output: [1, 2, 3] (Unchanged)
console.log(doubled);  // Output: [2, 4, 6]
```

#### Python
```python
# Pure: deterministic and side-effect free
def calculate_tax(subtotal, tax_rate):
    return subtotal * tax_rate

print(calculate_tax(100, 0.08)) # Always returns 8.0
```

---

### 3.2 Impure Functions

#### JavaScript
```javascript
// Impure: mutates the argument passed
function appendElement(arr, element) {
  arr.push(element); // Mutates original array
  return arr;
}

const list = [1, 2];
appendElement(list, 3);
console.log(list); // Output: [1, 2, 3] (Original list modified!)
```

#### Python
```python
import datetime

# Impure: depends on the external clock state (non-deterministic)
def is_morning():
    now = datetime.datetime.now()
    return now.hour < 12
```

---

## 4. Side-by-Side Comparison

| Feature | Pure Function | Impure Function |
|---------|---------------|-----------------|
| **Determinism** | Yes (Same input always yields same output) | No (Output can vary based on external factors) |
| **Side Effects** | None | May produce side effects (I/O, database, mutates state) |
| **Dependency** | Relies only on its input arguments | Can rely on external variables, systems, or time |
| **Testability** | Very Easy (No mocks or setups needed) | Harder (Requires mocking database, clock, or global state) |
| **Memoization** | Yes (Safe to cache results for performance) | No (Caching could lead to stale, incorrect results) |
| **Thread Safety**| Safe (Can run in parallel without race conditions) | Unsafe (Concurrency can lead to race conditions) |

---

## 5. Benefits of Pure Functions

1. **Predictability**: Code behaves exactly as expected, making bugs easier to locate and fix.
2. **Memoization**: Since the function is deterministic, you can save system resources by caching the outputs of expensive computations based on their input keys.
3. **Refactoring**: You can safely rearrange, move, or replace pure functions without worrying about breaking unrelated parts of the codebase.
4. **Testability**: Testing pure functions is as simple as providing inputs and asserting the outputs. No complex mocking of file systems, networks, or databases is required.

---

## 6. Video Explanation

<LiteYouTubeEmbed
  id="Spn_G5tL-rY"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Pure vs Impure Functions"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
