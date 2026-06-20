\---

id: constructors

title: "Constructors"

sidebar\_label: "Constructors"

sidebar\_position: 7

description: "Comprehensive guide to constructors in C++ - purpose, types, overloading, chaining, initialization lists, and best practices."

tags: \[Constructors, Default\_Constructor, Parameterized\_Constructor, Copy\_Constructor, Initialization\_List, Constructor\_Overloading]

\---



\# Constructors in C++



Constructors are special member functions in C++ that are automatically invoked when an object of a class is created. They are primarily used to \*\*initialize\*\* the data members of the class.



\---



\## 1. Introduction to Constructors



\*\*Purpose:\*\*

\- Initialize objects with valid state.

\- Allocate resources (memory, files, etc.).

\- Enforce invariants.

\- Provide default values.



\*\*Key Characteristics:\*\*

\- Same name as the class.

\- No return type (not even `void`).

\- Can be overloaded.

\- Automatically called upon object creation.

\- Can be defined inside or outside the class.



\*\*Types of Constructors:\*\*

\- Default Constructor

\- Parameterized Constructor

\- Copy Constructor

\- Move Constructor (C++11)

\- Conversion Constructor



\---



\## 2. Default Constructor



A constructor with no parameters. If no constructor is defined, the compiler provides a default one (which does nothing for POD types).



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class Student {

public:

&#x20;   string name;

&#x20;   int rollNo;

&#x20;   

&#x20;   // Default Constructor

&#x20;   Student() {

&#x20;       name = "Unknown";

&#x20;       rollNo = 0;

&#x20;       cout << "Default Constructor called" << endl;

&#x20;   }

};



int main() {

&#x20;   Student s1;  // Default constructor called

&#x20;   cout << s1.name << " - " << s1.rollNo << endl;

&#x20;   return 0;

}

```



\*\*Output:\*\*

```text

Default Constructor called

Unknown - 0

```



\---



\## 3. Parameterized Constructor



Constructors with parameters for custom initialization.



```cpp

\#include <iostream>

using namespace std;



class Student {

public:

&#x20;   string name;

&#x20;   int rollNo;

&#x20;   

&#x20;   // Parameterized Constructor

&#x20;   Student(string n, int r) {

&#x20;       name = n;

&#x20;       rollNo = r;

&#x20;       cout << "Parameterized Constructor called" << endl;

&#x20;   }

};



int main() {

&#x20;   Student s1("Alice", 101);

&#x20;   cout << s1.name << " - " << s1.rollNo << endl;

&#x20;   return 0;

}

```



\*\*Output:\*\*

```text

Parameterized Constructor called

Alice - 101

```



\---



\## 4. Constructor Overloading



Multiple constructors with different parameter lists.



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class Rectangle {

public:

&#x20;   int length, width;

&#x20;   

&#x20;   // Default

&#x20;   Rectangle() : length(0), width(0) {}

&#x20;   

&#x20;   // Single parameter (Square)

&#x20;   Rectangle(int side) : length(side), width(side) {}

&#x20;   

&#x20;   // Two parameters

&#x20;   Rectangle(int l, int w) : length(l), width(w) {}

&#x20;   

&#x20;   void area() {

&#x20;       cout << "Area: " << length \* width << endl;

&#x20;   }

};



int main() {

&#x20;   Rectangle r1;           // Default

&#x20;   Rectangle r2(5);        // Square

&#x20;   Rectangle r3(4, 6);     // Rectangle

&#x20;   

&#x20;   r1.area();

&#x20;   r2.area();

&#x20;   r3.area();

&#x20;   return 0;

}

```



\*\*Output:\*\*

```text

Area: 0

Area: 25

Area: 24

```



\---



\## 5. Constructor Chaining / Delegation



One constructor can call another constructor of the same class (C++11+).



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class Person {

public:

&#x20;   string name;

&#x20;   int age;

&#x20;   

&#x20;   // Delegating constructor

&#x20;   Person() : Person("Anonymous", 0) {

&#x20;       cout << "Default constructor (delegated)" << endl;

&#x20;   }

&#x20;   

&#x20;   Person(string n) : Person(n, 0) {

&#x20;       cout << "Name-only constructor" << endl;

&#x20;   }

&#x20;   

&#x20;   Person(string n, int a) : name(n), age(a) {

&#x20;       cout << "Full parameterized constructor" << endl;

&#x20;   }

};



int main() {

&#x20;   Person p1;

&#x20;   Person p2("Bob");

&#x20;   Person p3("Charlie", 25);

&#x20;   return 0;

}

```



\---



\## 6. Copy Constructor



Used to create a new object as a copy of an existing object.



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class Student {

public:

&#x20;   string name;

&#x20;   int rollNo;

&#x20;   

&#x20;   // Copy Constructor

&#x20;   Student(const Student\& other) {

&#x20;       name = other.name;

&#x20;       rollNo = other.rollNo;

&#x20;       cout << "Copy Constructor called" << endl;

&#x20;   }

&#x20;   

&#x20;   Student(string n, int r) : name(n), rollNo(r) {}

};



int main() {

&#x20;   Student s1("David", 102);

&#x20;   Student s2 = s1;        // Copy Constructor called

&#x20;   Student s3(s1);         // Copy Constructor called

&#x20;   

&#x20;   cout << s2.name << endl;

&#x20;   return 0;

}

```



\*\*Note:\*\* If not defined, compiler generates a shallow copy (member-wise).



\---



\## 7. Member Initializer List



Preferred way to initialize members (especially `const`, references, and base classes).



\*\*Example:\*\*

```cpp

class Test {

&#x20;   const int value;

public:

&#x20;   Test(int v) : value(v) {  // Must use initializer list for const

&#x20;       // value = v; // ERROR

&#x20;   }

};

```



\*\*Benefits:\*\*

\- Better performance (avoids double initialization).

\- Required for certain members.



\---



\## 8. Practical Example: Complex Number Class



```cpp

\#include <iostream>

using namespace std;



class Complex {

public:

&#x20;   double real, imag;

&#x20;   

&#x20;   // Default

&#x20;   Complex() : real(0.0), imag(0.0) {}

&#x20;   

&#x20;   // Parameterized

&#x20;   Complex(double r, double i) : real(r), imag(i) {}

&#x20;   

&#x20;   // Copy Constructor

&#x20;   Complex(const Complex\& c) : real(c.real), imag(c.imag) {}

&#x20;   

&#x20;   void display() const {

&#x20;       cout << real << " + " << imag << "i" << endl;

&#x20;   }

};



int main() {

&#x20;   Complex c1;              // Default

&#x20;   Complex c2(3.5, 2.5);    // Parameterized

&#x20;   Complex c3 = c2;         // Copy

&#x20;   

&#x20;   c1.display();

&#x20;   c2.display();

&#x20;   c3.display();

&#x20;   return 0;

}

```



\---



\## 9. Best Practices \& Important Points



\- Always provide a default constructor if you define any other constructor (Rule of Three/Five).

\- Use initializer lists whenever possible.

\- Make copy constructor explicit if needed to prevent unwanted copies.

\- Consider `= default` and `= delete` (C++11).

\- Virtual destructors when using inheritance with polymorphism.

\- Avoid heavy computation in constructors.



\*\*Common Pitfalls:\*\*

\- Forgetting to initialize pointers → dangling pointers.

\- Order of initialization in initializer list must match declaration order.

\- Using `this` in constructor initializer list carefully.



\---



\## 10. Related Topics



\- Destructors

\- Rule of Three/Five/Zero

\- Move Semantics (Move Constructor \& Move Assignment)



This covers the fundamentals of constructors, which form the backbone of proper object initialization in C++.

```



This matches the style of previous docs.

