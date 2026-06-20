\---

id: access-modifiers

title: "Access Modifiers"

sidebar\_label: "Access Modifiers"

sidebar\_position: 7

description: "Detailed explanation of access modifiers in C++: public, private, protected, visibility rules, and their role in encapsulation."

tags: \[Access-Modifiers, Public, Private, Protected, Encapsulation, OOP]

\---



\# Access Modifiers in C++



Access modifiers (also known as access specifiers) control the visibility and accessibility of class members (data members and member functions) from different parts of the program. They are fundamental to implementing \*\*data encapsulation\*\* and \*\*information hiding\*\* in Object-Oriented Programming.



\---



\## 1. Introduction to Access Modifiers



\*\*Definition:\*\*

Access modifiers specify how class members can be accessed — from within the class, derived classes, or anywhere in the program.



\*\*Available Access Modifiers in C++:\*\*

\- `public`

\- `private`

\- `protected`



> \*\*Note:\*\* Unlike Java or C#, C++ does not have a built-in `internal` or package-level access modifier. Access control is primarily handled through the three specifiers above, along with `friend` declarations and namespaces for finer control.



\*\*Why Access Modifiers Matter:\*\*

\- Enforce encapsulation

\- Prevent accidental modification of internal state

\- Improve code security and maintainability

\- Support the principle of least privilege



\---



\## 2. Public Access Modifier



Members declared as `public` are accessible from anywhere in the program — inside the class, from derived classes, and from outside the class.



\*\*Use Case:\*\*

\- Interface methods and public API of the class.



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class Student {

public:

&#x20;   string name;           // Public data member

&#x20;   void display() {       // Public member function

&#x20;       cout << "Name: " << name << endl;

&#x20;   }

};



int main() {

&#x20;   Student s;

&#x20;   s.name = "Alice";      // Accessible outside class

&#x20;   s.display();

&#x20;   return 0;

}

```



\*\*Output:\*\*

```text

Name: Alice

```



\---



\## 3. Private Access Modifier



Members declared as `private` are accessible \*\*only within the same class\*\*. They cannot be accessed directly from outside the class or from derived classes.



\*\*Use Case:\*\*

\- Internal state and helper functions that should remain hidden.



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class BankAccount {

private:

&#x20;   double balance;        // Private data



public:

&#x20;   BankAccount(double initial) : balance(initial) {}



&#x20;   void deposit(double amount) {

&#x20;       if (amount > 0) balance += amount;

&#x20;   }



&#x20;   double getBalance() const {  // Public getter

&#x20;       return balance;

&#x20;   }

};



int main() {

&#x20;   BankAccount acc(1000);

&#x20;   acc.deposit(500);

&#x20;   cout << "Balance: " << acc.getBalance() << endl;

&#x20;   // acc.balance = 9999; // ERROR: private member inaccessible

&#x20;   return 0;

}

```



\*\*Output:\*\*

```text

Balance: 1500

```



\---



\## 4. Protected Access Modifier



Members declared as `protected` are accessible within the \*\*same class\*\* and in \*\*derived classes\*\*, but not from outside the class hierarchy.



\*\*Use Case:\*\*

\- Members that derived classes need to access or override, but should remain hidden from external code.



\*\*Example:\*\*

```cpp

\#include <iostream>

using namespace std;



class Vehicle {

protected:

&#x20;   int speed;



public:

&#x20;   Vehicle() : speed(0) {}

&#x20;   void accelerate(int increment) {

&#x20;       speed += increment;

&#x20;   }

};



class Car : public Vehicle {

public:

&#x20;   void showSpeed() {

&#x20;       cout << "Car speed: " << speed << " km/h" << endl;  // Accessible because protected

&#x20;   }

};



int main() {

&#x20;   Car myCar;

&#x20;   myCar.accelerate(60);

&#x20;   myCar.showSpeed();

&#x20;   return 0;

}

```



\*\*Output:\*\*

```text

Car speed: 60 km/h

```



\---



\## 5. Summary of Access Modifiers



| Access Specifier | Accessible in Same Class | Accessible in Derived Class | Accessible Outside Class |

|------------------|---------------------------|-----------------------------|--------------------------|

| `public`         | Yes                       | Yes                         | Yes                      |

| `protected`      | Yes                       | Yes                         | No                       |

| `private`        | Yes                       | No                          | No                       |



\*\*Default Access:\*\*

\- `class` → members are `private` by default

\- `struct` → members are `public` by default



\---



\## 6. Visibility and Scope



\- \*\*Class Scope:\*\* Access modifiers define visibility rules within the class hierarchy.

\- \*\*Friend Functions/Classes:\*\* A `friend` declaration can bypass access restrictions, allowing external functions or classes to access private/protected members.

\- \*\*Namespaces:\*\* Provide another layer of scoping but do not replace access modifiers.



\*\*Example of `friend`:\*\*

```cpp

class Box {

private:

&#x20;   int length;

public:

&#x20;   friend void printLength(Box b);  // Friend function

};



void printLength(Box b) {

&#x20;   cout << "Length: " << b.length << endl;  // Can access private member

}

```



\---



\## 7. Relationship with Encapsulation



Access modifiers are the primary mechanism for \*\*encapsulation\*\* — bundling data and methods while restricting direct access to internal details.



\*\*Benefits:\*\*

\- \*\*Data Hiding:\*\* Prevents external code from corrupting object state.

\- \*\*Interface vs Implementation:\*\* Expose only necessary public methods.

\- \*\*Maintainability:\*\* Internal changes (e.g., changing private fields) do not break external code.

\- \*\*Security:\*\* Reduces attack surface by limiting direct manipulation of sensitive data.



\*\*Getters and Setters Pattern:\*\*

```cpp

class Person {

private:

&#x20;   int age;



public:

&#x20;   int getAge() const { return age; }

&#x20;   void setAge(int a) {

&#x20;       if (a >= 0) age = a;

&#x20;   }

};

```



\---



\## 8. Best Practices



1\. \*\*Prefer Private by Default:\*\* Make members private unless they need wider access.

2\. \*\*Use Protected Sparingly:\*\* Only when inheritance design genuinely requires it.

3\. \*\*Provide Public Interface:\*\* Use public methods (getters/setters or actions) to control access.

4\. \*\*Minimize Friend Usage:\*\* `friend` breaks encapsulation — use only when necessary.

5\. \*\*Const Correctness:\*\* Make getters `const` whenever possible.

6\. \*\*Avoid Public Data Members:\*\* Expose behavior, not data.



\*\*Security \& Maintainability Benefits:\*\*

\- Makes code more robust against misuse.

\- Easier refactoring of internal implementation.

\- Better team collaboration through clear contracts.

\- Supports the Open-Closed Principle.



\---



\*\*Mastering access modifiers is key to writing clean, secure, and maintainable C++ code.\*\*

```

