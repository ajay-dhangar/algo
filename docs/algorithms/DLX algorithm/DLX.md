---

id: dancing-links  
sidebar_position: 20  
title: "Dancing Links (DLX)"  
sidebar_label: Dancing Links  

---

### Definition

The **Dancing Links (DLX)** algorithm is a highly efficient implementation of the **Exact Cover Problem**. It is based on a technique known as **dancing links**, which is a way of representing a sparse matrix with linked lists to facilitate fast row and column removals and restorations during the backtracking process.

### Characteristics

- **Algorithm Type**: Exact Cover, Backtracking
- **Main Operation**: Uses linked list data structures to manage matrix columns and rows efficiently.
- **Data Structures**: A doubly linked list for the matrix and additional links to maintain column and row covers.
- **Output**: Provides a solution to the exact cover problem, representing the rows that make up the exact cover.

### Time Complexity

- **Average Case**: The time complexity depends on the size of the matrix and the specific problem being solved but is generally more efficient than brute force methods.
- **Worst Case**: The worst-case complexity can be exponential in the number of rows and columns, but the algorithm is highly optimized for sparse matrices.

### Space Complexity

- **Space Complexity**: $O(n + m)$, where $n$ is the number of rows and $m$ is the number of columns in the matrix. The space is primarily used to store the linked list nodes for the matrix representation.


### Approach

1. **Input**: The algorithm works with a binary matrix representing the exact cover problem, where each row represents a set, and each column represents a condition that must be covered.
2. **Initialization**: Build a doubly linked list to represent the matrix with additional pointers to manage row and column coverings.
3. **Backtracking**: Use a depth-first search to explore all possible combinations of rows that cover all columns. During each step, rows and columns are covered (removed from the matrix), and the solution is updated.
4. **Column and Row Covering**: When selecting a row, the corresponding columns are covered, and when backtracking, the columns are uncovered to try other options.
5. **Output**: When all columns are covered, a valid solution is found, and the selected rows are returned.

### C++ implementation

```cpp
#include <iostream>
#include <vector>

using namespace std;

class DancingLinks {
public:
    struct Node {
        Node *left, *right, *up, *down;
        int row, col;
    };

    DancingLinks(int rows, int cols) : rows(rows), cols(cols) {
        header = new Node();
        header->left = header->right = header;
        header->up = header->down = header;
        for (int i = 0; i < cols; ++i) {
            Node* colNode = new Node();
            colNode->col = i;
            colNode->left = header;
            colNode->right = header->right;
            header->right->left = colNode;
            header->right = colNode;
            colNodes.push_back(colNode);
        }
        for (int i = 0; i < rows; ++i) {
            Node* rowNode = new Node();
            rowNode->row = i;
            rowNode->up = header;
            rowNode->down = header->down;
            header->down->up = rowNode;
            header->down = rowNode;
            rowNodes.push_back(rowNode);
        }
    }

    // Add a constraint (a 1 in the matrix)
    void addConstraint(int row, int col) {
        Node* rowNode = rowNodes[row];
        Node* colNode = colNodes[col];
        
        Node* newNode = new Node();
        newNode->row = row;
        newNode->col = col;

        newNode->up = colNode->up;
        newNode->down = colNode;
        colNode->up->down = newNode;
        colNode->up = newNode;

        newNode->left = rowNode->left;
        newNode->right = rowNode;
        rowNode->left->right = newNode;
        rowNode->left = newNode;
    }

    // Cover a column (remove the column and its rows)
    void cover(Node* colNode) {
        colNode->right->left = colNode->left;
        colNode->left->right = colNode->right;
        
        for (Node* rowNode = colNode->down; rowNode != colNode; rowNode = rowNode->down) {
            for (Node* cell = rowNode->right; cell != rowNode; cell = cell->right) {
                cell->down->up = cell->up;
                cell->up->down = cell->down;
            }
        }
    }

    // Uncover a column (restore the column and its rows)
    void uncover(Node* colNode) {
        for (Node* rowNode = colNode->up; rowNode != colNode; rowNode = rowNode->up) {
            for (Node* cell = rowNode->left; cell != rowNode; cell = cell->left) {
                cell->down->up = cell;
                cell->up->down = cell;
            }
        }
        colNode->right->left = colNode;
        colNode->left->right = colNode->right;
    }

    // Try to solve the exact cover problem
    bool solve(vector<int>& solution) {
        if (header->right == header) {
            return true; // Solution found
        }

        Node* colNode = header->right;
        for (Node* temp = header->right; temp != header; temp = temp->right) {
            if (temp->down != temp) {
                colNode = temp;
                break;
            }
        }

        cover(colNode);

        for (Node* rowNode = colNode->down; rowNode != colNode; rowNode = rowNode->down) {
            solution.push_back(rowNode->row);

            for (Node* cell = rowNode->right; cell != rowNode; cell = cell->right) {
                cover(cell->down);
            }

            if (solve(solution)) {
                return true;
            }

            solution.pop_back();

            for (Node* cell = rowNode->left; cell != rowNode; cell = cell->left) {
                uncover(cell->down);
            }
        }

        uncover(colNode);
        return false;
    }

private:
    int rows, cols;
    vector<Node*> colNodes, rowNodes;
    Node* header;
};

int main() {
    int rows = 6;
    int cols = 7;
    DancingLinks dlx(rows, cols);

    // Example matrix representing the exact cover problem
    dlx.addConstraint(0, 0);
    dlx.addConstraint(0, 1);
    dlx.addConstraint(1, 0);
    dlx.addConstraint(1, 2);
    dlx.addConstraint(2, 1);
    dlx.addConstraint(2, 3);
    dlx.addConstraint(3, 2);
    dlx.addConstraint(3, 3);
    dlx.addConstraint(4, 4);
    dlx.addConstraint(4, 5);
    dlx.addConstraint(5, 4);
    dlx.addConstraint(5, 6);

    vector<int> solution;
    if (dlx.solve(solution)) {
        cout << "Solution found!" << endl;
        for (int row : solution) {
            cout << "Row " << row << endl;
        }
    } else {
        cout << "No solution found!" << endl;
    }

    return 0;
}
```

---

The **Dancing Links (DLX)** algorithm is particularly useful in solving problems like **Sudoku** and **N-Queens** efficiently by exploiting the structure of the exact cover problem, making it an optimal choice for combinatorial problem-solving.
