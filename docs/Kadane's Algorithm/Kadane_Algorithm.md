 ## Kadan's Algorithm

## Description
Kadane's Algorithm is an efficient technique used to find the maximum sum of a contiguous subarray within a one-dimensional array of integers. It is particularly useful in scenarios where the input array may contain both positive and negative numbers. By leveraging a dynamic programming approach, Kadane's Algorithm can identify the maximum sum in linear time, making it optimal for large datasets.

### Problem Definition
Given an array of integers arr[], the objective is to determine the contiguous subarray (a subarray that consists of consecutive elements) that has the largest sum. The algorithm should return this maximum sum.

Input: An array of integers, which may contain both positive and negative values.
Output: A single integer representing the maximum sum of any contiguous subarray within the input array.


### Algorithm Overview
1) Initialization:
>Start by initializing two variables:
    .max_current to the first element of the array. This variable keeps track of the maximum sum of the subarray ending at the current index.
    .max_global to the same value. This variable records the overall maximum sum found so far.

2) Iterate Through the Array:
>For each element in the array (starting from the second element), update max_current:
    .Set max_current to the maximum of the current element and the sum of max_current plus the current element. This checks whether to include the current element in the existing subarray or start a new subarray.
>If max_current exceeds max_global, update max_global to the value of max_current.

3) Result:
>After processing all elements, max_global contains the maximum sum of any contiguous subarray.


### Time Complexity
>Best Case: 
O(n)  The algorithm will still iterate through the entire array regardless of the values.
>Average Case: 
O(n)  The linear traversal applies as it evaluates each element once.
>Worst Case: 
O(n)  Even in the worst-case scenario (e.g., all negative numbers), the algorithm completes in linear time.

## Key Concepts
Contiguous Subarray: A subarray that consists of consecutive elements from the original array.
Dynamic Programming: A method for solving complex problems by breaking them down into simpler subproblems, storing the results of these subproblems to avoid redundant computations.

## Program
#include <iostream>
#include <vector>
#include <algorithm>

// Function to implement Kadane's Algorithm
int kadane(const std::vector<int>& arr) {
    // Edge case: if the array is empty
    if (arr.empty()) {
        return 0; // Or handle it as needed
    }
    
    int max_so_far = arr[0];        // Initialize with the first element
    int max_ending_here = arr[0];   // Initialize with the first element

    // Iterate through the array starting from the second element
    for (size_t i = 1; i < arr.size(); ++i) {
        // Update max_ending_here
        max_ending_here = std::max(arr[i], max_ending_here + arr[i]);
        
        // Update max_so_far
        max_so_far = std::max(max_so_far, max_ending_here);
    }

    return max_so_far; // Return the maximum sum found
}

int main() {
    // Example input array
    std::vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    
    // Call the kadane function
    int max_sum = kadane(arr);
    
    // Output the result
    std::cout << "Maximum contiguous sum is: " << max_sum << std::endl;
    
    return 0;
}

## Example Walkthrough

For the input array [-2, 1, -3, 4, -1, 2, 1, -5, 4], the algorithm proceeds as follows:

>Start with max_so_far = -2 and max_ending_here = -2.
 * At index 1 (value 1):
max_ending_here = max(1, -2 + 1) = 1
max_so_far = max(-2, 1) = 1
*  At index 2 (value -3):
max_ending_here = max(-3, 1 - 3) = -2
max_so_far remains 1.
*  At index 3 (value 4):
max_ending_here = max(4, -2 + 4) = 4
max_so_far = max(1, 4) = 4.
>Continue this process until the end of the array.
        The final output will be 6, which corresponds to the subarray [4, -1, 2, 1].

## Use Cases
Kadane's Algorithm can be applied in various scenarios, such as:

Financial analysis to determine maximum profit over a period.
Signal processing to find the most significant signal fluctuations.
Any application requiring analysis of sequences of numbers for their optimal contiguous subarrays.