---
id:"Euclidean Algorithm"
title: "Extended Euclidean Algorithm" 
sidebar_label: "Extended Euclidean" 
sidebar_position: 8
description: "A beginner-friendly guide to understanding and implementing the Extended Euclidean Algorithm in Number Theory." 
tags: [extended euclidean, number theory, competitive programming] 
--- 

# Extended Euclidean Algorithm in Number Theory

## What is the Extended Euclidean Algorithm?

The Extended Euclidean Algorithm is a method used to find the **Greatest Common Divisor (GCD)** of two integers, $a$ and $b$. But it does more than just that—it also finds two coefficients, $x$ and $y$, that satisfy the equation:

$$
ax + by = \text{gcd}(a, b)
$$

This equation is known as **Bézout's identity**. The values of $x$ and $y$ can be very useful in solving equations where you need whole number solutions, such as linear Diophantine equations.

## How Does It Work?

The Extended Euclidean Algorithm builds on the simpler **Euclidean Algorithm**, which finds the GCD by repeatedly applying the formula:

$$
\text{gcd}(a, b) = \text{gcd}(b, a \mod b)
$$

While finding the GCD, the Extended Euclidean Algorithm keeps track of the coefficients $x$ and $y$. Here's how it works:

### Steps of the Extended Euclidean Algorithm:

1. **Base Case**: If $b = 0$, then:
   $$
   \text{gcd}(a, b) = a \quad \text{and} \quad x = 1, \quad y = 0
   $$
   This means that if one number is zero, the other number is the GCD, and the coefficients are easy to find.

2. **Recursive Step**: If $b \neq 0$:
   - Calculate the GCD of $b$ and $a \mod b$.
   - Update the coefficients using:
     $$
     g = \text{gcd}(b, a \mod b)
     $$
     $$
     x' = y
     $$
     $$
     y' = x - \left\lfloor \frac{a}{b} \right\rfloor y
     $$
## Code Implementations

Here's how you can implement the Extended Euclidean Algorithm in different programming languages.

### Python

```python
def extended_gcd(a, b):
    """Finds the GCD of a and b, and the coefficients x and y."""
    if b == 0:
        return a, 1, 0  # Base case
    gcd, x1, y1 = extended_gcd(b, a % b)  # Recursive call
    x = y1
    y = x1 - (a // b) * y1  # Update coefficients
    return gcd, x, y

# Example Usage:
a = 30
b = 21
gcd, x, y = extended_gcd(a, b)
print(f"The GCD of {a} and {b} is {gcd}, with coefficients x = {x} and y = {y}")

```

### C++ Implementation

```cpp
#include <iostream>
#include <tuple>
using namespace std;

tuple<int, int, int> extended_gcd(int a, int b) {
    if (b == 0) return make_tuple(a, 1, 0); // Base case
    int gcd, x1, y1;
    tie(gcd, x1, y1) = extended_gcd(b, a % b); // Recursive call
    int x = y1;
    int y = x1 - (a / b) * y1; // Update coefficients
    return make_tuple(gcd, x, y);
}

int main() {
    int a = 30, b = 21;
    int gcd, x, y;
    tie(gcd, x, y) = extended_gcd(a, b);
    cout << "The GCD of " << a << " and " << b << " is " << gcd << ", with coefficients x = " << x << " and y = " << y << endl;
    return 0;
}

```

### Java Implementation

```java
public class ExtendedEuclideanAlgorithm {
    public static int[] extended_gcd(int a, int b) {
        if (b == 0) {
            return new int[]{a, 1, 0}; // Base case
        }
        int[] result = extended_gcd(b, a % b); // Recursive call
        int gcd = result[0];
        int x1 = result[1];
        int y1 = result[2];
        int x = y1;
        int y = x1 - (a / b) * y1; // Update coefficients
        return new int[]{gcd, x, y};
    }

    public static void main(String[] args) {
        int a = 30, b = 21;
        int[] result = extended_gcd(a, b);
        System.out.println("The GCD of " + a + " and " + b + " is " + result[0] + ", with coefficients x = " + result[1] + " and y = " + result[2]);
    }
}

```

## Understanding the Code

In each implementation:
- The function `extended_gcd` calculates the GCD of two numbers using recursion.
- It also computes the coefficients $x$ and $y$ that satisfy Bézout's identity.

### Example Usage

For the numbers $a = 30$ and $b = 21$, the output will be:

The GCD of 30 and 21 is 3, with coefficients $x = -1$ and $y = 2$.

## Applications in Competitive Programming

The Extended Euclidean Algorithm is useful in various scenarios, such as:
- **Solving Linear Diophantine Equations**: It can find integer solutions for equations like $ax + by = c$.
- **Finding Modular Inverses**: It helps to find the modular inverse of a number $a$ under modulo $m$. This is useful in cryptography.
- **Cryptography**: It is used in algorithms like RSA for key generation and digital signatures.

### Example Problem

Given two integers $a = 30$ and $b = 21$:
- **Result**: GCD(30, 21) = 3, with coefficients $x = -1$ and $y = 2$.

## Time Complexity

The time complexity of the Extended Euclidean Algorithm is:

$$
O(\log(\min(a, b)))
$$

This means it runs efficiently, even for large numbers.

## Conclusion

The Extended Euclidean Algorithm is a valuable tool in number theory. It not only computes the GCD but also provides the coefficients that relate two numbers. Its applications span various fields, including cryptography and competitive programming, making it an essential algorithm to understand.

### Summary of Improvements:
- **Simplified Explanations**: Provided clearer explanations for beginners.
- **Structured Format**: Organized the content into distinct sections for better flow.
- **Code Comments**: Added comments to clarify the purpose of each part of the code.
- **Real-world Context**: Explained applications in a straightforward manner to relate to real-world problems.