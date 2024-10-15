---
id: classes-in-cpp
sidebar_position: 6
title: "Classes In C++"
sidebar_label: "Classes In C++"
---

# Classes in C++

Hey there! In this guide, we'll explore classes in C++. Classes are the foundation of Object-Oriented Programming (OOP) in C++. They allow you to define your own data types, complete with attributes and behaviors. Let's dive in!

---

## 1. Defining a Class

A class is a blueprint for creating objects. It can contain variables (attributes) and functions (methods).

#### Syntax:

```cpp
class ClassName {
public:
    // attributes
    int attribute;

    // methods
    void method() {
        // code to be executed
    }
};
```

#### Example:

```cpp
#include <iostream>
using namespace std;

class Car {
public:
    string brand;
    string model;
    int year;

    void display() {
        cout << "Brand: " << brand << ", Model: " << model << ", Year: " << year << endl;
    }
};

int main() {
    Car car1;
    car1.brand = "Toyota";
    car1.model = "Corolla";
    car1.year = 2020;
    car1.display();

    return 0;
}
```

#### Output:

```
Brand: Toyota, Model: Corolla, Year: 2020
```

---

## 2. Constructors

Constructors are special functions that are automatically called when an object is created. They are used to initialize object attributes.

#### Example:

```cpp
#include <iostream>
using namespace std;

class Car {
public:
    string brand;
    string model;
    int year;

    // Constructor
    Car(string b, string m, int y) {
        brand = b;
        model = m;
        year = y;
    }

    void display() {
        cout << "Brand: " << brand << ", Model: " << model << ", Year: " << year << endl;
    }
};

int main() {
    Car car1("Toyota", "Corolla", 2020);
    car1.display();

    return 0;
}
```

#### Output:

```
Brand: Toyota, Model: Corolla, Year: 2020
```

---

## 3. Access Modifiers

Access modifiers control the access level of class members. The most common are `public`, `private`, and `protected`.

### 3.1 Public

Members declared as `public` can be accessed from outside the class.

#### Example:

```cpp
class Car {
public:
    string brand; // Accessible from outside
};
```

### 3.2 Private

Members declared as `private` can only be accessed from within the class.

#### Example:

```cpp
class Car {
private:
    string brand; // Not accessible from outside

public:
    void setBrand(string b) {
        brand = b;
    }

    string getBrand() {
        return brand;
    }
};
```

### 3.3 Protected

Protected members are similar to private members but can be accessed in derived classes.

#### Example:

```cpp
class Vehicle {
protected:
    string type;
};
```

---

## 4. Member Functions

Member functions operate on objects and can access and modify its attributes.

#### Example:

```cpp
class Car {
public:
    string brand;

    void setBrand(string b) {
        brand = b;
    }

    void display() {
        cout << "Brand: " << brand << endl;
    }
};
```

---

## 5. Inheritance

Inheritance allows a class to inherit attributes and methods from another class.

#### Syntax:

```cpp
class DerivedClass : public BaseClass {
    // additional members
};
```

#### Example:

```cpp
#include <iostream>
using namespace std;

class Vehicle {
public:
    string brand = "Toyota";
};

class Car : public Vehicle {
public:
    string model = "Corolla";
};

int main() {
    Car car1;
    cout << "Brand: " << car1.brand << ", Model: " << car1.model << endl;
    return 0;
}
```

#### Output:

```
Brand: Toyota, Model: Corolla
```

---

## 6. Polymorphism

Polymorphism allows methods to do different things based on the object that invokes them.

### 6.1 Function Overriding

You can override a base class method in the derived class.

#### Example:

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    void sound() {
        cout << "This is an animal sound." << endl;
    }
};

class Dog : public Animal {
public:
    void sound() {
        cout << "The dog barks." << endl;
    }
};

int main() {
    Dog dog1;
    dog1.sound(); // Calls the overridden method in Dog class
    return 0;
}
```

#### Output:

```
The dog barks.
```

---

Classes are essential in C++ for creating objects that represent real-world entities. Understanding how to define classes, use constructors, and leverage OOP principles like inheritance and polymorphism will greatly improve your ability to write clean, reusable, and maintainable code!
