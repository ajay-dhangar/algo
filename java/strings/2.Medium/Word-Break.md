---
id: Word Break
title: Word Break
sidebar_label: Word Break  
description: "to return true if s can be segmented into a space-separated sequence of one or more dictionary words."
tags: [java,dsa, algorithms,Problem solving,Strings,medium]
---

# Game Theory

**Word Break** 
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.
- Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

- Example 2:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

## Apporach
#### 1.We'll use a bottom-up dynamic programming approach.
#### 2.The dp array will store boolean values indicating whether a substring starting from a given index can be broken down.
#### 3.We initialize the last element of dp to true since an empty substring can always be broken down.
#### 4.Then, we iterate through the string from the end to the beginning:
    For each index i, we iterate through the dictionary:
        If the substring starting from i and ending at i + wordDict.get(j).length() - 1 is a word in the dictionary, we check if the substring starting from i + wordDict.get(j).length() can be broken down.
        If both conditions are true, we set dp[i] to true.
#### 5.Finally, we return dp[0], which indicates whether the entire string can be broken down.



  
# Complexity:

## Time complexity:
The outer loop iterates n times, where n is the length of the string.
The inner loop iterates m times, where m is the size of the dictionary.
Therefore, the overall time complexity is O(n * m).
## Space complexity:
The dp array has a size of n + 1, so its space complexity is O(n).
The space used by the dictionary is not considered for space complexity analysis in this case.
Therefore, the total space complexity is O(n).
## java Implementation 

```java

class Solution {
    
    public boolean wordBreak(String s, List<String> wordDict) {
        boolean[] dp = new boolean[s.length()+1];
        dp[s.length()]= true;
        for(int i=s.length()-1;i>=0;i--){
            for(int j=0;j<wordDict.size();j++){
                if(i + wordDict.get(j).length() <= s.length() && s.substring(i,i+wordDict.get(j).length()).equals(wordDict.get(j))){
                    dp[i] = dp[i+ wordDict.get(j).length()];
                    if (dp[i]) break;
                }
                
            }
        }
        return dp[0];
    }
}

```



## Conclusion 
- The provided Java implementation effectively solves the word break problem using dynamic programming. By maintaining a boolean array dp to track valid word breaks, the algorithm ensures that each substring is checked efficiently. This approach has a time complexity of O(n * m), where n is the length of the string and m is the number of words in the dictionary, making it both efficient and easy to understand