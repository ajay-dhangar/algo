---
id: interfaces-in-java
sidebar_position: 9
title: "Interfaces in Java"
sidebar_label: "Interfaces in Java"
---

# Interfaces in Java

Hey there! In this guide, we'll explore the concept of interfaces in Java. Interfaces are used to define abstract methods that classes can implement, allowing for multiple inheritance and flexibility in designing systems. Let's get started!

---

## 1. What is an Interface?

An interface in Java is a reference type, similar to a class, that can contain only constants, method signatures, default methods, static methods, and nested types. The methods in interfaces are abstract by default, meaning they do not have a body.

---

## 2. Defining an Interface

In Java, you define an interface using the `interface` keyword.

#### Example:

```java
// Defining an interface
interface Animal {
    void sound(); // abstract method
}
```

---

## 3. Implementing an Interface

A class implements an interface using the `implements` keyword. The class must provide implementations for all the methods declared in the interface.

#### Example:

```java
interface Animal {
    void sound(); // abstract method
}

class Dog implements Animal {
    public void sound() {
        System.out.println("The dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound(); // Calls the sound method
    }
}
```

#### Output:

```
The dog barks
```

In this example, the `Dog` class implements the `Animal` interface and provides the implementation for the `sound` method.

---

## 4. Multiple Interfaces

A class can implement multiple interfaces, which is one way Java allows multiple inheritance.

#### Example:

```java
interface Animal {
    void sound();
}

interface Pet {
    void play();
}

class Dog implements Animal, Pet {
    public void sound() {
        System.out.println("The dog barks");
    }

    public void play() {
        System.out.println("The dog plays fetch");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound();
        myDog.play();
    }
}
```

#### Output:

```
The dog barks
The dog plays fetch
```

---

## 5. Default Methods in Interfaces

Java 8 introduced default methods, which allow methods in interfaces to have a default implementation. Classes that implement the interface can use these methods without overriding them.

#### Example:

```java
interface Animal {
    void sound();

    default void eat() {
        System.out.println("This animal is eating");
    }
}

class Dog implements Animal {
    public void sound() {
        System.out.println("The dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound();
        myDog.eat(); // Calls the default method
    }
}
```

#### Output:

```
The dog barks
This animal is eating
```

---

## 6. Static Methods in Interfaces

Java interfaces can also have static methods. These methods can be called without creating an instance of the interface.

#### Example:

```java
interface Animal {
    static void info() {
        System.out.println("Animals are living beings");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal.info(); // Calls the static method
    }
}
```

#### Output:

```
Animals are living beings
```

---

## 7. Extending Interfaces

An interface can extend another interface, allowing it to inherit the abstract methods of the parent interface.

#### Example:

```java
interface Animal {
    void sound();
}

interface Mammal extends Animal {
    void run();
}

class Dog implements Mammal {
    public void sound() {
        System.out.println("The dog barks");
    }

    public void run() {
        System.out.println("The dog runs fast");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound();
        myDog.run();
    }
}
```

#### Output:

```
The dog barks
The dog runs fast
```

---

## 8. Final Thoughts

Interfaces are a crucial part of Java's approach to achieving abstraction and multiple inheritance. They provide a flexible way to define the behaviors that different classes must implement. By using interfaces, you can create more modular and extensible applications.

Happy coding!
