---
id: modular-arithmetic
title: "Modular Arithmetic"
sidebar_label: "Number theory"
sidebar_position: 10
description: "A detailed guide to understanding and implementing the Modular Arithmetic in Number Theory."
tags: [Modular Arithmetic, number theory, competitive programming]
---

# Modular Arithmetic 

Modular arithmetic is a system of arithmetic for integers, where numbers wrap around after reaching a certain value—the modulus. It is commonly used in computer science and number theory. Below, we will cover the basics, properties, applications, and examples of modular arithmetic.

## Basics of Modular Arithmetic

In modular arithmetic, we work with the remainder when one integer is divided by another. We write:

```
a ≡ b (mod m)
```
to mean that **a** and **b** leave the same remainder when divided by **m**. This is equivalent to saying that **(a - b)** is divisible by **m**.

### Example

For example, if **a = 17**, **b = 5**, and **m = 12**, we find:

```
17 ≡ 5 (mod 12)
```
since 17 and 5 both leave a remainder of 5 when divided by 12.

## Properties of Modular Arithmetic

Modular arithmetic has several useful properties:

1. **Addition**:
   - `(a + b) % m = ((a % m) + (b % m)) % m`

2. **Subtraction**:
   - `(a - b) % m = ((a % m) - (b % m) + m) % m`

3. **Multiplication**:
   - `(a * b) % m = ((a % m) * (b % m)) % m`

4. **Exponentiation**:
   - `(a^b) % m = ((a % m)^b) % m`

5. **Division (Inverse Modulo)**:
   - Division is not directly supported, but you can divide by multiplying with the modular inverse of the divisor.

## Applications of Modular Arithmetic

Modular arithmetic is widely used in many fields, including:

1. **Cryptography**: Algorithms like RSA use modular arithmetic to create secure encryption schemes.

2. **Hashing Algorithms**: Modular arithmetic helps ensure that hash values are within a specific range.

3. **Clock Arithmetic**: Modular arithmetic is used in clocks, as hours cycle back to 0 after reaching 12 or 24.

4. **Random Number Generation**: It is also used to keep numbers within a certain range, which is crucial for generating random numbers.

5. **Computer Graphics**: Modular arithmetic can help with cyclic transformations in graphics programming.

## Modular Exponentiation

Modular exponentiation is the process of finding `(base^exponent) % modulus` efficiently. This is especially useful in cryptography.

### Fast Exponentiation Algorithm

1. **Recursive Method**:
   ```python
   def mod_exp(base, exponent, modulus):
       if exponent == 0:
           return 1
       half_exp = mod_exp(base, exponent // 2, modulus)
       half_exp = (half_exp * half_exp) % modulus
       if exponent % 2 != 0:
           half_exp = (half_exp * base) % modulus
       return half_exp

    ```

2. **Recursive Method**:
   ```python
   def mod_exp(base, exponent, modulus):
    result = 1
    base = base % modulus
    while exponent > 0:
        if (exponent % 2) == 1:
            result = (result * base) % modulus
        exponent = exponent >> 1
        base = (base * base) % modulus
    return result
    ```
## Modular Inverse
To divide by a number under a modulus, we use the modular inverse. The modular inverse of a modulo m is a number x such that:
```
a * x ≡ 1 (mod m)
```
The modular inverse exists if and only if a and m are coprime.

## Finding Modular Inverse
1. **Using Extended Euclidean Algorithm:**

```python
    def extended_gcd(a, b):
    if a == 0:
        return b, 0, 1
    gcd, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd, x, y

def mod_inverse(a, m):
    gcd, x, _ = extended_gcd(a, m)
    if gcd != 1:
        return None  # Inverse does not exist
    return x % m
```
2. **Using Fermat’s Little Theorem (when m is prime):**

 If `m` is a prime number, the modular inverse of `a` can be calculated as:

```
a^(m-2) % m
```
## Practice Problems
Here are some practice problems to solidify your understanding of modular arithmetic:

- [Chinese Remainder Theorem](https://leetcode.com/problems/chinese-remainder-theorem/)
- [Modulo Exponentiation](https://leetcode.com/problems/powx-n/)  
- [Modular Multiplicative Inverse](https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/) 

### Further Practice Resources

For more extensive problem sets and further explanations, consider exploring:

- [Modular Arithmetic Exercises on HackerRank](https://www.hackerrank.com/domains/tutorials/10-days-of-math)
- [Advanced Modular Arithmetic Problems on CodeSignal](https://codesignal.com/interview-practice/)

By solving these problems, you can deepen your understanding and mastery of modular arithmetic in various applications. 

## Key Points to Remember
- **Wrapping Around**: Numbers reset to 0 after reaching the modulus.
- **Commutative and Associative Properties**: Useful for rearranging calculations in modular arithmetic.
- **Negative Results**: For a result `(a - b) % m`, add `m` if the result is negative to keep within the correct range. 

---

