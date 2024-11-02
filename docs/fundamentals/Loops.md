---
id: loops-in-programming 
title: Loops in Programming
sidebar_label: Loops
description: "This blog post explains various types of loops used in programming with examples in C++."
tags: [programming, loops, iteration, c++]
---

# Loops in Programming

In programming, **loops** are used to execute a block of code repeatedly until a specific condition is met. Loops are essential for scenarios where you need to perform repetitive tasks, such as traversing arrays, generating patterns, or processing data structures.

---

## Types of Loops

### 1. **For Loop**
A `for` loop is used when the number of iterations is known. It consists of three parts: initialization, condition, and increment/decrement.

#### Syntax:
```cpp
for (initialization; condition; increment/decrement) {
    // Code to execute
}
```
#### Example:
```
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << "Iteration " << i << endl;
    }
    return 0;
}
```
#### Output:
```
Iteration 1
Iteration 2
Iteration 3
Iteration 4
Iteration 5
```

### 2. **While Loop**

A `while` loop keeps executing as long as the given condition is `true`. It is used when the number of iterations is not known in advance.

#### Syntax:
```
while (condition) {
    // Code to execute
}
```
#### Example:
```
#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i <= 5) {
        cout << "Iteration " << i << endl;
        i++;
    }
    return 0;
}
```
#### Output:
```
Iteration 1
Iteration 2
Iteration 3
Iteration 4
Iteration 5
```

### 3. **Do-While Loop**
A `do-while` loop is similar to a `while` loop, but it guarantees that the code inside the loop will run at least once, even if the condition is false initially.

#### Syntax:
```
do {
    // Code to execute
} while (condition);
```
#### Example:
```
#include <iostream>
using namespace std;

int main() {
    int i = 1;
    do {
        cout << "Iteration " << i << endl;
        i++;
    } while (i <= 5);
    return 0;
}
```
#### Output:
```
Iteration 1
Iteration 2
Iteration 3
Iteration 4
Iteration 5
```

### 4. **Nested Loops**
A nested loop is a loop inside another loop. It is commonly used for tasks like generating patterns or processing 2D arrays.
 
#### Example:
```
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 2; j++) {
            cout << "i = " << i << ", j = " << j << endl;
        }
    }
    return 0;
}

```
#### Output:
```
i = 1, j = 1
i = 1, j = 2
i = 2, j = 1
i = 2, j = 2
i = 3, j = 1
i = 3, j = 2

```

### 5. **Infinite Loops**
An infinite loop is a loop that runs indefinitely because the condition never becomes false.
 
#### Example:
```
#include <iostream>
using namespace std;

int main() {
    while (true) {
        cout << "This is an infinite loop!" << endl;
        break;  // Add this to avoid an infinite loop
    }
    return 0;
}

```
#### Output:
```
i = 1, j = 1
i = 1, j = 2
i = 2, j = 1
i = 2, j = 2
i = 3, j = 1
i = 3, j = 2

```


## Loop Control Statements

### 1. **Break Statement**
The break statement is used to exit a loop prematurely.

#### Example:
```
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    cout << i << " ";
}
```
#### Output: 
```
1 2 3 4 
```

### 1. **Continue Statement**
The `continue` statement is used to skip the current iteration and move to the next iteration of the loop.

#### Example:
```
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
```
#### Output: 
```
1 2 4 5
```

## Time Complexity
For, While, Do-While Loops: Each iteration typically takes `O(1)` time, so the total time complexity is proportional to the number of iterations, i.e., `O(n)`for `n` iterations.
 

## When to Use Each Loop

- **For Loop:** When the number of iterations is known beforehand.  
- **While Loop:** When the number of iterations is not known and depends on a condition.  
- **Do-While Loop:** When you need to ensure the loop runs at least once.  
 

## Conclusion

Loops are a fundamental concept in programming, allowing us to perform repetitive tasks efficiently. Knowing which type of loop to use and how to control it with statements like `break` and `continue` is essential for writing clean, efficient code.
