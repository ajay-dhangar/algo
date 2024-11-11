---

id: fibonacci-search-algo  
sidebar_position: 5  
title: Fibonacci Search  
sidebar_label: Fibonacci Search  

---

### Definition:

**Fibonacci Search** is a search algorithm that uses the Fibonacci sequence to divide the search space into progressively smaller sections. This method is typically applied to search in **sorted arrays** and can be seen as a variation of binary search but with Fibonacci numbers guiding the search process. The algorithm reduces the search space in steps defined by Fibonacci numbers rather than splitting in half as in binary search.

### Characteristics:

- **Fibonacci Division**:
  - The search space is divided based on Fibonacci numbers, making it useful for optimization in certain cases where the size of the dataset is fixed.

- **Works on Sorted Arrays**:
  - Fibonacci search is specifically designed for sorted arrays, similar to binary search, but offers potential optimizations when the data distribution or hardware access favors Fibonacci-based divisions.

- **Non-Recursive**:
  - Fibonacci search operates iteratively and does not require recursion, making it more memory-efficient for certain applications.

### How Fibonacci Search Works:

1. **Initialize** the Fibonacci numbers and compare the element at the Fibonacci index with the target.
2. **Reduce the search range** by eliminating sections of the array based on Fibonacci steps.
3. Continue comparing and narrowing the search space until the target element is found or the search space is exhausted.

### Time Complexity of Fibonacci Search:

- **Time Complexity**: $O(\log n)$  
  Like binary search, Fibonacci search operates in logarithmic time. However, the divisions occur at positions determined by Fibonacci numbers, which may lead to fewer comparisons in certain scenarios.

### Space Complexity:

- **Space Complexity**: $O(1)$  
  Fibonacci search requires only a few variables to keep track of the Fibonacci numbers and the current index, leading to constant space complexity.

### Advantages of Fibonacci Search:

- **Efficient for Specific Data Sizes**:
  - Fibonacci search can be faster than binary search in cases where the data structure size aligns with Fibonacci numbers, providing optimized search steps.

- **Minimizes Comparisons**:
  - In some cases, Fibonacci search may require fewer comparisons than binary search due to the way the search space is divided.

- **Iterative Implementation**:
  - Fibonacci search is non-recursive, which can be beneficial in environments where recursion is expensive or limited by stack size.

### Disadvantages of Fibonacci Search:

- **Requires Sorted Arrays**:
  - Fibonacci search, like binary search, is only applicable to sorted arrays.

- **Slower in Random Access**:
  - It may not outperform binary search when random access to elements is possible, as binary search divides the array in equal halves, which is often more efficient for arbitrary data sizes.

### Fibonacci Search Algorithm (C++ Implementation):

```cpp
#include <iostream>
using namespace std;

// Fibonacci Search Function
int fibonacciSearch(int arr[], int x, int n) {
    int fibMMm2 = 0; // (m-2)'th Fibonacci number
    int fibMMm1 = 1; // (m-1)'th Fibonacci number
    int fibM = fibMMm2 + fibMMm1; // m'th Fibonacci number

    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    int offset = -1;

    while (fibM > 1) {
        int i = min(offset + fibMMm2, n - 1);

        if (arr[i] < x) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > x) {
            fibM = fibMMm2;
            fibMMm1 -= fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else {
            return i;
        }
    }

    if (fibMMm1 && arr[offset + 1] == x) {
        return offset + 1;
    }

    return -1;
}

int main() {
    int arr[] = {10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 85;

    int result = fibonacciSearch(arr, x, n);
    if (result != -1) {
        cout << "Found at index: " << result << endl;
    } else {
        cout << "Not found." << endl;
    }

    return 0;
}
```

**Recursive Approach**

```cpp
#include <iostream>
using namespace std;

// Recursive Fibonacci Search Function
int fibonacciSearchRecursive(int arr[], int x, int fibMMm2, int fibMMm1, int offset, int n) {
    // Base case: If the Fibonacci number is 1
    if (fibMMm1 == 1) {
        if (offset + 1 < n && arr[offset + 1] == x)
            return offset + 1;
        else
            return -1;
    }

    // Find the index using fibMMm2
    int i = min(offset + fibMMm2, n - 1);

    // If x is greater than the value at index i, cut the subarray from offset to i
    if (arr[i] < x) {
        return fibonacciSearchRecursive(arr, x, fibMMm1 - fibMMm2, fibMMm2, i, n);
    }
    // If x is less than the value at index i, cut the subarray after i+1
    else if (arr[i] > x) {
        return fibonacciSearchRecursive(arr, x, fibMMm2, fibMMm1 - fibMMm2, offset, n);
    }
    // If element is found, return the index
    else {
        return i;
    }
}

// Fibonacci Search Wrapper Function
int fibonacciSearch(int arr[], int x, int n) {
    // Initialize Fibonacci numbers
    int fibMMm2 = 0; // (m-2)'th Fibonacci number
    int fibMMm1 = 1; // (m-1)'th Fibonacci number
    int fibM = fibMMm2 + fibMMm1; // m'th Fibonacci number

    // Generate the smallest Fibonacci number greater than or equal to n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    // Start recursive search
    return fibonacciSearchRecursive(arr, x, fibMMm2, fibMMm1, -1, n);
}

int main() {
    int arr[] = {10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 85;

    int result = fibonacciSearch(arr, x, n);
    if (result != -1) {
        cout << "Found at index: " << result << endl;
    } else {
        cout << "Not found." << endl;
    }

    return 0;
}
```

### Applications of Fibonacci Search:

- **Search in Sorted Arrays:**
    - Used for efficient searching in large datasets where minimizing the number of comparisons is critical.

- **Hardware Optimized Searches:**
    - In certain hardware implementations, Fibonacci search may offer optimizations over binary search, especially in systems where division operations are expensive.

### Summary:


Fibonacci Search is a powerful search algorithm with logarithmic time complexity, making it suitable for large, sorted datasets. While it shares similarities with binary search, its use of Fibonacci numbers for dividing the search space can provide optimizations in specific scenarios. Its iterative nature and constant space complexity make it an attractive option for environments where recursion or memory usage is a concern.
