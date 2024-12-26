---
id: basic dsa
title: Operator overloading
sidebar_label: Introduction to Operator Overloading
sidebar_position: 2
description: 'Operator overloading allows you to redefine the way operators work for user-defined types (classes and structs). It enables you to specify more intuitive ways to perform operations on objects of your classes.'
tags: [dsa, data-structures, Operator Overloading]
---

## 2 Operator Overloading

### Introduction 

Operator overloading allows you to redefine the way operators work for user-defined types (classes and structs). It enables you to specify more intuitive ways to perform operations on objects of your classes.

Overloading an operator does not change:
- the operator precedence,
- the associativity of the operator,
- the arity of the operator, or
- the meaning of how the operator works on objects of
built-in types.

### Syntax
An overloaded operator is implemented as a special member function with the keyword `operator` followed by the symbol of the operator being overloaded.

```cpp
class ClassName {
public:
    ReturnType operatorOpSymbol (ParameterList) {
        // Function body
    }
};
```
### Example
```cpp
class Complex {
public:
    double real, imag;
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    // Overload the + operator
    Complex operator+ (Complex& obj) {
        return Complex(real + obj.real, imag + obj.imag);
    }
};
```

### Types of Operators that Can Be Overloaded

- Arithmetic operators: `+`, `-`, `*`, `/`, `%`
- Relational operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical operators: `&&`, `||`, `!`
- Bitwise operators: `&`, `|`, `^`, `~`, `<<`, `>>`
- Increment and decrement operators: `++`, `--`
- Assignment operators: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
- Subscript operator: `[]`
- Function call operator: `()`
- Member access operators: `->`, `.` (only for pointers to members)
- Input and output operators: `>>`, `<<`

Operators that **cannot** be overloaded include: `::`, `.*`, `.`, `? :`, `sizeof`

### Example:
```cpp
#include <iostream>

class Complex {
public:
    double real, imag;

    Complex(double r = 0, double i = 0) : real(r), imag(i) {}

    // Overload the == operator
    bool operator== (const Complex& obj) const {
        return (real == obj.real && imag == obj.imag);
    }
};

int main() {
    Complex c1(3.0, 4.0), c2(3.0, 4.0);
    if (c1 == c2) {
        std::cout << "c1 and c2 are equal" << std::endl;
    } else {
        std::cout << "c1 and c2 are not equal" << std::endl;
    }
    return 0;
}
```

### Operator Overloading Rules

When overloading operators, there are several rules to keep in mind:

1. **Preserve the Operator's Original Meaning**: The overloaded operator should make sense in the context of the operation it performs.
2. **Return Types**: The return type should be appropriate for the operation. For example, `operator+` should return a new object, while `operator+=` should return a reference to `*this`.
3. **Symmetry**: Ensure symmetric behavior where applicable. For example, `a == b` should return the same result as `b == a`.
4. **Do Not Overload Operators Irrelevantly**: Only overload operators that make sense for your class. For example, overloading the arithmetic operators for a class that represents a complex number makes sense, but overloading them for a class that represents a database connection does not.
