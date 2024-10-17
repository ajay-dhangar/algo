---
id: datatypes-in-java
sidebar_position: 1
title: "Datatypes in Java"
sidebar_label: "Datatypes in Java"
---

Hey there! In this guide, we'll explore the different data types available in Java. Understanding data types is crucial for writing efficient and clear Java code. Let's dive in!

* In Java, variables are containers that hold data and are defined by specifying a type followed by the variable name.
* Variables must be declared before use and can hold various data types.

## 1. Declaring Variables in Java

- To declare a variable in Java, you specify its type, followed by the variable's name.
```java
int age;
double salary;
char grade;
```

## 2. Initializing Variables in Java


*   Variables can be initialized with a value at the time of declaration.

```java
int age = 25;
double salary = 45000.50;
char grade = 'A';
```

## 3. Types of Variables in Java

### a. Integer Variables (`int`, `byte`, `short`, `long`)

*   Holds whole numbers, both positive and negative.

```java
int x = 10; byte y = 20;     // Range: -128 to 127
short z = 30000; // Range: -32,768 to 32,767
long w = 123456789L; // Suffix 'L' for long literals
```

### b. Floating-Point Variables (`float`, `double`)

*   Represents real numbers, with `float` using less precision than `double`.

```java
float pi = 3.14f; // Suffix 'f' for float literals
double gravity = 9.81;
```

### c. Character Variables (`char`)

*   Stores a single character enclosed in single quotes.

```java
char initial = 'A';
```

### d. Boolean Variables (`boolean`)

*   Holds either `true` or `false` values.

```java
boolean isSunny = true;
boolean isRaining = false;
```

### e. String Variables (`String`)

*   Represents a sequence of characters, enclosed in double quotes.

```java
String greeting = "Hello, World!";
```

## 4. Variable Scope

*   The scope of a variable refers to the region of the program where the variable is accessible.
*   **Local Variables:** Declared inside methods or blocks, only accessible within that block.
*   **Global Variables (Instance Variables):** Declared inside a class but outside any method and accessible from any method in the class.

### a. Local Variable Example:

```java
void myMethod() {     
    int localVar = 10;  // Only accessible inside myMethod
}
```

### b. Global Variable Example:

```java
class MyClass {     int globalVar = 20;  // Accessible throughout the MyClass
    void myMethod() {
            globalVar = 30;   // Modifying globalVar
        } }
```

## 5. Constant Variables

*   Variables declared as `final` cannot be modified after initialization.


```java
final int MAX_AGE = 100;
```

## 6. Type Conversion

Java allows conversion between data types either implicitly or explicitly (using type casting).

### a. Implicit Type Conversion

*   Java automatically converts one type to another when necessary.


```java
int x = 10; 
double y = x;  // Implicit conversion from int to double
```

### b. Explicit Type Conversion (Casting)

*   You can explicitly convert a variable's type using type casting.

```java
double pi = 3.14;
int intPi = (int) pi;  // Cast double to int
```

## 7. Dynamic Variables

*   Variables that are allocated memory during runtime using references. Java manages memory allocation and deallocation automatically through garbage collection.


```java
int[] arr = new int[5]; // Dynamically allocate memory for an array of integers
arr[0] = 5;
```