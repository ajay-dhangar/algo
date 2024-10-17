---

id: quick-sort-algo  
sidebar_position: 2
title: Quick Sort  
sidebar_label: Quick Sort  

---

### Definition:

**Quick Sort** is a highly efficient sorting algorithm that follows the divide and conquer approach. It selects a pivot element, partitions the array around the pivot, and recursively sorts the subarrays. Quick Sort is widely used for its average-case time complexity of \(O(n \log n)\), though it has a worst-case time complexity of \(O(n^2)\).

### Characteristics:

- **Divide**:
  - Quick Sort selects a pivot element and partitions the array into two subarrays: elements less than the pivot and elements greater than the pivot.

- **Conquer**:
  - Recursively apply the Quick Sort algorithm to the subarrays formed from the partitioning step.

- **Combine**:
  - The array is sorted once all subarrays are sorted, as the partitioning step rearranges elements in place.

- **In-Place**:
  - Quick Sort is an in-place sorting algorithm, requiring only a small, constant amount of additional memory for the partitioning and recursive calls.

- **Unstable**:
  - Quick Sort is not a stable sorting algorithm, meaning that equal elements may not retain their original relative order after sorting.

### Time Complexity:

- **Best Case: O(n log n)**  
  Occurs when the pivot divides the array into two equal halves, leading to logarithmic depth and linear work at each level.

- **Average Case: O(n log n)**  
  On average, the pivot divides the array into reasonably balanced subarrays, resulting in \(O(n \log n)\) time complexity.

- **Worst Case: O(n²)**  
  Happens when the pivot repeatedly divides the array into unbalanced partitions, such as when the array is already sorted and the pivot is chosen as the first or last element.

### Space Complexity:

- **Space Complexity: O(log n)**  
  Quick Sort is in-place, but the recursion depth can add up to \(O(log n)\) space for balanced partitions. In the worst case (unbalanced partitions), the recursion stack can grow to \(O(n)\).

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

// Function to partition the array around the pivot
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // Choosing the last element as the pivot
    int i = low - 1;  // Index of the smaller element

    for (int j = low; j < high; j++) {
        // If the current element is less than or equal to the pivot
        if (arr[j] <= pivot) {
            i++;  // Increment index of smaller element
            swap(arr[i], arr[j]);  // Swap elements
        }
    }
    swap(arr[i + 1], arr[high]);  // Swap the pivot element with the element at i+1
    return (i + 1);  // Return the partitioning index
}

// Function to implement Quick Sort
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);  // Partitioning index

        // Recursively sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Driver code
int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "Unsorted array: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;

    quickSort(arr, 0, n - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;

    return 0;
}
```

### Explanation of the Code:

1. **Partition Function**:
   - The `partition` function chooses the last element as the pivot and arranges the elements in such a way that all elements less than the pivot are on the left and all elements greater than the pivot are on the right. It returns the index of the pivot after partitioning.

2. **Quick Sort Function**:
   - The `quickSort` function calls itself recursively for the left and right subarrays created by the partitioning process.

3. **Driver Code**:
   - The `main` function initializes an array, prints it, calls the `quickSort` function, and finally prints the sorted array.

### Summary:

Quick Sort is an efficient sorting algorithm that utilizes the divide and conquer strategy to sort an array. With an average-case time complexity of \(O(n \log n)\), it is highly effective for large datasets. Its in-place nature and relatively low memory overhead make it a popular choice in practical applications, despite its potential worst-case performance of \(O(n^2)\). 

