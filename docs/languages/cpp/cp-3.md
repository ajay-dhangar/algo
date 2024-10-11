---
id: decision-making-in-cpp
sidebar_position: 3
title: "Decision Making in C++"
sidebar_label: "Decision Making in C++"
---


Hey there! In this guide, we'll explore decision-making in C++. Decision-making structures allow you to execute different blocks of code based on certain conditions. Let's dive in!

* Decision-making structures allow you to execute different blocks of code based on certain conditions.
* C++ provides several constructs for decision-making, including `if`, `else` `if`, `else`, and `switch`.

## 1. The `if` Statement
#### Syntax:
```cpp
if (condition) {
    // code to be executed if condition is true
}
```
#### Example: 
```cpp
int num = 10;
if (num > 0) {
    std::cout << "The number is positive." << std::endl;
}
```

## 2. The `if...else` Statement
#### Syntax:
```cpp
if (condition1) {
    // code to be executed if condition1 is true
} else if (condition2) {
    // code to be executed if condition2 is true
} else {
    // code to be executed if both conditions are false
}

```
#### Example: 
```cpp
int num = -5;
if (num > 0) {
    std::cout << "The number is positive." << std::endl;
} else {
    std::cout << "The number is not positive." << std::endl;
}
```

## 3. The `if...else if...else` Statement
#### Syntax:
```cpp
if (condition1) {
    // code to be executed if condition1 is true
} else if (condition2) {
    // code to be executed if condition2 is true
} else {
    // code to be executed if both conditions are false
}

```
#### Example: 
```cpp
int num = 0;
if (num > 0) {
    std::cout << "The number is positive." << std::endl;
} else if (num < 0) {
    std::cout << "The number is negative." << std::endl;
} else {
    std::cout << "The number is zero." << std::endl;
}

```


## 4. The `switch` Statement
#### Syntax:
```cpp
switch (expression) {
    case value1:
        // code to be executed if expression == value1
        break;
    case value2:
        // code to be executed if expression == value2
        break;
    default:
        // code to be executed if expression doesn't match any case
}
```
#### Example: 
```cpp
int day = 3;
switch (day) {
    case 1:
        std::cout << "Monday" << std::endl;
        break;
    case 2:
        std::cout << "Tuesday" << std::endl;
        break;
    case 3:
        std::cout << "Wednesday" << std::endl;
        break;
    default:
        std::cout << "Not a valid day" << std::endl;
}

```

## 5. Nested `if` Statements
#### Example: 
```cpp
int num = 15;
if (num > 10) {
    std::cout << "The number is greater than 10." << std::endl;
    if (num > 20) {
        std::cout << "The number is also greater than 20." << std::endl;
    }
}
```

## 6. Conditional Operators
C++ also supports conditional operators for compact decision-making.

#### Ternary Operator
```cpp
(condition) ? expression1 : expression2;

```

#### Example:
```cpp
int num = 10;
std::string result = (num > 0) ? "Positive" : "Non-positive";
std::cout << result << std::endl;

```

---

Understanding decision-making structures in C++ is crucial for controlling the flow of your program and executing different actions based on conditions. Happy coding!