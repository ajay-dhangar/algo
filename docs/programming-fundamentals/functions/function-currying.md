---
id: function-currying
sidebar_position: 13
title: "Function Currying"
sidebar_label: "Function Currying"
description: "A guide to function currying - transforming a function with multiple arguments into a sequence of functions."
tags: [programming-fundamentals, functions, functional-programming]
---

# Function Currying

## Introduction

Currying is a transformation technique in functional programming where a function with multiple arguments is translated into a sequence of functions, each taking a single argument.

## Basic Concept

```javascript
// Normal function
function add(a, b) {
  return a + b;
}
add(1, 2); // 3

// Curried version
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}
curriedAdd(1)(2); // 3
```

## Why Use Currying?

1. **Partial application**: Pre-fill some arguments and reuse the function.
2. **Function composition**: Build complex functions from simpler ones.
3. **Readability**: Express intent more clearly in some cases.
4. **Deferred execution**: Create specialized functions on the fly.

## Real-World Example

```javascript
// Curried function for API calls
const fetchWithAuth = (authToken) => (endpoint) => (options) => {
  return fetch(endpoint, {
    ...options,
    headers: { ...options.headers, Authorization: authToken }
  });
};

const myFetch = fetchWithAuth("my-token-123");
const getUser = myFetch("/api/user");
const userData = await getUser({ method: "GET" });
```

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125
```

## Manual Currying

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
```

## Uncurrying

The reverse process, converting a curried function back to a standard function:

```javascript
function uncurry(fn) {
  return function(...args) {
    let result = fn;
    for (const arg of args) {
      result = result(arg);
    }
    return result;
  };
}
```

## Use Cases

1. **Event handlers**: Pre-configure handlers with default arguments.
2. **Functional pipelines**: Compose utility functions cleanly.
3. **Configuration**: Build configuration objects step by step.
4. **React/Hooks**: Common pattern for creating specialized hooks.
