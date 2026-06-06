# What is Borrowing?

Borrowing allows a function to use a value without taking ownership.

Instead of transferring ownership, Rust creates a reference to the value.

## Example

```rust
fn display(text: &String) {
    println!("{}", text);
}

fn main() {
    let message = String::from("Hello Rust");

    display(&message);

    println!("{}", message);
}
```

### Output

```text
Hello Rust
Hello Rust
```

The function borrows the value, so ownership remains with `message`.