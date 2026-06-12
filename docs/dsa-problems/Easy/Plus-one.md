---
id: plus-one
title: Plus One
sidebar_label: Plus One
description: The "Plus One" dsa problem is a classic algorithm challenge that involves manipulating an array of digits. The goal is to add one to a number represented by an array of its digits.
tags: [dsa, algorithms, problem-solving]
---

# Plus One

## Description
You are given a large integer represented as an integer array ``digits``, where each ``digits[i]`` is the ``ith`` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading ``0``'s.
Increment the large integer by one and return the resulting array of digits.

### Example 1:

**Input:** digits = [1,2,3]

**Output:** [1,2,4]

**Explanation:** The array represents the integer 123.

Incrementing by one gives 123 + 1 = 124.

Thus, the result should be [1,2,4].

### Example 2:

**Input:** digits = [4,3,2,1]

**Output:** [4,3,2,2]

**Explanation:** The array represents the integer 4321.

Incrementing by one gives 4321 + 1 = 4322.

Thus, the result should be [4,3,2,2].

### Example 3:

**Input:** digits = [9]

**Output:** [1,0]

**Explanation:** The array represents the integer 9.

Incrementing by one gives 9 + 1 = 10.

Thus, the result should be [1,0].

# Code in Java

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length;

        for(int i=n-1; i>=0; --i) {
            ++digits[i];
            digits[i] = digits[i] % 10;
            if(digits[i] != 0) {
                return digits;
            }
        }
        digits = new int[n+1];
        digits[0] = 1;
        return digits;
    }
}
```

## Time and Space Complexity

### Time Complexity
- **Best Case:** $O(1)$ - When the last digit is not 9 (no carry propagation needed).
- **Average Case:** $O(1)$ - Most numbers will have some non-9 digits.
- **Worst Case:** $O(n)$ - When all digits are 9, we need to traverse the entire array and create a new one.

### Space Complexity
- **Best and Average Case:** $O(1)$ - When no new array is needed.
- **Worst Case:** $O(n)$ - When all digits are 9 and we need to create an array of size $n+1$.

## Explanation
The algorithm increments the number from right to left, handling carries. If a digit is not 9, we increment it and return immediately (constant time). However, if all digits are 9 (like 999 → 1000), we must traverse the entire array and create a new array. Despite the worst-case linear complexity, this algorithm is optimal because we must examine at least the non-9 digits, and the worst case (all 9s) is rare.
