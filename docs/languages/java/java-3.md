---
id: decision-making-in-java
sidebar_position: 3
title: "Decision Making in Java"
sidebar_label: "Decision Making in Java"
---

Hey there! In this guide, we'll explore decision-making in Java. Decision-making structures allow you to execute different blocks of code based on certain conditions. Let's dive in!

* Decision-making structures allow you to execute different blocks of code based on certain conditions.
* Java provides several constructs for decision-making, including `if`, `else`, `else if`, and `switch`.

## 1. The `if` Statement

### Syntax:
```java
if (condition) {
    // code to be executed if condition is true
}
```
### Example:
```java
int num = 10; if (num > 0) {
    System.out.println("The number is positive."); }
```

## 2\. The `if...else` Statement

### Syntax:
```java
if (condition1) {     // code to be executed if condition1 is true 
    } else {     // code to be executed if condition1 is false 
    }
```

### Example:

```java
int num = -5; if (num > 0) {     
    System.out.println("The number is positive."); } 
    else {     
        System.out.println("The number is not positive."); }
```

## 3\. The `if...else if...else` Statement


### Syntax:

```java
if (condition1) {     // code to be executed if condition1 is true 
    } else if (condition2) {     // code to be executed if condition2 is true 
    }  else {     // code to be executed if both conditions are false 
    }
```

### Example:
```java
int num = 0; if (num > 0) {     
    System.out.println("The number is positive."); } 
    else if (num < 0) {     
        System.out.println("The number is negative."); }
         else {     
            System.out.println("The number is zero."); }
```

## 4\. The `switch` Statement


### Syntax:

```java
switch (expression) {     
    case value1:         // code to be executed if expression == value1
    break;     
    case value2:         // code to be executed if expression == value2         
    break;     
    default:         // code to be executed if expression doesn't match any case 
    }
```

### Example:

```java
int day = 3; switch (day) {     
    case 1:         
    System.out.println("Monday");         
    break;     
    case 2:         
    System.out.println("Tuesday");         
    break;     
    case 3:         
    System.out.println("Wednesday");         
    break;     
    default:         
    System.out.println("Not a valid day"); }
```

## 5\. Nested `if` Statements

### Example:

```java
int num = 15; if (num > 10) {     
    System.out.println("The number is greater than 10.");     
    if (num > 20) {         
        System.out.println("The number is also greater than 20.");     
        } }
```

## 6\. Conditional Operators


Java also supports conditional operators for compact decision-making.

### Ternary Operator

### Syntax:

```java
(condition) ? expression1 : expression2;
```

### Example:

```java
int num = 10; String result = (num > 0) ? "Positive" : "Non-positive"; System.out.println(result);
```

------

Understanding decision-making structures in Java is crucial for controlling the flow of your program and executing different actions based on conditions. Happy coding!