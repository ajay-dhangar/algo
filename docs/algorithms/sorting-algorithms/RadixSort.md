---

id: radix-sort-algo 
sidebar_position: 7  
title: Radix Sort  
sidebar_label: Radix Sort  

---


### Definition:

Radix sort is a non-comparative sorting algorithm that sorts numbers by processing individual digits. It processes each digit of the numbers one at a time, starting from the least significant digit to the most significant digit (LSD variant) or vice versa (MSD variant), using a stable subroutine such as counting sort.

### Characteristics:

- **Non-Comparative Sorting**:
  - Unlike comparison-based sorting algorithms, radix sort does not compare elements directly. Instead, it processes each digit of the elements one by one.

- **Stable**:
  - Radix sort preserves the relative order of elements with equal keys, making it a stable sorting algorithm, especially when used with stable intermediate sorting algorithms like counting sort.

- **Efficient for Large Datasets**:
  - Radix sort can outperform comparison-based sorting algorithms (like quicksort or merge sort) on large datasets, particularly when the size of the input numbers (keys) is much smaller than the number of elements in the dataset.

- **In-Place Sorting (depending on implementation)**:
  - Depending on the subroutine used (like counting sort), radix sort can be implemented as an in-place algorithm, though some versions may require extra space.

### Time Complexity:

- **Best Case: O(nk)**  
  When the input elements are uniformly distributed across a small range, radix sort runs in linear time, where `n` is the number of elements, and `k` is the number of digits in the largest number.

- **Average Case: O(nk)**  
  Radix sort performs consistently well, especially when the number of digits (k) is small compared to the number of elements (n).

- **Worst Case: O(nk)**  
  The worst-case scenario is also O(nk), making radix sort more predictable in performance compared to algorithms with O(n²) worst cases.

### Space Complexity:

- **Space Complexity: O(n + k)**  
  Radix sort requires additional space for the counting array or buckets used during intermediate sorting, where `n` is the number of elements, and `k` is the number of digits.

### C++ Implementation:

**LSD (Least Significant Digit) Radix Sort Using Counting Sort**

```cpp
#include <iostream>
using namespace std;

// A utility function to get the maximum value in the array
int getMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// A function to do counting sort of arr[] according to the digit represented by exp
void countingSort(int arr[], int size, int exp) {
    int output[size]; // Output array to store sorted numbers
    int count[10] = {0}; // There are 10 possible digits (0 to 9)

    // Count the occurrences of each digit
    for (int i = 0; i < size; i++) {
        count[(arr[i] / exp) % 10]++;
    }

    // Change count[i] so that it contains the actual position of this digit in output[]
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (int i = size - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[], so that arr[] now contains the sorted numbers
    for (int i = 0; i < size; i++) {
        arr[i] = output[i];
    }
}

// The main function to implement radix sort
void radixSort(int arr[], int size) {
    // Find the maximum number to know the number of digits
    int max = getMax(arr, size);

    // Do counting sort for every digit. Note that exp is 10^i where i is the current digit position
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSort(arr, size, exp);
    }
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int size = sizeof(arr) / sizeof(arr[0]);

    radixSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Radix sort is an efficient algorithm for sorting integers and other data types with a fixed range of digits. Unlike comparison-based algorithms, it processes the digits of the numbers in multiple passes, making it suitable for large datasets where elements have many digits. Its predictable time complexity, especially in cases where the number of digits is much smaller than the number of elements, makes it an attractive option in such scenarios.
