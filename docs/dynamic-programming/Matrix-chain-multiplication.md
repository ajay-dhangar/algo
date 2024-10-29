---
id: matrix-chain-multiplication
title: Matrix-chain-multiplication
sidebar_label: Matrix-chain-multiplication
description: The program finds the optimal multiplication order for a matrix chain, minimizing scalar multiplications using dynamic programming for efficiency.
tags: [Dynamic Programming,Algorithm, DSA]
---
# SHORTEST PATH IN MULTISTAGE GRAPH
### Description
Given a chain of matrices with specified dimensions, the algorithm computes the optimal order to perform matrix multiplications, minimizing computational cost. The solution uses a dynamic programming table to store intermediate results, which avoids redundant calculations and improves efficiency. Users input the number of matrices and their respective dimensions, and the program outputs the minimum multiplication cost required to multiply the entire chain.
### Approach
The Matrix Chain Multiplication program uses dynamic programming to determine the optimal order for multiplying a sequence of matrices. It builds a 2D table where each entry stores the minimum multiplication cost for a specific subchain of matrices, avoiding redundant calculations. For each possible subchain length, the algorithm evaluates different split points to find the one that yields the lowest cost by recursively considering left and right subchains. The final result in the table provides the minimum cost for multiplying the entire matrix chain, ensuring computational efficiency and optimal performance.
### Algorithm Overview
1. **Define Subproblems**: The main problem is broken down into subchains of matrices, with the goal of minimizing the multiplication cost for each subchain.
2. **Use a DP Table**: A 2D table (`minMul[i][j]`) is created where each entry stores the minimum multiplication cost required to multiply matrices from Mi to Mj
3. **Iterate Over Chain Lengths**: For each subchain length L (from 2 to n ), the algorithm calculates the minimum multiplication cost by evaluating every possible split point k  within each subchain.
4. **Retrieve Result**: The final result, `minMul[1][n-1]`, gives the minimum number of multiplications needed to multiply the entire chain of matrices.
### Example
- **Input**: 
  - Enter the number of matrices: `4`
  - Enter the dimensions of matrices (n+1 integers where nth matrix has dimensions arr[i] x arr[i+1]): `5 10 15 20 25`
- **Output**:
  - Minimum number of multiplications required for the matrices multiplication is `4750`                     
                               
### Time Complexity
- The time complexity of the Matrix Chain Multiplication algorithm is O(n^3) , where `n` is the number of matrices. This results from calculating the minimum multiplication cost for each possible subchain of matrices `O(n^2)` and evaluating each split point within these subchains `O(n)` leading to `O(n)xO(n^2)=O(n^3)`.
### C++ Implementation
```cpp
#include <iostream>
#include <vector>
#include <limits.h>
using namespace std;
int MatrixChainMultiplication(const vector<int>& arr, int n) {
    vector<vector<int>> minMul(n, vector<int>(n, 0));
    int j, q;
	 // L is the chain length; starting from 2 as a single matrix does not need multiplication
    for (int L = 2; L < n; L++) {
        for (int i = 1; i < n - L + 1; i++) {
            j = i + L - 1;
            minMul[i][j] = INT_MAX;
            // Try every possible split point `k` to find the minimum cost for this subchain
            for (int k = i; k <= j - 1; k++) {
            	// Cost of splitting at `k` = cost of left subchain + right subchain + cost of multiplication
                q = minMul[i][k] + minMul[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                if (q < minMul[i][j])
                    minMul[i][j] = q;
            }
        }
    }
    return minMul[1][n - 1];
}
int main() {
    int n;
    cout << "Enter the number of matrices: ";
    cin >> n;
    vector<int> arr(n + 1);
    cout << "Enter the dimensions of matrices (n+1 integers where nth matrix has dimensions arr[i] x arr[i+1]): ";
    for (int i = 0; i < n + 1; i++)
        cin >> arr[i];
    cout << "Minimum number of multiplications required for the matrices multiplication is " 
         << MatrixChainMultiplication(arr, n + 1) << endl;
    return 0;
}
```
