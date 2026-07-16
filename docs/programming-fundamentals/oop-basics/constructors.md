---
id: constructors
title: "Constructors"
sidebar_label: "Constructors"
sidebar_position: 7
description: "Comprehensive guide to constructors in C++ - purpose, types, overloading, chaining, initialization lists, and best practices."
tags: ["Constructors", "Default Constructor", "Parameterized Constructor", "Copy Constructor", "Initialization List", "Constructor Overloading"]
---

Constructors are special member functions in C++ that are automatically invoked when an object of a class is created. They are primarily used to **initialize** the data members of the class.

## Video Explanation

<LiteYouTubeEmbed
  id="y9KRmJAmmN4"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="constructor and destructor in c++ | constructor and destructor in hindi | constructor in c++"
  lazyLoad={true}
  webp
/>

## 1. Introduction to Constructors

**Purpose:**
- Initialize objects with valid state.
- Allocate resources (memory, files, etc.).
- Enforce invariants.
- Provide default values.

**Key Characteristics:**
- Same name as the class.
- No return type (not even `void`).
- Can be overloaded.
- Automatically called upon object creation.
- Can be defined inside or outside the class.

**Types of Constructors:**
- Default Constructor
- Parameterized Constructor
- Copy Constructor
- Move Constructor (C++11)
- Conversion Constructor

## 2. Default Constructor

A constructor with no parameters. If no constructor is defined, the compiler provides a default one (which does nothing for POD types).

**Example:**

```cpp
#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int rollNo;
    
    // Default Constructor
    Student() {
        name = "Unknown";
        rollNo = 0;
        cout << "Default Constructor called" << endl;
    }
};

int main() {
    Student s1;  // Default constructor called
    cout << s1.name << " - " << s1.rollNo << endl;
    return 0;
}
```

**Output:**

```text
Default Constructor called
Unknown - 0
```

## 3. Parameterized Constructor

Constructors with parameters for custom initialization.

```cpp
#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int rollNo;
    
    // Parameterized Constructor
    Student(string n, int r) {
        name = n;
        rollNo = r;
        cout << "Parameterized Constructor called" << endl;
    }
};

int main() {
    Student s1("Alice", 101);
    cout << s1.name << " - " << s1.rollNo << endl;
    return 0;
}
```

**Output:**

```text
Parameterized Constructor called
Alice - 101
```

## 4. Constructor Overloading

Multiple constructors with different parameter lists.

**Example:**

```cpp
#include <iostream>
using namespace std;

class Rectangle {
public:
    int length, width;
    
    // Default
    Rectangle() : length(0), width(0) {}
    
    // Single parameter (Square)
    Rectangle(int side) : length(side), width(side) {}
    
    // Two parameters
    Rectangle(int l, int w) : length(l), width(w) {}
    
    void area() {
        cout << "Area: " << length * width << endl;
    }
};

int main() {
    Rectangle r1;           // Default
    Rectangle r2(5);        // Square
    Rectangle r3(4, 6);     // Rectangle
    
    r1.area();
    r2.area();
    r3.area();
    return 0;
}
```

**Output:**

```text
Area: 0
Area: 25
Area: 24
```

## 5. Constructor Chaining / Delegation

One constructor can call another constructor of the same class (C++11+).

**Example:**

```cpp
#include <iostream>
using namespace std;

class Person {
public:
    string name;
    int age;
    
    // Delegating constructor
    Person() : Person("Anonymous", 0) {
        cout << "Default constructor (delegated)" << endl;
    }
    
    Person(string n) : Person(n, 0) {
        cout << "Name-only constructor" << endl;
    }
    
    Person(string n, int a) : name(n), age(a) {
        cout << "Full parameterized constructor" << endl;
    }
};

int main() {
    Person p1;
    Person p2("Bob");
    Person p3("Charlie", 25);
    return 0;
}
```

## 6. Copy Constructor

Used to create a new object as a copy of an existing object.

**Example:**

```cpp
#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int rollNo;
    
    // Copy Constructor
    Student(const Student &other) {
        name = other.name;
        rollNo = other.rollNo;
        cout << "Copy Constructor called" << endl;
    }
    
    Student(string n, int r) : name(n), rollNo(r) {}
};

int main() {
    Student s1("David", 102);
    Student s2 = s1;        // Copy Constructor called
    Student s3(s1);         // Copy Constructor called
    
    cout << s2.name << endl;
    return 0;
}
```

**Note:** If not defined, compiler generates a shallow copy (member-wise).

## 7. Member Initializer List

Preferred way to initialize members (especially `const`, references, and base classes).

**Example:**

```cpp
class Test {
    const int value;
public:
    Test(int v) : value(v) {  // Must use initializer list for const
        // value = v; // ERROR
    }
};
```

**Benefits:**
- Better performance (avoids double initialization).
- Required for certain members.

---

## 8. Practical Example: Complex Number Class

```cpp
#include <iostream>
using namespace std;

class Complex {
public:
    double real, imag;
    
    // Default
    Complex() : real(0.0), imag(0.0) {}
    
    // Parameterized
    Complex(double r, double i) : real(r), imag(i) {}
    
    // Copy Constructor
    Complex(const Complex &c) : real(c.real), imag(c.imag) {}
    
    void display() const {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1;              // Default
    Complex c2(3.5, 2.5);    // Parameterized
    Complex c3 = c2;         // Copy
    
    c1.display();
    c2.display();
    c3.display();
    return 0;
}
```

---

## 9. Best Practices & Important Points

- Always provide a default constructor if you define any other constructor (Rule of Three/Five).
- Use initializer lists whenever possible.
- Make copy constructor explicit if needed to prevent unwanted copies.
- Consider `= default` and `= delete` (C++11).
- Virtual destructors when using inheritance with polymorphism.
- Avoid heavy computation in constructors.

**Common Pitfalls:**
- Forgetting to initialize pointers $\rightarrow$ dangling pointers.
- Order of initialization in initializer list must match declaration order.
- Using `this` in constructor initializer list carefully.