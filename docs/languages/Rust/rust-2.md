---
id: variables-in-rust
sidebar_position: 2
title: Variables in Rust
sidebar_label: Variables in Rust
---

# Variables in Rust

Variables are used to store data in memory.

In Rust, variables are immutable by default, which means their values cannot be changed after creation.

## Declaring a Variable

```rust
fn main() {
    let x = 10;
    println!("{}", x);
}
```

## Explanation

- `let` is used to declare a variable.
- `x` is the variable name.
- `10` is the value stored in the variable.
- `println!()` prints the value.

## Immutable Variables

```rust
fn main() {
    let x = 5;
    // x = 6; ❌ Error
}
```

Rust does not allow changing immutable variables.

## Mutable Variables

To make a variable changeable, use `mut`.

```rust
fn main() {
    let mut x = 5;
    x = 10;

    println!("{}", x);
}
```

## Explanation

- `mut` means mutable.
- Mutable variables can change their values.

## Variable Shadowing

Rust allows redeclaring variables using the same name.

```rust
fn main() {
    let x = 5;
    let x = x + 1;

    println!("{}", x);
}
```

## Output

```text
6
```

Shadowing creates a new variable with the same name.
