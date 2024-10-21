---
id: sliding-window-technique
title: Sliding Window Technique
sidebar_label: Sliding Window Technique
sidebar_position: 1
description: The Sliding Window Technique is an efficient approach to solving problems involving sequences, allowing you to track a subset of elements in a contiguous sequence.
tags: [basic-dsa, data-structures, sliding-window]
---

### Definition:

The Sliding Window Technique is an algorithmic approach used to solve problems that involve arrays or lists. It works by maintaining a "window" that can expand and contract to examine a contiguous segment of the array or list, allowing for efficient processing of data.

### Characteristics:

- **Dynamic Size**:
  - The window can change in size, expanding to include more elements or contracting to exclude elements as needed.

- **Optimal Performance**:
  - This technique often leads to O(n) time complexity, making it efficient for problems that require scanning through elements multiple times.

### Time Complexity:

- **Best, Average, and Worst Case: O(N)**  
  - The algorithm typically processes each element a constant number of times.

- **Space Complexity: O(1)**  
  - Generally requires a constant amount of space for variables tracking the window.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int maxSumSubarray(const vector<int>& arr, int k) {
    int maxSum = 0, windowSum = 0;
    
    for (int i = 0; i < k; i++)
        windowSum += arr[i];

    maxSum = windowSum;

    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }

    return maxSum;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    int k = 3;

    cout << "Maximum sum of subarray of size " << k << ": " << maxSumSubarray(arr, k) << endl;

    return 0;
}
```

### Java implementation:
```java
public class SlidingWindow {

    public static int maxSumSubarray(int[] arr, int k) {
        int maxSum = 0, windowSum = 0;

        for (int i = 0; i < k; i++)
            windowSum += arr[i];

        maxSum = windowSum;

        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        int k = 3;

        System.out.println("Maximum sum of subarray of size " + k + ": " + maxSumSubarray(arr, k));
    }
}
```
### Python Implementation:
```python
def max_sum_subarray(arr, k):
    max_sum = window_sum = sum(arr[:k])

    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

if __name__ == "__main__":
    arr = [2, 1, 5, 1, 3, 2]
    k = 3

    print("Maximum sum of subarray of size", k, ":", max_sum_subarray(arr, k))
```
## Summary :

The Sliding Window Technique is a powerful method for optimizing problems involving sequences. By efficiently managing the size of the window, you can achieve linear time complexity, making it suitable for large datasets.