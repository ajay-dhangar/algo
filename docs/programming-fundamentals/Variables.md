---
id: Variables
title: Introduction to variables fundamentals
sidebar_label: Variables
sidebar_position: 6
description: "Information About variables in progamming"
tags: [variables,fundamentals]
---

# Variables in C

## What are Variables?
Variables in C are containers used to store data values. Each variable is given a specific type, which defines the kind of data it can hold, like integers, floating-point numbers, characters, etc.

## Declaration and Initialization
A variable must be declared before it can be used. You can also initialize a variable with a value when you declare it.

### Syntax:
```c
data_type variable_name;
data_type variable_name = value;
```

### Example:
```C
int age = 21;        // Integer variable initialized with value 21
float height = 5.9;  // Float variable initialized with value 5.9
char grade = 'A';    // Character variable initialized with value 'A'
```

### Multiple Declarations:
You can declare multiple variables of the same type in one line.

```C
int a = 5, b = 10, c = 15;
```

### Types of Variables
C supports several data types to store various kinds of data:

1. int: Used to store integer values (whole numbers).
int count = 10;
Range: -32,768 to 32,767 (typically 2 bytes, but depends on system).

2. float: Used to store single-precision floating-point numbers (decimals).
float price = 19.99;
Precision: Up to 7 decimal digits.

3. double: Used to store double-precision floating-point numbers (larger decimals).
double bigNumber = 12345.6789;
Precision: Up to 15 decimal digits.

4. char: Used to store single characters.
char initial = 'A';

5. _Bool: Used to store boolean values (true/false). In C, true is represented by 1 and false by 0.
_Bool isTrue = 1;

6. unsigned int: Used to store only non-negative integers.
unsigned int age = 25;
Range: 0 to 65,535 (for 2 bytes).


### Scope of Variables
The scope of a variable defines the region of the program where the variable can be accessed.

1. Local Variables: Declared inside a function or block, and they can only be accessed within that function/block.
```C
void myFunction() {
    int x = 10;  // Local variable
}
```

2. Global Variables: Declared outside all functions, and they can be accessed by any function within the program.
```C
int globalVar = 20;

void myFunction() {
    // globalVar can be accessed here
}
```

3. Static Variables: Variables that maintain their value between function calls. They are initialized only once.
```C
void myFunction() {
    static int counter = 0;  // Static variable
    counter++;
}
```

4. Register Variables: Stored in CPU registers instead of RAM, providing faster access. These are recommended for frequently used variables.
```C
register int fastCounter = 0;
```

### Storage Classes
Storage classes in C define the scope, lifetime, and visibility of variables.

1. auto: The default storage class for local variables.
```C
auto int num = 10;
```

2. extern: Used to declare a global variable that is defined elsewhere.
```C
extern int globalVar;
```

3. static: Limits the scope of a variable to its source file or function, while preserving its value across function calls.
```C
static int count = 0;
```

4. register: Suggests that the compiler store the variable in a CPU register for faster access.
```C
register int i = 5;
```

### Variable Naming Rules
- Names can contain letters, digits, and underscores (_), but the first character must be a letter or underscore.
- Keywords cannot be used as variable names.
- C is case-sensitive, so num and Num would be considered different variables.

  
### Example:
```C
int count;
float _price;
double price123;
```

### Constants
Constants are variables whose values cannot be changed once initialized. In C, constants are defined using the const keyword or #define preprocessor directive.

### Using `const`:
```C
const int MAX = 100;
```

### Using #define:
```C
#define PI 3.14159
```

### Summary
- Variables store data and can be of different types such as int, float, char, etc.
- Variables have a scope that defines where they can be accessed within a program.
- Storage classes modify the scope and lifetime of a variable.
- Constants are variables whose value cannot be changed after initialization.
