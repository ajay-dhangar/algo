---
id: encapsulation
title: "Encapsulation"
sidebar_label: "Encapsulation"
sidebar_position: 5
description: "Understanding Encapsulation and Data Hiding in OOP."
tags: [Encapsulation, OOP, basics]
---

# Encapsulation

Encapsulation is one of the four fundamental OOP concepts (along with Inheritance, Polymorphism, and Abstraction). It is the mechanism that binds together code and the data it manipulates, keeping both safe from outside interference and misuse.

---

## 1. What is Encapsulation?

Encapsulation involves:
1. **Bundling:** Grouping data (variables) and methods (functions) that operate on the data into a single unit, i.e., a class.
2. **Data Hiding:** Restricting direct access to some of an object's components. This is typically achieved by making variables `private` and exposing `public` getter and setter methods to access and modify them.

## 2. Benefits of Encapsulation

- **Control over Data:** You can validate data in the setter methods before assigning it to variables.
- **Flexibility and Maintenance:** You can change the internal implementation without affecting the external code that uses the class.
- **Security:** Prevents accidental or unauthorized modification of internal state.

## 3. Example in Java

```java
public class Person {
    // Private variables - hidden from other classes
    private String name;
    private int age;

    // Public getter method for name
    public String getName() {
        return name;
    }

    // Public setter method for name
    public void setName(String newName) {
        this.name = newName;
    }

    // Public getter method for age
    public int getAge() {
        return age;
    }

    // Public setter method for age with validation
    public void setAge(int newAge) {
        if (newAge >= 0) {
            this.age = newAge;
        } else {
            System.out.println("Age cannot be negative.");
        }
    }
}
```
