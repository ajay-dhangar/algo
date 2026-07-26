---
id: flood-fill
title: "Flood Fill"
sidebar_label: Flood Fill
description: "Solution for LeetCode 733: Flood Fill, utilizing Graph Traversal (DFS)."
tags: [DSA, leetcode, graph, dfs, bfs, matrix]
---

## Description:

An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image.

You are also given three integers `sr`, `sc`, and `color`. You should perform a **flood fill** on the image starting from the pixel `image[sr][sc]`.

To perform a flood fill, consider the starting pixel, plus any pixels connected **4-directionally** to the starting pixel of the same color as the starting pixel, plus any pixels connected **4-directionally** to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with `color`.

Return *the modified image after performing the flood fill*.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="C-2_uSRli8o"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Flood Fill Algorithm | C++ | Java | Leetcode 733"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (DFS) (Optimal)

This is a classic graph traversal problem on a 2D matrix. We want to start at the given pixel `(sr, sc)` and change its color to the new `color`. Then, we recursively visit all of its 4-directional neighbors (up, down, left, right) that share the **exact same original color** as the starting pixel, and update their colors as well.

**Algorithm:**
1. Check if the starting pixel `image[sr][sc]` is already the new `color`. If it is, return the image immediately to avoid an infinite loop.
2. Store the original color of the starting pixel in a variable `initialColor`.
3. Launch a DFS helper function from `(sr, sc)`.
4. In the DFS function:
   - Check boundaries: If the current row or column is out of bounds, return.
   - Check color: If the current pixel's color does not match `initialColor`, return.
   - Update the pixel's color to the new `color`.
   - Recursively call the DFS function for the pixel's 4 neighbors: `(r-1, c)`, `(r+1, c)`, `(r, c-1)`, `(r, c+1)`.
5. Return the modified image.

#### Complexity
* **Time Complexity:** $O(M \times N)$ where $M$ is the number of rows and $N$ is the number of columns. In the worst-case scenario, we might have to process and recolor every single pixel in the image.
* **Space Complexity:** $O(M \times N)$ for the recursion call stack in the worst case (e.g., if the entire image is the same color and the recursion goes deep).

#### Solutions:

**C++**
```cpp
class Solution {
private:
    void dfs(vector<vector<int>>& image, int r, int c, int initialColor, int newColor) {
        // Boundary checks and color check
        if (r < 0 || r >= image.size() || c < 0 || c >= image[0].size() || image[r][c] != initialColor) {
            return;
        }
        
        // Update color
        image[r][c] = newColor;
        
        // 4-directional DFS
        dfs(image, r - 1, c, initialColor, newColor); // Up
        dfs(image, r + 1, c, initialColor, newColor); // Down
        dfs(image, r, c - 1, initialColor, newColor); // Left
        dfs(image, r, c + 1, initialColor, newColor); // Right
    }
    
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int initialColor = image[sr][sc];
        
        // Avoid infinite loop if the color is already the target color
        if (initialColor != color) {
            dfs(image, sr, sc, initialColor, color);
        }
        
        return image;
    }
};
```

**Java**
```java
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int initialColor = image[sr][sc];
        
        if (initialColor != color) {
            dfs(image, sr, sc, initialColor, color);
        }
        
        return image;
    }
    
    private void dfs(int[][] image, int r, int c, int initialColor, int newColor) {
        if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] != initialColor) {
            return;
        }
        
        image[r][c] = newColor;
        
        dfs(image, r - 1, c, initialColor, newColor);
        dfs(image, r + 1, c, initialColor, newColor);
        dfs(image, r, c - 1, initialColor, newColor);
        dfs(image, r, c + 1, initialColor, newColor);
    }
}
```

**Python**
```py
class Solution:
    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
        initialColor = image[sr][sc]
        
        if initialColor == color:
            return image
            
        def dfs(r, c):
            if r < 0 or r >= len(image) or c < 0 or c >= len(image[0]) or image[r][c] != initialColor:
                return
                
            image[r][c] = color
            
            dfs(r - 1, c)
            dfs(r + 1, c)
            dfs(r, c - 1)
            dfs(r, c + 1)
            
        dfs(sr, sc)
        return image
```

**JavaScript**
```js
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    const initialColor = image[sr][sc];
    
    if (initialColor === color) return image;
    
    const dfs = (r, c) => {
        if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== initialColor) {
            return;
        }
        
        image[r][c] = color;
        
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    };
    
    dfs(sr, sc);
    return image;
};
```