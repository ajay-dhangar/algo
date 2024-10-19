---
id: interface-vs-abstract-class
title: Interface vs Abstract Class in OOP
sidebar_label: Interface vs Abstract Class
sidebar_position: 5
description: "An interface defines a contract for behavior, whereas an abstract class provides partial implementation. Both are used to achieve abstraction but differ in their design and use cases."
tags: [oops, interface, abstract-class]
---

# **Interface vs Abstract Classes**

In object-oriented programming, both **interfaces** and **abstract classes** are used to achieve abstraction, allowing you to define methods that must be implemented by derived classes. However, they serve different purposes and have distinct characteristics.

---

## **1. What is an Abstract Class?**

An **abstract class** is a class that cannot be instantiated on its own and is meant to be subclassed. It can contain both abstract methods (without implementation) and concrete methods (with implementation). Abstract classes are used to provide a common base for derived classes.

### **Key Features of Abstract Classes**
- Can have both abstract and concrete methods.
- Can have member variables.
- Can provide a default implementation for some methods.

### **Example of Abstract Class**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    // Abstract method
    virtual void sound() = 0; // Pure virtual function

    void sleep() {
        cout << "Sleeping..." << endl;
    }
};

class Dog : public Animal {
public:
    void sound() {
        cout << "Woof!" << endl;
    }
};

int main() {
    Dog dog;
    dog.sound(); // Calls the sound method
    dog.sleep(); // Calls the sleep method from the Animal class
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
abstract class Animal {
    // Abstract method
    abstract void sound();

    void sleep() {
        System.out.println("Sleeping...");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.sound(); // Calls the sound method
        dog.sleep(); // Calls the sleep method from the Animal class
    }
}
```
</details>

<details>
<summary><strong>JavaScript Code</strong></summary>

```js
//JavaScript doesn't have a built-in concept of abstract classes like in Java or C++, but you can mimic this 
//behavior using a combination of class inheritance and throwing errors when an abstract method is not implemented.

class Animal {
    // Abstract method
    sound() {
        throw new Error("Abstract method 'sound' must be implemented by subclass");
    }

    // Concrete method
    sleep() {
        console.log("Sleeping...");
    }
}

class Dog extends Animal {
    // Implement the abstract method
    sound() {
        console.log("Woof!");
    }
}

// Main code
const dog = new Dog();
dog.sound(); // Calls the sound method
dog.sleep(); // Calls the sleep method from the Animal class

```
</details>

--- 
## **2. What is an Interface?**

An **interface** is a contract that defines a set of methods that implementing classes must provide. It cannot contain any implementation itself (in languages like Java) and is used to achieve multiple inheritance.

### **Key Features of Interfaces**
- Can only contain abstract methods (Java 8 and above allows default methods).
- Cannot have member variables (only constants).
- Supports multiple inheritance.

### **Example of Interface**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class IAnimal {
public:
    virtual void sound() = 0; // Pure virtual function
};

class Cat : public IAnimal {
public:
    void sound() {
        cout << "Meow!" << endl;
    }
};

int main() {
    Cat cat;
    cat.sound(); // Calls the sound method
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
interface IAnimal {
    void sound(); // Abstract method
}

class Cat implements IAnimal {
    public void sound() {
        System.out.println("Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.sound(); // Calls the sound method
    }
}
```
</details>

<details>
<summary><strong>JavaScript Code</strong></summary>

```js
// JavaScript does not have a built-in concept of interfaces like Java or C++, but you can simulate 
// interfaces by defining a structure that classes must follow.

class IAnimal {
    sound() {
        throw new Error("Method 'sound()' must be implemented");
    }
}

class Cat extends IAnimal {
    // Implementing the sound method
    sound() {
        console.log("Meow!");
    }
}

// Main code
const cat = new Cat();
cat.sound(); // Calls the sound method

```
</details>


---

## **3. Key Differences Between Abstract Classes and Interfaces**

| Feature                      | Abstract Class                          | Interface                                   |
|------------------------------|----------------------------------------|---------------------------------------------|
| **Instantiation**            | Cannot be instantiated                 | Cannot be instantiated                      |
| **Method Implementation**     | Can have both abstract and concrete methods | Can only have abstract methods (until Java 8) |
| **Inheritance**              | Can extend only one abstract class     | Can implement multiple interfaces           |
| **Access Modifiers**         | Can use any access modifier            | All methods are public by default           |
| **Member Variables**          | Can have member variables              | Cannot have member variables                |

---