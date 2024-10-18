---
id: longest-substring-k-distinct-characters
title: Longest Substring with K Distinct Characters
sidebar_label: Longest Substring with K Distinct Characters
sidebar_position: 4
description: "In this blog post, we will explore how to find the longest substring containing exactly K distinct characters using the sliding window technique."
tags: [dsa, algorithms, sliding window, strings]
---

## Longest Substring with K Distinct Characters

### Problem Definition:

Given a string `s` and an integer `k`, the task is to find the length of the **longest substring** of `s` that contains **exactly k distinct characters**. 

### Example:

Let's consider the string `s = "araaci"` and `k = 2`.

The possible substrings with exactly 2 distinct characters are:

- `"ara"` → Length = 3
- `"araa"` → Length = 4
- `"aci"` → Length = 3

The longest of these is `"araa"`, which has length **4**.

### Approach: Sliding Window

To solve this problem efficiently, we can use the **Sliding Window** technique combined with a **Hash Map** (or frequency counter). The idea is to maintain a window of characters that contains at most `k` distinct characters, and adjust the window dynamically as we traverse through the string.

### Steps:

1. **Initialize Pointers and Data Structures**:  
   Use two pointers `left` and `right` to represent the window's boundaries, and a hash map (or object) to store the frequency of characters in the current window.

2. **Expand the Window**:  
   Move the `right` pointer to expand the window by including the next character.

3. **Shrink the Window**:  
   When the number of distinct characters in the window exceeds `k`, move the `left` pointer to shrink the window until there are exactly `k` distinct characters.

4. **Update Maximum Length**:  
   Keep track of the maximum length of the valid window that contains exactly `k` distinct characters.

### Time Complexity:
- **O(n)**, where `n` is the length of the string. Each character is added to and removed from the sliding window at most once.

### Space Complexity:
- **O(k)**, where `k` is the number of distinct characters, because the hash map will contain up to `k` characters.

### C++ Code Implementation:

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int longestSubstringKDistinct(const string& s, int k) {
    if (s.empty() || k == 0) {
        return 0;
    }

    unordered_map<char, int> charFreq;
    int maxLength = 0, left = 0;

    for (int right = 0; right < s.size(); right++) {
        char rightChar = s[right];
        charFreq[rightChar]++;

        // Shrink the window if we have more than 'k' distinct characters
        while (charFreq.size() > k) {
            char leftChar = s[left];
            charFreq[leftChar]--;

            if (charFreq[leftChar] == 0) {
                charFreq.erase(leftChar);  // Remove from map if frequency becomes 0
            }
            left++;  // Move the left pointer
        }

        // Update the maximum length of the valid window
        maxLength = max(maxLength, right - left + 1);
    }

    return maxLength;
}

int main() {
    string s = "araaci";
    int k = 2;
    cout << "Longest substring with " << k << " distinct characters: " 
         << longestSubstringKDistinct(s, k) << endl;

    return 0;
}
```
## Explanation:
We use a sliding window that moves over the string by adjusting the right pointer to include more characters.
The charFreq map keeps track of the frequency of characters in the window.
When the number of distinct characters exceeds k, the left pointer is moved to the right until the window has exactly k distinct characters.
The maximum window size is updated at each valid window.