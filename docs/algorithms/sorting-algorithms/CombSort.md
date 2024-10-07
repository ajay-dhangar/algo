---

id: comb-sort-algo  
sidebar_position: 10  
title: Comb Sort  
sidebar_label: Comb Sort  

---

### Definition:

Comb sort is an improvement over bubble sort. It compares elements that are farther apart initially, decreasing the gap between elements in subsequent iterations. The idea is to eliminate "turtles" (small values near the end of the list) early in the sorting process, which slows down bubble sort.

### Characteristics:

- **Gap Decrease**:
  - Comb sort starts by comparing elements that are far apart, reducing the gap by a shrinking factor (usually 1.3) after each pass until the gap becomes 1, at which point it behaves like bubble sort.

- **In-Place Sorting**:
  - Like bubble sort, comb sort is an in-place sorting algorithm, meaning it requires no extra memory aside from the input array.

- **Unstable**:
  - Comb sort is an unstable sorting algorithm, meaning that equal elements may not retain their relative order.

- **Improvement over Bubble Sort**:
  - By addressing "turtles" early, comb sort can improve upon the O(n²) performance of bubble sort, making it faster for larger datasets.

### Time Complexity:

- **Best Case: O(n log n)**  
  In the best case, where the array is already nearly sorted, comb sort runs in O(n log n) time due to the logarithmic reduction of the gap size.

- **Average Case: O(n²/2ᵏ)**  
  The average case is better than bubble sort, though the exact complexity depends on the shrink factor used.

- **Worst Case: O(n²)**  
  In the worst case, comb sort behaves similarly to bubble sort, with a time complexity of O(n²), though it performs faster in practice.

### Space Complexity:

- **Space Complexity: O(1)**  
  Comb sort is an in-place sorting algorithm, requiring only a constant amount of additional memory.

### C++ Implementation:

```cpp
#include <iostream>
using namespace std;

// Function to find the next gap
int getNextGap(int gap) {
    // Shrink gap by the shrink factor (typically 1.3)
    gap = (gap * 10) / 13;
    if (gap < 1) return 1;
    return gap;
}

// Function to perform comb sort
void combSort(int arr[], int size) {
    // Initialize gap
    int gap = size;

    // Initialize swapped as true to ensure that the process continues
    bool swapped = true;

    // Keep running until the gap reduces to 1 and no more swaps occur
    while (gap != 1 || swapped) {
        // Find the next gap
        gap = getNextGap(gap);

        // Initialize swapped as false so that we can check if a swap happened
        swapped = false;

        // Compare all elements with current gap
        for (int i = 0; i < size - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                // Swap arr[i] and arr[i + gap]
                int temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;

                // Set swapped to true to indicate that a swap occurred
                swapped = true;
            }
        }
    }
}

int main() {
    int arr[] = {8, 4, 1, 56, 3, -44, 23, -6, 28, 0};
    int size = sizeof(arr) / sizeof(arr[0]);

    combSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Comb sort is an efficient improvement over bubble sort, with a time complexity that typically performs better on larger datasets. By comparing elements that are far apart and gradually reducing the gap size, it can handle "turtles" (small elements at the end) early in the process. While it has a worst-case time complexity of O(n²), its practical performance is much better, often approaching O(n log n). It's simple to implement, in-place, and better suited for real-world use than bubble sort.
