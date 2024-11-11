---
id: counting-divisors
title: "Counting Divisors"
sidebar_label: "Number theory"
sidebar_position: 11
description: "An algorithm to compute the total number of divisors of a given integer n."
tags: [Counting Divisors, number theory, factorization, divisors]
---

# Counting Divisors

The **Counting Divisors** algorithm calculates the total number of divisors of a given integer **n**. Divisors are numbers that divide **n** without leaving a remainder. This algorithm is particularly useful in number theory problems, such as perfect number checking, factorization, and determining the structure of numbers.

## Algorithm to Count Divisors

To count the divisors of a number **n**, iterate through all integers from 1 to √n and check if they divide **n**. If they do, both the divisor and its corresponding pair are counted.

### Steps:
1. Initialize a counter to 0.
2. For each integer **i** from 1 to √n:
   - If **n** is divisible by **i** (i.e., **n % i == 0**), increment the counter.
   - If **i** is not equal to **n / i**, increment the counter again, as both **i** and **n / i** are divisors.
3. Return the counter as the total number of divisors.

### Example

For **n = 28**:
- Divisors: 1, 2, 4, 7, 14, 28.
- Count of divisors: 6.

### Code Implementation (C++)

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int countDivisors(int n) {
    int count = 0;
    for (int i = 1; i <= sqrt(n); i++) {
        if (n % i == 0) {
            count++;
            if (i != n / i) {
                count++;
            }
        }
    }
    return count;
}

int main() {
    int n = 28;
    cout << "Number of divisors of " << n << " is: " << countDivisors(n) << endl;
    return 0;
}
```

# Python Implementation
```python
import math

def count_divisors(n):
    count = 0
    for i in range(1, int(math.sqrt(n)) + 1):
        if n % i == 0:
            count += 1
            if i != n // i:
                count += 1
    return count

# Example usage
n = 28
print(f"Number of divisors of {n} is: {count_divisors(n)}")
```

# Time Complexity
The time complexity of this algorithm is O(√n), as we iterate only up to the square root of n.

# Applications of Counting Divisors
Counting divisors is widely used in various fields:

1. Perfect Number Checking: To verify if a number is perfect, we need to check if the sum of its divisors equals the number itself.
2. Prime Factorization: Understanding the structure of numbers by counting and finding the prime divisors.
3. Mathematical Puzzles: Many problems in competitive programming rely on efficiently counting divisors.

# Key Points to Remember
Efficient Counting: Instead of iterating up to n, iterate up to √n to reduce time complexity.
Symmetry of Divisors: For every divisor i, n / i is also a divisor, making the count more efficient.
