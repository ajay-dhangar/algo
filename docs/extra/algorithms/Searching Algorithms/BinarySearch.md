---

id: binary-search-algo  
sidebar_position: 2  
title: Binary Search  
sidebar_label: Binary Search  

---

### Definition:

Binary search is an efficient algorithm for finding an element in a **sorted array**. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the left half; if the target is greater, the search continues in the right half. This process continues until the element is found or the search interval becomes empty.

### Characteristics:

- **Divide and Conquer**:
  - Binary search applies the divide-and-conquer strategy by repeatedly halving the search space until the target element is found or the subarray is empty.

- **Efficient for Sorted Data**:
  - Binary search requires the input array to be sorted. It is highly efficient for large datasets compared to linear search.

- **Works on Indexable Structures**:
  - Binary search is best suited for data structures that allow **random access**, such as arrays, but not for linked lists, where traversal is sequential.

- **Non-Adaptive**:
  - Binary search does not adjust to find elements more quickly when there are patterns or duplicate elements in the array, unlike some adaptive algorithms.

### Video Explanation 

<LiteYouTubeEmbed
  id="V_T5NuccwRA"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="7.2 What is Binary Search | Binary Search Algorithm with example | Data Structures Tutorials"
  lazyLoad={true}
  webp
/>

### Time Complexity:

- **Best Case: $O(1)$**  
  In the best case, the middle element of the array is the target value, found after just one comparison.

- **Average Case: $O(log n)$**  
  On average, binary search reduces the search space by half at each step, leading to a logarithmic time complexity.

- **Worst Case: $O(log n)$**  
  In the worst case, the target element is not present in the array or is located at the extreme ends, requiring `log n` comparisons.

### Space Complexity:

- **Iterative: $O(1)$**  
  The iterative version of binary search requires a constant amount of memory for variables like the low and high indices.

- **Recursive: $O(log n)$**  
  The recursive version of binary search uses additional space due to recursive function calls, leading to an O(log n) space complexity for storing stack frames.

### When to Use Binary Search:

- **Sorted Arrays**:
  - Binary search is ideal for large, sorted datasets where quick searches are required. It is much faster than linear search in these cases.

- **Searching for a Specific Element**:
  - When you need to find a specific element in a sorted array and want to minimize the number of comparisons, binary search is the go-to choice.

- **Efficient Lookups**:
  - It is used in situations where fast lookup times are critical, such as in searching through large databases, dictionaries, or ordered lists.

### C++ and Python Implementation:

**Iterative Approach**
```cpp
#include <iostream>
using namespace std;

int binarySearchIterative(int arr[], int size, int target) {
    int low = 0;
    int high = size - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Avoid overflow for large indices

        if (arr[mid] == target) {
            return mid; // Target element found
        } else if (arr[mid] < target) {
            low = mid + 1; // Search in the right half
        } else {
            high = mid - 1; // Search in the left half
        }
    }

    return -1; // Return -1 if target is not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = binarySearchIterative(arr, size, target);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
```
```python
def binary_search_iterative(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2  # Avoid overflow for large indices

        if arr[mid] == target:
            return mid  # Target element found
        elif arr[mid] < target:
            low = mid + 1  # Search in the right half
        else:
            high = mid - 1  # Search in the left half

    return -1  # Return -1 if target is not found

def main():
    arr = [2, 3, 4, 10, 40]
    target = 10

    result = binary_search_iterative(arr, target)

    if result != -1:
        print("Element found at index", result)
    else:
        print("Element not found")

if __name__ == "__main__":
    main()
```

**Recursive Approach**
```cpp
#include <iostream>
using namespace std;

int binarySearchRecursive(int arr[], int low, int high, int target) {
    if (low <= high) {
        int mid = low + (high - low) / 2; // Avoid overflow for large indices

        if (arr[mid] == target) {
            return mid; // Target element found
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, mid + 1, high, target); // Search in the right half
        } else {
            return binarySearchRecursive(arr, low, mid - 1, target); // Search in the left half
        }
    }

    return -1; // Return -1 if target is not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = binarySearchRecursive(arr, 0, size - 1, target);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
```
```python
def binary_search_recursive(arr, low, high, target):
    if low <= high:
        mid = low + (high - low) // 2  # Avoid overflow for large indices

        if arr[mid] == target:
            return mid  # Target element found
        elif arr[mid] < target:
            return binary_search_recursive(arr, mid + 1, high, target)  # Search in the right half
        else:
            return binary_search_recursive(arr, low, mid - 1, target)  # Search in the left half

    return -1  # Return -1 if target is not found

def main():
    arr = [2, 3, 4, 10, 40]
    target = 10

    result = binary_search_recursive(arr, 0, len(arr) - 1, target)

    if result != -1:
        print("Element found at index", result)
    else:
        print("Element not found")

if __name__ == "__main__":
    main()
```
### Dry Run Examples

We will walk through two detailed dry run examples using the following sample sorted array:

```text
Indices:   0   1   2   3   4   5   6   7   8   9
Array:   [ 2,  5,  8, 12, 16, 23, 38, 56, 72, 91 ]
```

---

#### Example 1: Target Element Exists (Target = 23)

We search for the target value `23` in the array.

##### **Step-by-Step Execution**

###### **Iteration 1**
- **Search Space**: Index `0` to `9` (entire array).
- **Pointers**: `low = 0`, `high = 9`
- **Midpoint Calculation**:
  $\text{mid} = \text{low} + \frac{\text{high} - \text{low}}{2} = 0 + \frac{9 - 0}{2} = 4$
- **Middle Element**: `arr[mid] = arr[4] = 16`
- **Visual Representation**:
  ```text
  Indices:    0   1   2   3  [4]   5   6   7   8   9
  Array:    [ 2,  5,  8, 12,  16, 23, 38, 56, 72, 91 ]
              ^                ^                   ^
             low              mid                 high
  ```
- **Comparison & Decision**:
  - `arr[mid]` ($16$) is **less than** target ($23$).
  - Since the array is sorted, the target must reside in the right half of the current search space.
  - We discard the left half by updating: `low = mid + 1 = 5`.

###### **Iteration 2**
- **Search Space**: Index `5` to `9`.
- **Pointers**: `low = 5`, `high = 9`
- **Midpoint Calculation**:
  $$\text{mid} = 5 + \frac{9 - 5}{2} = 7$$
- **Middle Element**: `arr[mid] = arr[7] = 56`
- **Visual Representation**:
  ```text
  Indices:    0   1   2   3   4   5   6  [7]   8   9
  Array:    [ -   -   -   -   -  23, 38,  56, 72, 91 ]
                                 ^       ^       ^
                                low     mid     high
  ```
- **Comparison & Decision**:
  - `arr[mid]` ($56$) is **greater than** target ($23$).
  - The target must reside in the left half of the remaining search space.
  - We discard the right half by updating: `high = mid - 1 = 6`.

###### **Iteration 3**
- **Search Space**: Index `5` to `6`.
- **Pointers**: `low = 5`, `high = 6`
- **Midpoint Calculation**:
  $$\text{mid} = 5 + \frac{6 - 5}{2} = 5$$
- **Middle Element**: `arr[mid] = arr[5] = 23`
- **Visual Representation**:
  ```text
  Indices:    0   1   2   3   4  [5]   6   7   8   9
  Array:    [ -   -   -   -   -  23, 38,  -   -   -  ]
                                 ^   ^
                             low,mid high
  ```
- **Comparison & Decision**:
  - `arr[mid]` ($23$) is **equal to** target ($23$).
  - Target is found! We return index `5`.

##### **Summary of Execution (Success Case)**

| Iteration | Low | High | Mid | Mid Value (`arr[mid]`) | Comparison | Action taken |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | 0 | 9 | 4 | 16 | `16 < 23` | Target is larger. Search right half: `low = mid + 1 = 5` |
| **2** | 5 | 9 | 7 | 56 | `56 > 23` | Target is smaller. Search left half: `high = mid - 1 = 6` |
| **3** | 5 | 6 | 5 | 23 | `23 == 23` | **Target found at index 5!** |

---

#### Example 2: Target Element Does Not Exist (Target = 10)

We search for the target value `10` in the same array.

##### **Step-by-Step Execution**

###### **Iteration 1**
- **Pointers**: `low = 0`, `high = 9`
- **Midpoint**: `mid = 4`, `arr[mid] = 16`
- **Visual**:
  ```text
  Indices:    0   1   2   3  [4]   5   6   7   8   9
  Array:    [ 2,  5,  8, 12,  16, 23, 38, 56, 72, 91 ]
              ^                ^                   ^
             low              mid                 high
  ```
- **Comparison**: `16 > 10`. Target is smaller, so search left half: `high = mid - 1 = 3`.

###### **Iteration 2**
- **Pointers**: `low = 0`, `high = 3`
- **Midpoint**: `mid = 0 + (3 - 0) / 2 = 1`, `arr[mid] = arr[1] = 5`
- **Visual**:
  ```text
  Indices:    0  [1]   2   3   4   5   6   7   8   9
  Array:    [ 2,  5,  8, 12,  -   -   -   -   -   -  ]
              ^    ^       ^
             low  mid     high
  ```
- **Comparison**: `5 < 10`. Target is larger, so search right half: `low = mid + 1 = 2`.

###### **Iteration 3**
- **Pointers**: `low = 2`, `high = 3`
- **Midpoint**: `mid = 2 + (3 - 2) / 2 = 2`, `arr[mid] = arr[2] = 8`
- **Visual**:
  ```text
  Indices:    0   1  [2]   3   4   5   6   7   8   9
  Array:    [ -   -   8, 12,  -   -   -   -   -   -  ]
                      ^    ^
                  low,mid high
  ```
- **Comparison**: `8 < 10`. Target is larger, so search right half: `low = mid + 1 = 3`.

###### **Iteration 4**
- **Pointers**: `low = 3`, `high = 3`
- **Midpoint**: `mid = 3`, `arr[mid] = arr[3] = 12`
- **Visual**:
  ```text
  Indices:    0   1   2  [3]   4   5   6   7   8   9
  Array:    [ -   -   -  12,  -   -   -   -   -   -  ]
                          ^
                     low,mid,high
  ```
- **Comparison**: `12 > 10`. Target is smaller, so search left half: `high = mid - 1 = 2`.

##### **Termination**
- **State**: `low = 3`, `high = 2`.
- Since `low > high`, the search space has collapsed completely, meaning the target element `10` is not present in the array.

##### **Summary of Execution (Failure Case)**

| Iteration | Low | High | Mid | Mid Value (`arr[mid]`) | Comparison | Action taken |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | 0 | 9 | 4 | 16 | `16 > 10` | Target is smaller. Search left half: `high = mid - 1 = 3` |
| **2** | 0 | 3 | 1 | 5 | `5 < 10` | Target is larger. Search right half: `low = mid + 1 = 2` |
| **3** | 2 | 3 | 2 | 8 | `8 < 10` | Target is larger. Search right half: `low = mid + 1 = 3` |
| **4** | 3 | 3 | 3 | 12 | `12 > 10` | Target is smaller. Search left half: `high = mid - 1 = 2` |
| **End** | 3 | 2 | - | - | `low > high` | **Loop terminates. Target not found.** |

---

### Variations of Binary Search:

- **Finding the First or Last Occurrence**:
  - Binary search can be modified to find the first or last occurrence of a target element in a sorted array. This is useful when the array contains duplicate elements.

- **Finding the Smallest/Largest Element Greater/Less than Target**:
  - Binary search can be adapted to find the smallest element greater than the target or the largest element less than the target. This is known as a lower or upper bound search.

### Use Cases:

- **Efficient Search in Sorted Data**:
  - Binary search is often used in large datasets, such as databases, to perform efficient lookups or range queries in sorted data.

- **Searching in Static Data**:
  - When the dataset doesn't change often, binary search is the preferred choice due to its efficiency, especially for read-heavy applications.

- **Standard Library Implementations**:
  - Many programming languages provide binary search implementations in their standard libraries. In C++, the `std::binary_search` function can be used directly to search sorted containers like `vector` or `array`.

### Advantages and Disadvantages:

#### Advantages:
- **Efficient for Large Datasets**:
  - Binary search drastically reduces the number of comparisons needed to find an element, making it ideal for large, sorted arrays.

- **Logarithmic Time Complexity**:
  - The O(log n) time complexity makes binary search much faster than linear search for large datasets.

- **Low Memory Usage**:
  - The iterative version of binary search has a constant space complexity of O(1), making it memory efficient.

#### Disadvantages:
- **Requires Sorted Data**:
  - Binary search can only be applied to sorted arrays, limiting its use in scenarios where the data is unsorted.

- **Poor Performance on Small Datasets**:
  - For small datasets, the overhead of calculating midpoints and repeatedly halving the search space may make binary search less efficient than linear search.

- **Not Suitable for Linked Lists**:
  - Binary search requires random access to elements (i.e., indexing), which is not possible in linked lists or other sequential data structures.

### Optimizations and Applications:

- **Exponential Search**:
  - When the size of the array is unknown or infinite, binary search can be combined with exponential search to first find a range where the target might exist and then apply binary search within that range.

- **Ternary Search**:
  - A variation of binary search, called **ternary search**, divides the array into three parts instead of two, and performs two comparisons per iteration. It works well for unimodal functions but is rarely faster than binary search.

### Summary:

Binary search is an efficient and widely-used algorithm for searching through large, sorted datasets. It operates in O(log n) time complexity, making it far superior to linear search for large arrays. Binary search is well-suited for scenarios where the dataset is static or sorted in advance, such as in databases or ordered lists. While it is not suitable for unsorted data or linked lists, its power in sorted datasets makes it a fundamental algorithm in computer science.
