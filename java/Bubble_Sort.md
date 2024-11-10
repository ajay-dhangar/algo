---
id: bubble-sort
sidebar_position: 3
title: Bubble Sort
sidebar_label: Bubble-Sort
description: Bubble sorting algorithm implementation in Java.
tags: [java, sorting, bubble sort]
---

## *Description*

Bubble Sort is a straightforward sorting algorithm that repeatedly steps through the list to be sorted, compares adjacent elements, and swaps them if they are in the wrong order. It continues to do this until the list is sorted.

Here’s a step-by-step explanation of how Bubble Sort works:

- Start at the beginning of the list.
- Compare each pair of adjacent elements:
    - If the current element is greater than the next one, swap them.
    - If not, move to the next pair.
- Continue comparing and swapping until reaching the end of the list.
- After the first pass, the largest element will have "bubbled up" to the last position.
- Repeat the process, ignoring the last sorted elements in each subsequent pass, as they are already in the correct position.
- Stop when no swaps are needed on a full pass through the list.


## *Java implementation*

```
public class BubbleSort {

    public static void bubbleSort(int[] array) {
        int n = array.length;
        boolean swapped;

        // Outer loop for each pass
        for (int i = 0; i < n - 1; i++) {
            swapped = false;

            // Inner loop for comparing adjacent elements
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap if the element is greater than the next element
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no two elements were swapped, the array is sorted
            if (!swapped) break;
        }
    }

    // Main method for testing the Bubble Sort
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original Array: " + java.util.Arrays.toString(array));

        bubbleSort(array);
        System.out.println("Sorted Array: " + java.util.Arrays.toString(array));
    }
}

```

# *Complexity*

-  Time Complexity: O(n^2) for average and worst case, O(n) for best case (already sorted array)
-  Space Complexity: O(1)

# Best for: 
- Small datasets, mostly unsorted data
