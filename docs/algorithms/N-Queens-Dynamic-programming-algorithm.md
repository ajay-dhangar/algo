---
id: n-queens-problem
title: N-Queens Problem
sidebar_label: N-Queens Problem
sidebar_position: 9
description: "The N-Queens problem is a classic backtracking problem where the objective is to place N queens on an N×N chessboard such that no two queens threaten each other."
tags: [Backtracking, N-Queens, Algorithms, Recursion, Combinatorics]
---

# N-Queens Problem

## Overview
The **N-Queens problem** is a classic combinatorial problem where the objective is to place `N` queens on an `N×N` chessboard so that no two queens can attack each other. In chess, a queen can attack another queen if it is on the same row, column, or diagonal. The challenge is to place all queens in a way that none of them threaten each other.

## Problem Description
- **Input**: An integer `N` representing the size of the chessboard and the number of queens.
- **Output**: All possible ways to place `N` queens on an `N×N` board such that no two queens threaten each other.
- **Constraints**: No two queens can share the same row, column, or diagonal.

## Solution Approach
The N-Queens problem is typically solved using **backtracking**, a depth-first search approach that explores all possible configurations of queens on the board. The algorithm places queens row by row and uses recursive calls to check whether the current configuration is valid. If a conflict is detected, the algorithm backtracks to try a different configuration.

### Key Steps
1. **Start from the first row** and try to place a queen in each column of that row.
2. **Check for conflicts** with queens in previous rows (same column, row, or diagonal).
3. **Place the queen** in a valid position and move to the next row.
4. **Backtrack** if no valid positions are found in the current row, removing the last placed queen and trying a new configuration.
5. **Repeat the process** until all possible configurations have been explored.

## Code Example

```
python
def solve_n_queens(n):
    def is_safe(board, row, col):
        # Check the column and diagonals for conflicts
        for i in range(row):
            if board[i] == col or \
               board[i] - i == col - row or \
               board[i] + i == col + row:
                return False
        return True
    
    def solve(board, row):
        if row == n:
            # All queens placed successfully
            result.append(board[:])
            return
        
        for col in range(n):
            if is_safe(board, row, col):
                board[row] = col
                solve(board, row + 1)
                board[row] = -1  # Backtrack
    
    result = []
    solve([-1] * n, 0)  # Initialize an empty board
    return result

solutions = solve_n_queens(4)
for solution in solutions:
    print(solution)
```
## Time Complexity

The time complexity of the N-Queens problem depends on the size of the board (N), as the algorithm explores different possible configurations of queens.

### Time Complexity Overview
- **Worst Case**: O(N!) (factorial time complexity)
  - The algorithm needs to explore all possible placements of queens on the board, and in the worst case, it examines all permutations of queen placements.
  - Although backtracking helps prune invalid configurations, the worst case is still factorial in nature.

## Space Complexity
- **Space Complexity**: O(N)
  - The space complexity is linear because we only need to store the position of N queens on the board, as well as auxiliary information for backtracking (e.g., current row and column states).

## Applications
- **Puzzle Solving**: The N-Queens problem is a classic puzzle that helps in understanding backtracking techniques.
- **Constraint Satisfaction Problems (CSPs)**: The problem serves as a useful example for solving other CSPs, where constraints need to be satisfied.
- **AI and Optimization**: Variants of the N-Queens problem are used in AI to test search algorithms and optimization techniques.

## Conclusion
The N-Queens problem is a fundamental backtracking problem that illustrates how to explore solution spaces with constraints. The key to solving the problem efficiently is to use backtracking to eliminate invalid configurations early, significantly reducing the number of possibilities. With careful implementation, it is possible to solve the problem for large values of N and explore different approaches to constraint satisfaction and optimization in algorithmic problem-solving.
