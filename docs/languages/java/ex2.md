---
id: variables-in-java
sidebar_position: 2
title: Variables in Java
sidebar_label: Variables in Java
---

Hey, everyone! In this guide, we'll explore the concept of variables in Java. Variables are essential in programming, allowing you to store and manipulate data dynamically. Let's dive in!

# 1. What is a Variable?

A **variable** is a container that holds data that can be used and modified throughout a program. Each variable in Java has:
- **Data type**: Defines the type of value it can hold (e.g., `int`, `double`, `char`).
- **Name**: A unique identifier used to refer to it.
- **Value**: The data or information stored in the variable.

### Syntax

```java
dataType variableName = value;
```
### Example

```java
int age = 25;
double salary = 55000.50;
```
In this example:
- age is an int variable holding the value 25.
- salary is a double variable holding the value 55000.50.

# 2. Types of Variables in Java
Java provides different types of variables categorized by scope and purpose:

- Instance Variables
- Class (Static) Variables
- Local Variables

## 2.1. Instance Variables
- Declared inside a class but outside any method or constructor.
- Each object of the class has its own copy of the instance variables.
- Initialized to default values if not explicitly initialized.

### Example
```java
public class Person {
    String name;  // Instance variable
    int age;      // Instance variable

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
In this example:
- name and age are instance variables for each Person object.

## 2.2. Class (Static) Variables
- Declared with the `static` keyword inside a class.
- Shared across all instances of a class, meaning all objects share the same copy.
- Used for memory management or when a variable’s value is supposed to be the same across all instances.

### Example
```java
public class Counter {
    static int count = 0;  // Static variable

    public Counter() {
        count++;
    }
}
```
In this example:
- count is a static variable shared across all Counter objects.

## 2.3. Local Variables
- Declared inside a method or constructor.
- Only accessible within the block or method they are declared in.
- Not given a default value and must be initialized before use.

### Example
```java
public class Calculator {
    public void add() {
        int num1 = 10;  // Local variable
        int num2 = 20;  // Local variable
        int sum = num1 + num2;
        System.out.println("Sum: " + sum);
    }
}
```
In this example:
- num1, num2, and sum are local variables within the add method.

# 3. Variable Declaration and Initialization
Declaring a variable means defining its data type and name. Initializing a variable means assigning it a value.

### Example
```java
int number;      // Declaration
number = 5;      // Initialization

// Declaration and initialization in a single statement
int age = 25;
```

# 4. Data Types in Variables
Each variable in Java has a data type, which defines the type of data it can store.

- **Primitive Data Types** :

| Data Type | Size    | Range                                     | Default Value |
|-----------|---------|-------------------------------------------|---------------|
| `byte`    | 1 byte  | -128 to 127                               | `0`           |
| `short`   | 2 bytes | -32,768 to 32,767                         | `0`           |
| `int`     | 4 bytes | -2^31 to 2^31-1                           | `0`           |
| `long`    | 8 bytes | -2^63 to 2^63-1                           | `0L`          |
| `float`   | 4 bytes | Approximately ±3.40282347E+38F            | `0.0f`        |
| `double`  | 8 bytes | Approximately ±1.79769313486231570E+308   | `0.0d`        |
| `char`    | 2 bytes | 0 to 65,535 (Unicode characters)          | `'\u0000'`    |
| `boolean` | 1 bit   | `true` or `false`                         | `false`       |

## Detailed Explanation of Each Type

- **`byte`**: 
  - Used to save space in large arrays, where memory savings are most needed.
  - Example: `byte b = 100;`

- **`short`**: 
  - Mainly used for compatibility with legacy code that requires data in the range of -32,768 to 32,767.
  - Example: `short s = 1000;`

- **`int`**: 
  - Default data type for integer values.
  - Example: `int i = 100000;`

- **`long`**: 
  - Used when a wider range than `int` is needed.
  - Example: `long l = 100000000L;`

- **`float`**: 
  - Single-precision 32-bit IEEE 754 floating point.
  - Example: `float f = 10.5f;`

- **`double`**: 
  - Double-precision 64-bit IEEE 754 floating point.
  - Example: `double d = 10.5d;`

- **`char`**: 
  - Stores a single 16-bit Unicode character.
  - Example: `char c = 'A';`

- **`boolean`**: 
  - Used for simple flags that track true/false conditions.
  - Example: `boolean flag = true;`

# 5. Constants in Java
A constant is a variable whose value cannot change once it has been assigned. Constants in Java are declared using the final keyword.

### Example
```java
final double PI = 3.14159;
```

# 6. Variable Naming Conventions
Variable names should be descriptive and follow these conventions:
- Names should be meaningful such as age, price, count etc.
- Names can contain letters, digits, underscores, and dollar signs
- Names must begin with a letter
- Names should start with a lowercase letter, and cannot contain whitespace
- Names can also begin with $ and _
- Names are case-sensitive ("myVar" and "myvar" are different variables)
- Reserved words (like Java keywords, such as int or boolean) cannot be used as names

### Example
```java
int studentAge = 20;
double productPrice = 99.99;
```

## Summary
In this tutorial, we have covered the basics of variables in Java, including data types, constants and naming conventions.
With different types of variables and scopes, understanding how to declare, initialize, and use variables effectively is essential for Java programming.

## Code Example
```java
// Create integer variables
int length = 4;
int width = 6;
int area;

// Calculate the area of a rectangle
area = length * width;

// Print variables
System.out.println("Length is: " + length);
System.out.println("Width is: " + width);
System.out.println("Area of the rectangle is: " + area);
```