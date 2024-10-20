---
id: Knights-Tour-problem-dsa
title: Knight's Tour Recursion
sidebar_label: Knight's Tour
sidebar_position: 3
description: "The Knight's Tour problem is a classic backtracking problem where the goal is to move a knight across an n×n chessboard such that it visits every square exactly once. The problem is often solved using backtracking and recursion."
tags: [knights-tour, backtracking, recursion, dsa]
---

## Knight's Tour Problem | Find a Path for the Knight to Visit All Squares

- Problem Statement: The Knight's Tour problem involves moving a knight on an n × n chessboard such that the knight visits every square exactly once. Given an integer `n`, find one possible solution to the problem.


```cpp
#include <iostream>
#include <vector>

using namespace std;

class KnightTour {
    const vector<pair<int, int>> moves = {
        {2, 1}, {1, 2}, {-1, 2}, {-2, 1},
        {-2, -1}, {-1, -2}, {1, -2}, {2, -1}
    };

public:
    void findKnightTour(int n) {
        vector<vector<int>> board(n, vector<int>(n, -1));
        board[0][0] = 0; // Starting position
        if (exploreTour(0, 0, 1, board, n)) {
            displayBoard(board);
        } else {
            cout << "No solution exists." << endl;
        }
    }

private:
    bool exploreTour(int x, int y, int moveCount, vector<vector<int>>& board, int n) {
        if (moveCount == n * n) {
            return true; // All squares visited
        }

        for (const auto& move : moves) {
            int nextX = x + move.first;
            int nextY = y + move.second;

            if (isValidMove(nextX, nextY, board, n)) {
                board[nextX][nextY] = moveCount;
                if (exploreTour(nextX, nextY, moveCount + 1, board, n)) {
                    return true;
                }
                board[nextX][nextY] = -1; // Backtrack
            }
        }
        return false; // No valid move found
    }

    bool isValidMove(int x, int y, const vector<vector<int>>& board, int n) {
        return (x >= 0 && x < n && y >= 0 && y < n && board[x][y] == -1);
    }

    void displayBoard(const vector<vector<int>>& board) {
        for (const auto& row : board) {
            for (const auto& cell : row) {
                cout << cell << "\t";
            }
            cout << endl;
        }
    }
};

int main() {
    int n = 5; // Size of the chessboard
    KnightTour kt;
    kt.findKnightTour(n);
    return 0;
}

```

```python

class KnightsTour:
    def __init__(self, n):
        self.n = n
        self.moves = [(2, 1), (1, 2), (-1, 2), (-2, 1),
                      (-2, -1), (-1, -2), (1, -2), (2, -1)]
        self.board = [[-1 for _ in range(n)] for _ in range(n)]
        self.board[0][0] = 0  # Starting position

    def is_valid_move(self, x, y):
        return 0 <= x < self.n and 0 <= y < self.n and self.board[x][y] == -1

    def explore_tour(self, x, y, move_count):
        if move_count == self.n * self.n:
            return True  # All squares visited

        for move in self.moves:
            next_x = x + move[0]
            next_y = y + move[1]

            if self.is_valid_move(next_x, next_y):
                self.board[next_x][next_y] = move_count
                if self.explore_tour(next_x, next_y, move_count + 1):
                    return True
                self.board[next_x][next_y] = -1  # Backtrack

        return False  # No valid move found

    def display_board(self):
        for row in self.board:
            print("\t".join(map(str, row)))
        print()

    def find_knight_tour(self):
        if self.explore_tour(0, 0, 1):
            self.display_board()
        else:
            print("No solution exists.")


if __name__ == "__main__":
    n = 5  # Size of the chessboard
    kt = KnightsTour(n)
    kt.find_knight_tour()

```

```java

public class KnightsTour {
    private static final int[][] moves = {
        {2, 1}, {1, 2}, {-1, 2}, {-2, 1},
        {-2, -1}, {-1, -2}, {1, -2}, {2, -1}
    };

    public void findKnightTour(int n) {
        int[][] board = new int[n][n];
        for (int[] row : board) {
            Arrays.fill(row, -1); // Initialize the board with -1
        }
        board[0][0] = 0; // Starting position
        if (exploreTour(0, 0, 1, board, n)) {
            displayBoard(board);
        } else {
            System.out.println("No solution exists.");
        }
    }

    private boolean exploreTour(int x, int y, int moveCount, int[][] board, int n) {
        if (moveCount == n * n) {
            return true; // All squares visited
        }

        for (int[] move : moves) {
            int nextX = x + move[0];
            int nextY = y + move[1];

            if (isValidMove(nextX, nextY, board, n)) {
                board[nextX][nextY] = moveCount;
                if (exploreTour(nextX, nextY, moveCount + 1, board, n)) {
                    return true;
                }
                board[nextX][nextY] = -1; // Backtrack
            }
        }
        return false; // No valid move found
    }

    private boolean isValidMove(int x, int y, int[][] board, int n) {
        return (x >= 0 && x < n && y >= 0 && y < n && board[x][y] == -1);
    }

    private void displayBoard(int[][] board) {
        for (int[] row : board) {
            for (int cell : row) {
                System.out.print(cell + "\t");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int n = 5; // Size of the chessboard
        KnightsTour kt = new KnightsTour();
        kt.findKnightTour(n);
    }
}

```

