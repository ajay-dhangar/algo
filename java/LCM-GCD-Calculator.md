---
id: LCM-GCD-Calculator
sidebar_position: 4
title: LCM and GCD Calculator
sidebar_label: LCM and GCD Calculator
description: "This document details the implementation of a Java program to calculate the Least Common Multiple (LCM) and Greatest Common Divisor (GCD) of two numbers, along with explanations for the approach and implementation."
tags: [java, math, gcd, lcm, calculator]
---
### LCM and GCD Calculator
## Description
This program calculates the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two user-provided numbers. The GCD of two numbers is the largest number that divides both, and the LCM is the smallest number divisible by both.

## Approach
To find the GCD, the Euclidean algorithm is used, which is efficient and based on the principle that GCD(a, b) = GCD(b, a % b). The LCM is then calculated using the relation:
LCM(a,b)= ∣a×b∣/GCD(a,b)

## ​Steps:
1.**Input Validation**:
-Ensure both numbers are valid integers.
2.**Calculate GCD using the Euclidean Algorithm**:
-Use a loop to find the GCD based on repeated modulo operations until one of the numbers becomes zero.
3.**Calculate LCM**:
-Use the GCD to compute the LCM using the formula above.
4.**Output**:
-Display the GCD and LCM results.

## Java Implementation
'''java
import java.util.Scanner;

public class LCMandGCDCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        int num1 = scanner.nextInt();

        System.out.print("Enter second number: ");
        int num2 = scanner.nextInt();

        int gcd = findGCD(num1, num2);
        int lcm = (num1 * num2) / gcd;

        System.out.println("GCD: " + gcd);
        System.out.println("LCM: " + lcm);
    }

    public static int findGCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
'''
## Complexity Analysis
**Time Complexity**:
O(log(min(a, b))) — The Euclidean algorithm is efficient, with logarithmic time complexity based on the smaller of the two numbers.

**Space Complexity**:
O(1) — Only a few variables are used for intermediate calculations.

## Conclusion
This document details an LCM and GCD calculator that leverages the Euclidean algorithm for GCD calculation and uses it to compute the LCM. The program is efficient with logarithmic time complexity, making it suitable for calculating GCD and LCM for moderately large integers.






