---
id: sieve-of-eratosthenes
title: "Sieve of Eratosthenes"
sidebar_label: "Sieve of Eratosthenes"
sidebar_position: 11
description: "A complete guide to understanding and implementing the Sieve of Eratosthenes for finding prime numbers."
tags: [prime numbers, number theory, sieve, competitive programming]
---

# Sieve of Eratosthenes

## Definition:

The **Sieve of Eratosthenes** is an efficient algorithm for finding all prime numbers up to a given limit `n`. It works by iteratively marking the multiples of each prime starting from 2, the first prime number. The algorithm runs in `O(n log log n)` time, making it much faster than checking each number individually for primality.

## Explanation:

The algorithm works by maintaining an array of boolean values where each index represents a number, and the value is `True` if the number is prime and `False` if it is not. It starts with the first prime (2) and marks all of its multiples as non-prime. Then it moves to the next number, and if it's still marked as prime, it marks all of its multiples, and so on, up to the square root of `n`.

### Steps:

1. Create a list `is_prime` of size `n + 1`, where each index represents whether the number is prime.
2. Set all values to `True`, except for `is_prime[0]` and `is_prime[1]` (since 0 and 1 are not prime).
3. Start from the first prime number (2). For each prime number, mark all of its multiples as `False` (not prime).
4. Repeat the process for the next number that is still marked as prime.
5. The algorithm stops when all numbers up to √n have been processed.

## Code

### Code Implementation (Python):

```python
def sieve_of_eratosthenes(n):
    """Finds all prime numbers up to n using the Sieve of Eratosthenes.

    Args:
        n: The upper limit to find primes up to.

    Returns:
        A list of all prime numbers up to n.
    """
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False  # 0 and 1 are not primes

    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    primes = [i for i in range(2, n + 1) if is_prime[i]]
    return primes

# Example Usage:
n = 30
primes = sieve_of_eratosthenes(n)
print(f"Prime numbers up to {n}: {primes}")
```

### Code Implementation (C++):

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> sieve_of_eratosthenes(int n) {
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false; // 0 and 1 are not prime

    for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= n; j += i) {
                is_prime[j] = false;
            }
        }
    }

    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
        }
    }

    return primes;
}

int main() {
    int n = 30;
    vector<int> primes = sieve_of_eratosthenes(n);

    cout << "Prime numbers up to " << n << ": ";
    for (int prime : primes) {
        cout << prime << " ";
    }
    cout << endl;

    return 0;
}
```

### Code Implementation (Java):

```java
import java.util.*;

public class SieveOfEratosthenes {

    public static List<Integer> sieve_of_eratosthenes(int n) {
        boolean[] is_prime = new boolean[n + 1];
        Arrays.fill(is_prime, true);
        is_prime[0] = is_prime[1] = false;  // 0 and 1 are not primes

        for (int i = 2; i * i <= n; i++) {
            if (is_prime[i]) {
                for (int j = i * i; j <= n; j += i) {
                    is_prime[j] = false;
                }
            }
        }

        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (is_prime[i]) {
                primes.add(i);
            }
        }

        return primes;
    }

    public static void main(String[] args) {
        int n = 30;
        List<Integer> primes = sieve_of_eratosthenes(n);

        System.out.println("Prime numbers up to " + n + ": " + primes);
    }
}
```

## Explanation of the Code:

- **is_prime array:** This array tracks whether each number up to `n` is prime.
- **Sieve process:** For each number `i`, if `is_prime[i]` is still `True`, mark all multiples of `i` as `False` since they are not prime.
- **Result:** After the sieve process is completed, any index `i` in the `is_prime` array that remains `True` is a prime number.

### Example Usage:

For `n = 30`, the output will be:
```
Prime numbers up to 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

## Optimized Version (Skipping Even Numbers):

You can further optimize the algorithm by skipping even numbers after marking 2 as prime, thus reducing the number of iterations.

### Optimized Code (Python):

```python
def sieve_of_eratosthenes_optimized(n):
    """Optimized Sieve that skips even numbers."""
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    primes = [2]  # Start with 2, the first prime number

    for i in range(3, int(n**0.5) + 1, 2):
        if is_prime[i]:
            for j in range(i * i, n + 1, i * 2):
                is_prime[j] = False

    primes.extend([i for i in range(3, n + 1, 2) if is_prime[i]])
    return primes

# Example Usage:
n = 30
primes = sieve_of_eratosthenes_optimized(n)
print(f"Optimized prime numbers up to {n}: {primes}")
```

## Time Complexity:

The time complexity of the **Sieve of Eratosthenes** is `O(n log log n)`, which is very efficient for generating prime numbers up to a large limit. This is due to the fact that each prime number marks its multiples only once.

## Space Complexity:

The space complexity of the algorithm is `O(n)` because it requires an array of size `n + 1` to store whether each number is prime or not.

## Applications in Competitive Programming:

The Sieve of Eratosthenes is one of the most commonly used algorithms for generating primes in competitive programming. It is especially useful in problems that require you to work with primes up to a large number `n`.

### Common Applications:

1. **Finding All Primes in a Range**:
   Sieve is perfect for problems where you need to generate all primes up to a certain number, as it does so in an optimized manner.
   
2. **Prime Factorization**:
   By precomputing the primes, you can quickly find the prime factorization of numbers using trial division.
   
3. **Finding the Number of Divisors**:
   With a list of primes, you can efficiently compute the number of divisors of a number.

### Example Problem:

Given an integer `n = 30`, find all prime numbers up to 30. Using the Sieve of Eratosthenes:
```
Prime numbers up to 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

## Conclusion:

The **Sieve of Eratosthenes** is a fundamental and highly efficient algorithm for finding prime numbers. It has a variety of applications in both theoretical number theory and practical competitive programming problems. Given its simplicity and speed, it's often the go-to algorithm for prime generation.
