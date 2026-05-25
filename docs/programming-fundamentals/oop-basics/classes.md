---
id: classes
title: "Classes"
sidebar_label: "Classes"
sidebar_position: 2
description: "A comprehensive guide to Classes in Object-Oriented Programming."
tags: [Classes, OOP, basics]
---

# Classes

A class is the fundamental building block of Object-Oriented Programming (OOP). It is a user-defined data type that acts as a blueprint or template for creating objects. 

---

## 1. What is a Class?

A class binds data and the methods that operate on that data into a single unit. It defines a set of properties (attributes) and behaviors (functions) that the created objects will have.

**Analogy:**  
Think of a class as an architectural blueprint for a house. The blueprint defines how the house should be built, how many rooms it will have, and where the doors are. However, you cannot live in a blueprint. You need to build a house (create an object) based on the blueprint.

## 2. Structure of a Class

A typical class consists of:
- **Data Members (Attributes/Properties):** Variables that hold the state of an object.
- **Member Functions (Methods/Behaviors):** Functions that define what the object can do and how its state can be modified.
- **Access Specifiers:** Keywords like `public`, `private`, and `protected` that control the visibility of class members.

## 3. Example

```cpp
#include <iostream>
using namespace std;

class Car {
    // Access specifier
    public:
        // Data Members
        string brand;   
        string model;
        int year;
        
        // Member Function
        void drive() {
            cout << "The " << brand << " " << model << " is driving." << endl;
        }
};
```
