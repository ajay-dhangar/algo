# Find Pivot Index

### Problem Statement:
Given an array of integers `nums`, write a function that returns the "pivot" index of this array.

The **pivot index** is the index where the sum of all the numbers to the left of the index is equal to the sum of all the numbers to the right of the index.

If no such index exists, return `-1`. If there are multiple pivot indexes, return the left-most pivot index.

### Example:

#### Example 1:
- Input: nums = [1, 7, 3, 6, 5, 6] 
- Output: 3 
- Explanation: The sum of the numbers to the left of index 3 (nums[3] = 6) is equal to the sum of the numbers to the right of index 3.

#### Example 2:
- Input: nums = [1, 2, 3]
- Output: -1 
- Explanation: There is no index that satisfies the conditions.

#### Example 3:
- Input: nums = [2, 1, -1]
- Output: 0
- Explanation: The sum of the numbers to the left of index 0 is equal to the sum of the numbers to the right of index 0.


### Constraints:
- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`

### Solution (Python):
```python
class Solution:
    def pivotIndex(self, nums):
        total_sum = sum(nums)
        left_sum = 0

        for i, num in enumerate(nums):
            if left_sum == (total_sum - left_sum - num):
                return i
            left_sum += num

        return -1
```
### Time Complexity:
- O(n), where n is the number of elements in the input array nums. We traverse the list twice: once to compute the total sum and once to find the pivot index.
### Space Complexity:
- O(1), as we only use a few extra variables.

