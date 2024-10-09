---
id: sort-012-dutch-flag  
sidebar_position: 14  
title: Sort 0s, 1s, and 2s using Dutch National Flag Algorithm  
sidebar_label: Dutch Flag Algorithm  

---

### Definition:

The Dutch National Flag Algorithm is an efficient sorting algorithm that sorts an array containing only 0's, 1's, and 2's in linear time. This algorithm uses a three-pointer approach and operates in-place, making it optimal in terms of both time and space.

### Characteristics:

- **Three Pointers**:  
  The algorithm uses three pointers, `low`, `mid`, and `high`:  
  - `low` is used to place 0's.  
  - `mid` is used to traverse the array.  
  - `high` is used to place 2's.  

- **In-Place Sorting**:  
  The array is sorted in-place without using extra space, making the algorithm space-efficient.

- **Efficient for Specific Inputs**:  
  The algorithm is optimized for arrays with only three distinct values (0, 1, and 2), achieving linear time complexity.

### Time Complexity:

- **Best Case: $O(N)$**  
  The array is traversed only once using the `mid` pointer, resulting in linear time complexity.

- **Average Case: $O(N)$**  
  The algorithm still runs in linear time even for a randomly arranged array, as each element is processed at most once.

- **Worst Case: $O(N)$**  
  In the worst case, the array may require multiple swaps, but the time complexity remains O(N), where N is the size of the array.

### Space Complexity:

- **Space Complexity: $O(1)$**  
  The algorithm uses constant extra space since no additional arrays or data structures are required.

### Approach:

The algorithm works by using the three pointers (`low`, `mid`, and `high`) to partition the array into three sections:

- `nums[0]` to `nums[low-1]` for 0's.
- `nums[low]` to `nums[mid-1]` for 1's.
- `nums[high+1]` to `nums[n-1]` for 2's.

Here are the steps involved:

1. Initialize `low` and `mid` at 0 and `high` at `sizeOfArray - 1`.
2. Iterate over the array with the `mid` pointer until `mid <= high`:
   - If `nums[mid] == 0`, swap `nums[low]` and `nums[mid]`, and increment both `low` and `mid`.
   - If `nums[mid] == 1`, simply increment `mid`.
   - If `nums[mid] == 2`, swap `nums[mid]` and `nums[high]`, and decrement `high` without moving `mid`.

### C++ Implementation:

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to sort the array containing only 0s, 1s, and 2s
    void sortZeroOneTwo(vector<int>& nums) {
        // 3 pointers: low, mid, high
        int low = 0, mid = 0, high = nums.size() - 1;
        
        // Traverse the array using mid pointer
        while (mid <= high) {
            if (nums[mid] == 0) {
                // Swap nums[low] and nums[mid], move both low and mid forward
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } 
            else if (nums[mid] == 1) {
                // Move mid pointer forward
                mid++;
            } 
            else {
                // Swap nums[mid] and nums[high], move high pointer backward
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};

int main() {
    vector<int> nums = {0, 2, 1, 2, 0, 1};
    
    // Create an instance of Solution class
    Solution sol;

    // Sort the array
    sol.sortZeroOneTwo(nums);
    
    // Print the array elements after sorting
    cout << "After sorting:" << endl;
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```
### Summary:
The Dutch National Flag Algorithm efficiently sorts an array containing only 0's, 1's, and 2's in a single traversal of the array. It achieves optimal time complexity of $O(N)$ and operates in-place, making it an ideal solution for this type of problem. The use of three pointers (low, mid, and high) ensures that the array is correctly partitioned, and the algorithm is both simple and effective. 
