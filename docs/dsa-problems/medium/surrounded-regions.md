---
id: surrounded-regions
title: "Surrounded Regions"
sidebar_label: Surrounded Regions
description: "Solution for LeetCode 130: Surrounded Regions, utilizing Graph Traversal (DFS) on the boundaries to capture enclosed components."
tags: [DSA, leetcode, graph, dfs, bfs, matrix]
---

## Description:

Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.

A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.

---

## Video Solution:

<LiteYouTubeEmbed
  id="BtdgAys4yMk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Surrounded Regions | Replace O's with X's | C++ | Java"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (DFS) on Boundaries (Optimal)

This problem can be tricky if we try to find surrounded regions directly. Instead, it is much easier to identify the **unsurrounded** regions. Any `'O'` that is connected to the boundary of the board cannot be surrounded by `'X'`s. 

We can solve this using a reverse-thinking approach:
1. Traverse the boundaries (first row, last row, first column, last column) of the board.
2. If we find an `'O'` on the boundary, we launch a DFS from that cell. The DFS will visit all adjacent `'O'`s and mark them as "safe" (e.g., by temporarily flipping them to a special character like `'T'`).
3. Once the boundary traversal is complete, any `'O'` remaining on the board is strictly surrounded by `'X'`s.
4. Iterate over the entire board one last time:
   - Flip every remaining `'O'` to `'X'` (these are the captured regions).
   - Flip every `'T'` back to `'O'` (these are the safe regions that were connected to the boundary).

#### Complexity
* **Time Complexity:** $O(M \times N)$ where $M$ is the number of rows and $N$ is the number of columns. We visit each cell at most a constant number of times.
* **Space Complexity:** $O(M \times N)$ in the worst-case scenario for the recursion call stack (e.g., if the entire board is filled with `'O'`s).

#### Solutions:

**C++**
```cpp
class Solution {
private:
    void dfs(vector<vector<char>>& board, int r, int c) {
        // Boundary check and look for 'O'
        if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size() || board[r][c] != 'O') {
            return;
        }
        
        // Mark as a safe, unsurrounded region
        board[r][c] = 'T';
        
        // Traverse all 4 adjacent directions
        dfs(board, r - 1, c);
        dfs(board, r + 1, c);
        dfs(board, r, c - 1);
        dfs(board, r, c + 1);
    }
    
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        
        int m = board.size();
        int n = board[0].size();
        
        // Traverse first and last columns
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][n - 1] == 'O') dfs(board, i, n - 1);
        }
        
        // Traverse first and last rows
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j);
            if (board[m - 1][j] == 'O') dfs(board, m - 1, j);
        }
        
        // Process the board
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X'; // Captured
                } else if (board[i][j] == 'T') {
                    board[i][j] = 'O'; // Safe
                }
            }
        }
    }
};
```

**Java**
```java
class Solution {
    public void solve(char[][] board) {
        if (board == null || board.length == 0) return;
        
        int m = board.length;
        int n = board[0].length;
        
        // Traverse first and last columns
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][n - 1] == 'O') dfs(board, i, n - 1);
        }
        
        // Traverse first and last rows
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j);
            if (board[m - 1][j] == 'O') dfs(board, m - 1, j);
        }
        
        // Process the board
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X'; // Captured
                } else if (board[i][j] == 'T') {
                    board[i][j] = 'O'; // Safe
                }
            }
        }
    }
    
    private void dfs(char[][] board, int r, int c) {
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != 'O') {
            return;
        }
        
        board[r][c] = 'T';
        
        dfs(board, r - 1, c);
        dfs(board, r + 1, c);
        dfs(board, r, c - 1);
        dfs(board, r, c + 1);
    }
}
```

**Python**
```py
class Solution:
    def solve(self, board: list[list[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if not board:
            return
            
        m, n = len(board), len(board[0])
        
        def dfs(r, c):
            if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != 'O':
                return
            
            board[r][c] = 'T'
            
            dfs(r - 1, c)
            dfs(r + 1, c)
            dfs(r, c - 1)
            dfs(r, c + 1)
            
        # Traverse first and last columns
        for i in range(m):
            if board[i][0] == 'O': dfs(i, 0)
            if board[i][n - 1] == 'O': dfs(i, n - 1)
            
        # Traverse first and last rows
        for j in range(n):
            if board[0][j] == 'O': dfs(0, j)
            if board[m - 1][j] == 'O': dfs(m - 1, j)
            
        # Process the board
        for i in range(m):
            for j in range(n):
                if board[i][j] == 'O':
                    board[i][j] = 'X' # Captured
                elif board[i][j] == 'T':
                    board[i][j] = 'O' # Safe
```

**JavaScript**
```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    if (!board || board.length === 0) return;
    
    const m = board.length;
    const n = board[0].length;
    
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== 'O') {
            return;
        }
        
        board[r][c] = 'T';
        
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    };
    
    // Traverse first and last columns
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') dfs(i, 0);
        if (board[i][n - 1] === 'O') dfs(i, n - 1);
    }
    
    // Traverse first and last rows
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O') dfs(0, j);
        if (board[m - 1][j] === 'O') dfs(m - 1, j);
    }
    
    // Process the board
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X'; // Captured
            } else if (board[i][j] === 'T') {
                board[i][j] = 'O'; // Safe
            }
        }
    }
};
```