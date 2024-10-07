---

id: tim-sort-algo  
sidebar_position: 11  
title: Tim Sort  
sidebar_label: Tim Sort  

---

### Definition:

Tim Sort is a hybrid, stable sorting algorithm derived from merge sort and insertion sort. It is designed to perform well on real-world data, which often contains certain order. The algorithm splits the array into small pieces (called "runs"), sorts each run using insertion sort, and then merges the runs using a merge sort technique. It is the default sorting algorithm in Python and Java's standard libraries.

### Characteristics:

- **Hybrid Sorting**:
  - Combines the simplicity and efficiency of insertion sort for small datasets and the power of merge sort for larger datasets.

- **Adaptive**:
  - Tim Sort takes advantage of existing order in the dataset, making it highly efficient for partially sorted data.

- **Stable**:
  - Tim Sort preserves the relative order of elements with equal values, making it a stable sorting algorithm.

- **Efficient for Real-World Data**:
  - Designed to work well on real-world data sets, which often contain sequences of ordered elements, and thus performs better than many traditional algorithms in practice.

### Time Complexity:

- **Best Case: O(n)**  
  In the best-case scenario, if the array is already nearly sorted, Tim Sort can achieve linear time complexity by taking advantage of the order in the data.

- **Average Case: O(n log n)**  
  On average, Tim Sort performs merges in logarithmic time while the insertion sort handles small runs, resulting in O(n log n) time complexity.

- **Worst Case: O(n log n)**  
  Even in the worst case, where the array is entirely unsorted, Tim Sort maintains an O(n log n) time complexity due to its use of merge sort for larger portions of the data.

### Space Complexity:

- **Space Complexity: O(n)**  
  Tim Sort requires O(n) additional space for the merging process, which is similar to merge sort.

### Steps in Tim Sort:

1. **Divide the Array into Runs**:
   - Tim Sort splits the array into small pieces or subarrays called "runs." The length of these runs is usually determined by the size of the input and a predefined minimum run size.
   
2. **Sort Each Run Using Insertion Sort**:
   - Each small run is sorted using insertion sort, which is efficient for small datasets due to its low overhead.

3. **Merge the Sorted Runs Using Merge Sort**:
   - Once the runs are sorted, Tim Sort merges them using the same technique as merge sort, ensuring that the entire array is sorted efficiently.

### Minimum Run Size:

Tim Sort selects a "minimum run size," which is typically a power of two or based on heuristics that balance the performance of the insertion sort and merge operations. Common implementations, like Python, use 32 or 64 as the minimum run size.

### C++ Implementation:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

const int RUN = 32;

// Insertion sort function to sort an array from left to right
void insertionSort(int arr[], int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int temp = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

// Merge function to merge two sorted subarrays
void merge(int arr[], int l, int m, int r) {
    int len1 = m - l + 1, len2 = r - m;
    vector<int> left(len1), right(len2);

    for (int i = 0; i < len1; i++) {
        left[i] = arr[l + i];
    }
    for (int i = 0; i < len2; i++) {
        right[i] = arr[m + 1 + i];
    }

    int i = 0, j = 0, k = l;
    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }

    while (i < len1) {
        arr[k++] = left[i++];
    }
    while (j < len2) {
        arr[k++] = right[j++];
    }
}

// Tim sort function
void timSort(int arr[], int n) {
    for (int i = 0; i < n; i += RUN) {
        insertionSort(arr, i, min(i + RUN - 1, n - 1));
    }

    for (int size = RUN; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = min(left + size - 1, n - 1);
            int right = min(left + 2 * size - 1, n - 1);

            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
}

int main() {
    int arr[] = {5, 21, 7, 23, 19};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    timSort(arr, n);

    cout << "Sorted array: \n";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Explanation:

1. **Insertion Sort for Small Runs**:
   - The array is broken into smaller chunks called "runs," and insertion sort is applied to each run. Insertion sort is highly efficient for small, nearly sorted arrays.

2. **Merge Process**:
   - Once the runs are sorted, the algorithm merges them using a process similar to merge sort. The merging happens in logarithmic time, ensuring that the overall time complexity remains O(n log n).

3. **Adaptive Behavior**:
   - Tim Sort adapts to existing order in the data, using insertion sort for smaller runs and merge sort for the rest. This allows it to perform very efficiently on real-world data.

### Summary:

Tim Sort is a highly efficient sorting algorithm used in practical applications, particularly in standard libraries like Python and Java. It combines the best aspects of merge sort and insertion sort, making it adaptive, stable, and well-suited for sorting real-world datasets with existing order. Although its worst-case time complexity is O(n log n), its ability to adapt to partially sorted data often gives it a performance edge in practice.
