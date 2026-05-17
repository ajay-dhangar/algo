---
id: painters-partition
title: "Painter's Partition Problem"
sidebar_label: "Binary Search"
sidebar_position: 2
description: "Solving the Painter's Partition Problem using Binary Search on the answer space."
tags: [Algorithm, Problem, Binary Search]
---
# Description
## Problem - Statement
- You are given an array of N boards, where each element represents the length of a board.
- You have M painters available to paint these boards.
- Each painter takes 1 unit of time to paint 1 unit of board length.
🎯 The Goal
- Minimize the maximum time taken by any painter to finish the job, given that boards must be assigned in a continuous manner.

## Why Binary Search
- The answer (minimum time) lies within a defined, sorted range.
- **Monotonicity**: If a job can be done in time $T$, it can definitely be done in any time greater than $T$.
- **Efficiency**: Instead of checking every possible time, we use Binary Search to find the optimal limit in $O(log(Range))$.

## Code Implementation
```Cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

// This function checks if the configuration is possible for a given max time
bool isPossible(vector<int> &boards, int n, int m, int maxAllowedTime) {
    int paintersCount = 1;
    int currentTime = 0;

    for (int i = 0; i < n; i++) {
        if (boards[i] > maxAllowedTime) return false;
        if (currentTime + boards[i] <= maxAllowedTime) {
            currentTime += boards[i];
        } else {
            paintersCount++;
            currentTime = boards[i];
        }
    }
    return paintersCount <= m;
}

int minTimeToPaint(vector<int> &boards, int n, int m) {
    int sum = 0, maxVal = 0;
    for (int length : boards) {
        sum += length;
        maxVal = max(maxVal, length);
    }

    int start = maxVal, end = sum, ans = -1;

    while (start <= end) {
        int mid = start + (end - start) / 2;

        if (isPossible(boards, n, m, mid)) {
            ans = mid;
            end = mid - 1; // Try to find a smaller maximum
        } else {
            start = mid + 1; // Increase limit to make it possible
        }
    }
    return ans;
}

int main() {
    vector<int> boards = {40, 30, 10, 20};
    int m = 2;
    int n = boards.size();
    int result = minTimeToPaint(boards, n, m);
    cout << "Minimum Maximum Time is: " << result << endl;
    return 0;
}
```

## Key Logic
- **Continuous Assignment**: Unlike the Aggressive Cows problem, the boards must be picked in the order they appear in the array.
- **Search Range**: The minimum possible time is the largest single board (max(arr)), and the maximum is the sum of all boards (sum(arr)).
- **IsPossible Function**: A greedy check to see how many painters are required if no painter can exceed mid time.
- **Time Complexity**: $O(N * log(Sum of lengths))$, where $N$ is the number of boards and the range is the total length.