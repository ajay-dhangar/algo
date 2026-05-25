---
id: objects
title: "Objects"
sidebar_label: "Objects"
sidebar_position: 1
description: "The fundamental unit of Object-Oriented Programming: Objects."
tags: [Objects, OOP, basics]
---

# Objects

An object is the most basic, fundamental unit of Object-Oriented Programming (OOP). It is an instance of a class, representing a real-world entity with a well-defined state and behavior.

---

## 1. What is an Object?

If a class is the blueprint, an object is the actual house built from that blueprint. When a class is defined, no memory is allocated. Memory is only allocated when an object of that class is instantiated.

Every object consists of:
- **State (Attributes):** The data or properties of the object (e.g., color, model, speed).
- **Behavior (Methods):** The actions the object can perform (e.g., accelerate, brake).
- **Identity:** A unique name or memory location that distinguishes it from other objects.

## 2. Object Instantiation

Creating an object from a class is called instantiation. 

### Example in C++:

```cpp
#include <iostream>
using namespace std;

class Car {
public:
    string brand;
    void honk() {
        cout << "Beep beep!" << endl;
    }
};

int main() {
    // Instantiating an object
    Car myCar; 
    
    // Setting state
    myCar.brand = "Toyota";
    
    // Invoking behavior
    myCar.honk();
    
    return 0;
}
```

## 3. Object Lifecycle

1. **Creation:** An object is created and memory is allocated. A special method called a **Constructor** is invoked to initialize the object's state.
2. **Use:** The object is used by the application, its methods are called, and its state may change.
3. **Destruction:** When the object is no longer needed, memory is reclaimed. In languages like C++, a **Destructor** is called. In languages with Garbage Collection (Java, C#), this process is handled automatically.
