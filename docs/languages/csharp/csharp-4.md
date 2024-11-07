---
id: loops-in-csharp
sidebar_position: 4
title: "Loops in C#"
sidebar_label: "Loops in C#"
---

# Loops in C#

Loops in C# allow you to execute a block of code repeatedly based on specific conditions.

---

## 1. For Loop

The `for` loop is commonly used when the number of iterations is known.

### Syntax:

```csharp
for (initialization; condition; increment/decrement) {
    // code to be executed
}
```

### Example:

```csharp
for (int i = 0; i < 5; i++) {
    Console.WriteLine("Iteration " + i);
}
```

---

## 2. While Loop

The `while` loop executes a block of code as long as the specified condition is true.

### Syntax:

```csharp
while (condition) {
    // code to be executed
}
```

### Example:

```csharp
int i = 0;
while (i < 5) {
    Console.WriteLine("Iteration " + i);
    i++;
}
```

---

## 3. Do-While Loop

The `do-while` loop is similar to the `while` loop but guarantees the code block will execute at least once.

### Syntax:

```csharp
do {
    // code to be executed
} while (condition);
```

### Example:

```csharp
int i = 0;
do {
    Console.WriteLine("Iteration " + i);
    i++;
} while (i < 5);
```

---

## 4. Foreach Loop

The `foreach` loop is used to iterate over collections, such as arrays or lists.

### Syntax:

```csharp
foreach (type variable in collection) {
    // code to be executed
}
```

### Example:

```csharp
int[] numbers = {1, 2, 3, 4, 5};
foreach (int num in numbers) {
    Console.WriteLine("Number: " + num);
}
```

---

## 5. Break and Continue Statements

### a. Break Statement

The `break` statement exits a loop prematurely.

#### Example:

```csharp
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exit the loop when i equals 5
    }
    Console.WriteLine("Iteration " + i);
}
```

### b. Continue Statement

The `continue` statement skips the current iteration and proceeds to the next one.

#### Example:

```csharp
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue; // Skip the iteration when i equals 2
    }
    Console.WriteLine("Iteration " + i);
}
```

---

## Summary

Loops are essential in C# for repeating tasks and iterating over data structures efficiently. Understanding these loops and how to control them with `break` and `continue` will help you write more effective code.

Happy coding!
