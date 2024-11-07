---
id: heap-data-structure-5
title: heap data structure
sidebar_label: Find Median of a Stream
sidebar_position: 12
description: Heaps provide an efficient way to manage and retrieve median values from a stream of data by balancing two heaps.
tags: [Competitive Programming,heap,stream,median]
---

# Heap Problems: Find Median of a Stream

## Problem: Find the Median of a Stream

### Problem Description:
Given a stream of integers, implement a data structure that supports the following operations:
1. **addNum(int num)** - Add a number to the data structure.
2. **findMedian()** - Return the median of all elements so far.

### Example:
```
Input: addNum(1) addNum(2) findMedian() -> 1.5 addNum(3) findMedian() -> 2
```

### Approach:
Using Two Heaps:
- Maintain two heaps:
  - A **max-heap** for the lower half of the numbers.
  - A **min-heap** for the upper half.
- Ensure that the size difference between the heaps is no more than 1.
- If both heaps have the same size, the median is the average of the tops of both heaps. If the heaps differ in size, the median is the top of the larger heap.

Time Complexity: O(log n) for each insertion, and O(1) for finding the median.

### C++ Code:

```cpp
#include <iostream>
#include <queue>

class MedianFinder {
private:
    std::priority_queue<int> maxHeap; // Max-heap for the lower half
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap; // Min-heap for the upper half

public:
    void addNum(int num) {
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }

        // Balance the heaps
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        } else {
            return maxHeap.top();
        }
    }
};

int main() {
    MedianFinder mf;
    mf.addNum(1);
    mf.addNum(2);
    std::cout << "Median: " << mf.findMedian() << std::endl; // Output: 1.5
    mf.addNum(3);
    std::cout << "Median: " << mf.findMedian() << std::endl; // Output: 2
    return 0;
}
```
### Python Code:
```python
import heapq

class MedianFinder:
    def __init__(self):
        self.max_heap = []  # Max-heap for the lower half
        self.min_heap = []  # Min-heap for the upper half

    def addNum(self, num: int):
        heapq.heappush(self.max_heap, -num)
        
        # Move the largest from max_heap to min_heap to balance
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        
        # Keep the max_heap larger by 1 element if total is odd
        if len(self.max_heap) < len(self.min_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))

    def findMedian(self) -> float:
        if len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0
        else:
            return -self.max_heap[0]

# Example usage
mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print("Median:", mf.findMedian())  # Output: 1.5
mf.addNum(3)
print("Median:", mf.findMedian())  # Output: 2
```