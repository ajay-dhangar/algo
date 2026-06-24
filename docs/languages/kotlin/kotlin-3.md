---
id: kotlin-3
title: Your First Kotlin Program
sidebar_label: First Program
sidebar_position: 3
---

# Your First Kotlin Program

## Hello, World!

Every programming journey begins with a simple "Hello, World!" program. In Kotlin, it takes just two lines.

```kotlin
fun main() {
    println("Hello, World!")
}
```

**Output:**
```
Hello, World!
```

## Breaking It Down

### `fun`
The `fun` keyword is used to declare a function in Kotlin.

### `main()`
`main` is the entry point of every Kotlin program. When you run your program, Kotlin starts execution from the `main` function.

### `println()`
`println` stands for "print line." It prints the given text to the console followed by a newline character.

## Variations of the Main Function

```kotlin
// Basic main function
fun main() {
    println("Hello!")
}

// Main with command-line arguments
fun main(args: Array<String>) {
    println("Arguments: ${args.size}")
}
```

## Print vs Println

```kotlin
fun main() {
    print("Hello, ")      // Does NOT move to next line
    print("World!")       // Continues on the same line
    println()             // Prints a blank new line
    println("Kotlin!")    // Prints and moves to next line
}
```

**Output:**
```
Hello, World!
Kotlin!
```

## Printing Variables

```kotlin
fun main() {
    val name = "Kotlin"
    val version = 2.0

    println("Language: $name")
    println("Version: $version")
    println("Welcome to $name $version!")
}
```

**Output:**
```
Language: Kotlin
Version: 2.0
Welcome to Kotlin 2.0!
```

## String Templates

Kotlin supports **string templates** using `$` for variables and `${}` for expressions:

```kotlin
fun main() {
    val a = 10
    val b = 20
    println("Sum of $a and $b is ${a + b}")
}
```

**Output:**
```
Sum of 10 and 20 is 30
```

## Comments in Kotlin

```kotlin
fun main() {
    // This is a single-line comment

    /*
     * This is a
     * multi-line comment
     */

    println("Comments don't affect output") // inline comment
}
```

## Your First Complete Program

```kotlin
fun main() {
    // Greet the user
    val language = "Kotlin"
    val year = 2024

    println("============================")
    println("  Welcome to $language!")
    println("  Year: $year")
    println("============================")
}
```

**Output:**
```
============================
  Welcome to Kotlin!
  Year: 2024
============================
```

## Common Mistakes to Avoid

| Mistake | Wrong | Correct |
|--------|-------|---------|
| Missing parentheses | `println "Hello"` | `println("Hello")` |
| Wrong function keyword | `function main()` | `fun main()` |
| Case sensitivity | `Main()` | `main()` |
| Missing quotes | `println(Hello)` | `println("Hello")` |

## Summary

- Use `fun main()` as the program entry point.
- Use `println()` to print output with a new line.
- Use `print()` to print without moving to the next line.
- Use `$variable` or `${expression}` inside strings for templates.
- Comments use `//` for single-line and `/* */` for multi-line.
