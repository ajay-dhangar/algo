---
id: divisibility-and-prime-numbers
title: "Divisibility and Prime Numbers"
sidebar_label: "Divisibility and Prime Numbers"
sidebar_position: 10
description: "A detailed guide to understanding and implementing the Divisibility and Prime Numbers."
tags: [Divisibility, Prime Numbers, number theory, competitive programming]
---

# Divisibility and Prime Numbers

Understanding divisibility and prime numbers is essential in number theory, with applications in cryptography, algorithm optimization, and more.

## Divisibility

Divisibility rules help quickly determine whether a number is divisible by another without performing full division. Here are some basic divisibility rules:

1. **Divisibility by 2**: A number is divisible by 2 if its last digit is even.
2. **Divisibility by 3**: A number is divisible by 3 if the sum of its digits is divisible by 3.
    ```python
    def is_divisible_by_3(n):
        return sum(map(int, str(n))) % 3 == 0
    ```
3. **Divisibility by 5**: A number is divisible by 5 if its last digit is 0 or 5.
    ```python
    def is_divisible_by_5(n):
    return str(n)[-1] in ('0', '5')
    ```
4. **Divisibility by 9**: A number is divisible by 9 if the sum of its digits is divisible by 9.
    ```python
    def is_divisible_by_9(n):
    return sum(map(int, str(n))) % 9 == 0
    ```
5. **Divisibility by 10**: A number is divisible by 10 if it ends in 0.

### Examples

- **Is 123 divisible by 3?** Sum of digits: 1 + 2 + 3 = 6, which is divisible by 3, so 123 is also divisible by 3.
- **Is 145 divisible by 5?** Last digit is 5, so it is divisible by 5.

## Prime Numbers

A **prime number** is a natural number greater than 1 that has no divisors other than 1 and itself.

### Properties of Prime Numbers

1. **Uniqueness**: Each natural number greater than 1 is either a prime itself or can be factored uniquely into prime numbers (Fundamental Theorem of Arithmetic).
2. **Infinitude**: There are infinitely many prime numbers.

### Prime Checking Algorithms

1. **Trial Division**: Check if the number is divisible by any number up to its square root.
2. **Sieve of Eratosthenes**: An efficient way to find all primes up to a certain limit.

### Prime-Related Concepts

- **Co-primes**: Two numbers are co-prime if their greatest common divisor (GCD) is 1.
- **Prime Factorization**: Breaking down a number into the product of prime numbers. For example, 60 = 2 * 2 * 3 * 5.

### Prime Number Theorems

1. **Prime Density**: The density of prime numbers decreases as numbers get larger.
2. **Approximation**: The Prime Number Theorem approximates the number of primes less than a given number $n$ as $n \ln(n) $.

## Practice Problems

- [Check If Number Is Prime](https://leetcode.com/problems/check-if-number-is-prime/)
- [Prime Factorization](https://www.geeksforgeeks.org/prime-factorization/)
- [Sieve of Eratosthenes Implementation](https://leetcode.com/problems/count-primes/)
- [Find GCD of Array (Co-primes)](https://leetcode.com/problems/find-greatest-common-divisor-of-array/)

---

By understanding divisibility rules and the properties of prime numbers, you can solve complex problems related to number theory more efficiently.


