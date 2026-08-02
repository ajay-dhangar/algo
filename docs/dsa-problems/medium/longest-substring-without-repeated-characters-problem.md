---
id: longest-substring-without-repeated-characters-problem
title: Longest Substring Without Repeating Characters
sidebar_label: Longest Substring Without Repeating Characters
description: >-
  This document explains the 'Longest Substring Without Repeating Characters'
  problem, including its description, approach, and implementation.
tags:
  - dsa
  - algorithms
  - problem-solving
companies:
  - Amazon
  - Google
  - LinkedIn
  - Meta
  - Microsoft
  - Netflix
---

# Longest Substring Without Repeating Characters

## Problem Statement
Given a string, find the length of the longest substring without repeating characters.

## Video Explanation

<LiteYouTubeEmbed
  id="wiGpQwVHdE0"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Longest Substring Without Repeating Characters - Leetcode 3 - Python"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## Approach
We can use the `sliding window technique` along with a `hash map` to track the characters and their indices.

### Steps:

1. **Initialize**:  
   - Create a hash map to store the last seen index of each character.
   - Initialize two pointers, `start` and `end`, to the beginning of the string.


2. **Iterate**:  
   - For each character, check if it has been seen and is in the current window.
   - Update the `start` pointer if necessary.
   - Update the `end`.

3. **Return**:  
   - Return the maximum length found.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> charMap;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            if (charMap.count(s[right]) && charMap[s[right]] >= left) {
                left = charMap[s[right]] + 1;
            }
            charMap[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        max_length = 0
        start = 0

        for i, char in enumerate(s):
            if char in char_index and char_index[char] >= start:
                start = char_index[char] + 1
            char_index[char] = i
            max_length = max(max_length, i - start + 1)

        return max_length
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s.charAt(right);
        if (map.has(c) && map.get(c) >= left) {
            left = map.get(c) + 1;
        }
        map.set(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

  </TabItem>
</Tabs>
