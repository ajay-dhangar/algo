---
id: linear-search-algo
sidebar_position: 1
title: Linear Search
sidebar_label: Linear Search
---

### Definition:

A linear search algorithm is a simple method for finding a specific element in a list or array. It works by sequentially checking each element until the desired element is found or the end of the list is reached.

### Characteristics:

- **Simplicity:**
  - The algorithm is easy to understand and implement. It requires minimal code and logic, making it accessible for beginners.

- **No Sorting Required:**
  - Linear search can be performed on unsorted arrays or lists. This makes it versatile since it doesn't need any preprocessing of the data.

- **Multiple Occurrences:**
  - If multiple occurrences of the target value exist in the list, the linear search will return the index of the first occurrence. It can be modified to find all occurrences if needed.

- **Best for Small Datasets:**
  - Linear search is efficient for small to medium-sized datasets. As the dataset grows, its inefficiency becomes more pronounced compared to more advanced search algorithms.

### Linear Search Algorithm:

**Steps:**
    1. Start at the beginning of the list.
    2. Check each element in the list one by one:
        - If the current element matches the target value, return the index of that element.
        - If it does not match, move to the next element.
    3. If the end of the list is reached and no match is found, return a value indicating that the target is not in the list (e.g., -1).

### Time Complexity:

- **Worst-case: O(n)**
  - This occurs when the target element is not present or is at the last position.

- **Best-case: O(1)**
  - This occurs when the target element is the first element in the list.

The space complexity of the linear search algorithm is O(1), which means it uses a constant amount of additional space regardless of the input size.

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

int linearSearch(int arr[], int size, int target) {
    for (int index = 0; index < size; index++) {
        if (arr[index] == target) {
            return index;  // Return the index if the target is found
        }
    }
    return -1;  // Return -1 if the target is not found
}

int main() {
    int arr[] = {5, 3, 8, 4, 2};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 4;
    
    int result = linearSearch(arr, size, target);
    
    if (result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found." << endl;
    }
    
    return 0;
}

```