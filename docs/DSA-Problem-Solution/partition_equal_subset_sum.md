# Partition Equal Subset Sum Algorithm (LeetCode #416)

## Description

The **Partition Equal Subset Sum** problem is a classic dynamic programming problem that determines if a given set can be partitioned into two subsets such that the sum of elements in both subsets is equal.

### Problem Definition

Given:
- An array of integers `nums`.

Objective:
- Return true if it is possible to partition the array into two subsets with equal sum.

### Algorithm Overview

1. **Dynamic Programming Approach**:
   - Calculate the total sum of the array. If it's odd, return false.
   - Set `target = total_sum / 2`. We need to find a subset with this target sum.
   - Use a DP array where `dp[j]` indicates whether a subset sum of `j` can be formed.
   - Initialize `dp[0] = true` (sum of 0 can always be formed).
   - For each number `num` in `nums`, update the DP array in reverse:
     - For `j` from `target` down to `num`, update `dp[j] = dp[j] || dp[j - num]`.

2. **Return** `dp[target]`, which indicates if the target sum can be formed.

### Time Complexity

- **Time Complexity**: O(n * target), where n is the number of elements in `nums`.
- **Space Complexity**: O(target) for the DP array.

### C++ Implementation

```cpp
#include <vector>
using namespace std;

bool canPartition(vector<int>& nums) {
    int total_sum = 0;
    for (int num : nums) total_sum += num;
    if (total_sum % 2 != 0) return false;

    int target = total_sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;

    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}
