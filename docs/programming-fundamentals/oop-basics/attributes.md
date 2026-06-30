---
id: attributes
title: "Attributes"
sidebar_label: "Attributes"
sidebar_position: 7
description: "Deep dive into attributes (data members) in C++ classes: object state, fields vs properties, getters/setters, and encapsulation techniques."
tags: [Attributes, Data-Members, Encapsulation, Getters-Setters, OOP]
---
# Attributes in C++

Attributes, also known as data members or fields, represent the state of an object in a C++ class. They store the data that defines an object's characteristics and enable data encapsulation.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. Introduction to Attributes

**Definition:**  
Attributes are variables declared inside a class that hold the data (state) of objects created from that class.

**Key Concepts:**
- **Object State:** The current values of all attributes of an object.
- **Data Representation:** How real-world entities are modeled using primitive or complex data types within a class.

**Syntax:**
```cpp
class ClassName {
public:
    // Attribute declarations
    data_type attributeName;
};
```

**Example - Basic Attributes:**
```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;     // Attribute
    int rollNo;      // Attribute
    float gpa;       // Attribute
};

int main() {
    Student s1;
    s1.name = "Alice";
    s1.rollNo = 101;
    s1.gpa = 9.2;

    cout << "Name: " << s1.name << endl;
    cout << "Roll No: " << s1.rollNo << endl;
    cout << "GPA: " << s1.gpa << endl;
    return 0;
}
```

**Output:**
```text
Name: Alice
Roll No: 101
GPA: 9.2
```

## 2. Fields vs Properties

In C++, we primarily work with **fields** (data members). The term "Properties" is more common in languages like C# with built-in support for getters/setters. In C++, we simulate properties using **getters and setters**.

| Aspect              | Fields (Data Members)                  | Properties (Simulated in C++)              |
|---------------------|----------------------------------------|--------------------------------------------|
| Direct Access       | Can be public (direct access)          | Controlled via getter/setter methods       |
| Validation          | No built-in validation                 | Validation possible in setters             |
| Encapsulation       | Low if public                          | High (data hiding)                         |
| Syntax              | Simple variable declaration            | Pair of member functions                   |
| Memory              | Direct storage                         | No extra storage (just methods)            |

**Recommendation:** Prefer private fields + public getters/setters for better design.

## 3. Getters and Setters

Getters (accessors) retrieve attribute values.  
Setters (mutators) modify attribute values with optional validation.

**Example:**
```cpp
#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance = 0.0; // Private field

public:
    // Getter
    double getBalance() const {
        return balance;
    }

    // Setter with validation
    void setBalance(double newBalance) {
        if (newBalance >= 0) {
            balance = newBalance;
        } else {
            cout << "Error: Balance cannot be negative!" << endl;
        }
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
};

int main() {
    BankAccount acc;
    acc.setBalance(5000.0);
    cout << "Balance: " << acc.getBalance() << endl;
    acc.deposit(1500.0);
    cout << "Balance after deposit: " << acc.getBalance() << endl;
    return 0;
}
```

**Output:**
```text
Balance: 5000
Balance after deposit: 6500
```

**Benefits of Getters/Setters:**
- Control read/write access
- Add validation logic
- Enable future changes without breaking client code (interface remains the same)

## 4. Data Encapsulation Techniques

Encapsulation is the bundling of data (attributes) and methods that operate on that data within a class, while restricting direct access to some components.

### Access Specifiers for Encapsulation

| Specifier   | Class | Derived Class | Outside Class | Use Case                  |
|-------------|-------|---------------|---------------|---------------------------|
| `public`    | Yes   | Yes           | Yes           | Interface methods         |
| `protected` | Yes   | Yes           | No            | Inheritance hierarchy     |
| `private`   | Yes   | No            | No            | Internal state (most attributes) |

**Best Practice:** Make data members `private` and expose them only through public methods.

**Advanced Encapsulation Techniques:**
1. **Immutable Objects** — Use `const` and remove setters.
2. **PImpl Idiom** — Hide implementation details.
3. **Const Correctness** — Use `const` member functions for getters.

**Example - Strong Encapsulation:**
```cpp
#include <iostream>
using namespace std;

class Rectangle {
private:
    double length;
    double width;

public:
    Rectangle(double l, double w) : length(l), width(w) {}

    double getArea() const {
        return length * width;
    }

    // Controlled modification (no direct setters)
    void scale(double factor) {
        if (factor > 0) {
            length *= factor;
            width *= factor;
        }
    }
};

int main() {
    Rectangle rect(5.0, 3.0);
    cout << "Area: " << rect.getArea() << endl;
    rect.scale(2.0);
    cout << "Area after scaling: " << rect.getArea() << endl;
    return 0;
}
```

**Output:**
```text
Area: 15
Area after scaling: 60
```

## 5. Best Practices for Attributes

- **Prefer Initialization** in constructors over assignment in the body.
- **Use `const`** for attributes that should not change after construction.
- **Avoid public data members** unless in simple data structs (`struct`).
- **Group related attributes** logically.
- **Minimize class size** — only store necessary state.
- **Use meaningful names** (e.g., `customerEmail` instead of `e`).
- **Prefer `std::string`** over C-style strings for text attributes.
- **Consider thread safety** for shared mutable state.

**Why Encapsulation Matters:**
- Protects object integrity
- Reduces coupling between classes
- Makes code easier to maintain and debug
- Supports future evolution of internal representation

---
