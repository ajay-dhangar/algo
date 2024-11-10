---
id: inheritance-in-csharp  
sidebar_position: 8  
title: "Inheritance in C#"  
sidebar_label: "Inheritance in C#"  
---

Inheritance is a core concept in object-oriented programming that allows one class to inherit the properties and methods of another class. In C#, inheritance is implemented using a class hierarchy, enabling code reuse, better organization, and the creation of complex relationships between classes.

## 1. What is Inheritance?

Inheritance enables a class (called the **derived class**) to inherit members (fields, methods, properties, etc.) from another class (called the **base class**). This provides the derived class with the capabilities of the base class, while also allowing it to define its own unique members.

### Syntax:

```csharp
class BaseClass {
    // Base class members
}

class DerivedClass : BaseClass {
    // Derived class members
}
```

## 2. Example of Inheritance

Here's a simple example demonstrating inheritance in C#: 

```csharp
using System;

class Animal {
    public void Eat() {
        Console.WriteLine("Eating...");
    }
}

class Dog : Animal {
    public void Bark() {
        Console.WriteLine("Barking...");
    }
}

class Program {
    static void Main() {
        Dog dog = new Dog();
        dog.Eat();  // Inherited from Animal
        dog.Bark(); // Defined in Dog
    }
}
```

### Explanation:

In this example:
- `Animal` is the base class with a method `Eat`.
- `Dog` is a derived class that inherits from `Animal` and has an additional method `Bark`.
- An instance of `Dog` can use both `Eat` (inherited) and `Bark` (defined in `Dog`).

## 3. Types of Inheritance in C#

In C#, inheritance is generally single inheritance, meaning a class can inherit from only one base class. However, you can achieve multiple inheritance by using interfaces. Here are the common types:

- **Single Inheritance**: A class inherits from one base class.
- **Multiple Inheritance (with Interfaces)**: A class implements multiple interfaces to achieve a form of multiple inheritance.
- **Multilevel Inheritance**: A class is derived from another derived class.

### Multilevel Inheritance Example:

```csharp
class Vehicle {
    public void Move() {
        Console.WriteLine("Moving...");
    }
}

class Car : Vehicle {
    public void Drive() {
        Console.WriteLine("Driving...");
    }
}

class SportsCar : Car {
    public void TurboBoost() {
        Console.WriteLine("Turbo Boosting...");
    }
}

class Test {
    static void Main() {
        SportsCar sc = new SportsCar();
        sc.Move();         // Inherited from Vehicle
        sc.Drive();        // Inherited from Car
        sc.TurboBoost();   // Defined in SportsCar
    }
}
```

## 4. The `base` Keyword

The `base` keyword is used to access members of the base class from within a derived class. This is useful when you want to call a constructor or method of the base class.

### Example with `base`:

```csharp
class Person {
    public string Name;
    public Person(string name) {
        Name = name;
    }
}

class Employee : Person {
    public int EmployeeID;

    public Employee(string name, int employeeID) : base(name) {
        EmployeeID = employeeID;
    }
}
```

## 5. Sealed Classes and Methods

The `sealed` keyword is used to prevent further inheritance. When a class is marked as `sealed`, it cannot be used as a base class.

### Example of Sealed Class:

```csharp
sealed class FinalClass {
    // Class implementation
}
```

### Example of Sealed Method:

```csharp
class BaseClass {
    public virtual void Display() {
        Console.WriteLine("Base display");
    }
}

class DerivedClass : BaseClass {
    public sealed override void Display() {
        Console.WriteLine("Derived display");
    }
}
```

## 6. Conclusion

Inheritance is a powerful concept that allows classes to inherit properties and methods from other classes, promoting code reusability and organization. Mastering inheritance in C# helps in building more structured, readable, and maintainable applications.

---
