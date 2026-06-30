---
id: sum-of-subarray-ranges
title: "Sum of Subarray Ranges"
sidebar_label: Sum of Subarray Ranges
description: "The Sum of Subarray Ranges problem involves finding the sum of the difference between the maximum and minimum elements of all subarrays using a Monotonic Stack."
tags: [DSA, leetcode, array, monotonic-stack]
---

## Description:
You are given an integer array `nums`. The **range** of a subarray of `nums` is the difference between the largest and smallest element in the subarray.

Return the **sum of all** subarray ranges of `nums`.

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Example 1:**
Input: `nums = [1,2,3]`
Output: `4`
**Explanation:** The 6 subarrays of `nums` are the following:
[1], range = largest - smallest = 1 - 1 = 0 
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.

**Example 2:**
Input: `nums = [1,3,3]`
Output: `4`
**Explanation:** The 6 subarrays of `nums` are the following:
[1], range = largest - smallest = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.

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

### 1. Monotonic Stack
The problem asks for the sum of all subarray ranges. We can optimize this using a **Monotonic Stack** by realizing that:
$\sum \text{(Range)} = \sum \text{(Maximum of Subarray)} - \sum \text{(Minimum of Subarray)}$

To find these sums efficiently, we need to determine how many subarrays a specific element acts as the maximum, and how many it acts as the minimum. 
1. **For the Minimums:** We use a monotonically increasing stack to find the Previous Smaller Element and Next Smaller Element.
2. **For the Maximums:** We use a monotonically decreasing stack to find the Previous Greater Element and Next Greater Element.
3. **Handling Duplicates:** To avoid double-counting subarrays when there are duplicate numbers, we use a strict inequality `<` on one side and a non-strict inequality `<=` on the other.

* **Time Complexity:** $O(N)$ because we iterate through the array a constant number of times. Each element is pushed and popped from the stack exactly once.
* **Space Complexity:** $O(N)$ to store elements in the stack. In the worst-case scenario, the stack will store $N$ elements.

#### Monotonic Stack Solutions:

**C++**
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    long long subArrayRanges(vector<int>& nums) {
        int n = nums.size();
        long long res = 0;
        vector<int> st;

        // Sum of Minimums
        for (int i = 0; i <= n; ++i) {
            while (!st.empty() && (i == n || nums[st.back()] > nums[i])) {
                int j = st.back();
                st.pop_back();
                int left = j - (st.empty() ? -1 : st.back());
                int right = i - j;
                res -= 1LL * nums[j] * left * right;
            }
            st.push_back(i);
        }

        st.clear();

        // Sum of Maximums
        for (int i = 0; i <= n; ++i) {
            while (!st.empty() && (i == n || nums[st.back()] < nums[i])) {
                int j = st.back();
                st.pop_back();
                int left = j - (st.empty() ? -1 : st.back());
                int right = i - j;
                res += 1LL * nums[j] * left * right;
            }
            st.push_back(i);
        }

        return res;
    }
};
```

**Java**
```java
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public long subArrayRanges(int[] nums) {
        int n = nums.length;
        long res = 0;
        Deque<Integer> st = new ArrayDeque<>();

        // Sum of Minimums
        for (int i = 0; i <= n; i++) {
            while (!st.isEmpty() && (i == n || nums[st.peek()] > nums[i])) {
                int j = st.pop();
                int left = j - (st.isEmpty() ? -1 : st.peek());
                int right = i - j;
                res -= (long) nums[j] * left * right;
            }
            st.push(i);
        }

        st.clear();

        // Sum of Maximums
        for (int i = 0; i <= n; i++) {
            while (!st.isEmpty() && (i == n || nums[st.peek()] < nums[i])) {
                int j = st.pop();
                int left = j - (st.isEmpty() ? -1 : st.peek());
                int right = i - j;
                res += (long) nums[j] * left * right;
            }
            st.push(i);
        }

        return res;
    }
}
```

**Python**
```py
class Solution:
    def subArrayRanges(self, nums: list[int]) -> int:
        n = len(nums)
        res = 0
        
        # Sum of Minimums
        stack = []
        for i in range(n + 1):
            while stack and (i == n or nums[stack[-1]] > nums[i]):
                j = stack.pop()
                left = j - stack[-1] if stack else j + 1
                right = i - j
                res -= nums[j] * left * right
            stack.append(i)
            
        # Sum of Maximums
        stack = []
        for i in range(n + 1):
            while stack and (i == n or nums[stack[-1]] < nums[i]):
                j = stack.pop()
                left = j - stack[-1] if stack else j + 1
                right = i - j
                res += nums[j] * left * right
            stack.append(i)
            
        return res
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function(nums) {
    const n = nums.length;
    let res = 0;
    let st = [];

    // Sum of Minimums
    for (let i = 0; i <= n; i++) {
        while (st.length > 0 && (i === n || nums[st[st.length - 1]] > nums[i])) {
            let j = st.pop();
            let left = j - (st.length === 0 ? -1 : st[st.length - 1]);
            let right = i - j;
            res -= nums[j] * left * right;
        }
        st.push(i);
    }

    st = [];

    // Sum of Maximums
    for (let i = 0; i <= n; i++) {
        while (st.length > 0 && (i === n || nums[st[st.length - 1]] < nums[i])) {
            let j = st.pop();
            let left = j - (st.length === 0 ? -1 : st[st.length - 1]);
            let right = i - j;
            res += nums[j] * left * right;
        }
        st.push(i);
    }

    return res; 
};
```