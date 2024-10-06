---

id: cycle-sort-algo  
sidebar_position: 12  
title: Cycle Sort  
sidebar_label: Cycle Sort  

---

### Definition:

Cycle sort is a comparison-based, in-place sorting algorithm known for its optimal writes, making it one of the most efficient sorting algorithms in terms of the number of memory writes. It is designed to minimize the number of element movements, and each element is moved to its correct position as part of a cycle, hence the name.

### Characteristics:

- **Minimizes Writes**:
  - Cycle sort is designed to minimize the number of memory writes. In fact, it performs the minimum possible number of writes to sort the array, making it ideal for scenarios where write operations are costly (e.g., memory-limited devices or flash storage).

- **In-Place Sorting**:
  - The algorithm sorts the array in place, requiring no additional memory beyond the input array.

- **Unstable**:
  - Cycle sort is an unstable sorting algorithm because it may change the relative order of equal elements during the rearrangement.

- **Efficient in Write-Heavy Environments**:
  - While not the most efficient in terms of time complexity, its ability to minimize write operations makes it useful in environments where writing to memory is expensive.

### Time Complexity:

- **Best Case: O(n²)**  
  Even in the best case, cycle sort has a time complexity of O(n²), as it requires traversing each cycle of elements in the array.

- **Average Case: O(n²)**  
  On average, cycle sort performs a quadratic number of comparisons and swaps, making it inefficient for large datasets.

- **Worst Case: O(n²)**  
  In the worst case, the time complexity remains O(n²), similar to algorithms like selection sort and bubble sort.

### Space Complexity:

- **Space Complexity: O(1)**  
  Cycle sort is an in-place algorithm, requiring no additional memory besides the input array.

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

// Function to perform cycle sort
void cycleSort(int arr[], int size) {
    for (int cycle_start = 0; cycle_start <= size - 2; cycle_start++) {
        int item = arr[cycle_start];
        int pos = cycle_start;

        // Find position where we put the element
        for (int i = cycle_start + 1; i < size; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        // If the item is already in the correct position
        if (pos == cycle_start) {
            continue;
        }

        // Skip duplicates
        while (item == arr[pos]) {
            pos++;
        }

        // Put the item in its correct position
        if (pos != cycle_start) {
            swap(item, arr[pos]);
        }

        // Rotate the rest of the cycle
        while (pos != cycle_start) {
            pos = cycle_start;

            // Find the position where we put the element
            for (int i = cycle_start + 1; i < size; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            // Skip duplicates
            while (item == arr[pos]) {
                pos++;
            }

            // Put the item in its correct position
            if (item != arr[pos]) {
                swap(item, arr[pos]);
            }
        }
    }
}

int main() {
    int arr[] = {20, 40, 50, 10, 30};
    int size = sizeof(arr) / sizeof(arr[0]);

    cycleSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Explanation:

1. **Cycle Detection**:
   - Cycle sort detects cycles in the permutation of elements. Each cycle is traversed, and the element is placed in its correct position, ensuring that elements are only written when necessary.

2. **Efficient Memory Writes**:
   - The key feature of cycle sort is its minimal memory writes. Each element is moved to its correct position only once in each cycle, which can reduce the total number of writes significantly.

3. **Skipping Duplicates**:
   - The algorithm handles duplicates by skipping over them when placing elements in their correct positions, ensuring that duplicate elements are sorted correctly without unnecessary swaps.

### Summary:

Cycle sort is unique in its ability to minimize the number of write operations, making it one of the most efficient algorithms in terms of memory writes. However, due to its quadratic time complexity, it is not suitable for large datasets in general-purpose sorting. Its primary use case is in environments where minimizing writes is critical, such as memory-limited systems or scenarios involving non-volatile memory. While it offers optimal performance in terms of writes, it has similar time complexity to simpler algorithms like selection sort and is best used when minimizing write operations is more important than optimizing time complexity.
