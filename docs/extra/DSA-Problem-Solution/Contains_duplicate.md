---
id: contains-duplicate-leetcode-217
title: Contains Duplicate
sidebar_label: Leetcode 217
tags: [Leetcode, Array, DSA, Contains duplicate]
description: Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
---

## 217. Contains Duplicate
**Description**:  
You are given an array of integers, `nums`, which may contain both positive and negative numbers. Your task is to determine whether any value appears more than once in the array. If at least one duplicate exists, return `true`. Otherwise, return `false`.

## Example 1:

**Input:**  
`nums = [1, 2, 3, 1]`

**Output:**  
`true` (because 1 appears twice)

**Explanation:**  
- The frequency of 1 is 2  
- The frequency of 2 is 1  
- The frequency of 3 is 1  
- Since 1 appears twice, there is a duplicate, so the output is `true`.

## Example 2:

**Input:**  
`nums = [1, 2, 3, 4]`

**Output:**  
`false` (because all elements are distinct)

**Explanation:**  
- All elements are unique and appear only once.

## C++ Code:
```cpp
#include <iostream>
#include <unordered_set>
#include <vector>

using namespace std;

bool containsDuplicate(const vector<int>& nums) {
    unordered_set<int> uniques;
    
    for (int num : nums) {
        // If the number is already in the set, it means it's a duplicate
        if (uniques.find(num) != uniques.end()) {
            return true;
        }
        // Add the number to the set
        uniques.insert(num);
    }
    return false;
}

int main() {
    vector<int> nums = {1, 2, 3, 1}; // Example input
    if (containsDuplicate(nums)) {
        cout << "Array contains duplicates." << endl;
    } else {
        cout << "Array does not contain duplicates." << endl;
    }
    
    return 0;
}

```
## Approach and code explanation
**Using a Set for Uniqueness:**
- A set data structure inherently stores unique values. In C++, we used an unordered_set for this purpose, which allows us to:
Insert elements in O(1) average time.
Check if an element exists (lookup) in O(1) average time.

**Iterating Through the Array:**
- The algorithm iterates through each element of the array.
For each element:
It checks if the element already exists in the set (using the find() method). If it does, this means the element is a duplicate, so we return true.
If the element is not found in the set, it is added to the set to track that we’ve seen it before.

**Returning the Result:**
- If the loop completes without finding any duplicates, the function returns false, meaning all elements in the array are distinct.
Code Flow:
Initialization: We declare an `unordered_set<int>` uniques to store the unique numbers encountered during the iteration.

**Loop through the array:**
- For each number in the array:
Check for duplication: If the number is already in the set, return true (duplicate found).
Insert into the set: If not found, add the number to the set.
Final Result: If the loop completes without finding any duplicates, return false.

## complexcity
## Time Complexity:
Time complexity- O(n), where n is the size of the input array.

## Space complexity:
-O(n), as we are using an unordered_set to store up to n unique elements.