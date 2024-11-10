---
id: quick-sort
sidebar_position: 3
title: Quick Sort
sidebar_label: Quick-Sort
description: Quick sorting algorithm implementation in Java.
tags: [java, sorting, quick sort]
---

## *Description*

QuickSort is a highly efficient sorting algorithm that uses the "divide and conquer" approach. It works by selecting a "pivot" element, partitioning the array around the pivot, and recursively sorting the partitions.

Steps in QuickSort:
- Choose a Pivot: Select a pivot element (commonly the last element, but other methods exist).
- Partition: Rearrange the array so elements smaller than the pivot are on the left, and elements larger are on the right.
- Recursively Sort: Apply the same process to the left and right subarrays.
- Combine: Since each subarray is sorted in place, no additional combination step is needed.

## *Java implementation*

```
public class QuickSort {

    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            // Partition the array and get the pivot index
            int pivotIndex = partition(array, low, high);

            // Recursively sort elements before and after the partition
            quickSort(array, low, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, high);
        }
    }

    // Helper method to partition the array around a pivot
    private static int partition(int[] array, int low, int high) {
        // Choose the last element as the pivot
        int pivot = array[high];
        int i = low - 1; // Index of the smaller element

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (array[j] <= pivot) {
                i++;
                // Swap array[i] and array[j]
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        // Place the pivot element at the correct position
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;

        return i + 1; // Return the pivot index
    }

    // Main method for testing QuickSort
    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        System.out.println("Original Array: " + java.util.Arrays.toString(array));

        quickSort(array, 0, array.length - 1);
        System.out.println("Sorted Array: " + java.util.Arrays.toString(array));
    }
}

```

# *Explanation of Code:*
- Recursive quickSort Method: This method partitions the array, then recursively sorts the subarrays on either side of the pivot.
- partition Method: This method arranges elements around a chosen pivot. Elements less than or equal to the pivot move to the left, and greater elements move to the right. The pivot is placed at its correct sorted position.
- Swapping: In both partitioning and sorting, elements are swapped in place, reducing the need for extra memory.
  
# *Time Complexity*

- Average Case: 
𝑂(𝑛log𝑛), when the pivot divides the array into balanced halves.

- Worst Case: 
𝑂(𝑛^2), if the pivot divides the array poorly (e.g., when the array is already sorted, and the pivot is always the smallest or largest element).

To avoid the worst-case performance, Randomized QuickSort is often used, where the pivot is chosen randomly, reducing the likelihood of poor splits.

# *Space Complexity*
Space Complexity: 
𝑂(log𝑛) due to the recursion stack in the average case.

# *Advantages of QuickSort*
- In-Place Sorting: Uses minimal additional memory.
- Efficient: Generally faster than other 𝑂(𝑛log𝑛) algorithms (like Merge Sort) for large datasets.

QuickSort is commonly used in many real-world applications due to its efficiency and relatively low memory usage compared to algorithms like Merge Sort.
