---
id: aggressive-cows
title: "Aggressive Cows Problem"
sidebar_label: "Binary Search"
sidebar_position: 1
description: "Applying Binary Search on Aggressive Cows Problem."
tags: [Algorithm, Problem, Binary Search]
---
# Description
## Problem - Statement
- You are given an array of **N** integers, representing the positions of stalls on a straight line. You also have **C** cows that are aggressive and need to be placed in these stalls.
🎯 **The Goal**
- Place all **C** cows in the stalls such that the minimum distance between any two cows is as large as possible.

## Why Binary Search
- We use Binary Search because the **search space** for the answer is monotonic.
- **Eliminates Half the Work**: Instead of checking every number, Binary Search cuts the range in half every time.

## Code Implementation
```Cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

//This function checks whether the arrangement is possible or not
bool isPossible(int stalls[], int cows, int stall_size, int min_distance) {
    int count = 1; // Place the first cow in the first stall
    int lastPos = stalls[0];

    for (int i = 1; i < stall_size; i++) {
        if (stalls[i] - lastPos >= min_distance) {
            count++;
            lastPos = stalls[i];
        }
        if (count >= cows) return true;
    }
    return false;
}

int AggressiveCows(int stalls[], int cows, int stall_size){
    sort(stalls, stalls + stall_size); //sort the array to perform Binary Search

    int start = 1, end = stalls[stall_size - 1] - stalls[0], ans = -1;

    //Binary Search Implementation
    while(start <= end) {
        int mid = start + (end - start) / 2;

        if(isPossible(stalls, cows, stall_size, mid)) {
            ans = mid;
            start = mid + 1;
        }
        else{
            end = mid - 1;
        }
    }

    return ans ;
}

int main(){
    int stalls[] = {1, 2, 8, 4, 9};
    int cows = 3;
    int stall_size = sizeof(stalls) / sizeof(stalls[0]);
    int min_distance = AggressiveCows(stalls, cows, stall_size); //stores the required answer
    cout << "Minimum Distance is: " << min_distance << endl;
    return 0;
}
```   
## Key Logic
- **Sorting**: The stalls array must be sorted so that the greedy placement of cows is possible.
- **Binary Search Range**: The search range is between 1 (minimum possible distance) and stalls[n-1] - stalls[0] (maximum possible distance).
- **IsPossible Function**: This function checks if it's possible to place c cows in the given stalls such that every pair of cows is at least minAllowedDist apart.
- **Time Complexity**: The total complexity is roughly $O(n * log(Range))$, where n is the number of stalls and the Range is the difference between the maximum and minimum stall positions.