---
id: kadanes-algorithm
sidebar_position: 16
title: "Kadane's Algorithm"
sidebar_label: Maximum Subarray Sum
---

### Definition:

Kadane's Algorithm is an efficient algorithm to find the maximum sum of a contiguous subarray in an array of integers. It operates by iterating through the array while keeping track of the current subarray sum and the maximum sum encountered so far.

### Characteristics:

- **Single-Pass Algorithm**:  
  The algorithm processes the array in a single pass:
  - It iteratively updates the maximum sum of the subarray ending at each position.
- **Linear Time Complexity**:  
  The algorithm runs in O(N) time, where N is the number of elements in the array.
- **Constant Space Complexity**:  
  It only requires a few extra variables, resulting in O(1) space complexity.

### Time Complexity:

- **Best Case: $O(N)$**  
  The algorithm processes each element once during the traversal.
- **Average Case: $O(N)$**  
  It consistently runs in linear time for any arrangement of elements.
- **Worst Case: $O(N)$**  
  Regardless of the input distribution, the time complexity remains linear.

### Space Complexity:

- **Space Complexity: $O(1)$**  
  The algorithm uses a constant amount of extra space.

### Approach:

The algorithm follows these steps:

1. **Initialization**:
   - Initialize two variables `max_current` and `max_global` with the value of the first element.
2. **Traverse the Array**:
   - For each element (starting from the second), update `max_current` as the maximum of the current element or the sum of `max_current` and the current element.
   - Update `max_global` to be the maximum of `max_global` and `max_current`.
3. **Result**:
   - `max_global` holds the maximum sum of the contiguous subarray.

### C++ Implementation:

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to find the maximum sum of a contiguous subarray
    int maxSubArray(vector<int>& nums) {
        int max_current = nums[0], max_global = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            // Update max_current to include current element or start fresh from current element
            max_current = max(nums[i], max_current + nums[i]);

            // Update max_global if the current subarray sum is higher
            max_global = max(max_global, max_current);
        }

        return max_global;
    }
};

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

    // Create an instance of Solution class
    Solution sol;

    // Find the maximum sum of the contiguous subarray
    int max_sum = sol.maxSubArray(nums);

    // Print the result
    cout << "The maximum sum of the contiguous subarray is: " << max_sum << endl;

    return 0;
}
```