---
id: sliding-window
title: Sliding Window Algorithm
sidebar_label: Sliding Window
description: "A comprehensive guide to the Sliding Window algorithmic pattern with visual diagrams, step-by-step dry runs, code templates in Python, Java, and C++, and practice problems."
tags:
  [sliding-window, algorithms, patterns, dsa, interview-prep, beginner-friendly]
---

# Sliding Window Algorithm

The **Sliding Window** technique is one of the most powerful patterns in DSA. It converts an O(n²) brute-force approach into an elegant O(n) solution for problems involving **contiguous subarrays or substrings**.

## Video Explanation

<LiteYouTubeEmbed
  id="9kdHxplyl5I"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L1. Introduction to Sliding Window and 2 Pointers | Templates | Patterns"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

---

## 🧠 Core Idea

Instead of recalculating from scratch for every subarray, we **maintain a window** and slide it across the array — adding one element on the right and removing one on the left.

```
Array:  [ 2,  1,  5,  1,  3,  2 ]   K = 3

Window 1:  [2, 1, 5] → sum = 8
            ↓ slide
Window 2:  [1, 5, 1] → sum = 7   (remove 2, add 1)
            ↓ slide
Window 3:  [5, 1, 3] → sum = 9   (remove 1, add 3)  ← MAX
            ↓ slide
Window 4:  [1, 3, 2] → sum = 6   (remove 5, add 2)
```

---

## 🗂️ Types of Sliding Window

| Type                | Window Size     | Use When                                     |
| ------------------- | --------------- | -------------------------------------------- |
| **Fixed Window**    | Constant (K)    | Problem gives a fixed size K                 |
| **Variable Window** | Grows & shrinks | Find longest/shortest satisfying a condition |

---

## 🔒 Type 1: Fixed Size Sliding Window

### When to Use

- "Find max/min sum of subarray of size **K**"
- "Find average of every subarray of size **K**"
- The window size is given directly in the problem

### Visual Diagram

```
Problem: Max sum subarray of size K=3
Array = [2, 1, 5, 1, 3, 2]

STEP 1: Build first window
┌─────────────────┐
│  2  │  1  │  5  │  1    3    2
└─────────────────┘
  sum = 8    max = 8

STEP 2: Slide → remove left, add right
     ┌─────────────────┐
  2  │  1  │  5  │  1  │  3    2
     └─────────────────┘
  sum = 8 - 2 + 1 = 7    max = 8

STEP 3: Slide again
          ┌─────────────────┐
  2   1   │  5  │  1  │  3  │  2
          └─────────────────┘
  sum = 7 - 1 + 3 = 9    max = 9 ✅

STEP 4: Slide again
               ┌─────────────────┐
  2   1   5   │  1  │  3  │  2  │
               └─────────────────┘
  sum = 9 - 5 + 2 = 6    max = 9

Answer: 9
```

### Code Template

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```python
def max_sum_subarray(arr, k):
    n = len(arr)
    if n < k:
        return -1

    # Step 1: Build first window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # Step 2: Slide the window
    for i in range(k, n):
        window_sum += arr[i]       # Add incoming element (right)
        window_sum -= arr[i - k]   # Remove outgoing element (left)
        max_sum = max(max_sum, window_sum)

    return max_sum

# Example
arr = [2, 1, 5, 1, 3, 2]
print(max_sum_subarray(arr, 3))   # Output: 9
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class SlidingWindow {
    public static long maxSumSubarray(int[] arr, int k) {
        int n = arr.length;
        if (n < k) return -1;

        // Step 1: Build first window
        long windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        long maxSum = windowSum;

        // Step 2: Slide the window
        for (int i = k; i < n; i++) {
            windowSum += arr[i];         // Add incoming element (right)
            windowSum -= arr[i - k];     // Remove outgoing element (left)
            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        System.out.println(maxSumSubarray(arr, 3));   // Output: 9
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

long long maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) return -1;

    // Step 1: Build first window
    long long windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    long long maxSum = windowSum;

    // Step 2: Slide the window
    for (int i = k; i < n; i++) {
        windowSum += arr[i];         // Add incoming element (right)
        windowSum -= arr[i - k];     // Remove outgoing element (left)
        maxSum = max(maxSum, windowSum);
    }

    return maxSum;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    cout << maxSumSubarray(arr, 3) << endl;   // Output: 9
    return 0;
}
```

  </TabItem>
</Tabs>

**Time Complexity:** O(n) &nbsp;|&nbsp; **Space Complexity:** O(1)

---

## 🔓 Type 2: Variable Size Sliding Window

### When to Use

- "Find the **longest** substring/subarray satisfying a condition"
- "Find the **smallest** subarray with sum ≥ target"
- Window size is not fixed — it expands and shrinks based on a condition

### How it Works

```
Two pointers: LEFT and RIGHT
- RIGHT expands the window (moves forward always)
- LEFT shrinks the window (moves forward when condition is violated)

        LEFT                RIGHT
          ↓                   ↓
  [ a  b  c  d  e  f  g ]
          └───window──┘
```

### Classic Problem: Longest Substring Without Repeating Characters

```
Input: s = "a b c a b c b b"
           0 1 2 3 4 5 6 7

right=0: window="a"      no repeat → length=1
right=1: window="ab"     no repeat → length=2
right=2: window="abc"    no repeat → length=3
right=3: 'a' REPEATS!
         → shrink: remove s[left]='a', left=1
         → window="bca"  no repeat → length=3
right=4: 'b' REPEATS!
         → shrink: remove s[left]='b', left=2
         → window="cab"  no repeat → length=3
right=5: 'c' REPEATS!
         → shrink: remove s[left]='c', left=3
         → window="abc"  no repeat → length=3
right=6: 'b' REPEATS!
         → shrink until valid: left=5
         → window="cb"   length=2
right=7: 'b' REPEATS!
         → shrink: left=7
         → window="b"    length=1

✅ Answer: 3  ("abc")
```

### Code Template

<Tabs>
  <TabItem value="python" label="Python" default>

```python
def longest_substring_no_repeat(s):
    char_map = {}   # stores char → last seen index
    left = 0
    max_length = 0

    for right in range(len(s)):
        # If char is already in window, shrink from left
        if s[right] in char_map and char_map[s[right]] >= left:
            left = char_map[s[right]] + 1

        # Update last seen position
        char_map[s[right]] = right

        # Update max length
        max_length = max(max_length, right - left + 1)

    return max_length

# Example
print(longest_substring_no_repeat("abcabcbb"))   # Output: 3
print(longest_substring_no_repeat("pwwkew"))      # Output: 3
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.HashMap;

public class SlidingWindow {
    public static int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> charMap = new HashMap<>();
        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            // If char is already in window, shrink from left
            Integer lastSeen = charMap.get(c);
            if (lastSeen != null && lastSeen >= left) {
                left = lastSeen + 1;
            }

            // Update last seen position
            charMap.put(c, right);

            // Update max length
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Output: 3
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> charMap;
    int left = 0;
    int maxLength = 0;

    int n = s.size();
    for (int right = 0; right < n; right++) {
        auto it = charMap.find(s[right]);
        if (it != charMap.end() && it->second >= left) {
           left = it->second + 1;
       }

        // Update last seen position
        charMap[s[right]] = right;

        // Update max length
        maxLength = max(maxLength, right - left + 1);
    }

    return maxLength;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl; // Output: 3
    return 0;
}
```

  </TabItem>
</Tabs>

**Time Complexity:** O(n) &nbsp;|&nbsp; **Space Complexity:** O(k) where k = unique characters

---

## ⚡ Brute Force vs Sliding Window

```
Problem: Max sum subarray of size K=3
Array = [2, 1, 5, 1, 3, 2]

❌ BRUTE FORCE — O(n²)
Window [0..2]: 2+1+5 = 8   (3 additions)
Window [1..3]: 1+5+1 = 7   (3 additions)
Window [2..4]: 5+1+3 = 9   (3 additions)
Window [3..5]: 1+3+2 = 6   (3 additions)
Total: 12 operations

✅ SLIDING WINDOW — O(n)
Window [0..2]: 2+1+5 = 8    (3 additions for first window)
Window [1..3]: 8 - 2 + 1 = 7  (1 subtraction + 1 addition)
Window [2..4]: 7 - 1 + 3 = 9  (1 subtraction + 1 addition)
Window [3..5]: 9 - 5 + 2 = 6  (1 subtraction + 1 addition)
Total: 9 operations ✅ Faster!
```

---

## 📊 Complexity Summary

| Problem Type                        | Time | Space |
| ----------------------------------- | ---- | ----- |
| Fixed window (sum, avg)             | O(n) | O(1)  |
| Variable window (longest substring) | O(n) | O(k)  |
| Variable window (smallest subarray) | O(n) | O(1)  |

---

## ❌ Common Mistakes

1. **Forgetting to shrink the window** — Always move `left` forward when your condition is violated.
2. **Using nested loops** — If you see O(n²) on a subarray problem, think Sliding Window.
3. **Wrong window size formula** — Current window size is always `right - left + 1`.
4. **Not handling edge cases** — Empty array, K larger than array length.
5. **Reinitializing variables inside the loop** — `max_sum`, `left` should be declared outside.

---

## 🏋️ Practice Problems

| #   | Problem                                        | Type          | Difficulty |
| --- | ---------------------------------------------- | ------------- | ---------- |
| 1   | Maximum Sum Subarray of Size K                 | Fixed         | 🟢 Easy    |
| 2   | Average of Subarrays of Size K                 | Fixed         | 🟢 Easy    |
| 3   | Longest Substring Without Repeating Characters | Variable      | 🟡 Medium  |
| 4   | Minimum Size Subarray Sum                      | Variable      | 🟡 Medium  |
| 5   | Fruits Into Baskets                            | Variable      | 🟡 Medium  |
| 6   | Longest Repeating Character Replacement        | Variable      | 🟡 Medium  |
| 7   | Permutation in String                          | Fixed         | 🟡 Medium  |
| 8   | Minimum Window Substring                       | Variable      | 🔴 Hard    |
| 9   | Sliding Window Maximum                         | Fixed + Deque | 🔴 Hard    |

---

## 🔗 References

- [Sliding Window - GeeksforGeeks](https://www.geeksforgeeks.org/window-sliding-technique/)
- [LeetCode Sliding Window Problems](https://leetcode.com/tag/sliding-window/)
- [NeetCode Sliding Window Playlist](https://www.youtube.com/watch?v=jM2dhDPYMQM)
