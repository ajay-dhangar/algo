---
id: brian-kernighan-algo
title: Bit Manipulation Technique
sidebar_label: Brian-Kernighan-Algoithm
sidebar_position: 2
Description: Brian Kernighan’s Algorithm is an efficient method for counting the number of set bits (1s) in the binary representation of an integer. By leveraging the property that subtracting 1 from a number flips all bits after the rightmost set bit, this algorithm repeatedly clears the lowest set bit until the number becomes zero. It is widely used in applications involving bit manipulation, cryptography, and performance-critical programming, making it a fundamental technique in data structures and algorithms.

Tags: [dsa, bit manipulation, algorithm, counting bits, efficiency]
---
# Brian Kernighan's Algorithm for Counting Set Bits (Hamming Weight)

## Introduction

**Brian Kernighan’s Algorithm** is an efficient method to count the number of set bits (1s) in the binary representation of a number. This count is often referred to as the **Hamming weight** or **population count**. The algorithm works by repeatedly clearing the lowest set bit of the number until the number becomes zero.

## How it Works

The key insight of the algorithm is based on the fact that subtracting 1 from a number flips all the bits after the rightmost set bit (including the set bit itself). By performing a bitwise AND between the number and `n - 1`, the rightmost set bit is cleared. This operation can be repeated until the number becomes 0, with each iteration representing one set bit.

### Steps in the Algorithm:
1. Initialize a `count` variable to 0.
2. While `n` is not zero:
   - Perform `n = n & (n - 1)`. This operation clears the lowest set bit.
   - Increment the `count`.
3. When `n` becomes zero, `count` will hold the total number of set bits.

### Example Walkthrough

Let’s take an example where `n = 13` (which is `1101` in binary).

- **Initial value of n**:  
  `n = 1101`  
  - First, subtract 1:  
    `n - 1 = 1100`
  - Perform the AND operation:  
    `n & (n - 1) = 1101 & 1100 = 1100`
  - Increment `count = 1`

- **Second iteration**:  
  `n = 1100`  
  - Subtract 1:  
    `n - 1 = 1011`
  - Perform the AND operation:  
    `n & (n - 1) = 1100 & 1011 = 1000`
  - Increment `count = 2`

- **Third iteration**:  
  `n = 1000`  
  - Subtract 1:  
    `n - 1 = 0111`
  - Perform the AND operation:  
    `n & (n - 1) = 1000 & 0111 = 0000`
  - Increment `count = 3`

Now, `n = 0`, so the loop terminates, and the total number of set bits in `13` is `3`.

### C++ Implementation

```cpp
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n = n & (n - 1);  // This clears the lowest set bit
        count++;
    }
    return count;
}
```
### Time Complexity
The time complexity of Brian Kernighan’s Algorithm is O(k), where k is the number of set bits in the number. The algorithm runs in proportion to the number of set bits, making it more efficient than iterating through all bits (which would take O(log n) or O(b) for b bits).

### Why It's Efficient
Unlike a naive approach that examines each bit in the number (which would involve shifting and counting), Brian Kernighan’s Algorithm only iterates once for each set bit. This makes it especially efficient when the number has relatively few set bits.

### Conclusion
Brian Kernighan's Algorithm is a powerful technique for counting set bits efficiently, and it is widely used in applications that require bit manipulation. By understanding this algorithm, you can write faster and more optimized code, especially in low-level systems programming, cryptography, and other performance-critical applications.