---

id: bucket-sort-algo  
sidebar_position: 9  
title: Bucket Sort  
sidebar_label: Bucket Sort  

---

### Definition:

Bucket sort is a comparison-based sorting algorithm that works by distributing elements into several "buckets" or ranges. Each bucket is sorted individually, either using another sorting algorithm or recursively applying bucket sort. Finally, the sorted buckets are concatenated to produce the final sorted array.

### Characteristics:

- **Distribution-Based Sorting**:
  - Bucket sort distributes elements into different buckets, typically based on their value ranges, and then sorts the individual buckets.

- **Efficient for Uniform Data Distribution**:
  - Bucket sort is efficient when the input elements are uniformly distributed across the range, as each bucket will contain a relatively even number of elements.

- **Not In-Place**:
  - Bucket sort uses additional memory for the buckets, making it not an in-place algorithm.

- **Stable**:
  - Bucket sort is stable when the underlying sorting algorithm used within each bucket is stable.

### Time Complexity:

- **Best Case: O(n + k)**  
  In the best case, where the elements are evenly distributed across the buckets, and each bucket contains only a few elements, the overall time complexity is linear.

- **Average Case: O(n + k)**  
  On average, bucket sort performs well when the elements are uniformly distributed. The average-case complexity is O(n + k), where `n` is the number of elements and `k` is the number of buckets.

- **Worst Case: O(n²)**  
  The worst-case scenario occurs when all elements are placed in the same bucket, reducing bucket sort to a slower sorting algorithm (like insertion sort), leading to quadratic time complexity.

### Space Complexity:

- **Space Complexity: O(n + k)**  
  Bucket sort requires extra space for the buckets and the array storing the final result, leading to a space complexity of O(n + k).

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to perform bucket sort
void bucketSort(float arr[], int size) {
    // Create empty buckets
    vector<float> buckets[size];

    // Put array elements in different buckets based on their value
    for (int i = 0; i < size; i++) {
        int bucketIndex = size * arr[i]; // Index in the bucket array
        buckets[bucketIndex].push_back(arr[i]);
    }

    // Sort individual buckets using a sorting algorithm (here, insertion sort)
    for (int i = 0; i < size; i++) {
        sort(buckets[i].begin(), buckets[i].end());
    }

    // Concatenate all buckets into the sorted array
    int index = 0;
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}

int main() {
    float arr[] = {0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434};
    int size = sizeof(arr) / sizeof(arr[0]);

    bucketSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Bucket sort is an efficient algorithm for sorting data that is uniformly distributed over a range. By dividing the data into smaller buckets and sorting them individually, bucket sort can achieve linear time complexity in the best and average cases. However, if the data is not evenly distributed, its worst-case time complexity can degrade to O(n²). Bucket sort is often used in conjunction with other algorithms and performs well when the number of buckets is proportional to the input size. Its primary trade-off is its need for additional space.
