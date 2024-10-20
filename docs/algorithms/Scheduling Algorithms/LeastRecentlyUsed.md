---

id: least-recently-used
title: Least Recently Used (LRU) Algorithm
sidebar_label: "Least Recently Used"
sidebar_position: 8
description: The Least Recently Used (LRU) algorithm is a cache replacement policy that evicts the least recently used items first.
tags: [Cache, LRU, Algorithms]

---

# Least Recently Used (LRU) Algorithm

## Introduction

The **Least Recently Used (LRU)** algorithm is a cache replacement strategy that removes the least recently accessed item when the cache reaches its capacity. This algorithm assumes that data that hasn't been used for a while is less likely to be used in the future.

### Example

Consider a cache with a capacity of 3 and the following sequence of page requests:
- 1, 2, 3, 1, 4, 2, 5

Using the LRU algorithm, the pages will be loaded into the cache as follows:
- Cache: `[1]` → `[1, 2]` → `[1, 2, 3]` → `[1, 2, 3]` (access 1) → `[2, 3, 4]` (remove 1) → `[3, 4, 2]` (remove 5) → `[4, 2, 5]` (remove 3).

## Problem Definition

Given a sequence of page requests and a cache size, determine which pages will be evicted using the LRU algorithm.

### Key Concepts

- **Cache**: A smaller, faster memory that stores copies of frequently accessed data from the main memory.
- **Page Fault**: Occurs when the requested page is not in the cache, necessitating loading it from a slower storage.

## LRU Approach

In the LRU algorithm:
- When a page is accessed, it is moved to the front of the cache.
- If the cache is full, the page that has not been accessed for the longest time is removed.

## Code Implementation in Python

Below is the Python implementation for the Least Recently Used (LRU) algorithm:

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        else:
            self.cache.move_to_end(key)
            return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

if __name__ == "__main__":
    lru_cache = LRUCache(3)  # Cache size of 3
    requests = [(1, 'A'), (2, 'B'), (3, 'C'), (1, 'A'), (4, 'D'), (2, 'B'), (5, 'E')]
    
    for key, value in requests:
        if value:
            lru_cache.put(key, value)
        else:
            print(f"Get key {key}: {lru_cache.get(key)}")

```

## Explanation of the Code
    - Cache Implementation:
    Uses an OrderedDict to maintain the order of insertion.
    - The get method checks if a page is in the cache; if it is, it moves the page to the end of the order to mark it as recently used.
    - The put method adds a new page to the cache. If the cache exceeds its capacity, it removes the least recently used page (the first item).

## Example Output
For a cache with requests [(1, 'A'), (2, 'B'), (3, 'C'), (1, 'A'), (4, 'D'), (2, 'B'), (5, 'E')], the pages will be cached as follows:
```bash
Initial Cache: [1: A]
Cache after request 2: [1: A, 2: B]
Cache after request 3: [1: A, 2: B, 3: C]
Cache after request 4 (evict 2): [1: A, 3: C, 4: D]
Cache after request 5 (evict 3): [1: A, 4: D, 5: E]
```

## Time and Space Complexity
    - Time Complexity: O(1) for both get and put operations on average.
    - Space Complexity: O(n) where n is the capacity of the cache, due to storage of cached pages.

## Conclusion
The Least Recently Used (LRU) algorithm is an effective cache replacement strategy that helps maintain the most frequently accessed data while efficiently managing limited cache resources. This method significantly reduces the chances of cache misses and improves the performance of applications reliant on fast data retrieval.