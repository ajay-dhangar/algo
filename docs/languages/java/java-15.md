---
id: polymorphism-in-java
sidebar_position: 13
title: Polymorphism in Java
sidebar_label: Polymorphism
description: >-
  Learn about Polymorphism in Java in the Java programming language with core
  concepts, syntax, code examples, and best practices.
tags:
  - programming
  - dsa
  - java
  - polymorphism in java
---

# Polymorphism in Java

Polymorphism means "many forms". In Java, the same method can perform different actions depending on the object or parameters used.

Java supports two main types of polymorphism:

- Compile-time Polymorphism (Method Overloading)
- Runtime Polymorphism (Method Overriding)

---

# Method Overloading

Method Overloading means creating multiple methods with the same name in the same class but with different parameters.

The method performs similar tasks in different ways depending on the number or type of arguments passed.

It is called compile-time polymorphism because the compiler decides which method to call during compilation.

For example:

add(int a, int b)

add(int a, int b, int c)

Both methods have the same name but different parameters.
It is an example of compile-time polymorphism.

## Example

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}

public class Main {
    public static void main(String[] args) {

        Calculator obj = new Calculator();

        System.out.println(obj.add(5, 10));
        System.out.println(obj.add(5, 10, 15));
    }
}
```

## Output

```text
15
30
```

---

# Method Overriding

Method Overriding happens when a child class defines the same method that already exists in the parent class.

The child class gives its own implementation of that method.

It is called runtime polymorphism because Java decides at runtime which method should run.

For example:

Parent class method → sound()

Child class method → sound()

The child class method overrides the parent class method.
It is an example of runtime polymorphism.

## Example

```java
class Animal {

    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {

        Dog obj = new Dog();
        obj.sound();
    }
}
```

## Output

```text
Dog barks
```

---

# Dynamic Method Dispatch

Dynamic Method Dispatch is the process where a parent class reference points to a child class object.

When an overridden method is called, Java decides at runtime which version of the method should execute.

It helps achieve runtime polymorphism.

For example:

`Animal obj = new Dog();` 

`obj.sound();` 

Here:

obj is parent class reference
Dog() is child class object

Java will call the Dog class method at runtime.

## Example

```java
class Vehicle {

    void start() {
        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {

    @Override
    void start() {
        System.out.println("Car starts with key");
    }
}

public class Main {
    public static void main(String[] args) {

        Vehicle obj = new Car();

        obj.start();
    }
}
```

## Output

```text
Car starts with key
```

---

# Conclusion

Polymorphism allows Java programs to become more flexible and reusable. Method Overloading and Method Overriding help developers use the same method name in different ways, while Dynamic Method Dispatch enables runtime decision-making in Java applications.
