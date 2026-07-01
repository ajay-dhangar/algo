---
id: error-handling-in-go
sidebar_position: 9
title: "Error Handling in Go"
sidebar_label: "Error Handling"
description: "Discover how Go handles errors explicitly without using try-catch blocks."
tags: ["go","golang","errors","error handling"]
---

# Error Handling in Go

Hey there! In this guide, we'll explore **Error Handling** in Go. Unlike many other languages that use `try/catch` exceptions, Go treats errors as just another type of return value. Let's dive in!

## Video Explanation

<LiteYouTubeEmbed
  id="CxcxRgwWtAk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Handling errors LIKE a 10x ENGINEER in Golang - Golang Service Pattern"
  lazyLoad={true}
  webp
/>

## 1. The `error` Type

In Go, errors are represented using the built-in `error` interface. It is defined very simply:

```go
type error interface {
    Error() string
}
```

Any type that implements the `Error() string` method is considered an error in Go.

## 2. Returning and Checking Errors

Because Go supports multiple return values, it is idiomatic for functions that can fail to return the result as the first value, and an `error` as the second value.

If the operation is successful, the `error` will be `nil`.

```go
package main

import (
    "errors"
    "fmt"
)

// A function that can return an error
func divide(a, b float64) (float64, error) {
    if b == 0 {
        // Create a new error
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil // Return nil for error on success
}

func main() {
    result, err := divide(10, 0)
    
    // Explicitly check if an error occurred
    if err != nil {
        fmt.Println("Error:", err)
        return // Stop execution if we hit an error
    }
    
    fmt.Println("Result:", result)
}
```

This `if err != nil` pattern is extremely common in Go and forces developers to explicitly think about and handle failure states.

## 3. Formatting Errors

The `fmt` package provides a handy function called `fmt.Errorf` which allows you to format error messages easily, similar to `fmt.Printf`.

```go
func processUser(id int) error {
    if id < 0 {
        return fmt.Errorf("invalid user id: %d", id)
    }
    return nil
}
```

## 4. Custom Errors

Because `error` is just an interface, you can easily create custom error types that carry more context (like error codes or timestamps).

```go
type NetworkError struct {
    Code int
    Msg  string
}

// Implement the error interface
func (e *NetworkError) Error() string {
    return fmt.Sprintf("Network Error %d: %s", e.Code, e.Msg)
}

func fetch() error {
    return &NetworkError{Code: 404, Msg: "Not Found"}
}
```

## 5. Panic and Recover

Go *does* have a mechanism similar to exceptions, called `panic`. However, panics are meant only for **unrecoverable, catastrophic errors** (like out-of-bounds array access or nil pointer dereference).

```go
func main() {
    panic("Something went terribly wrong!") 
    // The program will crash here and print a stack trace.
}
```

You can catch a panic using `recover()` inside a deferred function, but this is rarely used in typical application code compared to returning `error` values.

## 6. Best Practices

- **Don't ignore errors:** Never assign an error to the blank identifier `_` unless you are absolutely 100% sure the function can never fail.
- **Add context to errors:** When returning an error up the call stack, add context using `fmt.Errorf("failed to load config: %w", err)`. The `%w` verb wraps the original error.
- **Reserve panics for true bugs:** Do not use `panic` for expected error conditions like bad user input or missing files. Use standard `error` return values for that.
