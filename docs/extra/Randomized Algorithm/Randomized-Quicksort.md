---
id: randomized-quicksort
title: Randomized Quick Sort
sidebar_label: Randomized Quick Sort
description: "Randomized quicksort is a sorting algorithm that is an extension of quicksort, but with a random pivot selection"  
tags: [dsa, algorithms, sorting]
---

### Problem Statement:
Implement the Randomized Quick Sort algorithm, which sorts an array by selecting a random pivot element at each partitioning step. The goal is to sort an array of integers in ascending order using this randomized approach to avoid the worst-case time complexity of `O(n^2)` that occurs with a deterministic pivot on already sorted or nearly sorted input.

### Defination
This program sorts an array of integers in ascending order using the randomized QuickSort algorithm. It begins by taking an array of integers as input, selects random pivots during partitioning to improve performance, and recursively sorts the partitions.

### Algorithm Steps:

1. Choose a random pivot element and swap it to the end of the array to prepare for partitioning.
2. Partition the array such that elements less than the pivot are on the left and greater elements are on the right.
3. Recursively apply QuickSort to the left and right partitions created by the pivot.
4. Repeat until all partitions contain a single element, resulting in a sorted array.

### Code Breakdown

1. **swap() Function**: The `swap` function exchanges the values of two variables. It is used to rearrange elements in the array during partitioning.

2. **random_partition() Function**: This function selects a random pivot element to reduce the chance of worst-case performance in QuickSort. It places elements smaller than the pivot to the left and greater elements to the right, then returns the pivot’s final position.

3. **quicksort() Function**: The main recursive function that sorts the array. It partitions the array around a randomly chosen pivot, then recursively applies QuickSort to the left and right subarrays until each partition has only one element, making the array sorted.

4. **Main() Function**:
   - Prompts the user to input the number of elements and the elements themselves.
   - Displays the original array, calls `quicksort` to sort the array, and then prints the sorted array.

### Time Complexity:
- The randomized QuickSort has an average time complexity of `O(n log n)` due to balanced splits, with `O(n^2)` as the worst case for highly unbalanced partitions. Randomizing the pivot reduces the likelihood of worst-case splits, keeping performance near `O(n log n)`.

### Space Complexity
- The space complexity of randomized QuickSort is `O(log n)` on average due to the recursion stack depth, as balanced partitions limit the number of recursive calls. In the worst case, where partitions are highly unbalanced, the space complexity can increase to `O(n)`.

### Sample Input:
Enter the number of items: 5                           
Enter the elements: 98 -5 31 47 -12                                 

### Sample Output:
The array is: 98  -5  31  47  -12                         
The sorted array is: -12 -5 31 47 98                                            

### C++ Implementation:
```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>

void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int random_partition(std::vector<int> &a, int lb, int ub) {
    srand(static_cast<unsigned int>(time(nullptr))); // Seed for random number generator
    int random_index = lb + rand() % (ub - lb + 1); // Generate a random index within the range
    swap(a[random_index], a[ub]); // Swap the randomly chosen pivot element with the last element
    int pivot = a[ub];
    int i = lb - 1; // Pointer for the greater element
    for (int j = lb; j <= ub - 1; j++) {
        if (a[j] < pivot) { // If current element is smaller than pivot
            i++;
            swap(a[i], a[j]);
        }
    }
    swap(a[i + 1], a[ub]); // Place pivot at the correct position
    return (i + 1); // Return the partition index
}

void quicksort(std::vector<int> &a, int lb, int ub) {
    if (lb < ub) {
        int pivot = random_partition(a, lb, ub);
        quicksort(a, lb, pivot - 1);
        quicksort(a, pivot + 1, ub);
    }
}

int main() {
    std::vector<int> a;
    int n;
    std::cout << "Enter the number of items: ";
    std::cin >> n;
    a.resize(n);
    std::cout << "Enter the elements: ";
    for (int i = 0; i < n; i++)
        std::cin >> a[i];
    std::cout << "The array is:";
    for (int i = 0; i < n; i++)
        std::cout << " " << a[i] << " ";
    quicksort(a, 0, n - 1);
    std::cout << "\nThe sorted array is:";
    for (int i = 0; i < n; i++)
        std::cout << " " << a[i];
    return 0;
}

```
