---
id: operators-in-cpp
sidebar_position: 3
title: "Operators in C++"
sidebar_label: "Operators in C++"
---


Hey there! In this guide, we'll explore operators in C++. Operators are symbols that instruct the compiler to perform specific operations on variables or values. C++ supports a variety of operators, including arithmetic, relational, logical, bitwise, and more. Let's dive in!

- Operators are symbols that instruct the compiler to perform specific operations on variables or values.
- C++ supports a variety of operators, including arithmetic, relational, logical, bitwise, and more.

## 1. Arithmetic Operators

Arithmetic operators perform mathematical operations such as addition, subtraction, multiplication, and division.

| Operator | Description         | Example |
| -------- | ------------------- | ------- |
| +        | Addition            | x + y   |
| -        | Subtraction         | x - y   |
| *        | Multiplication      | x * y  |
| /        | Division            | x / y   |
| %        | Modulus (remainder) | x % y   |

#### Example:

```cpp
int x = 10, y = 5;
cout << (x + y);  // Output: 15
cout << (x - y);  // Output: 5
cout << (x * y);  // Output: 50
cout << (x / y);  // Output: 2
cout << (x % y);  // Output: 0
```

## 2. Relational Operators

Relational operators compare two values and return a boolean result (`true` or `false`).

| Operator | Description        | Example |
|----------|--------------------|---------|
| ==       | Equal to           | x == y  |
| !=       | Not equal to       | x != y  |
| \>        | Greater than       | x \> y   |
| \<        | Less than          | x \< y   |
| \>=       | Greater than or equal to | x \>= y |
| \<=       | Less than or equal to    | x \<= y |

#### Example:

```cpp
int x = 10, y = 5;
cout << (x == y);  // Output: false
cout << (x != y);  // Output: true
cout << (x > y);   // Output: true
cout << (x < y);   // Output: false
cout << (x >= y);  // Output: true
cout << (x <= y);  // Output: false
```

## 3. Logical Operators

Logical operators are used to perform logical operations and combine multiple conditions.

| Operator | Description | Example |
|----------|-------------|---------|
| &&       | Logical AND | (x \> 5 && y \< 10) |
| ||       | Logical OR  | (x \> 5 || y \< 10) |
| !        | Logical NOT | !(x \> 5) |

#### Example:

```cpp
int x = 10, y = 5;
cout << (x > 5 && y < 10);  // Output: 1 (true)
cout << (x > 5 || y > 10);  // Output: 1 (true)
cout << !(x > 5);           // Output: 0 (false)
```

## 4. Assignment Operators

Assignment operators are used to assign values to variables.

| Operator | Description         | Example     |
|----------|---------------------|-------------|
| =        | Assigns value       | x = y      |
| +=       | Adds and assigns    | x += y     |
| -=       | Subtracts and assigns| x -= y    |
| *=       | Multiplies and assigns| x *= y    |
| /=       | Divides and assigns  | x /= y    |
| %=       | Modulus and assigns  | x %= y    |

#### Example:

```cpp
int x = 10, y = 5;
x += y;  // Equivalent to x = x + y
cout << x;  // Output: 15
```

## 5. Increment and Decrement Operators

Increment and decrement operators are used to increase or decrease a variable's value by 1.

| Operator | Description    | Example        |
|----------|-----------------|-----------------|
| ++       | Increments value | ++x or x++     |
| --       | Decrements value | --x or x--     |

#### Example:

```cpp
int x = 10;
cout << ++x;  // Output: 11 (Pre-increment)
cout << x--;  // Output: 11 (Post-decrement)
cout << x;    // Output: 10
```

## 6. Bitwise Operators

Bitwise operators operate on bits and perform bit-level operations.

| Operator | Description   | Example     |
|----------|---------------|-------------|
| &        | Bitwise AND   | x & y      |
| |        | Bitwise OR    | x | y      |
| ^        | Bitwise XOR   | x ^ y      |
| ~        | Bitwise NOT   | ~x         |
| \>\>       | Left shift    | x \>\> 2     |
| \<\<       | Right shift   | x \<\< 2     |

#### Example:

```cpp
int x = 10;
int x = 5, y = 9;
cout << (x & y);   // Output: 1
cout << (x | y);   // Output: 13
```

## 7. Ternary Operator

The ternary operator is a shorthand for an if-else statement.

| Operator | Description | Example                   |
|----------|-------------|---------------------------|
| ?:       | Ternary     | condition ? expr1 : expr2 |

#### Example:

```cpp
int x = 10;
int result = (x > 5) ? 100 : 200;
cout << result;  // Output: 100
```

---

Understanding these operators is key to mastering C++ programming and writing efficient code!