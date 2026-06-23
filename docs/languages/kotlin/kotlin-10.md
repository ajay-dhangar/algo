---
id: kotlin-10
title: Arrays
sidebar_label: Arrays
sidebar_position: 10
---

# Arrays

## Creating Arrays

### Using `arrayOf()`

```kotlin
fun main() {
    val fruits = arrayOf("Apple", "Banana", "Cherry")
    val numbers = arrayOf(1, 2, 3, 4, 5)
    val mixed = arrayOf(1, "Hello", true, 3.14)

    println(fruits[0])    // Apple
    println(numbers[2])   // 3
}
```

### Using Typed Array Functions

```kotlin
val intArray    = intArrayOf(1, 2, 3, 4, 5)
val doubleArray = doubleArrayOf(1.1, 2.2, 3.3)
val charArray   = charArrayOf('a', 'b', 'c')
val boolArray   = booleanArrayOf(true, false, true)
```

### Using `Array()` Constructor

```kotlin
val squares = Array(5) { i -> i * i }
// [0, 1, 4, 9, 16]

val zeros = Array(5) { 0 }
// [0, 0, 0, 0, 0]
```

## Accessing and Modifying Elements

```kotlin
fun main() {
    val arr = arrayOf(10, 20, 30, 40, 50)

    println(arr[0])        // 10 — first element
    println(arr[4])        // 50 — last element
    println(arr.last())    // 50
    println(arr.first())   // 10

    arr[2] = 99            // Modify element
    println(arr[2])        // 99
}
```

## Array Properties

```kotlin
fun main() {
    val arr = arrayOf(1, 2, 3, 4, 5)

    println(arr.size)           // 5
    println(arr.indices)        // 0..4
    println(arr.lastIndex)      // 4
}
```

## Iterating Over Arrays

```kotlin
fun main() {
    val colors = arrayOf("Red", "Green", "Blue")

    // Using for-in
    for (color in colors) {
        println(color)
    }

    // Using index
    for (i in colors.indices) {
        println("$i: ${colors[i]}")
    }

    // Using withIndex
    for ((index, color) in colors.withIndex()) {
        println("$index -> $color")
    }

    // Using forEach
    colors.forEach { println(it) }
}
```

## Common Array Operations

```kotlin
fun main() {
    val numbers = intArrayOf(3, 1, 4, 1, 5, 9, 2, 6)

    println(numbers.sum())         // Sum of all elements
    println(numbers.average())     // Average
    println(numbers.max())         // Maximum value
    println(numbers.min())         // Minimum value
    println(numbers.sorted())      // Sorted list (returns List)
    println(numbers.contains(5))   // true
    println(numbers.count())       // 8

    numbers.sort()                 // Sort in-place
    println(numbers.toList())      // [1, 1, 2, 3, 4, 5, 6, 9]
}
```

## Copying Arrays

```kotlin
fun main() {
    val original = arrayOf(1, 2, 3)
    val copy = original.copyOf()
    val partial = original.copyOfRange(0, 2)  // [1, 2]

    copy[0] = 99
    println(original[0])  // 1 — original unchanged
    println(copy[0])      // 99
}
```

## 2D Arrays (Multi-Dimensional)

```kotlin
fun main() {
    // 3x3 matrix
    val matrix = Array(3) { IntArray(3) }

    matrix[0][0] = 1; matrix[0][1] = 2; matrix[0][2] = 3
    matrix[1][0] = 4; matrix[1][1] = 5; matrix[1][2] = 6
    matrix[2][0] = 7; matrix[2][1] = 8; matrix[2][2] = 9

    for (row in matrix) {
        for (value in row) {
            print("$value\t")
        }
        println()
    }
}
```

## Converting Between Arrays and Lists

```kotlin
fun main() {
    val arr = arrayOf(1, 2, 3)
    val list = arr.toList()        // Array → List
    val mutableList = arr.toMutableList()

    val backToArray = list.toTypedArray()  // List → Array
}
```

## Array Filtering and Mapping

```kotlin
fun main() {
    val numbers = arrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val evens = numbers.filter { it % 2 == 0 }
    println(evens)   // [2, 4, 6, 8, 10]

    val doubled = numbers.map { it * 2 }
    println(doubled) // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
}
```

## Summary

| Operation          | Code Example                           |
|--------------------|----------------------------------------|
| Create             | `arrayOf(1, 2, 3)`                    |
| Access             | `arr[0]`                              |
| Modify             | `arr[0] = 10`                         |
| Size               | `arr.size`                            |
| Iterate            | `for (x in arr)`                      |
| Sort               | `arr.sort()`                          |
| Filter             | `arr.filter { it > 5 }`              |
| Map                | `arr.map { it * 2 }`                 |
| Convert to List    | `arr.toList()`                        |
