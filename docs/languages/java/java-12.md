---
id : functional-programming
sidebar_position: 12
title: "Functional programming in Java"
sidebar_label: "functional programming"
---

# Functional Programming in Java

Functional Programming in Java is a style of writing code where you focus on functions and immutability (not changing things). It is a way of programming that treats computation like a mathematical function and avoids changing data or using variables that can change over time.. Java introduced functional programming features in Java 8, including lambdas, streams, and functional interfaces.

## Table of Contents
- [Introduction](#introduction)
- [Key Concepts](#key-concepts)
  - [Immutability](#immutability)
  - [Higher-Order Functions](#higher-order-functions)
  - [Pure Functions](#pure-functions)
- [Java Functional Programming Features](#java-functional-programming-features)
  - [Lambda Expressions](#lambda-expressions)
  - [Streams API](#streams-api)
- [Conclusion](#conclusion)

---

## Introduction

Functional programming focuses on using functions to process data, avoid side effects, and work with immutable data. Java 8 introduced lambda expressions, streams for a more functional approach to programming.

---

## Key Concepts

### Immutability
Immutability means that once an object is created, it cannot be modified. Functional programming encourages immutable data to avoid side effects and make code more predictable.

```java
public final class Person {
    private final String name;
    private final int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // No setters, only getters
}
```

### Higher Order Functions
Functions that take other functions as arguments or return functions are called higher-order functions.

```java
Function<Integer, Integer> add = x -> x + 1;
Function<Integer, Integer> multiply = x -> x * 2;
```

### Pure Functions
A function is pure if it always produces the same output for the same input and has no side effects.

```java
public int add(int a, int b) {
    return a + b;  // Always returns the same result
}

```
## Java Functional Programming Features
### Lambda Expressions
Lambda expressions enable you to pass behavior as arguments to methods, making your code more readable and flexible, especially in contexts like streams and event handling.

### Syntax of a Lambda Expression in Java:
```java
(parameters) -> expression
```

### Example
```java
(a, b) -> a + b  // A lambda expression that adds two numbers
```

### Streams API
The Streams API in Java, introduced in Java 8, is a powerful and flexible feature that enables functional-style operations on sequences of elements, such as collections (e.g., List, Set, Map). It allows you to process collections of data in a declarative way, making the code more readable, concise, and expressive.

### Syntax
```java
// From a collection
Stream<T> stream = collection.stream();
```

### Example
```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
int sum = numbers.stream()
                  .filter(n -> n % 2 == 0)   // Filter even numbers
                  .map(n -> n * 2)           // Double each number
                  .reduce(0, (a, b) -> a + b);  // Sum them up
```

## Conclusion
Java's functional programming features such as lambda expressions, the Streams API that allow for more concise and readable code. 