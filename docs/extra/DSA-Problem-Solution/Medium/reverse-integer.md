---
id: reverse-integer
title: "Reverse Integer"
sidebar_label: Reverse Integer
description: "This document explains the Reverse Integer problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving, math]
---

## Problem Statement
Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.

## Approach
To reverse an integer, we can repeatedly extract the last digit using the modulo operator (`% 10`) and append it to our reversed number by multiplying the current reversed number by 10 and adding the extracted digit. 

### Steps:

1. **Initialize**:  
   - Create a variable `reversed_num` and set it to 0.
   - Keep track of the sign of `x`.

2. **Iterate**:  
   - While `x` is not zero:
     - Extract the last digit: `digit = abs(x) % 10`
     - Update `x`: `x = int(x / 10)` (truncating towards zero)
     - Append the digit: `reversed_num = (reversed_num * 10) + digit`

3. **Check Bounds**:  
   - If `reversed_num` goes beyond the 32-bit signed integer range `[-2^31, 2^31 - 1]`, return `0`.

4. **Return**:  
   - Restore the sign and return `reversed_num`.

## Java Implementation

```java
class Solution {
    public int reverse(int x) {
        int reversedNum = 0;
        
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            
            // Check for integer overflow before multiplying by 10
            if (reversedNum > Integer.MAX_VALUE / 10 || (reversedNum == Integer.MAX_VALUE / 10 && digit > 7)) {
                return 0;
            }
            if (reversedNum < Integer.MIN_VALUE / 10 || (reversedNum == Integer.MIN_VALUE / 10 && digit < -8)) {
                return 0;
            }
            
            reversedNum = reversedNum * 10 + digit;
        }
        
        return reversedNum;
    }
}
```

## Python Implementation

```python
class Solution:
    def reverse(self, x: int) -> int:
        INT_MIN, INT_MAX = -2**31, 2**31 - 1
        
        reversed_num = 0
        sign = -1 if x < 0 else 1
        x = abs(x)
        
        while x != 0:
            digit = x % 10
            x //= 10
            
            reversed_num = reversed_num * 10 + digit
            
        reversed_num *= sign
        
        if reversed_num < INT_MIN or reversed_num > INT_MAX:
            return 0
            
        return reversed_num
```

## C++ Implementation

```cpp
#include <climits>

class Solution {
public:
    int reverse(int x) {
        int reversed_num = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            if (reversed_num > INT_MAX / 10 || (reversed_num == INT_MAX / 10 && digit > 7)) return 0;
            if (reversed_num < INT_MIN / 10 || (reversed_num == INT_MIN / 10 && digit < -8)) return 0;
            reversed_num = reversed_num * 10 + digit;
        }
        return reversed_num;
    }
};
```

## JavaScript Implementation

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const INT_MIN = -Math.pow(2, 31);
    const INT_MAX = Math.pow(2, 31) - 1;
    
    let reversed_num = 0;
    let sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    
    while (x !== 0) {
        let digit = x % 10;
        x = Math.floor(x / 10);
        
        reversed_num = reversed_num * 10 + digit;
    }
    
    reversed_num *= sign;
    
    if (reversed_num < INT_MIN || reversed_num > INT_MAX) {
        return 0;
    }
    
    return reversed_num;
};
```

Time Complexity: $O(log(x))$ <br /> 
Space Complexity: $O(1)$
