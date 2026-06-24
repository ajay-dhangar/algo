---
id: kotlin-13
title: Null Safety
sidebar_label: Null Safety
sidebar_position: 13
---

# Null Safety

## The Null Problem

In many languages, accessing a null reference causes a **NullPointerException (NPE)**. Kotlin eliminates this by distinguishing between nullable and non-nullable types at compile time.

## Non-Nullable Types (Default)

```kotlin
fun main() {
    var name: String = "Alice"
    // name = null  // COMPILE ERROR — String cannot hold null
    println(name.length)  // Always safe
}
```

## Nullable Types (`?`)

Add `?` after the type to allow null:

```kotlin
fun main() {
    var name: String? = "Alice"
    name = null  // OK — String? can hold null

    // println(name.length)  // COMPILE ERROR — unsafe
}
```

## Safe Call Operator (`?.`)

Returns `null` instead of throwing NPE:

```kotlin
fun main() {
    val name: String? = null
    println(name?.length)   // null — no crash

    val name2: String? = "Kotlin"
    println(name2?.length)  // 6
}
```

## Elvis Operator (`?:`)

Provides a default value when the expression is null:

```kotlin
fun main() {
    val name: String? = null
    val display = name ?: "Unknown"
    println(display)  // Unknown

    val length = name?.length ?: 0
    println(length)   // 0
}
```

## Not-Null Assertion (`!!`)

Forces access — throws NPE if null. Use with caution!

```kotlin
fun main() {
    val name: String? = "Kotlin"
    println(name!!.length)  // 6 — works if not null

    val empty: String? = null
    // println(empty!!.length)  // Throws NullPointerException!
}
```

## Safe Cast (`as?`)

Returns `null` instead of throwing `ClassCastException`:

```kotlin
fun main() {
    val obj: Any = "Hello"
    val str: String? = obj as? String
    val num: Int? = obj as? Int

    println(str)   // Hello
    println(num)   // null — not an Int, no crash
}
```

## Chaining Safe Calls

```kotlin
data class Address(val city: String?)
data class Person(val name: String, val address: Address?)

fun main() {
    val person: Person? = Person("Alice", Address(null))
    val city = person?.address?.city ?: "No city"
    println(city)  // No city
}
```

## `let` with Nullable

Executes a block only if the value is non-null:

```kotlin
fun main() {
    val name: String? = "Kotlin"

    name?.let {
        println("Name is: $it")  // Only runs if name != null
        println("Length: ${it.length}")
    }

    val empty: String? = null
    empty?.let {
        println("This won't print")
    }
}
```

## Null Checks with `if`

```kotlin
fun main() {
    val input: String? = "42"

    if (input != null) {
        println(input.length)  // Smart cast: input is String here
    }

    // Or use when
    when {
        input == null -> println("null value")
        input.isEmpty() -> println("empty")
        else -> println("value: $input")
    }
}
```

## `requireNotNull` and `checkNotNull`

```kotlin
fun process(name: String?) {
    val safeName = requireNotNull(name) { "Name cannot be null" }
    println("Processing: $safeName")
}

fun main() {
    process("Alice")
    // process(null)  // Throws IllegalArgumentException
}
```

## Nullable Collections

```kotlin
fun main() {
    val list: List<String?> = listOf("A", null, "B", null, "C")

    // Filter out nulls
    val nonNullList = list.filterNotNull()
    println(nonNullList)   // [A, B, C]

    // Map safely
    val lengths = list.mapNotNull { it?.length }
    println(lengths)       // [1, 1, 1]
}
```

## Summary Table

| Operator / Function | Behavior                                       |
|---------------------|------------------------------------------------|
| `Type?`             | Declare nullable type                          |
| `?.`                | Safe call — returns null if receiver is null   |
| `?:`                | Elvis — default value if null                  |
| `!!`                | Force unwrap — NPE if null                     |
| `as?`               | Safe cast — null if cast fails                 |
| `?.let { }`         | Execute block only if non-null                 |
| `filterNotNull()`   | Remove nulls from collection                   |
| `requireNotNull()`  | Assert non-null with custom error              |
