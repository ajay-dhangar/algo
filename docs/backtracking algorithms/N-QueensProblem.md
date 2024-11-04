---
id: n-queens-problem
title: N-Queens Problem in C
sidebar_label: Backtracking algorithms
sidebar_position: 1
description: "The N-Queens Problem is a classic problem where the objective is to place `N` queens on an `N x N` chessboard such that no two queens can attack each other. A queen can attack any other piece in the same row, column, or diagonal, making it challenging to place all `N` queens without conflict."
tags: [backtracking, algorithms]
---

## Problem Definition

Given:
- An integer `N`, representing the size of the chessboard (`N x N`) and the number of queens.

Objective:
- Place `N` queens on the chessboard such that no two queens threaten each other.

## Constraints
- Queens can move horizontally, vertically, or diagonally, which means no two queens can share the same row, column, or diagonal.

## Algorithm Overview

The **backtracking** approach is used to solve the N-Queens problem. The idea is to place queens one by one in different columns, starting from the first row. Whenever a queen is placed, the solution checks whether the position is safe. If so, it moves on to the next row. If no safe column is found, it backtracks and tries a different column.

### Steps:
1. Start by placing a queen in the first row.
2. For each row, try placing a queen in each column (one by one).
3. Check if placing a queen is safe (no other queens can attack it).
4. If safe, place the queen and move to the next row.
5. If a position is not safe or leads to no solution, backtrack by removing the queen and trying a different column.
6. Repeat until all queens are placed or no solution is found.

### Functions:
1. **isSafe(row, col)**: Checks if placing a queen at `(row, col)` is safe.
2. **solveNQueens(row)**: Recursively places queens row by row and uses backtracking when necessary.
3. **printSolution()**: Displays a valid chessboard configuration.

## Time Complexity

The time complexity for solving the N-Queens problem using backtracking is `O(N!)`, since we try placing a queen in every column of each row and backtrack if needed.

## Program: 
```c
#include <stdio.h>
#include <stdbool.h>

#define N 8 // Change this value for different N

// Function to print the solution
void printSolution(int board[N][N])
{
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            printf("%d ", board[i][j]);
        }
        printf("\n");
    }
}

// Function to check if placing a queen is safe
bool isSafe(int board[N][N], int row, int col)
{
    int i, j;

    // Check this row on the left side
    for (i = 0; i < col; i++)
    {
        if (board[row][i] == 1)
        {
            return false;
        }
    }

    // Check the upper diagonal on the left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
    {
        if (board[i][j] == 1)
        {
            return false;
        }
    }

    // Check the lower diagonal on the left side
    for (i = row, j = col; i < N && j >= 0; i++, j--)
    {
        if (board[i][j] == 1)
        {
            return false;
        }
    }

    return true;
}

// Function to solve the N-Queens problem using backtracking
bool solveNQueensUtil(int board[N][N], int col)
{
    // Base case: If all queens are placed, return true
    if (col >= N)
    {
        return true;
    }

    // Try placing this queen in all rows of the current column
    for (int i = 0; i < N; i++)
    {
        if (isSafe(board, i, col))
        {
            // Place the queen
            board[i][col] = 1;

            // Recur to place the rest of the queens
            if (solveNQueensUtil(board, col + 1))
            {
                return true;
            }

            // If placing queen doesn't lead to a solution, backtrack
            board[i][col] = 0;
        }
    }

    return false; // If no placement is possible, return false
}

// Function to solve the N-Queens problem
bool solveNQueens()
{
    int board[N][N] = {0};

    if (!solveNQueensUtil(board, 0))
    {
        printf("Solution does not exist\n");
        return false;
    }

    printSolution(board);
    return true;
}

int main()
{
    solveNQueens();
    return 0;
}

```
