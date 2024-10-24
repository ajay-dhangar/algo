---
id: Longest Common String
title: Longest Common String
sidebar_label: Longest Common String  
description: "to find the longest common string among the given strings."
tags: [java,dsa, algorithms,Problem solving,strings,easy]
---

# Game Theory

**Longest Common String** 
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".
- Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"

- Example 2:
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

## Apporach
This code implements the longestCommonPrefix function that takes a list of strings v as input and returns the longest common prefix of all the strings. Here is an explanation of how the code works:

#### 1. Initialize an empty string ans to store the common prefix.
#### 2. Sort the input list v lexicographically. This step is necessary because the common prefix should be common to all the strings, so we need to find the common prefix of the first and last string in the sorted list.
#### 3. Iterate through the characters of the first and last string in the sorted list, stopping at the length of the shorter string.
#### 4. If the current character of the first string is not equal to the current character of the last string, return the common prefix found so far.
#### 5. Otherwise, append the current character to the ans string.
#### 6.Return the ans string containing the longest common prefix.
Note that the code assumes that the input list v is non-empty, and that all the strings in v have at least one character. If either of these assumptions is not true, the code may fail.



## java Implementation 

```java

class Solution {
    public String longestCommonPrefix(String[] v) {
        StringBuilder ans = new StringBuilder();
        Arrays.sort(v);
        String first = v[0];
        String last = v[v.length-1];
        for (int i=0; i<Math.min(first.length(), last.length()); i++) {
            if (first.charAt(i) != last.charAt(i)) {
                return ans.toString();
            }
            ans.append(first.charAt(i));
        }
        return ans.toString();
    }
}

```



## Conclusion 
The provided Java implementation efficiently finds the longest common prefix among an array of strings. By sorting the array and comparing the first and last strings, the algorithm ensures that the common prefix is identified in O(n log n) time complexity due to the sorting step. This approach is both simple and effective for solving the problem.