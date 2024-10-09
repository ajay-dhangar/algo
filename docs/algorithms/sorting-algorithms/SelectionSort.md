---
id: selection-sort-algo  
sidebar_position: 2  
title: Selection Sort 
sidebar_label: Selection Sort
description: Selection sort is a simple comparison-based sorting algorithm that repeatedly selects the smallest (or largest) element from the unsorted portion of the array and swaps it with the first unsorted element. It works by dividing the array into a sorted and an unsorted region and systematically reducing the size of the unsorted region.
tags: [Sorting Algorithms, Selection Sort]
---

### Definition:

Selection sort is a simple comparison-based sorting algorithm that repeatedly selects the smallest (or largest) element from the unsorted portion of the array and swaps it with the first unsorted element. It works by dividing the array into a sorted and an unsorted region and systematically reducing the size of the unsorted region.

### Characteristics:

- **In-Place Sorting**:
  - Selection sort operates directly on the input array and does not require additional storage, making it an in-place sorting algorithm.

- **Not Stable**:
  - Selection sort is not a stable sorting algorithm because equal elements can be swapped, potentially changing their relative order.

- **Selection Process**:
  - In each pass, the algorithm selects the smallest element from the unsorted part of the array and places it in the correct position by swapping it with the first element of the unsorted part.

- **Inefficient for Large Datasets**:
  - Although the algorithm is simple, it is not efficient for large datasets as it requires many comparisons and swaps.

### Time Complexity:

- **Best Case: O(n²)**  
  Even in the best case where the array is already sorted, the algorithm must make n²/2 comparisons because it systematically searches for the smallest element in the unsorted portion.

- **Average Case: O(n²)**  
  On average, the algorithm must make n²/2 comparisons and n swaps. This quadratic time complexity makes selection sort inefficient for large datasets.

- **Worst Case: O(n²)**  
  In the worst-case scenario (reverse sorted array), selection sort must still make the same number of comparisons as in the average case.

### Space Complexity:

- **Space Complexity: O(1)**  
  Selection sort is an in-place algorithm and requires only a constant amount of extra memory for swapping elements.

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
using namespace std;

void selectionSortIterative(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        int minIndex = i; // Assume the current element is the minimum

        // Find the minimum element in the remaining unsorted array
        for (int j = i + 1; j < size; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // Update the index of the minimum element
            }
        }

        // Swap the found minimum element with the first unsorted element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int size = sizeof(arr) / sizeof(arr[0]);

    selectionSortIterative(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

**Recursive Approach**
```cpp
#include <iostream>
using namespace std;

void selectionSortRecursive(int arr[], int size, int index = 0) {
    // Base case: If the array is completely sorted
    if (index == size - 1) {
        return;
    }

    int minIndex = index;

    // Find the minimum element in the remaining unsorted array
    for (int j = index + 1; j < size; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }

    // Swap the found minimum element with the first unsorted element
    if (minIndex != index) {
        int temp = arr[index];
        arr[index] = arr[minIndex];
        arr[minIndex] = temp;
    }

    // Recursively sort the rest of the array
    selectionSortRecursive(arr, size, index + 1);
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int size = sizeof(arr) / sizeof(arr[0]);

    selectionSortRecursive(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Selection sort is a simple, easy-to-understand algorithm that can be useful for small datasets or when memory space is limited. However, its quadratic time complexity makes it inefficient for large datasets. The algorithm iteratively selects the minimum element from the unsorted portion of the array and swaps it into place. The iterative and recursive implementations both perform the same function, with the recursive version offering a cleaner, although slightly more complex, approach.
