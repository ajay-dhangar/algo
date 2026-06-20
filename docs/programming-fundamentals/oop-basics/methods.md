---

id: methods

title: "Methods"

sidebar_label: "Methods"

sidebar_position: 7

description: "Comprehensive guide to methods in C++: declaration, invocation, parameters, return types, instance vs static, and best practices."

tags: [Methods, Functions, OOP, C++, Best-Practices]

---



# Methods in C++



In C++, methods (also called member functions) are functions defined inside a class. They define the behavior of objects and are central to Object-Oriented Programming.



---



## 1. Introduction to Methods



**Definition:**  

A method is a function associated with a class or object. It can access and modify the data members of the class.



**Key Benefits:**

- Encapsulation: Methods control access to data.

- Code Reusability: Common operations are defined once.

- Abstraction: Hide implementation details.



**Syntax:**

```cpp

class ClassName {

public:

&#x20;   returnType methodName(parameters) {

&#x20;       // method body

&#x20;   }

};

```



---



## 2. Method Declaration and Invocation



### Declaration

Methods are declared inside the class definition.



```cpp

class Calculator {

public:

&#x20;   // Declaration

&#x20;   int add(int a, int b);

};

```



### Definition (Implementation)

Can be inside the class (inline) or outside using scope resolution operator `::`.



**Inside class:**

```cpp

class Calculator {

public:

&#x20;   int add(int a, int b) {

&#x20;       return a + b;

&#x20;   }

};

```



**Outside class:**

```cpp

class Calculator {

public:

&#x20;   int add(int a, int b);

};



int Calculator::add(int a, int b) {

&#x20;   return a + b;

}

```



### Invocation

Call methods using the dot (`.`) operator on objects.



```cpp

int main() {

&#x20;   Calculator calc;

&#x20;   int result = calc.add(5, 3);  // Invocation

&#x20;   cout << "Sum: " << result << endl;

&#x20;   return 0;

}

```



**Output:**

```text

Sum: 8

```



---



## 3. Parameters and Return Types



### Parameters

- **Formal Parameters:** Declared in method signature.

- **Actual Parameters:** Passed during invocation.

- Can be passed by value, by reference (`&`), or by pointer (`*`).



**Example:**

```cpp

class MathUtils {

public:

&#x20;   // Pass by value

&#x20;   int square(int num) {

&#x20;       return num * num;

&#x20;   }

&#x20;   

&#x20;   // Pass by reference

&#x20;   void swap(int &a, int &b) {

&#x20;       int temp = a;

&#x20;       a = b;

&#x20;       b = temp;

&#x20;   }

};

```



### Return Types

- Any valid C++ type: `void`, `int`, `double`, custom objects, references, pointers, etc.

- Use `void` for methods that don't return a value.



**Example with different return types:**

```cpp

#include <iostream>

#include <string>

using namespace std;



class Person {

&#x20;   string name;

public:

&#x20;   // No return (void)

&#x20;   void setName(string n) {

&#x20;       name = n;

&#x20;   }

&#x20;   

&#x20;   // Return primitive

&#x20;   int getAge() {

&#x20;       return 25;

&#x20;   }

&#x20;   

&#x20;   // Return object/reference

&#x20;   string getName() {

&#x20;       return name;

&#x20;   }

};

```



---



## 4. Instance vs Static Methods



### Instance Methods

- Belong to objects (instances) of the class.

- Can access both instance and static members.

- Called using object.



```cpp

class Counter {

&#x20;   int count = 0;

public:

&#x20;   // Instance method

&#x20;   void increment() {

&#x20;       count++;

&#x20;   }

&#x20;   

&#x20;   int getCount() {

&#x20;       return count;

&#x20;   }

};



int main() {

&#x20;   Counter c1, c2;

&#x20;   c1.increment();

&#x20;   cout << c1.getCount() << endl;  // 1

&#x20;   return 0;

}

```



### Static Methods

- Belong to the class itself.

- Cannot access non-static (instance) members.

- Called using class name.

- Useful for utility functions.



```cpp

class Math {

public:

&#x20;   // Static method

&#x20;   static int add(int a, int b) {

&#x20;       return a + b;

&#x20;   }

&#x20;   

&#x20;   static const double PI;

};



const double Math::PI = 3.14159;



int main() {

&#x20;   cout << Math::add(10, 20) << endl;  // 30

&#x20;   cout << Math::PI << endl;

&#x20;   return 0;

}

```



**Key Differences:**



| Feature                  | Instance Method              | Static Method                  |

|--------------------------|------------------------------|--------------------------------|

| Access                   | Object (`.`)                 | Class (`::`)                   |

| Can access instance data | Yes                          | No                             |

| Can access static data   | Yes                          | Yes                            |

| `this` pointer           | Available                    | Not available                  |

| Use case                 | Object-specific behavior     | Utility / class-level operations |



---



## 5. Method Design Best Practices



1. **Single Responsibility Principle**  

&#x20;  Each method should do one thing well.



2. **Meaningful Names**  

&#x20;  Use verbs for methods: `calculateTotal()`, `validateInput()`.



3. **Parameter Limits**  

&#x20;  Keep number of parameters low (ideally ≤ 4). Use objects/structs for many parameters.



4. **Const Correctness**  

&#x20;  Use `const` for methods that don't modify object state.



&#x20;  ```cpp

&#x20;  int getValue() const { return value; }

&#x20;  ```



5. **Avoid Global/State Dependencies**  

&#x20;  Prefer pure functions where possible.



6. **Error Handling**  

&#x20;  Use exceptions or return error codes appropriately.



7. **Overloading**  

&#x20;  Methods can be overloaded with different parameters.



&#x20;  ```cpp

&#x20;  class Printer {

&#x20;  public:

&#x20;      void print(int n);

&#x20;      void print(double d);

&#x20;      void print(string s);

&#x20;  };

&#x20;  ```



8. **Default Arguments**  

&#x20;  Provide sensible defaults.



&#x20;  ```cpp

&#x20;  void log(string message, int level = 1);

&#x20;  ```



9. **Inline vs Out-of-line**  

&#x20;  Define small methods inside class for better performance (inlining).



10. **Documentation**  

&#x20;   Always add comments describing purpose, parameters, and return value.



---



## 6. Advanced Topics



### Method Overriding (in Inheritance)

Covered in Inheritance documentation. Use `virtual` for polymorphic behavior.



### Const Member Functions

Prevent accidental modification.



### Friend Functions

Non-member functions granted access to private members.



---



**Following these guidelines will help you write clean, maintainable, and efficient methods in your C++ programs.**

