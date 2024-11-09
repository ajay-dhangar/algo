---
id: interfaces-in-csharp  
sidebar_position: 9  
title: "Interfaces in C#"  
sidebar_label: "Interfaces in C#"  
---

In C#, an interface is a contract that defines a set of methods and properties that a class must implement, without providing the implementation itself. Interfaces are fundamental to achieving abstraction, polymorphism, and multiple inheritance in C#. They allow classes to share a common contract, which helps in designing flexible and scalable applications.

## 1. What is an Interface?

An interface defines a set of methods, properties, events, or indexers without implementing them. Classes or structs that implement an interface are required to provide an implementation for each member defined in the interface.

### Syntax:

```csharp
interface IExample {
    void MethodA();
    int PropertyB { get; set; }
}
```

## 2. Implementing an Interface

A class can implement multiple interfaces by providing implementations for each member defined in the interface.

### Example:

```csharp
using System;

interface IAnimal {
    void MakeSound();
}

class Dog : IAnimal {
    public void MakeSound() {
        Console.WriteLine("Bark");
    }
}

class Program {
    static void Main() {
        Dog dog = new Dog();
        dog.MakeSound();  // Outputs "Bark"
    }
}
```

### Explanation:

In this example:
- `IAnimal` is an interface with a method `MakeSound`.
- `Dog` implements `IAnimal` by providing an implementation of `MakeSound`.
- The `Program` class creates an instance of `Dog` and calls `MakeSound`.

## 3. Properties in Interfaces

Interfaces can also define properties. Implementing classes must define the getter and/or setter for the properties as specified.

### Example:

```csharp
interface IPerson {
    string Name { get; set; }
}

class Student : IPerson {
    public string Name { get; set; }
}
```

## 4. Multiple Interface Implementation

C# does not support multiple inheritance with classes, but a class can implement multiple interfaces.

### Example:

```csharp
interface IFlyable {
    void Fly();
}

interface IWalkable {
    void Walk();
}

class Bird : IFlyable, IWalkable {
    public void Fly() {
        Console.WriteLine("Flying");
    }

    public void Walk() {
        Console.WriteLine("Walking");
    }
}
```

In this example, `Bird` implements both `IFlyable` and `IWalkable` interfaces, showing how a class can implement multiple interfaces.

## 5. Default Interface Methods (C# 8.0)

In C# 8.0 and later, interfaces can provide default implementations for methods. This feature allows interfaces to have methods with a body, which can be overridden by implementing classes if needed.

### Example:

```csharp
interface ICalculator {
    int Add(int a, int b);
    int Multiply(int a, int b) => a * b; // Default implementation
}

class Calculator : ICalculator {
    public int Add(int a, int b) {
        return a + b;
    }
}
```

## 6. Interface Inheritance

Interfaces can inherit from other interfaces, allowing more complex structures.

### Example:

```csharp
interface IReadable {
    void Read();
}

interface IWritable : IReadable {
    void Write();
}

class File : IWritable {
    public void Read() {
        Console.WriteLine("Reading file");
    }

    public void Write() {
        Console.WriteLine("Writing file");
    }
}
```

In this example, `IWritable` extends `IReadable`, and `File` implements `IWritable`, so it must implement both `Read` and `Write`.

## 7. Explicit Interface Implementation

In cases where a class implements multiple interfaces that contain members with the same name, explicit interface implementation can be used to specify which interface’s method is being implemented.

### Example:

```csharp
interface IA {
    void Display();
}

interface IB {
    void Display();
}

class Test : IA, IB {
    void IA.Display() {
        Console.WriteLine("Display from IA");
    }

    void IB.Display() {
        Console.WriteLine("Display from IB");
    }
}
```

## 8. Conclusion

Interfaces in C# are essential for creating extensible, testable, and flexible code. They provide a contract that ensures consistency across implementing classes, enabling polymorphism and multiple inheritance through interfaces.

---
