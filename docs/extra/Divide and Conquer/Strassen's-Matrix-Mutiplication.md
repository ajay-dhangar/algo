---
id: strassens-matrix-mutiplication
title: Strassen's-Matrix-Mutiplication
sidebar_label: Strassen's-Matrix-Mutiplication 
description: "Strassen's matrix multiplication is an efficient algorithm that reduces the time complexity of multiplying two matrices."  
tags: [dsa, algorithms, divide and conquer]
---

### Problem Statement:
Given 2 matrix, multiply them such that the time complexity of the calculation is O(n^2.81). You can use divide and conquer approach to achieve the time complexity.

## Algorithm Steps

1. **Input Matrices**: Given two `n x n` matrices, `A` and `B`.

2. **Base Case**: 
   - If `n = 1` , return the product `A[0][0] x B[0][0]` .

3. **Divide**:
   - Split each matrix into four n/2 x n/2 submatrices:
     
4. **Compute Products**:
   - Calculate the following seven products:
     1. P<sub>1</sub> = A<sub>11</sub> x (B<sub>12</sub> - B<sub>22</sub>)
     2. P<sub>2</sub> = (A<sub>11</sub> + A<sub>12</sub>) x B<sub>22</sub>
     3. P<sub>3</sub> = (A<sub>21</sub> + A<sub>22</sub>) x B<sub>11</sub>
     4. P<sub>4</sub> = A<sub>22</sub> x (B<sub>21</sub> - B<sub>11</sub>)
     5. P<sub>5</sub> = (A<sub>11</sub> + A<sub>22</sub>) x (B<sub>11</sub> + B<sub>22</sub>)
     6. P<sub>6</sub> = (A<sub>12</sub> - A<sub>22</sub>) x (B<sub>21</sub> + B<sub>22</sub>)
     7. P<sub>7</sub> = (A<sub>11</sub> - A<sub>21</sub>) x (B<sub>11</sub> + B<sub>12</sub>)

5. **Combine Results**:
   - Compute the four submatrices of the resulting product:
      - C<sub>11</sub> = P<sub>5</sub> + P<sub>4</sub> - P<sub>2</sub> + P<sub>6</sub>
     - C<sub>12</sub> = P<sub>1</sub> + P<sub>2</sub>
     - C<sub>21</sub> = P<sub>3</sub> + P<sub>4</sub>
     - C<sub>22</sub> = P<sub>5</sub> + P<sub>1</sub> - P<sub>3</sub> - P<sub>7</sub>

6. **Combine Submatrices**:
   - Construct the final resulting matrix `C`  from the submatrices.

7. **Output**: Return the resulting matrix `C` .

### Time Complexity:
- The time complexity of Strassen's algorithm for matrix multiplication is  `O(n^2.81)`. This is an improvement over the conventional matrix multiplication's. Strassen's algorithm reduces the number of multiplicative operations by recursively dividing matrices into smaller submatrices, making it more efficient for large matrices, though it may incur overhead from additional additions and subtractions.

### Space Complexity:
- The space complexity of Strassen's matrix multiplication algorithm is `O(n)`, where `n` is the dimension of the matrices. This complexity arises from the additional space needed to store the temporary matrices used in the recursive calculations. While Strassen's algorithm requires fewer multiplicative operations, it still utilizes linear space to hold the intermediate results, making it more space-efficient than traditional methods, which typically require `O(n^2)` space for the resulting matrix.

### Sample Input:
    Enter the elements of the first matrix (2x2):
    5 10
    15 20
    Enter the elements of the second matrix (2x2):
    6 8
    9 2

### Sample Output:
    The resultant matrix is:
    120     60
    270     160


### C++ Implementation:

```cpp

#include <iostream>
using namespace std;

int main() {
    int matrixA[2][2], matrixB[2][2], resultMatrix[2][2];
    int p1, p2, p3, p4, p5, p6, p7;
    
    cout << "Enter the elements of the first matrix (2x2):\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++)
            cin >> matrixA[i][j];
    }

    cout << "Enter the elements of the second matrix (2x2):\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++)
            cin >> matrixB[i][j];
    }


    p1 = (matrixA[0][0] + matrixA[1][1]) * (matrixB[0][0] + matrixB[1][1]);
    p2 = (matrixA[1][0] + matrixA[1][1]) * matrixB[0][0];
    p3 = matrixA[0][0] * (matrixB[0][1] - matrixB[1][1]);
    p4 = matrixA[1][1] * (matrixB[1][0] - matrixB[0][0]);
    p5 = (matrixA[0][0] + matrixA[0][1]) * matrixB[1][1];
    p6 = (matrixA[1][0] - matrixA[0][0]) * (matrixB[0][0] + matrixB[0][1]);
    p7 = (matrixA[0][1] - matrixA[1][1]) * (matrixB[1][0] + matrixB[1][1]);

    resultMatrix[0][0] = p1 + p4 - p5 + p7;
    resultMatrix[0][1] = p3 + p5;
    resultMatrix[1][0] = p2 + p4;
    resultMatrix[1][1] = p1 - p2 + p3 + p6;

    cout << "\nThe resultant matrix is:\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++)
            cout << resultMatrix[i][j] << "\t";
        cout << "\n";
    }

    return 0;
}

```
