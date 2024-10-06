---

id: counting-sort-algo  
sidebar_position: 8  
title: Counting Sort  
sidebar_label: Counting Sort  

---

### Definition:

Counting sort is a non-comparative sorting algorithm that sorts elements by counting the number of occurrences of each distinct element in the array. It works by determining the position of each element in the sorted output using a counting array.

### Characteristics:

- **Non-Comparative Sorting**:
  - Counting sort does not compare elements directly but relies on counting occurrences of each element and uses these counts to determine their position in the sorted array.

- **Stable**:
  - Counting sort is a stable sorting algorithm because it maintains the relative order of equal elements when building the output array.

- **Efficient for Small Ranges**:
  - Counting sort is efficient when the range of input values is small compared to the number of elements in the array.

- **Not In-Place**:
  - Counting sort requires extra space proportional to the range of the input data, making it not an in-place algorithm.

### Time Complexity:

- **Best Case: O(n + k)**  
  Counting sort achieves linear time when the range of the input data (k) is not significantly larger than the number of elements (n).

- **Average Case: O(n + k)**  
  The time complexity remains linear in most cases, provided that the range `k` is reasonably small compared to `n`.

- **Worst Case: O(n + k)**  
  The worst-case time complexity occurs when the range of input values is large, resulting in extra space and time for the counting array.

### Space Complexity:

- **Space Complexity: O(n + k)**  
  Counting sort requires an extra counting array and an output array, resulting in a space complexity of O(n + k), where `k` is the range of the input values.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Counting sort function
void countingSort(int arr[], int size) {
    // Find the maximum element in the array
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Create a counting array to store count of each element
    vector<int> count(max + 1, 0);

    // Store the count of each element in the count array
    for (int i = 0; i < size; i++) {
        count[arr[i]]++;
    }

    // Modify the count array to store the cumulative count of elements
    for (int i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    vector<int> output(size);
    for (int i = size - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Copy the output array to arr[], so that arr[] now contains the sorted elements
    for (int i = 0; i < size; i++) {
        arr[i] = output[i];
    }
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int size = sizeof(arr) / sizeof(arr[0]);

    countingSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Counting sort is a highly efficient algorithm for sorting integers within a limited range. It performs in linear time, O(n + k), making it faster than comparison-based algorithms like quicksort or mergesort in certain situations. However, the space complexity, O(n + k), means it requires significant extra memory, making it less suitable for large datasets with a wide range of input values. Counting sort is often used as a subroutine in more advanced algorithms like radix sort, and it works best when the range of input data is small relative to the dataset size.

