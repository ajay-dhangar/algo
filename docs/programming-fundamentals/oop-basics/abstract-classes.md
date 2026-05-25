---
id: abstract-classes
title: "Abstract Classes"
sidebar_label: "Abstract Classes"
sidebar_position: 2
description: "A quick introduction to abstract classes in Object-Oriented Programming."
tags: [Abstract Classes, OOP, C++, Java, basics]
---

# Abstract Classes

An abstract class is a restricted class that cannot be used to create objects (to access it, it must be inherited from another class). It serves as a blueprint for other classes, allowing you to define a common interface and default behavior for derived classes.

---

## 1. Introduction to Abstract Classes

**Definition:**  
An abstract class is a class that is declared abstract—it may or may not include abstract methods. Abstract classes cannot be instantiated, but they can be subclassed.

**Why use Abstract Classes?**
- **Abstraction:** Hides the complex implementation details and only shows the essential features of the object.
- **Code Reusability:** Provides a common base class with shared code that multiple derived classes can inherit.
- **Contract Definition:** Enforces a contract for derived classes to implement certain methods.

**Abstract Methods:**
An abstract method is a method that is declared without an implementation (without braces, and followed by a semicolon). 

## 2. Abstract Classes in C++

In C++, an abstract class is defined by containing at least one **pure virtual function**. A pure virtual function is specified by placing `= 0` in its declaration.

**Syntax:**
```cpp
class AbstractClass {
public:
    virtual void pureVirtualFunction() = 0; // Pure virtual function
    
    void normalFunction() {
        // Implementation
    }
};
```

**Example:**

```cpp
#include <iostream>
using namespace std;

// Abstract Base Class
class Shape {
public:
    // Pure virtual function
    virtual void draw() = 0;
    
    // Normal member function
    void info() {
        cout << "I am a shape." << endl;
    }
};

// Derived Class
class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing a Circle." << endl;
    }
};

// Derived Class
class Square : public Shape {
public:
    void draw() override {
        cout << "Drawing a Square." << endl;
    }
};

int main() {
    // Shape s; // ERROR: Cannot instantiate an abstract class
    
    Shape* shape1 = new Circle();
    Shape* shape2 = new Square();
    
    shape1->info();
    shape1->draw();
    
    shape2->info();
    shape2->draw();
    
    delete shape1;
    delete shape2;
    
    return 0;
}
```

**Output:**

```text
I am a shape.
Drawing a Circle.
I am a shape.
Drawing a Square.
```

## 3. Abstract Classes in Java

In Java, the `abstract` keyword is used to declare an abstract class or method.

**Syntax:**
```java
abstract class AbstractClass {
    abstract void abstractMethod(); // Abstract method
    
    void normalMethod() {
        // Implementation
    }
}
```

**Example:**

```java
// Abstract Base Class
abstract class Animal {
    // Abstract method (does not have a body)
    public abstract void animalSound();
    
    // Regular method
    public void sleep() {
        System.out.println("Zzz");
    }
}

// Subclass (inherit from Animal)
class Pig extends Animal {
    public void animalSound() {
        // The body of animalSound() is provided here
        System.out.println("The pig says: wee wee");
    }
}

class Main {
    public static void main(String[] args) {
        Pig myPig = new Pig(); // Create a Pig object
        myPig.animalSound();
        myPig.sleep();
    }
}
```

**Output:**

```text
The pig says: wee wee
Zzz
```

## 4. Key Properties

- **Cannot be instantiated:** You cannot create objects of an abstract class. If you try, the compiler will throw an error.
- **Can have constructors:** Abstract classes can have constructors which are called when a derived class object is created.
- **Can contain member variables:** Abstract classes can have data members and concrete methods.
- **Derived classes must implement abstract methods:** If a derived class does not implement all the abstract methods of its base class, then the derived class also becomes an abstract class.

## 5. Interfaces vs Abstract Classes

While both interfaces and abstract classes can be used to achieve abstraction, they have distinct differences:

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| **Methods** | Can have both abstract and concrete methods. | Generally contains only abstract methods (until Java 8 introduced default/static methods). |
| **Variables** | Can have `final`, `non-final`, `static`, and `non-static` variables. | Variables are `public static final` by default. |
| **Inheritance** | A class can extend only one abstract class. | A class can implement multiple interfaces. |
| **Constructors** | Can have constructors. | Cannot have constructors. |

Choose an abstract class when classes share a common state or behavior. Choose an interface when defining a contract that unrelated classes can implement.
