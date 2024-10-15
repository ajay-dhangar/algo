---
id: operators-in-java
sidebar_position: 2
title: "Operators in Java"
sidebar_label: "Operators in Java"
---

Hey there! In this guide, we'll explore operators in Java. Operators are symbols that instruct the compiler to perform specific operations on variables or values. Java supports a variety of operators, including arithmetic, relational, logical, bitwise, and more. Let's dive in!

- Operators are symbols that instruct the compiler to perform specific operations on variables or values.
- Java supports a variety of operators, including arithmetic, relational, logical, bitwise, and more.

## 1. Arithmetic Operators

Arithmetic operators perform mathematical operations such as addition, subtraction, multiplication, and division.

| Operator | Description         | Example |
| -------- | ------------------- | ------- |
| +        | Addition            | x + y   |
| -        | Subtraction         | x - y   |
| *        | Multiplication      | x * y   |
| /        | Division            | x / y   |
| %        | Modulus (remainder) | x % y   |

#### Example:

```java
int x = 10, y = 5;
System.out.println(x + y);  // Output: 15
System.out.println(x - y);  // Output: 5
System.out.println(x * y);  // Output: 50
System.out.println(x / y);  // Output: 2
System.out.println(x % y);  // Output: 0
```

## 2. Relational Operators


Relational operators compare two values and return a boolean result (`true` or `false`).

| Operator | Description | Example |
| --- | --- | --- |
| \== | Equal to | x == y |
| != | Not equal to | x != y |
| > | Greater than | x > y |
| \< | Less than | x \< y |
| >= | Greater than or equal to | x >= y |
| \<= | Less than or equal to | x \<= y |

#### Example:

```java
int x = 10, y = 5; System.out.println(x == y);  // Output: false
System.out.println(x != y);  // Output: true
System.out.println(x > y);   // Output: true
System.out.println(x < y);   // Output: false
System.out.println(x >= y);  // Output: true
System.out.println(x <= y);  // Output: false
```

## 3. Logical Operators

Logical operators are used to perform logical operations and combine multiple conditions.

| Operator | Description | Example |
| --- | --- | --- |
| && | Logical AND | (x > 5 && y \< 10) |
| \|\| | Logical OR  | (x > 5 \|\| y \< 10) |
| ! | Logical NOT | !(x > 5) |

#### Example:
```java
int x = 10, y = 5; System.out.println(x > 5 && y < 10);  // Output: true
System.out.println(x > 5 || y > 10);  // Output: true
System.out.println(!(x > 5));  // Output: false
```

## 4. Assignment Operators
Assignment operators are used to assign values to variables.

| Operator | Description | Example |
| --- | --- | --- |
| \= | Assigns value | x = y |
| += | Adds and assigns | x += y |
| -= | Subtracts and assigns | x -= y |
| *= | Multiplies and assigns | x *= y |
| /= | Divides and assigns | x /= y |
| %= | Modulus and assigns | x %= y |

#### Example:

```java
int x = 10, y = 5; x += y;  // Equivalent to x = x + y
System.out.println(x);  // Output: 15
```

## 5. Increment and Decrement Operators


Increment and decrement operators are used to increase or decrease a variable's value by 1.

| Operator | Description | Example |
| --- | --- | --- |
| ++ | Increments value | ++x or x++ |
| -- | Decrements value | --x or x-- |

#### Example:

```java
int x = 10; System.out.println(++x);  // Output: 11 (Pre-increment)
System.out.println(x--);  // Output: 11 (Post-decrement)
System.out.println(x);    // Output: 10
```

## 6. Bitwise Operators

Bitwise operators operate on bits and perform bit-level operations.

| Operator | Description | Example |
| --- | --- | --- |
| & | Bitwise AND | x & y |
|  \|  | Bitwise OR | \| |
| ^ | Bitwise XOR | x ^ y |
| ~ | Bitwise NOT | ~x |
| >> | Right shift | x >> 2 |
| \<\< | Left shift | x \<\< 2 |

#### Example:

```java
int x = 10, y = 5; System.out.println(x & y);   // Output: 0
System.out.println(x | y);   // Output: 15
```

## 7. Ternary Operator


The ternary operator is a shorthand for an if-else statement.

| Operator | Description | Example |
| --- | --- | --- |
| ?: | Ternary | condition ? expr1 : expr2 |

#### Example:
```java
int x = 10; int result = (x > 5) ? 100 : 200;
System.out.println(result);  // Output: 100
```