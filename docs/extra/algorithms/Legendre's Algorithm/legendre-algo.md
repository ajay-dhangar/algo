---
id: legendre-algo
title: Finding Power of Factorial Divisor
sidebar_label: "Legendre's Formula"
---

# Deep Dive into Finding the Power of a Factorial Divisor


This algorithm is used to find the largest power x such that k^x divides n! , where n! is the factorial of a given number n , and k can be either a prime or composite number.


## Why This Algorithm is Useful


In number theory and combinatorics, determining the largest power of a divisor for factorials is crucial in problems involving:


- **Divisibility in large products** (e.g., does n! divide a large power of some integer?)
- **Prime factorization in combinatorial coefficients** (e.g., the power of a prime factor in binomial coefficients)
- **Factorial simplifications in modular arithmetic** (useful in combinatorics, cryptography, etc.)


This algorithm is especially valuable because calculating n! directly for large n is computationally infeasible, but by using Legendre's formula, we can determine the power of a divisor without computing the factorial itself.


---


## Understanding the Problem for Prime k 


Let's first consider the case where k is a **prime number**.


### Example Problem: Power of Prime Factor Dividing n! 


Suppose we want to find the largest power of a prime k = 2 that divides n! , where n = 10:


$$ 10! = 1 * 2 * 3 * . . . * 10 = 3628800 $$



We need to find the highest power x such that 2^x divides 3628800.


### Derivation of Legendre's Formula


1. **Counting Divisors of Prime k :** 


   The factorial $$ n! = 1 * 2 * 3 * n $$ contains various multiples of k, but not every number from 1 to n is divisible by k.


2. **Step-by-Step Divisor Counting for Powers of k :**


   - **First Power k :** Every k-th number (i.e., every multiple of k) in the product from 1 to n contributes a factor of k . There are $\left\lfloor \frac{n}{k} \right\rfloor$ such numbers.
   - **Second Power k^2:** Every k^2 -th number contributes an additional factor of k, so there are $\left\lfloor \frac{n}{k^2} \right\rfloor $ such numbers.
   - **Continuing for Higher Powers:** This pattern continues until $$ k^i > n $$.


3. **Summing Up All Factors of k:**


   By adding up the counts for each power of k , we get the largest power x such that k^x divides n! :


$$
   x = \left\lfloor \frac{n}{k} \right\rfloor + \left\lfloor \frac{n}{k^2} \right\rfloor + \left\lfloor \frac{n}{k^3} \right\rfloor + \cdots
$$


4. **Example Calculation $k = 2$:**


   Let's compute this for n = 10 and k = 2 .


   $$
   x = \left\lfloor \frac{10}{2} \right\rfloor + \left\lfloor \frac{10}{4} \right\rfloor + \left\lfloor \frac{10}{8} \right\rfloor
   $$


   - $\left\lfloor \frac{10}{2} \right\rfloor = 5 $
   - $\left\lfloor \frac{10}{4} \right\rfloor = 2 $
   - $\left\lfloor \frac{10}{8} \right\rfloor = 1 $


   Thus, $$ x = 5 + 2 + 1 = 8 $$. So, $$ 2^8 $$ is the largest power of 2 that divides 10!.


---


### Implementation for Prime k 


The code to compute this for prime k is as follows:


```cpp
int fact_pow(int n, int k) {
    int res = 0;
    while (n) {
        n /= k;
        res += n;
    }
    return res;
}
```


### Complexity Analysis


This algorithm is $$O(\log_k n) $$, which is efficient, as it only needs to consider powers of k up to $$\log_k n$$.


---


### Extending to Composite $$k$$


When k is composite, we need to factorize k and determine how many times each prime factor of k appears in n!.


#### Example Problem: Power of Composite Divisor Dividing $$n! $$


Suppose n = 10 and k = 12. We want to find the largest power $x$ such that $12^x$ divides 10!.


1. **Factorize $k = 12 $:**


   $$
   12 = 2^2 \cdot 3^1
   $$


   We can see that k has prime factors 2 and 3 with respective powers 2 and 1.


2. **Apply Legendre's Formula to Each Prime Factor:**


   - For $ k_1 = 2 $, we previously found that the power of $2 in 10! $ is $8$.
   - For $k_2 = 3$, using the formula, we get:

$$
     
     \left\lfloor \frac{10}{3} \right\rfloor + \left\lfloor \frac{10}{9} \right\rfloor = 3 + 1 = 4
     
$$

   Thus, the power of 3 in 10! is 4.


3. **Calculate the Minimum Power Dividing $$k$$:**


   - For $ 2^2 $, we need $ \frac{8}{2} = 4 $.
   - For $ 3^1 $, we need $\frac{4}{1} = 4$ .


   The minimum of these two values is 4 , so 12^4 is the largest power of 12 that divides 10!.


#### Code Implementation for Composite $k$


To implement this approach, we first factorize k and then use Legendre's formula for each factor.


```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <climits>


// Function to find the largest power of a prime p that divides n!
int fact_pow(int n, int p) {
    int res = 0;
    while (n) {
        n /= p;
        res += n;
    }
    return res;
}


// Function to factorize k into prime factors and their powers
std::vector<std::pair<int, int>> prime_factors(int k) {
    std::vector<std::pair<int, int>> factors;
    for (int i = 2; i * i <= k; i++) {
        int count = 0;
        while (k % i == 0) {
            k /= i;
            count++;
        }
        if (count > 0) {
            factors.push_back({i, count});
        }
    }
    if (k > 1) {
        factors.push_back({k, 1});
    }
    return factors;
}


// Function to find the largest power of a composite k that divides n!
int composite_fact_pow(int n, int k) {
    std::vector<std::pair<int, int>> factors = prime_factors(k);
    int result = INT_MAX;
    for (auto &factor : factors) {
        int prime = factor.first;
        int power = factor.second;
        int power_in_factorial = fact_pow(n, prime);
        result = std::min(result, power_in_factorial / power);
    }
    return result;
}


int main() {
    int n = 10; // Example value
    int k = 12;  // Example composite number
    std::cout << "Largest power of " << k << " that divides " << n << "! is: "
              << composite_fact_pow(n, k) << std::endl;
    return 0;
}
```


### Use Cases and Applications


This algorithm is widely useful in fields involving large combinatorial structures, especially when direct computation of n! is impractical:


1. **Divisibility Testing:** In combinatorial problems where you need to check if n! divides a large power, this method efficiently finds the highest power.
2. **Factorization in Modular Arithmetic:** In applications involving modular inverses or multiplicative groups.
3. **Cryptography:** Particularly in algorithms like RSA or in solving Diophantine equations where factorial divisibility is often involved.


---


### Conclusion


Legendre's algorithm is a highly efficient method for calculating the largest power of a divisor that divides a factorial. It plays a crucial role in number theory, combinatorics, and cryptography, where it provides an alternative to direct factorial computation, enabling efficient solutions for large numbers.



