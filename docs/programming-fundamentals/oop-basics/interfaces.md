---
id: interfaces
title: "Interfaces"
sidebar_label: "Interfaces"
sidebar_position: 4
description: "A guide to Interfaces and defining contracts in OOP."
tags: [Interfaces, OOP, basics, contract]
---

# Interfaces

An interface in Object-Oriented Programming is a reference type, similar to a class, that can contain only constants, method signatures, default methods, static methods, and nested types. Method bodies exist only for default methods and static methods.

---

## 1. Introduction

An interface acts as a **contract**. If a class implements an interface, it promises to provide the behavior (implementations) for all the abstract methods declared in that interface.

## 2. Why Use Interfaces?

- **Achieve Total Abstraction:** Before default methods, interfaces provided 100% abstraction.
- **Multiple Inheritance:** Languages like Java and C# do not support multiple inheritance of classes, but they allow a class to implement multiple interfaces.
- **Loose Coupling:** Interfaces decouple the *what* from the *how*, making code more modular and testable.

## 3. Interface in Java

```java
// Interface declaration
interface Animal {
    // Abstract method (no body)
    void animalSound();
    
    // Abstract method
    void sleep();
}

// Class implementing the interface
class Pig implements Animal {
    public void animalSound() {
        System.out.println("The pig says: wee wee");
    }
    public void sleep() {
        System.out.println("Zzz");
    }
}
```

## 4. Interfaces in C++

C++ does not have a dedicated `interface` keyword. Instead, interfaces are simulated using **Abstract Classes** where *all* member functions are pure virtual functions and there are no member variables.

```cpp
class IAnimal {
public:
    virtual void animalSound() = 0; // Pure virtual
    virtual void sleep() = 0;       // Pure virtual
    virtual ~IAnimal() {}           // Virtual destructor
};
```
