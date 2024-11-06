---
id: trapped-rainwater
title: Trapped Rainwater
sidebar_label: Trapped Rainwater
description: "In this post, we'll explore a solution to the Trapped Rainwater problem, calculating how much rainwater can be held within a terrain represented by an elevation map using a dynamic programming approach."
tags: [dsa, algorithms, dynamic programming, rainwater, arrays]
---

### Definition:
The **Trapped Rainwater problem** involves finding the amount of water that can be trapped after rainfall between bars of different heights, represented by an array. Each bar's width is assumed to be 1, and rainwater is trapped in the valleys between bars.

### Characteristics:
- **Dynamic Programming**:
  - This solution uses dynamic programming to calculate the maximum heights to the left and right of each bar, allowing us to determine the trapped water efficiently.

- **Height Arrays**:
  - Two arrays are used to store the left and right maximum heights up to each bar, helping to find the trapped water at each position by calculating the minimum of these heights minus the bar's height.

- **Efficient Calculation**:
  - The algorithm runs in **O(N)** time complexity and uses **O(N)** additional space for the left and right maximum arrays, making it efficient for large input sizes.

### Python Implementation:
```python

"""
Calculate the total amount of rainwater that can be trapped given an elevation map.
Example: heights = (0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1), Output: 6
"""

def trapped_rainwater(heights: tuple[int, ...]) -> int:
    """
    Calculates the total rainwater that can be trapped above the bars.
    Uses a dynamic programming approach with left and right max heights.

    >>> trapped_rainwater((0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1))
    6
    >>> trapped_rainwater((7, 1, 5, 3, 6, 4))
    9
    >>> trapped_rainwater((7, 1, 5, 3, 6, -1))
    Traceback (most recent call last):
        ...
    ValueError: No height can be negative
    """
    if not heights:
        return 0
    if any(h < 0 for h in heights):
        raise ValueError("No height can be negative")
    
    length = len(heights)

    # Calculate left max heights
    left_max = [0] * length
    left_max[0] = heights[0]
    for i in range(1, length):
        left_max[i] = max(heights[i], left_max[i - 1])

    # Calculate right max heights
    right_max = [0] * length
    right_max[-1] = heights[-1]
    for i in range(length - 2, -1, -1):
        right_max[i] = max(heights[i], right_max[i + 1])

    # Calculate trapped water
    return sum(
        min(left, right) - height
        for left, right, height in zip(left_max, right_max, heights)
    )


if __name__ == "__main__":
    import doctest

    doctest.testmod()
    print(f"{trapped_rainwater((0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1)) = }")
    print(f"{trapped_rainwater((7, 1, 5, 3, 6, 4)) = }")

```

### Time Complexity:
- **Time Complexity: O(N)**
The algorithm iterates through the heights array twice to fill the left and right maximum arrays and then once more to calculate the trapped water.
### Space Complexity:
- **Space Complexity: O(N)**
The space complexity is O(N) due to the additional arrays storing the left and right maximum heights for each bar.
  
### Summary:
The Trapped Rainwater solution efficiently calculates the amount of water that can be trapped between bars using dynamic programming. By precomputing the maximum heights on both sides for each bar, the algorithm quickly determines the trapped water at each position. This approach is optimal for large data sets and commonly used in data structure and algorithm problems.
