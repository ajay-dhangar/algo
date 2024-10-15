---
id: fence-painting
sidebar_position: 12
title: Fence Painting Problem
sidebar_label: Fence Painting
description: "In this blog post, we'll explore the fence painting problem and calculate the number of ways to paint the fence using dynamic programming."
tags: [dsa, dynamic programming, algorithms]
---

## Introduction
The fence painting problem is a classic example of combinatorial problems in dynamic programming. Given a number of fence posts and a set of colors, the challenge is to determine the number of ways to paint the fence such that no two adjacent posts have the same color.

## Problem Statement
Given:
- `n`: The number of fence posts.
- `k`: The number of colors available.

The goal is to calculate the total number of ways to paint the fence.

## Dynamic Programming Approach
To solve this problem efficiently, we use dynamic programming. We maintain two variables:
- **same:** The number of ways to paint the current post the same color as the previous post.
- **diff:** The number of ways to paint the current post a different color from the previous post.

### Base Cases
1. If there is only one post, there are `k` ways to paint it.
2. If there are two posts, we can paint the first post in `k` ways and the second post in `k` ways, resulting in `k * k` ways.

### Recursive Relation
For `n > 2`, the relations are:
- The current post painted the same color as the previous: `same = diff`.
- The current post painted a different color: `diff = total * (k - 1)`, where `total = same + diff`.

### Implementation
Here’s how you can implement this in C++:

```cpp
#include <stdio.h> 

// Function to calculate the number of ways to paint the fence
int countWays(int n, int k) {
    // If there's only one post, there are 'k' ways to paint it
    if (n == 1)
        return k;

    // If there are two posts:
    // For the first post, we have 'k' options.
    // For the second post, we can either paint it the same as the first or different.
    // There are 'k' ways to paint the first post, and for the second:
    // - If it's the same, there are 'k' options.
    // - If it's different, there are 'k * (k - 1)' options.
    if (n == 2)
        return k * k;

    // For more than two posts, we use dynamic programming
    int same = k;           // Ways to paint the first 2 posts the same
    int diff = k * (k - 1); // Ways to paint the first 2 posts differently
    int total = same + diff;

    // Loop through the remaining posts
    for (int i = 3; i <= n; i++) {
        same = diff; // The current post has to be different from the previous one
        diff = total * (k - 1); // All 'k-1' color options for painting differently
        total = same + diff;    // Total ways to paint up to current post
    }

    return total;
}

// Driver program to test the function
int main() {
    int n = 3; // Number of fence posts
    int k = 2; // Number of colors

    printf("Number of ways to paint the fence: %d\n", countWays(n, k));

    return 0;
}
