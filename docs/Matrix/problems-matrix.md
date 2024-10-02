---
id: matrix-problems
title: Matrix Practice Problems
sidebar_label: Matrix Practice Problems
sidebar_position: 2
description: "A matrix is a two-dimensional data structure consisting of rows and columns, where each element is identified by its row and column index. It is commonly used in various fields, including mathematics, computer science, and data analysis, to represent and manipulate structured data."
tags: [dsa, data-structures, Matrix]
---

## Sort the Given Matrix

Given an `n x n` matrix, the problem is to sort the given matrix in strict order. **Strict order** means that the matrix is sorted such that all elements in each row are sorted in increasing order. For row `i`, where `1 <= i <= n-1`, the first element of row `i` is greater than or equal to the last element of row `i-1`.

**Examples:** 
```
Input: mat[][] = {{5, 4, 7},
                  {1, 3, 8},
                  {2, 9, 6}}

Output: 1 2 3
        4 5 6
        7 8 9
```

### Solution
```python
# Python program for sorting the matrix in strict order

# Input matrix
v = [[5, 4, 7], [1, 3, 8], [2, 9, 6]]
n = len(v)

# Flatten the matrix into a list
x = [v[i][j] for i in range(n) for j in range(n)]

# Sort the flattened list
x.sort()

# Insert sorted elements back into the matrix
k = 0
for i in range(n):
    for j in range(n):
        v[i][j] = x[k]
        k += 1

# Print the sorted matrix
print("Sorted Matrix will be: ")
for i in range(n):
    for j in range(n):
        print(v[i][j], end=" ")
    print("")
```

### Output:
```
Sorted Matrix will be: 
1 2 3 
4 5 6 
7 8 9
```

**Time Complexity:**  
- Sorting: $O(n^2 \log n)$ where $n$ is the number of elements in the matrix.  
- Traversing the matrix to collect elements: $O(n^2)$.  
So, the overall time complexity is $O(n^2 \log n)$.

**Auxiliary Space:**  
- $O(n^2)$ for storing the matrix elements in a flattened list.

---

## Program for Scalar Multiplication of a Matrix

Given a matrix and a scalar element $k$, our task is to compute the scalar product of the matrix, where each element is multiplied by $k$.

**Examples:** 
```
Input: mat[][] = {{2, 3},
                  {5, 4}}
       k = 5

Output: 10 15
        25 20

Input: mat[][] = {{1, 2, 3},
                  {4, 5, 6},
                  {7, 8, 9}}
       k = 4

Output: 4  8  12
        16 20 24
        28 32 36
```

### Solution
```python
# Python program for scalar multiplication of a matrix

def scalarProductMat(mat, k):
    N = len(mat)  # Get the size of the matrix
    # Multiply each element of the matrix by k
    for i in range(N):
        for j in range(N):
            mat[i][j] *= k

# Driver code
if __name__ == "__main__":
    mat = [[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]]
    k = 4

    # Perform scalar multiplication
    scalarProductMat(mat, k)

    # Print the result
    print("Scalar Product Matrix is: ")
    for row in mat:
        print(" ".join(map(str, row)))
```

### Output:
```
Scalar Product Matrix is:
4 8 12
16 20 24
28 32 36
```

**Time Complexity:**  
- $O(n^2)$, where $ n $ is the dimension of the matrix.

**Auxiliary Space:**  
- $O(1)$, since the operation is performed in place.
