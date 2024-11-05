---
id: arrays-in-csharp
sidebar_position: 5
title: "Arrays in C#"
sidebar_label: "Arrays in C#"
---

# Arrays in C#

Arrays in C# are used to store multiple values of the same type in a single variable. They are a fundamental data structure for handling collections of data.

---

## 1. Declaring and Initializing Arrays

In C#, arrays are declared by specifying the type of elements and the square brackets `[]`.

### Syntax:

```csharp
type[] arrayName = new type[size];
```

### Example:

```csharp
int[] numbers = new int[5]; // Array of 5 integers
```

You can also initialize an array with values:

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
```

---

## 2. Accessing Array Elements

Array elements can be accessed by their index, with the first element at index `0`.

### Example:

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[2]); // Outputs 30
```

---

## 3. Modifying Array Elements

You can modify elements by assigning a new value to a specific index.

### Example:

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };
numbers[2] = 100; // Changes the value at index 2 to 100
Console.WriteLine(numbers[2]); // Outputs 100
```

---

## 4. Looping Through Arrays

Arrays can be traversed using loops, such as `for` or `foreach`.

### Using a For Loop

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
for (int i = 0; i < numbers.Length; i++) {
    Console.WriteLine(numbers[i]);
}
```

### Using a Foreach Loop

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
foreach (int num in numbers) {
    Console.WriteLine(num);
}
```

---

## 5. Multi-Dimensional Arrays

C# supports multi-dimensional arrays, like 2D arrays, which can be used for representing data in a grid format.

### Syntax:

```csharp
type[,] arrayName = new type[rows, columns];
```

### Example:

```csharp
int[,] matrix = new int[3, 3]; // 3x3 matrix
matrix[0, 0] = 1; // Assigning value to the first element
```

### Initializing a 2D Array

```csharp
int[,] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
Console.WriteLine(matrix[1, 1]); // Outputs 5
```

---

## 6. Array Class Methods

The `Array` class in C# provides several useful methods for array manipulation.

- `Length`: Returns the number of elements.
- `Sort()`: Sorts the elements in ascending order.
- `Reverse()`: Reverses the order of elements.

### Example:

```csharp
int[] numbers = { 5, 3, 8, 1, 4 };
Array.Sort(numbers); // Sorts the array
Array.Reverse(numbers); // Reverses the array
```

---

## Summary

Arrays in C# are essential for managing collections of data. Understanding how to declare, initialize, and manipulate arrays will help you effectively handle data in your programs.

Happy coding!
