---
id: Longest Substring Without Repeating Characters
title: Longest Substring Without Repeating Characters
sidebar_label: Longest Substring Without Repeating Characters  
description: "to find the longest substring without repeating characters."
tags: [java,dsa, algorithms,Problem solving,Strings,medium]
---

# Game Theory

**Longest Substring Without Repeating Characters** 
Given a string s, find the length of the longest substring without repeating characters.
- Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

- Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

## Apporach
#### 1.We use a set (charSet) to keep track of unique characters in the current substring.
#### 2.We maintain two pointers, left and right, to represent the boundaries of the current substring.
#### The maxLength variable keeps track of the length of the longest substring encountered so far.
#### 4.We iterate through the string using the right pointer.
#### 5.If the current character is not in the set (charSet), it means we have a new unique character.
#### 6.We insert the character into the set and update the maxLength if necessary.
#### 7.If the character is already present in the set, it indicates a repeating character within the current substring.
#### 8.In this case, we move the left pointer forward, removing characters from the set until the repeating character is no longer present.
#### 9.We insert the current character into the set and continue the iteration.
#### 10.Finally, we return the maxLength as the length of the longest substring without repeating characters.


## java Implementation 

```java

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        int maxLength = 0;
        Set<Character> charSet = new HashSet<>();
        int left = 0;
        
        for (int right = 0; right < n; right++) {
            if (!charSet.contains(s.charAt(right))) {
                charSet.add(s.charAt(right));
                maxLength = Math.max(maxLength, right - left + 1);
            } else {
                while (charSet.contains(s.charAt(right))) {
                    charSet.remove(s.charAt(left));
                    left++;
                }
                charSet.add(s.charAt(right));
            }
        }
        
        return maxLength;
    }
}

```



## Conclusion 
- The provided Java implementation effectively finds the length of the longest substring without repeating characters. By using a sliding window approach with two pointers and a HashSet to track characters, the algorithm ensures that each character is processed efficiently. This results in an optimal time complexity of O(n), making the solution both efficient and easy to understand.