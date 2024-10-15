---
id: modular-arithmetic
sidebar_position: 7
title: Modular Arithmetic
sidebar_label: Modular Arithmetic
description: "Modular arithmetic is a fundamental concept in mathematics, essential for cryptography and number theory."
tags: [modular arithmetic, cryptography, number theory, algorithms]
---

# Modular Arithmetic

**Modular Arithmetic** is a system of arithmetic for integers where numbers wrap around after reaching a certain value called the modulus. It is a crucial concept in various fields, especially in cryptography and number theory.

## Core Concepts

### Modulus
- The modulus $m$ is the integer at which numbers wrap around.
- For any integer $a$, the expression $a \mod m$ gives the remainder of the division of $a$ by $m$.

### Basic Operations

1. **Addition :**  $(a + b) \mod m$   
   Example: $(7 + 5) \mod 10 = 2$

   **Code**:
   #### C++
   ```cpp
   int modular_add(int a, int b, int m) {
       return (a + b) % m;
   }
   ```
   #### Java
   ```java
   public static int modularAdd(int a, int b, int m) {
    return (a + b) % m;
   }
   ```
   #### Python
   ```py
   def modular_add(a, b, m):
    return (a + b) % m
   ```
   #### **Time Complexity**: $O(1)$
2. **Subtraction** :  $(a - b) \mod m$    
   Example: $(3 − 4) \mod 5 = 4$

    **Code**:
   #### C++
   ```cpp
   int modular_sub(int a, int b, int m) {
    return (a - b + m) % m; // ensure non-negative result
   }

   ```
   #### Java
   ```java
   public static int modularSub(int a, int b, int m) {
    return (a - b + m) % m; // ensure non-negative result
    }
    ```
   #### Python
   ```py
   def modular_sub(a, b, m):
    return (a - b + m) % m  # ensure non-negative result
   ```
   #### **Time Complexity**: $O(1)$
3. **Multiplication:**:
   $(a \times b) \mod m$    
   Example: $(4 \times 3) \mod 5 = 2$
    
    **Code**:
   #### C++
   ```cpp
   int modular_mul(int a, int b, int m) {
    return (a * b) % m;
    }

   ```
   #### Java
   ```java
   public static int modularMul(int a, int b, int m) {
    return (a * b) % m;
    }

    ```
   #### Python
   ```py
   def modular_mul(a, b, m):
    return (a * b) % m
   ```
   #### **Time Complexity**: $O(1)$
4. **Exponentiation:** 
   $(a^b) \mod m$   
   Example: $(2^3) \mod 5 = 3$



    **Code**:
   #### C++
   ```cpp
   int modular_pow(int base, int exp, int mod) {
    int result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        exp = exp >> 1; // equivalent to exp //= 2
        base = (base * base) % mod;
    }
    return result;
    }


   ```
   #### Java
   ```java
   public static int modularPow(int base, int exp, int mod) {
    int result = 1;
    base = base % mod;
    while (exp > 0) {
        if ((exp & 1) == 1) {
            result = (result * base) % mod;
        }
        exp >>= 1; // equivalent to exp /= 2
        base = (base * base) % mod;
    }
    return result;
    }


    ```
   #### Python
   ```py
   def modular_pow(base, exp, mod):
    result = 1
    base = base % mod
    while exp > 0:
        if (exp % 2) == 1:
            result = (result * base) % mod
        exp //= 2
        base = (base * base) % mod
    return result

   ```
   #### **Time Complexity**: $O( log \ b)$

### Conclusion
Modular arithmetic is a powerful tool in mathematics with significant applications in cryptography, computer science, and number theory. Understanding its core operations and properties is essential for working with modern cryptographic systems and algorithms.