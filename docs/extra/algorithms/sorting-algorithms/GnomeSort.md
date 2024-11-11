---
id: gnome-sort-algo  
sidebar_position: 16  
title: Gnome Sort  
sidebar_label: Gnome Sort  
---

### Definition:

Gnome Sort is a simple comparison-based sorting algorithm that sorts an array by iterating through it and swapping adjacent elements if they are in the wrong order. If a swap occurs, the algorithm moves one position back; otherwise, it moves one position forward. The algorithm continues until the entire array is sorted.

### Characteristics:

- **Swapping**:  
  Gnome Sort swaps adjacent elements that are out of order. If the current element is larger than the next one, they are swapped, and the algorithm moves backward. If no swap occurs, it moves forward.

- **In-Place**:  
  It does not require additional storage; hence it is an in-place sorting algorithm.

- **Stable**:  
  Gnome Sort is stable, meaning it preserves the relative order of equal elements.

### Time Complexity:

- **Best Case: O(n)**  
  Occurs when the array is already sorted or nearly sorted, requiring minimal swaps.

- **Average Case: O(n²)**  
  Similar to Bubble Sort, it performs poorly with larger datasets due to its quadratic time complexity.

- **Worst Case: O(n²)**  
  This happens when the array is sorted in reverse order, leading to the maximum number of swaps.

### Space Complexity:

- **Space Complexity: O(1)**  
  As it sorts the array in place, the space requirement is constant.

### Java Implementation:

```java
public class GnomeSort {

    // Method to perform Gnome Sort
    public static void gnomeSort(int[] arr) {
        int index = 0;
        while (index < arr.length) {
            if (index == 0) {
                index++;
            }
            if (arr[index] >= arr[index - 1]) {
                index++;
            } else {
                // Swap arr[index] and arr[index - 1]
                int temp = arr[index];
                arr[index] = arr[index - 1];
                arr[index - 1] = temp;
                index--;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {34, 2, 10, -9, 1};
        gnomeSort(arr);
        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

### Summary:
Gnome Sort is a straightforward algorithm that can be easily implemented but is inefficient for larger datasets due to its O(n²) average and worst-case time complexities. It is primarily of theoretical interest and is not commonly used in practice compared to more efficient algorithms like Quick Sort or Merge Sort.
