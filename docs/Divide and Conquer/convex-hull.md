---
id: convex-hull
title: "Convex Hull Problem"
sidebar_label: "Convex Hull"

description: "This document provides an overview of the Convex Hull problem using the divide-and-conquer approach."

tags: [divide-and-conquer, computational-geometry, algorithms]
---

# Convex Hull Problem

## Overview

The Convex Hull of a set of points is the smallest convex boundary that can enclose all the points in the set. It can be visualized as a rubber band stretched around the outermost points. The Convex Hull is a fundamental problem in computational geometry with applications in fields like image processing, pathfinding, and geographic information systems.

## Problem Statement

Given a set of points in a 2D plane, find the convex polygon that encloses all the points. Each vertex of this polygon is one of the points from the set, and all the points lie either inside or on the boundary of the polygon.

## Divide and Conquer Approach

The divide-and-conquer method for solving the Convex Hull problem is efficient for large datasets. This approach is similar to merge sort and works in the following steps:

1. **Divide**: Split the set of points into two halves based on their x-coordinates.
  
2. **Conquer**: Recursively find the convex hulls of each half.
  
3. **Combine**: Merge the two convex hulls into a single hull. This step involves finding the upper and lower tangents that connect the two hulls while maintaining the convexity property.

This approach has a time complexity of **O(n log n)**, making it efficient for large datasets.

### Algorithm Steps

1. **Sort Points**: Sort the points by their x-coordinates. This allows for easy division of points into two halves.
  
2. **Recursive Convex Hull**:
   - If there are three or fewer points, the convex hull is the points themselves or a triangle formed by the points.
   - For larger sets, recursively compute the convex hull for the left and right halves.

3. **Merge Hulls**:
   - Identify the **upper tangent** and **lower tangent** connecting the two hulls.
   - Remove points from each hull that are inside the combined convex shape.
   - Connect the points along the tangents to form the merged hull.

## Pseudocode

```pseudo
CONVEX_HULL(points):
    if len(points) ≤ 3:
        return points sorted in counterclockwise order

    # Divide step
    left_half, right_half = split(points by x-coordinate)

    # Conquer step
    left_hull = CONVEX_HULL(left_half)
    right_hull = CONVEX_HULL(right_half)

    # Combine step
    return MERGE_HULLS(left_hull, right_hull)

MERGE_HULLS(left_hull, right_hull):
    # Find upper tangent
    upper_tangent = find_upper_tangent(left_hull, right_hull)

    # Find lower tangent
    lower_tangent = find_lower_tangent(left_hull, right_hull)

    # Combine points from left_hull and right_hull using the tangents
    combined_hull = points along upper and lower tangents
    return combined_hull
```

## Code

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int x, y;
} Point;

int orientation(Point p, Point q, Point r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

void mergeHulls(Point* left, int left_size, Point* right, int right_size, Point* result, int* result_size) {
    int i = left_size - 1;
    int j = 0;

    while (orientation(left[i - 1], left[i], right[j]) <= 0) i--;
    while (orientation(right[j], right[j + 1], left[i]) <= 0) j++;

    int k = 0;
    for (int idx = i; idx < left_size; idx++) result[k++] = left[idx];
    for (int idx = j; idx < right_size; idx++) result[k++] = right[idx];

    *result_size = k;
}

void convexHull(Point* points, int n, Point* result, int* result_size) {
    if (n <= 3) {
        for (int i = 0; i < n; i++) result[i] = points[i];
        *result_size = n;
        return;
    }

    // Sort points by x-coordinate
    qsort(points, n, sizeof(Point), compare);

    // Divide and Conquer (recursive)
    int mid = n / 2;
    Point left[mid], right[n - mid];
    for (int i = 0; i < mid; i++) left[i] = points[i];
    for (int i = mid; i < n; i++) right[i - mid] = points[i];

    Point leftResult[mid], rightResult[n - mid];
    int left_size, right_size;
    convexHull(left, mid, leftResult, &left_size);
    convexHull(right, n - mid, rightResult, &right_size);

    // Merge the two hulls
    mergeHulls(leftResult, left_size, rightResult, right_size, result, result_size);
}

int compare(const void* a, const void* b) {
    Point* p1 = (Point*)a;
    Point* p2 = (Point*)b;
    return p1->x - p2->x;
}

int main() {
    Point points[] = {{0, 0}, {1, 2}, {2, 4}, {4, 4}, {3, 3}};
    int n = sizeof(points) / sizeof(points[0]);

    Point result[n];
    int result_size;
    convexHull(points, n, result, &result_size);

    printf("Convex Hull: ");
    for (int i = 0; i < result_size; i++) {
        printf("(%d, %d) ", result[i].x, result[i].y);
    }

    return 0;
}
```

## Applications

- **Geographic Information Systems (GIS)**: Used for mapping out territories or enclosing regions in spatial data.
- **Pattern Recognition**: Convex Hulls help in recognizing shapes and structures in image processing.
- **Pathfinding**: Convex Hulls can define boundaries for obstacle avoidance in robotics and game development.

## Visualization Example

The following diagram shows an example set of points and their resulting Convex Hull after applying the divide-and-conquer algorithm:

```plaintext
Original Points:                    Convex Hull:
  *       *       *                  *---------*
        *                              *       *
  *             *              ->      |       |
     *      *                          *       *
                                        *-----*
```

## Complexity Analysis

- **Time Complexity**: O(n log n) due to sorting and recursive merging steps.
- **Space Complexity**: O(n) for storing the points and intermediate results.

## Further Reading

- [Computational Geometry: Algorithms and Applications](https://computational-geometry.org/) - A comprehensive guide on computational geometry techniques.
- [Convex Hull on Wikipedia](https://en.wikipedia.org/wiki/Convex_hull) - Detailed background and applications of Convex Hull.

---
