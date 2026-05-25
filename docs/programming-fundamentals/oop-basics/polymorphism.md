---
id: polymorphism
title: "Polymorphism"
sidebar_label: "Polymorphism"
sidebar_position: 8
description: "Understanding Polymorphism (many forms) in OOP."
tags: [Polymorphism, OOP, basics]
---

# Polymorphism

Polymorphism is one of the core concepts of Object-Oriented Programming. The word polymorphism means "having many forms." In programming, it refers to the ability of a single function, method, or object to behave differently based on the context.

---

## 1. Types of Polymorphism

Polymorphism is generally divided into two types:

### A. Compile-time Polymorphism (Static Binding)
Resolved during compilation. It is achieved through:
- **Function Overloading:** Multiple functions with the same name but different parameters.
- **Operator Overloading:** Defining multiple behaviors for operators.

### B. Runtime Polymorphism (Dynamic Binding)
Resolved during program execution. It is achieved through:
- **Method Overriding (Virtual Functions):** A derived class provides a specific implementation of a method that is already defined in its base class.

## 2. Compile-time Polymorphism Example

```cpp
// Function Overloading
class Math {
public:
    int add(int a, int b) {
        return a + b;
    }
    
    // Overloaded function with different parameter types
    double add(double a, double b) {
        return a + b;
    }
};
```

## 3. Runtime Polymorphism Example

Runtime polymorphism allows a base class pointer to point to a derived class object, and call the derived class's method.

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    virtual ~Animal() {} // Virtual destructor for proper cleanup

    // Virtual function enables runtime polymorphism
    virtual void sound() {
        cout << "Animal makes a sound" << endl;
    }
};

class Dog : public Animal {
public:
    // Overriding the base class method
    void sound() override {
        cout << "Dog barks" << endl;
    }
};

class Cat : public Animal {
public:
    void sound() override {
        cout << "Cat meows" << endl;
    }
};

int main() {
    Animal* myAnimal;
    Dog myDog;
    Cat myCat;

    // Pointer points to Dog object
    myAnimal = &myDog;
    myAnimal->sound(); // Outputs: Dog barks

    // Pointer points to Cat object
    myAnimal = &myCat;
    myAnimal->sound(); // Outputs: Cat meows

    return 0;
}
```
