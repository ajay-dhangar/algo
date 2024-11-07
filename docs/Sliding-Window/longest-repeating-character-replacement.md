---
id: longest-repeating-character-replacement
title: Longest Repeating Character Replacement
sidebar_label: Longest Repeating Character Replacement
sidebar_position: 4
description: "In this blog post, we will explore an efficient solution to the Longest Repeating Character Replacement problem using sliding window and frequency count."
tags: [dsa, algorithms, sliding window, strings]
---



### Problem Definition:

You are given a string `s` and an integer `k`. You can choose any character from the string and replace it with any other character up to `k` times. The task is to find the length of the longest substring that contains the same character after performing at most `k` character replacements.

### Example:

Let's consider the string `s = "AABABBA"` and `k = 1`.

We want to find the longest substring where at most one character can be replaced, such that all characters in that substring are the same.

For the above example:

- After replacing one character, the longest valid substring would be `"AABA"`, with length 4.  

### Approach: Sliding Window and Frequency Count

To solve this problem efficiently, we use the **sliding window** technique along with a frequency count of characters within the current window. We aim to maximize the length of a substring where the majority of the characters are the same, and we replace the rest.

### Steps:

1. **Initialize Two Pointers**:  
   Use two pointers `left` and `right` to define a sliding window over the string. Start both pointers at the beginning of the string.

2. **Track Character Frequency**:  
   Maintain a frequency count for each character within the current window, and keep track of the maximum frequency of any character in the window.

3. **Check Valid Substring**:  
   For each new window (i.e., each new position of `right`), check if the number of replacements needed to make the entire window uniform (i.e., `right - left + 1 - maxFreq`) is less than or equal to `k`. If yes, the window is valid, and you can expand it. If not, shift the `left` pointer to shrink the window.

4. **Maximize the Window Length**:  
   Keep track of the maximum valid window length during the entire process.

### Time Complexity:
- **O(n)**, where `n` is the length of the string. Each character is processed once by the sliding window, and the character count is updated in constant time.

### Space Complexity:
- **O(1)**, since the frequency count array size is fixed (for 26 possible characters).

### C++ Code Implementation:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int characterReplacement(string s, int k) {
    int maxLen = 0;  // Tracks the length of the longest valid substring
    int maxFreq = 0;  // Tracks the frequency of the most common character in the window
    vector<int> charCount(26, 0);  // Frequency count for each character
    int left = 0;  // Left pointer for the sliding window

    for (int right = 0; right < s.size(); ++right) {
        // Update the frequency of the current character
        charCount[s[right] - 'A']++;
        maxFreq = max(maxFreq, charCount[s[right] - 'A']);  // Update maxFreq

        // Check if the current window is valid
        int windowSize = right - left + 1;
        if (windowSize - maxFreq > k) {
            // If the window is not valid, shrink the window from the left
            charCount[s[left] - 'A']--;
            left++;
        }

        // Update the maximum valid window size
        maxLen = max(maxLen, right - left + 1);
    }

    return maxLen;
}

int main() {
    string s = "AABABBA";
    int k = 1;
    
    int result = characterReplacement(s, k);
    cout << "The length of the longest repeating character substring is: " << result << endl;

    return 0;
}
```


### Java Code Implementation:

```java
import java.util.*;

public class CharacterReplacement {

    public static int characterReplacement(String s, int k) {
        int maxLen = 0;  // Tracks the length of the longest valid substring
        int maxFreq = 0;  // Tracks the frequency of the most common character in the window
        int[] charCount = new int[26];  // Frequency count for each character
        int left = 0;  // Left pointer for the sliding window

        for (int right = 0; right < s.length(); ++right) {
            // Update the frequency of the current character
            charCount[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, charCount[s.charAt(right) - 'A']);  // Update maxFreq

            // Check if the current window is valid
            int windowSize = right - left + 1;
            if (windowSize - maxFreq > k) {
                // If the window is not valid, shrink the window from the left
                charCount[s.charAt(left) - 'A']--;
                left++;
            }

            // Update the maximum valid window size
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }

    public static void main(String[] args) {
        String s = "AABABBA";
        int k = 1;
        
        int result = characterReplacement(s, k);
        System.out.println("The length of the longest repeating character substring is: " + result);
    }
}
```

## Explanation:
Sliding Window:
We maintain a sliding window using two pointers, left and right, to explore the string and check valid substrings. As we move the right pointer, we add the new character to our frequency count and adjust the window size to find the longest valid substring.

Max Frequency and Validity:
The key idea is that the longest valid window will have the majority of one character, and the rest can be replaced (up to k replacements). We keep track of the maximum frequency of any character in the current window, and if the number of replacements required (i.e., window size - max frequency) exceeds k, we shift the left pointer to shrink the window.

Example Walkthrough:
For the string s = "AABABBA" and k = 1:

Window [0, 3] → "AABA" has 1 replacement and max frequency 3 → valid.
Window [1, 4] → "ABAB" has 1 replacement and max frequency 2 → valid.
Window [2, 5] → "BABB" has 1 replacement and max frequency 2 → valid.
The maximum length is 4, as achieved by the window "AABA".

## Time Complexity:
The sliding window ensures that we only traverse each character of the string once, making the solution linear in time.