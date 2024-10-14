---
id: Gray Code Generation
title:Gray Code Generation Using Recursion 
sidebar_label: Generate Gray Code 
description: "Gray code generation is a process of creating a sequence of binary numbers in which two successive values differ in only one bit. This unique property is useful in various applications, such as minimizing errors in digital communication and ensuring smooth transitions in analog-to-digital converters. The generation can be efficiently achieved using a recursive algorithm, which constructs Gray codes for 𝑛 by leveraging the codes generated for 𝑛−1 bits. The resulting Gray code sequences maintain a structured format, making them ideal for error detection and correction in digital systems"
tags: [Gray-Code, recursion, dsa]
---
## Gray Code Generation Via Recursion

**Problem Statement:**

* The objective is to generate the Gray code sequence for a given integer nn**n**, where nn**n** represents the number of bits. Gray codes are binary sequences where each consecutive code differs from the previous one by exactly one bit. This property is particularly useful in various applications such as digital communication, error correction, and minimizing transitions in hardware.

**Input:**

* An integer n (1 ≤ n ≤ 16) representing the number of bits for which the Gray code needs to be generated.

**Output:**

* A list of 2^n Gray codes, each represented as a binary string of length n.

**Constraints:**

* The output should follow the Gray code sequence rules.
* The implementation should ensure efficient computation, especially for larger values of n.

**C++ implementation :** 

**Output :** 

Enter the number of bits: 4
Gray Code for 4 bits:
0000
0001
0011
0010
0110
0111
0101
0100
1100
1101
1111
1110
1010
1011
1001
1000

**Code :** 

```cpp
#include <iostream>
#include <vector>
#include <string>

std::vector<std::string> generateGrayCode(int n) {
    if (n == 0) {
        return {""}; // Base case: Gray code for 0 bits
    }
  
    // Recursive call to generate Gray code for n-1 bits
    std::vector<std::string> previousGrayCode = generateGrayCode(n - 1);
    std::vector<std::string> grayCode;

    // Prepend '0' to the first half
    for (const std::string &code : previousGrayCode) {
        grayCode.push_back("0" + code);
    }

    // Prepend '1' to the reversed second half
    for (int i = previousGrayCode.size() - 1; i >= 0; --i) {
        grayCode.push_back("1" + previousGrayCode[i]);
    }

    return grayCode;
}

int main() {
    int n;
    std::cout << "Enter the number of bits: ";
    std::cin >> n;

    std::vector<std::string> grayCode = generateGrayCode(n);
  
    std::cout << "Gray Code for " << n << " bits:\n";
    for (const std::string &code : grayCode) {
        std::cout << code << "\n";
    }

    return 0;
}

```
