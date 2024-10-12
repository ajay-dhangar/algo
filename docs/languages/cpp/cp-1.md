---
id: datatypes-in-cpp
sidebar_position: 1
title: "Datatypes in C++"
sidebar_label: "Datatypes in C++"
---

Hey there! In this guide, we'll explore the different data types available in C++. Understanding data types is crucial for writing efficient and clear C++ code. Let's dive in!

* In C++, variables are containers that hold data and are defined by specifying a type followed by the variable name.
* Variables must be declared before use and can hold various data types.

## 1. Declaring Variables in C++

- To declare a variable in C++, you specify its type, followed by the variable's name.
```cpp
int age;
double salary;
char grade;
```

## 2. Initializing Variables in C++

- Variables can be initialized with a value at the time of declaration.
```cpp
int age = 25;
double salary = 45000.50;
char grade = 'A';
```

## 3. Types of Variables in C++

### a.  Integer Variables (`int`)
- Holds whole numbers, both positive and negative.
```cpp
int x = 10;
int y = -20;
```

### b. Floating-Point Variables (`float`, `double`)
- Represents real numbers, with `float` using less precision than `double`.
```cpp
float pi = 3.14f;
double gravity = 9.81;
```

### c. Character Variables (`char`)
- Stores a single character enclosed in single quotes.
```cpp
char initial = 'A';
```

### d. Boolean Variables (`bool`)
- Holds either `true` or `false` values.
```cpp
bool is_sunny = true;
bool is_raining = false;
```

### e. String Variables (`std::string`)

```python
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
print(my_tuple)   # Output: (1, 2, 3)
print(type(my_tuple)) # Output: <class 'tuple'>
```

## 4. Variable Scope
- The scope of a variable refers to the region of the program where the variable is accessible.
 - **Local Variables:** Declared inside functions or blocks, only accessible within that block.
 - **Global Variables:** Declared outside all functions and accessible from any part of the program.

### a. Local Variable Example:

```cpp
void myFunction() {
    int localVar = 10;  // Only accessible inside myFunction
}
```

### b. Global Variable Example:

```cpp
int globalVar = 20;  // Accessible throughout the program

void myFunction() {
    globalVar = 30;   // Modifying globalVar
}
```

## 5. Constant Variables
- Variables declared as `const` cannot be modified after initialization.

```cpp
const int MAX_AGE = 100;
```

## 6.  Type Conversion
C++ allows conversion between data types either implicitly or explicitly (using type casting).

### a. Implicit Type Conversion
- C++ automatically converts one type to another when necessary.
```cpp
int x = 10;
double y = x;  // Implicit conversion from int to double
```

### b. Explicit Type Conversion (Casting)
- You can explicitly convert a variable's type using type casting.
```cpp
double pi = 3.14;
int int_pi = (int)pi;  // Cast double to int
```
## 7. Dynamic Variables
- Variables that are allocated memory during runtime using pointers and dynamic memory allocation (`new` and `delete`).
```cpp
int* ptr = new int;  // Dynamically allocate memory for an integer
*ptr = 5;
delete ptr;         // Free the allocated memory
```

---

Variables are a crucial part of any C++ program, and understanding how to use them effectively is key to writing efficient C++ code.