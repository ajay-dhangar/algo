---

id: strassen-algorithm  
sidebar_position: 4  
title: Strassen's Algorithm for Matrix Multiplication  
sidebar_label: Strassen's Algorithm  

---

### Definition:

**Strassen's Algorithm** is an efficient algorithm for matrix multiplication that reduces the number of multiplicative operations required compared to the standard matrix multiplication algorithm. By recursively dividing matrices into smaller submatrices and using a clever combination of additions and multiplications, Strassen's Algorithm achieves better performance, especially for large matrices.

### Characteristics:

- **Divide**:
  - Divide each matrix into four equal-sized submatrices.

- **Conquer**:
  - Use recursive calls to compute the products of these submatrices, requiring fewer multiplications than the naive approach.

- **Combine**:
  - Combine the computed products to form the resultant matrix using additions and subtractions.

- **Reduced Multiplications**:
  - Strassen's algorithm performs only 7 multiplications for two \(2 \times 2\) matrices instead of the 8 required in the standard approach.

### Time Complexity:

- **Time Complexity: O(n^{\log_2 7}) ≈ O(n^{2.81})**  
  Strassen's algorithm reduces the complexity of multiplying two \(n \times n\) matrices from \(O(n^3)\) to approximately \(O(n^{2.81})\).

### Space Complexity:

- **Space Complexity: O(n)**  
  The space complexity mainly arises from the storage of submatrices and the intermediate results. In the recursive approach, additional space is used for function calls on the call stack.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to add two matrices
vector<vector<int>> add(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();
    vector<vector<int>> C(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    return C;
}

// Function to subtract two matrices
vector<vector<int>> subtract(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();
    vector<vector<int>> C(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }
    return C;
}

// Function to perform Strassen's Matrix Multiplication
vector<vector<int>> strassen(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();
    
    // Base case for 1x1 matrix
    if (n == 1) {
        return vector<vector<int>>{{A[0][0] * B[0][0]}};
    }

    // Divide the matrices into quadrants
    int k = n / 2;
    vector<vector<int>> A11(k, vector<int>(k)), A12(k, vector<int>(k)), A21(k, vector<int>(k)), A22(k, vector<int>(k));
    vector<vector<int>> B11(k, vector<int>(k)), B12(k, vector<int>(k)), B21(k, vector<int>(k)), B22(k, vector<int>(k));
    
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < k; j++) {
            A11[i][j] = A[i][j];             // Top-left
            A12[i][j] = A[i][j + k];         // Top-right
            A21[i][j] = A[i + k][j];         // Bottom-left
            A22[i][j] = A[i + k][j + k];     // Bottom-right
            
            B11[i][j] = B[i][j];             // Top-left
            B12[i][j] = B[i][j + k];         // Top-right
            B21[i][j] = B[i + k][j];         // Bottom-left
            B22[i][j] = B[i + k][j + k];     // Bottom-right
        }
    }

    // Compute the 7 products using Strassen's formulas
    auto M1 = strassen(add(A11, A22), add(B11, B22)); // M1 = (A11 + A22)(B11 + B22)
    auto M2 = strassen(add(A21, A22), B11);           // M2 = (A21 + A22)B11
    auto M3 = strassen(A11, subtract(B12, B22));      // M3 = A11(B12 - B22)
    auto M4 = strassen(A22, subtract(B21, B11));      // M4 = A22(B21 - B11)
    auto M5 = strassen(add(A11, A12), B22);           // M5 = (A11 + A12)B22
    auto M6 = strassen(subtract(A21, A11), add(B11, B12)); // M6 = (A21 - A11)(B11 + B12)
    auto M7 = strassen(subtract(A12, A22), add(B21, B22)); // M7 = (A12 - A22)(B21 + B22)

    // Combine results to get the final matrix
    vector<vector<int>> C(n, vector<int>(n));
    C = add(C, M1);
    C = add(C, M4);
    C = subtract(C, M5);
    C = add(C, M7);
    C[0][k] = add(M3, M5)[0][0];      // Top-right
    C[k][0] = add(M2, M4)[0][0];      // Bottom-left
    C[k][k] = subtract(add(M1, M3), add(M2, M6))[0][0]; // Bottom-right

    return C;
}

// Driver code
int main() {
    vector<vector<int>> A = {
        {1, 2},
        {3, 4}
    };
    
    vector<vector<int>> B = {
        {5, 6},
        {7, 8}
    };
    
    vector<vector<int>> result = strassen(A, B);

    cout << "Resultant Matrix: \n";
    for (const auto& row : result) {
        for (const auto& elem : row) {
            cout << elem << " ";
        }
        cout << endl;
    }

    return 0;
}
```

### Explanation of the Code:

1. **Matrix Addition and Subtraction**:
   - The `add` function takes two matrices and returns their sum.
   - The `subtract` function takes two matrices and returns their difference.

2. **Strassen's Algorithm Function**:
   - The `strassen` function performs Strassen's matrix multiplication.
   - If the input size is \(1 \times 1\), it multiplies the single elements.
   - For larger matrices, it divides them into four submatrices (quadrants).
   - It calculates the seven products using recursive calls to the `strassen` function based on the Strassen formulas.
   - Finally, it combines the results to form the resultant matrix.

3. **Driver Code**:
   - The `main` function initializes two \(2 \times 2\) matrices and calls the `strassen` function to multiply them.
   - It prints the resultant matrix.

### Summary:

Strassen's Algorithm significantly reduces the complexity of matrix multiplication by using a divide-and-conquer approach, achieving a time complexity of approximately \(O(n^{2.81})\). Although it is more efficient than the naive approach, it is more complex to implement and may not be optimal for smaller matrices due to the overhead of recursive calls. Strassen's algorithm is particularly useful in scenarios where large matrix multiplications are needed, such as in scientific computing and graphics applications.

