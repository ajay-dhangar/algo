# 3D Arrays in Java

## Introduction

A **3D array** in Java is an array of arrays of arrays. It allows you to represent data in a three-dimensional space. While 1D arrays represent lists and 2D arrays represent matrices, 3D arrays add another layer of depth, making them useful for handling more complex data structures in various applications.

## Structure & Syntax

A 3D array in Java is structured as multiple 2D arrays stacked on top of each other. It has three indices:
- **First index**: Represents the depth (stack of 2D arrays).
- **Second index**: Represents the rows in each 2D array.
- **Third index**: Represents the columns in each 2D array.

### Syntax
```java
datatype[][][] arrayName = new datatype[x][y][z];

### Characteristics of a 3D-Array.
 - **Size**: A 3D array's size is determined by multiplying its three dimensions: x * y * z.

 - **Storage**: It stores elements in a continuous block of memory, allowing indexed access.

 - **Fixed-Size:**: The size of each dimension is fixed once the array is initialized.

 - **Element Access:**: Elements are accessed by providing three indices: arrayName[i][j][k], where i, j, and k are the indices for depth, rows, and columns respectively.

### Code

**Creation & Display 3D-Array**

   ```text
public class ThreeDArrayExample {
    public static void main(String[] args) {
        // Creating a 3D array with dimensions 2x3x4
        int[][][] arr = new int[2][3][4];

        // Initializing the array
        int value = 1;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 4; k++) {
                    arr[i][j][k] = value++;
                }
            }
        }

        // Displaying the elements of the 3D array
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 4; k++) {
                    System.out.print("arr[" + i + "][" + j + "][" + k + "] = " + arr[i][j][k] + "  ");
                }
                System.out.println();
            }
            System.out.println();
        }
    }
}


   ```


##Sparse Matrix Representation using 3D Array
A **sparse matrix** is a matrix where the majority of its elements are zero. Storing large sparse matrices in their entirety would be memory-inefficient. A 3D array can help represent such matrices in a compressed format where only non-zero elements and their indices are stored.
**4-Subtraction of two 2D arrays**

**Code Example for Sparse Matrix Representation:**

###Code.
   ```text
     public class SparseMatrixExample {
    public static void main(String[] args) {
        // Example 3D array for a sparse matrix (2x3x3)
        int[][][] sparseMatrix = {
            {{1, 0, 0}, {0, 2, 0}, {0, 0, 3}},
            {{0, 0, 4}, {0, 0, 0}, {5, 0, 0}}
        };

        // Displaying non-zero elements
        for (int i = 0; i < sparseMatrix.length; i++) {
            for (int j = 0; j < sparseMatrix[i].length; j++) {
                for (int k = 0; k < sparseMatrix[i][j].length; k++) {
                    if (sparseMatrix[i][j][k] != 0) {
                        System.out.println("Non-zero element at [" + i + "][" + j + "][" + k + "] = " + sparseMatrix[i][j][k]);
                    }
                }
            }
        }
    }
}

   ```

### Conclusion
3D arrays in Java are a powerful tool for working with complex, multidimensional data structures. They allow you to store and access data in three dimensions, making them useful in scenarios such as simulations, image processing, and gaming. However, they can consume a significant amount of memory, especially if not efficiently used. Sparse matrices provide a way to optimize storage for arrays with a majority of zero elements, demonstrating how 3D arrays can be both powerful and memory-conscious when needed.
