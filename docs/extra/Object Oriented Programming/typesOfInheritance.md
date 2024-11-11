---

id: inheritance
title: "Types of Inheritance in OOP"
sidebar_label: Types of Inheritance
sidebar_position: 3
description: "Inheritance is a mechanism in OOP that allows one class to inherit the properties and behaviors of another class, promoting code reusability."
tags: [oops, inheritance, classes]

---

# **Types of Inheritance in Object-Oriented Programming**

Inheritance is a key concept in Object-Oriented Programming (OOP) that allows one class (child or derived class) to inherit attributes and methods from another class (parent or base class). This promotes code reusability and establishes a relationship between classes.

## **Types of Inheritance**

1. **Single Inheritance**: A child class inherits from one parent class.
2. **Multiple Inheritance**: A child class inherits from multiple parent classes.
3. **Multilevel Inheritance**: A child class inherits from a parent class, which in turn inherits from another parent class.
4. **Hierarchical Inheritance**: Multiple child classes inherit from a single parent class.
5. **Hybrid Inheritance**: A combination of two or more types of inheritance.

### **1. Single Inheritance**

In single inheritance, a class inherits from one parent class.

```cpp
class Animal {
public:
    void sound() {
        cout << "Animal makes a sound" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Dog barks" << endl;
    }
};
```

### 2. Multiple Inheritance

In multiple inheritance, a class inherits from more than one parent class. (Note: Not supported directly in Java, but can be achieved through interfaces.)


```cpp
class Flyer {
public:
    void fly() {
        cout << "Flying" << endl;
    }
};

class Swimmer {
public:
    void swim() {
        cout << "Swimming" << endl;
    }
};

class Duck : public Flyer, public Swimmer {
};
```

### **3. Multilevel Inheritance**
In multilevel inheritance, a class inherits from a parent class, which is also a derived class of another parent class.

```cpp
class Animal {
public:
    void eat() {
        cout << "Eating" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Barking" << endl;
    }
};

class Puppy : public Dog {
public:
    void weep() {
        cout << "Weeping" << endl;
    }
};
```

### **4. Hierarchical Inheritance**
In hierarchical inheritance, multiple child classes inherit from a single parent class.

```cpp
class Animal {
public:
    void eat() {
        cout << "Eating" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Barking" << endl;
    }
};

class Cat : public Animal {
public:
    void meow() {
        cout << "Meowing" << endl;
    }
};
```
