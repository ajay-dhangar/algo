---

id: smawk-algorithm  
sidebar_position: 19  
title: "SMAWK Algorithm"  
sidebar_label: SMAWK Algorithm  

---

### Definition

The **SMAWK Algorithm** is a specialized algorithm for efficiently finding row minima in a certain class of totally monotone matrices. It is primarily used in problems involving dynamic programming on matrices and is an optimization over the brute-force approach of finding the minimum in each row independently.

### Characteristics

- **Algorithm Type**: Dynamic Programming Optimization, Matrix Algorithms.
- **Main Operation**: Finds the minimum element in each row of a totally monotone matrix.
- **Data Structures**: A vector to store the minimum values and another to track the active set of columns.
- **Output**: A vector containing the minimum value of each row in the matrix.

### Time Complexity

- **Average Case**: $O(n \log n)$, where $n$ is the number of rows in the matrix.
- **Worst Case**: $O(n \cdot m)$, where $m$ is the number of columns in the matrix.


### Space Complexity

- **Space Complexity**: $O(n)$, since only a few vectors (of size $n$) are used to store the row minima and the active set.

### Approach

1. **Input**: The algorithm accepts a matrix of size \( n \times m \).
2. **Initialization**: Start with an empty set for active columns and a result vector to store the row minima.
3. **Iterate through Rows**: For each row, find the minimum value and update the result vector.
4. **Active Set**: The algorithm updates the active set to track which columns are involved in the current minimum search.
5. **Output**: Once all rows are processed, the result vector contains the minimum values for each row.


### C++ implementation

```cpp
#include <iostream>
#include <vector>
#include <climits>

using namespace std;

// Function to implement SMAWK Algorithm
vector<int> smawk(const vector<vector<int>>& matrix) {
    int n = matrix.size(); // Number of rows
    int m = matrix[0].size(); // Number of columns
    vector<int> result(n);

    // Initialize active set of columns
    vector<int> activeSet(n, -1);

    for (int i = 0; i < n; ++i) {
        // Starting with the first row, find the minimum element
        int minVal = INT_MAX;
        int minCol = -1;
        for (int j = 0; j < m; ++j) {
            if (matrix[i][j] < minVal) {
                minVal = matrix[i][j];
                minCol = j;
            }
        }
        result[i] = minVal; // Store the minimum value for row i
        activeSet[i] = minCol;
    }

    return result;
}

int main() {
    // Example matrix
    vector<vector<int>> matrix = {
        {1, 2, 3, 4},
        {4, 3, 2, 1},
        {5, 6, 7, 8}
    };

    vector<int> result = smawk(matrix);

    // Output the result
    cout << "Row minima: ";
    for (int val : result) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}
```
---

