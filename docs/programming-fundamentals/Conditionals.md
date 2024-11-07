---
id: Conditionals
title: Introduction to conditinols fundamentals
sidebar_label: Conditionals
sidebar_position: 2
description: "Information About conditionals in progamming"
tags: [conditionals,fundamentals]
---


# Conditionals in C

## What are Conditionals?
Conditionals in C allow you to execute different parts of your code based on certain conditions. They help control the flow of the program by making decisions.

## Types of Conditional Statements

### 1. `if` Statement
The `if` statement executes a block of code if a specified condition is true.

#### Syntax:
```c
if (condition) {
    // code to be executed if condition is true
}
```

### Example:
```C
int num = 10;
if (num > 0) {
    printf("Number is positive.\n");
}
```

### 2. if-else Statement
The if-else statement executes one block of code if the condition is true and another block if the condition is false.

### Syntax:
```C
if (condition) {
    // code to be executed if condition is true
} else {
    // code to be executed if condition is false
}
```

### Example:
```C
int num = -5;
if (num > 0) {
    printf("Number is positive.\n");
} else {
    printf("Number is non-positive.\n");
}
```

### 3. else if Statement
You can chain multiple conditions using else if to check multiple conditions in sequence.

### Syntax:
```C
if (condition1) {
    // code for condition1
} else if (condition2) {
    // code for condition2
} else {
    // code if none of the above conditions are true
}
```

### Example:
```C
int num = 0;
if (num > 0) {
    printf("Number is positive.\n");
} else if (num < 0) {
    printf("Number is negative.\n");
} else {
    printf("Number is zero.\n");
}
```

### 4. switch Statement
The switch statement is used to select one of many blocks of code to be executed. It is often used as a more readable alternative to a series of if-else statements.

### Syntax:
```C
switch (expression) {
    case constant1:
        // code to be executed if expression equals constant1
        break;
    case constant2:
        // code to be executed if expression equals constant2
        break;
    default:
        // code to be executed if expression doesn't match any constant
}
```

### Example:
```C
int day = 3;
switch (day) {
    case 1:
        printf("Monday\n");
        break;
    case 2:
        printf("Tuesday\n");
        break;
    case 3:
        printf("Wednesday\n");
        break;
    default:
        printf("Not a valid day\n");
}
```

## Conditional Operators
C also provides several operators that can be used to form conditions.

### 1. Relational Operators
- == : Equal to
- != : Not equal to
- > : Greater than
- &lt; : Less than
- >= : Greater than or equal to
- &lt;= : Less than or equal to
  
### 2. Logical Operators
- && : Logical AND
- || : Logical OR
- ! : Logical NOT
  
### Example:
```C
int a = 5, b = 10;
if (a < b && a > 0) {
    printf("a is positive and less than b.\n");
}
```

Summary
- Conditionals allow you to control the flow of your program based on certain conditions.
- The primary conditional statements are if, if-else, else if, and switch.
- Relational and logical operators are used to create complex conditions.
