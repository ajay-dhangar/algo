---
id: kotlin-11
title: Strings
sidebar_label: Strings
sidebar_position: 11
---

# Strings

## Creating Strings

```kotlin
fun main() {
    val name: String = "Kotlin"
    val greeting = "Hello, $name!"

    // Multiline string
    val message = """
        Welcome to Kotlin!
        It's modern and concise.
    """.trimIndent()

    println(greeting)
    println(message)
}
```

## String Templates

```kotlin
fun main() {
    val language = "Kotlin"
    val version = 1.9
    val year = 2024

    println("Language: $language")
    println("Version: $version")
    println("Born in: ${2011}")
    println("Current Year: $year")
    println("Age: ${year - 2011} years old")
}
```

## String Length and Indexing

```kotlin
fun main() {
    val text = "Hello, Kotlin!"

    println(text.length)     // 14
    println(text[0])         // H
    println(text[7])         // K
    println(text.first())    // H
    println(text.last())     // !
}
```

## Common String Functions

### Case Operations

```kotlin
fun main() {
    val str = "Hello, World!"

    println(str.uppercase())    // HELLO, WORLD!
    println(str.lowercase())    // hello, world!
    println(str.capitalize())   // Hello, world! (deprecated in newer Kotlin)
}
```

### Trimming

```kotlin
fun main() {
    val padded = "   Hello, Kotlin!   "

    println(padded.trim())        // "Hello, Kotlin!"
    println(padded.trimStart())   // "Hello, Kotlin!   "
    println(padded.trimEnd())     // "   Hello, Kotlin!"
}
```

### Substring

```kotlin
fun main() {
    val str = "Hello, Kotlin!"

    println(str.substring(7))          // Kotlin!
    println(str.substring(7, 13))      // Kotlin
    println(str.take(5))               // Hello
    println(str.drop(7))               // Kotlin!
    println(str.takeLast(7))           // Kotlin!
    println(str.dropLast(1))           // Hello, Kotlin
}
```

### Checking Content

```kotlin
fun main() {
    val email = "user@example.com"

    println(email.contains("@"))          // true
    println(email.startsWith("user"))     // true
    println(email.endsWith(".com"))       // true
    println(email.isEmpty())             // false
    println(email.isNotEmpty())          // true
    println("   ".isBlank())             // true
}
```

### Replacing

```kotlin
fun main() {
    val sentence = "I love Java. Java is great."

    println(sentence.replace("Java", "Kotlin"))
    // I love Kotlin. Kotlin is great.

    println(sentence.replaceFirst("Java", "Kotlin"))
    // I love Kotlin. Java is great.
}
```

### Splitting

```kotlin
fun main() {
    val csv = "Alice,Bob,Charlie,Diana"
    val parts = csv.split(",")

    println(parts)           // [Alice, Bob, Charlie, Diana]
    println(parts.size)      // 4
    parts.forEach { println(it) }
}
```

### Joining

```kotlin
fun main() {
    val words = listOf("Kotlin", "is", "awesome")
    val sentence = words.joinToString(" ")
    println(sentence)   // Kotlin is awesome

    val csv = words.joinToString(separator = ",", prefix = "[", postfix = "]")
    println(csv)        // [Kotlin,is,awesome]
}
```

## String Comparison

```kotlin
fun main() {
    val s1 = "Kotlin"
    val s2 = "kotlin"

    println(s1 == s2)                         // false (case-sensitive)
    println(s1.equals(s2, ignoreCase = true)) // true
    println(s1.compareTo(s2))                 // negative (K < k in ASCII)
}
```

## Converting Strings

```kotlin
fun main() {
    val numStr = "42"
    val decStr = "3.14"

    val num = numStr.toInt()
    val dec = decStr.toDouble()
    val safe = "abc".toIntOrNull()   // null (no crash)

    println(num)    // 42
    println(dec)    // 3.14
    println(safe)   // null
}
```

## String Formatting

```kotlin
fun main() {
    val pi = 3.14159
    val formatted = "%.2f".format(pi)
    println(formatted)   // 3.14

    val name = "Alice"
    val age = 30
    val info = "%s is %d years old".format(name, age)
    println(info)   // Alice is 30 years old
}
```

## Char Operations

```kotlin
fun main() {
    val ch = 'K'
    println(ch.isLetter())    // true
    println(ch.isDigit())     // false
    println(ch.isUpperCase()) // true
    println(ch.lowercaseChar())  // k
    println(ch.code)          // 75 (ASCII code)
}
```

## Summary

| Operation       | Method                              |
|-----------------|-------------------------------------|
| Length          | `str.length`                       |
| Uppercase       | `str.uppercase()`                  |
| Lowercase       | `str.lowercase()`                  |
| Trim            | `str.trim()`                       |
| Substring       | `str.substring(from, to)`          |
| Contains        | `str.contains("x")`                |
| Starts with     | `str.startsWith("x")`              |
| Replace         | `str.replace("old", "new")`        |
| Split           | `str.split(",")`                   |
| Join            | `list.joinToString(separator)`     |
| Convert to Int  | `str.toInt()` / `toIntOrNull()`    |
