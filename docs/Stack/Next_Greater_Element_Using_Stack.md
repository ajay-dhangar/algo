---
id: finding-next-greater-element-using-stack
title: "Finding the Next Greater Element Using Stack"
sidebar_label: "Next Greater Element"
sidebar_position: 17
description: "This guide covers the efficient method of finding the Next Greater Element (NGE) for each element in an array using a stack. It details the algorithm and provides code examples, ensuring a clear understanding of the approach."
tags: [array, stack, algorithms, next greater element]
---

# Next Greater Element Using Stack

## Introduction
The Next Greater Element (NGE) for an element in an array is the first element on the right side that is greater than the element. This problem can be efficiently solved using a stack data structure. This document explains the approach step-by-step.

## Problem Statement
Given a circular integer array A, return the next greater element for every element in A. The next greater element for an element x is the first element greater than x that we come across while traversing the array in a clockwise manner. If it doesn't exist, return -1 for this element.

## Eaxmples
```bash
Example 1: 

Input: N = 11, A[] = {3,10,4,2,1,2,6,1,7,2,9}

Output: 10,-1,6,6,2,6,7,7,9,9,10

Explanation: For the first element in A ,i.e, 3, the greater element which comes next to it while traversing and is closest to it is 10. Hence,10 is present on index 0 in the resultant array. Now for the second element,i.e, 10, there is no greater number and hence -1 is it’s next greater element (NGE). Similarly, we got the NGEs for all other elements present in A.  


Example 2:

Input:  N = 6, A[] = {5,7,1,7,6,0}

Output: 7,-1,7,-1,7,5
```

## Implementation
## Java

```java
import java.io.*;
import java.util.*;
class TUF {
    public static int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int nge[] = new int[n];
        Stack < Integer > st = new Stack < > ();
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (st.isEmpty() == false && st.peek() <= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                if (st.isEmpty() == false) nge[i] = st.peek();
                else nge[i] = -1;
            }

            st.push(nums[i % n]);
        }
        return nge;
    }
    public static void main(String args[]) {
        int arr[]={5,7,1,2,6,0};

        int arr2[] = nextGreaterElements(arr);
        System.out.println("The next greater elements are ");
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
    vector < int > nextGreaterElements(vector < int > & nums) {
      int n = nums.size();
      vector < int > nge(n, -1);
      stack < int > st;
      for (int i = 2 * n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i % n]) {
          st.pop();
        }

        if (i < n) {
          if (!st.empty()) nge[i] = st.top();
        }
        st.push(nums[i % n]);
      }
      return nge;
    }
};
int main() {
  Solution obj;
  vector < int > v {5,7,1,2,6,0};
  vector < int > res = obj.nextGreaterElements(v);
  cout << "The next greater elements are" << endl;
  for (int i = 0; i < res.size(); i++) {
    cout << res[i] << " ";
  }
}

```

## Python
```python
def find_next_greater_elements(arr):
    n = len(arr)
    result = [0] * n
    stack = []

    for i in range(n - 1, -1, -1):
        # Remove elements from the stack that are less than or equal to arr[i]
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        
        # The count of elements in the stack is the count of NGEs
        result[i] = len(stack)
        
        # Push the current element onto the stack
        stack.append(arr[i])
    
    return result

# Example usage
arr = [4, 5, 2, 10, 8]
print(find_next_greater_elements(arr))  # Output: [2, 1, 1, 0, 0]
```