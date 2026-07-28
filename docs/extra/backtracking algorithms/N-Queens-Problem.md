---
id: n-queens-problem
title: N-Queens Problem Algorithm
sidebar_label: N-Queens Problem
sidebar_position: 8
description: A comprehensive guide to the N-Queens Problem, a classic backtracking algorithm puzzle.
tags: [dsa, backtracking, algorithms, n-queens, combinatorial]
---

## Introduction

The **N-Queens Problem** is a classic computer science puzzle that asks how to place `N` chess queens on an `N x N` chessboard so that no two queens threaten each other. This means no two queens can share the same row, column, or diagonal.

The problem was first posed in 1848 and has been a benchmark for algorithm design ever since.

## Problem Statement

Place `N` queens on an `N x N` chessboard such that:
1. No two queens are in the same row.
2. No two queens are in the same column.
3. No two queens are on the same diagonal.

## Naive Backtracking Approach

The key insight is that we must place exactly one queen per row. This eliminates the need to check row conflicts.

### Algorithm (Pseudo-code)

```text
function solveNQueens(N):
    board = N x N array filled with '.'
    result = []

    function backtrack(row, cols, diag1, diag2, current):
        if row == N:
            result.append(current.copy())
            return

        for col in 0..N-1:
            d1 = col + row       // Main diagonal index
            d2 = col - row + N-1 // Anti-diagonal index

            if col not in cols AND d1 not in diag1 AND d2 not in diag2:
                // Place queen
                board[row][col] = 'Q'
                cols.add(col); diag1.add(d1); diag2.add(d2)
                current.append(board[row] as string)

                backtrack(row + 1, cols, diag1, diag2, current)

                // Backtrack
                board[row][col] = '.'
                cols.remove(col); diag1.remove(d1); diag2.remove(d2)
                current.pop()

    backtrack(0, set(), set(), set(), [])
    return result
```

## Implementation in C

```c
#include <stdio.h>
#include <stdbool.h>

#define MAX_N 15

int N;
char board[MAX_N][MAX_N];
int solutions[MAX_N][MAX_N];  // Store current solution
int solution_count = 0;

bool isSafe(int row, int col, bool cols[], bool diag1[], bool diag2[]) {
    return !cols[col] && !diag1[row + col] && !diag2[row - col + N - 1];
}

void printSolution() {
    solution_count++;
    printf("Solution %d:\n", solution_count);
    for (int r = 0; r < N; r++) {
        for (int c = 0; c < N; c++) {
            printf("%c ", board[r][c]);
        }
        printf("\n");
    }
    printf("\n");
}

void solveNQueens(int row, bool cols[], bool diag1[], bool diag2[]) {
    if (row == N) {
        printSolution();
        return;
    }

    for (int col = 0; col < N; col++) {
        if (isSafe(row, col, cols, diag1, diag2)) {
            // Place queen
            board[row][col] = 'Q';
            cols[col] = diag1[row + col] = diag2[row - col + N - 1] = true;

            solveNQueens(row + 1, cols, diag1, diag2);

            // Backtrack
            board[row][col] = '.';
            cols[col] = diag1[row + col] = diag2[row - col + N - 1] = false;
        }
    }
}

int main() {
    N = 8;
    for (int r = 0; r < N; r++)
        for (int c = 0; c < N; c++)
            board[r][c] = '.';

    bool cols[MAX_N] = {false};
    bool diag1[2 * MAX_N] = {false};
    bool diag2[2 * MAX_N] = {false};

    solveNQueens(0, cols, diag1, diag2);
    printf("Total solutions for N=%d: %d\n", N, solution_count);

    return 0;
}
```

## Implementation in Python (Bitmask Optimization)

```python
def solve_n_queens(n):
    """
    Solve N-Queens using bitmask optimization.
    Extremely fast due to bitwise operations.
    """
    solutions = []

    def solve(ld, col, rd):
        """
        ld: bits set for positions under attack from left diagonals
        rd: bits set for positions under attack from right diagonals
        col: bits set for positions under attack from columns
        Each bit represents one column.
        """
        # All columns are occupied (queen placed in every row)
        if col == (1 << n) - 1:
            solutions.append(1)
            return

        # Available positions = ~(ld | col | rd)
        # This gives 1s where we can place a queen
        available = (~(ld | col | rd)) & ((1 << n) - 1)

        while available:
            # Extract rightmost bit (lowest set bit)
            position = available & (-available)
            available -= position

            # Recurse with updated attack positions
            # Left diagonal shifts left: (ld | position) << 1
            # Right diagonal shifts right: (rd | position) >> 1
            solve(
                (ld | position) << 1,
                col | position,
                (rd | position) >> 1
            )

    solve(0, 0, 0)
    return len(solutions)

# Example
for n in [4, 8, 10, 12]:
    count = solve_n_queens(n)
    print(f"N={n}: {count} solutions")
```

## Solutions Count

| N | Solutions |
|---|-----------|
| 1 | 1 |
| 4 | 2 |
| 5 | 10 |
| 6 | 4 |
| 7 | 40 |
| 8 | 92 |
| 10 | 724 |
| 12 | 14200 |
| 14 | 365596 |
| 15 | 2275144 |

## Complexity Analysis

| Metric | Naive | Bitmask Optimized |
|--------|-------|-------------------|
| Time | O(N!) | O(N!) but with better pruning |
| Space | O(N) | O(N) recursion stack |
| Speed | Baseline | 10-100x faster than naive |

## Practice Problems

1. Return all valid N-Queens solutions (not just the count).
2. Print each solution visually as an NxN board.
3. Find the first solution for a given N.
4. Implement N-Queens with the MRV (Minimum Remaining Values) heuristic.
5. Solve the N-Rooks problem (simpler version with only row/column conflicts).
