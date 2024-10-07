---
id: bit-manipulation-technique
title: Bit Manipulation Technique
sidebar_label: Bit Manipulation introduction
sidebar_position: 2
description: 'Bit manipulation involves operating directly on binary digits or bits, which are the most basic units of data in computing. Bit manipulation is used in low-level programming tasks where performance and memory efficiency are crucial. This documentation covers key concepts, operations, and techniques in bit manipulation.'
tags: [dsa, Bit-Manipulation, technique]
---

## 1. Introduction to Bit and Binary Numbers

A **bit** is the smallest unit of data in a computer and can have a value of either 0 or 1. A sequence of bits can represent numbers, with binary being the base-2 numeral system used by computers. For example, the binary number 101 represents the decimal number 5.

In **bit manipulation**, we deal with data at the bit level. Operations such as setting, clearing, flipping, or shifting bits are performed using bitwise operators.

*NOTE: In programming, when you read a series of bits (binary sequence), you start from the right. The last bit on the right is called the Least Significant Bit (LSB), and the first bit on the left is the Most Significant Bit (MSB).*


## 2. Basics of bit manipulation: 

### a. AND (&)

The AND operator compares each bit of two numbers and returns 1 if both bits are 1, otherwise 0.

```text
    5 & 3  = 101 & 011  = 001  = 1
```
### b. OR (|)

The OR operator compares each bit of two numbers and returns 1 if at least one of the bits is 1, otherwise 0.

```text
    5 | 3  = 101 | 011  = 111  = 7
```

### c. XOR (^)

The XOR operator returns 1 if the corresponding bits of the two numbers are different, otherwise it returns 0.

```text
    5 ^ 3  = 101 ^ 011  = 110  = 6
```

### d. NOT (~)

The NOT operator inverts the bits of the number (i.e., it converts 1 to 0 and 0 to 1).

```text
    ~5  = ~101  = ...11111010  (depends on bit width, typically 32 bits in practice)
```

### e. Left Shift 

The left shift operator shifts the bits of the number to the left by a specified number of positions. For each shift, the leftmost bits are discarded, and zeros are filled in on the right.

```text
    5 << 1  = 101 << 1  = 1010  = 10
```

### f. Right Shift

The right shift operator shifts the bits of the number to the right by a specified number of positions. For each shift, the rightmost bits are discarded.

```text
    5 >> 1  = 101 >> 1  = 10  = 2
```

## 3. Common Bit Manipulation Techniques and Algorithms

### **Checking if a Number is Odd or Even**
You can check if a number is odd or even by using the AND operator with 1.

Example:

```cpp
if (n & 1) {
    // n is odd
} else {
    // n is even
}
```
### **Swapping Two Numbers Without a Temporary Variable**
You can swap two numbers using XOR without needing a temporary variable.

Example:

```cpp 
a = a ^ b;
b = a ^ b;  // Now b is the original value of a
a = a ^ b;  // Now a is the original value of b
```
### **Clearing, Setting, and Toggling Bits Clearing a Bit** 
To clear a specific bit at position pos, use the AND operator with the bitwise complement of a mask that has a 1 at position pos.

Example:

```cpp 
n = n & ~(1 << pos);
```
### **Setting a Bit** 
To set a specific bit at position pos, use the OR operator with a mask that has a 1 at position pos.

Example:

```cpp 
n = n | (1 << pos);
```
### **Toggling a Bit**
To toggle a bit at position pos, use the XOR operator with a mask that has a 1 at position pos.

Example:

```cpp
n = n ^ (1 << pos);
```
### **Checking a Specific Bit**
To check if a specific bit at position pos is set, use the AND operator.

Example:

```cpp 
if (n & (1 << pos)) {
    // Bit is set
} else {
    // Bit is not set
}
```
### **Counting Set Bits (Hamming Weight)**
The number of 1s in the binary representation of a number is called the Hamming weight or population count.

Example using *Brian Kernighan’s Algorithm* :
It takes advantage of the idea that when you subtract 1 from a number, it changes all the bits from the rightmost set bit (1) to the end.

Implementation in C++:

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
### **Isolating the Rightmost 1-bit**
To isolate the rightmost 1 bit in a number, you can use the expression n & -n.

Example:

```cpp
rightmostBit = n & -n;
```
### **Inverting the Lowest Set Bit**
To invert the lowest set bit, you can use the expression n & (n - 1).

Example:

```cpp
n = n & (n - 1);
```

## 4. Applications of Bit Manipulation
- **Data Compression**: Bit manipulation is used in compression algorithms (e.g., Huffman encoding) to represent data in fewer bits.
- **Cryptography**: Many cryptographic algorithms rely on fast bit-level operations.
- **Embedded Systems**: Bit manipulation is often used in embedded systems for tasks like setting or clearing specific bits in hardware registers.
- **Graphics and Game Development**: Manipulating pixels and color values often requires bit manipulation.
- **Networking**: Network protocols like IP require efficient manipulation of bits to represent addresses, masks, and other data.
## 5. Advantages and Limitations of Bit Manipulation
### Advantages:
**Speed**: Bit manipulation operations are generally faster than arithmetic operations.
**Memory Efficiency**: By operating on individual bits, you can save memory when working with large datasets.
### Limitations:
**Complexity**: Code involving bit manipulation can be harder to read and maintain.
**Limited Use Cases**: Not all applications require bit-level operations, and they are mainly used in performance-critical or hardware-specific applications.
## Conclusion
Bit manipulation is a powerful tool for optimizing code performance and memory usage in low-level programming. Mastering bitwise operators and common techniques is essential for tasks involving hardware interaction, cryptography, and other specialized fields. By understanding how to efficiently use bit manipulation, developers can write faster and more efficient code.