---
id: arrays-cyclic-sort
title: "Arrays - Cyclic Sort"
sidebar_label: Cyclic Sort
description: "Cyclic Sort is an $O(n)$ in-place sorting algorithm specifically designed for arrays containing numbers in a given continuous range (e.g., 1 to N)."
tags: [dsa, arrays, sorting, cyclicsort, sorting-algorithms]
---

*Cyclic Sort* is a highly specialized, in-place sorting algorithm that achieves an incredible $O(n)$ time complexity. It is used exclusively when the elements of an array belong to a specific continuous range, such as $1$ to $N$ (where $N$ is the size of the array).

## How Cyclic Sort Works
Because the numbers are strictly bounded from $1$ to $N$, we inherently know the exact correct index for every number. The number `1` belongs at index `0`, the number `2` belongs at index `1`, and the number `k` belongs at index `k-1`.

1. **Check Current Element:** Look at the number at the current index `i`.
2. **Determine Correct Index:** Calculate where this number *should* be (`correct_index = arr[i] - 1`).
3. **Swap or Move:** - If the number is not at its correct index, swap it with the number currently sitting at `correct_index`.
   - If the number is already at its correct index (or if it's out of bounds/a duplicate), simply move to the next index (`i++`).

## Key Characteristics
- **Time Complexity**: 
  - *Best Case:* $O(n)$ 
  - *Average Case:* $O(n)$
  - *Worst Case:* $O(n)$ (Even with the while loop, each element is swapped at most once, strictly bounding operations to $2n$).
- **Space Complexity**: $O(1)$ (In-place sorting)

## C++ Implementation (1 to N range)

```cpp
#include <iostream>
#include <vector>

using namespace std;

void cyclicSort(vector<int>& arr) {
    int i = 0;
    int n = arr.size();
    
    while (i < n) {
        // The correct index for arr[i] should be arr[i] - 1
        int correct_index = arr[i] - 1;
        
        // If the number is in range and not currently at its correct index, swap them
        if (arr[i] > 0 && arr[i] <= n && arr[i] != arr[correct_index]) {
            swap(arr[i], arr[correct_index]);
        } 
        // Otherwise, move to the next element
        else {
            i++;
        }
    }
}

int main() {
    // Array containing numbers from 1 to 5, scrambled
    vector<int> arr = {3, 5, 2, 1, 4};
    
    cyclicSort(arr);

    cout << "Sorted array is: ";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```