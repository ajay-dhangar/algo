---
id: subarrays-with-k-different-integers
title: "Subarrays with K Different Integers"
sidebar_label: Subarrays with K Different Integers
description: "Finding the number of subarrays with exactly K different integers using the sliding window approach."
tags: [DSA, leetcode, array, sliding-window, hash-table]
---

## Description:

Given an integer array `nums` and an integer `k`, return the number of **good subarrays** of `nums`.

A **good array** is an array where the number of different integers in that array is exactly `k`.

* For example, `[1,2,3,1,2]` has `3` different integers: `1`, `2`, and `3`.

A subarray is a contiguous part of an array.

**Example 1:**
Input: `nums = [1,2,1,2,3]`, `k = 2`
Output: `7`
**Explanation:** Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]

**Example 2:**
Input: `nums = [1,2,1,3,4]`, `k = 3`
Output: `3`
**Explanation:** Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

## Video Explanation

<LiteYouTubeEmbed
  id="_SrCMbCsn2w"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Lec-58: Operator overloading in C++ Programming | C++ programming for beginners | C++ by Varun sir"
  lazyLoad={true}
  webp
/>

---

## Approaches:

### 1. Sliding Window

To find the number of subarrays with *exactly* $K$ different integers directly can be complex. Instead, we can use a clever sliding window technique:
The number of subarrays with exactly $K$ different integers is equal to the number of subarrays with *at most* $K$ different integers minus the number of subarrays with *at most* $K - 1$ different integers.

$Exact(K) = AtMost(K) - AtMost(K-1)$

1. Create a helper function `atMost(k)` that calculates the number of subarrays with at most `k` distinct elements.
2. In the helper function, maintain a sliding window `[left, right]` and a frequency map to keep track of the count of each element in the current window.
3. Expand the window by moving `right` and adding elements to the frequency map.
4. If the number of distinct elements exceeds `k`, shrink the window from the left by moving `left` and updating the frequency map until the number of distinct elements is valid again.
5. For every valid window ending at `right`, the number of valid subarrays ending at `right` is `right - left + 1`. Add this to the total count.
6. Finally, return the result of `atMost(k) - atMost(k - 1)`.

* **Time Complexity:** $O(N)$ where $N$ is the number of elements in `nums`. Both the `left` and `right` pointers traverse the array at most once in the `atMost` helper function.
* **Space Complexity:** $O(N)$ in the worst-case scenario to store the frequencies of the elements in a hash map.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

private:
    int atMost(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int left = 0, res = 0;
        for (int right = 0; right < nums.size(); ++right) {
            if (count[nums[right]]++ == 0) {
                k--;
            }
            while (k < 0) {
                if (--count[nums[left]] == 0) {
                    k++;
                }
                left++;
            }
            res += right - left + 1;
        }
        return res;
    }
};
```

**Java**
```java
class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, res = 0;
        for (int right = 0; right < nums.length; right++) {
            if (count.getOrDefault(nums[right], 0) == 0) {
                k--;
            }
            count.put(nums[right], count.getOrDefault(nums[right], 0) + 1);
            while (k < 0) {
                count.put(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) == 0) {
                    k++;
                }
                left++;
            }
            res += right - left + 1;
        }
        return res;
    }
}
```

**Python**
```py
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        return self.atMost(nums, k) - self.atMost(nums, k - 1)

    def atMost(self, nums: List[int], k: int) -> int:
        count = collections.Counter()
        left = 0
        res = 0
        for right in range(len(nums)):
            if count[nums[right]] == 0:
                k -= 1
            count[nums[right]] += 1
            
            while k < 0:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    k += 1
                left += 1
            res += right - left + 1
        return res
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraysWithKDistinct = function(nums, k) {
    const atMost = (k) => {
        const count = new Map();
        let left = 0;
        let res = 0;

        for (let right = 0; right < nums.length; right++) {
            if (!count.has(nums[right]) || count.get(nums[right]) === 0) {
                k--;
            }
            count.set(nums[right], (count.get(nums[right]) || 0) + 1);

            while (k < 0) {
                count.set(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) === 0) {
                    k++;
                }
                left++;
            }
            res += right - left + 1;
        }
        return res;
    };

    return atMost(k) - atMost(k - 1);
};
```