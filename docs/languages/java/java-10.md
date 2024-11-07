---
id: Polymorphism-in-java
sidebar_position: 10
title: "Polymorphism in Java"
sidebar_label: "Polymorphism in Java"
---
# Polymorphism in Java

Welcome to the Java Programming repository! This section focuses on one of the core Object-Oriented Programming (OOP) concepts: **Polymorphism**.

Polymorphism allows methods to perform different tasks based on the object calling them, providing flexibility and reusable code. In Java, polymorphism is mainly achieved through **method overriding** and **method overloading**.

## Table of Contents
- [Introduction to Polymorphism](#introduction-to-polymorphism)
- [Types of Polymorphism](#types-of-polymorphism)
  - [Compile-Time Polymorphism (Method Overloading)](#compile-time-polymorphism-method-overloading)
  - [Run-Time Polymorphism (Method Overriding)](#run-time-polymorphism-method-overriding)
- [Code Examples](#code-examples)
- [Conclusion](#conclusion)

---

## Introduction to Polymorphism

Polymorphism, a Greek term meaning "many forms," allows Java methods to take on multiple forms. This means a single function can handle different data types or perform different tasks based on the context, enhancing code flexibility and scalability.

Polymorphism in Java can be divided into two main types:

1. **Compile-Time Polymorphism**: Achieved through method overloading.
2. **Run-Time Polymorphism**: Achieved through method overriding.

## Types of Polymorphism

### 1. Compile-Time Polymorphism (Method Overloading)

**Method Overloading** allows multiple methods in the same class to have the same name but different parameters. The compiler determines the correct method to call based on the method signature (number and type of parameters).

Example:
```java
public class Calculator {
    // Method to add two integers
    public int add(int a, int b) {
        return a + b;
    }
    
    // Method to add three integers
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
```
In the `Calculator` class, we have two `add` methods:

- `add(int a, int b)` adds two integers.
- `add(int a, int b, int c)` adds three integers.

### 2. Run-Time Polymorphism (Method Overriding)

**Method Overriding** occurs when a subclass provides a specific implementation of a method already defined in its superclass. This type of polymorphism enables a child class to alter the behavior of its parent class.

Example:

```java
class Animal {
    // Method to describe sound of an animal
    public void sound() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    // Method to describe sound of a dog (overrides the parent method)
    @Override
    public void sound() {
        System.out.println("Woof Woof");
    }
}

class Cat extends Animal {
    // Method to describe sound of a cat (overrides the parent method)
    @Override
    public void sound() {
        System.out.println("Meow Meow");
    }
}
```
In this example:

- The `Animal` class has a method `sound()` that prints a generic message.
- The `Dog` and `Cat` classes override the `sound()` method with their unique implementations.

### Run-Time Polymorphism in Action:

```java
public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog(); // Polymorphic object
        Animal myCat = new Cat(); // Polymorphic object

        myDog.sound(); // Outputs: Woof Woof
        myCat.sound(); // Outputs: Meow Meow
    }
}
```
Here, the method that gets executed depends on the object type at runtime.` myDog` calls the `Dog` class's version of `sound()`, while `myCat` calls the `Cat` class's version.

## Conclusion
Polymorphism is a powerful feature in Java that increases flexibility and readability. By using method overloading and overriding, we can write more dynamic and adaptable code. Try experimenting with these examples to deepen your understanding of how polymorphism works in Java!

Happy Coding (✿◠‿◠)
