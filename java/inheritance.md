---
id: array-list
sidebar_position: 2
title: Inheritance
sidebar_label: inheritance
description: Inheritance is a core concept in object-oriented programming (OOP) that allows you to create new classes (subclasses or child classes) that inherit properties and behaviors from existing classes (superclasses or parent classes). This promotes code reusability and helps in creating well-structured and maintainable software systems.
tags: [java, inheritance, class]
---

**Inheritance in Java**

Inheritance is a core concept in object-oriented programming (OOP) that allows you to create new classes (subclasses or child classes) that inherit properties and behaviors from existing classes (superclasses or parent classes). This promotes code reusability and helps in creating well-structured and maintainable software systems.

**Types of Inheritance**

1. **Single Inheritance:** A class inherits from only one parent class.
   ```java
   class Animal {
       public void eat() {
           System.out.println("Animal is eating.");
       }
   }

   class Dog extends Animal {
       public void bark() {
           System.out.println("Dog is barking.");
       }
   }
   ```
2. **Hierarchical Inheritance:** Multiple classes inherit from a single parent class.
   ```java
   class Vehicle {
       public void move() {
           System.out.println("Vehicle is moving.");
       }
   }

   class Car extends Vehicle {
       public void accelerate() {
           System.out.println("Car is accelerating.");
       }
   }

   class Bike extends Vehicle {
       public void brake() {
           System.out.println("Bike is braking.");
       }
   }
   ```
3. **Multilevel Inheritance:** A class inherits from a derived class.
   ```java
   class Shape {
       public void draw() {
           System.out.println("Shape is drawn.");
       }
   }

   class Rectangle extends Shape {
       public void area() {
           System.out.println("Rectangle area calculated.");
       }
   }

   class Square extends Rectangle {
       public void sideLength() {
           System.out.println("Square side length calculated.");
       }
   }
   ```

**Key Points**

* **`extends` keyword:** Used to establish an inheritance relationship.
* **Inheritance Hierarchy:** The chain of classes that inherit from each other.
* **Method Overriding:** Redefining a method in a subclass with the same signature as the parent class.
* **Method Overloading:** Defining multiple methods with the same name but different parameters in a class.

**Benefits of Inheritance**

* **Code Reusability:** Avoids redundant code by inheriting common properties and behaviors.
* **Modularity:** Encourages the creation of smaller, more focused classes.
* **Polymorphism:** Allows objects of different classes to be treated as objects of a common superclass.

**Important Considerations**

* **Access Modifiers:** Determine the visibility of class members.
* **Constructor Chaining:** Subclass constructors can call superclass constructors using the `super` keyword.
* **Object-Oriented Design Principles:** Follow SOLID principles for effective inheritance design.

By understanding inheritance, you can create more efficient, flexible, and maintainable Java applications.
