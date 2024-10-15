---
id: 
title:
sidebar_label:
sidebar-position:
description:
tags:
---

## Leetcode: Problem-9

### Description:

Given an integer x, return true if x is a palindrome, and false otherwise.

- **Example 1**:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

- **Example 2**:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

- **Example 3**:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

## Solution in Java:

```java
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) {
            return false; // Negative numbers are not palindromes
        }
        int original = x;
        int reversed = 0;
        while (x != 0) {
            int digit = x % 10;  //this returns the last digit
            reversed = reversed * 10 + digit;
            x /= 10;     //x=x/10 which removes the last digit 
        }
        return original == reversed;
    }
    public static void main(String args[]) {
        int x = 121;

        PalindromeChecker checker = new PalindromeChecker();
        boolean result = checker.isPalindrome(x);
		 
        if (result) {
        System.out.println(x + " is a palindrome.");
        } else {
        System.out.println(x + " is not a palindrome.");
        }
    }
}
```
## Output:

![Screenshot 2024-10-15 162332](https://github.com/user-attachments/assets/18ec353a-3920-4151-bfcb-1805f45b08d4)

## Analyze Complexity:

![Screenshot 2024-10-15 162602](https://github.com/user-attachments/assets/7dd17351-82b9-4863-b072-58dfcf6d806b)


