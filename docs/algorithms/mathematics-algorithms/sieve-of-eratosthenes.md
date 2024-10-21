---
id: sieve-of-eratosthenes
sidebar_position: 3
title: Sieve of Eratosthenes
sidebar_label: Sieve of Eratosthenes
description: "The Sieve of Eratosthenes is an efficient algorithm to find all prime numbers up to a given limit."
tags: [sieve of eratosthenes, prime numbers, algorithms, number theory]
---

# Sieve of Eratosthenes

The **Sieve of Eratosthenes** is an ancient algorithm used to find all prime numbers up to a specified integer. It is efficient and easy to implement, making it one of the most popular algorithms for generating a list of primes.

## Algorithm

### Steps:
1. Create a list of consecutive integers from 2 to $n$ (the limit).
2. Start with the first prime number $p=2$.
3. Mark all multiples of $p$ (from $p^2$ to $n$) as composite (not prime).
4. Find the next number in the list that is not marked. This number is the next prime $p$.
5. Repeat steps 3 and 4 until $p^2$ is greater than $n$.
6. The numbers that remain unmarked in the list are all the prime numbers up to $n$.

### Example

To find all prime numbers up to 30:
- Start with the list: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
- Mark multiples of 2: [2, 3, X, 5, X, 7, X, 9, X, 11, X, 13, X, 15, X, 17, X, 19, X, 21, X, 23, X, 25, X, 27, X, 29, X]
- Mark multiples of 3: [2, 3, X, 5, X, 7, X, X, X, 11, X, 13, X, X, 17, X, 19, X, X, X, 23, X, 25, X, X, X, 29, X]
- Continue this process until all multiples of primes are marked.
- The unmarked numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.

## Time Complexity

- The time complexity of the Sieve of Eratosthenes is $O(n \log(\log(n)))$, where $n$ is the limit up to which prime numbers are generated. This makes it very efficient for large values of $n$..

## Space Complexity

- The space complexity is $O(n)$ due to the array used to mark the prime numbers.

## Implementations

### C++

```cpp
#include <iostream>
#include <vector>
using namespace std;

void sieveOfEratosthenes(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime numbers

    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p) {
                isPrime[i] = false; // Mark multiples of p as non-prime
            }
        }
    }

    cout << "Prime numbers up to " << n << " are: ";
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            cout << i << " ";
        }
    }
    cout << endl;
}

int main() {
    int n = 30; // Limit
    sieveOfEratosthenes(n);
    return 0;
}
```
### Java
```java
import java.util.Arrays;

public class SieveOfEratosthenes {
    public static void sieve(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime numbers

        for (int p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false; // Mark multiples of p as non-prime
                }
            }
        }

        System.out.print("Prime numbers up to " + n + " are: ");
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int n = 30; // Limit
        sieve(n);
    }
}
```
### Python

```python
def sieve_of_eratosthenes(n):
    is_prime = [True] * (n + 1)
    is_prime[0], is_prime[1] = False, False  # 0 and 1 are not prime numbers

    for p in range(2, int(n**0.5) + 1):
        if is_prime[p]:
            for i in range(p * p, n + 1, p):
                is_prime[i] = False  # Mark multiples of p as non-prime

    print(f"Prime numbers up to {n} are: ", end="")
    for i in range(2, n + 1):
        if is_prime[i]:
            print(i, end=" ")
    print()

n = 30  # Limit
sieve_of_eratosthenes(n)
```
### Pseudo Code
```
function sieveOfEratosthenes(n):
    create an array isPrime[0...n] and initialize all entries as true
    isPrime[0] = isPrime[1] = false // 0 and 1 are not prime numbers

    for p from 2 to sqrt(n):
        if isPrime[p] is true:
            for i from p^2 to n with step p:
                isPrime[i] = false // Mark multiples of p as non-prime

    print "Prime numbers up to n are:"
    for i from 2 to n:
        if isPrime[i] is true:
            print i
```
### Conclusion
The Sieve of Eratosthenes is an efficient and straightforward algorithm for finding all prime numbers up to a given limit. Its simplicity and efficiency make it a favorite among computer scientists and mathematicians for generating prime numbers in various applications.