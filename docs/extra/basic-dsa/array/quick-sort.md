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


### JavaScript Code Implementation

```javascript
class QuickSort {
    static quickSort(arr, low, high) {
        if (low < high) {
            const pi = this.partition(arr, low, high);
            this.quickSort(arr, low, pi - 1);  // Recursively sort elements before partition
            this.quickSort(arr, pi + 1, high); // Recursively sort elements after partition
        }
    }

    static partition(arr, low, high) {
        const pivot = arr[high]; // Choose the last element as pivot
        let i = low - 1; // Pointer for the smaller element
        
        for (let j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++; // Increment the index of smaller element
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap using destructuring
            }
        }
        // Swap arr[i + 1] and arr[high] (or pivot)
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to correct position
        return i + 1; // Return the partitioning index
    }
}

// Example usage
const arr = [10, 7, 8, 9, 1, 5];
const n = arr.length;
QuickSort.quickSort(arr, 0, n - 1);
console.log("Sorted array is:", arr.join(" ")); // Output the sorted array
```

### Explanation of the Code

1. **QuickSort Class**:
   - Contains static methods for performing the quick sort algorithm.

2. **`quickSort` Method**:
   - Takes an array (`arr`), and the indices (`low` and `high`) that define the portion of the array to be sorted.
   - If `low` is less than `high`, it calls the `partition` method to find the pivot index and recursively sorts the subarrays on either side of the pivot.

3. **`partition` Method**:
   - Chooses the last element as the pivot.
   - Initializes a pointer (`i`) to track the index of the smaller element.
   - Iterates through the array, comparing each element to the pivot, and swaps elements to ensure those smaller than the pivot are to its left.
   - Finally, it swaps the pivot element with the element at `i + 1` to place it in its correct sorted position and returns the index of the pivot.

4. **Example Usage**:
   - An example array is created.
   - The `quickSort` method is called on the array.
   - The sorted array is printed to the console.


<br />
**Quick Sort** is versatile and efficient, making it a popular choice in practical applications.
