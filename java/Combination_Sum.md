| id               | sidebar_position | title            | sidebar_label      | description                                                                                                                                              | tags                          |
|------------------|------------------|------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| combination-sum  | 2                | Combination Sum   | Combination Sum      | Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. | java, problem-solving         |


# Combination Sum

## Description:
Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen from candidates an unlimited number of times.


### Brute Force Solution:
## Approach

1. **Generate All Combinations**:
   - We start by exploring all possible combinations of elements from the `candidates` array.
   - For each combination, we recursively add elements to a temporary list `tempList` until we reach the target sum (`remain == 0`) or exceed it (`remain < 0`).

2. **Backtracking Logic**:
   - Using a helper function `backtrack`, we keep track of the current sum (`remain`), updating it as we add elements to `tempList`.
   - If `remain` is zero, we’ve found a valid combination, so we add a copy of `tempList` to the final result list.
   - If `remain` is negative, we exit that branch of recursion (backtrack), as it’s not a valid combination.
   - For each recursive call, the `start` index is set to the current index to allow reusing the same element multiple times.

3. **Recursive Calls**:
   - For each element in `candidates`, we add it to `tempList`, adjust `remain` by subtracting the element’s value, and call `backtrack` recursively.
   - After the recursive call, we remove the last element (backtracking) to explore other possible combinations.

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), candidates, target, 0);
        return result;
    }

    private void backtrack(List<List<Integer>> result, List<Integer> tempList, int[] candidates, int remain, int start) {
        if (remain < 0) return; // exceed the target
        if (remain == 0) result.add(new ArrayList<>(tempList)); // found a valid combination
        for (int i = start; i < candidates.length; i++) {
            tempList.add(candidates[i]);
            backtrack(result, tempList, candidates, remain - candidates[i], i); // not i + 1 because we can reuse the same element
            tempList.remove(tempList.size() - 1);
        }
    }
}
```

### Optimal Solution:

## Approach
1. **Backtracking with Optimization**:
   - We use a similar backtracking approach as above but introduce a more strategic selection to reduce unnecessary recursive calls.
   - By starting from a given index and allowing repetition of the same candidate, we avoid recalculating combinations with the same elements in different orders (e.g., `[2, 3]` vs. `[3, 2]`).

2. **Adding Elements Based on Conditions**:
   - For each recursive call, we evaluate if the current candidate (`candidates[i]`) can be included (i.e., it’s less than or equal to `target`).
   - If it can, we add it to the temporary list `vec` and recursively call `findCombinations`.
   - This method helps us prune branches that exceed `target`, saving computation time.

3. **Recursion and Backtracking**:
   - Inside the recursion, if `target` becomes zero, we’ve found a valid combination and add a copy of `vec` to `ans`.
   - If not, we continue with the current or subsequent candidates to further explore possible combinations.
   - After exploring all paths starting with a particular element, we remove it from `vec` (backtrack) to test the next element in the `candidates` array.

4. **No Redundant Searches**:
   - Since each recursive call includes elements starting from the current index (`idx`), we avoid re-examining combinations that only differ in order, making the approach more efficient.

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        findCombinations(0, target, candidates, new ArrayList<>(), ans);
        return ans;
    }

    private void findCombinations(int idx, int target, int[] candidates, List<Integer> vec, List<List<Integer>> ans) {
        // Base case: if valid combination found
        if (target == 0) {
            ans.add(new ArrayList<>(vec));
            return; 
        }
        
        // Iterate through candidates
        for (int i = idx; i < candidates.length; i++) {
            if (candidates[i] <= target) {
                vec.add(candidates[i]);
                findCombinations(i, target - candidates[i], candidates, vec, ans); // index stays same
                vec.remove(vec.size() - 1);
            }
        }
    }
}
```

## Complexity Analysis
- **Time Complexity**: O(2^t) x O(k), where `t` is the target and `k` is the average length of combinations.
- **Space Complexity**: O(k*x) + O(t), where `x` is the number of combinations found.
