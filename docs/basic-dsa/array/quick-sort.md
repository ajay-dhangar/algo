---
id: arrays-quicksort
title: Arrays - Quick Sort
sidebar_label: Quick Sort
sidebar_position: 5
description: "Quick Sort is a highly efficient and commonly used sorting algorithm that employs a divide-and-conquer strategy. It is well-suited for large datasets and typically outperforms other algorithms like insertion sort and bubble sort."
tags: [dsa, arrays, sorting, quicksort, sorting-algorithms]
---

<AdsComponent />

**Quick Sort** is a highly efficient sorting algorithm that employs a divide-and-conquer strategy. It divides the input array into smaller sub-arrays, recursively sorting them. It is commonly used because of its average-case efficiency on large datasets. 

<QuickSortVisualization />

### How Quick Sort Works:
1. **Pivot Selection**: Select a pivot element from the array.
2. **Partitioning**: Rearrange the elements so that all elements smaller than the pivot are on its left, and all elements greater are on its right.
3. **Recursion**: Recursively apply the same process to the sub-arrays formed by partitioning.
4. **Base Case**: The recursion ends when the array is reduced to a single element or an empty sub-array.

## Key Characteristics
- **Time Complexity**:
  - **Best Case:** $O(n \log n)$
  - **Average Case:** $O(n \log n)$
  - **Worst Case:** $O(n^2)$ (occurs when the pivot is the smallest or largest element)
- **Space Complexity**: $O(\log n)$ due to the recursion stack.
- **Stability**: Quick Sort is not a stable sort (it does not preserve the relative order of equal elements).
- **In-place Sort**: It requires constant space, excluding the recursion stack.

### Example
Given an input array: `[3, 6, 8, 10, 1, 2, 1]`, Quick Sort works as follows:

1. Select a pivot (e.g., `3`).
2. Partition the array: `[1, 2, 1]` on the left of `3` and `[6, 8, 10]` on the right.
3. Recursively sort both sub-arrays.

### Java Implementation

Here is a basic implementation of Quick Sort in Java:

```java
public class QuickSort {

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        int n = arr.length;
        quickSort(arr, 0, n - 1);
    }
}
```

<br />
**Quick Sort** is versatile and efficient, making it a popular choice in practical applications.
