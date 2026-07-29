---
id: function-closures
sidebar_position: 14
title: "Function Closures"
sidebar_label: "Closures"
description: "A guide to closures - functions that remember their lexical scope."
tags: [programming-fundamentals, functions, scope]
---

# Function Closures

## Introduction

A closure is a function that retains access to its lexical scope even when executed outside that scope. This powerful feature enables data privacy, factory functions, and partial application.

## How Closures Work

```javascript
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message); // Closure: inner remembers 'message'
  }

  return inner;
}

const fn = outer();
fn(); // "Hello" - still has access to 'message'
```

## Classic Counter Example

```javascript
function createCounter() {
  let count = 0; // Private state

  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    getCount() { return count; }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.increment();
counter2.increment();
console.log(counter1.getCount()); // 2
console.log(counter2.getCount()); // 1
```

## Loop Closures (Common Pitfall)

```javascript
// PROBLEM: All functions share the same 'i'
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function() { return i; });
}
functions[0](); // 3 (not 0!)
functions[1](); // 3 (not 1!)
functions[2](); // 3 (not 2!)

// SOLUTION: Use let (block-scoped) or IIFE
const functionsFixed = [];
for (let i = 0; i < 3; i++) {
  functionsFixed.push(function() { return i; });
}
functionsFixed[0](); // 0
functionsFixed[1](); // 1
functionsFixed[2](); // 2
```

## Practical Applications

### Module Pattern

```javascript
const Calculator = (function() {
  let lastResult = 0; // Private

  function add(a, b) {
    lastResult = a + b;
    return lastResult;
  }

  function subtract(a, b) {
    lastResult = a - b;
    return lastResult;
  }

  return { add, subtract, getLastResult: () => lastResult };
})();

Calculator.add(5, 3);    // 8
Calculator.getLastResult(); // 8
```

### Event Handlers

```javascript
function setupButton(buttonId, message) {
  document.getElementById(buttonId)
    .addEventListener("click", function() {
      alert(message); // Closure captures 'message'
    });
}

setupButton("btn1", "Hello!");
setupButton("btn2", "World!");
```

## Memory Considerations

Closures keep their referenced variables alive, which can lead to memory leaks if not managed carefully:

```javascript
// BAD: 'largeData' stays in memory because of the closure
function bad() {
  const largeData = new Array(1000000);
  return function() { return largeData[0]; };
}

// GOOD: Nullify references when done
function good() {
  const largeData = new Array(1000000);
  const fn = function() { return largeData[0]; };
  largeData = null; // Release memory
  return fn;
}
```
