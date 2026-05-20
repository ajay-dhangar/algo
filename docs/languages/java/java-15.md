---
id : polymorphism-in-java
sidebar_position: 13
title: "Polymorphism in Java"
sidebar_label: "Polymorphism"
---

# Polymorphism in Java

Polymorphism means "many forms". In Java, the same method can perform different actions depending on the object or parameters used.

Java supports two main types of polymorphism:

- Compile-time Polymorphism (Method Overloading)
- Runtime Polymorphism (Method Overriding)

---

# Method Overloading

Method Overloading happens when multiple methods have the same name but different parameters in the same class.

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

Method Overriding happens when a child class provides its own implementation of a method already present in the parent class.

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

Dynamic Method Dispatch is a process where a parent class reference points to a child class object, and the overridden method is called at runtime.

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