---
id: inheritance
title: "Inheritance in Object-Oriented Programming (OOP)"
sidebar_label: Inheritance
sidebar_position: 3
description: "Inheritance allows one class to inherit properties and behaviors from another class, promoting code reuse and creating a hierarchy."
tags: [oops, inheritance, object-oriented programming]
---

# **Inheritance in OOP**

Inheritance is a fundamental principle in Object-Oriented Programming (OOP) that allows a class to inherit properties and behaviors (methods) from another class. This helps in code reuse and establishes a parent-child relationship between classes.

---

## **Key Features of Inheritance**
- Establishes a **hierarchical relationship** between classes.
- Promotes **code reuse** by allowing derived classes to use methods and attributes of the base class.
- Supports an **"is-a" relationship** between objects.

---

### **Example of Inheritance**


<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Vehicle {
public:
    void move() {
        cout << "Vehicle is moving" << endl;
    }
};

class Car : public Vehicle {  // Car inherits from Vehicle
public:
    void honk() {
        cout << "Car is honking" << endl;
    }
};

int main() {
    Car car;
    car.move();  // Inherited method
    car.honk();  // Car's own method
    return 0;
}
```
</details>

<details>
<summary><strong>JavaScript Code</strong></summary>

```js
class Vehicle {
    move() {
        console.log("Vehicle is moving");
    }
}

class Car extends Vehicle {  // Car inherits from Vehicle
    honk() {
        console.log("Car is honking");
    }
}

// Main code
const car = new Car();
car.move();  // Inherited method
car.honk();  // Car's own method

```
</details>

## Advantages of Inheritance
Code reuse: Common code is written in the parent class and reused by child classes.
Extensibility: New features can be added to the child class without modifying the parent class.
Polymorphism: Supports runtime polymorphism through method overriding.
