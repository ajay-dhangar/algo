---
id: merge-k-sorted-arrays
title: Merge K Sorted Arrays
sidebar_label: GFG
tags: [GFG, Arrays, Sorting, Heap, DSA]
description: Given k sorted arrays with each of size k arranged in the form of a matrix of size k * k. The task is to merge them into one sorted array.
---

# Partition Equal Subset Sum Algorithm (GFG)

## Description

The **Merge K Sorted Arrays** problem is an intuitive problem based on Priority Queue where we have to merge k sorted arrays into one final sorted array.

### Problem Definition

Given:

- A 2D array of integers `arr` of size $k\*k$.

Objective:

- Merge these arrays into 1 sorted array. Return the merged sorted array.

### Algorithm Overview

1. **Min Heap Approach**:

- Creating a `MinHeap` and Insert the `first` element `of all the k arrays`.
- Remove the `top most` element of Minheap and `put` it in the output array.
- And insert the `next` element `from`the `array of removed` elements.
- To get the `result` the step must continue until there is no element left in the MinHeap.

2. **Return** `result`, which is the final sorted array after merging k sorted arrays.

### Time Complexity

- **Time Complexity**: $O(K^2\* log(K))$, where insertion and deletion in a Min Heap requires log K time and for all $K^2$ elements it takes $(K^2 \* log(K))$ time
- **Space Complexity**: $O(K)$ for the result array.

### C++ Implementation

```cpp
#include <vector>
using namespace std;

//User function Template for C++


class Solution
{
    public:

     class triplet{
       public:
       int val;
       int arr;
       int i_indx;
     };

     struct cmp{
      bool operator()(triplet a , triplet b){
         return (a.val > b.val);
     }
    };
    //Function to merge k sorted arrays.
    vector<int> mergeKArrays(vector<vector<int>> arr, int k)
    {
        //code here
        priority_queue<triplet , vector<triplet> , cmp> pq_min;


        for(int i = 0 ; i < k ; i++){
            pq_min.push({arr[i][0] , i , 0});// pushing the first element of each array
            //Heap Node => { element , array-number , indx of element in that array}
        }

        vector<int> ans;

        while(ans.size() != k*k){

            triplet f = pq_min.top();
            pq_min.pop();

            ans.push_back(f.val);

            int arr_indx = f.arr , i = f.i_indx;
            i = i+1;

            if(i < arr[arr_indx].size()){
               pq_min.push({arr[arr_indx][i] , arr_indx , i});  //Pushing the next of that array from which popped out elements belongs to
            }
        }

        return ans;
    }
};


```
