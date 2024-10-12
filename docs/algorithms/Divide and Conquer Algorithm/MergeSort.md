---

id: merge-sort-algo  
sidebar_position: 1
title: Merge Sort  
sidebar_label: Merge Sort  

---

### Definition:

**Divide and Conquer Algorithm**
The divide and conquer algorithm is a fundamental algorithmic paradigm that involves solving a problem by breaking it down into smaller subproblems, solving each subproblem independently, and then combining the results to solve the original problem. This approach is often used for various types of problems, including sorting, searching, and computational geometry.
Steps of Divide and Conquer:
Divide: Split the problem into smaller, manageable subproblems. This often involves dividing the input data into two or more parts.

Conquer: Solve the subproblems recursively. If the subproblems are small enough, solve them directly instead of dividing them further.

Combine: Merge the results of the subproblems to form the solution to the original problem.

**Merge Sort** is a classic sorting algorithm that follows the divide and conquer paradigm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves back into a single sorted array. Merge Sort is efficient for large datasets and is widely used due to its predictable time complexity.

### Characteristics:

- **Divide and Conquer**:
  - Merge Sort works by recursively dividing the array into two halves until each half contains a single element (or is empty), which is inherently sorted.

- **Stable**:
  - Merge Sort preserves the relative order of equal elements, making it a stable sorting algorithm.

- **Not In-Place**:
  - Merge Sort requires additional space for the temporary arrays used during the merge process, making it not an in-place sorting algorithm.

### Time Complexity:

- **Best Case: O(n log n)**  
  The best case occurs when the array is already sorted, but the algorithm still goes through all levels of recursion.

- **Average Case: O(n log n)**  
  The average-case time complexity is also O(n log n), as the array is always divided in half.

- **Worst Case: O(n log n)**  
The worst-case scenario is the same as the average case, making it efficient for all cases.

### Space Complexity:

- **Space Complexity: O(n)**  
Merge Sort requires additional space proportional to the size of the input array for merging purposes.

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

// Function to merge two halves
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;  // Size of left half
    int n2 = right - mid;     // Size of right half

    // Create temporary arrays
    int* L = new int[n1];
    int* R = new int[n2];

    // Copy data to temporary arrays L[] and R[]
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays back into arr[left..right]
    int i = 0; // Initial index of first sub-array
    int j = 0; // Initial index of second sub-array
    int k = left; // Initial index of merged sub-array
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

    // Copy remaining elements of L[] if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy remaining elements of R[] if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    // Deallocate memory
    delete[] L;
    delete[] R;
}

// Function to implement Merge Sort
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2; // To prevent overflow

        // Recursively sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

// Driver code
int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int arr_size = sizeof(arr) / sizeof(arr[0]);

    cout << "Unsorted array: ";
    for (int i = 0; i < arr_size; i++)
        cout << arr[i] << " ";
    cout << endl;

    mergeSort(arr, 0, arr_size - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < arr_size; i++)
        cout << arr[i] << " ";
    cout << endl;

    return 0;
}
```

### Explanation of the Code:

1. **Merge Function**: 
   - This function merges two halves of the array. It creates temporary arrays for both halves, copies data from the original array to these temporary arrays, and then merges them back in sorted order.

2. **Merge Sort Function**:
   - The `mergeSort` function recursively divides the array into halves until each half has one element. It then calls the merge function to combine these halves back together in sorted order.

3. **Driver Code**:
   - The `main` function initializes an array, prints it, calls the `mergeSort` function, and finally prints the sorted array.

### Summary:

Merge Sort is a reliable and efficient sorting algorithm that uses the divide and conquer technique to sort elements in an array. With a time complexity of \(O(n \log n)\), it is suitable for large datasets and is widely used in practice. Its stability and predictable performance make it a preferred choice for many applications.

