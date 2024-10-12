---
id: loops-in-cpp
sidebar_position: 3
title: "Loops In C++"
sidebar_label: "Loops In C++"
---

Hey there! In this guide, we'll explore loops in C++. Loops are used to execute a block of code repeatedly based on specific conditions. Let's dive in!

* C++ provides several types of loops that allow you to execute a block of code multiple times based on specific conditions.
* The main types of loops in C++ are `for`, `while`, and `do-while`.

## 1. For Loop
The for loop is used when you know how many times you want to execute a statement or a block of statements.
#### Syntax:
```cpp
for(initialization; condition; increment/decrement) {
    // code to be executed
}
```
#### Example: 
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << "Iteration " << i << endl;
    }
    return 0;
}
```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

## 2. While Loop
The `while` loop is used when you want to execute a block of code as long as a specified condition is true.
#### Syntax:
```cpp
while(condition) {
    // code to be executed
}

```
#### Example: 
```cpp
i#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 5) {
        cout << "Iteration " << i << endl;
        i++;
    }
    return 0;
}
```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

## 3. Do-While Loop
The `do-while` loop is similar to the `while` loop, except that it guarantees that the code block will be executed at least once before the condition is tested.

#### Syntax:
```cpp
do {
    // code to be executed
} while(condition);
```
#### Example: 
```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 0;
    do {
        cout << "Iteration " << i << endl;
        i++;
    } while (i < 5);
    return 0;
}
```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```


## 4. Nested Loops
You can also use loops inside other loops, which are called nested loops.

#### Example: 
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 2; j++) {
            cout << "Outer Loop: " << i << ", Inner Loop: " << j << endl;
        }
    }
    return 0;
}
```

```
Outer Loop: 1, Inner Loop: 1
Outer Loop: 1, Inner Loop: 2
Outer Loop: 2, Inner Loop: 1
Outer Loop: 2, Inner Loop: 2
Outer Loop: 3, Inner Loop: 1
Outer Loop: 3, Inner Loop: 2

```

## 5. Break and Continue Statements

### a. Break Statement
The `break` statement is used to exit a loop prematurely.

#### Example: 
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            break; // Exit the loop when i equals 5
        }
        cout << "Iteration " << i << endl;
    }
    return 0;
}
```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

### b. Break Statement
The `continue` statement skips the current iteration and proceeds to the next one.

#### Example:
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        if (i == 2) {
            continue; // Skip the iteration when i equals 2
        }
        cout << "Iteration " << i << endl;
    }
    return 0;
}

```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

---

Loops are essential for controlling the flow of execution in your C++ programs, enabling you to perform repetitive tasks efficiently. Understanding how to use them effectively will greatly enhance your programming skills!