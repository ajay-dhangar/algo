---
id: objects-in-java
sidebar_position: 8
title: Objects in Java
sidebar_label: Objects
---

## Overview
In Java, objects are fundamental to the concept of object-oriented programming (OOP). They represent real-world entities with attributes (properties) and behaviors (methods). Objects provide a way to model and organize code by grouping related data and functionality. Understanding how to create and work with objects is crucial for mastering Java and OOP principles.

## What Are Objects?
An object is an instance of a class, which is a blueprint or template that defines the properties (fields) and behaviors (methods) of that object. While a class specifies what an object will look like and how it will behave, an object is a concrete realization of that class. In simpler terms, if a class is a blueprint for a house, then an object is an actual house built using that blueprint.

Objects in Java have:
- **State**: The data or attributes of the object, represented by instance variables.
- **Behavior**: The operations or functionalities the object can perform, represented by methods.
- **Identity**: A unique reference that distinguishes each object from others.

## Creating Objects
To create an object in Java, you need to:
1. **Define a class**: The class must be defined first, specifying the attributes and methods.
2. **Use the `new` keyword**: Create an instance of the class using the `new` keyword.
3. **Assign the object to a reference variable**: This variable will hold the memory address of the created object.

### Example: Creating an Object
Here’s an example of defining a class and creating an object in Java:

```java
// Class definition
public class Car {
    // Attributes (state)
    String model;
    int year;

    // Method (behavior)
    public void displayDetails() {
        System.out.println("Model: " + model + ", Year: " + year);
    }
}

// Main class to create objects
public class Main {
    public static void main(String[] args) {
        // Creating an object of the Car class
        Car myCar = new Car();
        // Setting the attributes
        myCar.model = "Toyota";
        myCar.year = 2022;
        // Calling the method
        myCar.displayDetails(); // Output: Model: Toyota, Year: 2022
    }
}
```
## Key Points
- **Multiple Objects:** You can create multiple objects from the same class, each with its own set of attribute values.
- **Reference Variables:** The reference variable holds the memory address where the object is stored, not the actual object.
- **Accessing Members:** Use the dot (.) operator to access the attributes and methods of the object (e.g., myCar.model).
- **Garbage Collection:** Java has automatic memory management. When an object is no longer referenced, it is eligible for garbage collection, freeing up memory.

## Conclusion
Objects are essential in Java, serving as instances of classes that bring data and behavior together. By creating objects, developers can model real-world entities and organize code in a modular, reusable way. Understanding how to define classes, instantiate objects, and manipulate their properties is a foundational skill in Java programming. Practice creating and using objects to strengthen your grasp of OOP principles.
