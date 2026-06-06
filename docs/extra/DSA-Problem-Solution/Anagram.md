---
id: minimum-number-of-steps-to-make-two-strings-anagram
title: "Minimum Number of Steps to Make Two Strings Anagram"
sidebar_label: Minimum Steps to Make Anagram
description: "Finding the minimum number of character replacements to make two strings anagrams using frequency counting."
tags: [DSA, leetcode, string, hash-table, counting]
---

## Description:

You are given two strings of the same length `s` and `t`. In one step you can choose **any character** of `t` and replace it with **another character**.

Return *the minimum number of steps* to make `t` an anagram of `s`.

An **Anagram** of a string is a string that contains the same characters with a different (or the same) ordering.

**Example 1:**
Input: `s = "bab", t = "aba"`
Output: `1`
**Explanation:** Replace the first 'a' in t with b, t = "bba" which is anagram of s.

**Example 2:**
Input: `s = "leetcode", t = "practice"`
Output: `5`
**Explanation:** Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.

**Example 3:**
Input: `s = "anagram", t = "mangaar"`
Output: `0`
**Explanation:** "anagram" and "mangaar" are anagrams.

---

## Approaches:

### 1. Frequency Counting Algorithm

An anagram requires the two strings to have the exact same characters with the exact same frequencies. Since both strings `s` and `t` are of the same length, every time `t` has a character that isn't in `s` (or has more of a specific character than `s`), it means `t` is simultaneously missing a required character from `s`. 

Therefore, we only need to count how many characters in `s` are missing in `t`. We can do this efficiently by creating a frequency array for the 26 lowercase English letters. We iterate through both strings simultaneously: incrementing the count for characters in `s` and decrementing the count for characters in `t`. The sum of all positive values remaining in our array represents the exact number of character replacements needed.

* **Time Complexity:** $O(n)$ where $n$ is the length of the string `s` (or `t`). We iterate through the strings once.
* **Space Complexity:** $O(1)$ because we only use a fixed-size frequency array of 26 integers, taking constant extra space regardless of the input size.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int minSteps(string s, string t) {
        vector<int> count(26, 0);
        
        for (int i = 0; i < s.length(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        
        int steps = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                steps += count[i];
            }
        }
        
        return steps;
    }
};
```
**Java**
```java
class Solution {
    public int minSteps(String s, String t) {
        int[] count = new int[26];
        
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        
        int steps = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                steps += count[i];
            }
        }
        
        return steps;
    }
}
```

**Python**
```py
class Solution:
    def minSteps(self, s: str, t: str) -> int:
        count = [0] * 26
        
        for i in range(len(s)):
            count[ord(s[i]) - ord('a')] += 1
            count[ord(t[i]) - ord('a')] -= 1
            
        steps = 0
        for c in count:
            if c > 0:
                steps += c
                
        return steps
```

**JavaScript**
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const minSteps = function(s, t) {
    let count = new Array(26).fill(0);
    let n = s.length;
    
    for (let i = 0; i < n; i++) {
        count[s.charCodeAt(i) - 97]++; 
        count[t.charCodeAt(i) - 97]--;
    }
    
    let steps = 0;
    for (let i = 0; i < 26; i++) {
        if (count[i] > 0) {
            steps += count[i];
        }
    }
    
    return steps;
};
```