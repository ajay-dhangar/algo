
# Painter Partition Problem (C++)

## Problem Statement:
You are given an array `boards[]` where `boards[i]` represents the length of the i-th board. You have `k` painters and each painter takes 1 unit time to paint 1 unit of the board. Each painter can only paint continuous sections of boards. Your task is to minimize the time taken to paint all the boards.

## Approach:
This problem can be solved using **Binary Search** on the time range and a **Greedy approach** to allocate boards to painters.

  - Use binary search to find the minimal maximum time (`mid`) a painter can take to paint the boards.
  - Use a greedy method to count the number of painters required for each time guess (`mid`).
  
  The binary search will try to minimize the maximum time required.

## Solution in C++:

```cpp
#include <bits/stdc++.h>
using namespace std;

// Function to count the number of painters required to paint all boards in "time"
int countPainters(vector<int> &boards, int time) {
    int n = boards.size(); // Size of the array
    int painters = 1;      // Start with 1 painter
    long long boardsPainter = 0;
    
    for (int i = 0; i < n; i++) {
        if (boardsPainter + boards[i] <= time) {
            // Allocate board to the current painter
            boardsPainter += boards[i];
        } else {
            // Allocate board to the next painter
            painters++;
            boardsPainter = boards[i];
        }
    }
    
    return painters;
}

// Function to find the largest minimum distance
int findLargestMinDistance(vector<int> &boards, int k) {
    // Find the search space for binary search
    int low = *max_element(boards.begin(), boards.end());
    int high = accumulate(boards.begin(), boards.end(), 0);
    
    // Apply binary search:
    while (low <= high) {
        int mid = (low + high) / 2;
        int painters = countPainters(boards, mid);
        
        if (painters > k) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return low; // Minimum possible maximum time
}

int main() {
    vector<int> boards = {10, 20, 30, 40};
    int k = 2; // Number of painters
    
    int ans = findLargestMinDistance(boards, k);
    cout << "The answer is: " << ans << "
";
    
    return 0;
}
```

## Key Concepts:
- **Binary Search**: Used to find the minimum maximum time required to paint all the boards.
- **Greedy Approach**: The helper function `countPainters` assigns boards to painters ensuring the total time doesn't exceed the given limit for that iteration.
