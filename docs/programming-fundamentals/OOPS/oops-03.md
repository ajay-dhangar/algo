---
id: constructors-and-destructors
title: Constructors and Destructors in OOP
sidebar_label: Constructors and Destructors
sidebar_position: 3
description: "Constructors and destructors are special methods in OOP that handle object initialization and cleanup. Constructors set up the initial state, while destructors handle object destruction and resource management."
tags: [oops, constructors, destructors]
---

# **Constructors and Destructors**

Constructors and destructors are **special member functions** in object-oriented programming (OOP) that are automatically called when an object is created or destroyed, respectively. They are essential for initializing and cleaning up resources used by objects.

---

## **1. What is a Constructor?**

A **constructor** is a special function that initializes an object when it is created. It has the same name as the class and does not have a return type. Constructors can take parameters to initialize object attributes.

### **Types of Constructors**
- **Default Constructor**: A constructor that does not take any parameters.
- **Parameterized Constructor**: A constructor that takes parameters to set initial values for the object.

### **Example of Constructors**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Rectangle {
private:
    int width, height;

public:
    // Default Constructor
    Rectangle() {
        width = 0;
        height = 0;
    }

    // Parameterized Constructor
    Rectangle(int w, int h) {
        width = w;
        height = h;
    }

    void display() {
        cout << "Width: " << width << ", Height: " << height << endl;
    }
};

int main() {
    Rectangle rect1; // Default constructor
    Rectangle rect2(10, 5); // Parameterized constructor

    rect1.display();
    rect2.display();
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Rectangle {
    private int width, height;

    // Default Constructor
    Rectangle() {
        width = 0;
        height = 0;
    }

    // Parameterized Constructor
    Rectangle(int w, int h) {
        width = w;
        height = h;
    }

    void display() {
        System.out.println("Width: " + width + ", Height: " + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle(); // Default constructor
        Rectangle rect2 = new Rectangle(10, 5); // Parameterized constructor

        rect1.display();
        rect2.display();
    }
}
```
</details>

<details>
<summary><strong>JavaScript Code</strong></summary>

```js
class Rectangle {
    // Default Constructor
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }

    // Method to display width and height
    display() {
        console.log(`Width: ${this.width}, Height: ${this.height}`);
    }
}

// Main code to demonstrate constructors
const rect1 = new Rectangle();        // Default constructor
const rect2 = new Rectangle(10, 5);   // Parameterized constructor

rect1.display(); // Output: Width: 0, Height: 0
rect2.display(); // Output: Width: 10, Height: 5

```
</details>

---

## **2. What is a Destructor?**

A **destructor** is a special function that is called when an object is destroyed. It has the same name as the class but is preceded by a tilde (~) in C++. Destructors are used to release resources allocated to the object, such as memory or file handles.

### **Example of Destructors**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Rectangle {
private:
    int width, height;

public:
    Rectangle(int w, int h) : width(w), height(h) {
        cout << "Constructor called!" << endl;
    }

    ~Rectangle() {
        cout << "Destructor called!" << endl;
    }

    void display() {
        cout << "Width: " << width << ", Height: " << height << endl;
    }
};

int main() {
    Rectangle rect(10, 5);
    rect.display();
    return 0; // Destructor is called automatically here
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Rectangle {
    private int width, height;

    Rectangle(int w, int h) {
        width = w;
        height = h;
        System.out.println("Constructor called!");
    }

    // Finalize method acts as a destructor in Java
    protected void finalize() {
        System.out.println("Destructor called!");
    }

    void display() {
        System.out.println("Width: " + width + ", Height: " + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle(10, 5);
        rect.display();
        rect = null; // Request garbage collection
        System.gc(); // Calling garbage collector
    }
}
```
</details>

<details>
<summary><strong>JavaScript Code</strong></summary>

```js
// In JavaScript, there is no explicit destructor like in Java or C++. Instead, memory management is handled
//  automatically by the garbage collector. However, you can mimic the behavior of a destructor using the 
//  finalize method available via the FinalizationRegistry, which lets you run cleanup code when an object 
//  is garbage collected.

class Rectangle {
    #width;  // Private field
    #height; // Private field

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
        console.log("Constructor called!");
    }

    // Method to display width and height
    display() {
        console.log(`Width: ${this.#width}, Height: ${this.#height}`);
    }
}

// Create a FinalizationRegistry to simulate destructor
const registry = new FinalizationRegistry(() => {
    console.log("Destructor called!");
});

// Main code
let rect = new Rectangle(10, 5);
rect.display();

// Register the object for cleanup when it's garbage collected
registry.register(rect, "Rectangle Instance");

// Simulate object being nullified and garbage collected
rect = null;
globalThis.gc?.(); // This is optional; the garbage collector runs automatically

```
</details>

---

## **3. Importance of Constructors and Destructors**

- **Resource Management**: Constructors are used to allocate resources, while destructors are used to release them. This ensures that resources are properly managed and prevents memory leaks.
- **Initialization**: Constructors allow for setting initial values for object attributes, providing a clear and consistent way to create objects.

---