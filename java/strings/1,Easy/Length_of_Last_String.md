---
id: Length of Last String
title: Length of Last String
sidebar_label: Length of Last String  
description: "to find the length of last string."
tags: [java,dsa, algorithms,Problem solving,Strings,easy]
---

# Game Theory

**Length of Last String** 
Given a string s consisting of words and spaces, return the length of the last word in the string.
- Example 1:
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5

- Example 2:
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.

## Apporach
#### 1. Strip trailing whitespaces from the input string using the strip() method.
#### 2. Split the string into words using the split() method.
#### 3. If there are no words after stripping whitespaces, return 0.
#### 4. Otherwise, return the length of the last word, which is the last element in the list of words.



  
# Time complexity:
#### 1. Stripping trailing whitespaces takes linear time, so it's O(n) where n is the length of the input string.
#### 2. Splitting the string into words also takes linear time, so it's also O(n).
#### 3. The overall time complexity is O(n).

#
# Space complexity:
We store the list of words, which could take up to O(n) space if all characters in the input string are non-whitespace. So the space complexity is O(n).

## java Implementation 

```java

class Solution {
    public int lengthOfLastWord(String s) {
        s = s.trim();
        
        int length = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) != ' ') {
                length++;
            }
            else if (length > 0) {
                break;
            }
        }
        
        return length;
    }
}

```



## Conclusion 

The solution iterates over the input string from right to left, counting the length of the last word