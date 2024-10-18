---
id: maximum-sum-sub-square-matrix
title: Maximum Sum Sub-square Matrix
sidebar_label: Maximum Sum Sub-square Matrix
sidebar_position: 1
description: This document provides a detailed explanation and implementation for finding the maximum sum of a k x k sub-square matrix within a given n x n matrix.
tags: [DSA, algorithms, matrix]
---

## Problem: Maximum Sum Sub-square Matrix

### Problem Statement
Given a square matrix of size `N x N`, find the sub-square of size `k x k` that has the maximum sum. The objective is to efficiently compute the sum of all possible k x k sub-squares and identify the one with the highest sum.

### Approach
The approach to solve this problem involves two main steps:

1. **Preprocessing Strip Sums**: Calculate the sums of all strips of size `k x 1` for each column in the matrix. This will help in efficiently calculating the sum of k x k sub-squares.
2. **Sum Calculation of Sub-squares**: Use the precomputed strip sums to calculate the sum of each k x k sub-square by summing up the relevant strip sums.

### Complexity Analysis
- **Time Complexity**: The solution operates in O(N^2) time, where N is the dimension of the matrix.
- **Space Complexity**: O(N^2) due to the storage of the strip sums.

### Solution in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

#define N 5

// A O(n^2) function to find the maximum sum sub-squares of size k x k in a given matrix of size n x n
void printMaxSumSub(int mat[][N], int k) {
    // k must be smaller than or equal to n
    if (k > N)
        return;

    // Step 1: Preprocess - To store sums of all strips of size k x 1
    int stripSum[N][N];

    // Column-wise sum calculation
    for (int j = 0; j < N; j++) {
        int sum = 0;
        // Calculate sum of first k x 1 rectangle in this column
        for (int i = 0; i < k; i++)
            sum += mat[i][j];
        stripSum[0][j] = sum;

        // Calculate sum of remaining rectangles
        for (int i = 1; i < N - k + 1; i++) {
            sum += (mat[i + k - 1][j] - mat[i - 1][j]);
            stripSum[i][j] = sum;
        }
    }

    // Step 2: Calculate sum of k x k sub-squares using stripSum
    int max_sum = INT_MIN, *pos = nullptr;

    for (int i = 0; i < N - k + 1; i++) {
        int sum = 0;
        // Calculate the sum of the first subsquare in this row
        for (int j = 0; j < k; j++)
            sum += stripSum[i][j];

        // Update max_sum and position if needed
        if (sum > max_sum) {
            max_sum = sum;
            pos = &(mat[i][0]);
        }

        // Calculate sum of remaining sub-squares in this row
        for (int j = 1; j < N - k + 1; j++) {
            sum += (stripSum[i][j + k - 1] - stripSum[i][j - 1]);

            // Update max_sum and position if needed
            if (sum > max_sum) {
                max_sum = sum;
                pos = &(mat[i][j]);
            }
        }
    }

    // Print the resulting maximum sum k x k matrix
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < k; j++)
            cout << *(pos + i * N + j) << " ";
        cout << endl;
    }
}

// Driver code to test the above function
int main() {
    int mat[N][N] = {
        { 1, 1, 1, 1, 1 },
        { 2, 2, 2, 2, 2 },
        { 3, 8, 6, 7, 3 },
        { 4, 4, 4, 4, 4 },
        { 5, 5, 5, 5, 5 },
    };
    int k = 3;

    cout << "Maximum sum 3 x 3 matrix is\n";
    printMaxSumSub(mat, k);

    return 0;
}
```
