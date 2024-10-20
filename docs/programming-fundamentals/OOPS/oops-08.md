---
id: polymorphism
title: "Polymorphism in Object-Oriented Programming (OOP)"
sidebar_label: Polymorphism
sidebar_position: 4
description: "Polymorphism allows methods to take many forms, enabling flexibility in calling methods based on object type. It can be categorized into compile-time and runtime polymorphism."
tags: [oops, polymorphism, object-oriented programming]
---

# **Polymorphism in OOP**

Polymorphism is a key concept in Object-Oriented Programming (OOP) that allows methods to perform different tasks based on the object that calls them. It can be categorized into two types: **compile-time polymorphism** and **runtime polymorphism**.

---

## **Types of Polymorphism**

### **1. Compile-time Polymorphism**
Also known as **method overloading**, it allows multiple methods with the same name but different parameters to coexist in the same class.

### **Example of Compile-time Polymorphism**


```cpp
#include <iostream>
using namespace std;

class Math {
public:
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
};

int main() {
    Math math;
    cout << "Int Addition: " << math.add(5, 10) << endl;
    cout << "Double Addition: " << math.add(5.5, 10.5) << endl;
    return 0;
}
```

2. Runtime Polymorphism
Also known as method overriding, it occurs when a child class provides a specific implementation of a method that is already defined in its parent class. This is determined at runtime.

Example of Runtime Polymorphism
```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    virtual void sound() {
        cout << "Animal sound" << endl;
    }
};

class Dog : public Animal {
public:
    void sound() override {
        cout << "Woof!" << endl;
    }
};

int main() {
    Animal* animal = new Dog();  // Pointer to base class
    animal->sound();  // Calls Dog's sound method
    delete animal;
    return 0;
}
```
## Advantages of Polymorphism
Flexibility: The same method can perform different tasks based on the object it acts upon.
Extensibility: New behavior can be added by overriding existing methods without modifying the base class.
Dynamic method dispatch: At runtime, the correct method is chosen based on the object type.
