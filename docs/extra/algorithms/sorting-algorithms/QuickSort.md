---

id: quick-sort-algo  
sidebar_position: 5  
title: Quick Sort  
sidebar_label: Quick Sort  

---

### Definition:

Quick sort is a **divide-and-conquer** sorting algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two subarrays, according to whether they are less than or greater than the pivot. The subarrays are then recursively sorted. This process of partitioning and sorting leads to a highly efficient sorting algorithm.

### Video Explanation

<LiteYouTubeEmbed
  id="7h1s2SojIRw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="2.8.1 QuickSort Algorithm"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

### Characteristics:

- **Divide and Conquer**:
  - Quick sort partitions the array into smaller subarrays and sorts them independently before merging the results back together.

- **In-Place Sorting**:
  - It sorts the array in place and typically requires little additional memory, only for recursive calls.

- **Unstable**:
  - Quick sort is an unstable algorithm, meaning it does not guarantee that the relative order of equal elements will be maintained.

- **Efficient for Large Datasets**:
  - Quick sort is one of the fastest sorting algorithms in practice, especially for large datasets, and has excellent cache performance.

### Time Complexity:

- **Best Case: O(n log n)**  
  In the best case, the pivot divides the array into two nearly equal subarrays, leading to a logarithmic number of comparisons across each recursive call.

- **Average Case: O(n log n)**  
  On average, quick sort partitions the array into balanced subarrays, leading to an O(n log n) time complexity.

- **Worst Case: O(n²)**  
  The worst-case scenario occurs when the pivot chosen is consistently the smallest or largest element, leading to unbalanced partitions and quadratic time complexity. This can be mitigated by using strategies like randomized pivots or choosing the median of three elements as the pivot.

### Space Complexity:

- **Space Complexity: O(log n)**  
  Quick sort requires O(log n) space for recursive calls when the partitioning is balanced. In the worst case (highly unbalanced partitioning), it requires O(n) space for recursion.

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
#include <stack>
using namespace std;

// Partition function to place the pivot element in the correct position
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Pivot is taken as the last element
    int i = (low - 1); // Index of the smaller element

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++; // Increment index of smaller element
            swap(arr[i], arr[j]); // Swap current element with the smaller element
        }
    }
    swap(arr[i + 1], arr[high]); // Place the pivot element in the correct position
    return (i + 1);
}

// Iterative quick sort function
void quickSortIterative(int arr[], int low, int high) {
    stack<int> s;
    s.push(low);
    s.push(high);

    // Keep popping elements until stack is empty
    while (!s.empty()) {
        high = s.top();
        s.pop();
        low = s.top();
        s.pop();

        int p = partition(arr, low, high);

        // If there are elements on the left of the pivot, push them onto the stack
        if (p - 1 > low) {
            s.push(low);
            s.push(p - 1);
        }

        // If there are elements on the right of the pivot, push them onto the stack
        if (p + 1 < high) {
            s.push(p + 1);
            s.push(high);
        }
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int size = sizeof(arr) / sizeof(arr[0]);

    quickSortIterative(arr, 0, size - 1);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

**Recursive Approach (with median-of-three and tail recursion)**
```cpp
#include <iostream>
using namespace std;

// Swap helper
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

// Median-of-three pivot selection to avoid worst-case behavior
int medianOfThree(int arr[], int low, int high) {
    int mid = low + (high - low) / 2;
    if (arr[low] > arr[mid]) swap(arr[low], arr[mid]);
    if (arr[low] > arr[high]) swap(arr[low], arr[high]);
    if (arr[mid] > arr[high]) swap(arr[mid], arr[high]);
    // Place median at the end for Lomuto partition
    swap(arr[mid], arr[high]);
    return arr[high];
}

// Partition function to place the pivot element in the correct position
int partition(int arr[], int low, int high) {
    int pivot = medianOfThree(arr, low, high);
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Optimized quick sort with tail recursion elimination
void quickSortRecursive(int arr[], int low, int high) {
    while (low < high) {
        int pi = partition(arr, low, high);

        // Recurse on smaller partition, iterate on larger (tail recursion)
        if (pi - low < high - pi) {
            quickSortRecursive(arr, low, pi - 1);
            low = pi + 1;
        } else {
            quickSortRecursive(arr, pi + 1, high);
            high = pi - 1;
        }
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int size = sizeof(arr) / sizeof(arr[0]);

    quickSortRecursive(arr, 0, size - 1);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary

Quick sort is a highly efficient and widely used sorting algorithm that works well for large datasets. It employs the divide-and-conquer approach, partitioning the array around a pivot and sorting the subarrays recursively. Although its worst-case time complexity is O(n²), this can be avoided by choosing an appropriate pivot (like the median of three) and using tail recursion elimination. In practice, quick sort is often faster than other O(n log n) algorithms like merge sort due to its in-place sorting nature and better cache performance.

## Complexity Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

## Algorithm Tip
Quick Sort is fast and commonly used in real-world applications for efficient sorting.

## When to Use This Algorithm

Use Quick Sort when:
- Fast average-case sorting is needed
- Memory usage should be low
- Working with large arrays

## Common Mistakes & Mitigations

- Choosing poor pivot elements leading to worst-case performance → use **median-of-three** or randomized pivot
- Incorrect partition logic causing unsorted output → verify Lomuto/Hoare boundary conditions
- Deep recursion causing stack overflow for large datasets → apply **tail recursion elimination** (recurse on smaller partition only)
- Not handling duplicate values efficiently → consider 3-way partition for duplicate-heavy data
