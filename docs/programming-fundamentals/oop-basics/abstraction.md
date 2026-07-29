---
id: abstraction
sidebar_position: 3
title: "Abstraction in OOP"
sidebar_label: "Abstraction"
description: "A guide to abstraction - hiding complexity and showing only essential features."
tags: [programming-fundamentals, oop, object-oriented-design]
---

# Abstraction in OOP

## Introduction

Abstraction is the concept of hiding complex implementation details behind a simple interface, exposing only what is necessary for the user. It lets you focus on "what" an object does rather than "how" it does it.

## Abstraction vs Encapsulation

| Aspect | Abstraction | Encapsulation |
|--------|-------------|---------------|
| Goal | Hide complexity | Bundle data + methods |
| Focus | External interface | Internal implementation |
| View | "What" it does | "How" it works |
| Example | Remote control buttons | Private fields in a class |

## Abstract Classes

```javascript
// Abstract class simulation in JavaScript
class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Shape is abstract and cannot be instantiated");
    }
  }

  area() {
    throw new Error("Subclass must implement area()");
  }

  perimeter() {
    throw new Error("Subclass must implement perimeter()");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.area()); // 15
```

## Interfaces

```python
from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

    @abstractmethod
    def scale(self, factor):
        pass

class Circle(Drawable):
    def __init__(self, radius):
        self.radius = radius

    def draw(self):
        print(f"Drawing circle with radius {self.radius}")

    def scale(self, factor):
        self.radius *= factor
```

## Real-World Example: Coffee Machine

```javascript
// Abstraction: user only sees buttons, not the internal pump/heating logic
class CoffeeMachine {
  #pump;
  #heater;
  #grinder;

  constructor() {
    this.#pump = new Pump();
    this.#heater = new Heater();
    this.#grinder = new Grinder();
  }

  makeEspresso() {
    this.#grinder.grind();
    this.#pump.pressurize(9);
    this.#heater.heat(93);
    return "Espresso ready";
  }
}

// User only interacts with the simple interface
const machine = new CoffeeMachine();
machine.makeEspresso(); // Simple!
```

## Benefits

1. **Simplicity**: Users interact with a simplified interface.
2. **Flexibility**: Implementation can change without breaking consumers.
3. **Maintainability**: Changes in implementation are isolated.
4. **Reusability**: Abstract components work with many concrete implementations.
