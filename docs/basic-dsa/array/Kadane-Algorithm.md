---
id: introduction-to-Arrays
title: Kadane's Algorithm
sidebar_label: Introduction to Kadane's Algorithm
sidebar_position: 1
description: Kadane's Algorithm is an efficient technique used to find the maximum sum of a contiguous subarray within a one-dimensional array of integers. It is particularly useful in scenarios where the input array may contain both positive and negative numbers. By leveraging a dynamic programming approach, Kadane's Algorithm can identify the maximum sum in linear time, making it optimal for large datasets.

tags: [basic-dsa, data-structures,Kadane's Algorithm]
---


### Defination:

Kadane's Algorithm is an efficient technique used to find the maximum sum of a contiguous subarray within a one-dimensional array of integers. It is particularly useful in scenarios where the input array may contain both positive and negative numbers. By leveraging a dynamic programming approach, Kadane's Algorithm can identify the maximum sum in linear time, making it optimal for large datasets.

### Characteristics:

- **Dynamic Programming Approach**:
- Kadane's algorithm builds up the solution by maintaining the maximum subarray sum that ends at each position in the array, allowing for efficient computation of the overall maximum.

- **Iterative Process**:
- The algorithm iterates through the array, updating the maximum sum and tracking the current subarray sum as it progresses.

- **Handles Negative Numbers**:
- Kadane's algorithm can handle arrays with negative numbers effectively, ensuring that the maximum subarray can still be found even if all elements are negative.

-**Optimal Substructure**:
The solution to the problem can be constructed efficiently from solutions to subproblems, making it suitable for dynamic programming.

### Time Complexity:

- **Best, Average, and Worst Case: O(N)**  
 - Kadane's algorithm processes each element of the array once, resulting in a linear time complexity, where n is the number of elements in the array.

- **Space Complexity: O(1)**  
- The algorithm uses a constant amount of space to store a few variables, making it highly space-efficient.


### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int kadane(const vector<int>& nums) {
    int max_so_far = nums[0];
    int current_max = nums[0];

    for (size_t i = 1; i < nums.size(); i++) {
        current_max = max(nums[i], current_max + nums[i]);
        max_so_far = max(max_so_far, current_max);
    }

    return max_so_far;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

    int max_sum = kadane(nums);
    cout << "Maximum sum of the contiguous subarray: " << max_sum << endl;

    return 0;
}

```

### JAVA Implementation:

```java
public class KadaneAlgorithm {

    public static int kadane(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }

        return maxSoFar;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

        int maxSum = kadane(nums);
        System.out.println("Maximum sum of the contiguous subarray: " + maxSum);
    }
}

```

### Python Implementation:
```py
def kadane(nums):
    max_so_far = nums[0]
    current_max = nums[0]

    for i in range(1, len(nums)):
        current_max = max(nums[i], current_max + nums[i])
        max_so_far = max(max_so_far, current_max)

    return max_so_far

if __name__ == "__main__":
    nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    
    max_sum = kadane(nums)
    print("Maximum sum of the contiguous subarray:", max_sum)

```

### JavaScript Code Implementation

```javascript
function kadane(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }

    return maxSoFar;
}

// Example usage
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxSum = kadane(nums);
console.log("Maximum sum of the contiguous subarray:", maxSum);
```

### Explanation of the Code

1. **`kadane` Function**: 
   - Takes an array of numbers (`nums`) as input.
   - Initializes two variables, `maxSoFar` and `currentMax`, with the first element of the array.
   - Loops through the array starting from the second element:
     - Updates `currentMax` to be the maximum of the current element or the sum of `currentMax` and the current element.
     - Updates `maxSoFar` to keep track of the maximum sum found so far.
   - Returns `maxSoFar` after completing the loop.

2. **Example Usage**: 
   - An example array of integers is provided.
   - The function is called, and the maximum sum of the contiguous subarray is printed to the console.


### Summary:

Kadane's algorithm provides an efficient way to determine the maximum sum of a contiguous subarray within an array of numbers. By using a dynamic programming approach, it ensures optimal performance with a linear time complexity and constant space requirements. This algorithm is widely applicable in various fields, particularly in financial analysis and signal processing.
