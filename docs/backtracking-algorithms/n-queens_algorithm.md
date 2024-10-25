# N Queen Problem using Backtracking:

### Problem Statement

The task is to place 𝑛 queens on an n×n chessboard such that no two queens can attack each other. This means:

- No two queens can be in the same row, column, or diagonal.

### Approach
Backtracking is a technique that builds the solution one piece at a time and removes solutions that don’t satisfy the constraints.

### Algorithm
1. **Place Queen in Row:** Place queens one by one in different rows, starting from the leftmost column.
2. **Check Safety:** For each cell in the current row, check if placing the queen there will not lead to conflicts with previously placed queens.
3. **Recursive Backtracking:** If the placement is safe, move to place the next queen in the following row.
4. **Backtrack:** If placing a queen in a specific column leads to no solution, backtrack and try the next cell in the row.

Here's the Python code for the algorithm:

python ```
# Function to check if a queen can be placed on the board at [row][col]
def is_safe(board, row, col, n):
    # Check left side of the row
    for i in range(col):
        if board[row][i] == 1:
            return False
    
    # Check upper diagonal on the left side
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    # Check lower diagonal on the left side
    for i, j in zip(range(row, n), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    return True

# Function to solve N-Queens using backtracking
def solve_n_queens(board, col, n):
    # If all queens are placed, return True
    if col >= n:
        return True
    
    # Try placing the queen in each row for this column
    for i in range(n):
        if is_safe(board, i, col, n):
            # Place the queen
            board[i][col] = 1

            # Recur to place the rest of the queens
            if solve_n_queens(board, col + 1, n):
                return True
            
            # If placing queen at board[i][col] doesn't lead to a solution, remove queen (backtrack)
            board[i][col] = 0

    return False

# Function to initialize the board and call solve_n_queens
def n_queens(n):
    board = [[0 for _ in range(n)] for _ in range(n)]
    if solve_n_queens(board, 0, n):
        for row in board:
            print(row)
    else:
        print("No solution exists")

# Driver code to test the above functions
n = int(input())
n_queens(n)
```

### Explanation of Functions
is_safe(board, row, col, n): Checks if it is safe to place a queen at a specific [row][col] position. It ensures no other queens threaten the position from the left side, upper-left diagonal, or lower-left diagonal, as queens are placed from left to right.

solve_n_queens(board, col, n): Tries to solve the N-Queens problem by placing queens one column at a time. If placing a queen in a specific cell doesn’t lead to a solution, it removes the queen (backtracks) and tries the next cell.

n_queens(n): Initializes the board and starts the recursive process by calling solve_n_queens. If a solution is found, it prints the board configuration; otherwise, it prints that no solution exists.

Complexity
Time Complexity: 
𝑂(𝑁!), where N is the board size. This is due to the combinatorial nature of the placements.

Space Complexity: 
𝑂(𝑁2), as a 2D list of size N×N is used to store the board configuration.

Note: This algorithm is adapted from GeeksforGeeks.

