---
id: kotlin-20
title: Generics
sidebar_label: Generics
sidebar_position: 20
---

# Generics

## What are Generics?

Generics allow you to write **type-safe, reusable code** that works with different data types without sacrificing type safety. Instead of writing separate classes for each type, you write one class with a type parameter.

## Generic Functions

```kotlin
fun <T> printItem(item: T) {
    println("Item: $item (${item!!::class.simpleName})")
}

fun main() {
    printItem(42)
    printItem("Hello")
    printItem(3.14)
    printItem(true)
}
```

### Generic Function with Return Type

```kotlin
fun <T> identity(value: T): T = value

fun main() {
    val name: String = identity("Kotlin")
    val num: Int = identity(100)
    println(name)  // Kotlin
    println(num)   // 100
}
```

## Generic Classes

```kotlin
class Box<T>(val value: T) {
    fun getValue(): T = value
    fun describe() = println("Box contains: $value (${value!!::class.simpleName})")
}

fun main() {
    val intBox    = Box(42)
    val strBox    = Box("Hello")
    val listBox   = Box(listOf(1, 2, 3))

    intBox.describe()     // Box contains: 42 (Int)
    strBox.describe()     // Box contains: Hello (String)
    listBox.describe()    // Box contains: [1, 2, 3] (ArrayList)
}
```

## Generic Interfaces

```kotlin
interface Repository<T> {
    fun findById(id: Int): T?
    fun save(item: T)
    fun getAll(): List<T>
}

data class User(val id: Int, val name: String)

class UserRepository : Repository<User> {
    private val users = mutableListOf<User>()

    override fun findById(id: Int) = users.find { it.id == id }
    override fun save(item: User) { users.add(item) }
    override fun getAll() = users.toList()
}

fun main() {
    val repo = UserRepository()
    repo.save(User(1, "Alice"))
    repo.save(User(2, "Bob"))
    println(repo.findById(1))   // User(id=1, name=Alice)
    println(repo.getAll())
}
```

## Type Constraints (Upper Bounds)

Restrict what types can be used as a type argument:

```kotlin
fun <T : Number> sum(a: T, b: T): Double {
    return a.toDouble() + b.toDouble()
}

fun main() {
    println(sum(3, 4))         // 7.0
    println(sum(1.5, 2.5))     // 4.0
    // sum("a", "b")  // ERROR: String is not a Number
}
```

### Multiple Constraints with `where`

```kotlin
fun <T> printIfComparable(a: T, b: T)
        where T : Comparable<T>, T : Any {
    if (a > b) println("$a > $b") else println("$a <= $b")
}

fun main() {
    printIfComparable(5, 3)         // 5 > 3
    printIfComparable("abc", "xyz") // abc <= xyz
}
```

## Variance: `out` and `in`

### `out` — Covariant (Producer)

A `Box<out T>` can only **produce** T values (read-only):

```kotlin
class Printer<out T>(val content: T) {
    fun print() = println(content)
}

fun printAnything(printer: Printer<Any>) {
    printer.print()
}

fun main() {
    val strPrinter = Printer("Hello")
    printAnything(strPrinter)  // OK because of 'out'
}
```

### `in` — Contravariant (Consumer)

A `Box<in T>` can only **consume** T values (write-only):

```kotlin
class Writer<in T> {
    fun write(value: T) = println("Writing: $value")
}

fun writeNumber(writer: Writer<Number>) {
    writer.write(3.14)
}

fun main() {
    val anyWriter = Writer<Any>()
    writeNumber(anyWriter)  // OK because of 'in'
}
```

## Star Projection

Use `*` when the type argument is unknown:

```kotlin
fun printList(list: List<*>) {
    list.forEach { println(it) }
}

fun main() {
    printList(listOf(1, 2, 3))
    printList(listOf("a", "b", "c"))
}
```

## Reified Type Parameters

Use `reified` with `inline` to access type info at runtime:

```kotlin
inline fun <reified T> isType(value: Any): Boolean {
    return value is T
}

inline fun <reified T> filterByType(list: List<Any>): List<T> {
    return list.filterIsInstance<T>()
}

fun main() {
    println(isType<String>("hello"))  // true
    println(isType<Int>("hello"))     // false

    val mixed: List<Any> = listOf(1, "a", 2, "b", 3)
    val strings = filterByType<String>(mixed)
    val ints = filterByType<Int>(mixed)

    println(strings)  // [a, b]
    println(ints)     // [1, 2, 3]
}
```

## Generic Stack Example

```kotlin
class Stack<T> {
    private val elements = mutableListOf<T>()

    fun push(element: T) = elements.add(element)
    fun pop(): T = elements.removeLastOrNull() ?: throw NoSuchElementException("Stack is empty")
    fun peek(): T = elements.lastOrNull() ?: throw NoSuchElementException("Stack is empty")
    fun isEmpty() = elements.isEmpty()
    val size get() = elements.size
}

fun main() {
    val stack = Stack<Int>()
    stack.push(1)
    stack.push(2)
    stack.push(3)

    println(stack.peek())  // 3
    println(stack.pop())   // 3
    println(stack.pop())   // 2
    println(stack.size)    // 1
}
```

## Summary

| Concept              | Syntax               | Purpose                                     |
|----------------------|----------------------|---------------------------------------------|
| Generic function     | `fun <T> foo()`      | Works with any type                         |
| Generic class        | `class Box<T>`       | Type-parameterized class                    |
| Upper bound          | `<T : Number>`       | Restrict to Number subclasses               |
| Covariance           | `out T`              | Producer — can only read                    |
| Contravariance       | `in T`               | Consumer — can only write                   |
| Star projection      | `List<*>`            | Unknown type, read-only                     |
| Reified              | `inline fun <reified T>` | Access type at runtime                  |
