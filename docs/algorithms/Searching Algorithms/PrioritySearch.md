
---

id: Priority search algorithm  
sidebar_position: 6  
title: Priority search  
sidebar_label: Priority search algorithm  

---  

## Definition 📖

**Priority search** is a search algorithm that is used for efficiently finding the closest point in a 2D plane to a given query point, using an ordered set of rectangles. It is particularly useful in scenarios where you need to search a large set of rectangles or intervals efficiently. The algorithm works by partitioning a set of 2D rectangles or intervals using priority values, allowing for faster querying than a brute-force search.

## Characteristics ✨

- **Efficient for Rectangles**:
  - Priority search is designed specifically for searching within a set of rectangles in a 2D plane, where each rectangle is associated with a priority value.

- **Optimized for Range Queries**:
  - The algorithm helps efficiently find the rectangle with the smallest priority value that contains a given point.

- **Use of Data Structures**:
  - The algorithm typically uses a combination of data structures such as a priority search tree (a variant of a binary search tree) or a segment tree to optimize the search process.

- **Ordered Rectangles**:
  - The rectangles are sorted in terms of their priority values, which enables the search process to be faster and more efficient.

## Time Complexity ⏱️

- **Best Case: `O(log n)`** 🌟  
  If the target rectangle is found early in the search process, it leads to an efficient query time.

- **Average Case: `O(log n)`** 🔄  
  In general, the search algorithm operates in logarithmic time complexity, making it faster than brute-force search methods.

- **Worst Case: `O(n)`** 💥  
  In the worst-case scenario, if the query point lies outside the regions covered by the rectangles or if all rectangles need to be checked, the time complexity could degrade to linear time.

## Space Complexity 💾

- **Space Complexity: `O(n)`**  
  Priority search typically requires space for storing the rectangles and their associated priority values, along with any auxiliary data structures (such as a tree or heap) used for efficient querying.

## C++ Implementation 💻

Here’s a simple implementation of priority search in C++:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Rectangle {
    int x1, y1, x2, y2, priority;
};

int prioritySearch(const vector<Rectangle>& rectangles, int targetX, int targetY) {
    // Sort rectangles by priority
    vector<Rectangle> sortedRectangles = rectangles;
    sort(sortedRectangles.begin(), sortedRectangles.end(), [](const Rectangle& a, const Rectangle& b) {
        return a.priority < b.priority;
    });

    // Find the first rectangle that contains the target point
    for (const auto& rect : sortedRectangles) {
        if (targetX >= rect.x1 && targetX <= rect.x2 && targetY >= rect.y1 && targetY <= rect.y2) {
            return rect.priority;
        }
    }
    return -1; // No rectangle contains the point
}

int main() {
    vector<Rectangle> rectangles = {
        {0, 0, 2, 2, 1},
        {1, 1, 3, 3, 2},
        {2, 2, 4, 4, 3}
    };
    int targetX = 2, targetY = 2;

    int priority = prioritySearch(rectangles, targetX, targetY);

    if (priority != -1)
        cout << "Rectangle found with priority " << priority << endl;
    else
        cout << "No rectangle contains the point" << endl;

    return 0;
}
```
## Applications of Priority Search 🌐
**Geographical Information Systems (GIS):**
  - Used to find the closest feature (like a region or building) in a GIS, given a point location.
**Computer Graphics:**
  - In graphics applications, priority search can be useful for collision detection or determining the nearest object in a 2D plane.
**Database Management:**
  - Priority search is used in databases to efficiently query for spatial data that is organized by priority or weight.
**Computer-Aided Design (CAD):**
  - Used in CAD tools to find the nearest object or region that meets certain conditions (such as priority).

## Advantages and Disadvantages
### Advantages: ✅

**Efficient for Sorted Data:**
  - When rectangles are sorted by priority, the search can be much faster than a brute-force approach, with logarithmic time complexity in the average case.

**Low Memory Overhead:**
  - The space complexity is manageable, requiring only space for storing the rectangles and any auxiliary data structures.

**Optimized for Range Queries:**
  - Priority search is optimized for finding the nearest object in a range, making it ideal for applications like GIS and CAD.

### Disadvantages: ⚠️

**Requires Sorted Data:**
  - The efficiency of the algorithm depends on the rectangles being sorted by priority. If the data is not sorted, additional effort is required to sort it, which can reduce the overall performance.

**Limited to 2D Search:**
  - Priority search is primarily designed for 2D spatial queries and may not be suitable for higher-dimensional data without modification.
