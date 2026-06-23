---
id: maximum-number-of-balloons
title: "Maximum Number of Balloons"
sidebar_label: Maximum Number of Balloons
description: "Finding the maximum number of instances of the word 'balloon' that can be formed from a given string."
tags: [DSA, leetcode, hash-table, string, counting]
---

## Description:

Given a string `text`, you want to use the characters of `text` to form as many instances of the word **"balloon"** as possible.

You can use each character in `text` **at most once**. Return the maximum number of instances that can be formed.

**Example 1:**

Input: `text = "nlaebolko"`
Output: `1`
**Explanation:** We can form one instance of the word "balloon".

**Example 2:**

Input: `text = "loonbalxballpoon"`
Output: `2`
**Explanation:** We can form two instances of the word "balloon".

**Example 3:**

Input: `text = "leetcode"`
Output: `0`
**Explanation:** We cannot form the word "balloon".

---

## Approaches:

### 1. Frequency Counting Array

To find how many times we can form the word "balloon", we need to count the occurrences of its constituent characters in the input string `text`. 

The word **"balloon"** requires:
- `b`: 1
- `a`: 1
- `l`: 2
- `o`: 2
- `n`: 1

1. **Count Frequencies:** Use a frequency array of size 26 (to represent the English alphabet) or a hash map to count the occurrences of every character in the `text`.
2. **Calculate Limiting Factor:** The maximum number of "balloon" words we can form is constrained by the character that appears the least relative to its required amount. 
3. **Find the Minimum:** We take the minimum count among `b`, `a`, `l/2`, `o/2`, and `n`. We divide the counts of `l` and `o` by 2 because each instance of the word requires two of those letters.

### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the length of the string `text`. We only need to iterate through the string once to count the characters.
* **Space Complexity:** $O(1)$ because the frequency array is fixed at size 26, which is constant regardless of the input string's size.

---

## Solutions:

### C++
```cpp
class Solution {
public:
    int maxNumberOfBalloons(string text) {
        vector<int> count(26, 0);
        
        // Count frequencies of all characters
        for (char c : text) {
            count[c - 'a']++;
        }
        
        // Find the minimum limiting character
        return min({
            count['b' - 'a'], 
            count['a' - 'a'], 
            count['l' - 'a'] / 2, 
            count['o' - 'a'] / 2, 
            count['n' - 'a']
        });
    }
};
```

### Java
```java
class Solution {
    public int maxNumberOfBalloons(String text) {
        int[] count = new int[26];
        
        // Count frequencies of all characters
        for (char c : text.toCharArray()) {
            count[c - 'a']++;
        }
        
        // Find the minimum limiting character
        return Math.min(count['b' - 'a'], 
               Math.min(count['a' - 'a'], 
               Math.min(count['l' - 'a'] / 2, 
               Math.min(count['o' - 'a'] / 2, count['n' - 'a']))));
    }
}
```

### Python
```py
from collections import Counter

class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        # Count frequencies of all characters
        count = Counter(text)
        
        # Find the minimum limiting character
        return min(
            count['b'], 
            count['a'], 
            count['l'] // 2, 
            count['o'] // 2, 
            count['n']
        )
```

### JavaScript
```js
/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    const count = new Array(26).fill(0);
    
    // Count frequencies of all characters
    for (let i = 0; i < text.length; i++) {
        count[text.charCodeAt(i) - 97]++;
    }
    
    // index 1 is 'b', 0 is 'a', 11 is 'l', 14 is 'o', 13 is 'n'
    return Math.min(
        count[1], 
        count[0], 
        Math.floor(count[11] / 2), 
        Math.floor(count[14] / 2), 
        count[13]
    );
};
```