---
id: character-replacement
title: Character Replacement
sidebar_label: Character Replacement
sidebar_position: 4
description: "In this blog post, we'll explore how to solve the character replacement problem using the sliding window technique."
tags: [dsa, algorithms, sliding window, strings]
---

## Character Replacement

### Problem Definition:

You are given a string consisting of uppercase English letters and an integer `k`. Your task is to find the length of the longest substring that can be obtained by replacing at most `k` characters in the string.

### Example:

Let's consider the string `s = "AABABBA"` and `k = 1`. 

The longest substring we can form by replacing at most `k` characters is `"AABAB"` or `"ABABB"`, both of which have a length of **5**.

### Approach: Sliding Window Technique

To solve this problem efficiently, we can use the **sliding window technique**. This technique allows us to maintain a window that represents a substring and expand or contract this window based on certain conditions.

### Steps:

1. **Initialize Variables**:  
   Use two pointers (`left` and `right`) to represent the window, and maintain a count of the most frequently occurring character within the window.

2. **Expand the Right Pointer**:  
   Move the `right` pointer to the right, expanding the window to include new characters. Update the count of the characters as you do this.

3. **Check Validity**:  
   If the number of characters that need to be replaced (calculated as the total number of characters in the window minus the count of the most frequent character) exceeds `k`, move the `left` pointer to shrink the window from the left side until the condition is satisfied.

4. **Update the Maximum Length**:  
   During the process, keep track of the maximum length of valid substrings found.

### Time Complexity:
- **O(n)**, where `n` is the length of the string, since each character is processed at most twice (once by the right pointer and once by the left pointer).

### Space Complexity:
- **O(1)**, since we only need a fixed amount of space for the character count (26 for uppercase letters).

### C++ Code Implementation:

```cpp
#include <iostream>
#include <unordered_map>
#include <algorithm>
using namespace std;

int characterReplacement(string s, int k) {
    unordered_map<char, int> count;
    int left = 0, max_count = 0, max_length = 0;

    for (int right = 0; right < s.size(); right++) {
        count[s[right]]++;
        max_count = max(max_count, count[s[right]]);

        while (right - left + 1 - max_count > k) {
            count[s[left]]--;
            left++;
        }

        max_length = max(max_length, right - left + 1);
    }

    return max_length;
}

int main() {
    string s = "AABABBA";
    int k = 1;

    int result = characterReplacement(s, k);
    cout << "The length of the longest substring is: " << result << endl;

    return 0;
}
```


### Java Code Implementation:
```java
import java.util.HashMap;

public class CharacterReplacement {

    public static int characterReplacement(String s, int k) {
        HashMap<Character, Integer> count = new HashMap<>();
        int left = 0, maxCount = 0, maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);
            count.put(rightChar, count.getOrDefault(rightChar, 0) + 1);
            maxCount = Math.max(maxCount, count.get(rightChar));

            while (right - left + 1 - maxCount > k) {
                char leftChar = s.charAt(left);
                count.put(leftChar, count.get(leftChar) - 1);
                left++;
            }

            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        String s = "AABABBA";
        int k = 1;

        int result = characterReplacement(s, k);
        System.out.println("The length of the longest substring is: " + result);
    }
}
```
