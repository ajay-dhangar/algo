---
id: kotlin-15
title: Inheritance
sidebar_label: Inheritance
sidebar_position: 15
---

# Inheritance

## The `open` Keyword

In Kotlin, classes are **final** by default. Use `open` to allow inheritance:

```kotlin
open class Animal(val name: String) {
    open fun sound() = println("$name makes a sound")
    fun breathe() = println("$name breathes")  // cannot be overridden
}

class Dog(name: String) : Animal(name) {
    override fun sound() = println("$name barks: Woof!")
}

fun main() {
    val dog = Dog("Rex")
    dog.sound()     // Rex barks: Woof!
    dog.breathe()   // Rex breathes
}
```

## Constructor Inheritance

```kotlin
open class Person(val name: String, val age: Int) {
    open fun introduce() = println("I'm $name, $age years old.")
}

class Student(name: String, age: Int, val grade: String) : Person(name, age) {
    override fun introduce() = println("I'm $name, $age, grade $grade.")
}

fun main() {
    val p = Person("Alice", 30)
    val s = Student("Bob", 20, "A")
    p.introduce()  // I'm Alice, 30 years old.
    s.introduce()  // I'm Bob, 20, grade A.
}
```

## Calling Super Members

```kotlin
open class Shape {
    open fun describe() = println("I am a shape")
}

class Circle(val radius: Double) : Shape() {
    override fun describe() {
        super.describe()   // calls parent method
        println("I am a circle with radius $radius")
    }
}

fun main() {
    Circle(5.0).describe()
    // I am a shape
    // I am a circle with radius 5.0
}
```

## Overriding Properties

```kotlin
open class Vehicle {
    open val type: String = "Vehicle"
    open val speed: Int = 0
}

class Car : Vehicle() {
    override val type: String = "Car"
    override val speed: Int = 120
}

fun main() {
    val car = Car()
    println("${car.type} — ${car.speed} km/h")
}
```

## Preventing Overrides with `final`

```kotlin
open class Base {
    open fun greet() = println("Hello from Base")
}

open class Middle : Base() {
    final override fun greet() = println("Hello from Middle")  // Cannot be overridden further
}

class Child : Middle() {
    // override fun greet() { }  // COMPILE ERROR
}
```

## Abstract Classes

An abstract class cannot be instantiated directly:

```kotlin
abstract class Shape(val color: String) {
    abstract fun area(): Double
    abstract fun perimeter(): Double

    fun describe() = println("A $color shape with area ${area()}")
}

class Rectangle(val width: Double, val height: Double, color: String) : Shape(color) {
    override fun area() = width * height
    override fun perimeter() = 2 * (width + height)
}

class Circle(val radius: Double, color: String) : Shape(color) {
    override fun area() = Math.PI * radius * radius
    override fun perimeter() = 2 * Math.PI * radius
}

fun main() {
    val rect = Rectangle(4.0, 5.0, "red")
    rect.describe()   // A red shape with area 20.0

    val circle = Circle(3.0, "blue")
    circle.describe() // A blue shape with area 28.27...
}
```

## Sealed Classes

Restrict class hierarchies — all subclasses must be in the same file:

```kotlin
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) {
    when (result) {
        is Result.Success -> println("Success: ${result.data}")
        is Result.Error   -> println("Error: ${result.message}")
        is Result.Loading -> println("Loading...")
    }
}

fun main() {
    handleResult(Result.Success("User data loaded"))
    handleResult(Result.Error("Network failure"))
    handleResult(Result.Loading)
}
```

## Polymorphism

```kotlin
open class Animal {
    open fun speak() = println("...")
}

class Dog : Animal() { override fun speak() = println("Woof!") }
class Cat : Animal() { override fun speak() = println("Meow!") }
class Bird : Animal() { override fun speak() = println("Tweet!") }

fun main() {
    val animals: List<Animal> = listOf(Dog(), Cat(), Bird())
    animals.forEach { it.speak() }
    // Woof!
    // Meow!
    // Tweet!
}
```

## Type Checking and Smart Casts

```kotlin
fun describe(obj: Any) {
    if (obj is String) {
        println("String of length ${obj.length}")  // Smart cast
    } else if (obj is Int) {
        println("Integer: ${obj + 1}")             // Smart cast
    }
}
```

## Summary

| Concept         | Description                                         |
|-----------------|-----------------------------------------------------|
| `open`          | Allows a class/function to be inherited/overridden  |
| `override`      | Overrides a parent function or property             |
| `super`         | Calls parent class member                           |
| `abstract`      | Must be overridden; cannot be instantiated          |
| `final`         | Prevents further overriding                         |
| `sealed`        | Restricted class hierarchy in the same file         |
| Polymorphism    | Different classes treated as a common parent type   |
