---
id: composition
sidebar_position: 5
title: "Composition Design Pattern"
sidebar_label: "Composition"
description: "A guide to composition in OOP - building complex objects from simpler ones."
tags: [programming-fundamentals, oop, design-patterns]
---

# Composition Design Pattern

## Introduction

Composition is a design principle where a class is composed of one or more objects of other classes, rather than inheriting from a base class. It enables "has-a" relationships and promotes flexibility and loose coupling.

## Composition vs Inheritance

| Aspect | Inheritance | Composition |
|--------|-------------|-------------|
| Relationship | "is-a" | "has-a" |
| Flexibility | Less flexible (rigid hierarchy) | More flexible (runtime behavior) |
| Coupling | Tight coupling | Loose coupling |
| Runtime | Fixed at compile time | Can change at runtime |

## Basic Example

```javascript
// Instead of: class Dog extends Animal
// Use composition:
class Bark {
  speak() { return "Woof!"; }
}

class Fetch {
  play() { return "Fetching the ball"; }
}

class Dog {
  constructor(name) {
    this.name = name;
    this.barker = new Bark();
    this.fetcher = new Fetch();
  }

  speak() { return this.barker.speak(); }
  play() { return this.fetcher.play(); }
}
```

## Real-World Example

```python
class Engine:
    def start(self): return "Engine starting"
    def stop(self): return "Engine stopping"

class Wheels:
    def rotate(self): return "Wheels rotating"

class Car:
    def __init__(self):
        self.engine = Engine()
        self.wheels = Wheels()

    def drive(self):
        msgs = [self.engine.start(), self.wheels.rotate()]
        return " and ".join(msgs)

    def park(self):
        msgs = [self.wheels.rotate(), self.engine.stop()]
        return " and ".join(msgs)

car = Car()
print(car.drive())  # "Engine starting and Wheels rotating"
```

## Function Composition

```javascript
// Compose multiple functions into one
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Example
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const compute = pipe(addOne, double, square);
console.log(compute(3)); // (3+1)*2 = 8, 8^2 = 64
```

## Benefits of Composition

1. **Flexibility**: Change behavior at runtime by swapping components.
2. **Loose coupling**: Classes depend on interfaces, not concrete implementations.
3. **Reusability**: Small, focused classes are easier to reuse.
4. **Testing**: Individual components can be tested in isolation.
5. **Avoids inheritance problems**: No diamond problem, no fragile base class.

## Composition with Interfaces

```typescript
interface Printable {
  print(): string;
}

interface Saveable {
  save(): void;
}

class Report implements Printable, Saveable {
  print(): string {
    return "Report content";
  }

  save(): void {
    console.log("Report saved");
  }
}
```

## When to Prefer Composition

- When "has-a" better describes the relationship than "is-a"
- When behavior needs to change at runtime
- When you want to avoid deep inheritance hierarchies
- When components are independent and reusable
