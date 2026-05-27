---
id: functions-in-go
sidebar_position: 3
title: "Functions in Go"
sidebar_label: "Functions"
---

Hey there! In this guide, we'll explore **Functions** in Go. Functions are the building blocks of Go programs. They allow you to encapsulate a piece of code so it can be reused throughout your application. Let's dive in!

## 1. What is a Function?

A function is a block of code that takes some inputs (parameters), performs a specific task, and optionally returns a result. In Go, functions are defined using the `func` keyword.

## 2. Basic Function Syntax

Here is how you declare a basic function in Go. The type of the parameter comes *after* the variable name.

```go
package main

import "fmt"

// Function that takes no parameters and returns nothing
func sayHello() {
    fmt.Println("Hello, World!")
}

// Function that takes one parameter
func greet(name string) {
    fmt.Println("Hello", name)
}

func main() {
    sayHello()
    greet("Alice")
}
```

## 3. Functions with Return Values

If a function produces a result, you must specify the return type after the parameter list.

```go
// Function that takes two ints and returns an int
func add(x int, y int) int {
    return x + y
}

func main() {
    sum := add(5, 10)
    fmt.Println("Sum:", sum)
}
```

*Tip: When multiple consecutive parameters share the same type, you can omit the type from all but the last one!*
```go
func add(x, y int) int {
    return x + y
}
```

## 4. Multiple Return Values

One of Go's most powerful and distinctive features is that functions can return **multiple values**. This is heavily used for returning a result along with an error.

```go
func swap(x, y string) (string, string) {
    return y, x
}

func main() {
    a, b := swap("hello", "world")
    fmt.Println(a, b) // Output: world hello
}
```

## 5. Named Return Values

Go allows you to name the return values in the function signature. If you do this, they act as variables initialized to their zero values. A `return` statement without arguments returns the current values of the named return variables. This is known as a "naked" return.

```go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // Automatically returns x and y
}
```
*Note: Naked returns should only be used in short functions, as they can harm readability in longer functions.*

## 6. Variadic Functions

A variadic function is a function that can take an arbitrary number of arguments of a specific type. You define it using an ellipsis `...` before the type.

```go
// This function can take any number of ints
func sumAll(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

func main() {
    fmt.Println(sumAll(1, 2, 3))       // Output: 6
    fmt.Println(sumAll(10, 20, 30, 40)) // Output: 100
}
```

## 7. Best Practices

- **Keep functions small and focused:** A function should ideally do one thing and do it well.
- **Use multiple returns for errors:** It is highly idiomatic in Go to return `(result, error)`. You will see this everywhere in Go codebases.
- **Name parameters descriptively:** Go favors short, concise variable names, but ensure the parameters clearly indicate what the function expects.
