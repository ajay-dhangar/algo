---
id: maximum-minimum
title: Maximum-minimum
sidebar_label: Maximum-minimum
description: "Maximum minimum finding using divide and conquer approach to reduce the number of comparisions."  
tags: [dsa, algorithms, divide and conquer]
---

### Definition:
This C program implements a divide-and-conquer algorithm to efficiently find the minimum and maximum values in an array. The algorithm recursively divides the array into smaller subarrays, computes the minimum and maximum for each subarray, and combines the results to find the overall minimum and maximum.


### Problem Statement:
Given an array X[] of size n, write a program to find the maximum and minimum element in the array. Our goal would be to solve this problem using minimum number of comparisons. Use divide and conquer apporach to solve the problem.

### Algorithm Steps:

1. Divide the array into two halves until only one or two elements remain in each subarray.                       
2. Conquer by finding the minimum and maximum of these smaller subarrays.              
3. Combine the results by comparing minimums and maximums from each half to find the overall minimum and maximum.

### Steps Involved:

1. **Input Array:** The program receives an integer array a with n elements.                                             

2. **Function DAC_Min_Max:** This recursive function takes three parameters:                                          
    - `a[]`: the input array of integers                           
    - `i`: the starting index of the current subarray                        
    - `j`: the ending index of the current subarray                                   
      This function will return a structure Data that contains both the min and max values found in the subarray.                                     

3. **Divide Step:**
                          
    - Base Case:                                                                      
        If `i == j`, meaning the subarray has only one element, the minimum and maximum values are simply that element itself.                                   
        If `i == j - 1`, meaning the subarray has two elements, compare them to set the minimum and maximum.                          
  
    - Recursive Case:        
      Otherwise, the array has more than two elements, so the function divides it at the midpoint `mid = (i + j) / 2` and recursively calls `DAC_Min_Max` for each half.

4. **Conquer Step:** For each recursive call:
    - Recursively find the minimum and maximum in both halves (left and right subarrays).

5. **Combine Step:** Compare the minimum and maximum values returned from the left and right subarrays to determine the minimum and maximum of the current subarray:
    - Set result.min to the lesser of `leftResult.min` and `rightResult.min`.
    - Set result.max to the greater of `leftResult.max` and `rightResult.max`.
  
6. **Result Check:** After all recursive calls complete, the main function displays the minimum and maximum values found in the entire array.

7. **Edge Case:** If the array has only one element, that element is both the minimum and maximum.

### Time Complexity:
- The time complexity of this algorithm is `O(n)` because each level of recursion processes a smaller subset of elements in parallel. The total number of comparisons is minimized to approximately `O(3n/2)` in the worst case, making this approach more efficient than a straightforward solution.   

### Sample Input:
Enter the size of the array: 6                        
Enter the elements: 92 12 7 -5 65 38         

### Sample Output:
The maximum value is: 92                       
The minimum value is: -5                         

### C++ Implementation:
```cpp
#include <iostream>
using namespace std;

// Structure to hold both minimum and maximum values
struct Data {
    int min;
    int max;
};

Data DAC_Min_Max(int a[], int i, int j) {
    int mid;
    Data result, leftResult, rightResult; 	// Declare variables to hold min/max values for subarrays
    
    // Case 1: If there is only one element in the array
    if (i == j) {			
        result.max = a[i];
        result.min = a[i];
        return result;
    }
    // Case 2: If there are only two elements
    else if (i == j - 1) {	
        if (a[i] < a[j]) {	// Compare the two elements and set min/max accordingly
            result.max = a[j];
            result.min = a[i];
        } else {
            result.max = a[i];
            result.min = a[j];
        }
        return result;
    }
    
    // Case 3: More than two elements, so divide the array
    mid = (i + j) / 2;
    leftResult = DAC_Min_Max(a, i, mid);	    // Recursively find min/max in the left subarray
    rightResult = DAC_Min_Max(a, mid + 1, j);	// Recursively find min/max in the right subarray
    
    // Compare the results from left and right subarrays to find the overall min and max
    result.max = (leftResult.max > rightResult.max) ? leftResult.max : rightResult.max;
    result.min = (leftResult.min < rightResult.min) ? leftResult.min : rightResult.min;
    return result;
}

int main() {
    int n, a[50];
    Data MinMax;	// Declare a structure to hold the final min and max values
    
    cout << "Enter the size of the array: ";
    cin >> n;
    
    cout << "Enter the elements: ";
    for (int i = 0; i < n; i++)
        cin >> a[i];
    
    MinMax = DAC_Min_Max(a, 0, n - 1); 	
    
    cout << "The maximum value is: " << MinMax.max << endl;
    cout << "The minimum value is: " << MinMax.min << endl;
    
    return 0;
}
```
