---
id: arrays-quicksort
title: Arrays - Quick Sort
sidebar_label: Quick Sort
description: "Quick Sort is a highly efficient and commonly used sorting algorithm that employs a divide-and-conquer strategy. It is well-suited for large datasets and typically outperforms other algorithms like insertion sort and bubble sort."
tags: [dsa, arrays, sorting, quicksort, sorting-algorithms]
---

<AdsComponent />

**Quick Sort** is a highly efficient sorting algorithm that employs a divide-and-conquer strategy. It divides the input array into smaller sub-arrays, recursively sorting them. It is commonly used because of its average-case efficiency on large datasets. 

### Video Explanation

<LiteYouTubeEmbed
  id="7h1s2SojIRw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="2.8.1 QuickSort Algorithm"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>


<QuickSortVisualization />

### How Quick Sort Works:
1. **Pivot Selection**: Select a pivot element from the array (using median-of-three to avoid worst-case).
2. **Partitioning**: Rearrange the elements so that all elements smaller than the pivot are on its left, and all elements greater are on its right.
3. **Recursion**: Recursively apply the same process to the sub-arrays formed by partitioning (tail recursion optimization sorts smaller partitions first).
4. **Base Case**: The recursion ends when the array is reduced to a single element or an empty sub-array.

## Key Characteristics
- **Time Complexity**:
  - **Best Case:** $O(n \log n)$
  - **Average Case:** $O(n \log n)$
  - **Worst Case:** $O(n^2)$ (mitigated by median-of-three pivot and tail recursion optimization)
- **Space Complexity**: $O(\log n)$ due to the recursion stack (improved by tail recursion elimination).
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
import java.util.Arrays;

public class QuickSort {

    public static void quickSort(int[] arr, int low, int high) {
        while (low < high) {
            int pi = partition(arr, low, high);
            // Tail recursion optimization: recurse on smaller partition, iterate on larger
            if (pi - low < high - pi) {
                quickSort(arr, low, pi - 1);
                low = pi + 1;
            } else {
                quickSort(arr, pi + 1, high);
                high = pi - 1;
            }
        }
    }

    private static int medianOfThree(int[] arr, int low, int high) {
        int mid = low + (high - low) / 2;
        if (arr[low] > arr[mid]) swap(arr, low, mid);
        if (arr[low] > arr[high]) swap(arr, low, high);
        if (arr[mid] > arr[high]) swap(arr, mid, high);
        // Place median at high for Lomuto partition
        swap(arr, mid, high);
        return arr[high];
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = medianOfThree(arr, low, high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}
```


### JavaScript Code Implementation

```javascript
class QuickSort {
    static quickSort(arr, low, high) {
        while (low < high) {
            const pi = this.partition(arr, low, high);
            // Tail recursion optimization: recurse on smaller partition, iterate on larger
            if (pi - low < high - pi) {
                this.quickSort(arr, low, pi - 1);
                low = pi + 1;
            } else {
                this.quickSort(arr, pi + 1, high);
                high = pi - 1;
            }
        }
    }

    static medianOfThree(arr, low, high) {
        const mid = low + Math.floor((high - low) / 2);
        if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
        if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
        if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
        [arr[mid], arr[high]] = [arr[high], arr[mid]];
        return arr[high];
    }

    static partition(arr, low, high) {
        const pivot = this.medianOfThree(arr, low, high);
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }
}

// Example usage
const arr = [10, 7, 8, 9, 1, 5];
QuickSort.quickSort(arr, 0, arr.length - 1);
console.log("Sorted array is:", arr.join(" "));
```

### Explanation of the Code

1. **QuickSort Class**:
   - Contains static methods for performing the quick sort algorithm.

2. **`quickSort` Method**:
   - Takes an array (`arr`), and the indices (`low` and `high`) that define the portion of the array to be sorted.
   - Uses a `while` loop with **tail recursion elimination**: it recurses only on the smaller partition and iterates on the larger one, preventing stack overflow on large inputs.

3. **`medianOfThree` Method**:
   - Selects a pivot by taking the median of the first, middle, and last elements.
   - This avoids worst-case $O(n^2)$ behavior on already sorted or reverse-sorted arrays.

4. **`partition` Method**:
   - Uses the median-of-three pivot and Lomuto partitioning.
   - Iterates through the array, swapping elements to ensure those smaller than the pivot are to its left.
   - Places the pivot in its correct sorted position and returns its index.

5. **Example Usage**:
   - An example array is created.
   - The `quickSort` method is called on the array.
   - The sorted array is printed to the console.


<br />
**Quick Sort** is versatile and efficient, making it a popular choice in practical applications.
