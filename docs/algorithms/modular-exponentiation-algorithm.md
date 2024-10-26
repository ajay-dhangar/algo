---
id: modular-exponentiation-algorithm
title: Modular Exponentiation Algorithm
sidebar_label: Modular Exponentiation
sidebar_position: 10
description: "Modular Exponentiation is an algorithm used to efficiently compute large powers modulo a number, using a technique called exponentiation by squaring."
tags: [Modular Arithmetic, Exponentiation, Algorithms, Number Theory, Recursion]
---

# Modular Exponentiation Algorithm

## Overview
**Modular Exponentiation** is an efficient algorithm for computing large powers modulo a number. This algorithm is widely used in cryptography and number theory, where dealing with large numbers is common, and directly calculating powers can lead to overflow. Instead of calculating `base^exp` first and then taking the modulo, **modular exponentiation** computes `(base^exp) % mod` efficiently using the **exponentiation by squaring** method, reducing the time complexity to logarithmic.

## Problem Description
- **Input**: Three integers, `base`, `exp`, and `mod`, where:
  - `base` is the base number to be raised to the power.
  - `exp` is the exponent to which the base is raised.
  - `mod` is the number by which the result will be reduced.
- **Output**: The result of `(base^exp) % mod`, calculated efficiently.
- **Constraints**: Large values for `base` and `exp` make a direct approach infeasible, so modular exponentiation is necessary for efficiency.

## Solution Approach
The **modular exponentiation algorithm** employs **exponentiation by squaring**, which reduces the problem size at each step by halving the exponent. This approach can be implemented recursively or iteratively and uses the following properties:

- If `exp` is even:  
  $$
  \text{base}^{\text{exp}} = (\text{base}^{\text{exp}/2})^2
  $$
- If `exp` is odd:  
  $$
  \text{base}^{\text{exp}} = \text{base} \times (\text{base}^{(\text{exp}-1)/2})^2
  $$

At each step, the intermediate result is taken modulo `mod` to keep the numbers manageable.

### Key Steps
1. **Initialize the result** to 1.
2. **Iterate while `exp > 0`**:
   - If `exp` is odd, multiply `result` by `base` and take modulo `mod`.
   - Square the `base` and take modulo `mod`.
   - Divide the exponent by 2.
3. Return the final `result` after the loop terminates.

## Code Example

```python
def modular_exponentiation(base, exp, mod):
    result = 1
    base = base % mod  # Update base if it's more than mod
    
    while exp > 0:
        if exp % 2 == 1:  # If exp is odd
            result = (result * base) % mod
        
        base = (base * base) % mod  # Square the base
        exp //= 2  # Reduce exp by half
    
    return result

# Example usage
result = modular_exponentiation(2, 10, 1000)
print(result)  # Output: 24
```
## Time Complexity
The time complexity of the modular exponentiation algorithm is significantly reduced by the exponentiation by squaring technique.

### Time Complexity Overview
- **Time Complexity**: O(log(exp))  
  The algorithm reduces the exponent by half in each iteration, leading to a logarithmic number of steps relative to the size of the exponent. Each step involves constant-time operations like multiplication and modulo, so the overall time complexity is logarithmic.

## Space Complexity
- **Space Complexity**: O(1)  
  The space complexity is constant because only a few variables (such as `base`, `exp`, and `result`) are required to perform the computation.

## Applications
- **Cryptography**: Modular exponentiation is heavily used in cryptographic algorithms such as RSA, Diffie-Hellman key exchange, and ElGamal.
- **Number Theory**: Many problems in number theory, especially those related to prime numbers and modular arithmetic, rely on modular exponentiation.
- **Efficient Computation**: This algorithm is used in any scenario where large powers need to be computed modulo a number without causing overflow or performance issues.

## Conclusion
The Modular Exponentiation Algorithm provides an efficient way to compute large powers modulo a number. It leverages the technique of exponentiation by squaring to reduce the number of operations from exponential to logarithmic time. This algorithm is crucial in fields like cryptography and number theory, where operations with large numbers are common and need to be performed efficiently.
