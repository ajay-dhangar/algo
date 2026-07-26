---
id: discrete-logarithm
title: "Discrete Logarithm"
sidebar_label: "Discrete Logarithm Problem"
sidebar_position: 6
description: "An overview of the Discrete Logarithm problem and its applications in cryptography."
tags: [number theory, modular arithmetic, cryptography, competitive programming]
---

## Discrete Logarithm Problem

**Definition:**

The Discrete Logarithm problem is the reverse of the modular exponentiation problem. Given integers $a$, $b$, and $p$, the discrete logarithm problem involves finding an integer $x$ such that:

$[a^x = b \ (\text{mod} \ p)]$

In simpler terms, we seek to determine the exponent $x$ such that raising $a$ to the power of $x$ modulo $p$ equals $b$. Mathematically, this can be expressed as:

$[x = \log_a b \ (\text{mod} \ p)]$

This problem is considered **computationally hard** for large values of \( p \), which forms the basis of several cryptographic systems, such as the **Diffie-Hellman Key Exchange** and the **ElGamal encryption system**.

### Video Explanation 

<LiteYouTubeEmbed
  id="za9azzh4v9A"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="The Discrete Logarithm Problem"
  lazyLoad={true}
  webp
/>

### Code
**Code Implementation in Python:**

```python
def discrete_logarithm(a, b, p):
    """Brute-force approach to solve the discrete logarithm problem.
    
    Args:
        a: The base integer.
        b: The result of a^x mod p.
        p: The modulus.
    
    Returns:
        The exponent x such that a^x ≡ b (mod p), or -1 if no solution is found.
    """
    for x in range(p):
        if pow(a, x, p) == b:
            return x
    return -1
```
**Code Implementation in C++:**
```cpp
#include <iostream>
using namespace std;

int discrete_logarithm(int a, int b, int p) {
    // Brute-force approach
    for (int x = 0; x < p; x++) {
        if (pow(a, x) % p == b % p) {
            return x;
        }
    }
    return -1;
}

int main() {
    int a = 5, b = 3, p = 23;
    int x = discrete_logarithm(a, b, p);
    if (x != -1) {
        cout << "The discrete logarithm x such that " << a << "^x ≡ " << b << " (mod " << p << ") is " << x << endl;
    } else {
        cout << "No solution found." << endl;
    }
    return 0;
}
```
**Code Implementation in Java:**
```java
import java.util.Scanner;

public class DiscreteLogarithm {
    public static int discreteLogarithm(int a, int b, int p) {
        for (int x = 0; x < p; x++) {
            if (Math.pow(a, x) % p == b % p) {
                return x;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the base (a): ");
        int a = scanner.nextInt();
        
        System.out.print("Enter the result (b): ");
        int b = scanner.nextInt();
        
        System.out.print("Enter the modulus (p): ");
        int p = scanner.nextInt();
        
        int result = discreteLogarithm(a, b, p);
        
        if (result != -1) {
            System.out.println("The discrete logarithm is: " + result);
        } else {
            System.out.println("No solution found.");
        }
    }
}
```

## Time Complexity
- Best Case: O(1) (When the solution `x` is found very early)
- Average Case: O(p)
- Worst Case: O(p)
where `p` is the modulus, as the brute-force approach may need to check all values up to `p-1`.

## Space Complexity
- O(1)
as it only uses a few variables to keep track of the loop and exponentiation result.

## Explanation
The given naive algorithm evaluates `a^x mod p` for each `x` from `0` to `p-1`. Consequently, its time complexity is linearly proportional to the size of `p` `O(p)`. The space complexity is constant `O(1)` as no dynamic memory or large data structures are allocated. This brute-force approach is highly inefficient for large values of `p`, which makes the Discrete Logarithm problem computationally hard and suitable for cryptography. More efficient algorithms like Baby-step Giant-step or Pollard's Rho exist but still require exponential time relative to the bit-length of `p`.

### Explanation of the Code:
**discrete_logarithm** : This function brute-forces the solution by checking all possible values of 
$x$ until it finds one that satisfies 
$a^x = b \ (\text{mod} \ p)$.
This is inefficient for large 
$p$, and other algorithms like Baby-step Giant-step or Pollard's Rho can be used to solve this problem more efficiently.

**Main Functions**: In both the C++ and Java versions, the program prompts the user to enter values for 
$a$, 
$b$, and 
$p$, and then attempts to find 
$x$ using the discrete logarithm function.

### Example Usage:
Run the program and enter the values for 
$a$, $b$, and 
$p$.
For example, if you enter $a$=5, $b$=3, and 
$p$=23, the output will be the value of
$x$ that satisfies the equation.

### Applications in Cryptography:
The Discrete Logarithm problem has several critical applications in modern cryptographic systems:

Diffie-Hellman Key Exchange: The Diffie-Hellman Key Exchange protocol uses the discrete logarithm problem to enable secure key exchange over an insecure channel without revealing the key to a third party.

ElGamal Encryption: ElGamal encryption relies on the hardness of solving the discrete logarithm problem to provide secure encryption of messages.

Digital Signatures: Some digital signature schemes, like the Digital Signature Algorithm (DSA), are based on the difficulty of the discrete logarithm problem, ensuring the security of the signatures.

Public-Key Cryptosystems: Public-key systems that rely on discrete logarithms are secure because of the computational difficulty of solving the problem, making it an essential foundation of modern cryptography.