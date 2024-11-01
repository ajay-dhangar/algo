---
id: functions-in-csharp
sidebar_position: 3
title: "Functions in C#"
sidebar_label: "Functions in C#"
---

# Functions in C#

Functions, also known as methods, in C# are blocks of code that perform a specific task. They help modularize code and promote reusability.

---

## 1. Structure of a Function

The basic structure of a function in C# includes an access modifier, return type, name, parameters (optional), and a body.

```csharp
[access_modifier] return_type FunctionName([parameters]) {
    // Function body
}
```

### Example:

```csharp
public int Add(int a, int b) {
    return a + b;
}
```

---

## 2. Access Modifiers

C# functions use access modifiers to control their visibility and accessibility:

- **public**: Accessible from any class.
- **private**: Accessible only within the containing class.
- **protected**: Accessible within the containing class and derived classes.
- **internal**: Accessible within the same assembly.
- **protected internal**: Accessible within the same assembly or derived classes.

---

## 3. Return Types

A function in C# can have any data type as its return type or be `void` if it returns no value.

### Example:

```csharp
public int Multiply(int x, int y) {
    return x * y; // returns an integer
}

public void DisplayMessage() {
    Console.WriteLine("Hello, World!"); // returns no value
}
```

---

## 4. Parameters and Arguments

Functions can take parameters as input. Parameters are defined in the function signature, and arguments are the actual values passed.

### Example:

```csharp
public int Subtract(int a, int b) {
    return a - b;
}

// Usage
int result = Subtract(10, 5); // Passes 10 and 5 as arguments
```

---

## 5. Method Overloading

Method overloading allows multiple methods to have the same name but different parameters.

### Example:

```csharp
public int Add(int a, int b) {
    return a + b;
}

public double Add(double a, double b) {
    return a + b;
}
```

---

## 6. Static Methods

Static methods belong to the class rather than an instance and can be called directly using the class name.

### Example:

```csharp
public static void PrintMessage() {
    Console.WriteLine("This is a static method.");
}

// Usage
ClassName.PrintMessage();
```

---

## 7. Recursive Functions

A recursive function is one that calls itself until a base condition is met.

### Example:

```csharp
public int Factorial(int n) {
    if (n <= 1) return 1;
    return n * Factorial(n - 1);
}
```

---

## 8. Lambda Expressions

Lambda expressions provide a concise syntax to define anonymous functions.

### Example:

```csharp
Func<int, int> square = x => x * x;
Console.WriteLine(square(5)); // Outputs: 25
```

---

## 9. Async Functions

Async functions allow asynchronous programming, making use of the `async` and `await` keywords.

### Example:

```csharp
public async Task<string> GetDataAsync() {
    await Task.Delay(1000); // Simulates asynchronous operation
    return "Data loaded";
}
```

---

## Summary

Functions are essential in C# for creating reusable, organized, and maintainable code. Understanding the types, access modifiers, and usage of functions will enhance your programming capabilities.

Happy coding!
