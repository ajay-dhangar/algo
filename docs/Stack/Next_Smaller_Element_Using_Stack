---
id: finding-next-smaller-element-using-stack
title: "Finding the Next Smaller Element Using Stack"
sidebar_label: "Next Smaller Element"
sidebar_position: 18
description: "This guide covers the efficient method of finding the Next Smaller Element (NSE) for each element in an array using a stack. It details the algorithm and provides code examples, ensuring a clear understanding of the approach."
tags: [array, stack, algorithms, next smaller element]
---

# Next Smaller Element Using Stack

## Introduction
The Next Smaller Element (NSE) for an element in an array is the first element on the right side that is smaller than the element. This problem can be efficiently solved using a stack data structure. This document explains the approach step-by-step.

## Problem Statement
Given a circular integer array A, return the next smaller element for every element in A. The next smaller element for an element x is the first element smaller than x that we come across while traversing the array in a clockwise manner. If it doesn't exist, return -1 for this element.

## Examples
```bash
Example 1: 

Input: N = 11, A[] = {3, 10, 4, 2, 1, 2, 6, 1, 7, 2, 9}

Output: 2, -1, 2, 1, -1, 1, 1, -1, 2, 1, 2

Explanation: For the first element in A, i.e., 3, the smaller element which comes next to it while traversing and is closest to it is 2. Hence, 2 is present at index 0 in the resultant array. Similarly, we find the NSEs for all other elements present in A.

Example 2:

Input: N = 6, A[] = {5, 7, 1, 7, 6, 0}

Output: 1, 1, -1, 6, 0, -1

```

## Implementation
## Java

```java
import java.io.*;
import java.util.*;

class TUF {
    public static int[] nextSmallerElements(int[] nums) {
        int n = nums.length;
        int nse[] = new int[n];
        Stack < Integer > st = new Stack < > ();
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (st.isEmpty() == false && st.peek() >= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                if (st.isEmpty() == false) nse[i] = st.peek();
                else nse[i] = -1;
            }

            st.push(nums[i % n]);
        }
        return nse;
    }

    public static void main(String args[]) {
        int arr[] = {5, 7, 1, 2, 6, 0};

        int arr2[] = nextSmallerElements(arr);
        System.out.println("The next smaller elements are ");
        for (int i = 0; i < arr2.length; i++) {
            System.out.print(arr2[i] + " ");
        }
    }
}

```

## C++
```cpp
#include<bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector < int > nextSmallerElements(vector < int > & nums) {
      int n = nums.size();
      vector < int > nse(n, -1);
      stack < int > st;
      for (int i = 2 * n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() >= nums[i % n]) {
          st.pop();
        }

        if (i < n) {
          if (!st.empty()) nse[i] = st.top();
        }
        st.push(nums[i % n]);
      }
      return nse;
    }
};

int main() {
  Solution obj;
  vector < int > v {5, 7, 1, 2, 6, 0};
  vector < int > res = obj.nextSmallerElements(v);
  cout << "The next smaller elements are" << endl;
  for (int i = 0; i < res.size(); i++) {
    cout << res[i] << " ";
  }
}


```

## Python
```python
def find_next_smaller_elements(arr):
    n = len(arr)
    result = [-1] * n
    stack = []

    for i in range(n - 1, -1, -1):
        # Remove elements from the stack that are greater than or equal to arr[i]
        while stack and stack[-1] >= arr[i]:
            stack.pop()
        
        # If stack is not empty, the top element is the next smaller element
        if stack:
            result[i] = stack[-1]
        
        # Push the current element onto the stack
        stack.append(arr[i])
    
    return result

# Example usage
arr = [5, 7, 1, 2, 6, 0]
print(find_next_smaller_elements(arr))  # Output: [1, 1, -1, 1, 0, -1]

```

