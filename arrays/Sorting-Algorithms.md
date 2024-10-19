---
id: arrays-sorting-algorithms-in-dsa
title: "Arrays - Sorting Algorithms in DSA"
sidebar_label: Sorting Algorithms
sidebar_position: 3
description: "Sorting algorithms are essential for arranging data in a specific order. This guide covers Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort."
tags: [dsa, arrays, sorting algorithms]
---

<AdsComponent />

## Introduction
Sorting algorithms are fundamental in computer science for organizing data in a specific order. This file covers the following algorithms:
- **Bubble Sort**
- **Selection Sort**
- **Insertion Sort**
- **Merge Sort**
- **Quick Sort**
- **Heap Sort**

---

## 1. Bubble Sort
Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

### Algorithm
1. Start at the beginning of the array.
2. Compare each pair of adjacent elements.
3. If the first element is greater than the second, swap them.
4. Repeat the process for all elements in the array.
5. Continue until no swaps are needed.

### Code
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))  # Output: [11, 12, 22, 25, 34, 64, 90]
```
## Complexity
- Time Complexity: $O(n^2)$
- Space Complexity: $O(1)$
---
## 2. Selection Sort
Selection Sort divides the input list into two parts: the sorted part and the unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the end of the sorted part.

### Algorithm
1. Start with the first element as the minimum.
2. Compare it with the other elements.
3. If a smaller element is found, update the minimum.
4. Swap the minimum element with the first element.
5. Repeat the process for the remaining elements.

### Code
```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

arr = [64, 25, 12, 22, 11]
print(selection_sort(arr))  # Output: [11, 12, 22, 25, 64]
```
### Complexity
- Time Complexity: $O(n^2)$
- Space Complexity: $O(1)$
---

## 3. Insertion Sort
Insertion Sort builds the final sorted array one element at a time. It takes each element from the input data and finds the correct position for it in the sorted list.

### Algorithm
1. Start from the second element (the first element is considered sorted).
2. Compare the current element with the elements in the sorted part.
3. Shift the sorted elements to the right until the correct position for the current element is found.
4. Insert the current element into the correct position.
5. Repeat until the entire array is sorted.

### Code
```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

arr = [12, 11, 13, 5, 6]
print(insertion_sort(arr))  # Output: [5, 6, 11, 12, 13]
```

### Complexity
- Time Complexity: $O(n^2)$
- Space Complexity: $O(1)$
---
## 4. Merge Sort
Merge Sort is a divide-and-conquer algorithm that splits the array into halves, sorts each half, and then merges them back together.

### Algorithm
1. Divide the unsorted list into two halves.
2. Recursively sort both halves.
3. Merge the sorted halves back together.

### Code
```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

    return arr

arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))  # Output: [3, 9, 10, 27, 38, 43, 82]
```
## Complexity

- Time Complexity: $O(n \log n)$
- Space Complexity: $O(n)$
---
## 5. Quick Sort
Quick Sort is also a divide-and-conquer algorithm. It selects a 'pivot' element from the array and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

### Algorithm
1. Choose a pivot element from the array.
2. Partition the array into two halves: elements less than the pivot and elements greater than the pivot.
3. Recursively apply the above steps to the sub-arrays.

### Code
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

arr = [10, 7, 8, 9, 1, 5]
print(quick_sort(arr))  # Output: [1, 5, 7, 8, 9, 10]
```
## Complexity
- Time Complexity: $O(n^2)$ 
- Space Complexity: $O(\log n)$ (Average Case)

---
## 6. Heap Sort
Heap Sort converts the array into a heap structure and then sorts it. It repeatedly extracts the maximum (or minimum) element from the heap and reconstructs the heap.

### Algorithm
1. Build a max heap from the input data.
2. Extract the maximum element and place it at the end of the array.
3. Reduce the size of the heap and heapify the root element.
4. Repeat until all elements are sorted.

### Code
```python
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr

arr = [12, 11, 13, 5, 6, 7]
print(heap_sort(arr))  # Output: [5, 6, 7, 11, 12, 13]
```
## Complexity

- Time Complexity: $O(n \log n)$
- Space Complexity: $O(1)$

---

