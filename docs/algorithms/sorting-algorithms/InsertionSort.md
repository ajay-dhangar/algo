---

id: insertion-sort-algo  
sidebar_position: 3 
title: Insertion Sort  
sidebar_label: Insertion Sort  

---

### Definition:

Insertion sort is a simple and efficient comparison-based sorting algorithm that builds the final sorted array one element at a time. It works similarly to how people sort playing cards in their hands. The algorithm starts with one element and repeatedly inserts the next element into its correct position within the already sorted portion of the array.

### Characteristics:

- **In-Place Sorting**:
  - Insertion sort sorts the array in place, meaning it does not require extra memory for another array, making it an in-place algorithm.

- **Stable**:
  - It maintains the relative order of elements with equal values, making it a stable sorting algorithm.

- **Efficient for Small Datasets**:
  - Insertion sort is efficient for small datasets or nearly sorted datasets. It performs well in scenarios where the list is already partially sorted.

- **Online Algorithm**:
  - Insertion sort is an online algorithm, meaning it can sort a list as it receives elements one by one.

### Time Complexity:

- **Best Case: O(n)**  
  The best case occurs when the array is already sorted, so the algorithm only needs to iterate through the list once without making any swaps or shifts.

- **Average Case: O(n²)**  
  On average, insertion sort must make n/2 comparisons and shifts for each element, leading to a quadratic time complexity.

- **Worst Case: O(n²)**  
  The worst-case scenario occurs when the array is sorted in reverse order, requiring the algorithm to make the maximum number of comparisons and shifts.

### Space Complexity:

- **Space Complexity: O(1)**  
  Insertion sort is an in-place algorithm that requires a constant amount of extra memory for variables such as the current element being inserted.

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
using namespace std;

void insertionSortIterative(int arr[], int size) {
    for (int i = 1; i < size; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key; // Insert the key into its correct position
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int size = sizeof(arr) / sizeof(arr[0]);

    insertionSortIterative(arr, size);

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

void insertionSortRecursive(int arr[], int size) {
    // Base case: If the array is of size 1, it's already sorted
    if (size <= 1) {
        return;
    }

    // Sort the first n-1 elements
    insertionSortRecursive(arr, size - 1);

    // Insert the last element at its correct position
    int key = arr[size - 1];
    int j = size - 2;

    // Move elements of arr[0..size-2] that are greater than key
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key; // Insert the key into its correct position
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int size = sizeof(arr) / sizeof(arr[0]);

    insertionSortRecursive(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Insertion sort is a simple yet efficient algorithm for small or nearly sorted datasets. It works by building a sorted array one element at a time, inserting each element into its correct position. Although it has a quadratic time complexity for average and worst-case scenarios, its linear time complexity in the best case makes it advantageous for sorting small datasets or datasets that are already nearly sorted. The iterative version is more common and easier to understand, while the recursive version provides a more elegant solution at the cost of slightly more overhead.
