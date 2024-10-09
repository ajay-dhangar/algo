---
id: flood-fill
title: Flood Fill Algorithm
sidebar_label: Flood Fill Algorithm
description: "In this blog post, we'll explore the Flood Fill Algorithm, a popular technique used in computer graphics for determining connected regions, such as filling areas in images and solving puzzles like the paint bucket tool in graphics editing software."
tags: [dsa, algorithms, graphics, connected components]
---
# Flood Fill Algorithm

## Introduction

The **Flood Fill Algorithm** is a method used in computer graphics to determine connected regions in a two-dimensional array (or grid) of pixels. It is commonly utilized for tasks such as filling areas in images, similar to the paint bucket tool in graphics editing software. The algorithm can also be applied in game development for tasks like determining the area of influence for a character or object.

## How Flood Fill Works

Flood fill operates by exploring adjacent pixels (or nodes) that share the same color or value as the starting pixel. The process can be performed using either a **recursive** or **iterative** approach. 

### Steps of the Algorithm:

1. **Select a Starting Pixel**: Choose a pixel (or node) as the starting point for the fill operation.
2. **Check Color**: Compare the color of the current pixel with the target color (the color you want to fill).
3. **Fill Color**: If the current pixel matches the target color, change its color to the new color.
4. **Explore Neighbors**: Recursively (or iteratively) apply the same process to the neighboring pixels (up, down, left, right).
5. **Termination**: The algorithm stops when all connected pixels that match the target color have been filled.

## Variants of Flood Fill

There are two primary implementations of the Flood Fill algorithm:

### 1. Recursive Flood Fill

In the recursive version, the algorithm calls itself for each neighboring pixel. While this method is straightforward, it can lead to a stack overflow if the area to fill is too large due to deep recursion.

#### Recursive Implementation in C++:

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// Recursive Flood Fill Function
void floodFillRecursive(int x, int y, int targetColor, int newColor, vector<vector<int>>& image) {
    // Out of bounds check
    if (x < 0 || x >= image.size() || y < 0 || y >= image[0].size()) return;
    // Color doesn't match
    if (image[x][y] != targetColor) return;

    image[x][y] = newColor; // Fill the color

    // Recursively fill the neighboring pixels
    floodFillRecursive(x + 1, y, targetColor, newColor, image); // Down
    floodFillRecursive(x - 1, y, targetColor, newColor, image); // Up
    floodFillRecursive(x, y + 1, targetColor, newColor, image); // Right
    floodFillRecursive(x, y - 1, targetColor, newColor, image); // Left
}

// Iterative Flood Fill Function
void floodFillIterative(int x, int y, int targetColor, int newColor, vector<vector<int>>& image) {
    // Out of bounds check
    if (image[x][y] != targetColor) return; // Color doesn't match

    int rows = image.size();
    int cols = image[0].size();
    queue<pair<int, int>> q;
    q.push({x, y});

    while (!q.empty()) {
        auto [curX, curY] = q.front();
        q.pop();
        image[curX][curY] = newColor; // Fill the color

        // Explore neighbors
        if (curX + 1 < rows && image[curX + 1][curY] == targetColor) q.push({curX + 1, curY}); // Down
        if (curX - 1 >= 0 && image[curX - 1][curY] == targetColor) q.push({curX - 1, curY}); // Up
        if (curY + 1 < cols && image[curX][curY + 1] == targetColor) q.push({curX, curY + 1}); // Right
        if (curY - 1 >= 0 && image[curX][curY - 1] == targetColor) q.push({curX, curY - 1}); // Left
    }
}

// Function to print the image
void printImage(const vector<vector<int>>& image) {
    for (const auto& row : image) {
        for (const auto& pixel : row) {
            cout << pixel << " ";
        }
        cout << endl;
    }
}

// Main function to demonstrate Flood Fill
int main() {
    vector<vector<int>> image = {
        {1, 1, 1, 1, 0},
        {1, 1, 0, 1, 1},
        {1, 1, 1, 1, 1},
        {0, 1, 0, 0, 1},
        {1, 1, 1, 1, 1}
    };

    int x = 1, y = 1; // Starting point
    int newColor = 2; // New color to fill
    int targetColor = image[x][y]; // Color to replace

    cout << "Original Image:" << endl;
    printImage(image);

    // Using Recursive Flood Fill
    floodFillRecursive(x, y, targetColor, newColor, image);
    cout << "\nImage after Recursive Flood Fill:" << endl;
    printImage(image);

    // Reset the image for Iterative Flood Fill demonstration
    image = {
        {1, 1, 1, 1, 0},
        {1, 1, 0, 1, 1},
        {1, 1, 1, 1, 1},
        {0, 1, 0, 0, 1},
        {1, 1, 1, 1, 1}
    };

    // Using Iterative Flood Fill
    floodFillIterative(x, y, targetColor, newColor, image);
    cout << "\nImage after Iterative Flood Fill:" << endl;
    printImage(image);

    return 0;
}
```
### 2. Iterative Flood Fill
The iterative version uses a queue (or stack) to keep track of the pixels that need to be processed. This approach is more memory-efficient for larger areas as it avoids deep recursion.

### Iterative Implementation in C++:
```cpp

void floodFillIterative(int x, int y, int targetColor, int newColor, vector<vector<int>>& image) {
    if (image[x][y] != targetColor) return; // Color doesn't match

    int rows = image.size();
    int cols = image[0].size();
    queue<pair<int, int>> q;
    q.push({x, y});

    while (!q.empty()) {
        auto [curX, curY] = q.front();
        q.pop();
        image[curX][curY] = newColor; // Fill the color

        // Explore neighbors
        if (curX + 1 < rows && image[curX + 1][curY] == targetColor) q.push({curX + 1, curY}); // Down
        if (curX - 1 >= 0 && image[curX - 1][curY] == targetColor) q.push({curX - 1, curY}); // Up
        if (curY + 1 < cols && image[curX][curY + 1] == targetColor) q.push({curX, curY + 1}); // Right
        if (curY - 1 >= 0 && image[curX][curY - 1] == targetColor) q.push({curX, curY - 1}); // Left
    }
}
```
###  Applications of Flood Fill
Image Editing: Filling contiguous areas with color, as seen in paint applications.
Game Development: Used for detecting and filling areas of influence or terrain.
Pathfinding: Determining reachable areas in grid-based maps.
Geographical Mapping: Filling regions in geographical information systems (GIS).

### Complexity Analysis

### Time Complexity: O(N), where N is the number of pixels in the area to be filled. Each pixel is visited once.
### Space Complexity:
Recursive: O(H), where H is the maximum height of the recursion stack.
Iterative: O(N) in the worst case, if all pixels are connected.

### Conclusion
The Flood Fill Algorithm is a fundamental technique in computer graphics and various other fields. Understanding its implementation and applications allows developers to efficiently solve problems related to connected regions, making it a valuable tool in both graphics programming and algorithm design.
