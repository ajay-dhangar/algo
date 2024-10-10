---
id: stooge-sort-algo
sidebar_position: 16
title: Stooge Sort
sidebar_label: Stooge Sort
description: A detailed guide on the Stooge Sort algorithm with Python implementation examples.
tags: [stooge sort, algorithms, sorting algorithms]
---

### Definition:

Stooge sort is a **recursive sorting algorithm** that operates by comparing the first and last elements of a sequence and swapping them if necessary. It then recursively applies the same procedure to overlapping subarrays. While Stooge sort is notable for its academic interest, it is inefficient for practical use due to its high time complexity.

### Characteristics:

- **Recursive Algorithm**:
  - Stooge sort uses a recursive approach to sort elements. It first swaps elements if needed, then recursively sorts the first two-thirds and the last two-thirds of the array.

- **Inefficient Time Complexity**:
  - Despite its simplicity, Stooge sort is inefficient with a time complexity of $O(n^{2.7095})$, making it one of the least efficient sorting algorithms.

- **Rarely Used in Practice**:
  - Due to its poor performance, Stooge sort is rarely used in real-world applications, but it remains a useful algorithm for theoretical study.

### Time Complexity:

- **Best Case: $O(n^{2.7095})$ 
  Even in the best case, Stooge sort requires recursive calls that make its performance slower than more efficient algorithms like merge sort or quicksort.

- **Average Case: $O(n^{2.7095})$
  The time complexity remains $O(n^{2.7095})$ across average cases due to the recursion.

- **Worst Case: $O(n^{2.7095})$
  Stooge sort's worst-case performance is similar to its average and best-case complexities.

### Space Complexity:

- **Space Complexity: $O(n)$
  The space complexity of Stooge sort is linear due to the recursive calls storing subarrays on the stack.

### Python Implementation:

```python
def stooge_sort(arr, l, h):
    if l >= h:
        return

    # If first element is smaller than the last, swap them
    if arr[l] > arr[h]:
        arr[l], arr[h] = arr[h], arr[l]

    # If there are more than 2 elements in the array
    if h - l + 1 > 2:
        t = (h - l + 1) // 3
        stooge_sort(arr, l, h - t)  # Sort the first 2/3
        stooge_sort(arr, l + t, h)  # Sort the last 2/3
        stooge_sort(arr, l, h - t)  # Again sort the first 2/3

# Example usage:
arr = [2, 4, 5, 3, 1]
stooge_sort(arr, 0, len(arr) - 1)
print("Sorted array:", arr)
```

### Summary:

Stooge sort is an inefficient **recursive sorting algorithm** with a high time complexity of $O(n^{2.7095})$, making it impractical for real-world use. While it has educational value, it is rarely used in practice, especially when compared to more efficient algorithms like quicksort or merge sort.
