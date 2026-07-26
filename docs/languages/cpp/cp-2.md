---
id: operators-in-cpp
sidebar_position: 3
title: "Operators in C++"
sidebar_label: "Operators"
tags: ["cpp", "operators", "expressions"]
description: "A comprehensive guide to C++ operators, including arithmetic, relational, logical, bitwise, assignment, and ternary operators, along with precedence rules."
keywords: ["C++ operators", "arithmetic operators", "bitwise operations", "operator precedence", "ternary operator"]
---

An **operator** is a symbol that tells the compiler to perform specific mathematical, relational, or logical manipulations on values or variables. The data values that operators act upon are called **operands**.

C++ provides a rich set of built-in operators classified by their functionality and the number of operands they require (unary, binary, or ternary).

## Video Explanation

<LiteYouTubeEmbed
  id="JBgZxnAj4hg"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="3.3 Operators in C++ Programming | Guaranteed Placement Course | 3.3"
  lazyLoad={true}
  webp
/>

## 1. Arithmetic Operators

Arithmetic operators execute standard mathematical operations. These require numerical operands.

| Operator | Operation | Mathematical Description | Example (`x=10`, `y=3`) | Result |
| :--- | :--- | :--- | :--- | :--- |
| `+` | Addition | Sum of two values | `x + y` | `13` |
| `-` | Subtraction | Difference between two values | `x - y` | `7` |
| `*` | Multiplication | Product of two values | `x * y` | `30` |
| `/` | Division | Quotient of division | `x / y` | `3` (Integer truncation) |
| `%` | Modulus | Remainder of an integer division | `x % y` | `1` |

:::warning Note on Division
When both operands are integers (`int`), the `/` operator performs **integer division**, discarding any fractional remainder. To get a decimal result, at least one operand must be a floating-point type (e.g., `10.0 / 3`).
:::

```cpp title="ArithmeticOperators.cpp"
#include <iostream>

int main() {
    int x = 10, y = 5;
    std::cout << (x + y) << "\n";  // Output: 15
    std::cout << (x / y) << "\n";  // Output: 2
    std::cout << (x % y) << "\n";  // Output: 0
    return 0;
}

```

## 2. Relational Operators

Relational operators compare two values to determine their relationship. They always evaluate to a boolean state: `true` (`1`) or `false` (`0`).

| Operator | Description | Condition for `true` | Example (`x=10`, `y=5`) | Result |
| --- | --- | --- | --- | --- |
| `==` | Equal to | Left operand equals right operand | `x == y` | `false` |
| `!=` | Not equal to | Left operand does not equal right operand | `x != y` | `true` |
| `>` | Greater than | Left operand is strictly larger than right | `x > y` | `true` |
| `<` | Less than | Left operand is strictly smaller than right | `x < y` | `false` |
| `>=` | Greater than or equal to | Left operand is larger or equal to right | `x >= y` | `true` |
| `<=` | Less than or equal to | Left operand is smaller or equal to right | `x <= y` | `false` |

```cpp title="RelationalOperators.cpp"
#include <iostream>

int main() {
    int x = 10, y = 5;
    std::cout << (x > y) << "\n";   // Output: 1 (true)
    std::cout << (x == y) << "\n";  // Output: 0 (false)
    std::cout << (x <= y) << "\n";  // Output: 0 (false)
    return 0;
}

```

## 3. Logical Operators

Logical operators are used to connect or invert expressions containing relational or boolean states.

| Operator | Operation | Behavior | Example (`x=10`, `y=5`) | Result |
| --- | --- | --- | --- | --- |
| `&&` | Logical AND | Returns `true` only if **both** expressions are true. | `(x > 5 && y < 10)` | `true` |
| `||` | Logical OR | Returns `true` if **at least one** expression is true. | `(x > 15 || y == 5)` | `true` |
| `!` | Logical NOT | Inverts the boolean value of the expression. | `!(x > 5)` | `false` |

:::tip Short-Circuit Evaluation
C++ optimizes logical evaluations. For `&&`, if the left side is `false`, the right side is never evaluated because the entire statement cannot be true. For `||`, if the left side is `true`, the right side is skipped.
:::

```cpp title="LogicalOperators.cpp"
#include <iostream>

int main() {
    int x = 10, y = 5;
    std::cout << (x > 5 && y < 10) << "\n"; // Output: 1 (true)
    std::cout << (x > 15 || y == 5) << "\n"; // Output: 1 (true)
    std::cout << !(x > 5) << "\n";            // Output: 0 (false)
    return 0;
}

```

## 4. Assignment Operators

Assignment operators evaluate the expression on the right side and store the resulting value into the memory variable specified on the left side.

| Operator | Syntax | Equivalent Expression |
| --- | --- | --- |
| `=` | `x = y` | `x = y` |
| `+=` | `x += y` | `x = x + y` |
| `-=` | `x -= y` | `x = x - y` |
| `*=` | `x *= y` | `x = x * y` |
| `/=` | `x /= y` | `x = x / y` |
| `%=` | `x %= y` | `x = x % y` |

```cpp title="AssignmentOperators.cpp"
#include <iostream>

int main() {
    int x = 10;
    x += 5; // x is now 15
    x *= 2; // x is now 30
    std::cout << x << "\n"; // Output: 30
    return 0;
}

```

## 5. Increment and Decrement Operators

These unary operators modify a single numerical variable's value by exactly `1`. They come in two distinct behaviors: **Prefix** and **Postfix**.

| Operator | Syntax | Name | Behavior |
| --- | --- | --- | --- |
| `++` | `++x` | Prefix Increment | Increments `x` first, then returns the updated value. |
| `++` | `x++` | Postfix Increment | Returns the current value of `x` first, then increments `x`. |
| `--` | `--x` | Prefix Decrement | Decrements `x` first, then returns the updated value. |
| `--` | `x--` | Postfix Decrement | Returns the current value of `x` first, then decrements `x`. |

```cpp title="IncrementDecrementOperators.cpp"
int x = 10;
std::cout << ++x;  // Increments x to 11, prints 11
std::cout << x++;  // Prints current value (11), then increments x to 12
std::cout << x;    // Prints current value (12)

```

## 6. Bitwise Operators

Bitwise operators manipulate the raw binary bits within integer data types directly.

| Operator | Name | Bitwise Operation |
| --- | --- | --- |
| `&` | Bitwise AND | Results in `1` if both corresponding bits are `1`. |
| `|` | Bitwise OR | Results in `1` if at least one corresponding bit is `1`. |
| `^` | Bitwise XOR | Results in `1` if the corresponding bits are different. |
| `~` | Bitwise NOT | Flips all bits (1 becomes 0, 0 becomes 1). |
| `<<` | Left Shift | Shifts bits left, filling empty spaces on the right with zeros. |
| `>>` | Right Shift | Shifts bits right, moving bits down in value. |

```cpp title="BitwiseOperators.cpp"
#include <iostream>
// Example using 4-bit representation for simplicity:
int a = 5; // Binary: 0101
int b = 9; // Binary: 1001

std::cout << (a & b); // Binary: 0001 -> Output: 1
std::cout << (a | b); // Binary: 1101 -> Output: 13
std::cout << (a ^ b); // Binary: 1100 -> Output: 12
std::cout << (~a);    // Binary: 1010 -> Output: -6 (two's complement)
std::cout << (a << 1); // Binary: 1010 -> Output: 10
std::cout << (a >> 1); // Binary: 0010 -> Output: 2
```

---

## 7. Ternary Conditional Operator (`?:`)

The ternary operator is the only operator in C++ that acts on three operands. It serves as a clean, inline alternative to simple `if-else` blocks.

### Syntax

```cpp title="TernaryOperatorSyntax.cpp"
condition ? expression_if_true : expression_if_false;

```

### Example

```cpp title="TernaryOperatorExample.cpp"
int testScore = 85;
std::string classification = (testScore >= 50) ? "Pass" : "Fail";
std::cout << classification; // Output: Pass

```

## 8. Operator Precedence and Associativity

When evaluating a complex expression like `int result = 5 + 3 * 2;`, C++ relies on predefined rules to determine which operator executes first.

1. **Precedence:** Dictates the execution priority of different operators. For example, multiplication (`*`) has a higher priority rank than addition (`+`). Therefore, `3 * 2` is processed first.
2. **Associativity:** Dictates the processing direction (Left-to-Right or Right-to-Left) when two operators with the exact same precedence rank appear adjacent to each other.

> **Best Practice:** When in doubt about operator precedence rules, wrap your planned execution segments in **parentheses `()**`. Parentheses hold the absolute highest priority rank in C++ and make code significantly easier to read.

```cpp title="OperatorPrecedence.cpp"
int evaluationA = 10 + 5 * 2;   // Evaluates to 20 (Multiplication occurs first)
int evaluationB = (10 + 5) * 2; // Evaluates to 30 (Parentheses override standard precedence)

```

## Conclusion

Mastering C++ operators is essential for writing efficient and effective code. Understanding how to use them correctly allows you to perform complex calculations, make decisions, and manipulate data with precision. Always remember to consider operator precedence and associativity to ensure your expressions evaluate as intended.