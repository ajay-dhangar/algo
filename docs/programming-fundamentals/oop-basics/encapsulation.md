---
id: encapsulation
sidebar_position: 2
title: "Encapsulation in OOP"
sidebar_label: "Encapsulation"
description: "A guide to encapsulation - bundling data and methods while restricting direct access."
tags: [programming-fundamentals, oop, object-oriented-design]
---

# Encapsulation in OOP

## Introduction

Encapsulation is one of the four pillars of object-oriented programming. It bundles data (variables) and methods (functions) that operate on that data into a single unit (class), while restricting direct access to some of the object's components.

## The Core Idea

Encapsulation achieves two goals:
1. **Data hiding**: Internal state is protected from outside access.
2. **Interface exposure**: Controlled access through public methods.

## Implementation by Language

```javascript
// JavaScript using closures (pre-ES6)
function Counter() {
  let count = 0; // private variable

  this.increment = function() {
    count++;
    return count;
  };

  this.getCount = function() {
    return count;
  };
}

const counter = new Counter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2
```

```python
class Counter:
    def __init__(self):
        self._count = 0  # Convention: "protected"

    def increment(self):
        self._count += 1
        return self._count

    def get_count(self):
        return self._count

# True encapsulation with name mangling
class SecureCounter:
    def __init__(self):
        self.__count = 0  # "private" (name-mangled)

    def increment(self):
        self.__count += 1
        return self.__count
```

## Access Modifiers

| Modifier | Java | Python | JavaScript |
|----------|------|--------|------------|
| Public | `public` | No modifier | No modifier |
| Protected | `protected` | `_prefix` | `#prefix` (ES2022) |
| Private | `private` | `__prefix` | `#field` |

## Benefits

1. **Security**: Prevents unauthorized modification of data.
2. **Modularity**: Classes can be changed without affecting other code.
3. **Maintainability**: Bugs are easier to isolate and fix.
4. **Abstraction**: Users interact with interfaces, not implementation details.

## Getters and Setters

```javascript
class BankAccount {
  #balance = 0;

  get balance() {
    return this.#balance;
  }

  set balance(amount) {
    if (amount < 0) throw new Error("Balance cannot be negative");
    this.#balance = amount;
  }
}
```
