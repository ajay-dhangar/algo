---
id: odd-even-sorting  
title: Odd Even Sorting  
sidebar_label: Odd Even Sorting Algorithm  
sidebar_position: 17  
description: "Odd-Even Sort is a simple comparison-based sorting algorithm, also known as Brick Sort."  
tags: [Sorting Algorithms, odd-even-sort, brick-sort]  
---

Odd-Even Sort, also known as **Brick Sort**, is a simple comparison-based sorting algorithm. It works by repeatedly comparing all odd-indexed elements with their next even-indexed neighbour and swapping them if they are out of order. Then, it performs the same comparison for even-indexed elements and continues alternating between these two phases until the list is sorted.

---

## Characteristics

- **Parallel Comparison**: Odd-Even Sort alternates between comparing odd-indexed and even-indexed pairs of elements, which makes it suitable for parallel execution.

- **In-Place Sorting**: The algorithm operates directly on the input array, requiring no additional memory aside from the input array itself.

- **Stable**: Odd-Even Sort is stable, meaning it preserves the relative order of elements with equal values.

- **Simple Implementation**: Easy to implement, but it can be inefficient for large datasets.

---

## Time Complexity

- **Best Case**: $O(n)$ (when the array is already sorted)
- **Average Case**: $O(n^2)$
- **Worst Case**: $O(n^2)$ (when the array is in reverse order)

---

## Space Complexity

- **Space Complexity**: $O(1)$ since the sorting is performed in-place.

---

## Java Implementation

```java
import java.util.Scanner;

public class OddEvenSort {
    // Function to perform odd-even sort
    public static void oddEvenSort(int[] arr) {
        boolean sorted = false; // Initially, the array is unsorted

        while (!sorted) {
            sorted = true;

            // Perform Odd phase
            for (int i = 1; i < arr.length - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    sorted = false;
                }
            }

            // Perform Even phase
            for (int i = 0; i < arr.length - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    sorted = false;
                }
            }
        }
    }

    // Function to swap two elements in the array
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();
        
        int[] arr = new int[n];
        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        oddEvenSort(arr);

        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();

        scanner.close();
    }
}
```

---

## Explanation

1. **Odd Phase**: In the odd phase, elements at odd indices are compared to their next even neighbours. If an odd-indexed element is greater than the following even-indexed element, they are swapped.

2. **Even Phase**: In the even phase, even-indexed elements are compared to their next odd-indexed neighbour and swapped if necessary.

3. **Repetition**: These phases alternate until no swaps are necessary in a complete pass, which means the array is sorted.

---

## Summary

Odd-Even Sort is a basic sorting algorithm that repeatedly compares and swaps adjacent elements based on their odd or even positions. Despite its simplicity, it is inefficient for large datasets due to its $O(n^2)$ average and worst-case time complexity. However, its ease of implementation and potential for parallelization make it suitable for specific scenarios.
