---
id: radix-sort  
title: Radix Sort  
sidebar_label: Radix Sort  
description: "Learn about Radix Sort, a non-comparative integer sorting algorithm that processes numbers digit by digit."
tags: [dsa, algorithms, sorting]
---

### Definition:
Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing individual digits. The algorithm processes each digit starting from the least significant digit (LSD) or the most significant digit (MSD), depending on the implementation. Radix Sort is efficient when sorting large sets of integers or strings.

### Characteristics:
- **Non-Comparative**:  
  Unlike comparison-based algorithms (like QuickSort or MergeSort), Radix Sort doesn't compare elements directly. Instead, it sorts elements based on their individual digits or characters.

- **Stable**:  
  Radix Sort is a stable sorting algorithm, meaning that when two elements have the same value, their original relative order is preserved.

- **Efficient for Specific Data Types**:  
  Radix Sort is very efficient for sorting integers or strings with a fixed number of digits or characters. Its performance is independent of the size of the values themselves, but depends on the number of digits or characters in the input.

### Steps Involved:
1. **Find the Maximum Element**:  
   Identify the maximum number in the input array to determine the number of digits to process.

2. **Sort by Each Digit**:  
   Starting from the least significant digit, group the numbers by their digit value and sort them. Repeat this process for each digit, moving towards the most significant digit.

3. **Repeat for All Digits**:  
   Perform sorting for each digit until all digits have been processed. The array will then be fully sorted.

### Time Complexity:
- **Time Complexity**:  
  - $O(n \cdot k)$, where `n` is the number of elements and `k` is the number of digits in the largest number.  
  Radix Sort is linear in the number of elements when the number of digits (`k`) is relatively small or constant.

- **Space Complexity**:  
  - $O(n + k)$, due to the space required for the counting sort step.

### Example:
Consider the following array of integers:  
`[170, 45, 75, 90, 802, 24, 2, 66]`

Step-by-step execution (starting with the least significant digit):

1. **First Pass (Least Significant Digit)**:  
   `[170, 90, 802, 2, 24, 45, 75, 66]`

2. **Second Pass (Second Least Significant Digit)**:  
   `[802, 2, 24, 45, 66, 170, 75, 90]`

3. **Third Pass (Most Significant Digit)**:  
   `[2, 24, 45, 66, 75, 90, 170, 802]`

### C++ Implementation:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Function to perform counting sort based on a specific digit
void countingSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);

    // Store count of occurrences of digits
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] contains the actual position of the digit in output[]
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[], so that arr[] now contains sorted numbers
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Function to implement radix sort
void radixSort(vector<int>& arr) {
    // Find the maximum number to know the number of digits
    int maxNum = *max_element(arr.begin(), arr.end());

    // Apply counting sort to sort elements based on each digit
    for (int exp = 1; maxNum / exp > 0; exp *= 10) {
        countingSort(arr, exp);
    }
}

int main() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr);

    cout << "Sorted array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}

import java.util.*;

public class RadixSort {

    // Function to perform counting sort based on a specific digit
    public static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        // Store count of occurrences of digits
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        // Change count[i] so that count[i] contains the actual position of the digit in output[]
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers
        System.arraycopy(output, 0, arr, 0, n);
    }

    // Function to implement radix sort
    public static void radixSort(int[] arr) {
        // Find the maximum number to know the number of digits
        int maxNum = Arrays.stream(arr).max().getAsInt();

        // Apply counting sort to sort elements based on each digit
        for (int exp = 1; maxNum / exp > 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }

    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        radixSort(arr);

        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
