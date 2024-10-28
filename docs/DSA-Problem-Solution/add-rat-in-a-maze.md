---
id: Add-rat-in-a-maze
sidebar_position: 5
title: Add rat in a maze
sidebar_label: Add rat in a maze
tags: [DSA, Backtracking]
---

# Rat in a Maze - Backtracking Solution

This project provides a solution to the classic "Rat in a Maze" problem using the backtracking algorithm. The problem involves a rat trying to find a path from the top-left corner to the bottom-right corner of a maze represented by a 2D grid. The rat can only move to cells that contain a `1`, and it can move only **right** or **down**. The solution determines whether there is a path, and if so, outputs the path taken by the rat.

## Problem Statement

Given an `n x n` maze, where each cell is represented as:
- `1` - The cell is open, and the rat can pass through.
- `0` - The cell is blocked by a wall, and the rat cannot pass through.

The rat starts at the top-left corner `(0, 0)` and needs to find a path to the bottom-right corner `(n-1, n-1)`.

### Example Maze:

```python
maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
]
```

In the example maze above:
- `1` represents an open cell the rat can pass through.
- `0` represents a blocked cell.

The program will output the solution path if it exists.

## Solution Approach

The solution uses a **backtracking** algorithm to explore the maze and find a possible path. At each cell `(x, y)`, the algorithm:
1. Checks if `(x, y)` is within bounds and if the cell is open (`1`).
2. Marks `(x, y)` as part of the solution path.
3. Attempts to move **right** and **down**.
4. If moving in one direction doesn’t lead to a solution, it backtracks, unmarking the cell.

## Code Implementation

```python
# Function to check if the cell (x, y) is within maze bounds and is a valid path
def is_safe(maze, x, y, n):
    return 0 <= x < n and 0 <= y < n and maze[x][y] == 1

# Recursive utility function to solve the maze problem
def solve_maze_util(maze, x, y, solution, n):
    # If (x, y) is the destination, mark it as part of the solution and return True
    if x == n - 1 and y == n - 1:
        solution[x][y] = 1
        return True

    # Check if maze[x][y] is a valid move
    if is_safe(maze, x, y, n):
        # Mark x, y as part of the solution path
        solution[x][y] = 1

        # Move right in x direction
        if solve_maze_util(maze, x + 1, y, solution, n):
            return True

        # Move down in y direction
        if solve_maze_util(maze, x, y + 1, solution, n):
            return True

        # If moving right or down doesn't work, backtrack by unmarking x, y
        solution[x][y] = 0
        return False

    return False

# Function to initialize the solution matrix and start the solving process
def solve_maze(maze):
    n = len(maze)
    # Initialize the solution matrix with 0's
    solution = [[0 for _ in range(n)] for _ in range(n)]

    if solve_maze_util(maze, 0, 0, solution, n):
        # Print the solution path
        for row in solution:
            print(row)
        return True
    else:
        print("No path found.")
        return False

# Example maze input
maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
]

solve_maze(maze)
```

## Explanation

- **`is_safe(maze, x, y, n)`**: This helper function checks if the cell `(x, y)` is within the maze bounds and is open (contains a `1`).
- **`solve_maze_util(maze, x, y, solution, n)`**: This is the core function that uses recursion to find the path. If the rat reaches the destination `(n-1, n-1)`, it marks the cell as part of the solution path and returns `True`. It tries to move right first; if unsuccessful, it tries to move down. If neither option works, it backtracks by unmarking the cell.
- **`solve_maze(maze)`**: This function initializes the solution matrix and starts the solving process by calling `solve_maze_util`. If a solution exists, it prints the solution path; otherwise, it outputs "No path found."

## Example Output

Given the example maze above, the output would be:

```
[1, 0, 0, 0]
[1, 1, 0, 0]
[0, 1, 0, 0]
[0, 1, 1, 1]
```

Each `1` in the solution matrix represents a part of the path from the start to the destination.

## How to Run the Code

1. Copy the code into a Python script or Jupyter Notebook.
2. Run the script. If there is a valid path, the solution matrix will display the path. Otherwise, it will print "No path found."

## Complexity Analysis

- **Time Complexity**: `O(2^(n^2))` - The function explores each cell to find the path and makes recursive calls in two directions (right and down).
- **Space Complexity**: `O(n^2)` - For the solution matrix, which holds the path information.

## Limitations

- This solution only supports moving right and down. For a more comprehensive solution, additional moves (left and up) can be included.
- If there are multiple paths, this solution only finds one (the first valid path found by the recursion).
