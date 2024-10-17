---
id: classes-in-cpp
sidebar_position: 5
title: "Classes In C++"
sidebar_label: "Classes In C++"
---

Hey there! In this guide, we'll explore classes in C++. Classes are the foundation of Object-Oriented Programming (OOP) and help to encapsulate data and functions into a single entity. Let's dive in!

* C++ provides the `class` keyword to define a class.
* A class can have private and public members, including data (variables) and functions (methods).

## 1. Defining a Class

A class in C++ is a blueprint for creating objects. It defines data members and member functions that operate on the data.

#### Syntax:
```cpp
class ClassName {
    public:
        // Public members
        int dataMember;
        void memberFunction();
    
    private:
        // Private members
        int privateData;
};
```

#### Example:
```cpp
#include <iostream>
using namespace std;

class Car {
    public:
        string brand;
        int year;

        void displayDetails() {
            cout << "Brand: " << brand << ", Year: " << year << endl;
        }
};

int main() {
    Car car1;
    car1.brand = "Toyota";
    car1.year = 2020;
    car1.displayDetails();
    return 0;
}
```

#### Output:
```
Brand: Toyota, Year: 2020
```

## 2. Access Modifiers

C++ provides three access modifiers: `public`, `private`, and `protected`. They determine how members of the class can be accessed.

- `public`: Members are accessible from outside the class.
- `private`: Members are only accessible within the class.
- `protected`: Members are accessible in the class and derived classes.

#### Example:
```cpp
#include <iostream>
using namespace std;

class Person {
    private:
        int age;
    
    public:
        string name;
        
        void setAge(int a) {
            age = a;
        }
        
        int getAge() {
            return age;
        }
};

int main() {
    Person p;
    p.name = "John";
    p.setAge(25);
    cout << p.name << " is " << p.getAge() << " years old." << endl;
    return 0;
}
```

#### Output:
```
John is 25 years old.
```

## 3. Constructors

A constructor is a special function that is automatically called when an object of a class is created. Constructors are used to initialize the object’s data.

#### Syntax:
```cpp
class ClassName {
    public:
        ClassName() {
            // Constructor code
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
        int year;

        // Constructor
        Car(string b, int y) {
            brand = b;
            year = y;
        }

        void displayDetails() {
            cout << "Brand: " << brand << ", Year: " << year << endl;
        }
};

int main() {
    Car car1("Honda", 2018);
    car1.displayDetails();
    return 0;
}
```

#### Output:
```
Brand: Honda, Year: 2018
```

## 4. Destructors

A destructor is called automatically when an object is destroyed. It is used to clean up resources allocated to an object.

#### Syntax:
```cpp
class ClassName {
    public:
        ~ClassName() {
            // Destructor code
        }
};
```

#### Example:
```cpp
#include <iostream>
using namespace std;

class Car {
    public:
        Car() {
            cout << "Car object created!" << endl;
        }

        ~Car() {
            cout << "Car object destroyed!" << endl;
        }
};

int main() {
    Car car1;
    return 0;
}
```

#### Output:
```
Car object created!
Car object destroyed!
```

## 5. Inheritance

Inheritance allows a class (derived class) to inherit properties and behaviors (members) from another class (base class).

#### Syntax:
```cpp
class DerivedClass : accessSpecifier BaseClass {
    // Derived class members
};
```

#### Example:
```cpp
#include <iostream>
using namespace std;

class Animal {
    public:
        void sound() {
            cout << "Animal makes a sound." << endl;
        }
};

class Dog : public Animal {
    public:
        void bark() {
            cout << "Dog barks." << endl;
        }
};

int main() {
    Dog dog1;
    dog1.sound();
    dog1.bark();
    return 0;
}
```

#### Output:
```
Animal makes a sound.
Dog barks.
```

## 6. Polymorphism

Polymorphism allows one function to behave differently based on the object that is invoking it. C++ supports two types of polymorphism:
- **Compile-time polymorphism** (Function overloading, Operator overloading)
- **Run-time polymorphism** (Function overriding with virtual functions)

### a. Function Overloading

Function overloading allows multiple functions with the same name but different parameters.

#### Example:
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
    Math m;
    cout << m.add(5, 3) << endl;        // Outputs 8
    cout << m.add(5.5, 3.3) << endl;    // Outputs 8.8
    return 0;
}
```

#### Output:
```
8
8.8
```

### b. Function Overriding with Virtual Functions

Virtual functions are used to achieve run-time polymorphism by overriding a base class function in a derived class.

#### Example:
```cpp
#include <iostream>
using namespace std;

class Animal {
    public:
        virtual void sound() {
            cout << "Animal sound" << endl;
        }
};

class Dog : public Animal {
    public:
        void sound() override {
            cout << "Dog barks" << endl;
        }
};

int main() {
    Animal *animalPtr;
    Dog dog1;
    
    animalPtr = &dog1;
    animalPtr->sound();  // Outputs "Dog barks" due to function overriding
    return 0;
}
```

#### Output:
```
Dog barks
```

---

Classes are a core feature of C++'s object-oriented capabilities, allowing for better code organization, reuse, and encapsulation. Mastering them will enhance your understanding of OOP in C++.
id: functions-in-cpp
sidebar_position: 6
title: "Functions in C++"
sidebar_label: "Functions in C++"
---


## Introduction to Functions in C++

Functions are a fundamental building block in C++ programming. They allow you to encapsulate code for reuse, improve modularity, and enhance readability. In this guide, we will cover the types of functions, how to declare and define them, and their various components.

## 1. What is a Function?

A function is a self-contained block of code designed to perform a specific task. Functions can take inputs (arguments), perform operations, and return results.

### Benefits of Using Functions

- **Reusability**: Code can be reused multiple times without rewriting it.
- **Modularity**: Functions help break down complex problems into smaller, manageable parts.
- **Readability**: Well-named functions make the code easier to understand.

## 2. Function Declaration and Definition

### a. Function Declaration

A function declaration (or prototype) tells the compiler about the function's name, return type, and parameters. It is typically placed before the `main()` function.

```cpp
return_type function_name(parameter_type1 parameter_name1, parameter_type2 parameter_name2);

//Example: 
int add(int a, int b); // Declaration of a function named add
```

b. Function Definition
The function definition contains the actual code that performs the task.

```cpp
return_type function_name(parameter_type1 parameter_name1, parameter_type2 parameter_name2) {
    // Function body
}

```
## 3. Calling a Function
To execute a function, you simply call it by its name and pass the required arguments.

```cpp
int result = add(5, 3); // Calling the add function with arguments 5 and 3
```
## 4. Types of Functions
a. Standard Functions
These are functions that return a value and can take parameters.

Example:
```cpp
double multiply(double x, double y) {
    return x * y;
}

```
b. Void Functions
Void functions do not return a value. They perform an action but do not provide feedback to the caller.

Example:


```cpp
void printMessage() {
    std::cout << "Hello, World!" << std::endl;
}
```

c. Inline Functions
Inline functions are defined with the inline keyword and suggest to the compiler to insert the function's code directly at the point of call. This can improve performance for small, frequently called functions.

Example:

```cpp
inline int square(int x) {
    return x * x;
}
```
## 5. Function Overloading
C++ allows you to define multiple functions with the same name but different parameter types or numbers. This is called function overloading.

Example:

```cpp


int add(int a, int b) {
    return a + b;
}


double add(double a, double b) {
    return a + b;
}
```
## 6. Default Arguments
You can specify default values for function parameters. If the caller does not provide an argument for that parameter, the default value is used.

Example:

```cpp
void display(int a, int b = 10) {
    std::cout << "a: " << a << ", b: " << b << std::endl;
}

// Calling with both arguments
display(5, 15); // Outputs: a: 5, b: 15

// Calling with one argument
display(5); // Outputs: a: 5, b: 10 (default value used)
```
## 7. Recursion
A function can call itself, which is known as recursion. It is essential to have a base condition to prevent infinite recursion.

Example:

```cpp
int factorial(int n) {
    if (n <= 1) return 1; // Base condition
    return n * factorial(n - 1); // Recursive call
}
```

## 8. Conclusion
Functions are essential in C++ for creating organized, reusable, and modular code. By mastering the different types of functions, their syntax, and usage, you can write more efficient and maintainable programs. Keep practicing with functions to become proficient in C++ programming!

