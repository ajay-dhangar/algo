---
id: top-K-frequent-elements
title: Top K Frequent Elements Using Hash Map and Heap
sidebar_label: Top K Frequent Elements
sidebar_position: 12
description: Find the top K most frequent elements in an array using a hash map and a heap.
tags: [Hash Map, Heap, Priority Queue, Frequency Counting, top-K]
---

# Top K Frequent Elements Using Hash Map and Heap

## Problem Description:
Given an array of integers, return the **K most frequent elements**. You may assume that K is always valid, i.e., 1 ≤ K ≤ number of unique elements. The output order does not matter.

### Example:
```bash
Input: nums = [1,1,1,2,2,3], K = 2  
Output: [1,2]
```

### Approach:
To find the K most frequent elements efficiently, we can use a hash map to count the frequency of each element, and then a min heap (priority queue) to keep track of the top K elements based on their frequency.

## Steps:
1. Count the Frequency: Use a hash map to store the frequency of each element in the array.
2. Use a Min Heap:
Push elements into a min heap based on their frequency.
If the heap size exceeds K, remove the element with the lowest frequency.
3. Extract the Results: After processing all elements, the heap contains the K most frequent elements.

## Time Complexity:
O(n) for counting frequencies, where n is the number of elements in the array.
O(n log K) for heap operations, as each element may be inserted and possibly removed once.

# C++ Implementation:
```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>

using namespace std;

// Function to find the top K frequent elements
vector<int> topKFrequent(vector<int>& nums, int k) {
    // Step 1: Count frequency of each element
    unordered_map<int, int> frequencyMap;
    for (int num : nums) {
        frequencyMap[num]++;
    }

    // Step 2: Use a min heap to keep track of top K elements
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;

    // Insert elements into the heap
    for (const auto& [num, freq] : frequencyMap) {
        minHeap.push({freq, num});
        if (minHeap.size() > k) {
            minHeap.pop();  // Remove the element with the lowest frequency
        }
    }

    // Step 3: Extract elements from the heap
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return result;
}

int main() {
    // Example input
    vector<int> nums = {1, 1, 1, 2, 2, 3};
    int k = 2;

    // Find and display the top K frequent elements
    vector<int> result = topKFrequent(nums, k);
    cout << "Top " << k << " frequent elements are: ";
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

# Python Implementation:
```python 
from collections import Counter
import heapq

def topKFrequent(nums, k):
    # Step 1: Count frequency of each element
    frequency_map = Counter(nums)
    
    # Step 2: Use a min heap to keep track of top K elements
    min_heap = []
    
    # Insert elements into the heap
    for num, freq in frequency_map.items():
        heapq.heappush(min_heap, (freq, num))
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove the element with the lowest frequency
    
    # Step 3: Extract elements from the heap
    result = [num for freq, num in min_heap]
    return result

# Example usage
nums = [1, 1, 1, 2, 2, 3]
k = 2
print("Top", k, "frequent elements are:", topKFrequent(nums, k))
```

