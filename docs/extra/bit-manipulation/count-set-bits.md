---
id: count-set-bits
title: Counting Set Bits
sidebar_label: Count Set Bits
sidebar_position: 5
Description: This algorithm counts the number of set bits (1s) in the binary representation of a number. Utilizing bit manipulation, it efficiently clears the rightmost set bit repeatedly to quickly calculate the total number of 1s in the binary form, commonly used in applications requiring binary analysis.

Tags: [dsa, bit manipulation, algorithm, set bits, efficiency]
---
# Counting the Number of Set Bits in a Number

## Introduction

The **Count Set Bits** algorithm calculates the number of 1s in the binary representation of a given integer. This is particularly useful in digital signal processing, cryptography, and data compression, where binary data operations are essential.

## How it Works

The algorithm leverages bit manipulation to clear the rightmost set bit until no bits remain. The key operation, `n & (n - 1)`, removes the lowest set bit, allowing us to count the total set bits with minimal operations.

### Steps in the Algorithm:
1. Initialize a counter.
2. While `n` is greater than zero:
   - Perform `n = n & (n - 1)` to remove the lowest set bit.
   - Increment the counter.
3. Return the counter as the count of set bits.

### Example Walkthrough

Consider the example where `n = 13` (binary `1101`):

- **Step 1**:  
  `n = 1101`  
  `n - 1 = 1100`  
  `n & (n - 1) = 1100`  
  Counter = 1

- **Step 2**:  
  `n = 1100`  
  `n - 1 = 1011`  
  `n & (n - 1) = 1000`  
  Counter = 2

- **Step 3**:  
  `n = 1000`  
  `n - 1 = 0111`  
  `n & (n - 1) = 0000`  
  Counter = 3

Thus, `13` has three set bits.

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

// Function to count the number of set bits
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}

int main() {
    int n = 13;
    cout << "Number of set bits in " << n << " is " << countSetBits(n) << endl;
    return 0;
}
```
# Python Implementation
```python
def count_set_bits(n):
    count = 0
    while n > 0:
        n &= (n - 1)
        count += 1
    return count

# Test the function
n = 13
print(f"Number of set bits in {n} is {count_set_bits(n)}")
```

# Time Complexity
This algorithm runs in O(k), where k is the number of set bits, making it efficient compared to simple bit counting methods.

# Why It's Efficient
The algorithm focuses only on set bits, skipping zero bits entirely, which significantly reduces the number of operations.

# Conclusion
The Count Set Bits technique is a highly efficient bit manipulation strategy for determining the number of set bits in a binary number, widely used in low-level programming and binary data manipulation.