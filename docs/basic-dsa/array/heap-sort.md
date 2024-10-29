---
id: arrays-heapsort
title: Arrays - Heap Sort
sidebar_label: Heap Sort
sidebar_position: 4
description: "Heap Sort is an efficient comparison-based sorting algorithm based on a binary heap data structure. It sorts by building a max-heap from the data and repeatedly extracting the maximum element."
tags: [dsa, arrays, sorting, heap-sort, algorithm of heap-sort, pseudocode of heap-sort, complexity of heap-sort, example of heap-sort, explanation of heap-sort]
---

<AdsComponent />

**Heap Sort** is an efficient, comparison-based sorting algorithm based on a binary heap data structure. Heap Sort builds a max-heap from the array and then repeatedly extracts the maximum element to achieve the sorted order. It is particularly effective for sorting large datasets due to its time complexity.

<HeapSortVisualization />

## Algorithm Steps
1. **Build a Max-Heap**: Start by building a max-heap from the input array.
2. **Heap Sort Process**:
   - Swap the root of the heap (maximum element) with the last element in the array.
   - Reduce the size of the heap and call `heapify` on the root to restore the max-heap property.
   - Repeat this process until the heap size is reduced to 1.
3. **Final Sorted Array**: The array will be sorted in ascending order as a result.

## Complexity
- **Time Complexity**:
  - **Best Case:** $O(n \log n)$
  - **Average Case:** $O(n \log n)$
  - **Worst Case:** $O(n \log n)$
- **Space Complexity**: $O(1)$, as Heap Sort is an in-place algorithm.
- **Stability**: Heap Sort is not a stable sort (it does not preserve the relative order of equal elements).

## Pseudocode

```plaintext title="Heap Sort"
procedure heapSort(A: list of sortable items)
    buildMaxHeap(A)
    for end = length(A) down to 2 do
        swap(A[1], A[end])
        heapSize = heapSize - 1
        heapify(A, 1)
    end for
end procedure

procedure buildMaxHeap(A: list of sortable items)
    for i = floor(length(A) / 2) down to 1 do
        heapify(A, i)
    end for
end procedure

procedure heapify(A: list of sortable items, i: integer)
    left = 2 * i
    right = 2 * i + 1
    largest = i
    if left ≤ heapSize and A[left] > A[largest] then
        largest = left
    end if
    if right ≤ heapSize and A[right] > A[largest] then
        largest = right
    end if
    if largest ≠ i then
        swap(A[i], A[largest])
        heapify(A, largest)
    end if
end procedure
```

## Example

### Java Implementation

```java
public class HeapSort {
    public void heapSort(int arr[]) {
        int n = arr.length;
        
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    void heapify(int arr[], int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;

        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }

    public static void main(String[] args) {
        int arr[] = {12, 11, 13, 5, 6, 7};
        HeapSort hs = new HeapSort();
        hs.heapSort(arr);
    }
}
```

### JavaScript Code Implementation

```javascript
class HeapSort {
    heapSort(arr) {
        const n = arr.length;

        // Build a maxheap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }

        // One by one extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap

            // Call heapify on the reduced heap
            this.heapify(arr, i, 0);
        }
    }

    heapify(arr, n, i) {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // left = 2*i + 1
        const right = 2 * i + 2; // right = 2*i + 2

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest !== i) {
            // Swap
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap

            // Recursively heapify the affected sub-tree
            this.heapify(arr, n, largest);
        }
    }
}

// Example usage
const arr = [12, 11, 13, 5, 6, 7];
const heapSort = new HeapSort();
heapSort.heapSort(arr);
console.log("Sorted array is:", arr.join(" ")); // Output the sorted array
```

### Explanation of the Code

1. **HeapSort Class**:
   - Contains methods for performing heap sort.

2. **`heapSort` Method**:
   - Accepts an array (`arr`) as input.
   - Builds a max heap by calling `heapify` for each non-leaf node, starting from the last non-leaf node down to the root.
   - Repeatedly extracts the maximum element (the root of the heap) and swaps it with the last element of the heap, then reduces the size of the heap and calls `heapify` on the root.

3. **`heapify` Method**:
   - Maintains the heap property for a subtree rooted at index `i`, ensuring the largest element is at the root.
   - Compares the node with its left and right children and swaps if necessary, then recursively calls `heapify` to ensure the subtree maintains the heap property.

4. **Example Usage**:
   - An example array is created.
   - An instance of `HeapSort` is created, and `heapSort` is called on the array.
   - The sorted array is printed to the console.


## Conclusion

In this article, we explored the Heap Sort algorithm. Heap Sort is a highly efficient, in-place sorting algorithm based on the binary heap data structure. By building a max-heap and then extracting the maximum element repeatedly, it achieves a sorted array with an average time complexity of $O(n \log n)$. However, Heap Sort is not stable, and its space complexity is $O(1)$ due to its in-place nature. It is well-suited for sorting large datasets due to its efficiency.
