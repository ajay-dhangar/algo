---

id: kth-largest-element-min-heap  
title: Kth Largest Element using Min Heap  
sidebar_label: Kth Largest Element  
sidebar_position: 3  
description: Finding the Kth largest element in an array using a min heap data structure, commonly used in streaming and top-K problems.  
tags: [Heap, Priority Queue, Top-K, Streaming]  

---

# Kth Largest Element Using Min Heap

A **Min Heap** based approach to find the Kth largest element in an unsorted array. This algorithm maintains a min heap of size K to efficiently track the K largest elements, where the root of the heap represents the Kth largest element.

## Introduction

The K-th largest element algorithm using a min heap is particularly useful when dealing with:
- Large datasets where we need to find top K elements
- Streaming data where elements arrive continuously
- Memory-constrained environments where we can't sort the entire array

The key idea is to maintain a min heap of size K, where the smallest element (root) represents the Kth largest element seen so far.

## Algorithm Overview

### Basic Concept

1. Create a min heap to store the K largest elements
2. Process elements one by one:
   - If heap size &lt; K: Insert the element
   - If heap size = K: Compare with root (smallest element)
     - If current element &gt; root: Remove root and insert current element
     - Otherwise: Skip the element
3. After processing all elements, the root contains the Kth largest element

### Visual Example
```
Array: [3, 2, 1, 5, 6, 4], K = 3

Step-by-step min heap construction:

1) [3]           2) [2,3]         3) [1,3,2]
   3               2               1
                  /               / \
                 3               3   2

4) [2,3,5]       5) [4,5,6]      Final: 4 is the 3rd largest
   2               4
  / \             / \
 3   5           5   6
```

## Implementation

### C++ Implementation
```cpp
#include <queue>
#include <vector>

class KthLargest {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;

public:
    int findKthLargest(vector<int>& nums, int k) {
        this->k = k;
        
        // Process each element
        for (int num : nums) {
            // Add to heap if size < k
            if (minHeap.size() < k) {
                minHeap.push(num);
            }
            // If current element is larger than smallest element
            else if (num > minHeap.top()) {
                minHeap.pop();
                minHeap.push(num);
            }
        }
        
        return minHeap.top();
    }
};
```

## Time and Space Complexity

- **Time Complexity**: 
  - Build Heap: $O(n \cdot \log k)$
  - Get Kth largest: $O(1)$
- **Space Complexity**: $O(k)$

## Advantages and Disadvantages

### Advantages
- Efficient for streaming data
- Memory efficient ($O(k)$ space)
- Good for large datasets where $k \ll n$
- Maintains running K largest elements

### Disadvantages
- Not optimal for small datasets
- Not suitable when K is close to n
- Requires rebuilding heap for dynamic K

## Related LeetCode Problems

| Problem | Difficulty | Description | Solution Approach |
|---------|------------|-------------|------------------|
| [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium | Find the kth largest element in an unsorted array | Min Heap of size K |
| [703. Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Easy | Design a class to find the kth largest element in a stream | Maintain Min Heap |
| [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | Find the k most frequent elements | Min Heap with frequency pairs |
| [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/) | Medium | Find the k most frequent words | Min Heap with custom comparator |
| [973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) | Medium | Find K closest points to origin | Min Heap with distance pairs |

## Applications

1. **Top-K Problems**
   - Finding K largest elements in a stream
   - Finding K most frequent elements
   - Finding K closest points

2. **Data Stream Processing**
   - Processing real-time data
   - Maintaining running statistics

3. **System Design**
   - Top K trending topics
   - K most recent items
   - K nearest neighbors

## Tips and Common Pitfalls

1. **Implementation Tips**
   - Use STL priority_queue for easier implementation
   - Consider custom comparators for complex objects
   - Initialize heap size to K for better performance

2. **Common Mistakes**
   - Using max heap instead of min heap
   - Not handling duplicate elements properly
   - Incorrect heap size maintenance

3. **Optimization Opportunities**
   - Pre-allocate heap space if K is known
   - Early stopping if element ≤ current Kth largest
   - Batch processing for better performance