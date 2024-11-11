---
id: sort-012-dutch-flag  
sidebar_position: 14  
title: Sorting 0s, 1s, and 2s with the Dutch National Flag Algorithm  
sidebar_label: Dutch National Flag Sorting  
---

### Overview:

The **Dutch National Flag Algorithm** is a highly efficient technique to sort an array containing only the elements 0, 1, and 2 in linear time. It utilizes a three-pointer strategy and performs sorting directly on the array, optimizing both time and space.

### Key Features:

- **Three Pointers Strategy**:  
  The algorithm operates using three pointers (`low`, `mid`, and `high`), each having a specific role:  
  - `low` for positioning 0s  
  - `mid` for traversal  
  - `high` for positioning 2s  

- **In-Place Sorting**:  
  This approach does not require additional memory for sorting, making it space-efficient as the array is sorted in-place.

- **Optimized for Specific Data**:  
  Designed specifically for arrays with three distinct elements (0, 1, and 2), the algorithm runs in linear time, making it optimal for such cases.

### Time Complexity:

- **Best Case: $O(N)$**  
  The array is traversed once using the `mid` pointer, providing a linear runtime.

- **Average Case: $O(N)$**  
  Even in random input order, the algorithm processes each element a maximum of one time, maintaining linear time.

- **Worst Case: $O(N)$**  
  Although multiple swaps may be needed, the time complexity remains linear at $O(N)$, where $N$ is the array length.

### Space Complexity:

- **Space Efficiency: $O(1)$**  
  The algorithm uses constant extra space as it sorts the array in-place without requiring any auxiliary data structures.

### Algorithm Steps:

The algorithm follows these steps to partition the array using three pointers (`low`, `mid`, `high`):

- The range `nums[0]` to `nums[low-1]` holds 0s.
- The range `nums[low]` to `nums[mid-1]` holds 1s.
- The range `nums[high+1]` to `nums[n-1]` holds 2s.

**Process**:
1. Initialize `low` and `mid` at index 0 and `high` at the last index of the array.
2. While `mid` is less than or equal to `high`, follow these rules:
   - If `nums[mid] == 0`, swap it with `nums[low]`, increment both `low` and `mid`.
   - If `nums[mid] == 1`, increment `mid` only.
   - If `nums[mid] == 2`, swap it with `nums[high]` and decrement `high` without changing `mid`.

### C++ Code Implementation:

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to sort an array with only 0s, 1s, and 2s
    void sortZeroOneTwo(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};


int main() {
    vector<int> nums = {0, 2, 1, 2, 0, 1};
    Solution sol;
    sol.sortZeroOneTwo(nums);

    cout << "After sorting: ";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;

    return 0;
}
```