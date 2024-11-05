---

id: Interpolation algorithm 
sidebar_position: 5  
title: Interpolation search
sidebar_label: Interpolation search algorithm 

---


## Definition 📖

**Interpolation search** is a search algorithm that improves upon binary search by estimating the position of a target value within a sorted array. This estimation is based on the values at the start and end of the search range, assuming the data is uniformly distributed. Interpolation search calculates an approximate position for the target element, which helps in reducing the number of comparisons in sorted arrays.

## Characteristics ✨

- **Estimation Based Search**:
  - Unlike binary search, which splits the array in half, interpolation search attempts to guess the position of the target value based on its value relative to the range boundaries.

- **Efficient in Uniformly Distributed Data**:
  - Interpolation search works best when the elements in the array are uniformly distributed. The performance degrades if the distribution is uneven.

- **Adaptive Positioning**:
  - It calculates the position based on the formula:
    ```
    pos = low + ((target - array[low]) * (high - low) / (array[high] - array[low]))
    ```
    where `low` and `high` are the bounds of the search range.

## Time Complexity ⏱️

- **Best Case: `O(1)`** 🌟
  
  In the best-case scenario, the estimated position is exactly where the target element is located, leading to a constant time complexity.

- **Average Case: `O(log log n)`** 🔄
  
  For uniformly distributed data, interpolation search is generally faster than binary search, providing a sub-logarithmic time complexity.

- **Worst Case: `O(n)`** 💥
  
  In the worst case (e.g., non-uniform distribution), interpolation search may perform poorly and degrade to linear search.

## Space Complexity 💾

- **Space Complexity: `O(1)`**  
  Interpolation search operates in constant space, as it only requires a few extra variables for the calculations.

## C++ Implementation 💻

Here’s a simple implementation of interpolation search in C++:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int interpolationSearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Estimating the position
        int pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]));

        // Target found
        if (arr[pos] == target)
            return pos;

        // Adjust search range
        if (arr[pos] < target)
            low = pos + 1;
        else
            high = pos - 1;
    }
    return -1; // Target not found
}

int main() {
    vector<int> arr = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    int target = 40;

    int index = interpolationSearch(arr, target);

    if (index != -1)
        cout << "Element found at index " << index << endl;
    else
        cout << "Element not found" << endl;

    return 0;
}
```
## Applications of Interpolation Search 🌐

 **Databases:**
- Often used for searching in large databases with sorted numeric keys, where the data is close to uniformly distributed.

**Address Lookup:**
- Useful in address-based data searches where entries are nearly uniform, such as postal codes or phone numbers.

**Search Engines:**
- Search engines might employ interpolation-like techniques for indexing and searching, especially when data distribution is predictable.

## Advantages and Disadvantages
**Advantages:** ✅
- Faster Than Binary Search in Uniform Data:
    - When data is uniformly distributed, interpolation search can perform better than binary search, achieving a time complexity of `𝑂(log log 𝑛)`.
- Low Memory Requirement:
    - It requires only constant space, which makes it efficient in terms of memory usage.

**Disadvantages:** ⚠️
- Requires Sorted and Uniformly Distributed Data:
    - Interpolation search is inefficient for unsorted data and can degrade to `𝑂(𝑛)` for uneven distributions.
- Complexity in Non-Uniform Data:
    - If the data is not uniformly distributed, interpolation search may perform poorly compared to binary search.

## Summary 📚
Interpolation search is a specialized search technique that provides fast search times in uniformly distributed sorted arrays by estimating the likely position of the target element. 
While it offers significant speed advantages for specific data distributions, it is less versatile than binary search, particularly in cases of non-uniform data. 
Interpolation search is applied in fields such as databases, address lookups, and search engines where data tends to be evenly distributed.
