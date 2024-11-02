---
id: Simple-Calculator
sidebar_position: 2
title: Simple Calculator
sidebar_label: Simple Calculator
description: "This document provides a basic implementation of a simple calculator in Java, explaining its description, approach, and implementation."
tags: [java, basic-math, calculator]
---

# Simple Calculator

## Description
This program implements a basic calculator that can perform four fundamental operations: addition, subtraction, multiplication, and division. It takes two numbers and an operator as input and returns the result of the operation.

## Approach
The approach here is to use a switch statement to determine the operation based on the user-provided operator and then execute the corresponding operation. The code structure ensures clean handling of each operation type.

### Steps:

1.**Input Validation**:
-Verify the operator to ensure it's one of the supported symbols (+, -, *, /).
-Division by zero is checked separately to avoid runtime errors.

2.**Operation Handling**:
-Use a switch statement to perform the correct operation based on the provided operator.
-Each case corresponds to one of the four basic arithmetic operations.

3.**Output**:
-Return the result of the chosen operation.

### Java Implementation
'''java
import java.util.Scanner;
public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();

        System.out.print("Enter an operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);

        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();

        double result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    System.out.println("Error: Division by zero is not allowed.");
                    return;
                }
                break;
            default:
                System.out.println("Error: Invalid operator.");
                return;
        }

        System.out.println("Result: " + result);
    }
}
'''
### Complexity Analysis
**Time Complexity**: 
O(1) — each operation takes constant time.
**Space Complexity**: 
O(1) — only a few variables are used for storage.

### Conclusion
In this document, we implemented a simple calculator capable of performing basic arithmetic operations (addition, subtraction, multiplication, and division). This is a fundamental program with constant time complexity for each operation and minimal space usage.