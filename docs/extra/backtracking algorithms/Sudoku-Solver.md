---
id: sudoku-solver
title: Sudoku Solver Algorithm
sidebar_label: Sudoku Solver
sidebar_position: 7
description: A comprehensive guide to solving Sudoku puzzles using backtracking and constraint propagation.
tags: [dsa, backtracking, algorithms, sudoku, constraint-satisfaction]
---

## Introduction

**Sudoku** is a classic constraint satisfaction puzzle played on a 9x9 grid divided into nine 3x3 subgrids. The objective is to fill the grid with digits 1-9 such that each row, each column, and each 3x3 subgrid contains all of the digits from 1 to 9.

Solving Sudoku is an NP-complete problem, making backtracking an ideal approach.

## Problem Statement

Given a partially filled 9x9 Sudoku grid, find a solution that satisfies:
1. Each row contains digits 1-9 exactly once.
2. Each column contains digits 1-9 exactly once.
3. Each 3x3 subgrid contains digits 1-9 exactly once.

## Backtracking Approach

The algorithm works as follows:
1. Find the first empty cell.
2. Try placing digits 1-9 in that cell.
3. For each digit, check if it is valid (no conflict in row, column, or subgrid).
4. If valid, recursively try to solve the rest of the grid.
5. If the recursive call succeeds, return true. Otherwise, backtrack (remove the digit and try the next one).
6. If no digit works, return false (trigger backtracking).

## Algorithm (Pseudo-code)

```text
function solveSudoku(board):
    if all cells filled:
        return true

    find next empty cell (row, col)

    for digit from 1 to 9:
        if isValid(board, row, col, digit):
            board[row][col] = digit

            if solveSudoku(board):
                return true

            board[row][col] = 0  // backtrack

    return false

function isValid(board, row, col, digit):
    // Check row
    for c in 0..8:
        if board[row][c] == digit:
            return false

    // Check column
    for r in 0..8:
        if board[r][col] == digit:
            return false

    // Check 3x3 subgrid
    startRow = (row / 3) * 3
    startCol = (col / 3) * 3
    for r in startRow..startRow+2:
        for c in startCol..startCol+2:
            if board[r][c] == digit:
                return false

    return true
```

## Implementation in C

```c
#include <stdio.h>
#include <stdbool.h>

#define SIZE 9

bool isValid(int board[SIZE][SIZE], int row, int col, int num) {
    // Check row
    for (int c = 0; c < SIZE; c++) {
        if (board[row][c] == num) return false;
    }

    // Check column
    for (int r = 0; r < SIZE; r++) {
        if (board[r][col] == num) return false;
    }

    // Check 3x3 subgrid
    int startRow = (row / 3) * 3;
    int startCol = (col / 3) * 3;
    for (int r = startRow; r < startRow + 3; r++) {
        for (int c = startCol; c < startCol + 3; c++) {
            if (board[r][c] == num) return false;
        }
    }

    return true;
}

bool solveSudoku(int board[SIZE][SIZE]) {
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < col; col++) {
            // Find empty cell
            if (board[row][col] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = 0;  // backtrack
                    }
                }
                return false;  // no valid number found
            }
        }
    }
    return true;  // all cells filled
}

void printBoard(int board[SIZE][SIZE]) {
    for (int r = 0; r < SIZE; r++) {
        for (int c = 0; c < SIZE; c++) {
            printf("%d ", board[r][c]);
            if ((c + 1) % 3 == 0 && c < SIZE - 1) printf("| ");
        }
        printf("\n");
        if ((r + 1) % 3 == 0 && r < SIZE - 1) {
            printf("------+-------+------\n");
        }
    }
}
```

## Implementation in Python

```python
class SudokuSolver:
    def __init__(self, board):
        self.board = board
        self.size = 9

    def print_board(self):
        for i in range(self.size):
            if i % 3 == 0 and i > 0:
                print("------+-------+------")
            for j in range(self.size):
                if j % 3 == 0 and j > 0:
                    print("|", end=" ")
                print(self.board[i][j] if self.board[i][j] != 0 else ".", end=" ")
            print()

    def is_valid(self, row, col, num):
        """Check if placing num at (row, col) is valid."""
        # Check row
        if num in self.board[row]:
            return False

        # Check column
        for r in range(self.size):
            if self.board[r][col] == num:
                return False

        # Check 3x3 subgrid
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(start_row, start_row + 3):
            for c in range(start_col, start_col + 3):
                if self.board[r][c] == num:
                    return False

        return True

    def find_empty(self):
        """Find the next empty cell using MRV heuristic."""
        min_options = 10
        best_cell = None
        for r in range(self.size):
            for c in range(self.size):
                if self.board[r][c] == 0:
                    count = sum(1 for n in range(1, 10) if self.is_valid(r, c, n))
                    if count < min_options:
                        min_options = count
                        best_cell = (r, c)
        return best_cell

    def solve(self):
        """Solve the Sudoku using backtracking with MRV heuristic."""
        empty = self.find_empty()
        if not empty:
            return True  # solved

        row, col = empty
        for num in range(1, 10):
            if self.is_valid(row, col, num):
                self.board[row][col] = num

                if self.solve():
                    return True

                self.board[row][col] = 0  # backtrack

        return False


# Example usage
board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

solver = SudokuSolver(board)
if solver.solve():
    solver.print_board()
else:
    print("No solution exists")
```

## Constraint Propagation Optimization

The basic backtracking can be optimized using **constraint propagation**:

1. **Naked Singles**: A cell with only one possible value.
2. **Hidden Singles**: A value that can only go in one cell in a row/column/subgrid.

The Python implementation above uses the **Minimum Remaining Values (MRV)** heuristic, which selects the cell with the fewest possibilities first, reducing the search space dramatically.

## Complexity Analysis

| Metric | Value |
|--------|-------|
| Time Complexity | O(9^m) where m is the number of empty cells (worst case) |
| Space Complexity | O(m) for the recursion stack |
| With MRV Heuristic | Much faster in practice |

## Practice Problems

1. Implement a Sudoku generator that creates valid Sudoku puzzles.
2. Add constraint propagation with naked singles and hidden singles.
3. Count the number of valid Sudoku solutions.
4. Implement a 4x4 or 6x6 Sudoku variant.
5. Solve Sudoku using integer linear programming (ILP).

## References

- LeetCode 37: Sudoku Solver
- Backtracking is the standard approach for constraint satisfaction problems.
