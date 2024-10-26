---
id: pillars-of-oops
title: "Pillars of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism"
sidebar_label: Pillars of OOP
sidebar_position: 4
description: "The four main pillars of OOP are abstraction, encapsulation, inheritance, and polymorphism. These principles provide a foundation for creating robust and reusable code in object-oriented systems."
tags: [oops, abstraction, encapsulation, inheritance, polymorphism]
---

# **Pillars of OOPs**

Object-Oriented Programming (OOP) is built on four main pillars: **Abstraction**, **Encapsulation**, **Inheritance**, and **Polymorphism**. Each of these concepts plays a crucial role in creating modular, reusable, and maintainable code.

---

## **1. Abstraction**

Abstraction is the process of hiding the complex implementation details and showing only the essential features of an object. It allows developers to reduce complexity by providing a simplified interface.

### **Key Points**
- Focuses on **what** an object does rather than **how** it does it.
- Achieved through abstract classes and interfaces.

### **Example of Abstraction**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() = 0; // Pure virtual function
};

class Circle : public Shape {
public:
    void draw() {
        cout << "Drawing Circle" << endl;
    }
};

int main() {
    Circle circle;
    circle.draw(); // Calls the draw method
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
abstract class Shape {
    abstract void draw(); // Abstract method
}

class Circle extends Shape {
    void draw() {
        System.out.println("Drawing Circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle();
        circle.draw(); // Calls the draw method
    }
}
```
</details>

---

## **2. Encapsulation**

Encapsulation is the bundling of data (attributes) and methods (functions) that operate on the data into a single unit called a class. It restricts direct access to some of the object's components, which is a means of preventing unintended interference and misuse.

### **Key Points**
- Protects an object's state by restricting access to its internal data.
- Achieved using access modifiers (private, protected, public).

### **Example of Encapsulation**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance; // Private data member

public:
    BankAccount() : balance(0) {} // Constructor

    void deposit(double amount) {
        balance += amount;
    }

    void displayBalance() {
        cout << "Balance: " << balance << endl;
    }
};

int main() {
    BankAccount account;
    account.deposit(1000);
    account.displayBalance(); // Displays the balance
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class BankAccount {
    private double balance; // Private data member

    public BankAccount() {
        balance = 0; // Constructor
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void displayBalance() {
        System.out.println("Balance: " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.deposit(1000);
        account.displayBalance(); // Displays the balance
    }
}
```
</details>

---

## **3. Inheritance**

Inheritance is a mechanism that allows one class to inherit the properties and behaviors (methods) of another class. It promotes code reusability and establishes a hierarchical relationship between classes.

### **Key Points**
- The class that inherits is called the **derived class** or **child class**, and the class being inherited from is called the **base class** or **parent class**.
- Supports "is-a" relationship.

### **Example of Inheritance**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    void eat() {
        cout << "Eating..." << endl;
    }
};

class Dog : public Animal { // Dog inherits from Animal
public:
    void bark() {
        cout << "Woof!" << endl;
    }
};

int main() {
    Dog dog;
    dog.eat(); // Inherited method
    dog.bark(); // Dog's own method
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Animal {
    void eat() {
        System.out.println("Eating...");
    }
}

class Dog extends Animal { // Dog inherits from Animal
    void bark() {
        System.out.println("Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat(); // Inherited method
        dog.bark(); // Dog's own method
    }
}
```
</details>

---

## **4. Polymorphism**

Polymorphism allows methods to do different things based on the object it is acting upon. It means "many forms" and can be classified into two types: **Compile-time polymorphism** and **Runtime polymorphism**.

### **4.1 Compile-time Polymorphism**

Also known as **method overloading**, it occurs when multiple methods in the same class have the same name but different parameters.

#### **Example of Compile-time Polymorphism**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Math {
public:
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
};

int main() {
    Math math;
    cout << "Int Addition: " << math.add(5, 10) << endl; // Calls int version
    cout << "Double Addition: " << math.add(5.5, 10.5) << endl; // Calls double version
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Math {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Math math = new Math();
        System.out.println("Int Addition: " + math.add(5, 10)); // Calls int version
        System.out.println("Double Addition: " + math.add(5.5, 10.5)); // Calls double version
    }
}
```
</details>

### **4.2 Runtime Polymorphism**

Also known as **method overriding**, it occurs when a derived class provides a specific implementation of a method that is already defined in its base class. The decision about which method to call is made at runtime.

#### **Example of Runtime Polymorphism**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    virtual void sound() { // Virtual method
        cout << "Animal sound" << endl;
    }
};

class Dog : public Animal {
public:
    void sound() override { // Override method
        cout << "Woof!" << endl;
    }
};

int main() {
    Animal* animal = new Dog(); // Pointer to base class
    animal->sound(); // Calls Dog's sound method
    delete animal;
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Animal {
    void sound() { // Base class method
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    void sound() { // Override method
        System.out.println("Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog(); // Reference to base class
        animal.sound(); // Calls Dog's sound method
    }
}
```
</details>

---

### Differences between Compile-time and Runtime Polymorphism

| **Feature**             | **Compile-time Polymorphism**               | **Runtime Polymorphism**                 |
|-------------------------|---------------------------------------------|------------------------------------------|
| **Definition**          | Achieved through method overloading.       | Achieved through method overriding.      |
| **Binding Time**        | Resolved during compilation.                | Resolved during runtime.                 |
| **Method Resolution**   | The compiler determines which method to call. | The JVM determines which method to call. |
| **Performance**         | Generally faster due to early binding.     | Slightly slower due to late binding.     |
| **Flexibility**         | Less flexible as the decision is made at compile time. | More flexible as the decision is made at runtime. |
| **Example**             | Overloading methods with different parameters. | Overriding a method in a derived class.  |

---
