---
id: classes-in-csharp
sidebar_position: 7
title: "Classes in C#"
sidebar_label: "Classes in C#"
---

# Classes in C#

In C#, a class is a blueprint for creating objects. It defines properties, methods, and events that represent the characteristics and behaviors of an object.

---

## 1. What is a Class?

A class in C# defines the structure and behavior of objects. It includes fields, properties, methods, and constructors.

### Example:

```csharp
public class Car {
    public string color = "red";
    public void Drive() {
        Console.WriteLine("The car is driving.");
    }
}
```

This example defines a class `Car` with a property `color` and a method `Drive`.

---

## 2. Defining a Class

In C#, classes are defined using the `class` keyword.

### Syntax:

```csharp
public class ClassName {
    // fields, properties, methods, and constructors
}
```

### Example:

```csharp
public class Person {
    public string Name;
    public int Age;
}
```

---

## 3. Fields in Classes

Fields are variables that hold data related to an object. They are typically private but can be public as well.

### Example:

```csharp
public class Person {
    public string Name; // Field
}
```

---

## 4. Properties

Properties provide controlled access to fields and use `get` and `set` accessors.

### Example:

```csharp
public class Person {
    private string name;

    public string Name {
        get { return name; }
        set { name = value; }
    }
}
```

---

## 5. Methods in Classes

Methods define actions that an object can perform.

### Example:

```csharp
public class Car {
    public void Drive() {
        Console.WriteLine("The car is driving.");
    }
}
```

---

## 6. Constructors

Constructors initialize an object when it is created.

### Example:

```csharp
public class Person {
    public string Name;

    public Person(string name) {
        Name = name; // Constructor initializes the Name property
    }
}
```

---

## 7. Access Modifiers

Access modifiers control the visibility of class members (`public`, `private`, `protected`).

### Example:

```csharp
public class Car {
    private string color; // Private member
    public void SetColor(string c) {
        color = c; // Public method to set color
    }
}
```

---

## 8. Static Classes and Members

Static classes cannot be instantiated, and static members belong to the class itself rather than an instance.

### Example:

```csharp
public static class Utility {
    public static void PrintMessage(string message) {
        Console.WriteLine(message);
    }
}
```

---

## Summary

Classes are essential for object-oriented programming in C#. They provide a way to organize data and behaviors in your programs, making them more modular and maintainable.

Happy coding!
