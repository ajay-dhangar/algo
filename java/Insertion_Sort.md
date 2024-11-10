---
id: insertion-sort
sidebar_position: 3
title: Insertion Sort
sidebar_label: Insertion-Sort
description: Insertion sorting algorithm implementation in Java.
tags: [java, sorting, insertion sort]
---

## *Description*

Insertion Sort is an intuitive, comparison-based sorting algorithm. It works by dividing the list into a "sorted" and an "unsorted" part. Each item from the unsorted part is picked and inserted into its correct position in the sorted part.

*Steps in Insertion Sort:*
- Assume the first element is already sorted.
- For each subsequent element, compare it with the elements in the sorted part:
  - Shift each larger element one position to the right.
  -Insert the current element into its correct position in the sorted part.
- Repeat this until the unsorted part is empty.

This approach is efficient for small or nearly sorted arrays, as the time complexity is better in these cases.


## *Java implementation*

```
public class InsertionSort {

    /**
     * Insertion Sort Algorithm
     * Builds the sorted array one item at a time, inserting each element into its correct position.
     * Time Complexity: O(n^2) in average and worst cases, O(n) in best case (for nearly sorted data)
     * Space Complexity: O(1)
     * Best for: Small datasets or nearly sorted data
     */
    public static void insertionSort(int[] array) {
        int n = array.length;

        for (int i = 1; i < n; i++) {
            int key = array[i];
            int j = i - 1;

            // Shift elements of the sorted part that are greater than `key`
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            // Insert `key` into its correct position
            array[j + 1] = key;
        }
    }

    // Main method for testing the Insertion Sort
    public static void main(String[] args) {
        int[] array = {12, 11, 13, 5, 6};
        System.out.println("Original Array: " + java.util.Arrays.toString(array));

        insertionSort(array);
        System.out.println("Sorted Array: " + java.util.Arrays.toString(array));
    }
}

```

# *Explanation of Code:*
- Outer Loop: Starts from the second element (since a single element is trivially sorted).
- Inner Loop (while loop): Moves elements one position to the right if they are greater than the key.
- Insertion: Once the correct position is found, the key is placed in the sorted part.
  
*Time Complexity*
- Worst and Average Case: 
𝑂(𝑛^2), occurs when elements are in reverse order.
- Best Case: 
𝑂(𝑛), occurs when the array is already sorted (each element only needs one comparison).

*Space Complexity*
Space Complexity: 𝑂(1)
- O(1), as it only requires a few extra variables for swaps.
- Insertion Sort is more efficient than some other 
- 𝑂(𝑛^2) algorithms (like Bubble Sort) for small or nearly sorted arrays. It’s also a stable sorting algorithm, meaning it preserves the order of equal elements.
