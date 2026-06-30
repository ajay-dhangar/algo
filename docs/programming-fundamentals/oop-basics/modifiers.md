---
id: access-modifiers
title: "Access Modifiers"
sidebar_label: "Access Modifiers"
sidebar_position: 7
description: "Complete guide to public, private, and protected access modifiers in C++, encapsulation, friend functions, and best practices."
tags: [Access-Modifiers, Public, Private, Protected, Encapsulation, OOP, Friend]
---

# Access Modifiers in C++

Access modifiers control the **visibility** and **accessibility** of class members, forming the foundation of **encapsulation** in OOP.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

---

## 1. Introduction

C++ provides three access specifiers:
- `public`
- `protected`
- `private`

**Default Behavior:**
- `class` → members are `private` by default
- `struct` → members are `public` by default

---

## 2. Public

Accessible from **anywhere**.

**Example:**
```cpp
#include <iostream>
using namespace std;

class Student {
public:
    string name;

    void display() {
        cout << "Name: " << name << endl;
    }
};

int main() {
    Student s;
    s.name = "Alice";
    s.display();
    return 0;
}
```

---

## 3. Private

Accessible **only within the same class**.

**Example:**
```cpp
#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;

public:
    BankAccount(double initial) : balance(initial) {}

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount acc(1000);
    acc.deposit(500);
    cout << "Balance: " << acc.getBalance() << endl;
    return 0;
}
```

---

## 4. Protected

Accessible within the class and **derived classes**.

**Example:**
```cpp
#include <iostream>
using namespace std;

class Vehicle {
protected:
    int speed = 0;

public:
    void accelerate(int inc) { speed += inc; }
};

class Car : public Vehicle {
public:
    void showSpeed() {
        cout << "Speed: " << speed << " km/h\n";
    }
};

int main() {
    Car c;
    c.accelerate(80);
    c.showSpeed();
    return 0;
}
```

---

## 5. Summary Table

| Specifier   | Same Class | Derived Class | Outside Class |
|-------------|------------|---------------|---------------|
| `public`    | Yes        | Yes           | Yes           |
| `protected` | Yes        | Yes           | No            |
| `private`   | Yes        | No            | No            |

---

## 6. Friend Functions & Classes

`friend` keyword bypasses access rules.

```cpp
class Box {
private:
    int length;

public:
    friend void printLength(Box b);
};

void printLength(Box b) {
    cout << "Length: " << b.length << endl;
}
```

---

## 7. Relationship with Inheritance

Access modifiers affect how base class members are inherited (see Inheritance documentation).

---

## 8. Best Practices

1. Make data members `private` by default.
2. Provide public getters/setters or methods.
3. Use `protected` only when needed for inheritance.
4. Minimize use of `friend`.
5. Follow const-correctness.

These two files are now ready for download.