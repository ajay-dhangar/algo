---
id: maximum-length-of-pair-chain
title: Maximum Length of Pair Chain
sidebar_label: Maximum Length of Pair Chain
tags:
  - DSA
  - leetcode
  - dynamic-programming
  - array
  - greedy
  - memoization
companies:
  - Google
  - Amazon
description: "Solve the Maximum Length of Pair Chain problem using Dynamic Programming with memoization (LIS variant) and greedy interval scheduling."
---

## Description:

You are given an array of `n` pairs `pairs` where `pairs[i] = [left_i, right_i]` and `left_i < right_i`.

A pair `p2 = [c, d]` follows a pair `p1 = [a, b]` if `b < c`. A chain of pairs can be formed in this fashion.

Return the *length longest chain which can be formed*.

You do not need to use up all the given intervals. You can select pairs in any order.

### Examples:

**Example 1:**

```text
Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
Explanation: The longest chain is [1,2] -> [3,4].
```

**Example 2:**

```text
Input: pairs = [[1,2],[7,8],[4,5]]
Output: 3
Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].
```

### Constraints:

- `n == pairs.length`
- `1 <= n <= 1000`
- `-1000 <= left_i < right_i <= 1000`

---

## Video Explanation:

<LiteYouTubeEmbed
  id="DlgGx8GRo9M"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Maximum Length of Pair Chain"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Dynamic Programming (Recursion with Memoization - LIS Variant)

#### Intuition:
This problem can be framed as a variation of the classic **Longest Increasing Subsequence (LIS)** problem.
Since we can select pairs in any order, we should first sort the pairs in ascending order based on their first element (`pairs[i][0]`).

Once sorted:
- For each pair at index `indx`, we have two decisions:
  1. **Take the pair**: We can only take the pair if it is the first pair we pick (`prevI == -1`) or if its start coordinate is strictly greater than the end coordinate of the previously chosen pair (`pairs[indx][0] > pairs[prevI][1]`). If taken, the chain length increases by `1`, and the new previous index becomes `indx`.
  2. **Do not take the pair**: We skip the current pair and advance to the next index without modifying `prevI`.
- The answer for the current state is the maximum of the two choices.
- To prevent recomputing overlapping subproblems, we use a 2D memoization table `dp[indx][prevI + 1]`. The `+1` shift handles the base case when `prevI == -1`.

#### Complexity:
- **Time Complexity:** $O(n^2)$ where $n$ is the number of pairs. There are $n \times (n+1)$ states, and each transition takes $O(1)$ time. Sorting takes $O(n \log n)$.
- **Space Complexity:** $O(n^2)$ for the 2D DP memoization table and $O(n)$ recursion stack space.

---

### 2. Greedy Approach (Optimal)

#### Intuition:
We can also view this problem as an **Interval Scheduling Problem**.
To maximize the number of non-overlapping intervals (pairs), we should always choose the pair that ends earliest, leaving the maximum possible room for subsequent pairs.
1. Sort `pairs` in ascending order by their second element (`pairs[i][1]`).
2. Maintain `curr_end` initialized to negative infinity.
3. For each pair `[start, end]`, if `start > curr_end`, increment the chain count and update `curr_end = end`.

#### Complexity:
- **Time Complexity:** $O(n \log n)$ due to sorting the pairs.
- **Space Complexity:** $O(1)$ auxiliary space (or $O(n)$ depending on the sorting implementation).

---

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int rec(vector<vector<int>>& pairs, int indx, int prevI,
            vector<vector<int>>& dp) {
        if (indx == pairs.size()) {
            return 0;
        }

        if (dp[indx][prevI + 1] != -1) {
            return dp[indx][prevI + 1];
        }

        int take = 0;
        if (prevI == -1 || pairs[indx][0] > pairs[prevI][1]) {
            take = 1 + rec(pairs, indx + 1, indx, dp);
        }

        int notake = rec(pairs, indx + 1, prevI, dp);

        return dp[indx][prevI + 1] = max(take, notake);
    }

    int findLongestChain(vector<vector<int>>& pairs) {
        int n = pairs.size();
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));

        sort(pairs.begin(), pairs.end(),
             [](const vector<int>& a, const vector<int>& b) {
                 return a[0] < b[0];
             });

        return rec(pairs, 0, -1, dp);
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.Arrays;

class Solution {
    public int rec(int[][] pairs, int indx, int prevI, int[][] dp) {
        if (indx == pairs.length) {
            return 0;
        }

        if (dp[indx][prevI + 1] != -1) {
            return dp[indx][prevI + 1];
        }

        int take = 0;
        if (prevI == -1 || pairs[indx][0] > pairs[prevI][1]) {
            take = 1 + rec(pairs, indx + 1, indx, dp);
        }

        int notake = rec(pairs, indx + 1, prevI, dp);

        return dp[indx][prevI + 1] = Math.max(take, notake);
    }

    public int findLongestChain(int[][] pairs) {
        int n = pairs.length;
        int[][] dp = new int[n][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        Arrays.sort(pairs, (a, b) -> a[0] - b[0]);
        return rec(pairs, 0, -1, dp);
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from typing import List

class Solution:
    def rec(self, pairs: List[List[int]], indx: int, prevI: int, dp: List[List[int]]) -> int:
        if indx == len(pairs):
            return 0

        if dp[indx][prevI + 1] != -1:
            return dp[indx][prevI + 1]

        take = 0
        if prevI == -1 or pairs[indx][0] > pairs[prevI][1]:
            take = 1 + self.rec(pairs, indx + 1, indx, dp)

        notake = self.rec(pairs, indx + 1, prevI, dp)

        dp[indx][prevI + 1] = max(take, notake)
        return dp[indx][prevI + 1]

    def findLongestChain(self, pairs: List[List[int]]) -> int:
        n = len(pairs)
        dp = [[-1] * (n + 1) for _ in range(n)]
        pairs.sort(key=lambda x: x[0])
        return self.rec(pairs, 0, -1, dp)
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
/**
 * Dynamic Programming (Memoization)
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    const n = pairs.length;
    const dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));

    pairs.sort((a, b) => a[0] - b[0]);

    function rec(indx, prevI) {
        if (indx === n) return 0;
        if (dp[indx][prevI + 1] !== -1) return dp[indx][prevI + 1];

        let take = 0;
        if (prevI === -1 || pairs[indx][0] > pairs[prevI][1]) {
            take = 1 + rec(indx + 1, indx);
        }

        const notake = rec(indx + 1, prevI);

        return (dp[indx][prevI + 1] = Math.max(take, notake));
    }

    return rec(0, -1);
};
```

  </TabItem>
</Tabs>
