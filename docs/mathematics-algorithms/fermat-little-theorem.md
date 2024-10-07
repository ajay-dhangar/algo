---
id: fermat-little-theorem
title: Fermat's Little Theorem
sidebar_label: "Fermat's Little Theorem MMI"
sidebar_position: 5
description: "A comprehensive guide to calculating the modular multiplicative inverse using Fermat's Little Theorem."
tags: [number theory, modular arithmetic, cryptography,competitive progrmaing]
---

## Modular Multiplicative Inverse Using Fermat's Little Theorem

**Definition:**

The modular multiplicative inverse of an integer `a` modulo `m` is an integer `b` such that `a * b ≡ 1 (mod m)`. In other words, `b` is the inverse of `a` in the ring of integers modulo `m`.

**Fermat's Little Theorem for Modular Inverses:**

Fermat's Little Theorem provides a direct way to calculate the modular multiplicative inverse of `a` modulo `p` when `p` is a prime number. It states that:
$a^{(p-2)} ≡ a^{(-1)}$
This means that raising `a` to the power of `p-2` modulo `p` gives you the modular multiplicative inverse of `a`.



### Code
**Code Implementation (Python):**

```python
def modular_exponentiation(base, exponent, mod):
    """Calculates the modular exponentiation of base^exponent mod mod efficiently.

    Args:
        base: The base number.
        exponent: The exponent.
        mod: The modulus.

    Returns:
        The result of base^exponent mod mod.
    """

    result = 1
    while exponent > 0:
        if exponent % 2 == 1:
            result = (result * base) % mod
        base = (base * base) % mod
        exponent //= 2
    return result

def modular_inverse(a,   
 p):
    """Calculates the modular multiplicative inverse of a modulo p using Fermat's Little Theorem.in O(logn)

    Args:
        a: The base number.
        p: The prime modulus.

    Returns:
        The modular multiplicative inverse of a modulo p, or None if it doesn't exist.
    """

    if p <= 1:
        raise ValueError("Modulus must be a prime number greater than 1.")
    return modular_exponentiation(a, p - 2, p)
    
    ```

**Code Implementation (C++):**

```cpp
 
include "bits/stdc++.h>

using namespace std;

int modular_exponentiation(int base, int exponent, int mod) {
    int result = 1;
    while (exponent > 0) {
        if (exponent % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exponent /= 2;
    }
    return result;
}

int modular_inverse(int a, int p) {
    if (p <= 1) {
        throw invalid_argument("Modulus must be a prime number greater than 1.");
    }
    return modular_exponentiation(a, p - 2, p);
}

int main() {
    int a = 3;
    int p = 7;

    int inverse = modular_inverse(a, p);
    cout << "The modular multiplicative inverse of " << a << " modulo " << p << " is " << inverse << endl;

    return 0;
}
```
**Code Implementation (Java):**

```java
import java.util.Scanner;

public class FermatsLittleTheorem {
    public static int modular_exponentiation(int base, int exponent, int mod) {
        int result = 1;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exponent /= 2;
        }
        return result;   

    }

    public static int modular_inverse(int a, int p) {
        if (p <= 1) {
            throw new IllegalArgumentException("Modulus must be a prime number greater than 1.");
        }
        return modular_exponentiation(a, p - 2, p);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the value of a: ");
        int a = scanner.nextInt();

        System.out.print("Enter   
 the prime modulus p: ");
        int p = scanner.nextInt();

        int inverse = modular_inverse(a, p);
        System.out.println("The modular multiplicative inverse of " + a + " modulo " + p + " is " + inverse);
    }
}
```
Explanation of the Code:

modular_exponentiation: This function efficiently calculates the modular exponentiation of base^exponent mod mod using the repeated squaring algorithm.
modular_inverse: This function calculates the modular multiplicative inverse of a modulo p using Fermat's Little Theorem.
It first checks if p is a prime number greater than 1.
If so, it calculates a^(p-2) mod p using the modular_exponentiation function.
The result is the modular multiplicative inverse of a modulo p.
main: This is the main function where the program execution starts. It prompts the user to enter values for a and p, calculates the modular inverse using the modular_inverse function, and prints the result.
Example Usage:

Run the Java program and enter the values of a and p. For example, if you enter a = 3 and p = 7, the output will be:

The modular multiplicative inverse of 3 modulo 7 is 5

Sources and related content



### Applications in Competitive Programming
Fermat's Little Theorem has several practical applications in competitive programming:

1. Modular Exponentiation
Efficiently calculating large powers modulo a prime: Fermat's Little Theorem can be used to reduce the exponent modulo a prime before performing the exponentiation. This can significantly improve the efficiency of calculations involving large exponents.
2. Finding Modular Inverses
Calculating modular inverses efficiently: For prime moduli, Fermat's Little Theorem provides a direct method to find the modular inverse of an element. This is crucial for solving problems involving modular division or solving linear congruences.
3. Solving Diophantine Equations
Solving linear congruences: Fermat's Little Theorem can be used to solve linear congruences of the form ax ≡ b (mod p) where p is a prime number.
4. Cryptography
RSA Algorithm: Fermat's Little Theorem forms the basis of the RSA public-key encryption algorithm. It is used to generate the public and private keys, as well as to perform encryption and decryption.

