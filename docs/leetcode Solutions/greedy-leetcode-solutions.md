---
id: greedy-leetcode-solutions-1-to-10
sidebar_position: 3
title: greedy LeetCode Solutions 1-10
sidebar_label: greedy LeetCode Solutions 1-10
description: "This document contains solutions to LeetCode DSA problems 1-10 containing multiple algorithms and data structures."
tags: [leetcode, algorithms, problem-solving, DSA, data structure]
---

<k>
# Greedy-LeetCode Solutions 1-10
=======
# Greedy-LeetCode Solutions 1-5
</main>

## Questions
1. [The Two Sneaky Numbers of Digitville](#1-the-two-sneaky-numbers-of-digitville)  
2. [Design Neighbor Sum Service](#2-design-neighbor-sum-service)  
3. [Find the Number of Winning Players](#3-find-the-number-of-winning-players)  
4. [Count Pairs That Form a Complete Day I](#4-count-pairs-that-form-a-complete-day-i)  
5. [Remove Element](#5-remove-element)  
<k>
6. [Remove Duplicates from Sorted Array](#6-remove-duplicates-from-sorted-array)  
7. [Merge Two Sorted Lists](#7-merge-two-sorted-lists)  
8. [Generate Parentheses](#8-generate-parentheses)  
9. [Merge k Sorted Lists](#9-merge-k-sorted-lists)  
10. [Swap Nodes in Pairs](#10-swap-nodes-in-pairs)  
=======
</main>

---
## 1. The Two Sneaky Numbers of Digitville
**Description:** In Digitville, there was a list `nums` containing integers from `0` to `n-1`. Two numbers appeared an additional time, making the list longer than usual. Return an array of the two sneaky numbers that appear twice.

**Solution:** Use a hash map to count the occurrences of each number. If a number appears more than once, add it to the result.

```cpp
class Solution {
public:
    vector<int> getSneakyNumbers(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<int> result;

        for (int num : nums) {
            count[num]++;
        }

        for (auto& pair : count) {
            if (pair.second > 1) {
                result.push_back(pair.first);
            }
        }

        return result;
    }
};
```

---

## 2. Design Neighbor Sum Service
**Description:** You are given a n x n 2D array `grid` containing distinct elements in the range \([0, n^2 - 1]\). Implement the `NeighborSum` class with methods to find adjacent and diagonal sums around a specific value in the grid.

**Solution:** Traverse the grid to locate the specific value, then calculate the sums of adjacent and diagonal elements based on the position of that value.

```cpp
class NeighborSum {
private:
    vector<vector<int>> grid;
    int n;

public:
    NeighborSum(vector<vector<int>>& grid) : grid(grid), n(grid.size()) {}

    int adjacentSum(int value) {
        int sum = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == value) {
                    if (i > 0) sum += grid[i - 1][j]; // top
                    if (i < n - 1) sum += grid[i + 1][j]; // bottom
                    if (j > 0) sum += grid[i][j - 1]; // left
                    if (j < n - 1) sum += grid[i][j + 1]; // right
                }
            }
        }
        return sum;
    }

    int diagonalSum(int value) {
        int sum = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == value) {
                    if (i > 0 && j > 0) sum += grid[i - 1][j - 1]; // top-left
                    if (i > 0 && j < n - 1) sum += grid[i - 1][j + 1]; // top-right
                    if (i < n - 1 && j > 0) sum += grid[i + 1][j - 1]; // bottom-left
                    if (i < n - 1 && j < n - 1) sum += grid[i + 1][j + 1]; // bottom-right
                }
            }
        }
        return sum;
    }
};
```

---

## 3. Find the Number of Winning Players
**Description:** Given the number of players `n` and a 2D array `pick` where `pick[i] = [xi, yi]` represents that player `xi` picked a ball of color `yi`. A player wins if they pick more than `i + 1` balls of the same color. Return the number of players who win.

**Solution:** Use a vector of hash maps to count the occurrences of each color for each player and determine the winners based on the conditions specified.

```cpp
class Solution {
public:
    int winningPlayerCount(int n, vector<vector<int>>& pick) {
        vector<unordered_map<int, int>> color_count(n);
        int winners = 0;

        for (auto& p : pick) {
            color_count[p[0]][p[1]]++;
        }

        for (int i = 0; i < n; i++) {
            for (auto& pair : color_count[i]) {
                if (pair.second > i + 1) {
                    winners++;
                    break;
                }
            }
        }

        return winners;
    }
};
```

---

## 4. Count Pairs That Form a Complete Day I
**Description:** Given an integer array `hours` representing times in hours, return the number of pairs \((i, j)\) where \(i < j\) and `hours[i] + hours[j]` forms a complete day (i.e., a multiple of 24 hours).

**Solution:** Use a hash map to count the occurrences of hour remainders and find complementary pairs that sum to a multiple of 24.

```cpp
class Solution {
public:
    int countCompleteDayPairs(vector<int>& hours) {
        unordered_map<int, int> mod_count;
        int pairs = 0;

        for (int hour : hours) {
            int mod = hour % 24;
            int complement = (24 - mod) % 24;
            pairs += mod_count[complement];
            mod_count[mod]++;
        }

        return pairs;
    }
};
```

---

## 5. Remove Element
**Description:** Given an array `nums` and a value `val`, remove all instances of `val` in-place and return the new length of the array.

**Solution:** Use a two-pointer technique to keep track of non-target elements and overwrite the elements in the original array.

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int new_index = 0;

        for (int num : nums) {
            if (num != val) {
                nums[new_index] = num;
                new_index++;
            }
        }

        return new_index;
    }
};
```

---
