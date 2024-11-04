---
id: Armstrong-Number-Checker
sidebar_position: 3
title: Armstrong Number Checker
sidebar_label: Armstrong Number Checker
description: "This document explains the implementation of an Armstrong number checker in Java, detailing its description, approach, and implementation."
tags: [java, numbers, armstrong-number, checker]
---
# Armstrong Number Checker

## Description
An Armstrong number (or Narcissistic number) is a number that is equal to the sum of its own digits each raised to the power of the number of digits. For example, 153 is an Armstrong number because 1^3+5^3+3^3=153. This program verifies whether a given number is an Armstrong number.

## Approach
The approach involves iterating through each digit of the number, raising it to the power of the total number of digits, and summing these values. If the sum matches the original number, it is an Armstrong number.

## Steps:
1.**Calculate the Number of Digits**:
-Convert the number to a string or use a loop to count the digits.
2.**Compute the Armstrong Sum**:
-For each digit in the number, raise it to the power of the number of digits and add it to a cumulative sum.
3.**Comparison**:
-Check if the computed sum is equal to the original number. If yes, the number is an Armstrong number; otherwise, it is not.

## Java Implementation
'''java
import java.util.Scanner;

public class ArmstrongNumberChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        int originalNumber = number;
        int digits = String.valueOf(number).length();
        int sum = 0;

        while (number > 0) {
            int digit = number % 10;
            sum += Math.pow(digit, digits);
            number /= 10;
        }

        if (sum == originalNumber) {
            System.out.println(originalNumber + " is an Armstrong number.");
        } else {
            System.out.println(originalNumber + " is not an Armstrong number.");
        }
    }
}
'''
## Complexity Analysis
**Time Complexity**:
O(d) — where d is the number of digits in the input number, as each digit is processed once.

**Space Complexity**:
O(1) — only a few variables are used for storage.

## Conclusion
In this document, we implemented an Armstrong number checker that determines whether a given integer is an Armstrong number. This program has efficient constant space usage and linear time complexity relative to the number of digits in the number, making it well-suited for checking small to moderately large integers.