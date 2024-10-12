---
id: interpolation-search-algo
sidebar_position: 6
title: Interpolation Search
sidebar_label: Interpolation Search
---

Interpolation search is an optimized variant of binary search that works based on proportionality. It estimates the position of the target value in a sorted array by comparing the value of the target to the array's boundary values. This makes it particularly effective for uniformly distributed datasets.

### Key Characteristics

- **Proportional Positioning**:  
  Interpolation search calculates the estimated position of the target using a formula that takes into account the values at the low and high indices, as well as the target value.
  
- **Ideal for Uniformly Distributed Data**:  
  The algorithm performs best when data is uniformly distributed, as the predicted position will closely match the target's actual location.

- **Works on Sorted Arrays**:  
  Like binary search, interpolation search requires the array to be sorted for efficient searching.

- **Memory Efficiency**:  
  The algorithm operates in constant space, requiring no additional memory beyond the input array.

- **Stable Search**:  
  It preserves the relative order of equal elements during the search process.

### Time Complexity

- **Best Case: $O(1)$**  
  In the best scenario, the target is found in the estimated position after one comparison.

- **Average Case: $O(log log n)$**  
  For uniformly distributed data, interpolation search can achieve a time complexity of $O(log log n)$, making it faster than binary search.

- **Worst Case: $O(n)$**  
  For non-uniformly distributed data, the algorithm’s performance may degrade to $O(n)$, similar to linear search.

### Space Complexity

- **Iterative Approach: $O(1)$**  
  The iterative version only needs constant space for the `low`, `high`, and `pos` variables.

### When to Use Interpolation Search

- **Uniformly Distributed Data**:  
  Best suited for datasets where the values are uniformly spread. It efficiently leverages the data distribution to predict the target's position.
  
- **Large Sorted Data**:  
  Particularly effective for large, sorted datasets, as it significantly reduces comparisons by jumping to the estimated target location.

- **Performance-Critical Applications**:  
  When performance is critical, and the data is large and uniformly distributed, interpolation search offers improvements over linear or binary search.

- **Numeric Data**:  
  Works best with numeric data where the distribution is known or can be approximated. It's less effective for irregularly distributed or non-numeric data.

### C++ Implementation

**Iterative Approach**:

```cpp
#include <iostream>
using namespace std;

int interpolationSearch(int arr[], int size, int target) {
    int low = 0, high = size - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }

        int pos = low + (((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));

        if (arr[pos] == target) {
            return pos;
        }

        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}

int main() {
    int arr[] = {10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 18;

    int result = interpolationSearch(arr, size, target);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
```

**Recursive Approach**:

```cpp
#include <iostream>
using namespace std;

int interpolationSearchRecursive(int arr[], int low, int high, int target) {
    if (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }

        int pos = low + (((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));

        if (arr[pos] == target) {
            return pos;
        }

        if (arr[pos] < target) {
            return interpolationSearchRecursive(arr, pos + 1, high, target);
        } else {
            return interpolationSearchRecursive(arr, low, pos - 1, target);
        }
    }
    return -1;
}

int main() {
    int arr[] = {10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 18;

    int result = interpolationSearchRecursive(arr, 0, size - 1, target);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
```

### Use Cases

- **Efficient Search in Uniformly Distributed Data**:  
  Commonly used for large datasets like databases where efficient lookups in uniformly distributed data are needed.

- **Searching in Static Data**:  
  Works well in scenarios where the data doesn’t change often, making it suitable for read-heavy applications.

### Advantages and Disadvantages

**Advantages**:

- **Efficient for Uniform Data**:  
  Minimizes comparisons for uniformly distributed arrays, making it highly efficient for such datasets.

- **Log-Logarithmic Time Complexity**:  
  Its $O(log log n)$ time complexity offers a significant speed boost over binary search in ideal conditions.

- **Memory Efficiency**:  
  The algorithm operates with constant space, $O(1)$, making it memory efficient.

**Disadvantages**:

- **Requires Uniform Distribution**:  
  Limited to uniformly distributed datasets, making it ineffective for irregular or unpredictable data.

- **Less Efficient for Small Datasets**:  
  The overhead of calculating positions makes it less efficient than simpler search algorithms for smaller datasets.

- **Not Suitable for Linked Lists**:  
  The algorithm requires random access to elements, so it's not usable with linked lists or other sequential data structures.

### Optimizations and Applications

- **Hybrid Search Algorithms**:  
  Combining interpolation search with other search techniques (e.g., binary search) can enhance performance in non-uniformly distributed datasets.

- **Exponential Search**:  
  For arrays of unknown or infinite size, interpolation search can be combined with exponential search to first narrow down the range of the target element.

### Summary

Interpolation search is a powerful algorithm for searching large, uniformly distributed, sorted datasets. With an average time complexity of $O(log log n)$, it outperforms binary search in ideal conditions. While it’s best suited for numeric, static datasets with uniform distribution, interpolation search remains an essential tool in the realm of efficient search algorithms.
