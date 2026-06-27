---
id: kotlin-4
title: Variables and Data Types
sidebar_label: Variables & Data Types
sidebar_position: 4
---

# Variables and Data Types

## Declaring Variables

Kotlin has two keywords for declaring variables:

| Keyword | Meaning         | Mutable? |
|---------|-----------------|----------|
| `val`   | Value (constant) | No       |
| `var`   | Variable        | Yes      |

```kotlin
fun main() {
    val name = "Alice"      // immutable — cannot be changed
    var age = 25            // mutable — can be changed

    age = 26                // OK
    // name = "Bob"         // ERROR: val cannot be reassigned

    println("$name is $age years old")
}
```

## Type Inference

Kotlin can infer types automatically:

```kotlin
val city = "Mumbai"         // Kotlin infers String
val population = 20_000_000 // Kotlin infers Int
val temperature = 36.5      // Kotlin infers Double
val isCapital = false       // Kotlin infers Boolean
```

## Explicit Type Declaration

You can also declare types explicitly:

```kotlin
val name: String = "Kotlin"
val version: Double = 1.9
val year: Int = 2024
val isActive: Boolean = true
```

## Basic Data Types

### Integer Types

```kotlin
val byte: Byte   = 127             // -128 to 127
val short: Short = 32767           // -32,768 to 32,767
val int: Int     = 2_147_483_647   // ~2.1 billion
val long: Long   = 9_223_372_036_854_775_807L
```

### Floating-Point Types

```kotlin
val float: Float   = 3.14f     // 32-bit, note the 'f' suffix
val double: Double = 3.14159   // 64-bit (default for decimals)
```

### Character Type

```kotlin
val letter: Char = 'K'
val digit: Char  = '9'
val symbol: Char = '@'
```

### Boolean Type

```kotlin
val isKotlinFun: Boolean = true
val isJavaFaster: Boolean = false
```

### String Type

```kotlin
val greeting: String = "Hello, Kotlin!"
val multiline: String = """
    This is
    a multiline
    string
""".trimIndent()
```

## Type Conversion

Kotlin does **not** do implicit type conversions. You must convert explicitly:

```kotlin
fun main() {
    val intVal: Int = 42
    val longVal: Long = intVal.toLong()
    val doubleVal: Double = intVal.toDouble()
    val strVal: String = intVal.toString()
    val floatVal: Float = intVal.toFloat()

    println(longVal)   // 42
    println(doubleVal) // 42.0
    println(strVal)    // "42"
}
```

### Conversion Functions

| Function      | Converts To |
|---------------|-------------|
| `toByte()`    | Byte        |
| `toShort()`   | Short       |
| `toInt()`     | Int         |
| `toLong()`    | Long        |
| `toFloat()`   | Float       |
| `toDouble()`  | Double      |
| `toChar()`    | Char        |
| `toString()`  | String      |

## Constants with `const`

```kotlin
const val PI = 3.14159       // compile-time constant (must be top-level or in object)
const val APP_NAME = "MyApp"
```

## Nullable Variables

By default, variables in Kotlin **cannot hold null**. Use `?` to allow null:

```kotlin
var name: String = "Alice"
// name = null  // ERROR!

var nullableName: String? = "Bob"
nullableName = null  // OK
```

## Summary

```kotlin
fun main() {
    // val = immutable, var = mutable
    val language = "Kotlin"
    var count = 0

    // Explicit types
    val pi: Double = 3.14159
    val flag: Boolean = true

    // Type conversion
    val intNum = 10
    val dbl = intNum.toDouble()

    // Nullable
    var maybeNull: String? = null

    println("$language | $count | $pi | $flag | $dbl | $maybeNull")
}
```
