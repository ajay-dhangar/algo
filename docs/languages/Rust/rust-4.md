---
id: rust-operators
title: Rust Operators
sidebar_position: 2
description: Learn different operators in Rust with examples.
---

# Rust Operators

Operators are symbols used to perform operations on variables and values.

Rust provides different types of operators such as:

1. Arithmetic Operators
2. Assignment Operators
3. Comparison Operators
4. Logical Operators
5. Bitwise Operators

## Video Explanation

<LiteYouTubeEmbed
  id="3wrUIVO9jyM"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Operators | Learn Rust part 11"
  lazyLoad={true}
  webp
/>

---

# 1. Arithmetic Operators

Arithmetic operators are used to perform mathematical calculations.

| Operator | Description | Example |
|------|------|------|
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - b` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / b` |
| `%` | Modulus | `a % b` |

## Example

```rust
fn main() {
    let a = 10;
    let b = 3;

    println!("Addition: {}", a + b);
    println!("Subtraction: {}", a - b);
    println!("Multiplication: {}", a * b);
    println!("Division: {}", a / b);
    println!("Modulus: {}", a % b);
}
```

### Output

```text
Addition: 13
Subtraction: 7
Multiplication: 30
Division: 3
Modulus: 1
```

---

# 2. Assignment Operators

Assignment operators are used to assign values to variables.

| Operator | Example | Meaning |
|------|------|------|
| `=` | `x = 5` | Assign value |
| `+=` | `x += 2` | Add and assign |
| `-=` | `x -= 2` | Subtract and assign |
| `*=` | `x *= 2` | Multiply and assign |
| `/=` | `x /= 2` | Divide and assign |

## Example

```rust
fn main() {
    let mut x = 10;

    x += 5;
    println!("x = {}", x);

    x -= 2;
    println!("x = {}", x);

    x *= 3;
    println!("x = {}", x);
}
```

### Output

```text
x = 15
x = 13
x = 39
```

---

# 3. Comparison Operators

Comparison operators compare two values and return `true` or `false`.

| Operator | Description |
|------|------|
| `==` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

## Example

```rust
fn main() {
    let a = 10;
    let b = 20;

    println!("{}", a == b);
    println!("{}", a != b);
    println!("{}", a < b);
    println!("{}", a > b);
}
```

### Output

```text
false
true
true
false
```

---

# 4. Logical Operators

Logical operators are used to combine conditions.

| Operator | Description |
|------|------|
| `&&` | Logical AND |
| `||` | Logical OR |
| `!` | Logical NOT |

## Example

```rust
fn main() {
    let age = 20;
    let has_id = true;

    println!("{}", age >= 18 && has_id);
    println!("{}", age < 18 || has_id);
    println!("{}", !has_id);
}
```

### Output

```text
true
true
false
```

---

# 5. Bitwise Operators

Bitwise operators work on binary values.

| Operator | Description |
|------|------|
| `&` | Bitwise AND |
| `|` | Bitwise OR |
| `^` | Bitwise XOR |
| `<<` | Left Shift |
| `>>` | Right Shift |
| `!` | Bitwise NOT |

## Example

```rust
fn main() {
    let a = 5;
    let b = 3;

    println!("AND: {}", a & b);
    println!("OR: {}", a | b);
    println!("XOR: {}", a ^ b);
}
```

### Output

```text
AND: 1
OR: 7
XOR: 6
```

---

# Unary Operators

Unary operators work with a single operand.

## Example

```rust
fn main() {
    let number = 10;

    println!("{}", -number);

    let status = true;

    println!("{}", !status);
}
```

### Output

```text
-10
false
```

---

# Operator Precedence

Operator precedence determines the order in which operations are performed.

## Example

```rust
fn main() {
    let result = 10 + 5 * 2;

    println!("{}", result);
}
```

### Output

```text
20
```

In this example:

- Multiplication happens first
- Addition happens later

---

# Short-Circuit Operators

Rust uses short-circuit evaluation with logical operators.

## Example

```rust
fn main() {
    let a = true;
    let b = false;

    println!("{}", a && b);
    println!("{}", a || b);
}
```

### Output

```text
false
true
```

---

# Summary

Rust operators are used to perform operations on variables and values.

## Types of Operators in Rust

- Arithmetic Operators
- Assignment Operators
- Comparison Operators
- Logical Operators
- Bitwise Operators
- Unary Operators

Operators make it easy to perform calculations, comparisons, and logical operations in Rust programs.