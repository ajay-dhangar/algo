---
id: goroutines-and-concurrency-in-go
sidebar_position: 7
title: "Goroutines & Concurrency in Go"
sidebar_label: "Concurrency"
---

# Goroutines and Concurrency in Go

Hey there! In this guide, we'll explore **Concurrency** in Go. Concurrency is one of Go's killer features. Go makes it incredibly easy to run multiple tasks at the same time using **Goroutines**. Let's dive in!

## 1. What is Concurrency?

Concurrency is the ability of a program to break a task down into smaller, independent parts that can be executed out of order or in partial order without affecting the final outcome. This allows programs to utilize multiple CPU cores efficiently.

## 2. What is a Goroutine?

A goroutine is a lightweight thread managed by the Go runtime. They are extremely cheap to create; you can easily have thousands or even millions of goroutines running in a single Go program without exhausting your system's memory.

### Starting a Goroutine

To start a new goroutine, you simply put the `go` keyword in front of a function call.

```go
package main

import (
    "fmt"
    "time"
)

func sayHello() {
    fmt.Println("Hello!")
}

func main() {
    go sayHello() // Starts sayHello in a new goroutine
    fmt.Println("Main function executing")
    
    // Wait for a moment to let the goroutine finish
    // (We will learn a better way to do this shortly!)
    time.Sleep(1 * time.Second) 
}
```

When you run `go sayHello()`, the `sayHello` function executes concurrently with the rest of the `main` function. 
*Note: If the `main` function finishes executing, the program exits immediately, taking all running goroutines down with it!*

## 3. Synchronizing Goroutines (WaitGroups)

Using `time.Sleep` to wait for a goroutine to finish is a bad practice because you never know exactly how long a task will take. 
The standard way to wait for a group of goroutines to finish is using `sync.WaitGroup`.

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // Signal that this goroutine is done when the function exits

    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second) // Simulate expensive work
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup

    // Launch 3 workers
    for i := 1; i <= 3; i++ {
        wg.Add(1) // Increment the wait group counter
        go worker(i, &wg)
    }

    wg.Wait() // Block until the counter goes back to 0
    fmt.Println("All workers finished.")
}
```

### How WaitGroup Works:
- `wg.Add(1)`: Adds 1 to the counter of tasks to wait for.
- `wg.Done()`: Decrements the counter by 1. (`defer wg.Done()` ensures it's called even if the function panics).
- `wg.Wait()`: Pauses the execution of the `main` function until the counter reaches exactly 0.

## 4. Race Conditions

When multiple goroutines try to access and modify the same variable at the same time, you get a **Race Condition**. This leads to unpredictable and incorrect behavior.

```go
// BAD EXAMPLE
var counter int

func increment() {
    counter++ // Unsafe if accessed concurrently!
}
```

To prevent this, you should either use a **Mutex** (from the `sync` package) to lock the variable, or (better yet) use **Channels** to share data safely between goroutines. We will cover Channels in the next tutorial!

## 5. Best Practices

- **Don't use `time.Sleep` to wait for goroutines:** Always use `sync.WaitGroup` or Channels.
- **Run the Go Race Detector:** When testing concurrent code, run your program with `go run -race main.go`. This built-in tool will automatically detect and warn you about race conditions!
