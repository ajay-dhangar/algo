---
title: Array Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Array Quiz Solutions</h1>

<main className="mx-2 p-6">

### 1. What will the output of the below code?

```cpp
#include <iostream>
using namespace std;

int main()
{
    int arr[2] = { 1, 2 };
    cout << 0[arr] << ", " << 1[arr] << endl;
    return 0;
}
```
- **Options:**
  - A) 1, 2
  - B) Syntax error
  - C) Run time error
  - D) None
- **Answer:** A) 1, 2

<details>
  <summary><b>Explanation:</b></summary>
  In C++, array subscripting works in both ways. `arr[0]` is the same as `0[arr]`. Hence, `0[arr]` gives the first element of the array (1), and `1[arr]` gives the second element (2). Therefore, the output is 1, 2.
</details>

<Ads />

### 2. The minimum number of comparisons required to determine if an integer appears more than n/2 times in a sorted array of n integers is
- **Options:**
  - A) Θ(n)
  - B) Θ(logn)
  - C) Θ(n*logn)
  - D) Θ(1)
- **Answer:** A) Θ(n)

<details>
  <summary><b>Explanation:</b></summary>
  In a sorted array, once you find a majority element (if it exists), you only need to perform a linear scan to count its occurrences and verify if it appears more than n/2 times. Thus, the minimum number of comparisons is Θ(n).
</details>

<AdsComponent />

### 3. An algorithm performs (logN) find operations, N insert operations, (logN) delete operations, and (logN) decrease-key operations on a set of data items with keys drawn from a linearly ordered set. Which one of the following data structures is most suited for the algorithm to achieve the best total asymptotic complexity?
- **Options:**
  - A) Unsorted array
  - B) Min-heap
  - C) Sorted array
  - D) Sorted doubly linked list
- **Answer:** B) Min-heap

<details>
  <summary><b>Explanation:</b></summary>
  Min-heaps are optimal for algorithms that require frequent insertion, deletion, and decrease-key operations. A min-heap supports insertions in O(log N) time and is efficient for find-minimum and delete-minimum operations, making it ideal for this problem.
</details>

<Ads />

### 4. Consider a two-dimensional array consisting of –ve and +ve numbers. What would be the worst-case time complexity of an algorithm to segregate the numbers having the same sign altogether?
- **Options:**
  - A) O(N)
  - B) O(N Log N)
  - C) O(N * N)
  - D) O(N Log Log N)
- **Answer:** A) O(N)

<details>
  <summary><b>Explanation:</b></summary>
  This problem can be solved in linear time by using the two-pointer technique, one starting at the beginning and the other at the end. Thus, the worst-case time complexity is O(N).
</details>

<AdsComponent />

### 5. Let A[1...n] be an array of n distinct numbers. If i < j and A[i] > A[j], then the pair (i, j) is called an inversion of A. What is the expected number of inversions in any permutation on n elements?
- **Options:**
  - A) n(n-1)/2
  - B) n(n-1)/4
  - C) n(n+1)/4
  - D) 2n[logn]
- **Answer:** A) n(n-1)/2

<details>
  <summary><b>Explanation:</b></summary>
  An inversion occurs when two elements are out of order. In a worst-case scenario (a completely reverse sorted array), the number of inversions is n(n-1)/2, which is the maximum number of comparisons needed to sort the array.
</details>

<Ads />

<h2 className="text-center text-gray-800 dark:text-gray-200">
Now, let's Discuss!
</h2>

<GiscusComponent />

</main>