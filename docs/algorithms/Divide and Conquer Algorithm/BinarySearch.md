---

id: binary-search-algo  
sidebar_position: 3
title: Binary Search  
sidebar_label: Binary Search  

---

### Definition:

**Binary Search** is an efficient algorithm for finding a target element in a **sorted** array. It works by repeatedly dividing the search interval in half and comparing the middle element with the target. If the target is found, the search is successful; if not, it continues in the left or right half of the array, depending on whether the target is smaller or larger than the middle element.

### Characteristics:

- **Divide**:
  - Check the middle element of the array.

- **Conquer**:
  - If the middle element is not the target, recursively search in the left or right half, depending on whether the target is smaller or larger than the middle element.

- **Combine**:
  - There’s no need to combine results; the search either finds the element or concludes it’s not present.

- **Efficient**:
  - Binary search significantly reduces the number of comparisons needed to find an element compared to linear search algorithms.

### Time Complexity:

- **Best Case: O(1)**  
  The target element is found at the first middle check.

- **Average Case: O(log n)**  
  Each iteration cuts the search space in half, leading to logarithmic time complexity.

- **Worst Case: O(log n)**  
  The algorithm continues dividing the search space until it either finds the target or exhausts all possibilities.

### Space Complexity:

- **Space Complexity: O(1)** (iterative)  
  Uses constant space, as it only requires a few variables for indices.

- **Space Complexity: O(log n)** (recursive)  
  If implemented recursively, the call stack can go as deep as the height of the tree, leading to logarithmic space usage.

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

// Function to perform binary search
int binarySearch(int arr[], int size, int target) {
    int low = 0;
    int high = size - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Calculate middle index

        // Check if target is present at mid
        if (arr[mid] == target) {
            return mid; // Target found
        }
        // If target is greater, ignore left half
        else if (arr[mid] < target) {
            low = mid + 1; // Update the lower bound
        }
        // If target is smaller, ignore right half
        else {
            high = mid - 1; // Update the upper bound
        }
    }

    return -1; // Target not found
}

// Driver code
int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = binarySearch(arr, size, target);
    if (result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found." << endl;
    }

    return 0;
}
```

### Explanation of the Code:

1. **Binary Search Function**:
   - The `binarySearch` function takes an array, its size, and the target value as inputs.
   - It uses two pointers (`low` and `high`) to keep track of the current search interval.
   - In each iteration, it calculates the middle index and compares the middle element with the target.
   - Depending on the comparison, it narrows down the search space by updating `low` or `high`.

2. **Driver Code**:
   - The `main` function initializes a sorted array and specifies a target value.
   - It calls the `binarySearch` function and prints the index of the found element or a message indicating it wasn't found.

### Summary:

Binary Search is a highly efficient algorithm for finding a target element in a sorted array, boasting an average and worst-case time complexity of \(O(\log n)\). Its divide and conquer approach significantly reduces the search space, making it a preferred choice for searching in sorted data. With a constant space complexity in its iterative form, it is suitable for scenarios where memory efficiency is crucial.

