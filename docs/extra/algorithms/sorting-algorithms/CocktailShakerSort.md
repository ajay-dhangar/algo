---
id: cocktail-shaker-sort-algo  
sidebar_position: 18  
title: Cocktail Shaker Sort  
sidebar_label: Cocktail Shaker Sort  
---

### Definition:

Cocktail Shaker Sort, also known as Bidirectional Bubble Sort, is a variation of the Bubble Sort algorithm that sorts an array in both directions. It traverses the array back and forth, moving larger elements towards the end and smaller elements towards the beginning, making it more efficient than standard Bubble Sort in some cases.

### Characteristics:

- **Bidirectional**:  
  Unlike traditional sorting algorithms that only iterate in one direction, Cocktail Shaker Sort moves in both directions, which can help to reduce the total number of passes required.

- **In-Place**:  
  The algorithm sorts the array without using any additional storage, modifying the input array directly.

- **Stable**:  
  Cocktail Shaker Sort maintains the relative order of equal elements, making it a stable sorting algorithm.

### Time Complexity:

- **Best Case: O(n)**  
  When the array is already sorted, the algorithm makes a single pass.

- **Average Case: O(n²)**  
  In most scenarios, the algorithm's performance resembles that of Bubble Sort.

- **Worst Case: O(n²)**  
  Similar to Bubble Sort, the worst-case scenario occurs with a reversed array.

### Space Complexity:

- **Space Complexity: O(1)**  
  The algorithm operates in constant space since it only requires a few variables for swapping and indexing.

### Java Implementation:

```java
public class CocktailShakerSort {

    // Method to perform Cocktail Shaker Sort
    public static void cocktailShakerSort(int[] arr) {
        boolean swapped = true;
        int start = 0;
        int end = arr.length - 1;

        while (swapped) {
            swapped = false;

            // Forward pass
            for (int i = start; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    swapped = true;
                }
            }

            // If nothing moved, the array is sorted
            if (!swapped) break;

            swapped = false;
            end--;

            // Backward pass
            for (int i = end; i > start; i--) {
                if (arr[i] < arr[i - 1]) {
                    swap(arr, i, i - 1);
                    swapped = true;
                }
            }

            start++;
        }
    }

    // Helper method to swap two elements
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 4, 2};
        cocktailShakerSort(arr);
        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

### Summary:
Cocktail Shaker Sort improves upon the standard Bubble Sort by processing the array in both directions, potentially reducing the number of iterations needed. Its bidirectional approach provides a simple yet effective alternative for sorting, though it still maintains a quadratic time complexity in average and worst-case scenarios, making it less efficient than more advanced algorithms like Quick Sort or Merge Sort.
