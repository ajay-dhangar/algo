---
id: process-string-with-special-operations-i
title: "Process String with Special Operations I"
sidebar_label: Process String with Special Operations I
description: "Simulating string processing with backspace, duplicate, and reverse operations."
tags: [DSA, leetcode, string, simulation]
---

## Problem Statement

You are given a string `s` consisting of lowercase English letters and the special characters: `*`, `#`, and `%`.

Build a new string `result` by processing `s` according to the following rules from left to right:
- If the letter is a lowercase English letter, append it to `result`.
- A `*` removes the last character from `result`, if it exists (backspace).
- A `#` duplicates the current `result` and appends it to itself.
- A `%` reverses the current `result`.

Return the final string `result` after processing all characters in `s`.

**Example 1:**
* **Input:** `s = "a#b%*"`
* **Output:** `"ba"`
* **Explanation:**
  1. `'a'` -> Append: `"a"`
  2. `'#'` -> Duplicate: `"aa"`
  3. `'b'` -> Append: `"aab"`
  4. `'%'` -> Reverse: `"baa"`
  5. `'*'` -> Remove last: `"ba"`

**Example 2:**
* **Input:** `s = "z*#"`
* **Output:** `""`
* **Explanation:**
  1. `'z'` -> Append: `"z"`
  2. `'*'` -> Remove last: `""`
  3. `'#'` -> Duplicate: `""`

---

## Approach: Simulation

Since the constraints on the length of the string are extremely small ($N \le 20$), we can solve this by directly simulating the operations using a dynamic array, list, or string builder depending on the language. 

1. Maintain an empty `result` structure.
2. Iterate through each character of the input string `s`.
3. Based on the character, perform the respective operation:
    - **Lowercase letter (`a-z`):** Add to the end of the `result`.
    - **Asterisk (`*`):** Pop the last element (make sure to check if the `result` is not empty first).
    - **Hash (`#`):** Concatenate the current `result` to itself.
    - **Percent (`%`):** Reverse the characters in the `result`.
4. Once the loop finishes, return the final `result` casted back to a string.

Using a list or character array is typically more efficient for these operations than manipulating immutable strings directly, especially for the reverse and duplicate steps.

## Complexity Analysis

* **Time Complexity:** $O(2^N)$
  In the absolute worst-case scenario, the string size can double at each step (e.g., if the input is mostly `#` characters). For an input length $N$, the maximum length of the output string and the maximum number of operations required to reverse or duplicate the string would be proportional to $2^N$.
* **Space Complexity:** $O(2^N)$
  The space required to store the intermediate and final `result` string can grow exponentially, up to $O(2^N)$ characters.

---

## Solutions

### C++

```cpp
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    string processStr(string s) {
        string ans = "";
        for (char c : s) {
            if (c >= 'a' && c <= 'z') {
                ans.push_back(c);
            } else if (c == '*') {
                if (!ans.empty()) {
                    ans.pop_back();
                }
            } else if (c == '#') {
                ans += ans;
            } else if (c == '%') {
                reverse(ans.begin(), ans.end());
            }
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public String processStr(String s) {
        StringBuilder ans = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                ans.append(c);
            } else if (c == '*') {
                if (ans.length() > 0) {
                    ans.deleteCharAt(ans.length() - 1);
                }
            } else if (c == '#') {
                ans.append(ans);
            } else if (c == '%') {
                ans.reverse();
            }
        }
        return ans.toString();
    }
}
```

### Python

```py
class Solution:
    def processStr(self, s: str) -> str:
        ans = []
        for c in s:
            if 'a' <= c <= 'z':
                ans.append(c)
            elif c == '*':
                if ans:
                    ans.pop()
            elif c == '#':
                ans.extend(ans)
            elif c == '%':
                ans.reverse()
        return "".join(ans)
```

### JavaScript

```js
/**
 * @param {string} s
 * @return {string}
 */
var processStr = function(s) {
    let ans = [];
    for (let c of s) {
        if (c >= 'a' && c <= 'z') {
            ans.push(c);
        } else if (c === '*') {
            if (ans.length > 0) {
                ans.pop();
            }
        } else if (c === '#') {
            ans = ans.concat(ans);
        } else if (c === '%') {
            ans.reverse();
        }
    }
    return ans.join("");
};
```