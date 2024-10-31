---
id: coditional-statement 
title: Coditional Statement
sidebar_label: Coditional Statement
description: "This blog post explains various types of Coditional Statement used in programming with examples in C++."
tags: [programming, Coditional Statement, conditions, c++]
---
# Conditional Statements

Conditional statements allow a program to make decisions based on certain conditions. They help control the flow of execution by executing different blocks of code depending on whether a condition is true or false.

---

## Types of Conditional Statements

### 1. **if Statement**
The `if` statement executes a block of code if the specified condition evaluates to `true`.

**Syntax:**
```cpp
if (condition) {
    // Code to execute if condition is true
}
```
**Example:**
```
int age = 18;
if (age >= 18) {
    cout << "You are eligible to vote." << endl;
}
```

### 2. **if-else Statement**
The `if-else` statement provides an alternative block of code to execute if the condition is `false`.

**Syntax:**
```cpp
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}

```
**Example:**
```
int age = 16;
if (age >= 18) {
    cout << "You are eligible to vote." << endl;
} else {
    cout << "You are not eligible to vote." << endl;
}

```

### 3. **if-else if-else Ladder**
This structure allows you to test multiple conditions sequentially. The first `true` condition will be executed.


**Syntax:**
```cpp
if (condition1) {
    // Code for condition1
} else if (condition2) {
    // Code for condition2
} else {
    // Code if none of the conditions are true
}

```
**Example:**
```
int marks = 75;
if (marks >= 90) {
    cout << "Grade: A" << endl;
} else if (marks >= 75) {
    cout << "Grade: B" << endl;
} else {
    cout << "Grade: C" << endl;
}
```


### 4. **Nested if Statement**
An `if` statement inside another `if` statement. This is useful for checking multiple related conditions.


**Syntax:**
```cpp
if (condition1) {
    if (condition2) {
        // Code if both conditions are true
    }
}

```
**Example:**
```
int age = 20;
bool hasID = true;
if (age >= 18) {
    if (hasID) {
        cout << "You are allowed entry." << endl;
    }
}

```
### 5. **switch Statement**
The `switch` statement is used when you have multiple conditions based on a single variable.

**Syntax:**
```cpp
switch (expression) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Code if no case matches
}

```
**Example:**
```
int day = 3;
switch (day) {
    case 1:
        cout << "Monday" << endl;
        break;
    case 2:
        cout << "Tuesday" << endl;
        break;
    case 3:
        cout << "Wednesday" << endl;
        break;
    default:
        cout << "Invalid day" << endl;
}

```

## When to Use Each Conditional Statement

- **if Statement:** When you need to check a single condition.  
- **if-else Statement:** When there are two possibilities (true/false).  
- **if-else if-else Ladder:** When there are multiple conditions to evaluate sequentially.  
- **Nested if:** When conditions depend on each other.  
- **switch Statement:** When you have multiple values for a single variable.  

---

## Conclusion

Conditional statements are essential for controlling the flow of a program. Understanding when and how to use each type of conditional statement is crucial for writing efficient and logical code.
