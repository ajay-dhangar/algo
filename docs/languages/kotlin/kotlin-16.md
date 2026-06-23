---
id: kotlin-16
title: Interfaces
sidebar_label: Interfaces
sidebar_position: 16
---

# Interfaces

## What is an Interface?

An interface defines a **contract** — a set of functions and properties that a class must implement. Unlike abstract classes, a class can implement **multiple interfaces**.

## Defining and Implementing an Interface

```kotlin
interface Greetable {
    fun greet()
}

class Person(val name: String) : Greetable {
    override fun greet() {
        println("Hello, I'm $name!")
    }
}

fun main() {
    val person = Person("Alice")
    person.greet()  // Hello, I'm Alice!
}
```

## Default Implementations

Interfaces can have default method bodies:

```kotlin
interface Printable {
    fun print()
    fun printTwice() {
        print()
        print()
    }
}

class Document(val content: String) : Printable {
    override fun print() = println(content)
    // printTwice() is inherited with default behavior
}

fun main() {
    val doc = Document("Hello Kotlin!")
    doc.printTwice()
    // Hello Kotlin!
    // Hello Kotlin!
}
```

## Interface Properties

```kotlin
interface Shape {
    val name: String      // Abstract property — must be overridden
    val color: String     // Abstract property
        get() = "White"   // Default value (can still be overridden)

    fun area(): Double
}

class Circle(val radius: Double) : Shape {
    override val name = "Circle"
    override val color = "Red"
    override fun area() = Math.PI * radius * radius
}

fun main() {
    val c = Circle(5.0)
    println("${c.name} (${c.color}): area = ${"%.2f".format(c.area())}")
}
```

## Implementing Multiple Interfaces

```kotlin
interface Flyable {
    fun fly() = println("Flying!")
}

interface Swimmable {
    fun swim() = println("Swimming!")
}

class Duck(val name: String) : Flyable, Swimmable {
    fun quack() = println("$name says Quack!")
}

fun main() {
    val duck = Duck("Donald")
    duck.fly()    // Flying!
    duck.swim()   // Swimming!
    duck.quack()  // Donald says Quack!
}
```

## Resolving Conflicts

When two interfaces have the same method with defaults, you must override it:

```kotlin
interface A {
    fun hello() = println("Hello from A")
}

interface B {
    fun hello() = println("Hello from B")
}

class C : A, B {
    override fun hello() {
        super<A>.hello()  // Choose which parent to call
        super<B>.hello()
    }
}

fun main() {
    C().hello()
    // Hello from A
    // Hello from B
}
```

## Functional Interfaces (SAM)

An interface with a **Single Abstract Method** — can be used as a lambda:

```kotlin
fun interface MathOperation {
    fun operate(a: Int, b: Int): Int
}

fun compute(a: Int, b: Int, operation: MathOperation): Int {
    return operation.operate(a, b)
}

fun main() {
    val add = MathOperation { a, b -> a + b }
    val multiply = MathOperation { a, b -> a * b }

    println(compute(5, 3, add))       // 8
    println(compute(5, 3, multiply))  // 15

    // Also works as a lambda directly
    println(compute(10, 4) { a, b -> a - b }) // 6
}
```

## Interface as a Type

```kotlin
interface Drawable {
    fun draw()
}

class Circle : Drawable {
    override fun draw() = println("Drawing Circle")
}

class Square : Drawable {
    override fun draw() = println("Drawing Square")
}

fun renderAll(shapes: List<Drawable>) {
    shapes.forEach { it.draw() }
}

fun main() {
    val shapes: List<Drawable> = listOf(Circle(), Square(), Circle())
    renderAll(shapes)
}
```

## Interface vs Abstract Class

| Feature                    | Interface          | Abstract Class     |
|----------------------------|--------------------|--------------------|
| Multiple inheritance       | Yes (many)         | No (one only)      |
| Constructor                | No                 | Yes                |
| State (fields with values) | No (only abstract) | Yes                |
| Default methods            | Yes                | Yes                |
| `open` required            | No                 | Yes                |

## Summary

- Interfaces define contracts using abstract functions and properties.
- A class can implement **multiple interfaces**.
- Interfaces can have default method implementations.
- Use `super<InterfaceName>.method()` to resolve conflicts.
- Functional interfaces (SAM) can be used as lambdas.
