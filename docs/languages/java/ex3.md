---
id: operators-in-java
sidebar_position: 3
title: Operators in Java
sidebar_label: Operators in Java
---

Hey, everyone! In this guide, we'll explore the concept of **operators in Java**. Operators are fundamental in programming, as they allow you to perform various operations on data, such as arithmetic, comparisons, logical decisions, and more. Java offers a wide range of operators to help you manipulate values and make your code more dynamic and efficient. Let's dive in!

# What are operators?
**Operators** are special symbols or keywords used to perform operations on variables and values. They are a fundamental part of coding, as they allow you to perform computations, make comparisons, and manipulate data. Operators work with operands (the values or variables being operated on) to produce a new result.

# Types of operators
## 1. **Arithmetic Operators**
   - Used to perform basic mathematical operations.
   - Examples:
     - `+` (Addition): `a + b`
     - `-` (Subtraction): `a - b`
     - `*` (Multiplication): `a * b`
     - `/` (Division): `a / b`
     - `%` (Modulus): `a % b` (remainder of division)
### Example
```java
int a = 10;
int b = 3;
System.out.println("Sum: " + (a + b)); // 13
System.out.println("Difference: " + (a - b)); // 7
System.out.println("Product: " + (a * b)); // 30
System.out.println("Quotient: " + (a / b)); // 3
System.out.println("Remainder: " + (a % b)); // 1
```

## 2. **Unary Operators**
   - Operate on a single operand to perform various operations like increment, decrement, negation, etc.
   - Examples:
     - `+` (Unary Plus): `+a`
     - `-` (Unary Minus): `-a`
     - `++` (Increment): `++a` or `a++`
     - `--` (Decrement): `--a` or `a--`
     - `!` (Logical NOT): `!flag`
### Example
```java
int a = 10;
System.out.println("Unary Plus: " + (+a)); // 10
System.out.println("Unary Minus: " + (-a)); // -10
System.out.println("Pre-Increment: " + (++a)); // 11
System.out.println("Post-Increment: " + (a++)); // 11 (before increment)
System.out.println("Value after Post-Increment: " + a); // 12
System.out.println("Pre-Decrement: " + (--a)); // 11
System.out.println("Post-Decrement: " + (a--)); // 11 (before decrement)
System.out.println("Value after Post-Decrement: " + a); // 10
boolean flag = true;
System.out.println("Logical NOT: " + (!flag)); // false
```

## 3. **Assignment Operators**
   - Used to assign values to variables.
   - Examples:
     - `=` (Assign): `a = b`
     - `+=` (Add and Assign): `a += b` (same as `a = a + b`)
     - `-=` (Subtract and Assign): `a -= b`
     - `*=` (Multiply and Assign): `a *= b`
     - `/=` (Divide and Assign): `a /= b`
     - `%=` (Modulus and Assign): `a %= b`
### Example
```java
int b = 3;  // Assign: b = 3
int a = 10; // Assign: a = 10
a += b; // Same as: a = a + b
System.out.println("After += (a += b): a = " + a); // 13
a -= b; // Same as: a = a - b
System.out.println("After -= (a -= b): a = " + a); // 10
a *= b; // Same as: a = a * b
System.out.println("After *= (a *= b): a = " + a); // 30
a /= b; // Same as: a = a / b
System.out.println("After /= (a /= b): a = " + a); //10
a %= b; // Same as: a = a % b
System.out.println("After %= (a %= b): a = " + a); // 1
```

## 4. **Comparison (Relational) Operators**
   - Used to compare two values and return a boolean result (`true` or `false`).
   - Examples:
     - `==` (Equal to): `a == b`
     - `!=` (Not equal to): `a != b`
     - `>` (Greater than): `a > b`
     - `<` (Less than): `a < b`
     - `>=` (Greater than or equal to): `a >= b`
     - `<=` (Less than or equal to): `a <= b`
### Example
```java
int a = 10;
int b = 5;
System.out.println("a == b: " + (a == b)); // Output: false
System.out.println("a != b: " + (a != b)); // Output: true
System.out.println("a > b: " + (a > b));   // Output: true
System.out.println("a < b: " + (a < b));   // Output: false
System.out.println("a >= b: " + (a >= b)); // Output: true
System.out.println("a <= b: " + (a <= b)); // Output: false
```

## 5. **Logical Operators**
   - Used to combine multiple boolean expressions.
   - Examples:
     - `&&` (Logical AND): `a && b` (true if both `a` and `b` are true)
     - `||` (Logical OR): `a || b` (true if either `a` or `b` is true)
     - `!` (Logical NOT): `!a` (true if `a` is false)
### Example
```java
boolean a = true;  // Assign: a = true
boolean b = false; // Assign: b = false
System.out.println("a && b: " + (a && b)); // Output: false (true AND false is false)
System.out.println("a || b: " + (a || b)); // Output: true (true OR false is true)
System.out.println("!a: " + (!a)); // Output: false (NOT true is false)
System.out.println("!b: " + (!b)); // Output: true (NOT false is true)
boolean c = true; // Assign: c = true
System.out.println("a && (b || c): " + (a && (b || c))); // Output: true (true AND (false OR true) is true)
```

## 6. **Bitwise Operators**
   - Operate on individual bits of integer data types and are mainly used for low-level programming.
   - Examples:
     - `&` (Bitwise AND): `a & b`
     - `|` (Bitwise OR): `a | b`
     - `^` (Bitwise XOR): `a ^ b`
     - `~` (Bitwise NOT): `~a`
     - `<<` (Left Shift): `a << 2`
     - `>>` (Right Shift): `a >> 2`
     - `>>>` (Unsigned Right Shift): `a >>> 2`
### Example
```java
int a = 5;  // Binary: 0101
int b = 3;  // Binary: 0011
System.out.println("a & b: " + (a & b)); // Output: 1 (Binary: 0001)
System.out.println("a | b: " + (a | b)); // Output: 7 (Binary: 0111)
System.out.println("a ^ b: " + (a ^ b)); // Output: 6 (Binary: 0110)
System.out.println("~a: " + (~a));       // Output: -6 (Binary: 1010, in two's complement)
System.out.println("a << 2: " + (a << 2)); // Output: 20 (Binary: 10100)
System.out.println("a >> 2: " + (a >> 2)); // Output: 1 (Binary: 0001)
int c = -5; // Binary (two's complement): 11111111 11111111 11111111 11111011
System.out.println("c >>> 2: " + (c >>> 2)); // Output: 1073741822 (Binary: 00111111 11111111 11111111 11111110)

```

## 7. **Ternary Operator**
   - A shorthand for simple `if-else` conditions.
   - Syntax: `condition ? value_if_true : value_if_false`
   - Example: `int result = (a > b) ? a : b;`
### Example
```java
int a = 10;
int b = 15;
int max = (a > b) ? a : b;
System.out.println("The maximum value is: " + max);
```

## 8. **Instanceof Operator**
   - Used to test whether an object is an instance of a particular class or subclass.
   - Example: `if (obj instanceof String)`
### Example
```java
Object obj1 = "Hello, World!";
Object obj2 = 25;
if (obj1 instanceof String) {
    System.out.println("obj1 is an instance of String");
} else {
    System.out.println("obj1 is not an instance of String");
}
if (obj2 instanceof Integer) {
    System.out.println("obj2 is an instance of Integer");
} else {
    System.out.println("obj2 is not an instance of Integer");
}
```

# Operator Precedence and Associativity

In Java, when multiple operators are used in a single expression, Java needs to know the order in which to evaluate them. This is where **operator precedence** and **associativity** come into play.

- **Precedence** determines the order of operations, with higher precedence operators evaluated before lower precedence ones.
- **Associativity** defines the order of evaluation when operators of the same precedence appear in an expression. It can be **left-to-right** or **right-to-left**.

For example:
```java
int result = 10 + 5 * 2; // Output: 20
```
Here, the multiplication operator * has a higher precedence than the addition operator +, so 5 * 2 is evaluated first, resulting in 10 + 10 = 20.

## Operator Precedence and Associativity Table

Here's a table showing the precedence of common operators in Java. Operators with higher precedence appear at the top of the table.

| Precedence Level | Operator Type             | Operators                                  | Associativity  |
|------------------|---------------------------|--------------------------------------------|----------------|
| 1                | Postfix                   | `expr++`, `expr--`                         | Left-to-right |
| 2                | Unary                     | `++expr`, `--expr`, `+`, `-`, `~`, `!`     | Right-to-left |
| 3                | Multiplicative            | `*`, `/`, `%`                              | Left-to-right |
| 4                | Additive                  | `+`, `-`                                   | Left-to-right |
| 5                | Shift                     | `<<`, `>>`, `>>>`                          | Left-to-right |
| 6                | Relational and Comparison | `<`, `>`, `<=`, `>=`, `instanceof`         | Left-to-right |
| 7                | Equality                  | `==`, `!=`                                 | Left-to-right |
| 8                | Bitwise AND               | `&`                                        | Left-to-right |
| 9                | Bitwise XOR               | `^`                                        | Left-to-right |
| 10               | Bitwise OR                | `|`                                        | Left-to-right |
| 11               | Logical AND               | `&&`                                       | Left-to-right |
| 12               | Logical OR                | `||`                                       | Left-to-right |
| 13               | Ternary                   | `? :`                                      | Right-to-left |
| 14               | Assignment                | `=`, `+=`, `-=`, `*=`, `/=`, `%=` etc.     | Right-to-left |

## Examples of Operator Precedence and Associativity

Consider the following examples to understand how precedence and associativity affect the evaluation of expressions:

### Using Multiplication and Addition

```java
int result = 10 + 5 * 2; // Output: 20
```
Here, * has higher precedence than +, so 5 * 2 is evaluated first, followed by 10 + 10.

### Using Multiple Operators of same precedence

```java
int result = 10 - 3 + 2; // Output: 9
```
Here,- and + have the same precedence and are left-associative, so 10 - 3 is evaluated first, followed by 7 + 2.

### Using Parentheses to Alter Precedence

```java
int result = (10 + 5) * 2; // Output: 30
```
Here, Parentheses have the highest precedence, so 10 + 5 is evaluated first, resulting in 15 * 2 = 30.

### Assignment Operators with Right Associativity
```java
int a, b, c;
a = b = c = 10;
System.out.println(a); // Output: 10
System.out.println(b); // Output: 10
System.out.println(c); // Output: 10
```
here, = is right-associative, so c = 10 is evaluated first, then b = 10, and finally a = 10.

Understanding operator precedence and associativity helps in writing clear and correct expressions in Java. When in doubt, use parentheses to explicitly specify the desired order of operations!