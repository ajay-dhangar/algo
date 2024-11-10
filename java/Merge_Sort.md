---
id: merge-sort
sidebar_position: 3
title: Merge Sort
sidebar_label: Merge-Sort
description: Merge sorting algorithm implementation in Java.
tags: [java, sorting, merge sort]
---

## *Description*

Merge Sort is an efficient, stable, and comparison-based sorting algorithm. It uses the "divide and conquer" approach, dividing the array into halves, recursively sorting each half, and then merging the sorted halves back together.

Steps in Merge Sort:
- Divide: Split the array into two halves.
- Conquer: Recursively sort each half.
- Combine: Merge the two sorted halves into a single sorted array.

## *Java implementation*

```
public class MergeSort {

    public static void mergeSort(int[] array, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = (left + right) / 2;

            // Sort the first and second halves
            mergeSort(array, left, mid);
            mergeSort(array, mid + 1, right);

            // Merge the sorted halves
            merge(array, left, mid, right);
        }
    }

    // Helper method to merge two halves
    private static void merge(int[] array, int left, int mid, int right) {
        // Sizes of the two subarrays
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temporary arrays
        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        // Copy data to temp arrays
        System.arraycopy(array, left, leftArray, 0, n1);
        System.arraycopy(array, mid + 1, rightArray, 0, n2);

        // Merge the temp arrays back into the original array
        int i = 0, j = 0;
        int k = left;
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                array[k++] = leftArray[i++];
            } else {
                array[k++] = rightArray[j++];
            }
        }

        // Copy remaining elements of leftArray
        while (i < n1) {
            array[k++] = leftArray[i++];
        }

        // Copy remaining elements of rightArray
        while (j < n2) {
            array[k++] = rightArray[j++];
        }
    }

    // Main method for testing the Merge Sort
    public static void main(String[] args) {
        int[] array = {12, 11, 13, 5, 6, 7};
        System.out.println("Original Array: " + java.util.Arrays.toString(array));

        mergeSort(array, 0, array.length - 1);
        System.out.println("Sorted Array: " + java.util.Arrays.toString(array));
    }
}

```

# *Explanation of Code:*
- Recursive mergeSort Method: This method divides the array into halves recursively until each subarray contains a single element (a trivially sorted array).
- merge Method: This method merges two sorted halves by comparing elements and arranging them in order, placing the merged result back into the original array.
- Temporary Arrays: leftArray and rightArray are used to hold the elements of the two halves temporarily during the merge.

# *Time Complexity*
- All Cases (best, average, and worst): 
- 𝑂(𝑛log𝑛), as it always splits the array and performs a linear merge.

# *Space Complexity*
- Space Complexity: 𝑂(𝑛), since it requires extra storage for the temporary arrays during merging.

# *Advantages of Merge Sort*
- Stable: Merge Sort preserves the order of equal elements.
- Consistent Performance: Its time complexity is 𝑂(𝑛log𝑛) for all cases, making it a reliable choice for large datasets.

However, Merge Sort uses extra memory for merging, which makes it less ideal in memory-constrained environments.
