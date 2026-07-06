---
id: transform-to-chessboard
title: "Transform to Chessboard"
sidebar_label: Transform to Chessboard
description: "Solving the Transform to Chessboard problem using Math and Matrix properties."
tags: [DSA, leetcode, math, array, bit-manipulation, matrix]
---

## Description:

You are given an `n x n` binary grid `board`. In each move, you can swap any two rows with each other, or any two columns with each other.

Return the minimum number of moves to transform the board into a **chessboard board**. If the task is impossible, return `-1`.

A **chessboard board** is a board where no `0`'s and no `1`'s are 4-directionally adjacent.

**Example 1:**

Input: `board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]`
Output: `2`
**Explanation:** One potential sequence of moves is as follows:
Swap column 0 with column 1 to get: `[[1,0,1,0],[1,0,1,0],[0,1,0,1],[0,1,0,1]]`
Swap row 1 with row 2 to get: `[[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]`
The board is now a valid chessboard, and the minimum number of moves is 2.

**Example 2:**

Input: `board = [[0,1],[1,0]]`
Output: `0`
**Explanation:** Also note that the board with `0` in the top left corner, is also a valid chessboard.

**Example 3:**

Input: `board = [[1,0],[1,0]]`
Output: `-1`
**Explanation:** No matter what sequence of moves you make, you cannot end with a valid chessboard.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="pPks_UrfETo"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Transform to Chessboard"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Optimal Approach (Math and Matrix Properties)

To solve this in $O(N^2)$ time, we need to recognize the strict mathematical properties that a valid chessboard matrix possesses:

1. **The Corner Property:** In a valid chessboard, any $2 \times 2$ subgrid formed by intersecting 2 rows and 2 columns will have corners that either sum to an even number of 1s (0, 2, or 4). Mathematically, this means `board[0][0] ^ board[i][0] ^ board[0][j] ^ board[i][j] == 0` for all $i$ and $j$. If this fails, a chessboard is impossible.
2. **Row/Col Constraints:** In a valid chessboard, half the elements in each row and column must be 1, and half must be 0. If $N$ is odd, the count difference can be at most 1.
3. **Calculating Swaps:** - A row or column is valid if it alternates `0, 1, 0, 1...` or `1, 0, 1, 0...`.
   - We count how many elements are out of place compared to an idealized row/col starting with 1.
   - If $N$ is even, we can either match the pattern starting with 1 or starting with 0. We take the minimum swaps required.
   - If $N$ is odd, only one pattern is possible (the one that has an even number of out-of-place elements, since each swap fixes 2 elements).

#### Complexity
* **Time Complexity:** $O(N^2)$ where $N$ is the dimension of the board. We traverse the entire matrix once to validate the corner property and count misplacements.
* **Space Complexity:** $O(1)$ as we only maintain a few integer counters regardless of the board size.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int movesToChessboard(vector<vector<int>>& board) {
        int n = board.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (board[0][0] ^ board[i][0] ^ board[0][j] ^ board[i][j]) {
                    return -1;
                }
            }
        }
        
        int rowSum = 0, colSum = 0, rowSwap = 0, colSwap = 0;
        for (int i = 0; i < n; i++) {
            rowSum += board[0][i];
            colSum += board[i][0];
            if (board[i][0] == i % 2) rowSwap++;
            if (board[0][i] == i % 2) colSwap++;
        }
        
        if (rowSum != n / 2 && rowSum != (n + 1) / 2) return -1;
        if (colSum != n / 2 && colSum != (n + 1) / 2) return -1;
        
        if (n % 2 == 1) {
            if (colSwap % 2 == 1) colSwap = n - colSwap;
            if (rowSwap % 2 == 1) rowSwap = n - rowSwap;
        } else {
            colSwap = min(n - colSwap, colSwap);
            rowSwap = min(n - rowSwap, rowSwap);
        }
        
        return (colSwap + rowSwap) / 2;
    }
};
```

**Java**
```java
class Solution {
    public int movesToChessboard(int[][] board) {
        int n = board.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if ((board[0][0] ^ board[i][0] ^ board[0][j] ^ board[i][j]) == 1) {
                    return -1;
                }
            }
        }
        
        int rowSum = 0, colSum = 0, rowSwap = 0, colSwap = 0;
        for (int i = 0; i < n; i++) {
            rowSum += board[0][i];
            colSum += board[i][0];
            if (board[i][0] == i % 2) rowSwap++;
            if (board[0][i] == i % 2) colSwap++;
        }
        
        if (rowSum != n / 2 && rowSum != (n + 1) / 2) return -1;
        if (colSum != n / 2 && colSum != (n + 1) / 2) return -1;
        
        if (n % 2 == 1) {
            if (colSwap % 2 == 1) colSwap = n - colSwap;
            if (rowSwap % 2 == 1) rowSwap = n - rowSwap;
        } else {
            colSwap = Math.min(n - colSwap, colSwap);
            rowSwap = Math.min(n - rowSwap, rowSwap);
        }
        
        return (colSwap + rowSwap) / 2;
    }
}
```

**Python**
```py
class Solution:
    def movesToChessboard(self, board: list[list[int]]) -> int:
        n = len(board)
        # Check corner property
        for i in range(n):
            for j in range(n):
                if board[0][0] ^ board[i][0] ^ board[0][j] ^ board[i][j]:
                    return -1
                    
        row_sum = col_sum = row_swap = col_swap = 0
        
        for i in range(n):
            row_sum += board[0][i]
            col_sum += board[i][0]
            if board[i][0] == i % 2:
                row_swap += 1
            if board[0][i] == i % 2:
                col_swap += 1
                
        if row_sum not in [n // 2, (n + 1) // 2]:
            return -1
        if col_sum not in [n // 2, (n + 1) // 2]:
            return -1
            
        if n % 2 == 1:
            if col_swap % 2 == 1: col_swap = n - col_swap
            if row_swap % 2 == 1: row_swap = n - row_swap
        else:
            col_swap = min(n - col_swap, col_swap)
            row_swap = min(n - row_swap, row_swap)
            
        return (col_swap + row_swap) // 2
```

**JavaScript**
```js
/**
 * @param {number[][]} board
 * @return {number}
 */
var movesToChessboard = function(board) {
    let n = board.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[0][0] ^ board[i][0] ^ board[0][j] ^ board[i][j]) {
                return -1;
            }
        }
    }
    
    let rowSum = 0, colSum = 0, rowSwap = 0, colSwap = 0;
    for (let i = 0; i < n; i++) {
        rowSum += board[0][i];
        colSum += board[i][0];
        if (board[i][0] === i % 2) rowSwap++;
        if (board[0][i] === i % 2) colSwap++;
    }
    
    if (rowSum !== Math.floor(n / 2) && rowSum !== Math.floor((n + 1) / 2)) return -1;
    if (colSum !== Math.floor(n / 2) && colSum !== Math.floor((n + 1) / 2)) return -1;
    
    if (n % 2 === 1) {
        if (colSwap % 2 === 1) colSwap = n - colSwap;
        if (rowSwap % 2 === 1) rowSwap = n - rowSwap;
    } else {
        colSwap = Math.min(n - colSwap, colSwap);
        rowSwap = Math.min(n - rowSwap, rowSwap);
    }
    
    return (colSwap + rowSwap) / 2;
};
```