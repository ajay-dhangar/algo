---
id: kotlin-22
title: Best Practices
sidebar_label: Best Practices
sidebar_position: 22
---

# Kotlin Best Practices

## 1. Prefer `val` Over `var`

Always use `val` (immutable) unless mutation is truly needed.

```kotlin
// Bad
var name = "Alice"
var count = 0

// Good
val name = "Alice"
var count = 0  // Only var when it needs to change
```

## 2. Leverage Null Safety

Never use `!!` unless you are absolutely certain the value is non-null.

```kotlin
// Bad — can crash
val length = name!!.length

// Good — safe handling
val length = name?.length ?: 0

// Better — use let for null-safe blocks
name?.let {
    println("Name is $it, length is ${it.length}")
}
```

## 3. Use Data Classes for Simple Data Holders

```kotlin
// Bad — too much boilerplate
class Point(val x: Int, val y: Int) {
    override fun equals(other: Any?) = ...
    override fun hashCode() = ...
    override fun toString() = ...
}

// Good
data class Point(val x: Int, val y: Int)
```

## 4. Use `when` Instead of Long `if-else` Chains

```kotlin
// Bad
fun getDay(num: Int): String {
    if (num == 1) return "Monday"
    else if (num == 2) return "Tuesday"
    else if (num == 3) return "Wednesday"
    else return "Unknown"
}

// Good
fun getDay(num: Int) = when (num) {
    1 -> "Monday"
    2 -> "Tuesday"
    3 -> "Wednesday"
    else -> "Unknown"
}
```

## 5. Use String Templates Instead of Concatenation

```kotlin
// Bad
val greeting = "Hello, " + name + "! You are " + age + " years old."

// Good
val greeting = "Hello, $name! You are $age years old."
```

## 6. Use Extension Functions

Add behavior to existing classes cleanly:

```kotlin
// Bad — utility class
object StringUtils {
    fun isPalindrome(str: String) = str == str.reversed()
}

// Good — extension function
fun String.isPalindrome() = this == this.reversed()

// Usage
println("racecar".isPalindrome())  // true
```

## 7. Use `apply`, `also`, `let`, `run`, `with` Appropriately

```kotlin
// apply — configure an object (returns the object)
val person = Person().apply {
    name = "Alice"
    age = 30
}

// also — side effects (returns the object)
val numbers = mutableListOf(1, 2, 3)
    .also { println("Original: $it") }

// let — transform or null-check (returns lambda result)
val upper = name?.let { it.uppercase() }

// run — execute a block and return result
val length = "Hello".run { this.length }

// with — call multiple methods on an object
val result = with(StringBuilder()) {
    append("Hello")
    append(", ")
    append("World!")
    toString()
}
```

## 8. Prefer Collection Functions Over Loops

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Bad — manual loop
val evenSquares = mutableListOf<Int>()
for (n in numbers) {
    if (n % 2 == 0) evenSquares.add(n * n)
}

// Good — functional style
val evenSquares = numbers.filter { it % 2 == 0 }.map { it * it }
```

## 9. Use Sealed Classes for Representing States

```kotlin
sealed class NetworkResult<out T> {
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val message: String) : NetworkResult<Nothing>()
    object Loading : NetworkResult<Nothing>()
}

fun handle(result: NetworkResult<String>) = when (result) {
    is NetworkResult.Success -> println("Data: ${result.data}")
    is NetworkResult.Error   -> println("Error: ${result.message}")
    is NetworkResult.Loading -> println("Loading...")
}
```

## 10. Use Default and Named Arguments Instead of Overloading

```kotlin
// Bad — multiple overloads
fun createUser(name: String): User = createUser(name, 18)
fun createUser(name: String, age: Int): User = createUser(name, age, "user")
fun createUser(name: String, age: Int, role: String): User = User(name, age, role)

// Good — one function with defaults
fun createUser(name: String, age: Int = 18, role: String = "user") = User(name, age, role)

// Usage
val user1 = createUser("Alice")
val user2 = createUser("Bob", role = "admin")
```

## 11. Use `companion object` for Factory Methods

```kotlin
class Temperature private constructor(val celsius: Double) {
    companion object {
        fun fromCelsius(value: Double) = Temperature(value)
        fun fromFahrenheit(value: Double) = Temperature((value - 32) * 5 / 9)
        fun fromKelvin(value: Double) = Temperature(value - 273.15)
    }

    val fahrenheit get() = celsius * 9 / 5 + 32
}

fun main() {
    val temp = Temperature.fromFahrenheit(98.6)
    println("${temp.celsius}°C")
}
```

## 12. Avoid Using `Any` When Generics Can Work

```kotlin
// Bad — loses type safety
fun printBox(box: Box<Any>) = println(box.value)

// Good — type-safe with generics
fun <T> printBox(box: Box<T>) = println(box.value)
```

## 13. Naming Conventions

| Element         | Convention         | Example               |
|-----------------|--------------------|-----------------------|
| Classes         | PascalCase         | `UserProfile`         |
| Functions       | camelCase          | `getUserName()`       |
| Variables       | camelCase          | `firstName`           |
| Constants       | UPPER_SNAKE_CASE   | `MAX_RETRY_COUNT`     |
| Packages        | lowercase          | `com.example.app`     |
| Files           | PascalCase         | `UserProfile.kt`      |

## 14. Handle Errors Explicitly

```kotlin
// Bad — crashes on invalid input
val num = readLine()!!.toInt()

// Good — explicit error handling
val num = readLine()?.toIntOrNull() ?: run {
    println("Invalid input")
    return
}
```

## 15. Write Meaningful Tests

```kotlin
import kotlin.test.*

class CalculatorTest {
    @Test
    fun `addition returns correct sum`() {
        val calc = Calculator()
        assertEquals(5, calc.add(2, 3))
    }

    @Test
    fun `division by zero throws exception`() {
        assertFailsWith<ArithmeticException> {
            Calculator().divide(10, 0)
        }
    }
}
```

## Quick Reference Checklist

- [ ] Prefer `val` over `var`
- [ ] Use `?.` and `?:` instead of `!!`
- [ ] Use `data class` for plain data holders
- [ ] Use `when` for multi-branch conditionals
- [ ] Use string templates not concatenation
- [ ] Prefer extension functions over utility classes
- [ ] Use scope functions (`apply`, `let`, `run`, etc.)
- [ ] Use collection operations over manual loops
- [ ] Use sealed classes for exhaustive states
- [ ] Follow Kotlin naming conventions
- [ ] Handle nullability and errors explicitly
- [ ] Write clear, testable code
