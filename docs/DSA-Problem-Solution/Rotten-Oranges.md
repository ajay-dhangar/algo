
id: rotten-oranges
title: "Rotten Oranges Algorithm"
sidebar_label: "RottenOranges algorithm"
tags: [Leetcode, BFS, Graph, DSA, Rotten Oranges]
description: Solve the Rotten Oranges problem using Breadth-First Search (BFS) to determine the minimum time required for all fresh oranges to rot.
Rotten Oranges Algorithm
Description
The Rotten Oranges problem is a grid-based problem that involves determining the minimum time required for all fresh oranges to rot given an initial configuration of fresh and rotten oranges.

Problem Definition
Given:

A 2D grid where each cell can have one of three values:
0: an empty cell
1: a fresh orange
2: a rotten orange
Objective:

Return the minimum number of minutes needed for all fresh oranges to become rotten. If it’s impossible for all oranges to rot, return -1.
Algorithm Overview
Breadth-First Search (BFS) Approach:

Use BFS to simulate the spread of rotting from each rotten orange to adjacent fresh oranges. Each level of BFS represents one minute.
Initialization:

Initialize a queue with all initial rotten oranges and count the fresh oranges.
Track the minutes taken for all oranges to rot.
Processing BFS Levels:

For each rotten orange, attempt to rot adjacent fresh oranges (up, down, left, right).
Add newly rotten oranges to the queue and decrement the count of fresh oranges.
Result Evaluation:

If there are no remaining fresh oranges after BFS, return the minutes taken. If fresh oranges remain, return -1.
Time Complexity
Time Complexity: O(n * m), where n is the number of rows and m is the number of columns, as each cell is processed at most once.
Space Complexity: O(n * m) for the BFS queue.
C++ Implementation
```
cpp
Copy code
#include <vector>
#include <queue>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {
    int rows = grid.size();
    int cols = grid[0].size();
    queue<pair<int, int>> rottenQueue;
    int freshOranges = 0;
    int minutes = 0;

    // Initialize queue with all initially rotten oranges and count fresh oranges
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == 2) {
                rottenQueue.push({i, j});
            } else if (grid[i][j] == 1) {
                freshOranges++;
            }
        }
    }

    // Directions for adjacent cells (up, down, left, right)
    vector<pair<int, int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    // Perform BFS to rot adjacent oranges
    while (!rottenQueue.empty() && freshOranges > 0) {
        int size = rottenQueue.size();
        minutes++;

        for (int i = 0; i < size; i++) {
            auto [x, y] = rottenQueue.front();
            rottenQueue.pop();

            for (auto [dx, dy] : directions) {
                int newX = x + dx;
                int newY = y + dy;

                // Check if the adjacent cell is within bounds and has a fresh orange
                if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && grid[newX][newY] == 1) {
                    // Rot the fresh orange
                    grid[newX][newY] = 2;
                    freshOranges--;
                    rottenQueue.push({newX, newY});
                }
            }
        }
    }

    // If there are fresh oranges left, return -1, otherwise return minutes taken
    return freshOranges == 0 ? minutes : -1;
}
```
This algorithm efficiently uses BFS to simulate the spread of rot across the grid, ensuring that all reachable fresh oranges rot in the minimum time or determining that it's impossible.






