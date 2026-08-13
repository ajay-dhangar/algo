---
id: maximum-number-of-non-overlapping-substrings
title: "Maximum Number of Non-Overlapping Substrings"
sidebar_label: Max Non-Overlapping Substrings
description: "Solution for LeetCode 1520: Maximum Number of Non-Overlapping Substrings, utilizing Greedy Algorithm and Interval Scheduling."
tags: [DSA, leetcode, string, greedy, sliding-window]
---

## Description:

Given a string `s` of lowercase letters, you need to find the maximum number of **non-overlapping** substrings of `s` that meet the following conditions:

1.  If a substring contains a certain character `c`, it must also contain all occurrences of `c` in `s`.
2.  If there are multiple solutions with the maximum number of substrings, return the one with minimum total length.

Return *a list of these substrings in any order*.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="15lhCdjyR0M"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Maximum Number of Non-Overlapping Substrings | LeetCode 1520 | Coders Camp"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Intervals and Greedy Scheduling (Optimal)

This problem essentially breaks down into two parts: finding the valid boundaries (intervals) for each unique character, and then selecting the maximum number of non-overlapping intervals (the classic Activity Selection/Interval Scheduling problem).

**Algorithm:**
1.  **Find Boundaries:** First, scan the string to find the first and last occurrence (index) of every character. Store these in two arrays or hash maps, `first` and `last`.
2.  **Validate Intervals:** Iterate through the string. For a character at index `i`, we only attempt to construct an interval if it's the very first time we are seeing it (`i == first[s[i]]`). 
    *   Initialize a right boundary as `right = last[s[i]]`.
    *   Iterate `j` from `i` to `right`. For every character inside this window, check its boundaries. If its first occurrence was *before* `i`, this interval is invalid (we abandon it because a valid substring encompassing both characters would actually start at the earlier index).
    *   If valid, update `right = max(right, last[s[j]])` to stretch our substring to cover all occurrences of `s[j]`.
    *   If we reach the end of the window without finding an out-of-bounds left character, we have found a valid interval `[i, right]`.
3.  **Greedy Scheduling:** Once all valid intervals are collected, we sort them primarily by their right endpoints in ascending order (to maximize room for subsequent intervals).
4.  Iterate over the sorted intervals. If an interval starts after our `prev_right` tracker, we accept it, add the substring to our result, and update `prev_right`.

#### Complexity
*   **Time Complexity:** $\mathcal{O}(N)$. Scanning the string for first/last bounds takes $\mathcal{O}(N)$. Validating the intervals also takes $\mathcal{O}(N)$ overall because the inner loop expands the window, which is bounded by the string length, and at most we process 26 unique starting intervals.
*   **Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(V)$ auxiliary space (where $V$ is the vocabulary size, at most 26 for lowercase English letters) to store the boundary arrays and valid intervals.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int checkSubstr(const string& s, int i, vector<int>& l, vector<int>& r) {
        int right = r[s[i] - 'a'];
        for (int j = i; j <= right; ++j) {
            if (l[s[j] - 'a'] < i) return -1;
            right = max(right, r[s[j] - 'a']);
        }
        return right;
    }

    vector<string> maxNumOfSubstrings(string s) {
        vector<int> l(26, INT_MAX), r(26, -1);
        for (int i = 0; i < s.length(); ++i) {
            l[s[i] - 'a'] = min(l[s[i] - 'a'], i);
            r[s[i] - 'a'] = max(r[s[i] - 'a'], i);
        }
        
        vector<pair<int, int>> intervals;
        for (int i = 0; i < s.length(); ++i) {
            if (i == l[s[i] - 'a']) {
                int right = checkSubstr(s, i, l, r);
                if (right != -1) {
                    intervals.push_back({i, right});
                }
            }
        }
        
        sort(intervals.begin(), intervals.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            if (a.second == b.second) return a.first > b.first; 
            return a.second < b.second;
        });
        
        vector<string> res;
        int prevRight = -1;
        for (auto& interval : intervals) {
            if (interval.first > prevRight) {
                res.push_back(s.substr(interval.first, interval.second - interval.first + 1));
                prevRight = interval.second;
            }
        }
        return res;
    }
};
```

**Java**
```java
class Solution {
    private int checkSubstr(String s, int i, int[] l, int[] r) {
        int right = r[s.charAt(i) - 'a'];
        for (int j = i; j <= right; j++) {
            if (l[s.charAt(j) - 'a'] < i) return -1;
            right = Math.max(right, r[s.charAt(j) - 'a']);
        }
        return right;
    }

    public List<String> maxNumOfSubstrings(String s) {
        int[] l = new int[26];
        int[] r = new int[26];
        Arrays.fill(l, Integer.MAX_VALUE);
        Arrays.fill(r, -1);
        
        for (int i = 0; i < s.length(); i++) {
            l[s.charAt(i) - 'a'] = Math.min(l[s.charAt(i) - 'a'], i);
            r[s.charAt(i) - 'a'] = Math.max(r[s.charAt(i) - 'a'], i);
        }
        
        List<int[]> intervals = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            if (i == l[s.charAt(i) - 'a']) {
                int right = checkSubstr(s, i, l, r);
                if (right != -1) {
                    intervals.add(new int[]{i, right});
                }
            }
        }
        
        intervals.sort((a, b) -> {
            if (a[1] == b[1]) return Integer.compare(b[0], a[0]);
            return Integer.compare(a[1], b[1]);
        });
        
        List<String> res = new ArrayList<>();
        int prevRight = -1;
        for (int[] interval : intervals) {
            if (interval[0] > prevRight) {
                res.add(s.substring(interval[0], interval[1] + 1));
                prevRight = interval[1];
            }
        }
        return res;
    }
}
```

**Python**
```py
class Solution:
    def maxNumOfSubstrings(self, s: str) -> list[str]:
        first = {c: s.find(c) for c in set(s)}
        last = {c: s.rfind(c) for c in set(s)}
        
        def get_valid_right(i):
            right = last[s[i]]
            j = i
            while j <= right:
                if first[s[j]] < i:
                    return -1
                right = max(right, last[s[j]])
                j += 1
            return right

        intervals = []
        for i in range(len(s)):
            if i == first[s[i]]:
                right = get_valid_right(i)
                if right != -1:
                    intervals.append((i, right))
                    
        intervals.sort(key=lambda x: (x[1], -x[0]))
        
        res = []
        prev_right = -1
        for left, right in intervals:
            if left > prev_right:
                res.append(s[left:right + 1])
                prev_right = right
                
        return res
```

**JavaScript**
```js
/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    const first = new Array(26).fill(Infinity);
    const last = new Array(26).fill(-1);
    const aCode = 'a'.charCodeAt(0);
    
    for (let i = 0; i < s.length; i++) {
        const idx = s.charCodeAt(i) - aCode;
        first[idx] = Math.min(first[idx], i);
        last[idx] = Math.max(last[idx], i);
    }
    
    const checkSubstr = (i) => {
        let right = last[s.charCodeAt(i) - aCode];
        for (let j = i; j <= right; j++) {
            if (first[s.charCodeAt(j) - aCode] < i) return -1;
            right = Math.max(right, last[s.charCodeAt(j) - aCode]);
        }
        return right;
    };
    
    const intervals = [];
    for (let i = 0; i < s.length; i++) {
        const idx = s.charCodeAt(i) - aCode;
        if (i === first[idx]) {
            const right = checkSubstr(i);
            if (right !== -1) {
                intervals.push([i, right]);
            }
        }
    }
    
    intervals.sort((a, b) => {
        if (a[1] === b[1]) return b[0] - a[0];
        return a[1] - b[1];
    });
    
    const res = [];
    let prevRight = -1;
    for (const [l, r] of intervals) {
        if (l > prevRight) {
            res.push(s.substring(l, r + 1));
            prevRight = r;
        }
    }
    
    return res;
};
```