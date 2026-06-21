---
id: rust-datatypes
title: Rust Data Types
sidebar_position: 1
description: Learn about different data types in Rust with examples.
sidebar_label: Rust Data Types
tags:
  - programming
  - dsa
  - rust
  - rust data types
---

# Rust Data Types

Data types define the kind of value a variable can store.

Rust is a statically typed language, which means the compiler knows the type of every variable at compile time.

```rust
let age = 20;
let price = 99.99;
let is_active = true;
```

Rust mainly provides two categories of data types:

1. Scalar Data Types
2. Compound Data Types

---

# 1. Scalar Data Types

Scalar data types store a single value.

Rust provides four main scalar types:

- Integer
- Floating Point
- Boolean
- Character

---

# Integer Types

Integer types are used to store whole numbers.

Rust supports both signed and unsigned integers.

- Signed integers can store positive and negative values.
- Unsigned integers store only positive values.

| Type | Size | Example |
|------|------|------|
| i8 | 8-bit | -10 |
| u8 | 8-bit | 10 |
| i16 | 16-bit | -200 |
| u16 | 16-bit | 200 |
| i32 | 32-bit | -500 |
| u32 | 32-bit | 500 |
| i64 | 64-bit | -9000 |
| u64 | 64-bit | 9000 |
| i128 | 128-bit | -100000 |
| u128 | 128-bit | 100000 |
| isize | arch-dependent | -1 |
| usize | arch-dependent | 1 |

`i32` is the default integer type in Rust.

## Example

```rust
fn main() {
    let age: u8 = 20;
    let temperature: i32 = -15;

    println!("Age: {}", age);
    println!("Temperature: {}", temperature);
}
```

### Output

```text
Age: 20
Temperature: -15
```

---

# Floating Point Types

Floating point types are used to store decimal values.

Rust provides two floating point types:

| Type | Size | Example |
|------|------|------|
| f32 | 32-bit | 3.14 |
| f64 | 64-bit | 99.99 |

`f64` is the default floating point type.

## Example

```rust
fn main() {
    let pi: f32 = 3.14;
    let price: f64 = 99.99;

    println!("Pi: {}", pi);
    println!("Price: {}", price);
}
```

### Output

```text
Pi: 3.14
Price: 99.99
```

---

# Boolean Type

Boolean type stores only two values:

- `true`
- `false`

Booleans are mostly used in conditions and decision making.

## Example

```rust
fn main() {
    let is_rust_easy: bool = true;
    let is_sky_green: bool = false;

    println!("{}", is_rust_easy);
    println!("{}", is_sky_green);
}
```

### Output

```text
true
false
```

---

# Character Type

The `char` type stores a single character.

Character values are written inside single quotes.

## Example

```rust
fn main() {
    let grade: char = 'A';
    let symbol: char = '#';

    println!("{}", grade);
    println!("{}", symbol);
}
```

### Output

```text
A
#
```

---

# 2. Compound Data Types

Compound data types can store multiple values together.

Rust mainly provides:

- Tuples
- Arrays

---

# Tuples

A tuple can store multiple values of different data types.

Tuple values are written inside parentheses.

## Example

```rust
fn main() {
    let student = ("Hemlata", 21, 8.5);

    println!("Name: {}", student.0);
    println!("Age: {}", student.1);
    println!("CGPA: {}", student.2);
}
```

### Output

```text
Name: Hemlata
Age: 21
CGPA: 8.5
```

## Tuple Destructuring

Rust allows unpacking tuple values into variables.

```rust
fn main() {
    let person = ("Alice", 25);

    let (name, age) = person;

    println!("Name: {}", name);
    println!("Age: {}", age);
}
```

---

# Arrays

Arrays store multiple values of the same data type.

Arrays in Rust have fixed size.

## Syntax

```rust
let numbers = [10, 20, 30, 40];
```

## Example

```rust
fn main() {
    let numbers = [10, 20, 30, 40, 50];

    println!("First Element: {}", numbers[0]);
    println!("Second Element: {}", numbers[1]);
}
```

### Output

```text
First Element: 10
Second Element: 20
```

## Array with Data Type

```rust
fn main() {
    let marks: [i32; 5] = [90, 85, 88, 92, 95];

    // Use the debug formatter {:?} to print the array
    println!("{:?}", marks);
}
```

---

# String Slice (`&str`)

String slices are immutable string references.

They are usually used for fixed text.

## Example

```rust
fn main() {
    let language: &str = "Rust";

    println!("{}", language);
}
```

### Output

```text
Rust
```

---

# String

`String` is a growable and mutable string type.

## Example

```rust
fn main() {
    let mut name = String::from("Rust");

    name.push_str(" Language");

    println!("{}", name);
}
```

### Output

```text
Rust Language
```

---

# Type Inference

Rust can automatically detect the data type of variables.

This feature is called type inference.

## Example

```rust
fn main() {
    let number = 100;
    let pi = 3.14;
    let status = true;

    println!("{}", number);
    println!("{}", pi);
    println!("{}", status);
}
```

In this example:

- `number` becomes `i32`
- `pi` becomes `f64`
- `status` becomes `bool`

---

# Type Casting

Rust does not automatically convert one data type into another.

We use the `as` keyword for type conversion.

## Example

```rust
fn main() {
    let num1: i32 = 10;
    let num2: f64 = num1 as f64;

    println!("{}", num1);
    println!("{}", num2);
}
```

### Output

```text
10
10
```

---

# Constants in Rust

Constants are values that cannot be changed during program execution.

Constants are declared using the `const` keyword.

## Example

```rust
const PI: f64 = 3.14159;

fn main() {
    println!("{}", PI);
}
```

---

# Mutability in Rust

Variables are immutable by default in Rust.

Use the `mut` keyword to make variables mutable.

## Example

```rust
fn main() {
    let mut score = 50;

    score = 80;

    println!("{}", score);
}
```

### Output

```text
80
```

---

# Summary

Rust provides different data types to store different kinds of values safely and efficiently.

## Scalar Data Types

- Integer
- Floating Point
- Boolean
- Character

## Compound Data Types

- Tuples
- Arrays

Rust also supports:

- Strings
- Type Inference
- Type Casting
- Constants
- Mutable Variables

These features make Rust powerful, safe, and fast for system programming and application development.
