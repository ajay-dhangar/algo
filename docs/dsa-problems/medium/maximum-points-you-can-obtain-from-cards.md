---
id: maximum-points-you-can-obtain-from-cards
title: "Maximum Points You Can Obtain from Cards"
sidebar_label: Maximum Points You Can Obtain from Cards
description: "The Maximum Points You Can Obtain from Cards problem on LeetCode involves finding the maximum score by taking exactly k cards from either the beginning or the end of an array."
tags: [DSA, leetcode, sliding-window, array]
---

## Description:

There are several cards **arranged in a row**, and each card has an associated number of points. The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the *maximum score* you can obtain.

**Example 1:**
Input: `cardPoints = [1,2,3,4,5,6,1]`, `k = 3`
Output: `12`
**Explanation:** After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.

**Example 2:**
Input: `cardPoints = [2,2,2]`, `k = 2`
Output: `4`
**Explanation:** Regardless of which two cards you take, your score will always be 4.

**Example 3:**
Input: `cardPoints = [9,7,7,9,7,7,9]`, `k = 7`
Output: `55`
**Explanation:** You have to take all the cards. Your score is the sum of points of all cards.

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

Instead of trying to figure out which side to pick from step-by-step (which can be greedy and fail), we can treat the `k` cards as a sliding window. 
1. First, we find the sum of the first `k` cards from the left.
2. Then, one by one, we "drop" a card from the right edge of our left-side window and "pick up" a card from the extreme right side of the array.
3. We update our maximum score at each step.

* **Time Complexity:** $O(k)$ because we iterate $k$ times to get the initial sum, and then iterate $k$ times to slide the window.
* **Space Complexity:** $O(1)$ because we only use a few integer variables for the calculation, taking constant extra space.

#### Sliding Window Solutions:

**C++**
```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        int current_sum = 0;
        
        for (int i = 0; i < k; ++i) {
            current_sum += cardPoints[i];
        }
        
        int max_sum = current_sum;
        int left = k - 1;
        int right = n - 1;
        
        for (int i = 0; i < k; ++i) {
            current_sum = current_sum - cardPoints[left] + cardPoints[right];
            max_sum = max(max_sum, current_sum);
            left--;
            right--;
        }
        
        return max_sum;
    }
};
```

**Java**
```java
class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        int currentSum = 0;
        
        for (int i = 0; i < k; i++) {
            currentSum += cardPoints[i];
        }
        
        int maxSum = currentSum;
        int left = k - 1;
        int right = n - 1;
        
        for (int i = 0; i < k; i++) {
            currentSum = currentSum - cardPoints[left] + cardPoints[right];
            maxSum = Math.max(maxSum, currentSum);
            left--;
            right--;
        }
        
        return maxSum;
    }
}
```

**Python**
```py
class Solution:
    def maxScore(self, cardPoints: list[int], k: int) -> int:
        n = len(cardPoints)
        
        current_sum = sum(cardPoints[:k])
        max_sum = current_sum
        
        left = k - 1
        right = n - 1
        
        for _ in range(k):
            current_sum = current_sum - cardPoints[left] + cardPoints[right]
            max_sum = max(max_sum, current_sum)
            left -= 1
            right -= 1
            
        return max_sum
```

**JavaScript**
```js
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    let n = cardPoints.length;
    let currentSum = 0;
    
    for (let i = 0; i < k; i++) {
        currentSum += cardPoints[i];
    }
    
    let maxSum = currentSum;
    let left = k - 1;
    let right = n - 1;
    
    for (let i = 0; i < k; i++) {
        currentSum = currentSum - cardPoints[left] + cardPoints[right];
        maxSum = Math.max(maxSum, currentSum);
        left--;
        right--;
    }
    
    return maxSum;
};
```