---
id: kotlin-18
title: Exception Handling
sidebar_label: Exception Handling
sidebar_position: 18
---

# Exception Handling

## What are Exceptions?

Exceptions are runtime errors that disrupt the normal flow of a program. Kotlin provides structured exception handling using `try`, `catch`, `finally`, and `throw`.

## Basic `try-catch`

```kotlin
fun main() {
    try {
        val result = 10 / 0
        println(result)
    } catch (e: ArithmeticException) {
        println("Error: ${e.message}")
    }
}
// Output: Error: / by zero
```

## `try-catch-finally`

`finally` always runs, regardless of whether an exception occurred:

```kotlin
fun main() {
    try {
        val nums = arrayOf(1, 2, 3)
        println(nums[10])  // Index out of bounds
    } catch (e: ArrayIndexOutOfBoundsException) {
        println("Caught: ${e.message}")
    } finally {
        println("This always executes")
    }
}
```

## Multiple Catch Blocks

```kotlin
fun parseInput(input: String) {
    try {
        val num = input.toInt()
        println(100 / num)
    } catch (e: NumberFormatException) {
        println("Not a number: $input")
    } catch (e: ArithmeticException) {
        println("Cannot divide by zero")
    } catch (e: Exception) {
        println("Unknown error: ${e.message}")
    }
}

fun main() {
    parseInput("abc")  // Not a number: abc
    parseInput("0")    // Cannot divide by zero
    parseInput("5")    // 20
}
```

## `try` as an Expression

```kotlin
fun toInt(str: String): Int {
    return try {
        str.toInt()
    } catch (e: NumberFormatException) {
        -1  // Default value on error
    }
}

fun main() {
    println(toInt("42"))    // 42
    println(toInt("abc"))   // -1
}
```

## Throwing Exceptions

```kotlin
fun divide(a: Int, b: Int): Int {
    if (b == 0) throw ArithmeticException("Divisor cannot be zero")
    return a / b
}

fun main() {
    try {
        println(divide(10, 2))   // 5
        println(divide(10, 0))   // Throws exception
    } catch (e: ArithmeticException) {
        println("Error: ${e.message}")
    }
}
```

## Custom Exceptions

```kotlin
class InsufficientFundsException(amount: Double) :
    Exception("Insufficient funds: need $$amount more")

class BankAccount(private var balance: Double) {
    fun withdraw(amount: Double) {
        if (amount > balance) {
            throw InsufficientFundsException(amount - balance)
        }
        balance -= amount
        println("Withdrew $$amount. Balance: $$balance")
    }
}

fun main() {
    val account = BankAccount(1000.0)
    try {
        account.withdraw(500.0)   // OK
        account.withdraw(600.0)   // Throws
    } catch (e: InsufficientFundsException) {
        println(e.message)
    }
}
```

## `require`, `check`, `error`

Kotlin provides built-in functions for pre/post-condition checks:

```kotlin
fun setAge(age: Int) {
    require(age >= 0) { "Age must be non-negative, got $age" }
    require(age <= 150) { "Age seems unrealistic: $age" }
    println("Age set to $age")
}

fun getUser(id: Int): String? {
    val user = if (id == 1) "Alice" else null
    checkNotNull(user) { "User with id=$id not found" }
    return user
}

fun notImplemented(): Nothing = error("Feature not implemented yet")

fun main() {
    setAge(25)
    // setAge(-5)  // Throws IllegalArgumentException

    try {
        getUser(99)  // Throws IllegalStateException
    } catch (e: IllegalStateException) {
        println(e.message)
    }
}
```

## Exception Hierarchy

```
Throwable
├── Error (JVM-level, not usually caught)
└── Exception
    ├── RuntimeException
    │   ├── NullPointerException
    │   ├── ArithmeticException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── NumberFormatException
    │   ├── ClassCastException
    │   └── IllegalArgumentException
    │       └── IllegalStateException
    └── IOException
        └── FileNotFoundException
```

## Catching Multiple Exception Types

```kotlin
fun riskyOp(input: String) {
    try {
        val n = input.toInt()
        println(10 / n)
    } catch (e: NumberFormatException) {
        println("Not a number")
    } catch (e: ArithmeticException) {
        println("Division by zero")
    }
}
```

## Summary

| Construct             | Purpose                                   |
|-----------------------|-------------------------------------------|
| `try { }`             | Wrap risky code                           |
| `catch (e: Type) { }` | Handle specific exception                 |
| `finally { }`         | Always runs (cleanup code)                |
| `throw Exception()`   | Manually throw an exception               |
| `require(condition)`  | Validate function arguments               |
| `check(condition)`    | Validate object/program state             |
| `error("message")`    | Throw `IllegalStateException`             |
| Custom exception      | Extend `Exception` class                  |
