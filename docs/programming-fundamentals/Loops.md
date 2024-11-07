---
id: Loops
title: Introduction to loops fundamentals
sidebar_label: Loops
sidebar_position: 5
description: "Information About loops in progamming"
tags: [loops,fundamentals]
---

# Loops in C

## What are Loops?
Loops in C are used to execute a block of code repeatedly until a specified condition is met. They are essential for performing repetitive tasks efficiently.

## Types of Loops

### 1. `for` Loop
The `for` loop is used when the number of iterations is known beforehand. It consists of three parts: initialization, condition, and increment/decrement.

#### Syntax:
```c
for (initialization; condition; increment/decrement) {
    // code to be executed
}
```

#### Example:
```C
for (int i = 0; i < 5; i++) {
    printf("Iteration: %d\n", i);
}
```

### 2. while Loop
The while loop is used when the number of iterations is not known, and the loop continues until the condition is false.

#### Syntax:
```C
while (condition) {
    // code to be executed
}
```

#### Example:
```C
int i = 0;
while (i < 5) {
    printf("Iteration: %d\n", i);
    i++;
}
```

### 3. do-while Loop
The do-while loop is similar to the while loop, but it guarantees that the loop body will be executed at least once, as the condition is checked after the execution of the loop body.

#### Syntax:
```C
do {
    // code to be executed
} while (condition);
```

#### Example:
```C
int i = 0;
do {
    printf("Iteration: %d\n", i);
    i++;
} while (i < 5);
```

## Loop Control Statements
Loop control statements allow you to control the flow of the loop.

### 1. break
The break statement is used to exit a loop prematurely.

#### Example:
```C
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exit the loop when i is 5
    }
    printf("%d\n", i);
}
````

### 2. continue
The continue statement is used to skip the current iteration of the loop and move to the next iteration.

#### Example:
```C
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue; // Skip even numbers
    }
    printf("%d\n", i);
}
```

### Nested Loops
You can use loops inside other loops, known as nested loops. This is useful for working with multi-dimensional data structures.

#### Example:
```C
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 2; j++) {
        printf("i: %d, j: %d\n", i, j);
    }
}
```

### Summary
- Loops allow you to execute a block of code repeatedly based on a condition.
- The primary types of loops are for, while, and do-while.
- Loop control statements like break and continue help manage the flow of loops.
- Nested loops can be used for working with multi-dimensional data.
