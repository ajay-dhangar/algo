---
id: variables-in-go
sidebar_position: 2
title: "Variables and Data Types in Go"
sidebar_label: "Variables and Data Types"
description: "Learn about declaring variables and using fundamental data types in Go."
tags: ["go","golang","variables","data types"]
---

# Variables and Data Types

Hey there! In this guide, we'll explore the concepts of variables and data types in Go. Variables are essential in programming, allowing you to store and manipulate data dynamically. Let's dive in!

## Video Explanation

<LiteYouTubeEmbed
  id="pM0-CMysa_M"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Golang Tutorial #2 - Variables & Data Types"
  lazyLoad={true}
  webp
/>

## 1. Introduction to Variables

In Go, variables are explicitly declared and used by the compiler to e.g. check type-correctness of function calls. Go is statically typed, meaning once a variable is declared with a specific type, it cannot change to hold another type.

## 2. Variable Declaration

You can declare a variable using the `var` keyword, followed by the variable name and its type.

```go
var name string = "Alice"
var age int = 25
var isStudent bool = true
```

### Zero Values
If you declare a variable without giving it an initial value, Go automatically assigns it a **zero value**.
- `0` for numeric types
- `false` for booleans
- `""` (empty string) for strings

```go
var count int // count is automatically 0
```

## 3. Short Variable Declarations

Inside a function, you can use the `:=` short assignment statement in place of a `var` declaration with implicit type. This is the most common way to declare variables in Go!

```go
func main() {
    name := "Bob"     // Go infers this is a string
    age := 30         // Go infers this is an int
    height := 5.9     // Go infers this is a float64

    fmt.Println(name, age, height)
}
```
*Note: Short declarations (`:=`) can only be used inside functions.*

## 4. Basic Data Types

Go supports several basic data types:

### a. Integers (`int`, `int8`, `int16`, `int32`, `int64`)
Used to store whole numbers. If you just use `int`, the size (32 or 64 bits) depends on your operating system.
```go
var x int = 100
var y int = -50
```

### b. Floating-Point Numbers (`float32`, `float64`)
Used to store numbers with decimals. `float64` is the default and preferred for its precision.
```go
var pi float64 = 3.14159
```

### c. Booleans (`bool`)
Holds either `true` or `false`.
```go
var isActive bool = true
```

### d. Strings (`string`)
A sequence of characters enclosed in double quotes.
```go
var greeting string = "Hello, Go!"
```

## 5. Multiple Variable Assignment

You can declare and assign multiple variables at once in Go, making your code cleaner.

```go
var a, b, c int = 1, 2, 3
var x, y = 10, "hello" // Mix types with var declaration
```

## 6. Constants

If you have a value that should never change throughout your program, you declare it as a constant using the `const` keyword. Constants cannot be declared using the `:=` syntax.

```go
const PI = 3.14
const Greeting = "Welcome"
// PI = 3.15 // This would cause a compilation error!
```

## 7. Type Conversion

Go requires explicit type conversion if you want to assign a value of one type to a variable of another. There is no implicit type conversion in Go.

```go
var i int = 42
var f float64 = float64(i) // Explicitly cast int to float64
```

## 8. Best Practices

- **Use `:=` inside functions:** It's cleaner and highly idiomatic.
- **Use `var` for package-level variables** or when you need to declare a variable without explicitly initializing it.
- **Use descriptive names:** Stick to camelCase (`myVariable`) for local variables.
- Go compiler is strict: **If you declare a variable, you MUST use it.** Otherwise, your program will not compile. This keeps the code clean and free of dead variables!
