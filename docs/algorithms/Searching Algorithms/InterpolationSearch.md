---

id: interpolation-search-algo  
sidebar_position: 6  
title: Interpolation Search  
sidebar_label: Interpolation Search  

---

### Definition:

**Interpolation Search** is an improved variant of binary search that works on sorted and uniformly distributed arrays. It estimates the position of the target value based on the value of the target and the values at the ends of the search space, making it more efficient than binary search in many cases.

### Characteristics:

- **Estimation-Based Searching**:
  - Unlike binary search, which always divides the array in half, interpolation search uses the values of the elements to determine the likely position of the target, which can lead to faster search times.

- **Works on Sorted Arrays**:
  - Interpolation search requires a sorted array and is particularly effective when the elements are uniformly distributed.

- **Potentially Faster**:
  - In scenarios where data distribution is uniform, interpolation search can outperform binary search by reducing the number of comparisons.

### How Interpolation Search Works:

1. **Calculate Position**: 
   - Estimate the position of the target element using the formula:
      ![image](https://github.com/user-attachments/assets/ec18879f-776f-4125-80cf-ac536bc69723)

2. **Check the Estimated Position**:
   - Compare the target element with the element at the estimated position.
3. **Adjust Search Range**:
   - If the target is smaller, narrow the search to the lower section; if larger, focus on the upper section.
4. **Repeat** until the target is found or the search range is exhausted.

### Time Complexity of Interpolation Search:

- **Time Complexity**: $O(\log \log n)$  
  In the best case, when the elements are uniformly distributed, interpolation search can be much faster than binary search.

### Space Complexity:

- **Space Complexity**: $O(1)$  
  Interpolation search requires a constant amount of space, as it only uses a few variables to maintain the indices and the target.

### Advantages of Interpolation Search:

- **Faster for Uniformly Distributed Data**:
  - In cases where the data is uniformly distributed, interpolation search can significantly reduce the number of comparisons.

- **Simple Implementation**:
  - The algorithm is straightforward and easy to implement, making it a viable option for quick searches in suitable datasets.

### Disadvantages of Interpolation Search:

- **Ineffective for Non-Uniform Data**:
  - The efficiency drops drastically for non-uniformly distributed data, as it can lead to poor estimates of the target's position.

- **Requires Sorted Arrays**:
  - Like binary search, interpolation search can only be applied to sorted arrays.

### Interpolation Search Algorithm (C++ Implementation):

```cpp
#include <iostream>
using namespace std;

// Interpolation Search Function
int interpolationSearch(int arr[], int n, int x) {
    int low = 0, high = n - 1;

    while (low <= high && x >= arr[low] && x <= arr[high]) {
        if (low == high) {
            if (arr[low] == x) return low;
            return -1;
        }

        // Calculate the position
        int pos = low + ((double)(high - low) / (arr[high] - arr[low]) * (x - arr[low]));

        if (arr[pos] == x) {
            return pos;
        }
        if (arr[pos] < x) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 70;

    int result = interpolationSearch(arr, n, x);
    if (result != -1) {
        cout << "Found at index: " << result << endl;
    } else {
        cout << "Not found." << endl;
    }

    return 0;
}

```
## Applications of Interpolation Search:
 - Search in Uniformly Distributed Data:
   - Ideal for applications where data distribution is known to be uniform, allowing for efficient searching.

  - Database Indexing:
    - Useful in database systems where records are sorted and evenly distributed, providing fast access to data.
   

## Summary:
Interpolation Search is an efficient search algorithm that can outperform binary search under certain conditions, particularly with uniformly distributed data. Its logarithmic time complexity in ideal scenarios, coupled with constant space complexity, makes it an attractive choice for specific applications. However, its performance diminishes with non-uniform data distributions, necessitating careful consideration of its use case.
