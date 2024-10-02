---
id: binary-search-algo
sidebar_position: 2
title: Binary Search
sidebar_label: Binary Search
---

### Definition:

Binary search is an efficient algorithm for finding a specific element in a sorted array or list. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the lower half; if it's greater, the search continues in the upper half. This process continues until the target is found or the interval is empty.

### Characteristics:

- **Divides and Conquers:**
  - The algorithm follows the divide-and-conquer paradigm. It breaks the problem into smaller subproblems (halves of the array) and solves them independently.

- **Sorted Data:**
  - The input array must be sorted beforehand. If the array is unsorted, binary search will not work correctly.

- **Can be Implemented Recursively or Iteratively:**
  - Binary search can be implemented using either a recursive function or an iterative approach.

- **No Duplicates Handling:**
  - The basic binary search implementation does not handle duplicates well; it will only find one instance of the target.

### Time Complexity:
- **Best Case: O(1)**
    The best-case scenario occurs when the target element is found at the middle of the array on the first check.

- **Average Case: O(logn)**
    On average, binary search will cut the search space in half with each iteration. This logarithmic growth means that as the size of the dataset n increases, the number of operations grows very slowly.

- **Worst Case: O(logn)**
    The worst-case scenario occurs when the target element is not present in the array. The algorithm will still narrow down the search space until it exhausts all possibilities, leading to a logarithmic number of comparisons.

### Space Complexity:
- **Iterative Approach: O(1)**
    The iterative version of binary search uses a constant amount of space, as it only requires a few variables (like left, right, and mid) to keep track of indices. It does not require additional storage proportional to the size of the input.

- **Recursive Approach: O(logn)**
    The recursive version of binary search uses stack space for recursive function calls. The maximum depth of the recursion is proportional to the logarithm of the number of elements in the array, leading to a space complexity of O(logn).

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
using namespace std;

int binarySearchIterative(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents overflow

        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }
    return -1; // Target not found
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}; // Sorted array
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 7;
    
    int result = binarySearchIterative(arr, size, target);
    
    if (result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found." << endl;
    }

    return 0;
}

```

**Recursive Approach**
```cpp
#include <iostream>
using namespace std;

int binarySearchRecursive(int arr[], int left, int right, int target) {
    if (left > right) {
        return -1; // Base case: target not found
    }

    int mid = left + (right - left) / 2; // Prevents overflow

    if (arr[mid] == target) {
        return mid; // Target found
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, mid + 1, right, target); // Search in the right half
    } else {
        return binarySearchRecursive(arr, left, mid - 1, target); // Search in the left half
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}; // Sorted array
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 7;

    int result = binarySearchRecursive(arr, 0, size - 1, target);

    if (result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found." << endl;
    }

    return 0;
}

```