---
id: rust-ownership
title: Rust Ownership
sidebar_position: 4
description: Learn Rust Ownership with simple examples and explanations.
---

# Rust Ownership

Ownership is one of Rust's most important concepts. It is a set of rules that manages how memory is used in a Rust program.

Unlike many programming languages, Rust does not use a garbage collector. Instead, it uses the ownership system to keep memory safe and efficient.

Ownership helps Rust:

- Prevent memory leaks
- Avoid data races
- Improve performance
- Manage memory automatically

---

# Why Ownership Matters

When programs create data, memory is allocated to store that data.

Rust needs a way to know:

- Who owns the data
- When the data should be removed
- How to prevent invalid memory access

Ownership solves these problems safely at compile time.

---

# Ownership Rules

Rust follows three simple ownership rules:

1. Every value has an owner.
2. A value can have only one owner at a time.
3. When the owner goes out of scope, the value is automatically dropped.

---

# Understanding Scope

A scope is the part of the program where a variable is valid.

## Example

```rust
fn main() {
    {
        let language = "Rust";

        println!("{}", language);
    }

    // language is not available here
}
```

The variable exists only inside the curly braces.

Once the scope ends, Rust removes the variable.

---

# String Ownership

The String type stores data on the heap and follows ownership rules.

## Example

```rust
fn main() {
    let language = String::from("Rust");

    println!("{}", language);
}
```

Here, `language` owns the string value.

When `language` goes out of scope, Rust automatically frees the memory.

---

# Ownership Transfer (Move)

Ownership can move from one variable to another.

## Example

```rust
fn main() {
    let first = String::from("Rust");

    let second = first;

    println!("{}", second);
}
```

### Output

```text
Rust
```

Ownership moves from `first` to `second`.

Now `second` becomes the owner.

---

# What Happens After Move?

After ownership moves, the old variable becomes invalid.

## Example

```rust
fn main() {
    let first = String::from("Rust");

    let second = first;

    println!("{}", first);
}
```

### Error

```text
borrow of moved value
```

Rust prevents using `first` because it no longer owns the data.

---

# Visual Representation of Move

Before move:

```text
first ------> "Rust"
```

After move:

```text
second -----> "Rust"
```

The variable `first` no longer has access to the value.

---

# Cloning Data

Sometimes we want two separate copies of the same data.

Use the `clone()` method.

## Example

```rust
fn main() {
    let first = String::from("Rust");

    let second = first.clone();

    println!("{}", first);
    println!("{}", second);
}
```

### Output

```text
Rust
Rust
```

Both variables now own separate copies.

---

# Copy Trait

Some data types are copied automatically instead of moving ownership.

Examples:

- Integers
- Floating point numbers
- Characters
- Booleans

## Example

```rust
fn main() {
    let x = 10;

    let y = x;

    println!("x = {}", x);
    println!("y = {}", y);
}
```

### Output

```text
x = 10
y = 10
```

The value is copied, not moved.

---

# Ownership and Functions

Passing a String to a function transfers ownership.

## Example

```rust
fn print_text(text: String) {
    println!("{}", text);
}

fn main() {
    let message = String::from("Hello Rust");

    print_text(message);
}
```

Ownership moves into the function.

After the function call, `message` is no longer valid.

---

# Function Ownership Error

```rust
fn print_text(text: String) {
    println!("{}", text);
}

fn main() {
    let message = String::from("Hello Rust");

    print_text(message);

    println!("{}", message);
}
```

### Error

```text
borrow of moved value
```

Ownership was transferred to the function.

---

# Returning Ownership from Functions

Functions can return ownership.

## Example

```rust
fn create_text() -> String {
    String::from("Rust Programming")
}

fn main() {
    let text = create_text();

    println!("{}", text);
}
```

### Output

```text
Rust Programming
```

Ownership moves from the function to `text`.

---

# What is Borrowing?

Borrowing allows a function to use data without taking ownership.

Borrowing uses references.

---

# Immutable Borrowing

Immutable borrowing allows reading data.

## Example

```rust
fn display(text: &String) {
    println!("{}", text);
}

fn main() {
    let message = String::from("Rust");

    display(&message);

    println!("{}", message);
}
```

### Output

```text
Rust
Rust
```

Ownership remains with `message`.

---

# Why Borrowing is Useful

Without borrowing:

```rust
fn display(text: String) {
    println!("{}", text);
}
```

Ownership would move.

With borrowing:

```rust
fn display(text: &String) {
    println!("{}", text);
}
```

Ownership stays with the original variable.

---

# Mutable Borrowing

Mutable borrowing allows changing data.

## Example

```rust
fn increase(num: &mut i32) {
    *num += 1;
}

fn main() {
    let mut number = 10;

    increase(&mut number);

    println!("{}", number);
}
```

### Output

```text
11
```

The function modifies the original value.

---

# Dereferencing

When working with mutable references, use `*` to access the actual value.

```rust
*num += 1;
```

This is called dereferencing.

---

# Multiple Immutable References

Rust allows many immutable references.

## Example

```rust
fn main() {
    let text = String::from("Rust");

    let a = &text;
    let b = &text;
    let c = &text;

    println!("{}", a);
    println!("{}", b);
    println!("{}", c);
}
```

### Output

```text
Rust
Rust
Rust
```

Multiple readers are allowed.

---

# Single Mutable Reference

Rust allows only one mutable reference at a time.

## Example

```rust
fn main() {
    let mut text = String::from("Rust");

    let a = &mut text;

    println!("{}", a);
}
```

This is valid.

---

# Mutable and Immutable Conflict

Rust does not allow mutable and immutable references at the same time.

## Example

```rust
fn main() {
    let mut text = String::from("Rust");

    let a = &text;
    let b = &mut text;

    println!("{}", a);
    println!("{}",b);
}
```

### Error

```text
cannot borrow as mutable because it is also borrowed as immutable
```

Rust prevents possible data conflicts.

---

# Dangling References

A dangling reference points to memory that no longer exists.

Rust prevents dangling references completely.

## Invalid Example

```rust
fn get_text() -> &String {
    let text = String::from("Rust");

    &text
}
```

Rust will not compile this code.

---

# Ownership vs Borrowing

| Ownership | Borrowing |
|------------|------------|
| Transfers control | Temporary access |
| Original variable becomes invalid | Original variable remains valid |
| Uses normal variables | Uses references (`&`) |
| Can move data | Does not move data |

---

# Real Life Example

Imagine a book.

```text
Book = Data
Owner = Person holding the book
```

Ownership:

```text
Alice gives book to Bob
```

Now Bob owns the book.

Borrowing:

```text
Alice lets Bob read the book
```

Alice still owns it.

This is exactly how Rust ownership works.

---

# Advantages of Ownership

Ownership provides:

- Memory safety
- Better performance
- No garbage collector
- Prevention of memory leaks
- Prevention of data races
- Automatic cleanup

---

# Common Ownership Mistakes

### Using a variable after move

```rust
let a = String::from("Rust");
let b = a;

println!("{}", a);
```

### Forgetting to use clone()

```rust
let a = String::from("Rust");
let b = a.clone();
```

### Confusing borrowing with ownership

```rust
display(&message);
```

This borrows.

```rust
display(message);
```

This transfers ownership.

---

# Summary

Ownership is Rust's memory management system.

## Important Points

- Every value has an owner
- Only one owner exists at a time
- Ownership can move
- Use `clone()` to create copies
- Borrowing uses references
- `&` creates immutable references
- `&mut` creates mutable references
- Rust prevents dangling references
- Ownership makes Rust memory-safe without a garbage collector

Understanding ownership is the first major step toward mastering Rust programming.