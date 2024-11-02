---
id: objects-in-csharp
sidebar_position: 6
title: "Objects in C#"
sidebar_label: "Objects in C#"
---

# Objects in C#

In C#, objects are instances of classes, allowing us to bundle data and methods together to represent real-world entities.

---

## 1. What is an Object?

An object in C# is an instance of a class that contains properties and methods to model data and behavior.

### Example:

```csharp
public class Car {
    public string color = "red";
    public void Drive() {
        Console.WriteLine("The car is driving.");
    }
}

class Program {
    static void Main() {
        Car myCar = new Car(); // Creating an object of the Car class
        Console.WriteLine(myCar.color); // Accessing a property
        myCar.Drive(); // Calling a method
    }
}
```

This code defines a `Car` class with a property `color` and a method `Drive`. An object of `Car` (`myCar`) is created and used.

---

## 2. Creating Objects

To create an object in C#, we use the `new` keyword along with the class constructor.

### Syntax:

```csharp
ClassName objectName = new ClassName();
```

### Example:

```csharp
Person person = new Person(); // Creating an object of Person class
```

---

## 3. Accessing Object Properties and Methods

Object properties and methods are accessed using the dot (`.`) operator.

### Example:

```csharp
Car myCar = new Car();
myCar.color = "blue"; // Modifying a property
myCar.Drive(); // Calling a method
```

---

## 4. Constructors in Objects

Constructors are special methods used to initialize objects.

### Example:

```csharp
public class Car {
    public string color;
    public Car(string carColor) {
        color = carColor; // Constructor assigns color
    }
}

class Program {
    static void Main() {
        Car myCar = new Car("blue");
        Console.WriteLine(myCar.color); // Outputs "blue"
    }
}
```

---

## 5. Object Methods

Objects can have methods that define behavior.

### Example:

```csharp
public class Person {
    public void Greet() {
        Console.WriteLine("Hello!");
    }
}

class Program {
    static void Main() {
        Person person = new Person();
        person.Greet(); // Calls the Greet method
    }
}
```

---

## 6. Properties with Getters and Setters

Properties allow controlled access to an object's data.

### Example:

```csharp
public class Person {
    private string name;

    public string Name {
        get { return name; }
        set { name = value; }
    }
}

class Program {
    static void Main() {
        Person person = new Person();
        person.Name = "Alice"; // Setting property
        Console.WriteLine(person.Name); // Getting property
    }
}
```

---

## Summary

Objects are fundamental to C#, allowing us to model real-world entities with classes, properties, and methods. Mastering object creation and manipulation is essential for effective programming in C#.

Happy coding!
