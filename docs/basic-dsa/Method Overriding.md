---
id: method-overriding
title: Method Overriding
sidebar_label: Introduction to Method Overriding
sidebar_position: 2
description: 'Method overriding allows a derived class to provide a specific implementation of a method that is already defined in its base class. This feature enables runtime polymorphism in object-oriented programming.'
tags: [dsa, data-structures, Method Overriding]
---

## Method Overriding

### Introduction 

Method overriding allows a derived class to provide a specific implementation of a method that is already defined in its base class. This feature enables runtime polymorphism in object-oriented programming, allowing methods to be called on objects of derived classes even when they are referenced by base class pointers or references.

### Syntax

To override a method, you must define a method in the derived class with the same name, return type, and parameter list as the method in the base class.

```cpp
class Base {
public:
    virtual ReturnType methodName(ParameterList) {
        // Base class implementation
    }
};

class Derived : public Base {
public:
    ReturnType methodName(ParameterList) override {
        // Derived class implementation
    }
};
```

### Example

```cpp
#include <iostream>

class Base {
public:
    virtual void display() {
        std::cout << "Display Base Class" << std::endl;
    }
};

class Derived : public Base {
public:
    void display() override {
        std::cout << "Display Derived Class" << std::endl;
    }
};

int main() {
    Base* b;
    Derived d;
    b = &d;
    b->display();  // Calls Derived's display
    return 0;
}
```
### Key Points About Method Overriding
1. Virtual Functions: The base class method must be declared as virtual to allow overriding. The override keyword in the derived class method is optional but helps clarify intent and catch errors.

2. Polymorphism: Method overriding enables polymorphic behavior, allowing a base class pointer to reference derived class objects and invoke the appropriate overridden method.

3. Access Specifiers: The access level of the overriding method in the derived class must be the same or less restrictive than that of the base class method.

### Rules for Method Overriding

1. Same Signature: The overridden method must have the same name, return type, and parameter list as the base class method.

2. Use of virtual: The base class method must be declared with the virtual keyword to be overridden in the derived class.

3. Return Type Compatibility: The return type of the overriding method can be the same as the base class method or a derived type (covariant return type).

4. Static vs. Dynamic Binding: Overridden methods are resolved at runtime (dynamic binding), while non-overridden methods are resolved at compile time (static binding).

5. Destructors: If a base class has a virtual method, it should also have a virtual destructor to ensure proper cleanup of derived class objects when deleted through a base class pointer.