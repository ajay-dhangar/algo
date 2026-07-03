---
id: kotlin-6
title: User Input and Output
sidebar_label: Input & Output
sidebar_position: 6
---

# User Input and Output

## Output: Printing to Console

### `println()` — Print with Newline

```kotlin
println("Hello, World!")
println(42)
println(3.14)
println(true)
```

### `print()` — Print without Newline

```kotlin
print("Hello, ")
print("World!")
// Output: Hello, World!
```

### `System.out.printf()` — Formatted Output

```kotlin
System.out.printf("Name: %s, Age: %d, Score: %.2f%n", "Alice", 25, 98.5)
// Output: Name: Alice, Age: 25, Score: 98.50
```

### String Templates

```kotlin
val name = "Bob"
val score = 95
println("Student: $name scored $score marks")
println("Next year score: ${score + 5}")
```

## Input: Reading from Console

### `readLine()` — Read a Line of Text

```kotlin
fun main() {
    print("Enter your name: ")
    val name = readLine()
    println("Hello, $name!")
}
```

> Note: `readLine()` returns `String?` (nullable String).

### Reading and Converting Input

```kotlin
fun main() {
    print("Enter your age: ")
    val age = readLine()?.toInt() ?: 0
    println("You are $age years old")
}
```

## Reading Different Data Types

### Integer Input

```kotlin
fun main() {
    print("Enter a number: ")
    val num = readLine()!!.toInt()
    println("Square: ${num * num}")
}
```

### Double Input

```kotlin
fun main() {
    print("Enter price: ")
    val price = readLine()!!.toDouble()
    println("With tax: ${price * 1.18}")
}
```

### Boolean Input

```kotlin
fun main() {
    print("Are you a student? (true/false): ")
    val isStudent = readLine()!!.toBoolean()
    println("Student status: $isStudent")
}
```

## Safe Input Handling

Always handle potential errors when reading user input:

```kotlin
fun main() {
    print("Enter a number: ")
    val input = readLine()
    val num = input?.toIntOrNull()

    if (num != null) {
        println("Double: ${num * 2}")
    } else {
        println("Invalid number entered!")
    }
}
```

## Multiple Inputs

```kotlin
fun main() {
    print("Enter first number: ")
    val a = readLine()!!.toInt()

    print("Enter second number: ")
    val b = readLine()!!.toInt()

    println("Sum: ${a + b}")
    println("Difference: ${a - b}")
    println("Product: ${a * b}")
}
```

## Formatted Output with `trimIndent`

```kotlin
fun main() {
    val name = "Alice"
    val age = 22
    val gpa = 3.85

    val report = """
        ====== Student Report ======
        Name : $name
        Age  : $age
        GPA  : ${"%.2f".format(gpa)}
        ============================
    """.trimIndent()

    println(report)
}
```

**Output:**
```
====== Student Report ======
Name : Alice
Age  : 22
GPA  : 3.85
============================
```

## Using `Scanner` (Java Interop)

```kotlin
import java.util.Scanner

fun main() {
    val scanner = Scanner(System.`in`)

    print("Enter your name: ")
    val name = scanner.nextLine()

    print("Enter your age: ")
    val age = scanner.nextInt()

    println("Hello $name, you are $age years old!")
    scanner.close()
}
```

## Common Conversion Functions

| Function          | Converts To        | Safe Version         |
|-------------------|--------------------|----------------------|
| `toInt()`         | Int                | `toIntOrNull()`      |
| `toDouble()`      | Double             | `toDoubleOrNull()`   |
| `toLong()`        | Long               | `toLongOrNull()`     |
| `toFloat()`       | Float              | `toFloatOrNull()`    |
| `toBoolean()`     | Boolean            | N/A                  |

## Summary

- Use `println()` for output with newline, `print()` without.
- Use `readLine()` to read console input — it returns `String?`.
- Convert input using `.toInt()`, `.toDouble()`, etc.
- Use safe variants like `.toIntOrNull()` to avoid crashes.
- String templates with `$` and `${}` make output formatting easy.
