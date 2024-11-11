---
id: GCD
title: "GCD Algorithm"
sidebar_label: "GCD"
sidebar_position: 9
description: "A detailed guide to understanding and implementing the GCD (Greatest Common Divisor) Algorithm in Number Theory."
tags: [gcd, number theory, competitive programming]
---

# GCD Algorithm in Number Theory

## Definition:

The **GCD (Greatest Common Divisor)** of two integers is the largest positive integer that divides both of them without leaving a remainder. The GCD is widely used in number theory and has applications in fractions, simplifying ratios, and solving problems involving divisibility.

## Explanation:

Given two integers `a` and `b`, the GCD can be computed efficiently using **Euclid's Algorithm**. This algorithm is based on the observation that the GCD of two numbers also divides their difference. The process continues by replacing the larger number with the remainder of dividing the two numbers, until one of the numbers becomes zero. The other number at that point is the GCD.

### Euclid's Algorithm for GCD:

Euclid’s algorithm states that:
$\text{gcd}(a, b) = \text{gcd}(b,a\mod b)$

Where `%` is the modulus operator, and the process continues until `b == 0`.

The final value of `a` will be the GCD.

## Code

### Code Implementation (Python):

```python
def gcd(a, b):
    """Computes the GCD of two numbers using Euclid's Algorithm.

    Args:
        a: First number.
        b: Second number.

    Returns:
        The greatest common divisor (GCD) of the two numbers.
    """
    while b != 0:
        a, b = b, a % b
    return a

# Example Usage:
a = 56
b = 98
result = gcd(a, b)
print(f"The GCD of {a} and {b} is {result}")
```

### Code Implementation (C++):

```cpp
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    // Using Euclid's Algorithm to find the GCD
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    int a = 56, b = 98;
    cout << "The GCD of " << a << " and " << b << " is " << gcd(a, b) << endl;
    return 0;
}
```

### Code Implementation (Java):

```java
public class GCDAlgorithm {

    public static int gcd(int a, int b) {
        // Using Euclid's Algorithm to find the GCD
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static void main(String[] args) {
        int a = 56;
        int b = 98;
        System.out.println("The GCD of " + a + " and " + b + " is " + gcd(a, b));
    }
}
```

## Explanation of the Code:

- **gcd function:** This function computes the GCD of two numbers by repeatedly applying the modulus operation until one of the numbers becomes zero. The non-zero number at that point is the GCD.
  
### Example Usage:

For the numbers `a = 56` and `b = 98`, the output will be:
```
The GCD of 56 and 98 is 14
```

## Recursive Implementation:

Euclid's algorithm can also be implemented recursively. Here is an example of the recursive approach:

### Recursive Code (Python):

```python
def gcd_recursive(a, b):
    """Computes the GCD of two numbers using the recursive method.

    Args:
        a: First number.
        b: Second number.

    Returns:
        The greatest common divisor (GCD) of the two numbers.
    """
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

# Example Usage:
a = 56
b = 98
result = gcd_recursive(a, b)
print(f"The GCD of {a} and {b} is {result}")
```

### Recursive Code (C++):

```cpp
#include <iostream>
using namespace std;

int gcd_recursive(int a, int b) {
    // Using recursive approach to find the GCD
    if (b == 0)
        return a;
    return gcd_recursive(b, a % b);
}

int main() {
    int a = 56, b = 98;
    cout << "The GCD of " << a << " and " << b << " is " << gcd_recursive(a, b) << endl;
    return 0;
}
```

### Recursive Code (Java):

```java
public class GCDRecursive {

    public static int gcd_recursive(int a, int b) {
        // Using recursive approach to find the GCD
        if (b == 0) {
            return a;
        }
        return gcd_recursive(b, a % b);
    }

    public static void main(String[] args) {
        int a = 56;
        int b = 98;
        System.out.println("The GCD of " + a + " and " + b + " is " + gcd_recursive(a, b));
    }
}
```

## Applications in Competitive Programming:

The GCD algorithm is widely used in competitive programming and number theory problems due to its efficiency in solving various problems related to divisibility and fractions.

### Common Applications:

1. **Simplifying Fractions**:
   You can use GCD to reduce fractions to their simplest form.

2. **LCM (Least Common Multiple)**:
   GCD is often used to compute LCM. The relation between GCD and LCM is:
   $\text{LCM}(a, b) = \frac{|a \cdot b|}{\text{GCD}(a, b)}$


3. **Solving Diophantine Equations**:
   GCD is used in algorithms related to solving linear Diophantine equations of the form `ax + by = gcd(a, b)`.

### Example Problem:

Given two integers `a = 56` and `b = 98`, compute their GCD using Euclid's algorithm:
```
GCD(56, 98) = 14
```

## Time Complexity:

The time complexity of the Euclidean algorithm is `O(log(min(a, b)))`, making it highly efficient for computing GCD even for large numbers.

## Conclusion:

The GCD algorithm is a fundamental tool in number theory with applications in various fields like cryptography, computer algorithms, and mathematics. Euclid's algorithm provides an efficient way to compute the GCD, making it a crucial concept for competitive programmers.

