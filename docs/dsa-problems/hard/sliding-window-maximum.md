---
id: sliding-window-maximum
title: Sliding Window Maximum
sidebar_label: Sliding Window Maximum
tags: [LeetCode , Arrays, Queue , Sliding Window , Heap (Priority Queue) , Monotonic Queue]
companies: [Google, Amazon, Meta]
description: "Given array of integers nums , with sliding window of size k which is moving from the very left of the array to the very right.Return the max for each sliding window."
---

# Sliding Window Maximum (LeetCode 239)

## Description

The **Sliding Window Maximum** problem involves finding the maximum value in each subarray of fixed size k that slides across array from left to right.

## Video Explanation

<LiteYouTubeEmbed
  id="DfljaUwZsOk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Sliding Window Maximum - Monotonic Queue - Leetcode 239"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>


### Problem Definition

Given:

- An array of integers `nums` of size N , with a sliding window of size K , moving from left to right , every time sliding window shifts to right by 1 position.

Objective:

- Return the max for each sliding window of size K.

### Algorithm Overview

1. **Using Deque*:

- Create a `Deque`, `dq` of `capacity k`, that stores only useful elements of current window of k elements.
- An element is `useful` if it is in current window and is `greater` than all other `elements on right side` of it in current window. 
- Process all array elements one by one and maintain dq to contain useful elements of current window and these useful elements are maintained in sorted order. 
- The element at `front` of the dq is the `largest` and `element at rear/back` of dq `is` the `smallest of current window`.

2. **Return** `result`, which is the final array containing max of each sliding window of size k.

### Time Complexity

- **Time Complexity**: O(N) time
- **Space Complexity**: O(K) for the deque.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
#include <vector>
using namespace std;

//User function Template for C++

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& a, int k) {
        

        vector<int> ans; int n = a.size();
        deque<int> dq;

        int i = 0;
        for(int j = 0 ; j < n ; j++){

                while(!dq.empty() && dq.back() < a[j]){ 
                    //pop all the elements from the back if smaller than the current element since max of that window is the current element since greater than all of them.
                    dq.pop_back(); 
                }

                dq.push_back(a[j]); // push the current element

                if(j-i+1 == k){
                    ans.push_back(dq.front()); // max of that window is the deque front

                    if(dq.front() == a[i]){ 
                        // if after shifting the window by 1 step the deque front is window's front element that need to be popped b/c now window is changed ,and so window max also.
                        dq.pop_front(); 
                    }

                    i++;
                }
        
        }

        return ans;

    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (i >= k - 1) {
                res[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return res;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        dq = deque()
        res = []
        for i, n in enumerate(nums):
            while dq and dq[0] < i - k + 1:
                dq.popleft()
            while dq and nums[dq[-1]] < n:
                dq.pop()
            dq.append(i)
            if i >= k - 1:
                res.append(nums[dq[0]])
        return res
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var maxSlidingWindow = function(nums, k) {
    const deque = [];
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (i >= k - 1) {
            res.push(nums[deque[0]]);
        }
    }
    return res;
};
```

  </TabItem>
</Tabs>
