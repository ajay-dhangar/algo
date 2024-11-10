---
id: maximum-sum-subarray-of-size-k
title: Maximum Sum Subarray of Size K
sidebar_label: Maximum Sum Subarray of Size K
sidebar_position: 2
description: "In this blog post, we'll explore how to find the maximum sum of any subarray of size K using the Sliding Window Algorithm."
tags: [dsa, algorithms, sliding window, arrays]
---

## Maximum Sum Subarray of Size K

### Problem Definition:

Given an array of integers, the goal is to find the **maximum sum** of any contiguous subarray of size `K`. This is a common problem that can be solved efficiently using the **Sliding Window Algorithm**.

### Problem Example:

Let's consider an array:  
`[2, 1, 5, 1, 3, 2]` and a subarray size `K = 3`.

The possible subarrays of size `K` are:
- `[2, 1, 5]` → Sum = 8
- `[1, 5, 1]` → Sum = 7
- `[5, 1, 3]` → Sum = 9
- `[1, 3, 2]` → Sum = 6

The **maximum sum** of any subarray of size `K` is `9`.

### Approach: Sliding Window Algorithm

This problem can be efficiently solved using the **Sliding Window** technique. Instead of recalculating the sum of each subarray from scratch, we can slide the window across the array and adjust the sum incrementally by adding the new element and removing the element that goes out of the window.

### Algorithm Steps:

1. **Initialize the window**: Start by calculating the sum of the first subarray (the first window) of size `K`.
2. **Slide the window**: Move the window one element at a time across the array. For each new position, adjust the sum by adding the new element at the right and subtracting the element that is no longer in the window on the left.
3. **Track the maximum sum**: After each window slide, compare the current sum with the maximum sum and update the maximum sum accordingly.
4. **Return the maximum sum** after sliding through the entire array.

### Time Complexity:
- **O(n)**, where `n` is the size of the array. Each element is processed once when entering the window and once when leaving it.
  
### Space Complexity:
- **O(1)**, since we only need a few variables to keep track of the current sum and the maximum sum.

### C++ Code Implementation:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxSumSubarray(const vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) {
        cout << "Invalid input, array size is smaller than k." << endl;
        return -1;
    }

    int max_sum = INT_MIN, current_sum = 0;

    // Compute the sum of the first window
    for (int i = 0; i < k; i++) {
        current_sum += arr[i];
    }

    max_sum = current_sum;

    // Slide the window across the array
    for (int i = k; i < n; i++) {
        current_sum += arr[i] - arr[i - k];  // Slide the window
        max_sum = max(max_sum, current_sum);  // Update max sum
    }

    return max_sum;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    int k = 3;

    int result = maxSumSubarray(arr, k);
    cout << "Maximum sum of subarray of size " << k << ": " << result << endl;

    return 0;
}
```
### Python Code Implementation:
```python
def max_sum_subarray(arr, k):
    n = len(arr)
    if n < k:
        print("Invalid input, array size is smaller than k.")
        return -1

    max_sum = float('-inf')
    current_sum = sum(arr[:k])  # Compute the sum of the first window

    max_sum = current_sum

    # Slide the window across the array
    for i in range(k, n):
        current_sum += arr[i] - arr[i - k]  # Slide the window
        max_sum = max(max_sum, current_sum)  # Update max sum

    return max_sum

# Test the function
arr = [2, 1, 5, 1, 3, 2]
k = 3
result = max_sum_subarray(arr, k)
print(f"Maximum sum of subarray of size {k}: {result}")
```

### Java Code Implementation:
```java
public class MaxSumSubarray {

    public static int maxSumSubarray(int[] arr, int k) {
        int n = arr.length;
        if (n < k) {
            System.out.println("Invalid input, array size is smaller than k.");
            return -1;
        }

        int maxSum = Integer.MIN_VALUE;
        int currentSum = 0;

        // Compute the sum of the first window
        for (int i = 0; i < k; i++) {
            currentSum += arr[i];
        }
        maxSum = currentSum;

        // Slide the window across the array
        for (int i = k; i < n; i++) {
            currentSum += arr[i] - arr[i - k];  // Slide the window
            maxSum = Math.max(maxSum, currentSum);  // Update max sum
        }

        return maxSum;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        int k = 3;
        int result = maxSumSubarray(arr, k);
        System.out.println("Maximum sum of subarray of size " + k + ": " + result);
    }
}
```

 ## Explanation:
Initialize the window:
The first for loop calculates the sum of the first subarray of size K by adding the first K elements.

Slide the window:
The second for loop slides the window across the array by adjusting the sum. It adds the new element coming into the window and removes the element going out of the window.

Update the maximum sum:
After each slide, we update the maximum sum if the current window sum is larger than the previous maximum sum.