---
id: kotlin-9
title: Functions
sidebar_label: Functions
sidebar_position: 9
---

# Functions

## Defining a Function

```kotlin
fun functionName(parameter: Type): ReturnType {
    // body
    return value
}
```

## Basic Function

```kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}

fun main() {
    println(greet("Kotlin"))  // Hello, Kotlin!
}
```

## Function with No Return Value

Use `Unit` (or omit the return type) for functions that return nothing:

```kotlin
fun printMessage(message: String) {
    println(message)
}

fun main() {
    printMessage("Welcome!")
}
```

## Single-Expression Functions

```kotlin
fun square(n: Int): Int = n * n
fun add(a: Int, b: Int) = a + b

fun main() {
    println(square(5))     // 25
    println(add(3, 4))     // 7
}
```

## Default Parameters

```kotlin
fun greet(name: String = "World", greeting: String = "Hello") {
    println("$greeting, $name!")
}

fun main() {
    greet()                        // Hello, World!
    greet("Kotlin")                // Hello, Kotlin!
    greet("Alice", "Hi")           // Hi, Alice!
}
```

## Named Arguments

```kotlin
fun createProfile(name: String, age: Int, city: String) {
    println("$name | $age | $city")
}

fun main() {
    createProfile(city = "Delhi", name = "Raj", age = 28)
}
```

## Vararg — Variable Number of Arguments

```kotlin
fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}

fun main() {
    println(sum(1, 2, 3))         // 6
    println(sum(10, 20, 30, 40))  // 100
}
```

## Lambda Functions

```kotlin
val multiply = { a: Int, b: Int -> a * b }

fun main() {
    println(multiply(4, 5))   // 20
}
```

## Higher-Order Functions

Functions that accept other functions as parameters:

```kotlin
fun operate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

fun main() {
    val result = operate(10, 5) { x, y -> x + y }
    println(result)  // 15

    val product = operate(10, 5, { x, y -> x * y })
    println(product) // 50
}
```

## Returning Functions

```kotlin
fun multiplier(factor: Int): (Int) -> Int {
    return { number -> number * factor }
}

fun main() {
    val double = multiplier(2)
    val triple = multiplier(3)

    println(double(5))  // 10
    println(triple(5))  // 15
}
```

## Extension Functions

Add new functions to existing classes without modifying them:

```kotlin
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

fun Int.isEven(): Boolean = this % 2 == 0

fun main() {
    println("madam".isPalindrome())  // true
    println("hello".isPalindrome())  // false
    println(4.isEven())              // true
    println(7.isEven())              // false
}
```

## Inline Functions

Used with higher-order functions to reduce overhead:

```kotlin
inline fun runWithLog(action: () -> Unit) {
    println("Starting...")
    action()
    println("Done.")
}

fun main() {
    runWithLog {
        println("Working...")
    }
}
```

## Recursive Functions

```kotlin
fun factorial(n: Int): Long {
    return if (n <= 1) 1L else n * factorial(n - 1)
}

fun main() {
    println(factorial(5))   // 120
    println(factorial(10))  // 3628800
}
```

## Tail Recursive Functions

```kotlin
tailrec fun fibonacci(n: Int, a: Long = 0, b: Long = 1): Long {
    return if (n == 0) a else fibonacci(n - 1, b, a + b)
}

fun main() {
    println(fibonacci(10))  // 55
}
```

## Function Summary

| Type                | Description                                   |
|---------------------|-----------------------------------------------|
| Regular function    | Standard named function                       |
| Single-expression   | One-liner using `=`                            |
| Default parameters  | Parameters with default values                |
| Named arguments     | Call with parameter names                     |
| Vararg              | Accept variable number of arguments           |
| Lambda              | Anonymous function                            |
| Higher-order        | Accepts or returns functions                  |
| Extension           | Adds methods to existing types                |
| Recursive           | Calls itself                                  |
| Tail recursive      | Optimized recursion with `tailrec`            |
