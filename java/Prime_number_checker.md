---
id: Prime_number_checker
sidebar_position: 3
title: Prime Number Checker
sidebar_label: Prime Number Checker
description: "This document provides a method to check if a given number is prime, including its description, approach, and Java implementation."
tags: [java, problem-solving, mathematics]
---

# Prime Number Checker

## Description
A prime number is a number greater than 1 that has no divisors other than 1 and itself. This program checks if a given integer is prime and returns the result as a boolean.

## Approach
To determine if a number is prime, we check divisibility up to the square root of the number. This is because any factor larger than the square root would imply a smaller corresponding factor below the square root.

## Steps:
1.**Edge Cases**:
-Numbers less than 2 are not prime.
-2 is the only even prime number, so we handle it separately.
2.**Iterate**:
-If the number is divisible by any integer from 2 up to the square root of the number, it’s not prime.
-Only odd numbers need to be checked after verifying that the number isn’t divisible by 2.
3.**Return**:
-If no divisors are found, the number is prime.

## Java Implementation
'''java
public class PrimeNumberChecker {
    public static void main(String[] args) {
        PrimeNumberChecker checker = new PrimeNumberChecker();
        boolean isPrime = checker.isPrime(29);
        System.out.println("Is 29 a prime number? " + isPrime);
    }

    public boolean isPrime(int num) {
        if (num <= 1) {
            return false; // Numbers less than or equal to 1 are not prime
        }
        if (num == 2) {
            return true; // 2 is the only even prime number
        }
        if (num % 2 == 0) {
            return false; // All other even numbers are not prime
        }
        int sqrt = (int) Math.sqrt(num);
        for (int i = 3; i <= sqrt; i += 2) { // Check only odd divisors
            if (num % i == 0) {
                return false; // If divisible, it's not prime
            }
        }
        return true; // No divisors found, number is prime
    }
}
'''
## Complexity Analysis
**Time Complexity**: 
𝑂(𝑛)O(n) — only checks divisibility up to the square root of n.
**Space Complexity**: 
O(1) — requires a constant amount of space.

## Conclusion
This document presents a method to check if a number is prime. A prime number has no divisors other than 1 and itself, and we optimized our approach by testing divisibility only up to the square root. This results in an efficient solution with a time complexity of 
𝑂(𝑛)O(n) and constant space usage.