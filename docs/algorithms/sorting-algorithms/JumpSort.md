---
id: jump-sort-algo  
sidebar_position: 2  
title: Jump Sort  
sidebar_label: Jump Sort  
---

### Definition:

Jump Sort is a simple comparison-based sorting algorithm that sorts elements by dividing the list into blocks and performing a linear search within these blocks. The algorithm jumps ahead by a fixed step size to reduce the number of comparisons, making it more efficient than naive sorting algorithms for larger datasets.

### Characteristics:

- **Block-wise Comparison**:
  - Jump Sort divides the array into blocks of a fixed size (often the square root of the array length) and performs linear searches within these blocks.

- **In-Place Sorting**:
  - It operates directly on the input array without needing additional storage, making it an in-place sorting algorithm.

- **Not Stable**:
  - Jump Sort does not maintain the relative order of elements with equal values, which means it is not a stable sorting algorithm.

- **Simplicity**:
  - The algorithm is straightforward and easy to implement, although it may not be as efficient as other algorithms for large datasets.

### Time Complexity:

- **Best Case: O(n)**  
  In the best-case scenario, where the array is already sorted, Jump Sort can traverse the array with minimal comparisons.

- **Average Case: O(n√n)**  
On average, Jump Sort will perform a number of comparisons proportional to the number of elements times the square root of the number of elements.

- **Worst Case: O(n√n)**  
In the worst case, where the elements are in reverse order, Jump Sort will require a full traversal of the blocks, resulting in quadratic time complexity.

### Space Complexity:

- **Space Complexity: O(1)**  
Jump Sort is an in-place algorithm, so it requires only a constant amount of extra memory, regardless of the input size.

### C++ Implementation:

**Jump Sort**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

void jumpSort(int arr[], int size) {
    int step = sqrt(size); // Optimal block size
    for (int i = 0; i < size; i += step) {
        int end = min(i + step, size);
        // Perform linear sort within the block
        for (int j = i; j < end; j++) {
            for (int k = j + 1; k < end; k++) {
                if (arr[j] > arr[k]) {
                    // Swap arr[j] and arr[k]
                    swap(arr[j], arr[k]);
                }
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int size = sizeof(arr) / sizeof(arr[0]);

    jumpSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```
