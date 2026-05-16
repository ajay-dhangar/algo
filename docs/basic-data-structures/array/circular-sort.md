---
id: arrays-circularsort
title: "Arrays - Circular Sort"
sidebar_label: 🟢 Circular Sort
description: "Circular Sort (often called Cycle Sort) is an in-place sorting algorithm that minimizes memory writes by placing elements in their exact positions."
tags: [dsa, arrays, sorting, circularsort, sorting-algorithms]
---

*Circular Sort* is a highly efficient, in place sorting algorithm. It works by placing each element directly into its correct sorted position.

## How Circular Sort Works:
1. **Identify the Cycle**: Start with the first element and count how many elements are smaller than it to find its correct position.
2. **Place and Displace**: Put the element in its correct position. The element that was previously there is now displaced.
3. **Complete the Cycle**: Take the displaced element and find *its* correct position. Repeat this until an element is placed back at the starting index, completing the cycle.
4. **Iterate**: Move to the next index and repeat the process for any elements not yet sorted.

## Key Characteristics
- **Time Complexity**: 
  - *Best Case:* $O(n^2)$ 
  - *Average Case:* $O(n^2)$
  - *Worst Case:* $O(n^2)$
- **Space Complexity**: $O(1)$
- **Memory Writes**: $O(n)$

## C++ Implementation

```cpp
#include <iostream>
#include <vector>

using namespace std;

void circularSort(vector<int>& arr) {
    int n = arr.size();

    // Traverse through the array to find cycles to rotate
    for (int cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
        int item = arr[cycle_start];

        // Find the position where we put the element
        int pos = cycle_start;
        for (int i = cycle_start + 1; i < n; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        // If the item is already in the correct position
        if (pos == cycle_start) {
            continue;
        }

        // Ignore duplicate elements
        while (item == arr[pos]) {
            pos++;
        }

        // Put the item into its right position
        if (pos != cycle_start) {
            swap(item, arr[pos]);
        }

        // Rotate the rest of the cycle
        while (pos != cycle_start) {
            pos = cycle_start;

            // Find where to put the next item
            for (int i = cycle_start + 1; i < n; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            // Ignore duplicate elements
            while (item == arr[pos]) {
                pos++;
            }

            // Put the item into its right position
            if (item != arr[pos]) {
                swap(item, arr[pos]);
            }
        }
    }
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    circularSort(arr);
    cout << "Sorted array is: ";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}
```
