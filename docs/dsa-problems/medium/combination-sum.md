---
id: combination-sum
title: "Combination Sum"
sidebar_label: Combination Sum
description: "Solving the Combination Sum problem using a recursive backtracking approach."
tags: [DSA, leetcode, array, backtracking, recursion]
---

## Description:

Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.

**Example 1:**

Input: `candidates = [2,3,6,7], target = 7`
Output: `[[2,2,3],[7]]`
**Explanation:**
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

**Example 2:**

Input: `candidates = [2,3,5], target = 8`
Output: `[[2,2,2,2],[2,3,3],[3,5]]`

**Example 3:**

Input: `candidates = [2], target = 1`
Output: `[]`

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

### 1. Recursive Backtracking

Since we need to find *all* possible combinations that meet a specific condition, **Backtracking** is the most natural and optimal approach. At each step, we make a decision: we can either include the current candidate number in our combination, or skip it and move on to the next candidate.

1. **State:** We need to keep track of the current index we are exploring in the `candidates` array, the current combination of numbers we've chosen, and the `remaining_target` we are trying to reach.
2. **Base Cases:**
   - If `remaining_target == 0`, we found a valid combination! Add a copy of the current combination to our results.
   - If `remaining_target < 0` or we have explored all candidates (`index >= candidates.length`), this path is invalid, so we return and stop exploring.
3. **Recursive Step (Choices):**
   - **Include:** Add the candidate at the current index to our combination and make a recursive call. Crucially, we *do not* increment the index, because we are allowed to use the same candidate an unlimited number of times. We subtract the candidate's value from the `remaining_target`.
   - **Backtrack:** After returning from the "include" recursive call, we pop the last candidate out of our current combination to undo the choice.
   - **Skip:** Make a recursive call where we skip the current candidate by incrementing the index, keeping the `remaining_target` the same.

### Complexity
* **Time Complexity:** $O(2^{T/M})$ where $T$ is the target value and $M$ is the minimum value in the `candidates` array. In the worst case, the recursion tree can branch out exponentially, bounded by the maximum possible depth of $T/M$.
* **Space Complexity:** $O(T/M)$ for the auxiliary recursion stack space. The longest possible combination (and thus the deepest recursion tree) occurs when we repeatedly pick the smallest element.

---

## Solutions:

### C++
```cpp
class Solution {
public:
    void backtrack(vector<int>& candidates, int target, vector<vector<int>>& res, vector<int>& current, int index) {
        // Base Cases
        if (target == 0) {
            res.push_back(current);
            return;
        }
        if (target < 0 || index >= candidates.size()) {
            return;
        }
        
        // Choice 1: Include the current candidate
        current.push_back(candidates[index]);
        backtrack(candidates, target - candidates[index], res, current, index);
        
        // Backtrack
        current.pop_back();
        
        // Choice 2: Skip the current candidate and move to the next
        backtrack(candidates, target, res, current, index + 1);
    }
    
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> current;
        backtrack(candidates, target, res, current, 0);
        return res;
    }
};
```

### Java
```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public void backtrack(int[] candidates, int target, List<List<Integer>> res, List<Integer> current, int index) {
        // Base Cases
        if (target == 0) {
            res.add(new ArrayList<>(current));
            return;
        }
        if (target < 0 || index >= candidates.length) {
            return;
        }
        
        // Choice 1: Include the current candidate
        current.add(candidates[index]);
        backtrack(candidates, target - candidates[index], res, current, index);
        
        // Backtrack
        current.remove(current.size() - 1);
        
        // Choice 2: Skip the current candidate and move to the next
        backtrack(candidates, target, res, current, index + 1);
    }
    
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, target, res, new ArrayList<>(), 0);
        return res;
    }
}
```

### Python
```py
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        res = []
        
        def backtrack(index, current_combo, remaining_target):
            # Base Cases
            if remaining_target == 0:
                res.append(current_combo.copy())
                return
            if remaining_target < 0 or index >= len(candidates):
                return
            
            # Choice 1: Include the current candidate
            current_combo.append(candidates[index])
            backtrack(index, current_combo, remaining_target - candidates[index])
            
            # Backtrack
            current_combo.pop()
            
            # Choice 2: Skip the current candidate and move to the next
            backtrack(index + 1, current_combo, remaining_target)
            
        backtrack(0, [], target)
        return res
```

### JavaScript
```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function(candidates, target) {
    const res = [];
    
    const backtrack = (index, currentCombo, remainingTarget) => {
        // Base Cases
        if (remainingTarget === 0) {
            res.push([...currentCombo]);
            return;
        }
        if (remainingTarget < 0 || index >= candidates.length) {
            return;
        }
        
        // Choice 1: Include the current candidate
        currentCombo.push(candidates[index]);
        backtrack(index, currentCombo, remainingTarget - candidates[index]);
        
        // Backtrack
        currentCombo.pop();
        
        // Choice 2: Skip the current candidate and move to the next
        backtrack(index + 1, currentCombo, remainingTarget);
    };
    
    backtrack(0, [], target);
    return res;
};
```