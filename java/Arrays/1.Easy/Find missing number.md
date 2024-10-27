---
id: <find-missing-number>
title: <Find the Missing Number in Array>
sidebar_label: <Find Missing Number in Array>
sidebar_position: <1>
description: <Find the missing number in an array of size N containing numbers from 1 to N.>
tags: [<Array>, <XOR>, <DSA>]
---

# Problem Statement
You are given an array `a` of size `N-1` containing numbers from `1` to `N`. The array has one number missing. Find the missing number.

[LeetCode Problem Link](https://leetcode.com/problems/missing-number/description/)

---

## Examples

**Example 1**:  
Input:  
`a = [1, 2, 4, 5]`, `N = 5`

Output:  
`3`

Explanation:  
Numbers between `1` to `N` are `[1, 2, 3, 4, 5]`. The missing number is `3`.

---

**Example 2**:  
Input:  
`a = [2, 3, 4, 5]`, `N = 5`

Output:  
`1`

Explanation:  
Numbers between `1` to `N` are `[1, 2, 3, 4, 5]`. The missing number is `1`.

---

## Intuition
This problem can be solved using the properties of XOR:
1. **Property 1**: XOR of two identical numbers is always 0 (`a ^ a = 0`).
2. **Property 2**: XOR of a number with 0 results in the number itself (`0 ^ a = a`).

### Key Idea:
- XOR all the numbers from `1` to `N`, which results in `xor1 = 1 ^ 2 ^ ... ^ N`.
- XOR all the elements in the array `a[]`, which results in `xor2 = 1 ^ 2 ^ ... ^ N` (excluding the missing number).
- The result of `xor1 ^ xor2` will cancel out all the numbers except the missing one, as explained by the XOR properties. Hence, `missing number = xor1 ^ xor2`.

---

## Approach
1. Initialize two variables `xor1` and `xor2` to 0.
2. XOR all the numbers from `1` to `N` and store the result in `xor1`.
3. XOR all the elements of the array and store the result in `xor2`.
4. XOR the values of `xor1` and `xor2`. The result will be the missing number.

---

## Java Implementation

```java
import java.util.*;

public class FindMissingNumber {
    public static int missingNumber(int []a, int N) {
        int xor1 = 0, xor2 = 0;

        for (int i = 0; i < N - 1; i++) {
            xor2 = xor2 ^ a[i]; // XOR of array elements
            xor1 = xor1 ^ (i + 1); // XOR up to [1...N-1]
        }
        xor1 = xor1 ^ N; // XOR up to [1...N]

        return (xor1 ^ xor2); // the missing number
    }

    public static void main(String args[]) {
        int N = 5;
        int a[] = {1, 2, 4, 5};

        int ans = missingNumber(a, N);
        System.out.println("The missing number is: " + ans);
    }
}
```
---
## Time Complexity
**Time Complexity**: `O(N)`, where N is the number of elements in the array. We only need to iterate over the array once to calculate the XORs.

**Space Complexity**: `O(1)`, as we are only using a constant amount of extra space.

---
## Conclusion
Using XOR properties, we can find the missing number in linear time without using any extra space, making it an optimal solution for this problem.