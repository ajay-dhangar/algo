---
id: contains-duplicate-leetcode-217
title: "Contains Duplicate"
sidebar_label: Contains Duplicate
tags: [Leetcode, Array, DSA, Contains duplicate]
companies: [Amazon, Apple, Google]
description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct."
---

## 217. Contains Duplicate
**Description**:  
You are given an array of integers, `nums`, which may contain both positive and negative numbers. Your task is to determine whether any value appears more than once in the array. If at least one duplicate exists, return `true`. Otherwise, return `false`.

## Video Explanation

<LiteYouTubeEmbed
  id="3OamzN90kPg"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Contains Duplicate - Leetcode 217 - Python"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

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

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

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

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) {
                return true;
            }
        }
        return false;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var containsDuplicate = function(nums) {
    const set = new Set();
    for (const num of nums) {
        if (set.has(num)) return true;
        set.add(num);
    }
    return false;
};
```

  </TabItem>
</Tabs>
