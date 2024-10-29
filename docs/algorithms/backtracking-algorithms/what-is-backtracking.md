---
id: what-is-Backtracking
sidebar_position: 1
title: What is Backtracking Algorithms?
sidebar_label: What is Backtracking?
description: "Backtracking is a systematic algorithmic method for solving problems where you need to explore all possible configurations (solution candidates) and discard those that fail to satisfy the given constraints. It is widely used to solve constraint satisfaction problems such as puzzles, combinatorial optimization problems, and decision problems."
tags: [backtracking, memoisation, pruning]
---

## Backtracking Algorithms

Backtracking is a systematic algorithmic method for solving problems where you need to explore all possible configurations (solution candidates) and discard those that fail to satisfy the given constraints. It is widely used to solve constraint satisfaction problems such as puzzles, combinatorial optimization problems, and decision problems.

### What is Backtracking?

Backtracking works by building a solution incrementally, one piece at a time, and removes those solutions that fail to satisfy the constraints of the problem at any stage. This process is repeated until the algorithm either finds a solution or exhausts all possibilities. It is often implemented using recursion, exploring each branch of a problem space and "backtracking" once a dead-end is encountered.

### Key Features of Backtracking

1. **Incremental Construction**: Backtracking builds solutions one step at a time. After each step, the algorithm checks whether the partial solution still has a chance of leading to a valid solution.
   
2. **Backtrack on Failure**: If the current partial solution violates the problem constraints or can't possibly lead to a complete solution, the algorithm discards the last step (backtracks) and tries a different option.

3. **Recursive Exploration**: The solution space is explored recursively, and backtracking can be viewed as a depth-first search (DFS) across the solution space.

4. **Pruning**: Backtracking employs pruning techniques that help discard entire sections of the search tree that cannot lead to valid solutions, thus optimizing performance.


### How Does Backtracking Work?

1. **Recursive Structure**:
   Backtracking is implemented using recursive function calls. At each stage, the function explores possible solutions by iterating through available options and makes a decision for the current step.
   
2. **Base Case**:
   The recursive function has a base case that checks if a solution has been found or if the problem has reached an unsolvable state. If a solution is found, it is returned; otherwise, the function backtracks by undoing the last decision and trying a different option.

3. **Pruning**:
   The key optimization in backtracking is to "prune" unnecessary paths early. For example, in a problem like the N-Queens problem, if placing a queen leads to a conflict, the algorithm doesn't explore further down that branch and instead backtracks to a previous step.

### Step-by-Step Backtracking Example: N-Queens Problem

In the N-Queens problem, the task is to place N queens on an NxN chessboard such that no two queens attack each other. This means no two queens should share the same row, column, or diagonal.

**Algorithm**:

1. Start placing queens in the first column.
2. For each row, place a queen if it doesn’t conflict with any other queen.
3. Move to the next column and repeat step 2.
4. If all queens are placed, a solution is found.
5. If placing a queen leads to a conflict, backtrack and try a different row for the previous queen.
6. Continue this process until all possible placements have been tried.

#### C++ Code Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

bool isSafe(vector<vector<int>>& board, int row, int col, int N) {
    // Check row on left side
    for (int i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }
    
    // Check upper diagonal on left side
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    
    // Check lower diagonal on left side
    for (int i = row, j = col; j >= 0 && i < N; i++, j--) {
        if (board[i][j]) return false;
    }
    
    return true;
}

bool solveNQueensUtil(vector<vector<int>>& board, int col, int N) {
    if (col >= N) return true;  // All queens are placed

    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col, N)) {
            board[i][col] = 1;  // Place queen
            
            if (solveNQueensUtil(board, col + 1, N)) {
                return true;  // Found solution
            }
            
            board[i][col] = 0;  // Backtrack
        }
    }
    
    return false;  // No solution found
}

void solveNQueens(int N) {
    vector<vector<int>> board(N, vector<int>(N, 0));

    if (!solveNQueensUtil(board, 0, N)) {
        cout << "Solution does not exist" << endl;
        return;
    }

    // Print solution
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int N = 8;  // Size of the chessboard (8x8)
    solveNQueens(N);
    return 0;
}
```

#### JavaScript Code Implementation

```javascript
function isSafe(board, row, col, N) {
    // Check row on the left side
    for (let i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }

    // Check upper diagonal on the left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }

    // Check lower diagonal on the left side
    for (let i = row, j = col; j >= 0 && i < N; i++, j--) {
        if (board[i][j]) return false;
    }

    return true;
}

function solveNQueensUtil(board, col, N) {
    if (col >= N) return true;  // All queens are placed

    for (let i = 0; i < N; i++) {
        if (isSafe(board, i, col, N)) {
            board[i][col] = 1;  // Place queen
            
            if (solveNQueensUtil(board, col + 1, N)) {
                return true;  // Found solution
            }
            
            board[i][col] = 0;  // Backtrack
        }
    }

    return false;  // No solution found
}

function solveNQueens(N) {
    const board = Array.from({ length: N }, () => Array(N).fill(0)); // Initialize N x N board

    if (!solveNQueensUtil(board, 0, N)) {
        console.log("Solution does not exist");
        return;
    }

    // Print solution
    for (let i = 0; i < N; i++) {
        console.log(board[i].join(" ")); // Print each row
    }
}

// Example usage
const N = 8; // Size of the chessboard (8x8)
solveNQueens(N);
```

### Explanation of the Code

1. **`isSafe` Function**: Checks if it's safe to place a queen at the specified position (row, col) by checking:
   - The current row on the left side for other queens.
   - The upper diagonal on the left side.
   - The lower diagonal on the left side.

2. **`solveNQueensUtil` Function**: A recursive utility function that attempts to place queens column by column:
   - If all queens are placed (`col >= N`), it returns `true`.
   - For each row in the current column, it checks if placing a queen is safe.
   - If it's safe, it places the queen and recursively tries to place queens in the next column.
   - If placing leads to no solution, it backtracks by removing the queen.

3. **`solveNQueens` Function**: Initializes the chessboard and calls the utility function. If no solution exists, it prints a message. Otherwise, it prints the board configuration.

4. **Example Usage**: The code is set to solve the 8-Queens problem by default, but you can change the value of `N` to solve for different sizes.


### Pseudocode for the N-Queens Problem
Here is the pseudocode that represents the backtracking approach used to solve the N-Queens problem:

```
function solveNQueens(board, col):
    if col >= N:  
        return True  # All queens are placed

    for each row in 0 to N-1:
        if isSafe(board, row, col): 
            placeQueen(board, row, col)

            if solveNQueens(board, col + 1): 
                return True  # Proceed with placing queens in next columns

            removeQueen(board, row, col)  # Backtrack and remove queen

    return False  # No valid position for this column

function isSafe(board, row, col):
    # Check if no queen can attack this position from the left-side rows, upper diagonal, and lower diagonal
    return True if safe, else False

```

### Backtracking vs Other Algorithms

**Backtracking vs Dynamic Programming**: 
While backtracking explores all possible solutions by trial and error, dynamic programming uses memoization to store solutions to overlapping subproblems. Dynamic programming is generally faster for optimization problems but can consume more space.

**Backtracking vs Greedy Algorithms**: 
Backtracking is more flexible as it explores multiple paths to find an optimal solution, while greedy algorithms make the locally optimal choice at each stage and hope to find a global optimum, which does not always work for complex problems.

**Backtracking vs Brute Force**: 
Brute force explores all possible configurations without any intelligent pruning of the search space. Backtracking intelligently cuts off infeasible paths, which makes it more efficient than brute force for most problems.

**Real-world Applications of Backtracking Algorithms Sudoku Solver**: 
Solving Sudoku puzzles by placing numbers in a 9x9 grid while ensuring each row, column, and 3x3 sub-grid contains unique numbers from 1-9.

**Knight’s Tour Problem**: 
Finding a tour for a knight on a chessboard where the knight visits every square exactly once.

**Mazes and Pathfinding**: 
Backtracking can be used to explore all possible paths through a maze and find a path that leads to the goal.

**Subset Sum Problem**: 
Backtracking is useful for determining if a subset of a set of numbers sums to a specific value.

**Crossword Puzzle Solver**: 
Filling a crossword grid with words from a list such that they fit in accordance with the constraints of the puzzle.

**Permutation and Combination Generation**: 
Generating all possible permutations and combinations of a set, used in tasks like password cracking or generating sequences for testing.

### Optimizing Backtracking Algorithms
Backtracking can be made more efficient with the following techniques:

1. **Pruning**: Use pruning strategies to cut off branches early in the search tree. This can drastically reduce the number of possibilities the algorithm needs to explore.

2. **Memoization**: Store intermediate results of the backtracking to avoid recomputing for subproblems that have been solved before.

3. **Heuristic Search**: Employ heuristic strategies like Minimum Remaining Values (MRV) to choose the next variable with the fewest legal values left in problems like Sudoku or other constraint satisfaction problems.

### Common Backtracking Problems
Below are a few popular backtracking problems that are widely used in competitive programming and interviews:

- **Rat in a Maze**: 
Find a path for a rat to reach the destination in a maze where some cells are blocked.

- **M Coloring Problem**: 
Assign colors to vertices of a graph such that no two adjacent vertices have the same color.

- **Hamiltonian Path**: 
Find a path in a graph that visits each vertex exactly once.

- **Subset Generation**:
Generate all possible subsets of a given set.

- **Tug of War Problem**: 
Divide a set into two subsets such that the difference between their sums is as small as possible.

### Pros and Cons of Backtracking
**Pros**:
1. **Flexibility**: Can be applied to a wide variety of problems.
Systematic Exploration: Explores all possibilities and guarantees a solution if one exists.
2. **Pruning**: Reduces the search space by eliminating infeasible solutions early.
3. **Simplicity**: Often easy to implement and understand.

**Cons**:

1. **Performance**: Can be slow for large search spaces as the worst-case time complexity is exponential.
2. **Memory Intensive**: In problems with deep recursion, backtracking can be memory intensive.

### Conclusion
Backtracking is a powerful technique for solving a wide variety of problems, especially in combinatorial optimization and constraint satisfaction. While it can be slower than other algorithms like dynamic programming for certain problems, its systematic exploration of all possibilities makes it highly effective for problems where pruning can significantly reduce the search space. With the right optimizations, backtracking can provide elegant solutions to some of the most challenging problems in computer science and real-world applications.

Whether you're solving puzzles, designing algorithms for games, or facing a tough technical interview, mastering backtracking will give you an edge in problem-solving and algorithm design.

### References

- [Backtracking Blog - By Ajay Dhangar](https://ajay-dhangar.github.io/backtracking/)
- [GeeksForGeeks - Backtracking Introduction](https://www.geeksforgeeks.org/backtracking-algorithms/)
