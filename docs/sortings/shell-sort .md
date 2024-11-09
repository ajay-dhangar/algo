---
id: shell-sort  
title: Shell Sort  
sidebar_label: Shell Sort  
description: "Learn about Shell Sort, an in-place comparison-based sorting algorithm that generalizes insertion sort to allow the exchange of items that are far apart."
tags: [dsa, algorithms, sorting]
---

<Ads />

Shell Sort is an in-place comparison-based sorting algorithm that generalizes insertion sort to allow the exchange of items that are far apart. It works by initially sorting elements far apart from each other and progressively reducing the gap between elements to be compared. This approach helps to move elements more efficiently compared to a simple insertion sort.

### Characteristics:
- **In-Place Sorting**:  
  Shell Sort does not require any extra space for sorting, making it an in-place algorithm.

- **Adaptive**:  
  Shell Sort's efficiency improves based on the gap sequence used. A better gap sequence results in better performance.

- **Improvement over Insertion Sort**:  
  By allowing elements far apart to be compared and swapped, Shell Sort reduces the number of shifts required, thus improving on the basic insertion sort, especially for larger datasets.

### Steps Involved:
1. **Choose a Gap Sequence**:  
   Select a sequence of gap values. The choice of gap sequence can greatly influence the algorithm's performance.

2. **Compare and Swap Elements**:  
   Starting with the largest gap, compare elements that are `gap` positions apart and swap them if necessary. This step is similar to insertion sort but with a larger gap between compared elements.

3. **Reduce the Gap**:  
   After the initial pass, reduce the gap and repeat the process until the gap is reduced to 1, at which point the algorithm performs a final insertion sort.

4. **Final Insertion Sort**:  
   When the gap becomes 1, the algorithm essentially performs an insertion sort, with the list nearly sorted from the previous passes.

<Ads />

### Time Complexity:
- **Best Case**: $O(n \log n)$, depending on the gap sequence.
- **Average Case**: $O(n^{3/2})$ or $O(n \log^2 n)$, depending on the gap sequence used.
- **Worst Case**: $O(n^2)$, using the original gap sequence.

### Space Complexity:
- **Space Complexity: $O(1)$**  
  Shell Sort is an in-place algorithm, requiring only a constant amount of extra space.

### Example:
Consider the following array of integers:  
`[5, 2, 9, 1, 5, 6]`

Step-by-step execution with gap sequence `[3, 1]`:

1. **First Pass (Gap = 3)**:
   - Compare elements 3 positions apart: `5` and `1`, `2` and `5`, `9` and `6`.
   - Array after first pass: `[1, 2, 5, 5, 9, 6]`.

2. **Second Pass (Gap = 1)**:
   - Perform an insertion sort with a gap of 1: Compare `5` and `5`, `9` and `6`.
   - Array after second pass: `[1, 2, 5, 5, 6, 9]`.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>

using namespace std;

// Function to perform shell sort
void shellSort(vector<int>& arr) {
    int n = arr.size();

    // Start with a large gap, and reduce the gap
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Perform a gapped insertion sort
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}

int main() {
    vector<int> arr = {5, 2, 9, 1, 5, 6};
    shellSort(arr);

    cout << "Sorted array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

### Java

```java
import java.util.*;

public class ShellSort {

    // Function to perform shell sort
    public static void shellSort(int[] arr) {
        int n = arr.length;

        // Start with a large gap, and reduce the gap
        for (int gap = n / 2; gap > 0; gap /= 2) {
            // Perform a gapped insertion sort
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {5, 2, 9, 1, 5, 6};
        shellSort(arr);

        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
```
