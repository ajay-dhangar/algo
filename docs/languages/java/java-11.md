---
id: generics-in-java
sidebar_position: 11
title: "Generics in Java"
sidebar_label: "Generics in Java"
---


# Generics in Java

Generics in Java allow you to write more flexible, reusable, and type-safe code. With generics, you can define classes, interfaces, and methods with type parameters, so you can create code that works with any type of data, while still maintaining type safety.

## Table of Contents
1. [What Are Generics?](#what-are-generics)
2. [Why Use Generics?](#why-use-generics)
3. [Generic Classes](#generic-classes)
4. [Generic Methods](#generic-methods)
5. [Bounded Type Parameters](#bounded-type-parameters)
6. [Limitations of Generics](#limitations-of-generics)
7. [Conclusion](#conclusion)

---

## What Are Generics?

Generics allow you to define classes, interfaces, and methods with **type parameters**. A type parameter is a placeholder for an actual type (like `String`, `Integer`, or even custom types) that will be passed at runtime.

Generics enable you to work with different types of objects without losing type safety. When you use generics, you can avoid **ClassCastException** by catching errors at compile-time instead of runtime.

### Syntax:
```java
class Box<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

## Why Use Generics?
Generics provide several benefits:

1. Type Safety: Generics eliminate the need for casting and reduce the risk of ClassCastException by ensuring type consistency at compile-time.
2. Code Reusability: With generics, you can write classes, interfaces, and methods that can operate on any type of data.
3. Maintainability: Code using generics is easier to maintain because the types are clear and explicit.
4. Avoids Casting: Using generics removes the need to cast objects to specific types, reducing errors.

## Generic Classes
A generic class is a class that can operate on objects of different types. You can define a class that works with any type by using a type parameter.

```java
class Box<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.setValue(10);
        System.out.println(intBox.getValue());  // Outputs: 10

        Box<String> strBox = new Box<>();
        strBox.setValue("Hello Generics");
        System.out.println(strBox.getValue());  // Outputs: Hello Generics
    }
}

```

## Generic Methods
You can also define methods with generic type parameters. A generic method allows you to define a method that works with any type, without specifying the type when the method is declared.

```java
public class GenericMethodExample {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.println(element);
        }
    }

    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3, 4};
        String[] strArray = {"Hello", "Generics"};

        printArray(intArray);  // Works with Integer
        printArray(strArray);  // Works with String
    }
}

```

## Bounded Type Parameters
You can restrict the types that can be passed as type arguments using bounded type parameters. This is useful when you want to ensure that the type passed is a subclass of a particular class or implements a certain interface.

```java
// Restricting T to be a subclass of Number
public class NumberBox<T extends Number> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}

```
In the example above, T extends Number means T can only be a subclass of Number (e.g., Integer, Double, etc.).

## Limitations of Generics

1. Cannot Instantiate Generic Types: You cannot create instances of a generic type directly (e.g., new T()).
2. Primitive Types: You cannot use primitive types (like int, char) as type parameters. You must use their wrapper classes (Integer, Character).
3. Cannot Create Arrays of Generics: You cannot create an array of a generic type (e.g., new T[10] is not allowed).

## Conclusion
Generics in Java provide a powerful mechanism for writing flexible, reusable, and type-safe code. They allow you to define classes, methods, and interfaces that can operate on any object type while maintaining compile-time type safety.
