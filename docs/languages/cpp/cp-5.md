---
id: classes-in-cpp
sidebar_position: 3
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
