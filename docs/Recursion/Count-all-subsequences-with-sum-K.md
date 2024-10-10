---
id: count-all-subsequences-with-sum-k-problem-dsa
title: Perfect sum
sidebar_label: Perfect sum
description: "The Perfect Sum problem involves finding all subsets of an array that sum up to a given target sum. The solution uses recursion and dynamic programming to efficiently count subsets with a specified sum while handling large values using modulo."
tags: [perfect-sum, recursion, dynamic-programming, dsa]
---

## Perfect Sum Problem | Count All Subsets with Sum k

- Problem Statement: Given an array arr of size n of non-negative integers and an integer sum, the task is to count all subsets of the given array with a sum equal to the target sum. Due to potentially large outputs, the answer must be computed modulo 10^9+7.

```
- Input:
  n = 6, arr = [5, 2, 3, 10, 6, 8], sum = 10
- Output: 3
- Explanation: The subsets that sum to 10 are {5, 2, 3}, {2, 8}, and {10}.
```

- Expected Time Complexity: 𝑂(𝑛×sum)

- Expected Auxiliary Space: 𝑂(𝑛×sum)

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    int countSum(int arr[], int i, int n, int total, int sum, int mod) {
        if (i == n) {
            return (total == sum) ? 1 : 0;
        }
        return (countSum(arr, i + 1, n, (total + arr[i]) % mod, sum, mod) +
                countSum(arr, i + 1, n, total, sum, mod)) % mod;
    }

    int perfectSum(int arr[], int n, int sum) {
        int mod = 1e9 + 7; // Modulo value as given in the problem statement
        return countSum(arr, 0, n, 0, sum, mod);
    }
};

int main() {
    Solution solution;
    int n = 6;
    int arr[] = {5, 2, 3, 10, 6, 8};
    int sum = 10;
    cout << "Number of subsets with sum " << sum << ": "
         << solution.perfectSum(arr, n, sum) << endl;
    return 0;
}
```
