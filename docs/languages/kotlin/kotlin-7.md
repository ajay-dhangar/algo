---
id: kotlin-7
title: Conditionals
sidebar_label: Conditionals
sidebar_position: 7
---

# Conditionals

## `if` Statement

The basic `if` statement executes a block of code when the condition is true.

```kotlin
fun main() {
    val temperature = 35

    if (temperature > 30) {
        println("It's hot outside!")
    }
}
```

## `if-else` Statement

```kotlin
fun main() {
    val age = 17

    if (age >= 18) {
        println("You are an adult.")
    } else {
        println("You are a minor.")
    }
}
```

## `if-else if-else` Chain

```kotlin
fun main() {
    val marks = 72

    if (marks >= 90) {
        println("Grade: A")
    } else if (marks >= 80) {
        println("Grade: B")
    } else if (marks >= 70) {
        println("Grade: C")
    } else if (marks >= 60) {
        println("Grade: D")
    } else {
        println("Grade: F")
    }
}
```

## `if` as an Expression

In Kotlin, `if` can be used as an expression (returns a value):

```kotlin
fun main() {
    val a = 10
    val b = 20

    val max = if (a > b) a else b
    println("Maximum: $max")  // Maximum: 20
}
```

```kotlin
fun main() {
    val score = 85
    val grade = if (score >= 90) "A"
                else if (score >= 80) "B"
                else if (score >= 70) "C"
                else "F"
    println("Grade: $grade")
}
```

## `when` Statement

`when` is Kotlin's powerful alternative to `switch`:

```kotlin
fun main() {
    val day = 3

    when (day) {
        1 -> println("Monday")
        2 -> println("Tuesday")
        3 -> println("Wednesday")
        4 -> println("Thursday")
        5 -> println("Friday")
        6 -> println("Saturday")
        7 -> println("Sunday")
        else -> println("Invalid day")
    }
}
```

## `when` with Multiple Values per Branch

```kotlin
fun main() {
    val day = 6

    when (day) {
        1, 2, 3, 4, 5 -> println("Weekday")
        6, 7          -> println("Weekend")
        else          -> println("Invalid")
    }
}
```

## `when` with Ranges

```kotlin
fun main() {
    val score = 78

    when (score) {
        in 90..100 -> println("Grade A")
        in 80..89  -> println("Grade B")
        in 70..79  -> println("Grade C")
        in 60..69  -> println("Grade D")
        else       -> println("Grade F")
    }
}
```

## `when` as an Expression

```kotlin
fun main() {
    val x = 5
    val result = when {
        x < 0  -> "Negative"
        x == 0 -> "Zero"
        x > 0  -> "Positive"
        else   -> "Unknown"
    }
    println(result)  // Positive
}
```

## `when` with Type Checking

```kotlin
fun describe(obj: Any): String {
    return when (obj) {
        is Int     -> "Integer: $obj"
        is String  -> "String of length ${obj.length}"
        is Boolean -> "Boolean: $obj"
        is Double  -> "Double: $obj"
        else       -> "Unknown type"
    }
}

fun main() {
    println(describe(42))
    println(describe("Hello"))
    println(describe(true))
    println(describe(3.14))
}
```

## Nested `if` Statements

```kotlin
fun main() {
    val age = 20
    val hasLicense = true

    if (age >= 18) {
        if (hasLicense) {
            println("You can drive!")
        } else {
            println("You need a license.")
        }
    } else {
        println("You're too young to drive.")
    }
}
```

## Summary

| Construct      | Use Case                                |
|----------------|-----------------------------------------|
| `if`           | Simple condition check                  |
| `if-else`      | Two-way branching                       |
| `if-else if`   | Multi-way branching                     |
| `if` expression| Assign result based on condition        |
| `when`         | Match against values, ranges, or types  |
| `when` expression | Assign result from matched branch    |
