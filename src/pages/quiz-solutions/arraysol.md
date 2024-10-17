
# Array Quiz Solutions

## Questions and Answers

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
- **Explanation:** In C++, array subscripting works in both ways. arr[0] is the same as 0[arr]. Hence, 0[arr] gives the first element of the array (1), and 1[arr] gives the second element (2). Therefore, the output is 1, 2.



### 2. The minimum number of comparisons required to determine if an integer appears more than n/2 times in a sorted array of n integers is
- **Options:**
  - A) Θ(n)
  - B) Θ(logn)
  - C) Θ(n*logn)
  - D) Θ(1)
- **Answer:** A) Θ(n)
- **Explanation:** In a sorted array, once you find a majority element (if it exists), you only need to perform a linear scan to count its occurrences and verify if it appears more than n/2 times. Thus, the minimum number of comparisons is Θ(n).



### 3. An algorithm performs (logN) find operations, N insert operations, (logN) delete operations, and (logN) decrease-key operations on a set of data items with keys drawn from a linearly ordered set. Which one of the following data structures is most suited for the algorithm to achieve the best total asymptotic complexity?
- **Options:**
  - A) Unsorted array
  - B) Min-heap
  - C) Sorted array
  - D) Sorted doubly linked list
- **Answer:** B) Min-heap
- **Explanation:** Min-heaps are optimal for algorithms that require frequent insertion, deletion, and decrease-key operations. A min-heap supports insertions in O(log N) time and is efficient for find-minimum and delete-minimum operations, making it ideal for this problem.

### 4. Consider an array consisting of –ve and +ve numbers. What would be the worst-case time complexity of an algorithm to segregate the numbers having the same sign altogether?
- **Options:**
  - A) O(N)
  - B) O(N Log N)
  - C) O(N * N)
  - D) O(N Log Log N)
- **Answer:** A) O(N)
- **Explanation:**This problem can be solved in linear time by using the two-pointer technique, one starting at the beginning and the other at the end. Thus, the worst-case time complexity is O(N).



### 5. Let A[1...n] be an array of n distinct numbers. If i < j and A[i] > A[j], then the pair (i, j) is called an inversion of A. What is the expected number of inversions in any permutation on n elements?
- **Options:**
  - A) n(n-1)/2
  - B) n(n-1)/4
  - C) n(n+1)/4
  - D) 2n[logn]
- **Answer:** A) n(n-1)/2
- **Explanation:**  An inversion occurs when two elements are out of order. In a worst-case scenario (a completely reverse sorted array), the number of inversions is n(n-1)/2, which is the maximum number of comparisons needed to sort the array.



### 6. Consider a two-dimensional array A[20][10]. Assume 4 words per memory cell, the base address of array A is 100, elements are stored in row-major order. What is the address of A[11][5]?
- **Options:**
  - A) 560
  - B) 460
  - C) 570
  - D) 575
- **Answer:** A) 560
- **Explanation:** In row-major order, the address of A[i][j] is calculated as:
address(A[i][j]) = base_address + (i × number_of_columns + j) × word_size
Given the base address is 100 and each memory cell contains 4 words:
address(A[11][5]) = 100 + (11 × 10 + 5) × 4 = 560



### 7. An array A consists of n integers in locations A[0], A[1], ..., A[n-1]. Complete the following algorithm to cyclically shift the elements of the array to the left by k places:
```plaintext
min = n; i = 0;
while (___________) {
    temp = A[i]; j = i;
    while (________) {
        A[j] = ________;
        j= (j + k) mod n;
        if (j < min) then min = j;
    }
    A[(n + i — k) mod n] = _________;
    i = __________;
}
```
- **Options:**
  - A) i > min; j != (n+i) mod n; A[j + k]; temp; i + 1;
  - B) i < min; j != (n+i) mod n; A[j + k]; temp; i + 1;
  - C) i > min; j != (n+i+k) mod n; A[(j + k)]; temp; i + 1;
  - D) i < min; j != (n+i-k) mod n; A[(j + k)]; temp; i + 1;
- **Answer:** A) i > min; j != (n+i) mod n; A[j + k]; temp; i + 1;
- **Explanation:**  This is a classic cyclic shift problem. The logic in the given solution ensures that elements are shifted by k positions and the array is rotated cyclically by adjusting the index using modulo arithmetic.

### 8. Which of the following correctly declares an array?
- **Options:**
  - A) int algo[20];
  - B) int algo;
  - C) algo{20};
  - D) array algo[20];
- **Answer:** A) int algo[20];
- **Explanation:** The correct syntax for declaring an array in C++ is int algo[20];, which allocates space for an array of 20 integers. Other options either have incorrect syntax or declare variables instead of arrays.


### 9. A three-dimensional array in ‘C++’ is declared as int A[x][y][z]. What is the address of an item at the location A[p][q][r]?
- **Options:**
  - A) &A[0][0][0] + w(y * z * q + z * p + r)
  - B) &A[0][0][0] + w(y * z * p + z * q + r)
  - C) &A[0][0][0] + w(x * y * p + z * q + r)
  - D) &A[0][0][0] + w(x * y * q + z * p + r)
- **Answer:** A) &A[0][0][0] + w(y * z * q + z * p + r)
- **Explanation:**In a 3D array, the address calculation for an element A[p][q][r] depends on the dimensions and the storage order (row-major). The formula &A[0][0][0] + w(y * z * p + z * q + r) is used for row-major ordering.


### 10. Let A be a square matrix of size n x n. What is the expected output of the following program?
```plaintext
C = 100
for i = 1 to n do
    for j = 1 to n do
    {
        Temp = A[i][j] + C
        A[i][j] = A[j][i]
        A[j][i] = Temp - C
    }
for i = 1 to n do
    for j = 1 to n do
        Output(A[i][j]);
```
- **Options:**
  - A) Output the transposed matrix
  - B) Output the original matrix
  - C) Output an identity matrix
  - D) Output an error
- **Answer:** A) Output the transposed matrix
- **Explanation:** The code swaps elements A[i][j] with A[j][i], effectively transposing the matrix. The use of a temporary variable ensures that the original values are preserved during the swap. Hence, the final output is the transposed matrix.


