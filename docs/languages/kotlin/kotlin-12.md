---
id: kotlin-12
title: Collections
sidebar_label: Collections
sidebar_position: 12
---

# Collections

## Overview

Kotlin collections come in two flavors:

| Type       | Immutable       | Mutable              |
|------------|-----------------|----------------------|
| List       | `listOf()`      | `mutableListOf()`    |
| Set        | `setOf()`       | `mutableSetOf()`     |
| Map        | `mapOf()`       | `mutableMapOf()`     |

---

## List

### Immutable List

```kotlin
fun main() {
    val fruits = listOf("Apple", "Banana", "Cherry")

    println(fruits[0])          // Apple
    println(fruits.size)        // 3
    println(fruits.contains("Banana"))   // true
    println(fruits.indexOf("Cherry"))    // 2

    for (fruit in fruits) println(fruit)
}
```

### Mutable List

```kotlin
fun main() {
    val names = mutableListOf("Alice", "Bob")

    names.add("Charlie")
    names.add(0, "Zara")         // Insert at index 0
    names.remove("Bob")
    names.removeAt(1)            // Remove by index

    println(names)
}
```

### List Operations

```kotlin
fun main() {
    val numbers = listOf(3, 1, 4, 1, 5, 9, 2, 6)

    println(numbers.sorted())               // [1, 1, 2, 3, 4, 5, 6, 9]
    println(numbers.sortedDescending())     // [9, 6, 5, 4, 3, 2, 1, 1]
    println(numbers.filter { it > 4 })      // [5, 9, 6]
    println(numbers.map { it * 2 })         // [6, 2, 8, ...]
    println(numbers.sum())                  // 31
    println(numbers.average())              // 3.875
    println(numbers.distinct())             // [3, 1, 4, 5, 9, 2, 6]
    println(numbers.take(3))               // [3, 1, 4]
    println(numbers.drop(5))               // [9, 2, 6]
    println(numbers.reversed())            // [6, 2, 9, 5, 1, 4, 1, 3]
}
```

---

## Set

A Set contains **unique elements only**.

```kotlin
fun main() {
    val set = setOf(1, 2, 3, 2, 1)
    println(set)   // [1, 2, 3] — duplicates removed

    val mutableSet = mutableSetOf("Apple", "Banana")
    mutableSet.add("Cherry")
    mutableSet.add("Apple")   // Duplicate — ignored

    println(mutableSet)   // [Apple, Banana, Cherry]
}
```

### Set Operations

```kotlin
fun main() {
    val a = setOf(1, 2, 3, 4)
    val b = setOf(3, 4, 5, 6)

    println(a union b)        // [1, 2, 3, 4, 5, 6]
    println(a intersect b)    // [3, 4]
    println(a subtract b)     // [1, 2]
}
```

---

## Map

A Map stores **key-value pairs**.

### Immutable Map

```kotlin
fun main() {
    val capitals = mapOf(
        "India"  to "New Delhi",
        "France" to "Paris",
        "Japan"  to "Tokyo"
    )

    println(capitals["India"])              // New Delhi
    println(capitals.getOrDefault("USA", "Unknown"))  // Unknown
    println(capitals.containsKey("Japan")) // true
    println(capitals.containsValue("Paris"))  // true
    println(capitals.size)                 // 3
}
```

### Mutable Map

```kotlin
fun main() {
    val scores = mutableMapOf("Alice" to 90, "Bob" to 85)

    scores["Charlie"] = 92       // Add entry
    scores["Alice"] = 95         // Update entry
    scores.remove("Bob")         // Remove entry

    println(scores)
}
```

### Iterating a Map

```kotlin
fun main() {
    val map = mapOf("a" to 1, "b" to 2, "c" to 3)

    for ((key, value) in map) {
        println("$key -> $value")
    }

    map.forEach { key, value ->
        println("$key = $value")
    }

    println(map.keys)    // [a, b, c]
    println(map.values)  // [1, 2, 3]
}
```

---

## Collection Transformation Functions

```kotlin
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    // filter — keep matching elements
    val evens = numbers.filter { it % 2 == 0 }

    // map — transform each element
    val squared = numbers.map { it * it }

    // reduce — combine all elements into one
    val product = numbers.reduce { acc, n -> acc * n }

    // fold — like reduce but with initial value
    val sumWith100 = numbers.fold(100) { acc, n -> acc + n }

    // any/all/none
    println(numbers.any { it > 9 })   // true
    println(numbers.all { it > 0 })   // true
    println(numbers.none { it > 10 }) // true

    // groupBy
    val grouped = numbers.groupBy { if (it % 2 == 0) "Even" else "Odd" }
    println(grouped)
    // {Odd=[1, 3, 5, 7, 9], Even=[2, 4, 6, 8, 10]}

    // partition
    val (odds, evensList) = numbers.partition { it % 2 != 0 }
    println(odds)      // [1, 3, 5, 7, 9]
    println(evensList) // [2, 4, 6, 8, 10]
}
```

## Summary

| Collection | Unique? | Ordered? | Key-Value? |
|------------|---------|----------|------------|
| List       | No      | Yes      | No         |
| Set        | Yes     | No       | No         |
| Map        | Keys unique | No   | Yes        |
