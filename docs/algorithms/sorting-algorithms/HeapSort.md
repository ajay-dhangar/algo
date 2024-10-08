---
id: heap-sort-algo
sidebar_position: 6  
title: Heap Sort  
sidebar_label: Heap Sort  
description: A detailed guide on the Heap Sort algorithm with C++ implementation examples.
tags: [heap sort, algorithms, sorting algorithms]
---

### Definition:

Heap sort is a **comparison-based** sorting algorithm that uses a binary heap data structure to efficiently find the largest or smallest element, depending on the heap type. It is an **in-place** and **non-stable** sorting algorithm that operates by first building a max heap and then extracting elements from it.

### Characteristics:

- **Binary Heap**:
  - Heap sort is based on a complete binary tree structure called a heap. The two types of heaps are:
    - **Max Heap**: The root is the largest element.
    - **Min Heap**: The root is the smallest element.

- **In-Place Sorting**:
  - Heap sort sorts the array in place without requiring additional memory beyond the array itself, making it memory efficient.

- **Non-Stable**:
  - Heap sort is a non-stable sorting algorithm, meaning that the relative order of equal elements may not be preserved during the sorting process.

- **No Recursive Calls**:
  - Unlike recursive algorithms like merge sort, heap sort uses an iterative approach to build the heap and extract elements.

### Time Complexity:

- **Best Case: O(n log n)**  
  Heap sort involves building the heap $(O(n))$ and extracting elements from it $(O(n log n))$, so even in the best case, it requires $O(n log n)$ time.

- **Average Case: O(n log n)**  
  Heap sort's time complexity remains $O(n log n)$ across average cases since the heap operations are logarithmic in nature.

- **Worst Case: O(n log n)**  
  The worst case also results in $O(n log n)$, as heapifying and extracting the largest elements are bound by logarithmic comparisons.

### Space Complexity:

- **Space Complexity: O(1)**  
  Heap sort is an in-place algorithm, meaning it does not need additional memory to store subarrays or temporary structures, aside from the input array.

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

// To heapify a subtree rooted with node i, n is the size of the heap
void heapify(int arr[], int n, int i) {
    int largest = i; // Initialize largest as root
    int left = 2 * i + 1; // left = 2*i + 1
    int right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Main function to perform heap sort
void heapSort(int arr[], int n) {
    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

// A utility function to print an array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
}

// Driver program to test the heap sort
int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    heapSort(arr, n);

    cout << "Sorted array: \n";
    printArray(arr, n);
}
```

### Summary:

Heap sort is an efficient, in-place sorting algorithm that works by building a max heap from the input array and then repeatedly extracting the largest element. Its consistent time complexity of O(n log n) makes it useful for many applications, although its non-stability and in-place nature make it less ideal for sorting data that requires maintaining the relative order of equal elements.
