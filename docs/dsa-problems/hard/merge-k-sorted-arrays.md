---
id: merge-k-sorted-arrays
title: "Merge K Sorted Arrays"
sidebar_label: Merge K Sorted Arrays
tags: [GFG, Arrays, Sorting, Heap, DSA]
description: "Given k sorted arrays with each of size k arranged in the form of a matrix of size k * k. The task is to merge them into one sorted array."
---

# Partition Equal Subset Sum Algorithm (GFG)

## Description

The **Merge K Sorted Arrays** problem is an intuitive problem based on Priority Queue where we have to merge k sorted arrays into one final sorted array.

## Video Explanation

<LiteYouTubeEmbed
  id="7win3dcgo3k"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="DP 15. Partition Equal Subset Sum | DP on Subsequences"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

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

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

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

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.PriorityQueue;

class Solution {
    static class Element {
        int val, r, c;
        Element(int val, int r, int c) {
            this.val = val;
            this.r = r;
            this.c = c;
        }
    }
    
    public static int[] mergeKArrays(int[][] arr, int K) {
        PriorityQueue<Element> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);
        int totalElements = 0;
        for (int i = 0; i < K; i++) {
            if (arr[i].length > 0) {
                minHeap.add(new Element(arr[i][0], i, 0));
                totalElements += arr[i].length;
            }
        }
        int[] result = new int[totalElements];
        int idx = 0;
        while (!minHeap.isEmpty()) {
            Element curr = minHeap.poll();
            result[idx++] = curr.val;
            if (curr.c + 1 < arr[curr.r].length) {
                minHeap.add(new Element(arr[curr.r][curr.c + 1], curr.r, curr.c + 1));
            }
        }
        return result;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import heapq

class Solution:
    def mergeKArrays(self, arr: List[List[int]], K: int) -> List[int]:
        min_heap = []
        for i in range(K):
            if arr[i]:
                heapq.heappush(min_heap, (arr[i][0], i, 0))
        
        result = []
        while min_heap:
            val, r, c = heapq.heappop(min_heap)
            result.append(val)
            if c + 1 < len(arr[r]):
                heapq.heappush(min_heap, (arr[r][c + 1], r, c + 1))
        
        return result
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
class MinHeap {
    constructor() { this.heap = []; }
    push(val) {
        this.heap.push(val);
        this._up(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._down(0);
        }
        return top;
    }
    _up(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.heap[i].val < this.heap[p].val) {
                [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
                i = p;
            } else break;
        }
    }
    _down(i) {
        const n = this.heap.length;
        while ((i << 1) + 1 < n) {
            let left = (i << 1) + 1, right = left + 1, smallest = i;
            if (left < n && this.heap[left].val < this.heap[smallest].val) smallest = left;
            if (right < n && this.heap[right].val < this.heap[smallest].val) smallest = right;
            if (smallest !== i) {
                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            } else break;
        }
    }
}

var mergeKArrays = function(arr, K) {
    const minHeap = new MinHeap();
    for (let i = 0; i < K; i++) {
        if (arr[i].length > 0) {
            minHeap.push({ val: arr[i][0], r: i, c: 0 });
        }
    }
    const result = [];
    while (minHeap.heap.length > 0) {
        const { val, r, c } = minHeap.pop();
        result.push(val);
        if (c + 1 < arr[r].length) {
            minHeap.push({ val: arr[r][c + 1], r: r, c: c + 1 });
        }
    }
    return result;
};
```

  </TabItem>
</Tabs>
