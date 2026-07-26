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

## Video Explanation

<LiteYouTubeEmbed
  id="1oOWq4rpXIg"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Class Member Functions (aka Methods) | C++ Tutorial"
  lazyLoad={true}
  webp
/>

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
    returnType methodName(parameters) {
        // method body
    }
};
```

## 2. Method Declaration and Invocation

### Declaration
Methods are declared inside the class definition.

```cpp
class Calculator {
public:
    // Declaration
    int add(int a, int b);
};
```

### Definition (Implementation)
Can be inside the class (inline) or outside using scope resolution operator `::`.

**Inside class:**
```cpp
class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
};
```

**Outside class:**
```cpp
class Calculator {
public:
    int add(int a, int b);
};

int Calculator::add(int a, int b) {
    return a + b;
}
```

### Invocation
Call methods using the dot (`.`) operator on objects.

```cpp
#include <iostream>
using namespace std;

int main() {
    Calculator calc;
    int result = calc.add(5, 3); // Invocation
    cout << "Sum: " << result << endl;
    return 0;
}
```

**Output:**
```text
Sum: 8
```

## 3. Parameters and Return Types

### Parameters
- **Formal Parameters:** Declared in method signature.
- **Actual Parameters:** Passed during invocation.
- Can be passed by value, by reference (`&`), or by pointer (`*`).

**Example:**
```cpp
class MathUtils {
public:
    // Pass by value
    int square(int num) {
        return num * num;
    }

    // Pass by reference
    void swap(int &a, int &b) {
        int temp = a;
        a = b;
        b = temp;
    }
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
    string name;
public:
    // No return (void)
    void setName(string n) {
        name = n;
    }

    // Return primitive
    int getAge() {
        return 25;
    }

    // Return object/reference
    string getName() {
        return name;
    }
};
```

## 4. Instance vs Static Methods

### Instance Methods
- Belong to objects (instances) of the class.
- Can access both instance and static members.
- Called using object.

```cpp
class Counter {
    int count = 0;
public:
    // Instance method
    void increment() {
        count++;
    }

    int getCount() {
        return count;
    }
};

int main() {
    Counter c1, c2;
    c1.increment();
    cout << c1.getCount() << endl; // 1
    return 0;
}
```

### Static Methods
- Belong to the class itself.
- Cannot access non-static (instance) members.
- Called using class name.
- Useful for utility functions.

```cpp
#include <iostream>
using namespace std;

class Math {
public:
    // Static method
    static int add(int a, int b) {
        return a + b;
    }

    static const double PI;
};

const double Math::PI = 3.14159;

int main() {
    cout << Math::add(10, 20) << endl; // 30
    cout << Math::PI << endl;
    return 0;
}
```

**Key Differences:**

| Feature                  | Instance Method                  | Static Method                     |
|--------------------------|----------------------------------|-----------------------------------|
| Access                   | Object (`.`)                     | Class (`::`)                      |
| Can access instance data | Yes                              | No                                |
| Can access static data   | Yes                              | Yes                               |
| `this` pointer           | Available                        | Not available                     |
| Use case                 | Object-specific behavior         | Utility / class-level operations  |

## 5. Method Design Best Practices

1. **Single Responsibility Principle**  
   Each method should do one thing well.

2. **Meaningful Names**  
   Use verbs for methods: `calculateTotal()`, `validateInput()`.

3. **Parameter Limits**  
   Keep number of parameters low (ideally ≤ 4). Use objects/structs for many parameters.

4. **Const Correctness**  
   Use `const` for methods that don't modify object state.
   ```cpp
   int getValue() const { return value; }
   ```

5. **Avoid Global/State Dependencies**  
   Prefer pure functions where possible.

6. **Error Handling**  
   Use exceptions or return error codes appropriately.

7. **Overloading**  
   Methods can be overloaded with different parameters.
   ```cpp
   class Printer {
   public:
       void print(int n);
       void print(double d);
       void print(string s);
   };
   ```

8. **Default Arguments**  
   Provide sensible defaults.
   ```cpp
   void log(string message, int level = 1);
   ```

9. **Inline vs Out-of-line**  
   Define small methods inside class for better performance (inlining).

10. **Documentation**  
    Always add comments describing purpose, parameters, and return value.

## 6. Advanced Topics

### Method Overriding (in Inheritance)
Covered in Inheritance documentation. Use `virtual` for polymorphic behavior.

### Const Member Functions
Prevent accidental modification of object state.

### Friend Functions
Non-member functions granted access to private members.

---

**Following these guidelines will help you write clean, maintainable, and efficient methods in your C++ programs.**