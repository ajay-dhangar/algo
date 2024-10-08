---
id: Hamming-weight-dsa
title: Counting Set Bits (Hamming Weight) 
sidebar_label: Counting Set Bits (Hamming Weight) 
description: "In this blog post, we'll explore how to efficiently count the number of set bits (1s) in the binary representation of a number using the Hamming Weight technique." 
tags: [dsa, algorithms, bit manipulation, hamming weight]
---

## Introduction
Counting Set Bits (also known as Hamming Weight) is a problem where we need to find how many 1s are present in the binary representation of a number. This is a fundamental problem in bit manipulation that can be efficiently solved using Brian Kernighan's Algorithm.

## Problem Setup:
We are given an integer `n` and our task is to count the number of set bits (1s) in its binary representation. For example, the binary representation of `13` is `1101`, which contains 3 set bits.

## Time Complexity:

Naive method: O(log n) where n is the integer.  
Optimized method (Brian Kernighan’s Algorithm): O(k), where k is the number of set bits.

## Points to Remember:

- Brian Kernighan’s Algorithm skips over unset bits and directly counts the set bits.
- This method is faster than iterating through all bits, especially when the number of set bits is much smaller than the total number of bits.
- Works for both positive and negative integers (depending on whether signed or unsigned integers are used).
- Ideal for performance-critical applications where bit-level manipulation is involved.

## Explanation:
The key operation in the algorithm is n & (n - 1). This operation flips the rightmost set bit of n to 0.

By doing this repeatedly until n becomes 0, we count how many set bits there were. Each time this operation is performed, the number of set bits is reduced by one.

## Example:
For n = 13 (which is 1101 in binary):

Initial: n = 1101 (3 set bits)
First operation: n = 1101 & 1100 → n = 1100 (2 set bits left)
Second operation: n = 1100 & 1011 → n = 1000 (1 set bit left)
Third operation: n = 1000 & 0111 → n = 0000 (no set bits left)
Thus, the total number of set bits in 13 is 3.

## Applications:
Error Detection and Correction: Counting set bits is used in Hamming codes for error correction.
Cryptography: Hamming Weight is used in various cryptographic algorithms to measure data randomness.
Optimization: Bit manipulation techniques, including counting set bits, are crucial for optimizing certain low-level algorithms.

## Code Implementation:

```java
public class HammingWeight {

    public int countSetBits(int n) {
        int count = 0;

        while (n != 0) {
            n = n & (n - 1);  // Clears the lowest set bit
            count++;
        }

        return count;
    }

    public static void main(String[] args) {
        HammingWeight hw = new HammingWeight();
        int number = 13;
        int setBitsCount = hw.countSetBits(number);
        System.out.println("Number of set bits: " + setBitsCount);  // Output: Number of set bits: 3
    }
}
