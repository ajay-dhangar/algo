---
id: inheritance-in-java
sidebar_position: 8
title: "Inheritance in Java"
sidebar_label: "Inheritance in Java"
---

# Inheritance in Java

Hey there! In this guide, we'll explore the concept of inheritance in Java. Inheritance allows one class to inherit fields and methods from another class, promoting code reusability and organization. Let's dive in!

---

## 1. What is Inheritance?

Inheritance is a mechanism in object-oriented programming that allows one class (called the **subclass** or **child class**) to inherit properties and behaviors (fields and methods) from another class (called the **superclass** or **parent class**).

---

## 2. Syntax of Inheritance

In Java, the `extends` keyword is used to inherit a class.

#### Example:

```java
// Superclass
class Animal {
    void eat() {
        System.out.println("This animal is eating.");
    }
}

// Subclass
class Dog extends Animal {
    void bark() {
        System.out.println("The dog is barking.");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat(); // Inherited from the Animal class
        myDog.bark(); // Defined in the Dog class
    }
}
```

#### Output:

```
This animal is eating.
The dog is barking.
```

In this example, the `Dog` class inherits the `eat()` method from the `Animal` class.

---

## 3. Types of Inheritance

### 3.1 Single Inheritance

Single inheritance occurs when a subclass inherits from a single superclass.

#### Example:

```java
class A {
    void show() {
        System.out.println("Class A method");
    }
}

class B extends A {
    void display() {
        System.out.println("Class B method");
    }
}

public class Main {
    public static void main(String[] args) {
        B obj = new B();
        obj.show();
        obj.display();
    }
}
```

#### Output:

```
Class A method
Class B method
```

---

### 3.2 Multilevel Inheritance

Multilevel inheritance occurs when a class is derived from a class that is also derived from another class.

#### Example:

```java
class A {
    void show() {
        System.out.println("Class A method");
    }
}

class B extends A {
    void display() {
        System.out.println("Class B method");
    }
}

class C extends B {
    void print() {
        System.out.println("Class C method");
    }
}

public class Main {
    public static void main(String[] args) {
        C obj = new C();
        obj.show();
        obj.display();
        obj.print();
    }
}
```

#### Output:

```
Class A method
Class B method
Class C method
```

---

### 3.3 Hierarchical Inheritance

In hierarchical inheritance, multiple classes inherit from a single superclass.

#### Example:

```java
class A {
    void show() {
        System.out.println("Class A method");
    }
}

class B extends A {
    void display() {
        System.out.println("Class B method");
    }
}

class C extends A {
    void print() {
        System.out.println("Class C method");
    }
}

public class Main {
    public static void main(String[] args) {
        B obj1 = new B();
        C obj2 = new C();

        obj1.show();
        obj1.display();

        obj2.show();
        obj2.print();
    }
}
```

#### Output:

```
Class A method
Class B method
Class A method
Class C method
```

---

## 4. The `super` Keyword

The `super` keyword is used to refer to the immediate superclass's methods or constructors.

### 4.1 Using `super` to Call Superclass Methods

#### Example:

```java
class Animal {
    void sound() {
        System.out.println("Animal is making a sound");
    }
}

class Dog extends Animal {
    void sound() {
        super.sound(); // Call the superclass method
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound();
    }
}
```

#### Output:

```
Animal is making a sound
Dog is barking
```

---

### 4.2 Using `super` to Call Superclass Constructors

You can also use `super()` to call a superclass constructor.

#### Example:

```java
class Animal {
    Animal() {
        System.out.println("Animal is created");
    }
}

class Dog extends Animal {
    Dog() {
        super(); // Call superclass constructor
        System.out.println("Dog is created");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
    }
}
```

#### Output:

```
Animal is created
Dog is created
```

---

## 5. Method Overriding

Method overriding allows a subclass to provide a specific implementation of a method that is already defined in its superclass.

#### Example:

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Cat myCat = new Cat();
        myCat.sound(); // Calls the overridden method in the Cat class
    }
}
```

#### Output:

```
Cat meows
```

---

## 6. Final Thoughts

Inheritance is a fundamental concept in Java that helps you reuse code, establish relationships between classes, and create well-structured applications. By understanding inheritance and how to use it effectively, you can create more modular and maintainable Java applications.

Happy coding!
