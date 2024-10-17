---
id: practice-problems-on-two-pointers
title: Practice Problems
sidebar_label: Practice Problems
sidebar_position: 3
description: Here are some practice problems for the Two Pointers technique, including an implementation to find the maximum distance under the constraint arr[i] <= arr[j].
tags: [DSA, algorithms, two pointers]
---

## Problem: Max Distance with Two Pointers (C++)

### Problem Statement:
Given an array `arr[]` of `N` positive integers, find the maximum value of `j - i` such that `arr[i] <= arr[j]`. The goal is to maximize the distance between the indices while ensuring the condition `arr[i] <= arr[j]` holds.

### Approach:
This problem can be solved efficiently using the Two-Pointer Technique along with two auxiliary arrays:

  - `LMin[]`: Stores the minimum value from the start of the array up to index `i`.
  - `RMax[]`: Stores the maximum value from index `j` to the end of the array.

### Solution in C++:

```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::max and std::min

using namespace std;

/* Utility Functions to get max and minimum of two integers */
int max(int x, int y) {
    return x > y ? x : y;
}

int min(int x, int y) {
    return x < y ? x : y;
}

/* For a given array arr[], returns the maximum j – i such that arr[j] >= arr[i] */
int maxIndexDiff(vector<int>& arr, int n) {
    int maxDiff;
    int i, j;

    // Initialize auxiliary arrays
    vector<int> LMin(n);
    vector<int> RMax(n);

    /* Construct LMin[] such that LMin[i] stores the minimum value
       from (arr[0], arr[1], ... arr[i]) */
    LMin[0] = arr[0];
    for (i = 1; i < n; ++i)
        LMin[i] = min(arr[i], LMin[i - 1]);

    /* Construct RMax[] such that RMax[j] stores the maximum value
       from (arr[j], arr[j+1], ... arr[n-1]) */
    RMax[n - 1] = arr[n - 1];
    for (j = n - 2; j >= 0; --j)
        RMax[j] = max(arr[j], RMax[j + 1]);

    /* Traverse both arrays from left to right to find optimum j - i */
    i = 0, j = 0, maxDiff = -1;
    while (j < n && i < n) {
        if (LMin[i] <= RMax[j]) {
            maxDiff = max(maxDiff, j - i);
            j = j + 1;
        } else {
            i = i + 1;
        }
    }

    return maxDiff;
}

/* Driver program to test above functions */
int main() {
    vector<int> arr = { 9, 2, 3, 4, 5, 6, 7, 8, 18, 0 };
    int n = arr.size();
    int maxDiff = maxIndexDiff(arr, n);
    cout << "\nMaximum distance: " << maxDiff << endl;
    return 0;
}