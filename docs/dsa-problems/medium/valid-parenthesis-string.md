---
id: valid-parenthesis-string
title: "Valid Parenthesis String"
sidebar_label: Valid Parenthesis String
description: "Solving the Valid Parenthesis String problem using an optimal Greedy approach."
tags: [DSA, leetcode, string, greedy, dynamic-programming]
---

## Description:

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` if `s` is **valid**.

The following rules define a **valid** string:
1. Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
2. Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
3. Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
4. `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string `""`.

**Example 1:**

Input: `s = "()"`
Output: `true`

**Example 2:**

Input: `s = "(*)"`
Output: `true`
**Explanation:** The `'*'` can be treated as an empty string.

**Example 3:**

Input: `s = "(*))"`
Output: `true`
**Explanation:** The `'*'` can be treated as a left parenthesis `'('`.

## Video Explanation

<LiteYouTubeEmbed
  id="_SrCMbCsn2w"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Lec-58: Operator overloading in C++ Programming | C++ programming for beginners | C++ by Varun sir"
  lazyLoad={true}
  webp
/>

---

## Approaches:

### 1. Greedy Approach (Optimal)

Instead of using a stack or dynamic programming, we can solve this problem optimally in a single pass using a greedy approach. Since the `'*'` character introduces branching possibilities, we can maintain the **range** of possible open left parentheses at any given step.

We maintain two variables:
- `minOpen`: The minimum possible number of open left parentheses.
- `maxOpen`: The maximum possible number of open left parentheses.

1. **Iterate through the string:**
   - If we see a `'('`: Both `minOpen` and `maxOpen` increment by 1.
   - If we see a `')'`: Both `minOpen` and `maxOpen` decrement by 1.
   - If we see a `'*'`: It could be an open parenthesis (`maxOpen++`), a close parenthesis (`minOpen--`), or empty (leaves limits unchanged, but effectively expands our range of possibilities).
2. **Validation Checks:**
   - If at any point `maxOpen < 0`, it means even if we converted every `'*'` to a `'('`, we still have too many `')'`. Thus, the string is invalid, and we immediately return `false`.
   - If `minOpen < 0`, it means we might have counted too many `'*'` as `')'`. A negative open count is impossible in reality, so we just reset `minOpen` to `0` (essentially treating those extra `'*'` as empty strings instead).
3. **Final Check:** At the end of the string, if `minOpen == 0`, it means we successfully matched all parentheses.

### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the length of the string `s`. We only traverse the string exactly once.
* **Space Complexity:** $O(1)$ as we only use two integer variables (`minOpen` and `maxOpen`) regardless of the size of the input.

---

## Solutions:

### C++
```cpp
class Solution {
public:
    bool checkValidString(const string& s) {
        int minOpen = 0;
        int maxOpen = 0;
        
        for (char c : s) {
            if (c == '(') {
                minOpen++;
                maxOpen++;
            } else if (c == ')') {
                minOpen--;
                maxOpen--;
            } else { // c == '*'
                minOpen--;
                maxOpen++;
            }
            
            // If maxOpen is negative, we have too many ')'
            if (maxOpen < 0) return false;
            
            // minOpen can't be negative, reset to 0
            if (minOpen < 0) minOpen = 0;
        }
        
        return minOpen == 0;
    }
};
```

### Java
```java
class Solution {
    public boolean checkValidString(String s) {
        int minOpen = 0;
        int maxOpen = 0;
        
        for (char c : s.toCharArray()) {
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                minOpen++;
                maxOpen++;
            } else if (c == ')') {
                minOpen--;
                maxOpen--;
            } else { // c == '*'
                minOpen--;
                maxOpen++;
            }
            // If maxOpen is negative, we have too many ')'
            if (maxOpen < 0) return false;
            
            // minOpen can't be negative, reset to 0
            if (minOpen < 0) minOpen = 0;
        }
        
        return minOpen == 0;
    }
}
```

### Python
```py
class Solution:
    def checkValidString(self, s: str) -> bool:
        min_open = 0
        max_open = 0
        
        for char in s:
            if char == '(':
                min_open += 1
                max_open += 1
            elif char == ')':
                min_open -= 1
                max_open -= 1
            else: # char == '*'
                min_open -= 1
                max_open += 1
            
            # If max_open is negative, we have too many ')'
            if max_open < 0:
                return False
                
            # min_open can't be negative, reset to 0
            if min_open < 0:
                min_open = 0
                
        return min_open == 0
```

### JavaScript
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    let minOpen = 0;
    let maxOpen = 0;
    
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        
        if (char === '(') {
            minOpen++;
            maxOpen++;
        } else if (char === ')') {
            minOpen--;
            maxOpen--;
        } else { // char === '*'
            minOpen--;
            maxOpen++;
        }
        
        // If maxOpen is negative, we have too many ')'
        if (maxOpen < 0) return false;
        
        // minOpen can't be negative, reset to 0
        if (minOpen < 0) minOpen = 0;
    }
    
    return minOpen === 0;
};
```
