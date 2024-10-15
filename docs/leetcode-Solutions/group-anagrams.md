---
id: group-anagrams
sidebar_position: 6
title: Group Anagrams
sidebar_label: Group Anagrams
description: "This document explains the Group Anagrams problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# group-anagrams

## Description
Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example:
**Input**: `strs = ["eat","tea","tan","ate","nat","bat"]`  
**Output**: `[["bat"],["nat","tan"],["ate","eat","tea"]]`

**Input**: `strs = [""]`  
**Output**: `[[""]]`

**Input**: `strs = ["a"]`  
**Output**: `[["a"]]`

## Approach
To group the anagrams, we can follow this approach:

1. **Sort each string**: For each string in the input array, sort the characters. This sorted version of the string will serve as a key because anagrams will result in the same sorted string.
2. **Use a hash map**: Use a hash map (unordered_map in C++) where the key is the sorted string and the value is a list of anagrams that correspond to that key.
3. **Group anagrams**: For each string, insert it into the hash map using its sorted version as the key. Finally, return the values of the hash map as the groups of anagrams.

### Steps:
1. Create a hash map to store the sorted string as the key and the original strings as the values.
2. Iterate over each string in the input array:
   - Sort the string.
   - Use the sorted string as the key and append the original string to the list of values for that key in the hash map.
3. Return the values of the hash map, which are the groups of anagrams.

## C++ Implementation

```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> anagramMap;
        
        // Step 1: Iterate through each string
        for (const std::string& str : strs) {
            std::string sortedStr = str;
            std::sort(sortedStr.begin(), sortedStr.end()); // Sort the string
            
            // Step 2: Add the original string to the correct group in the map
            anagramMap[sortedStr].push_back(str);
        }
        
        // Step 3: Collect the groups of anagrams from the map
        std::vector<std::vector<std::string>> result;
        for (const auto& entry : anagramMap) {
            result.push_back(entry.second);
        }
        
        return result;
    }
};
```
time complexity of this approach is O(n * k log k) <br/>
The space complexity is O(n * k) where n is the number of strings and k is the maximum length of a string