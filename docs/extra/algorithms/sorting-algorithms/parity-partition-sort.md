---
id: parity-partition-sort
title: Parity Partition Sort
sidebar_label: "Strand Sort"
sidebar_position: 9
description: Overview and examples of Parity Partition Sort.
tags: [sorting, dsa, algorithms, programming, parity sort, partition sort, parity partition sort]
---

**Parity Partition Sort**

**Definition**

Parity Partition Sort is a sorting algorithm that initially partitions an array into two subarrays: one containing even numbers and the other containing odd numbers. It then sorts each subarray independently using a standard sorting algorithm like Merge Sort or Insertion Sort. Finally, the two sorted subarrays are merged to form the final sorted array.

**Algorithm**

1. **Partition:**
   - Iterate through the array and place even numbers in the left part of a temporary array.
   - Place odd numbers in the right part of the temporary array.
2. **Sort:**
   - Sort the even and odd partitions independently using a suitable sorting algorithm (e.g., Merge Sort).
3. **Merge:**
   - Merge the sorted even and odd partitions back into the original array.

**Java Implementation**

```java
public class ParityPartitionSort {
    public void paritySort(int[] arr) {
        int n = arr.length;
        int[] temp = new int[n];
        int evenIndex = 0, oddIndex = n - 1;

        // Partition the array into even and odd parts
        for (int num : arr) {
            if (num % 2 == 0) {
                temp[evenIndex++] = num;
            } else {
                temp[oddIndex--] = num;
            }
        }

        // Sort the even and odd partitions
        mergeSort(temp, 0, evenIndex - 1);
        mergeSort(temp, oddIndex + 1, n - 1);

        // Copy the sorted array back
        System.arraycopy(temp, 0, arr, 0, n);
    }

    // Merge Sort implementation (for sorting even and odd partitions)
    // ... (Merge Sort implementation)
}
```

**Time Complexity**

* **Partitioning:** O(n)
* **Sorting:** O(n log n) for each partition
* **Merging:** O(n)

**Overall Time Complexity:** O(n log n)

**Space Complexity:** O(n) for the temporary array.
