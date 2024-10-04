---

id: merge-sort-algo  
sidebar_position: 4  
title: Merge Sort  
sidebar_label: Merge Sort  

---

### Definition:

Merge sort is a **divide-and-conquer** sorting algorithm that splits the array into smaller subarrays, sorts them, and then merges them back together in the correct order. It is a stable and comparison-based algorithm, which ensures that equal elements maintain their original relative positions.

### Characteristics:

- **Divide and Conquer**:
  - Merge sort works by dividing the array into two halves, sorting each half, and then merging them back together in sorted order. This process is repeated recursively.

- **Stable**:
  - Merge sort is a stable sorting algorithm, meaning it maintains the relative order of equal elements.

- **External Sorting**:
  - Merge sort can be used to sort large datasets that do not fit into memory (external sorting) because it works well with data on disk or in streams.

- **Requires Additional Space**:
  - Unlike in-place sorting algorithms, merge sort requires additional memory to store the subarrays during the merging process.

### Time Complexity:

- **Best Case: O(n log n)**  
  Even in the best case (when the array is already sorted), merge sort divides the array into smaller parts and performs a merging process, resulting in a time complexity of O(n log n).

- **Average Case: O(n log n)**  
  On average, merge sort consistently divides the array and performs merging, leading to a time complexity of O(n log n).

- **Worst Case: O(n log n)**  
  In the worst case (reverse-sorted array), merge sort must still divide and merge the array in logarithmic time with n comparisons.

### Space Complexity:

- **Space Complexity: O(n)**  
  Merge sort requires additional space to store the temporary subarrays created during the merging process. This leads to a space complexity of O(n) due to the auxiliary arrays used for merging.

### C++ Implementation:

**Iterative (Bottom-Up) Approach**
```cpp
#include <iostream>
using namespace std;

// Merge function to merge two halves
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int L[n1], R[n2];

    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays back into arr[left..right]
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Iterative merge sort function
void mergeSortIterative(int arr[], int size) {
    for (int curr_size = 1; curr_size <= size - 1; curr_size = 2 * curr_size) {
        for (int left = 0; left < size - 1; left += 2 * curr_size) {
            int mid = min(left + curr_size - 1, size - 1);
            int right = min(left + 2 * curr_size - 1, size - 1);
            merge(arr, left, mid, right);
        }
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int size = sizeof(arr) / sizeof(arr[0]);

    mergeSortIterative(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

**Recursive Approach**
```cpp
#include <iostream>
using namespace std;

// Merge function to merge two halves
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int L[n1], R[n2];

    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays back into arr[left..right]
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Recursive merge sort function
void mergeSortRecursive(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSortRecursive(arr, left, mid);
        mergeSortRecursive(arr, mid + 1, right);

        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int size = sizeof(arr) / sizeof(arr[0]);

    mergeSortRecursive(arr, 0, size - 1);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Merge sort is an efficient and reliable sorting algorithm, particularly for large datasets. It works by recursively dividing the array into smaller subarrays and merging them in the correct order. Despite its additional space complexity, its consistent time complexity of O(n log n) makes it a popular choice for sorting algorithms. The recursive approach is more intuitive, but the iterative version can be useful in cases where recursion depth could be a concern.
