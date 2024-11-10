---
id: selection-sort
sidebar_position: 3
title: Selection Sort
sidebar_label: Selection-Sort
description: Selection sorting algorithm implementation in Java.
tags: [java, sorting, selection sort]
---

## *Description*

Selection Sort is a simple comparison-based sorting algorithm. It works by repeatedly finding the minimum (or maximum, depending on the order) element from the unsorted part of the array and placing it in its correct position in the sorted part.

Steps in Selection Sort:
- Divide the array into a sorted and an unsorted part.
- Find the smallest element in the unsorted part.
- Swap this smallest element with the first element of the unsorted part.
- Move the boundary of the sorted part one element to the right.
- Repeat until all elements are sorted.

## *Java implementation*

```
public class SelectionSort {
    public static void selectionSort(int[] array) {
        int n = array.length;

        for (int i = 0; i < n - 1; i++) {
            // Assume the minimum element is the first element of the unsorted part
            int minIndex = i;

            // Find the minimum element in the remaining unsorted part
            for (int j = i + 1; j < n; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element of the unsorted part
            int temp = array[minIndex];
            array[minIndex] = array[i];
            array[i] = temp;
        }
    }

    // Main method for testing the Selection Sort
    public static void main(String[] args) {
        int[] array = {64, 25, 12, 22, 11};
        System.out.println("Original Array: " + java.util.Arrays.toString(array));

        selectionSort(array);
        System.out.println("Sorted Array: " + java.util.Arrays.toString(array));
    }
}

```

# *Explanation of Code:*
- Outer Loop: Controls the sorted portion of the array. For each pass, it assumes that the minimum element is at the beginning of the unsorted part.
- Inner Loop: Searches for the minimum element in the unsorted part of the array and updates minIndex if a smaller element is found.
- Swap: After finding the minimum element in the unsorted part, it swaps this element with the element at the beginning of the unsorted part.
  
# *Time Complexity*
- All Cases (worst, average, and best): 
- 𝑂(𝑛^2), as it requires two nested loops to find and place each element.
# *Space Complexity*
- Space Complexity: O(1), as it sorts the array in place and uses only a few additional variables.

Selection Sort is typically inefficient for large datasets due to its 𝑂(𝑛^2)time complexity but can be suitable for small datasets or when memory is a constraint. It is also an in-place and unstable sorting algorithm, meaning it doesn’t preserve the order of equal elements.
