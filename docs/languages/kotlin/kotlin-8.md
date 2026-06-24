---
id: kotlin-8
title: Loops
sidebar_label: Loops
sidebar_position: 8
---

# Loops

## `for` Loop

The `for` loop is used to iterate over ranges, arrays, or collections.

### Iterating over a Range

```kotlin
fun main() {
    for (i in 1..5) {
        println(i)
    }
    // Output: 1 2 3 4 5
}
```

### Descending Range with `downTo`

```kotlin
fun main() {
    for (i in 5 downTo 1) {
        println(i)
    }
    // Output: 5 4 3 2 1
}
```

### Step Increment with `step`

```kotlin
fun main() {
    for (i in 0..20 step 5) {
        println(i)
    }
    // Output: 0 5 10 15 20
}
```

### Exclusive Range with `until`

```kotlin
fun main() {
    for (i in 1 until 5) {
        println(i)
    }
    // Output: 1 2 3 4 (excludes 5)
}
```

### Iterating over an Array

```kotlin
fun main() {
    val fruits = arrayOf("Apple", "Banana", "Cherry")

    for (fruit in fruits) {
        println(fruit)
    }
}
```

### Iterating with Index

```kotlin
fun main() {
    val colors = arrayOf("Red", "Green", "Blue")

    for ((index, color) in colors.withIndex()) {
        println("$index: $color")
    }
}
```

## `while` Loop

Repeats as long as the condition is true.

```kotlin
fun main() {
    var count = 1

    while (count <= 5) {
        println("Count: $count")
        count++
    }
}
```

## `do-while` Loop

Executes the block **at least once**, then checks the condition.

```kotlin
fun main() {
    var num = 1

    do {
        println("Number: $num")
        num++
    } while (num <= 5)
}
```

## `break` — Exit a Loop

```kotlin
fun main() {
    for (i in 1..10) {
        if (i == 6) break
        println(i)
    }
    // Output: 1 2 3 4 5
}
```

## `continue` — Skip an Iteration

```kotlin
fun main() {
    for (i in 1..10) {
        if (i % 2 == 0) continue
        println(i)
    }
    // Output: 1 3 5 7 9 (odd numbers only)
}
```

## Labeled Loops

Labels help break or continue outer loops:

```kotlin
fun main() {
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) continue@outer
            println("i=$i, j=$j")
        }
    }
}
```

**Output:**
```
i=1, j=1
i=2, j=1
i=3, j=1
```

## Nested Loops — Multiplication Table

```kotlin
fun main() {
    for (i in 1..5) {
        for (j in 1..5) {
            print("${i * j}\t")
        }
        println()
    }
}
```

## `repeat()` Function

```kotlin
fun main() {
    repeat(5) { index ->
        println("Iteration $index")
    }
}
```

## Iterating Over a String

```kotlin
fun main() {
    val word = "Kotlin"
    for (char in word) {
        print("$char ")
    }
    // Output: K o t l i n
}
```

## Loop Summary

| Loop Type    | When to Use                                      |
|--------------|--------------------------------------------------|
| `for`        | Known number of iterations or iterating a collection |
| `while`      | Repeat while condition is true (check first)     |
| `do-while`   | Execute at least once (check after)              |
| `repeat(n)`  | Run exactly n times with index available         |
| `break`      | Exit loop early                                  |
| `continue`   | Skip current iteration                           |
