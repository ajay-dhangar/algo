---
id: variables-in-csharp  
sidebar_position: 2  
title: "Variables in C#"  
sidebar_label: "Variables in C#"  
---

In C#, variables are used to store data that can be referenced and manipulated within a program. Understanding how to declare and use variables is fundamental to programming in C#. This guide covers the basics of variables, including types, naming conventions, and examples.

## 1. What is a Variable?

A variable is a named memory location used to store a value. In C#, variables have a specific type, which determines what kind of data they can hold, such as integers, floating-point numbers, or strings.

## 2. Declaring Variables in C#

To declare a variable in C#, you need to specify the data type followed by the variable name. Here’s the basic syntax:

```csharp
dataType variableName = initialValue;
```

### Example:

```csharp
int age = 25; // Declares an integer variable named 'age' and assigns it the value 25
string name = "Alice"; // Declares a string variable named 'name' and assigns it "Alice"
```

## 3. Data Types in C#

C# provides various data types that determine the kind of values variables can store. Here are some commonly used data types:

- **int**: Stores whole numbers (e.g., `int count = 10;`)
- **float**: Stores single-precision floating-point numbers (e.g., `float temperature = 23.5f;`)
- **double**: Stores double-precision floating-point numbers (e.g., `double distance = 123.45;`)
- **char**: Stores a single character (e.g., `char grade = 'A';`)
- **string**: Stores a sequence of characters (e.g., `string message = "Hello";`)
- **bool**: Stores true or false values (e.g., `bool isActive = true;`)

## 4. Naming Conventions

In C#, variable names should be meaningful, describing the purpose of the variable. Here are some naming conventions:

- **Camel Case**: Commonly used for local variables (e.g., `userName`, `totalScore`).
- **Avoid Reserved Keywords**: Variable names cannot be C# reserved keywords like `class`, `void`, or `int`.
- **No Special Characters**: Variable names cannot contain special characters except underscores (_).

## 5. Example of Using Variables in C#

Here’s a sample code that demonstrates declaring and using different types of variables:

```csharp
using System;

class Program {
    static void Main() {
        int age = 30;
        string name = "John";
        bool isStudent = true;
        double height = 5.9;

        Console.WriteLine("Name: " + name);
        Console.WriteLine("Age: " + age);
        Console.WriteLine("Is Student: " + isStudent);
        Console.WriteLine("Height: " + height);
    }
}
```

### Explanation

- `int age = 30;`: Declares an integer variable named `age` with the value 30.
- `string name = "John";`: Declares a string variable `name` with the value "John".
- `bool isStudent = true;`: Declares a boolean variable `isStudent` with the value `true`.
- `double height = 5.9;`: Declares a double variable `height` with the value 5.9.

## 6. Conclusion

Understanding variables and data types is crucial for effective programming in C#. By learning to declare and use variables properly, you can control data in your applications and perform various operations on it.

---
