---
id: gcd-lcm
sidebar_position: 4
title: Greatest Common Divisor (GCD) and Least Common Multiple (LCM)
sidebar_label: GCD and LCM
description: "Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are fundamental algorithms for divisibility."
tags: [gcd, lcm, number theory, algorithms]
---

# Greatest Common Divisor (GCD) and Least Common Multiple (LCM)

The **Greatest Common Divisor (GCD)** and **Least Common Multiple (LCM)** are fundamental algorithms in number theory used to determine the divisibility relationships between integers.

## Greatest Common Divisor (GCD)

### Definition

The **GCD** of two integers is the largest positive integer that divides both numbers without leaving a remainder. It is often used to simplify fractions and solve problems involving divisibility.

### Algorithm

The **Euclidean algorithm** is the most efficient method for computing the GCD. It works on the principle that the GCD of two numbers also divides their difference.

#### Steps:
1. Given two integers a and  b :
   - If b = 0, then GCD(a, b) = a
   - Otherwise, GCD(a, b) = GCD(b,a   mod b ).

### Time Complexity

- The time complexity of the Euclidean algorithm is ( O(log(min(a, b)))).

## Least Common Multiple (LCM)

### Definition

The **LCM** of two integers is the smallest positive integer that is divisible by both numbers. It is often used in problems involving fractions and synchronization of cycles.

### Relationship with GCD

The LCM can be calculated using the GCD with the following formula:

LCM(a, b) = a x b divded by [GCD(a, b)].


### Time Complexity

- The time complexity for calculating the LCM is O(log(min(a, b))) due to the GCD calculation.

## Implementations

### C++

```cpp
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;
}

int main() {
    int a = 12, b = 15;
    cout << "GCD: " << gcd(a, b) << endl;
    cout << "LCM: " << lcm(a, b) << endl;
    return 0;
}
```
### Java
```java
public class GCDLCM {
    public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static int lcm(int a, int b) {
        return (a / gcd(a, b)) * b;
    }

    public static void main(String[] args) {
        int a = 12, b = 15;
        System.out.println("GCD: " + gcd(a, b));
        System.out.println("LCM: " + lcm(a, b));
    }
}
```
### Python
```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def lcm(a, b):
    return abs(a * b) // gcd(a, b)

a = 12
b = 15
print("GCD:", gcd(a, b))
print("LCM:", lcm(a, b))
```
### Pseudo Code
```
function gcd(a, b):
    while b != 0:
        temp = b
        b = a mod b
        a = temp
    return a

function lcm(a, b):
    return (a / gcd(a, b)) * b
```
### Conclusion
The Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are essential algorithms in number theory that help in understanding the divisibility of integers. Their efficient computation using the Euclidean algorithm and the relationship between GCD and LCM makes them powerful tools in both theoretical and practical applications.