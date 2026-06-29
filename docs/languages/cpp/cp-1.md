---
id: datatypes-in-cpp
sidebar_position: 2
title: "Data Types and Variables in C++"
sidebar_label: "Data Types & Variables"
tags: ["cpp", "datatypes", "variables"]
description: "Master C++ data types, including integers, floating-point numbers, characters, booleans, and strings. Learn variable declaration, initialization, scoping, type casting, and dynamic memory management."
keywords: ["C++ data types", "primitive types", "variable scope", "type casting", "dynamic allocation"]
---

In C++, data types specify the type and size of data that a variable can store. Because C++ is a **strongly-typed** and **statically-typed** language, every variable must have a declared data type before it can be used, and this type cannot change during runtime. 

Understanding how data types map to memory allocation is foundational to writing optimized, high-performance C++ applications.

## Video Explanation

<LiteYouTubeEmbed
  id="cnT1oW5_ePM"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="2.1 Data Types & Type Modifiers | Data Structures & Algorithms Course in C++ | Lecture 2.1"
  lazyLoad={true}
  webp
/>

## 1. Declaring and Initializing Variables

A **variable** is a named storage location in memory. To use a variable, you must first declare it. You can also optionally initialize it (assign an initial value) at the same time.

### Declaration

Specifies the type and the identifier (name) of the variable. This tells the compiler how much memory to reserve.

```cpp title="VariableDeclaration.cpp"
int age;          // Reserves memory for an integer
double salary;     // Reserves memory for a double-precision float
char grade;        // Reserves memory for a single character

```

### Initialization

Assigns a literal value to the allocated memory location.

```cpp title="VariableInitialization.cpp"
int age = 25;
double salary = 45000.50;
char grade = 'A';

```

## 2. Primitive Data Types Summary

The table below summarizes the core primitive data types in C++ (assuming a standard 64-bit architecture):

| Data Type | Keyword | Size (Bytes) | Typical Value Range |
| --- | --- | --- | --- |
| **Integer** | `int` | 4 bytes | $-2,147,483,648$ to $2,147,483,647$ |
| **Floating-Point** | `float` | 4 bytes | 6-7 decimal digits of precision |
| **Double Floating-Point** | `double` | 8 bytes | 15 decimal digits of precision |
| **Character** | `char` | 1 byte | ASCII characters (e.g., `'A'`, `'9'`, `'\n'`) |
| **Boolean** | `bool` | 1 byte | `true` (1) or `false` (0) |

## 3. Deep Dive: Primitive & Standard Types

### A. Integer Types (`int`)

Used for storing whole numbers without decimals.

```cpp title="IntegerExample.cpp"
int executionCount = 150;
int temperature = -12;

```

### B. Floating-Point Types (`float`, `double`)

Used for representing fractional numbers or decimals. Use the `f` suffix for `float` literals to prevent automatic promotion to `double`.

```cpp title="FloatingPointExample.cpp"
float pi = 3.14159f;       // Single precision
double precisionG = 9.80665; // Double precision (preferred for accuracy)

```

### C. Character Type (`char`)

Stores a single character enclosed in **single quotes**. Under the hood, C++ stores characters as their integer ASCII values.

```cpp title="CharacterExample.cpp"
char networkStatus = 'G'; // 'G' for Good

```

### D. Boolean Type (`bool`)

Represents conditional states. Explicitly holds either `true` or `false`.

```cpp title="BooleanExample.cpp"
bool isEngineRunning = true;
bool hasPermission = false;

```

### E. String Type (`std::string`)

Unlike primitive types, strings are compound objects provided by the Standard Library (`<string>`). They represent sequences of characters enclosed in **double quotes**.

```cpp title="StringExample.cpp"
#include <string>

std::string username = "JohnDoe_99";

```

## 4. Constant Variables (`const`)

If a variable's value should remain unchanged throughout the program's lifecycle, prepend the declaration with the `const` qualifier. Any attempt to modify a `const` variable will trigger a compilation error.

```cpp title="ConstExample.cpp"
const double COULOMBS_CONSTANT = 8.987551e9;
// COULOMBS_CONSTANT = 9.1; // Error: assignment of read-only variable

```

## 5. Variable Scope

Scope dictates the visibility and lifetime of a variable within your program.

### Local Variables

Declared inside a function or a specific code block (`{}`). They are created when the block is entered and destroyed when the block is exited.

```cpp title="LocalVariables.cpp"
void calculateMetrics() {
    int localResult = 42; // Only accessible within calculateMetrics()
}
// localResult is inaccessible here

```

### Global Variables

Declared outside of all functions. They are accessible from any point in the file after their declaration and persist for the entire duration of the application.

```cpp
int globalSystemState = 1; // Global scope

void updateState() {
    globalSystemState = 2; // Modifying global variable
}

```

:::warning Best Practice
Minimize the use of global variables. They introduce state-tracking dependencies that make code difficult to debug and multithread safely.
:::

## 6. Type Conversion (Casting)

Type conversion happens when a value of one data type is transferred to another.

### Implicit Conversion (Coercion)

Handled automatically by the compiler when converting a smaller data type to a larger data type without risk of data loss.

```cpp title="ImplicitConversion.cpp"
int basicValue = 100;
double promotedValue = basicValue; // Implicitly converted to 100.0

```

### Explicit Conversion (Casting)

Required when data loss might occur (e.g., converting a floating-point number to an integer, which truncates the decimal). Modern C++ favors `static_cast` over C-style casting for safety and clarity.

```cpp title="ExplicitConversion.cpp"
double exactMeasurement = 45.97;

// C-Style Casting (Discouraged in modern C++)
int truncatedValue = (int)exactMeasurement; // Evaluates to 45

// Modern C++ Casting (Recommended)
int refinedValue = static_cast<int>(exactMeasurement); // Evaluates to 45

```

## 7. Dynamic Variables & Memory Allocation

While standard variables are managed on the **Stack**, dynamic variables are allocated at runtime on the **Heap** using raw pointers. You must explicitly manage this memory to prevent memory leaks.

```cpp title="DynamicMemoryExample.cpp"
// 1. Allocate memory on the Heap for an integer
int* dynamicPointer = new int;  

// 2. Assign a value to the allocated memory (dereferencing)
*dynamicPointer = 500;          

// 3. Deallocate memory to prevent memory leaks
delete dynamicPointer;          

// 4. Clear pointer to prevent dangling pointer errors
dynamicPointer = nullptr;       

```

:::note
While understanding `new` and `delete` is vital for foundational C++, modern production C++ utilizes **Smart Pointers** (`std::unique_ptr`, `std::shared_ptr`) to automate this cleanup process safely.
:::