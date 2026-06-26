---
id: kotlin-5
title: Operators
sidebar_label: Operators
sidebar_position: 5
---

# Operators

## Arithmetic Operators

```kotlin
fun main() {
    val a = 20
    val b = 6

    println(a + b)   // 26 — Addition
    println(a - b)   // 14 — Subtraction
    println(a * b)   // 120 — Multiplication
    println(a / b)   // 3  — Division (integer)
    println(a % b)   // 2  — Modulus (remainder)
}
```

### Integer vs Float Division

```kotlin
val x = 7 / 2         // 3 (integer division)
val y = 7.0 / 2       // 3.5 (float division)
val z = 7 / 2.0       // 3.5
```

## Assignment Operators

```kotlin
fun main() {
    var x = 10

    x += 5   // x = x + 5 → 15
    x -= 3   // x = x - 3 → 12
    x *= 2   // x = x * 2 → 24
    x /= 4   // x = x / 4 → 6
    x %= 4   // x = x % 4 → 2

    println(x) // 2
}
```

## Comparison Operators

```kotlin
fun main() {
    val a = 10
    val b = 20

    println(a == b)   // false — Equal to
    println(a != b)   // true  — Not equal to
    println(a > b)    // false — Greater than
    println(a < b)    // true  — Less than
    println(a >= b)   // false — Greater than or equal
    println(a <= b)   // true  — Less than or equal
}
```

## Logical Operators

```kotlin
fun main() {
    val isAdult = true
    val hasTicket = false

    println(isAdult && hasTicket)   // false — AND
    println(isAdult || hasTicket)   // true  — OR
    println(!isAdult)               // false — NOT
}
```

## Increment and Decrement

```kotlin
fun main() {
    var count = 5

    println(count++)   // 5 — post-increment (use then add)
    println(count)     // 6

    println(++count)   // 7 — pre-increment (add then use)
    println(count)     // 7

    println(count--)   // 7 — post-decrement
    println(--count)   // 5 — pre-decrement
}
```

## Range Operator

```kotlin
fun main() {
    val range = 1..10          // 1 to 10 inclusive
    val charRange = 'a'..'z'

    println(5 in range)        // true
    println(15 in range)       // false
    println('e' in charRange)  // true
}
```

## Bitwise Operators

```kotlin
fun main() {
    val a = 0b1010  // 10
    val b = 0b1100  // 12

    println(a and b)   // 8  — bitwise AND
    println(a or b)    // 14 — bitwise OR
    println(a xor b)   // 6  — bitwise XOR
    println(a.inv())   // bitwise NOT (inverts bits)
    println(a shl 1)   // 20 — shift left
    println(a shr 1)   // 5  — shift right
}
```

## String Operators

```kotlin
fun main() {
    val s1 = "Hello"
    val s2 = "World"

    println(s1 + " " + s2)       // Hello World (concatenation)
    println(s1 == "Hello")        // true (structural equality)
    println(s1 === s1)            // true (referential equality)
    println("lo" in s1)           // true (contains check)
}
```

## Elvis Operator `?:`

Used with nullable types:

```kotlin
fun main() {
    val name: String? = null
    val displayName = name ?: "Unknown"
    println(displayName)  // Unknown
}
```

## Safe Call Operator `?.`

```kotlin
fun main() {
    val name: String? = null
    println(name?.length)   // null (no NullPointerException)

    val name2: String? = "Kotlin"
    println(name2?.length)  // 6
}
```

## Operator Summary Table

| Category    | Operators                        |
|-------------|----------------------------------|
| Arithmetic  | `+`, `-`, `*`, `/`, `%`         |
| Assignment  | `=`, `+=`, `-=`, `*=`, `/=`, `%=` |
| Comparison  | `==`, `!=`, `>`, `<`, `>=`, `<=` |
| Logical     | `&&`, `||`, `!`                  |
| Range       | `..`, `in`, `!in`               |
| Bitwise     | `and`, `or`, `xor`, `inv`, `shl`, `shr` |
| Null Safety | `?.`, `?:`, `!!`                |
