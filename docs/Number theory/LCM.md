---
id: LCM
title: "LCM Algorithm"
sidebar_label: "LCM"
sidebar_position: 10
description: "A detailed guide to understanding and implementing the LCM (Least Common Multiple) Algorithm in Number Theory."
tags: [lcm, number theory, competitive programming]
---

# LCM Algorithm in Number Theory

## Definition:

The **LCM (Least Common Multiple)** of two integers is the smallest positive integer that is divisible by both numbers. It is commonly used in problems involving multiple periods, cycles, or when finding a common denominator for fractions.

## Explanation:

The relationship between **LCM** and **GCD (Greatest Common Divisor)** is a key concept in number theory. Given two integers `a` and `b`, the LCM can be computed using the formula:
$\text{LCM}(a, b) = \frac{|a \cdot b|}{\text{GCD}(a, b)}$

This formula leverages the fact that the product of the LCM and GCD of two numbers is equal to the product of the numbers themselves.

## Code

### Code Implementation (Python):

```python
def gcd(a, b):
    """Helper function to compute the GCD using Euclid's Algorithm."""
    while b != 0:
        a, b = b, a % b
    return a

def lcm(a, b):
    """Computes the LCM of two numbers.

    Args:
        a: First number.
        b: Second number.

    Returns:
        The least common multiple (LCM) of the two numbers.
    """
    return abs(a * b) // gcd(a, b)

# Example Usage:
a = 12
b = 18
result = lcm(a, b)
print(f"The LCM of {a} and {b} is {result}")
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

int lcm(int a, int b) {
    // Using the relation LCM * GCD = a * b
    return abs(a * b) / gcd(a, b);
}

int main() {
    int a = 12, b = 18;
    cout << "The LCM of " << a << " and " << b << " is " << lcm(a, b) << endl;
    return 0;
}
```

### Code Implementation (Java):

```java
public class LCMAlgorithm {

    public static int gcd(int a, int b) {
        // Using Euclid's Algorithm to find the GCD
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static int lcm(int a, int b) {
        // Using the relation LCM * GCD = a * b
        return Math.abs(a * b) / gcd(a, b);
    }

    public static void main(String[] args) {
        int a = 12;
        int b = 18;
        System.out.println("The LCM of " + a + " and " + b + " is " + lcm(a, b));
    }
}
```

## Explanation of the Code:

- **gcd function:** A helper function that computes the GCD using Euclid's algorithm.
- **lcm function:** This function calculates the LCM by using the relationship between LCM and GCD. It returns the smallest positive integer that is divisible by both numbers.

### Example Usage:

For the numbers `a = 12` and `b = 18`, the output will be:
```
The LCM of 12 and 18 is 36
```

## Recursive Implementation:

Like the GCD algorithm, the LCM can also be computed using a recursive approach to calculate the GCD.

### Recursive Code (Python):

```python
def gcd_recursive(a, b):
    """Computes the GCD of two numbers using the recursive method."""
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

def lcm(a, b):
    """Computes the LCM of two numbers."""
    return abs(a * b) // gcd_recursive(a, b)

# Example Usage:
a = 12
b = 18
result = lcm(a, b)
print(f"The LCM of {a} and {b} is {result}")
```

### Recursive Code (C++):

```cpp
#include <iostream>
using namespace std;

int gcd_recursive(int a, int b) {
    // Recursive approach to find the GCD
    if (b == 0)
        return a;
    return gcd_recursive(b, a % b);
}

int lcm(int a, int b) {
    return abs(a * b) / gcd_recursive(a, b);
}

int main() {
    int a = 12, b = 18;
    cout << "The LCM of " << a << " and " << b << " is " << lcm(a, b) << endl;
    return 0;
}
```

### Recursive Code (Java):

```java
public class LCMRecursive {

    public static int gcd_recursive(int a, int b) {
        // Recursive approach to find the GCD
        if (b == 0) {
            return a;
        }
        return gcd_recursive(b, a % b);
    }

    public static int lcm(int a, int b) {
        return Math.abs(a * b) / gcd_recursive(a, b);
    }

    public static void main(String[] args) {
        int a = 12;
        int b = 18;
        System.out.println("The LCM of " + a + " and " + b + " is " + lcm(a, b));
    }
}
```

## Applications in Competitive Programming:

The LCM algorithm is frequently used in competitive programming and mathematics problems that involve periodicity, synchronization, or finding common multiples.

### Common Applications:

1. **Finding Common Denominators**:
   LCM is useful in adding fractions where you need to find a common denominator.
   
2. **Scheduling Problems**:
   In problems involving periodic events, the LCM can be used to find the point in time when the events coincide.

3. **LCM of Multiple Numbers**:
   To compute the LCM of multiple numbers, you can apply the formula pairwise:
$\text{LCM}(a_1, a_2, \ldots, a_n) = \text{LCM}(\text{LCM}(a_1, a_2), a_3, \ldots, a_n)$

### Example Problem:

Given two integers `a = 12` and `b = 18`, compute their LCM using the LCM-GCD relationship:
```
LCM(12, 18) = 36
```

## Time Complexity:

The time complexity of the LCM algorithm depends on the GCD computation, which is `O(log(min(a, b)))`. Thus, the LCM algorithm has a time complexity of `O(log(min(a, b)))`, making it very efficient even for large numbers.

## Conclusion:

The LCM algorithm is a fundamental concept in number theory with a wide range of applications. Using the relation between GCD and LCM, we can efficiently compute the least common multiple of two or more numbers, making it a powerful tool for both competitive programming and practical problem-solving.

