---
id: jump-search
title: Jump Search Algorithm
sidebar_label: Jump Search
sidebar_position: 2
description: "This post explores the use of Jump Search Algorithm. We'll provide code implementations C++."
tags: [searching, algorithms]
---

Jump Search is a searching algorithm used to find an element in a sorted array. It works by jumping ahead by a fixed number of steps, rather than checking each element one by one (as in linear search). Once it finds an interval where the target element might be, it performs a linear search within that interval.

## Key Points:
1) Step Size: We select a fixed jump size, typically the square root of the array length, as a good balance between linear and binary search.
2) Process: Jump by this fixed step size until the next jump goes past the element or reaches a number greater than the target.
3) Linear Search in Interval: Once the jump overshoots or reaches the interval where the target could lie, it performs a linear search in this smaller interval.

## Complexity:
Time Complexity: O(n)
Space Complexity: O(1)

## Steps:
1) Choose a block size (commonly step=array sizestep=array size).
2) Jump forward by this step size until the current element is larger than or equal to the target.
3) If we find the element within the block, perform a linear search in the interval to locate the exact position of the element.

## Implementation:

   ```C++
        
                #include <iostream>
                #include <cmath>
                
                using namespace std;
                
                int jumpSearch(int arr[], int n, int target) {
                    // Calculate jump size
                    int step = sqrt(n);
                    int prev = 0;
                
                    // Find the block where the element is present
                    while (arr[min(step, n)-1] < target) {
                        prev = step;
                        step += sqrt(n);
                        if (prev >= n)
                            return -1; // Element is not present
                    }
                
                    // Perform linear search in the found block
                    for (int i = prev; i < min(step, n); i++) {
                        if (arr[i] == target)
                            return i; // Return index of the target element
                    }
                
                    return -1; // Element not found
                }
                
                int main() {
                    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
                    int n = sizeof(arr) / sizeof(arr[0]);
                    int target = 15;
                
                    int result = jumpSearch(arr, n, target);
                    if (result != -1)
                        cout << "Element found at index " << result << endl;
                    else
                        cout << "Element not found in the array" << endl;
                
                    return 0;
                }
```

## Explanation:
1) Step Calculation: We calculate step = sqrt(n) to jump optimally through the array.
2) Jumping: We jump by the step until we reach an element larger than the target or reach the end of the array.
3) Linear Search: Once we find the interval, a linear search in the small block checks for the exact position of the target element.

This approach is efficient for sorted arrays and falls between linear and binary search in terms of speed.
