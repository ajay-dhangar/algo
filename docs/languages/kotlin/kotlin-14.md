---
id: kotlin-14
title: Classes and Objects
sidebar_label: Classes & Objects
sidebar_position: 14
---

# Classes and Objects

## Defining a Class

```kotlin
class Person {
    var name: String = ""
    var age: Int = 0

    fun greet() {
        println("Hi, I'm $name and I'm $age years old.")
    }
}

fun main() {
    val person = Person()
    person.name = "Alice"
    person.age = 30
    person.greet()
}
```

## Primary Constructor

```kotlin
class Person(val name: String, val age: Int) {
    fun greet() = println("Hi, I'm $name, age $age")
}

fun main() {
    val p = Person("Bob", 25)
    p.greet()
    println(p.name)  // Bob
    println(p.age)   // 25
}
```

## `init` Block

Runs when the object is created:

```kotlin
class Person(val name: String, val age: Int) {
    init {
        require(age >= 0) { "Age cannot be negative" }
        println("Person created: $name")
    }
}

fun main() {
    val p = Person("Alice", 28)
}
```

## Secondary Constructors

```kotlin
class Rectangle {
    val width: Double
    val height: Double

    constructor(width: Double, height: Double) {
        this.width = width
        this.height = height
    }

    constructor(side: Double) : this(side, side)  // Square

    fun area() = width * height
}

fun main() {
    val rect = Rectangle(4.0, 5.0)
    val square = Rectangle(3.0)
    println(rect.area())    // 20.0
    println(square.area())  // 9.0
}
```

## Default Parameter Values

```kotlin
class User(
    val name: String,
    val age: Int = 18,
    val email: String = "no-email"
)

fun main() {
    val u1 = User("Alice")
    val u2 = User("Bob", 25)
    val u3 = User("Charlie", 30, "charlie@example.com")

    println("${u1.name}, ${u1.age}, ${u1.email}")
}
```

## Properties: Getters and Setters

```kotlin
class Circle(radius: Double) {
    var radius: Double = radius
        get() = field
        set(value) {
            require(value > 0) { "Radius must be positive" }
            field = value
        }

    val area: Double
        get() = Math.PI * radius * radius
}

fun main() {
    val c = Circle(5.0)
    println(c.area)      // 78.53...
    c.radius = 10.0
    println(c.area)      // 314.15...
}
```

## Companion Objects

Static-like members in Kotlin:

```kotlin
class MathHelper {
    companion object {
        const val PI = 3.14159

        fun square(n: Double) = n * n
        fun cube(n: Double) = n * n * n
    }
}

fun main() {
    println(MathHelper.PI)
    println(MathHelper.square(4.0))   // 16.0
    println(MathHelper.cube(3.0))     // 27.0
}
```

## Object Declaration (Singleton)

```kotlin
object AppConfig {
    val appName = "MyApp"
    var version = "1.0"

    fun info() = println("$appName v$version")
}

fun main() {
    AppConfig.info()
    AppConfig.version = "2.0"
    AppConfig.info()
}
```

## Object Expression (Anonymous Objects)

```kotlin
fun main() {
    val greeter = object {
        val message = "Hello!"
        fun greet() = println(message)
    }

    greeter.greet()
}
```

## Visibility Modifiers

| Modifier    | Scope                              |
|-------------|------------------------------------|
| `public`    | Default — visible everywhere       |
| `private`   | Visible only inside the class      |
| `protected` | Visible in class and subclasses    |
| `internal`  | Visible within the same module     |

```kotlin
class BankAccount(private var balance: Double) {
    fun deposit(amount: Double) {
        if (amount > 0) balance += amount
    }

    fun getBalance() = balance
}
```

## `lateinit` — Late Initialization

```kotlin
class UserProfile {
    lateinit var username: String

    fun setup(name: String) {
        username = name
    }

    fun display() {
        if (::username.isInitialized) {
            println("User: $username")
        }
    }
}
```

## Summary

| Concept              | Description                               |
|----------------------|-------------------------------------------|
| `class`              | Blueprint for objects                     |
| Primary constructor  | Defined in class header                   |
| `init` block         | Runs at object creation                   |
| Secondary constructor| Alternate ways to create instances        |
| `companion object`   | Class-level (static) members              |
| `object`             | Singleton pattern                         |
| Visibility modifiers | Control access to members                 |
| `lateinit`           | Delay initialization of non-null vars     |
