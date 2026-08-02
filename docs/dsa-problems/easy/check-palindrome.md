---
id: check-palindrome
title: DSA Problem Solution
sidebar_label: Check Palindrome
description: 'A palindrome reads the same forwards and backwards, like "121" or "racecar."'
tags:
  - DSA
  - leetcode
  - problem-solving
companies:
  - Apple
  - Google
---

## Leetcode: Problem-9

### Description:

Given an integer x, return true if x is a palindrome, and false otherwise.

## Video Explanation

<LiteYouTubeEmbed
  id="kNE3vq1g2e8"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Frequently Asked Java Program 04: Palindrome Number | How to Check Given Number is Palindrome or Not"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

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

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) return false;
        long long reversed = 0, original = x;
        while (x != 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        return original == reversed;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

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

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        return str(x) == str(x)[::-1]
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var isPalindrome = function(x) {
    if (x < 0) return false;
    const str = x.toString();
    return str === str.split('').reverse().join('');
};
```

  </TabItem>
</Tabs>
