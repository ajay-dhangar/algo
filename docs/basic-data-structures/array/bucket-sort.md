---
id: bucket-sort
title: Bucket sort
sidebar_label: Bucket sort
tags:
  - DSA
  - Python
  - C++
  - Java
  - Sorting

description: "Thsi page containes Bucket Sort, with codes in python, java and c++ "
---

### Introduction to Bucket Sort

Bucket sort is a comparison sorting algorithm that distributes elements into a number of "buckets." Each bucket is then sorted individually, either using another sorting algorithm or recursively applying the bucket sort. Finally, the sorted buckets are combined to form the final sorted array. Bucket sort is particularly useful for uniformly distributed data.

### Steps of Bucket Sort

1. **Create Buckets**: Initialize an empty array of buckets.
2. **Distribute Elements**: Distribute the elements of the input array into the appropriate buckets.
3. **Sort Buckets**: Sort each bucket individually.
4. **Concatenate Buckets**: Concatenate all sorted buckets to form the final sorted array.

### Pseudocode

```text
function bucketSort(array, bucketSize):
    if length(array) == 0:
        return array

    // Determine minimum and maximum values
    minValue = min(array)
    maxValue = max(array)

    // Initialize buckets
    bucketCount = floor((maxValue - minValue) / bucketSize) + 1
    buckets = array of empty lists of size bucketCount

    // Distribute input array values into buckets
    for i from 0 to length(array) - 1:
        bucketIndex = floor((array[i] - minValue) / bucketSize)
        append array[i] to buckets[bucketIndex]

    // Sort each bucket and concatenate them
    sortedArray = []
    for i from 0 to bucketCount - 1:
        sort(buckets[i])  // You can use any sorting algorithm
        append buckets[i] to sortedArray

    return sortedArray
```

### Implementation in Python, C++, Java and JavaScript

#### Python Implementation

```python
def bucket_sort(numbers, size=5):
    if len(numbers) == 0:
        return numbers

    # Determine minimum and maximum values
    min_value = min(numbers)
    max_value = max(numbers)

    # Initialize buckets
    bucket_count = (max_value - min_value) // size + 1
    buckets = [[] for _ in range(bucket_count)]

    # Distribute input array values into buckets
    for number in numbers:
        bucket_index = (number - min_value) // size
        buckets[bucket_index].append(number)

    # Sort each bucket and concatenate them
    sorted_numbers = []
    for bucket in buckets:
        sorted_numbers.extend(sorted(bucket))

    return sorted_numbers

# Example usage
data = [42, 32, 33, 52, 37, 47, 51]
sorted_data = bucket_sort(data)
print(sorted_data)  # Output: [32, 33, 37, 42, 47, 51, 52]
```

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void bucketSort(vector<int>& nums, int bucketSize) {
    if (nums.empty())
        return;

    // Determine minimum and maximum values
    int minValue = *min_element(nums.begin(), nums.end());
    int maxValue = *max_element(nums.begin(), nums.end());

    // Initialize buckets
    int numBuckets = (maxValue - minValue) / bucketSize + 1;
    vector<vector<int>> buckets(numBuckets);

    // Distribute input array values into buckets
    for (int num : nums) {
        int bucketIndex = (num - minValue) / bucketSize;
        buckets[bucketIndex].push_back(num);
    }

    // Sort each bucket and concatenate them
    nums.clear();
    for (auto& bucket : buckets) {
        sort(bucket.begin(), bucket.end());
        nums.insert(nums.end(), bucket.begin(), bucket.end());
    }
}

// Example usage
int main() {
    vector<int> data = {42, 32, 33, 52, 37, 47, 51};
    bucketSort(data, 5);
    for (int num : data) {
        cout << num << " ";
    }
    // Output: 32 33 37 42 47 51 52
    return 0;
}
```

#### Java Implementation

```java
import java.util.ArrayList;
import java.util.Collections;

public class BucketSort {
    public static void bucketSort(int[] array, int bucketSize) {
        if (array.length == 0)
            return;

        // Determine minimum and maximum values
        int minValue = array[0];
        int maxValue = array[0];
        for (int num : array) {
            if (num < minValue)
                minValue = num;
            else if (num > maxValue)
                maxValue = num;
        }

        // Initialize buckets
        int bucketCount = (maxValue - minValue) / bucketSize + 1;
        ArrayList<ArrayList<Integer>> buckets = new ArrayList<>(bucketCount);
        for (int i = 0; i < bucketCount; i++) {
            buckets.add(new ArrayList<Integer>());
        }

        // Distribute input array values into buckets
        for (int num : array) {
            int bucketIndex = (num - minValue) / bucketSize;
            buckets.get(bucketIndex).add(num);
        }

        // Sort each bucket and concatenate them
        int currentIndex = 0;
        for (ArrayList<Integer> bucket : buckets) {
            Collections.sort(bucket);
            for (int num : bucket) {
                array[currentIndex++] = num;
            }
        }
    }

    // Example usage
    public static void main(String[] args) {
        int[] data = {42, 32, 33, 52, 37, 47, 51};
        bucketSort(data, 5);
        for (int num : data) {
            System.out.print(num + " ");
        }
        // Output: 32 33 37 42 47 51 52
    }
}
```

#### JavaScript Code Implementation

```javascript
function bucketSort(nums, bucketSize) {
    if (nums.length === 0) return;

    // Determine minimum and maximum values
    const minValue = Math.min(...nums);
    const maxValue = Math.max(...nums);

    // Initialize buckets
    const numBuckets = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = Array.from({ length: numBuckets }, () => []);

    // Distribute input array values into buckets
    for (const num of nums) {
        const bucketIndex = Math.floor((num - minValue) / bucketSize);
        buckets[bucketIndex].push(num);
    }

    // Sort each bucket and concatenate them
    nums.length = 0; // Clear the original array
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b); // Sort the current bucket
        nums.push(...bucket); // Concatenate sorted bucket to nums
    }
}

// Example usage
const data = [42, 32, 33, 52, 37, 47, 51];
bucketSort(data, 5);
console.log(data); // Output: [32, 33, 37, 42, 47, 51, 52]
```

### Explanation of the Code

1. **Function `bucketSort`**:
   - The function takes an array `nums` and a `bucketSize` as parameters.
   - It first checks if the array is empty and returns if true.

2. **Finding Minimum and Maximum Values**:
   - The minimum and maximum values of the array are determined using `Math.min` and `Math.max`.

3. **Initializing Buckets**:
   - The number of buckets is calculated based on the range of the values divided by the `bucketSize`.
   - Buckets are initialized as an array of empty arrays.

4. **Distributing Values into Buckets**:
   - Each number in the input array is placed into its respective bucket based on its calculated index.

5. **Sorting Buckets**:
   - Each bucket is sorted using the native `sort` method.
   - The original array `nums` is cleared, and the sorted buckets are concatenated back into it.

6. **Example Usage**:
   - An example array `data` is provided, and `bucketSort` is called with this array and a `bucketSize`.
   - The sorted array is printed to the console.


### Complexity

- **Time Complexity**:

  - Best Case: $O(n + k)$, where $n$ is the number of elements and $k$ is the number of buckets.
  - Average Case: $O(n + k + n \log(\frac{n}{k}))$
  - Worst Case: $O(n^2)$, when all elements are placed in one bucket and a slow sorting algorithm (like bubble sort) is used within buckets.

- **Space Complexity**: $O(n + k)$, for the input array and the buckets.

### Conclusion

Bucket sort is efficient for sorting uniformly distributed data and can achieve linear time complexity in the best case. However, it may degrade to quadratic time complexity in the worst case if elements are not uniformly distributed. It's essential to choose an appropriate bucket size and secondary sorting algorithm for optimal performance. By understanding its structure and implementation, you can effectively use bucket sort for various sorting tasks.
