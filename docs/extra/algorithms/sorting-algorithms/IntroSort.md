---
id: introsort-algo
title: Introspective Sort (Introsort)
sidebar_label: Introsort
description: A comprehensive guide on the Introsort (Introspective Sort) hybrid algorithm, covering design principles, logic, complexity, and implementations in C++, Java, and Python.
tags: [sorting algorithms, introsort, hybrid sort, dsa, programming]
sidebar_position: 34
---

### Definition
Introspective Sort (Introsort) is a hybrid, comparison-based sorting algorithm. It starts by executing **Quicksort**, switches to **Heapsort** when the recursion depth exceeds a certain limit (based on the logarithm of the number of elements being sorted), and switches to **Insertion Sort** when the number of elements in the partition is small.

Introsort provides both the best-in-class average-case performance of Quicksort and the guaranteed $\mathcal{O}(n \log n)$ worst-case performance of Heapsort. It is the default sorting algorithm used in standard libraries such as the C++ Standard Library (`std::sort`).

---

### Design Principles

1. **Quicksort for Speed**:
   - Introsort runs Quicksort initially because it has very low constant overhead and is exceptionally fast in average cases due to cache friendliness.
2. **Heapsort for Guarantee**:
   - Quicksort has a worst-case time complexity of $\mathcal{O}(n^2)$ if partitioning is poor. To prevent this, Introsort monitors the recursion depth. If the recursion depth exceeds $2 \log_2(n)$, it switches to Heapsort, which guarantees $\mathcal{O}(n \log n)$ complexity.
3. **Insertion Sort for Small Partitions**:
   - For very small subarrays (typically of size $< 16$), the overhead of recursive Quicksort or Heap management is higher than the simple comparisons of Insertion Sort. Hence, Introsort switches to Insertion Sort for small partitions.

---

### Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $\mathcal{O}(n \log n)$ — When Quicksort divides partitions evenly.
  - **Average Case**: $\mathcal{O}(n \log n)$ — Excellent average performance due to Quicksort.
  - **Worst Case**: $\mathcal{O}(n \log n)$ — Guaranteed worst-case limit by switching to Heapsort, preventing $\mathcal{O}(n^2)$ degradation.
- **Space Complexity**: $\mathcal{O}(\log n)$ — Storing recursive calls on the stack during the quicksort phase.

---

### Implementations

Here are the complete implementations of Introsort in C++, Java, and Python:

#### C++ Implementation
```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

// Insertion Sort for small subarrays
void insertionSort(vector<int>& arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Partition helper function for Quicksort
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Introsort core recursion
void introSortUtil(vector<int>& arr, int low, int high, int depthLimit) {
    int size = high - low + 1;

    // Use Insertion Sort for small partitions
    if (size < 16) {
        insertionSort(arr, low, high);
        return;
    }

    // Switch to Heapsort if recursion depth limit is exceeded
    if (depthLimit == 0) {
        make_heap(arr.begin() + low, arr.begin() + high + 1);
        sort_heap(arr.begin() + low, arr.begin() + high + 1);
        return;
    }

    // Otherwise, perform Quicksort partitioning
    int p = partition(arr, low, high);
    introSortUtil(arr, low, p - 1, depthLimit - 1);
    introSortUtil(arr, p + 1, high, depthLimit - 1);
}

// Main Introsort function
void introSort(vector<int>& arr) {
    if (arr.empty()) return;
    int depthLimit = 2 * log2(arr.size());
    introSortUtil(arr, 0, arr.size() - 1, depthLimit);
}

int main() {
    vector<int> arr = {34, 10, 56, 12, 5, 89, 23, 7, 90, 45, 1, 9, 13, 16, 50, 44, 2};
    
    introSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    return 0;
}
```

#### Python Implementation
```python
import math

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def heapify(arr, n, i, offset):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[offset + left] > arr[offset + largest]:
        largest = left
    if right < n and arr[offset + right] > arr[offset + largest]:
        largest = right

    if largest != i:
        arr[offset + i], arr[offset + largest] = arr[offset + largest], arr[offset + i]
        heapify(arr, n, largest, offset)

def heap_sort(arr, left, right):
    n = right - left + 1
    # Build heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i, left)
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[left], arr[left + i] = arr[left + i], arr[left]
        heapify(arr, i, 0, left)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def introsort_util(arr, low, high, depth_limit):
    size = high - low + 1

    if size < 16:
        insertion_sort(arr, low, high)
        return

    if depth_limit == 0:
        heap_sort(arr, low, high)
        return

    p = partition(arr, low, high)
    introsort_util(arr, low, p - 1, depth_limit - 1)
    introsort_util(arr, p + 1, high, depth_limit - 1)

def introsort(arr):
    if not arr:
        return
    depth_limit = 2 * math.floor(math.log2(len(arr)))
    introsort_util(arr, 0, len(arr) - 1, depth_limit)

if __name__ == "__main__":
    arr = [34, 10, 56, 12, 5, 89, 23, 7, 90, 45, 1, 9, 13, 16, 50, 44, 2]
    introsort(arr)
    print("Sorted array:", arr)
```

#### Java Implementation
```java
import java.util.Arrays;

public class IntroSort {
    private static final int INSERTION_THRESHOLD = 16;

    public static void introSort(int[] arr) {
        if (arr == null || arr.length == 0) return;
        int depthLimit = 2 * (int) (Math.log(arr.length) / Math.log(2));
        introSortUtil(arr, 0, arr.length - 1, depthLimit);
    }

    private static void introSortUtil(int[] arr, int low, int high, int depthLimit) {
        int size = high - low + 1;

        if (size < INSERTION_THRESHOLD) {
            insertionSort(arr, low, high);
            return;
        }

        if (depthLimit == 0) {
            heapSort(arr, low, high);
            return;
        }

        int p = partition(arr, low, high);
        introSortUtil(arr, low, p - 1, depthLimit - 1);
        introSortUtil(arr, p + 1, high, depthLimit - 1);
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
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

    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    private static void heapSort(int[] arr, int left, int right) {
        int n = right - left + 1;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, left);
        }
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[left];
            arr[left] = arr[left + i];
            arr[left + i] = temp;
            heapify(arr, i, 0, left);
        }
    }

    private static void heapify(int[] arr, int n, int i, int offset) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && arr[offset + l] > arr[offset + largest]) {
            largest = l;
        }
        if (r < n && arr[offset + r] > arr[offset + largest]) {
            largest = r;
        }

        if (largest != i) {
            int swap = arr[offset + i];
            arr[offset + i] = arr[offset + largest];
            arr[offset + largest] = swap;
            heapify(arr, n, largest, offset);
        }
    }

    public static void main(String[] args) {
        int[] arr = {34, 10, 56, 12, 5, 89, 23, 7, 90, 45, 1, 9, 13, 16, 50, 44, 2};
        introSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
```

---

### Complexity Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Introsort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(\log n)$ |
| **Heapsort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ |
| **Quicksort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ |
| **Insertion Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ |
