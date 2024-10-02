---
id: matrix-problems
title:  Matrix Practice Problems
sidebar_label: Matrix Practice Problems
sidebar_position: 2
description: "A matrix is a two-dimensional data structure consisting of rows and columns, where each element is identified by its row and column index. It is commonly used in various fields, including mathematics, computer science, and data analysis, to represent and manipulate structured data. "
tags: [dsa, data-structures, Matrix ]
---

## Sort the given matrix

Given a n x n matrix. The problem is to sort the given matrix in strict order. Here strict order means that the matrix is sorted in a way such that all elements in a row are sorted in increasing order and for row ‘i’, where ```1 <= i <= n-1```, the first element of row ‘i’ is greater than or equal to the last element of row ‘i-1’.

**Examples:** 
```
Input : mat[][] = { {5, 4, 7},
                    {1, 3, 8},
                    {2, 9, 6} }
Output : 1 2 3
         4 5 6
         7 8 9
```
## Solution
```python
# Python program for the above approach
# driver code
v = [[5,4,7], [1,3,8], [2,9,6]]
n = len(v)
 
x = []
for i in range(n):
    for j in range(n):
        x.append(v[i][j])
 
x.sort()
k = 0
for i in range(n):
    for j in range(n):
        v[i][j] = x[k]
        k += 1
 
print("Sorted Matrix will be: ")
for i in range(n):
    for j in range(n):
        print(v[i][j], end=" ")
    print("")
 
# THIS CODE IS CONTRIBUTED BY Dhairya Gothi(dhairyagothi)
```

## Output
Sorted Matrix Will be:
```
1 2 3 
4 5 6 
7 8 9 
```
**Time Complexity:** O(n2log2n), O(n*n) for traversing, and O(n2log2n) for sorting the vector x, which has a size of n2. So overall time complexity is O(n2log2n).
**Auxiliary Space:** O(n*n), For vector.

## Program for scalar multiplication of a matrix

Given a matrix and a scalar element k, our task is to find out the scalar product of that matrix. 

**Examples:** 
```
Input : mat[][] = {{2, 3}
                   {5, 4}}
        k = 5
Output : 10 15 
         25 20 
We multiply 5 with every element.

Input : 1 2 3 
        4 5 6
        7 8 9
        k = 4
Output :  4 8  12
          16 20 24
          28 32 36 
The scalar multiplication of a number k(scalar), multiply it on every entry in the matrix. and a matrix A is the matrix kA.
 ```

```python
# Python 3 program to find the scalar 
# product of a matrix
 
# Size of given matrix
N = 3
 
def scalarProductMat( mat, k):
 
    # scalar element is multiplied 
    # by the matrix
    for i in range( N):
        for j in range( N): 
            mat[i][j] = mat[i][j] * k     
 
# Driver code
if __name__ == "__main__":
     
    mat = [[ 1, 2, 3 ],
           [ 4, 5, 6 ],
           [ 7, 8, 9 ]]
    k = 4
 
    scalarProductMat(mat, k)
 
    # to display the resultant matrix
    print("Scalar Product Matrix is : ")
    for i in range(N):
        for j in range(N):
            print(mat[i][j], end = " ")
        print()
 
# This code is contributed by dhairya
```
## Output: 
```
Scalar Product Matrix is : 
4 8 12 
16 20 24 
28 32 36
```
 

**ime Complexity:** O(n2),

**Auxiliary Space:** O(1), since no extra space has been taken.

