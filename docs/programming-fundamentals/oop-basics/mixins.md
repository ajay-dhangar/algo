---
id: mixins
title: "Mixins"
sidebar_label: "Mixins"
sidebar_position: 11
description: "Understanding Mixins for composition in OOP."
tags: [Mixins, OOP, patterns, basics]
---

# Mixins

A mixin is a class that contains methods for use by other classes without having to be the parent class of those other classes. Mixins are a way to achieve code reuse through composition and multiple inheritance.

---

## 1. What is a Mixin?

Mixins allow developers to "mix in" behavior into a class. Instead of saying "Class A *is a* Class B" (inheritance), you say "Class A *includes the behavior of* Class B" (mixin).

They are particularly useful in languages that do not support multiple inheritance, providing a clean way to share functionality across unrelated class hierarchies.

## 2. How Mixins Work

Mixins are typically not intended to be instantiated on their own. They exist solely to bundle functionality that can be injected into other classes.

## 3. Example (Conceptual / Python-style)

Languages like Python, Ruby, and TypeScript natively support mixin patterns.

```python
# Mixin class
class WalkableMixin:
    def walk(self):
        print("I am walking!")

# Mixin class
class FlyableMixin:
    def fly(self):
        print("I am flying!")

# Base class
class Animal:
    def __init__(self, name):
        self.name = name

# Combining mixins
class Bird(Animal, WalkableMixin, FlyableMixin):
    pass

class Dog(Animal, WalkableMixin):
    pass

b = Bird("Parrot")
b.walk() # Inherited from WalkableMixin
b.fly()  # Inherited from FlyableMixin
```
