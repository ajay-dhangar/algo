---

id: bubble-sort-algo  
sidebar_position: 1  
title: Bubble Sort  
sidebar_label: Bubble Sort  

---

### Definition:

Bubble sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until the list is sorted.

### Characteristics:

- **Repeated Comparison**:
  - The algorithm compares each pair of adjacent elements and swaps them if they are out of order. It continues until no more swaps are needed.

- **In-Place Sorting**:
  - Bubble sort operates directly on the input array and does not require extra space, making it an in-place sorting algorithm.

- **Stable**:
  - Since the algorithm only swaps elements when necessary, the relative order of elements with equal values remains the same, making bubble sort a stable algorithm.

- **Simple Implementation**:
  - Bubble sort is easy to implement but not very efficient for large datasets. It's mainly used for educational purposes.

### Time Complexity:

- **Best Case: O(n)**  
  In the best-case scenario, where the array is already sorted, bubble sort only makes a single pass through the array without making any swaps.

- **Average Case: O(n²)**  
  On average, bubble sort compares and swaps elements multiple times, leading to quadratic time complexity.

- **Worst Case: O(n²)**  
  In the worst-case scenario, where the array is sorted in reverse order, the algorithm must compare and swap every element, making n-1 comparisons and swaps in each pass.

### Space Complexity:

- **Space Complexity: O(1)**  
  Bubble sort is an in-place algorithm, meaning it requires only a constant amount of extra memory, regardless of the input size.

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
using namespace std;

void bubbleSortIterative(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        bool swapped = false; // To check if any swap happened in the current iteration
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // If no swap occurred, the array is already sorted
        if (!swapped) {
            break;
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int size = sizeof(arr) / sizeof(arr[0]);

    bubbleSortIterative(arr, size);

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

void bubbleSortRecursive(int arr[], int size) {
    // Base case: If the array is of size 1, it's already sorted
    if (size == 1) {
        return;
    }

    // Perform one pass of bubble sort
    for (int i = 0; i < size - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            // Swap arr[i] and arr[i + 1]
            int temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }

    // Recursively sort the remaining array
    bubbleSortRecursive(arr, size - 1);
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int size = sizeof(arr) / sizeof(arr[0]);

    bubbleSortRecursive(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Bubble sort is one of the simplest sorting algorithms. While it is inefficient for large datasets due to its O(n²) time complexity, it provides an easy-to-understand introduction to sorting. Both the iterative and recursive versions of bubble sort are straightforward to implement, with the iterative version being more commonly used due to its simplicity.
