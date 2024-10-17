---  
id: recursion-in-javascript  
sidebar_position: 9
title: Recursion in JavaScript  
sidebar_label: Recursion in JavaScript
---

# Recursion in JavaScript

Recursion is a powerful concept in programming where a function calls itself to solve smaller instances of the same problem. This approach is especially useful for tasks that can be broken down into similar sub-tasks, such as traversing trees, calculating factorials, or working with recursive data structures like nested arrays.

## What is Recursion?

In JavaScript, recursion occurs when a function calls itself until it reaches a base condition, at which point it stops calling itself and returns a value.

## Key Concepts:
1. **Base Case**: The condition under which the recursion stops.
2. **Recursive Case**: The function calls itself with a modified argument, moving toward the base case.

## Example: Factorial Function

```javascript
function factorial(n) {
  if (n === 0) { // Base case
    return 1;
  }
  return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // Output: 120
```
