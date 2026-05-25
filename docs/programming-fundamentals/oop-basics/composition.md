---
id: composition
title: "Composition"
sidebar_label: "Composition"
sidebar_position: 9
description: "Understanding Composition (has-a relationship) in OOP."
tags: [Composition, OOP, relationships, basics]
---

# Composition

Composition is a fundamental concept in Object-Oriented Programming that describes a "has-a" relationship between classes. It is a design technique where complex objects are built from smaller, simpler objects.

---

## 1. What is Composition?

In composition, a class contains an object of another class as a member. Crucially, the contained object cannot exist independently of the container object. If the container is destroyed, the contained object is also destroyed. This implies a strong ownership and coincident lifetime.

## 2. Composition vs Inheritance

- **Inheritance ("is-a"):** A Car *is a* Vehicle. You use inheritance when a class extends the fundamental nature of another class.
- **Composition ("has-a"):** A Car *has an* Engine. You use composition when a class is built up from other components.

*Rule of thumb: Favor composition over inheritance to achieve better code flexibility and reduce deep inheritance hierarchies.*

## 3. Example

```cpp
#include <iostream>
using namespace std;

// Component class
class Engine {
public:
    void start() {
        cout << "Engine starts." << endl;
    }
};

// Container class
class Car {
private:
    // Car "has an" Engine
    Engine engine; 
public:
    void startCar() {
        engine.start(); // Delegating behavior to the component
        cout << "Car is ready to go!" << endl;
    }
};
```
