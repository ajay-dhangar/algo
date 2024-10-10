```
id: moores-voting-algorithm  
sidebar_position: 15  
title: Moore's Voting Algorithm  
sidebar_label: Voting Algorithm

---

### Definition:

Moore's Voting Algorithm is an efficient algorithm to find the majority element in an array. A majority element is defined as the element that appears more than N/2 times in the array, where N is the size of the array. The algorithm operates in linear time and uses constant space, making it optimal for this problem.

### Characteristics:

- **Two-Pass Algorithm**:  
  The algorithm works in two passes:

  - In the first pass, it finds a candidate for the majority element.
  - In the second pass, it confirms whether the candidate is indeed the majority element.

- **Linear Time Complexity**:  
  The algorithm runs in O(N) time, where N is the number of elements in the array.

- **Constant Space Complexity**:  
  It only requires a few extra variables, resulting in O(1) space complexity.

### Time Complexity:

- **Best Case: O(N)**  
  The algorithm processes each element once during both passes.

- **Average Case: O(N)**  
  It consistently runs in linear time for any arrangement of elements.

- **Worst Case: O(N)**  
  Regardless of the input distribution, the time complexity remains linear.

### Space Complexity:

- **Space Complexity: O(1)**  
  The algorithm uses a constant amount of extra space.

### Approach:

The algorithm follows these steps:

1. **Candidate Selection**:

   - Initialize a variable `candidate` and a counter `count` to zero.
   - Traverse the array:
     - If `count` is zero, set the current element as `candidate` and increment `count`.
     - If the current element is equal to `candidate`, increment `count`.
     - If the current element is not equal to `candidate`, decrement `count`.

2. **Validation**:
   - Traverse the array again to count occurrences of `candidate`.
   - If the count is greater than N/2, return `candidate`; otherwise, there is no majority element.

### C++ Implementation:

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to find the majority element
    int majorityElement(vector<int>& nums) {
        int candidate = -1, count = 0;

        // First pass to find the candidate
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
                count = 1;
            } else if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }

        // Second pass to confirm the candidate
        count = 0;
        for (int num : nums) {
            if (num == candidate) {
                count++;
            }
        }

        // Check if candidate is a majority element
        if (count > nums.size() / 2) {
            return candidate;
        } else {
            return -1; // No majority element
        }
    }
};

int main() {
    vector<int> nums = {3, 3, 4, 2, 4, 4, 2, 4, 4};

    // Create an instance of Solution class
    Solution sol;

    // Find the majority element
    int majority = sol.majorityElement(nums);

    // Print the majority element
    if (majority != -1) {
        cout << "The majority element is: " << majority << endl;
    } else {
        cout << "No majority element exists." << endl;
    }

    return 0;
}
```
