---
id: word-search
title: "Word Search"
sidebar_label: Word Search
description: "Solving the Word Search problem using recursive backtracking and Depth-First Search (DFS)."
tags: [DSA, leetcode, array, backtracking, matrix]
---

## Description:

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**

Input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "ABCCED"`
Output: `true`

**Example 2:**

Input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "SEE"`
Output: `true`

**Example 3:**

Input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "ABCB"`
Output: `false`

---

## Approaches:

### 1. Recursive Backtracking (DFS)

To find if a specific word exists in a grid, we can treat the grid as a graph and perform a **Depth-First Search (DFS)** starting from any cell that matches the first letter of our target word. 

1. **Iterate through the Grid:** Loop over every cell `(i, j)` in the matrix. If the cell's character matches the first character of the `word`, we initiate our recursive DFS from that cell.
2. **DFS / Backtracking Logic:**
   - **Base Case 1:** If we have matched all characters in the word (i.e., our current `index` equals the length of the word), we found the word! Return `true`.
   - **Base Case 2:** If we go out of bounds of the matrix, or if the current cell's character does not match the character at the current `index` of our word, return `false`.
   - **Mark as Visited:** To ensure we don't use the same cell twice in a single word path, we temporarily modify the current cell (e.g., change it to `'#'` or `*`).
   - **Explore:** Recursively call the DFS function for all four adjacent directions (up, down, left, right), incrementing the `index` by 1.
   - **Backtrack:** After returning from the recursive calls, we must restore the cell's original character so it can be potentially used in other valid search paths starting from different cells.
3. **Result:** If any of our DFS paths return `true`, the word exists. If we check all paths from all valid starting cells and find nothing, return `false`.

### Complexity
* **Time Complexity:** $O(M \times N \times 3^L)$ where $M$ is the number of rows, $N$ is the number of columns, and $L$ is the length of the word. We iterate through every cell, and in the worst case, the DFS explores 3 directions (since we cannot visit the cell we just came from) for every character up to length $L$.
* **Space Complexity:** $O(L)$ for the recursion stack space. The maximum depth of the DFS recursion tree will be equal to the length of the word $L$.

---

## Solutions:

### C++
```cpp
class Solution {
public:
    bool dfs(vector<vector<char>>& board, const string& word, int i, int j, int index) {
        // Base case: entire word is found
        if (index == word.length()) return true;
        
        // Check out of bounds or character mismatch
        if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != word[index]) {
            return false;
        }
        
        // Mark as visited by temporarily altering the cell
        char temp = board[i][j];
        board[i][j] = '#';
        
        // Explore 4 directions
        bool found = dfs(board, word, i + 1, j, index + 1) ||
                     dfs(board, word, i - 1, j, index + 1) ||
                     dfs(board, word, i, j + 1, index + 1) ||
                     dfs(board, word, i, j - 1, index + 1);
                     
        // Backtrack: restore the original character
        board[i][j] = temp;
        
        return found;
    }
    
    bool exist(vector<vector<char>>& board, const string& word) {
        if (board.empty() || board[0].empty() || word.empty()) return false;
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                // Start DFS if the first character matches
                if (board[i][j] == word[0] && dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

### Java
```java
class Solution {
    public boolean exist(char[][] board, String word) {
        if (board == null || board.length == 0 || board[0].length == 0 || word == null || word.isEmpty()) {
            return false;
        }
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                // Start DFS if the first character matches
                if (board[i][j] == word.charAt(0) && dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean dfs(char[][] board, String word, int i, int j, int index) {
        // Base case: entire word is found
        if (index == word.length()) return true;
        
        // Check out of bounds or character mismatch
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(index)) {
            return false;
        }
        
        // Mark as visited by temporarily altering the cell
        char temp = board[i][j];
        board[i][j] = '#';
        
        // Explore 4 directions
        boolean found = dfs(board, word, i + 1, j, index + 1) ||
                        dfs(board, word, i - 1, j, index + 1) ||
                        dfs(board, word, i, j + 1, index + 1) ||
                        dfs(board, word, i, j - 1, index + 1);
                        
        // Backtrack: restore the original character
        board[i][j] = temp;
        
        return found;
    }
}
```

### Python
```py
class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        if not board or not board[0] or not word:
            return False
        rows, cols = len(board), len(board[0])
        
        def dfs(r, c, index):
            # Base case: entire word is found
            if index == len(word):
                return True
                
            # Check out of bounds or character mismatch
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[index]:
                return False
                
            # Mark as visited by temporarily altering the cell
            temp = board[r][c]
            board[r][c] = '#'
            
            # Explore 4 directions
            found = (dfs(r + 1, c, index + 1) or
                     dfs(r - 1, c, index + 1) or
                     dfs(r, c + 1, index + 1) or
                     dfs(r, c - 1, index + 1))
                     
            # Backtrack: restore the original character
            board[r][c] = temp
            
            return found
            
        for r in range(rows):
            for c in range(cols):
                # Start DFS if the first character matches
                if board[r][c] == word[0] and dfs(r, c, 0):
                    return True
                    
        return False
```

### JavaScript
```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    if (!board || board.length === 0 || board[0].length === 0 || !word) return false;
    const rows = board.length;
    const cols = board[0].length;
    
    const dfs = (r, c, index) => {
        // Base case: entire word is found
        if (index === word.length) return true;
        
        // Check out of bounds or character mismatch
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[index]) {
            return false;
        }
        
        // Mark as visited by temporarily altering the cell
        const temp = board[r][c];
        board[r][c] = '#';
        
        // Explore 4 directions
        const found = dfs(r + 1, c, index + 1) ||
                      dfs(r - 1, c, index + 1) ||
                      dfs(r, c + 1, index + 1) ||
                      dfs(r, c - 1, index + 1);
                      
        // Backtrack: restore the original character
        board[r][c] = temp;
        
        return found;
    };
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Start DFS if the first character matches
            if (board[r][c] === word[0] && dfs(r, c, 0)) {
                return true;
            }
        }
    }
    
    return false;
};
```