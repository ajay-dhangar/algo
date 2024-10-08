---
id: flood-fill 
title: Flood Fill Algorithm 
sidebar_label: Flood Fill Algorithm 
Description: "In this blog post, we'll explore the Flood Fill Algorithm, an efficient algorithm used to modify connected components in images or grids by filling them with a new color starting from a given point." 
tags: [dsa, algorithms, flood fill, image processing]
---
## Definition:
Flood Fill is an efficient algorithm used to fill a contiguous area of a multi-dimensional array (such as a grid or an image) starting from a given point, replacing all connected pixels or cells of a certain color with a new color. It is widely used in graphics tools and image editing applications.

### Characteristics:
Connected Components:

The algorithm identifies a region of connected pixels (or cells) where each pixel has the same color, starting from a specific pixel. These connected pixels can be in four directions (up, down, left, right), or optionally in eight directions (if diagonal adjacency is considered).
Depth-First Search (DFS) or Breadth-First Search (BFS):

The flood fill algorithm can be implemented using either DFS or BFS. DFS uses recursion to explore all connected pixels, while BFS processes pixels in a queue-like manner. DFS is more common for this problem, but BFS may be preferred for larger grids to avoid recursion stack limits.
Boundary Checks:

The algorithm ensures that it does not go outside the grid or reprocess pixels that are already filled with the new color.
Linear Time Complexity:

The algorithm runs in O(N) time complexity, where N is the total number of pixels in the grid (rows × columns). Each pixel is visited once and changed as needed.

### Time Complexity:
Best, Average, and Worst Case: O(N)
In all cases, the algorithm needs to visit all pixels in the connected component, resulting in a time complexity proportional to the total number of pixels.

### Space Complexity:
Space Complexity: O(N)
The space complexity comes from the stack space used by recursion in DFS or the queue in BFS. The worst case occurs when every pixel is visited, leading to O(N) space usage.

### Steps of the Flood Fill Algorithm:
Initial Conditions and Checks:

Check if the starting point is out of bounds or if the pixel is already the target color. If so, return early to avoid unnecessary computations.
Recursive or Iterative Filling:

Starting at the given pixel, change its color to the new color.
Recursively (DFS) or iteratively (BFS) explore all connected pixels (up, down, left, right) that have the same original color and fill them with the new color.
Edge Handling:

Ensure that the algorithm handles boundaries and does not go outside the grid. Each pixel should be visited once and only if it matches the original color.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // Function to perform the flood fill
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int val = image[sr][sc];  // Original color of the starting pixel
        if (val != newColor) {
            // Call DFS to fill connected pixels
            dfs(image, sr, sc, val, newColor);
        }
        return image;
    }

private:
    // DFS function to recursively fill the connected components
    void dfs(vector<vector<int>>& image, int row, int col, int val, int newColor) {
        // Base case: check if pixel is out of bounds or already filled
        if (row < 0 || col < 0 || row >= image.size() || col >= image[0].size() || image[row][col] != val) {
            return;
        }

        // Fill the current pixel with the new color
        image[row][col] = newColor;

        // Directions for moving: up, down, left, right
        int dirR[] = {-1, 1, 0, 0};  // Row direction (up, down)
        int dirC[] = {0, 0, -1, 1};  // Column direction (left, right)

        // Recursively apply flood fill in all four directions
        for (int i = 0; i < 4; i++) {
            dfs(image, row + dirR[i], col + dirC[i], val, newColor);
        }
    }
};

int main() {
    Solution solution;
    
    // Example image (2D grid)
    vector<vector<int>> image = {{1, 1, 1},
                                 {1, 1, 0},
                                 {1, 0, 1}};
    
    // Starting point (1, 1) and new color 2
    int sr = 1, sc = 1, newColor = 2;
    
    // Perform flood fill and print the result
    vector<vector<int>> result = solution.floodFill(image, sr, sc, newColor);
    
    // Output the modified image
    cout << "Flood Filled Image:\n";
    for (const auto& row : result) {
        for (int pixel : row) {
            cout << pixel << " ";
        }
        cout << endl;
    }
    
    return 0;
}
