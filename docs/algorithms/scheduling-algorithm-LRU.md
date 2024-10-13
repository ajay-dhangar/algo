---

title: Scheduling-algo LRU
sidebar_label: scheduling algo
sidebar_position: 2
tags: [scheduling-algo LRU]
description: The Least Recently Used (LRU) algorithm is a popular page replacement strategy used in operating systems and caching mechanisms. It aims to efficiently manage limited memory by discarding the least recently accessed items first.

---

# LRU Cache Implementation

## Overview
The Least Recently Used (LRU) Cache is a widely-used page replacement strategy in operating systems and caching mechanisms. It efficiently manages limited memory by discarding the least recently accessed items first, ensuring optimal performance.

## Algorithm
### Key Points
- **Principle**: LRU discards the least recently used pages to make room for new pages.
- **Implementation**: Can be implemented using a doubly linked list and a hash map for O(1) access and update time.
- **Usage**: Commonly used in CPU cache management, database memory management, and other scenarios requiring efficient memory usage.

### Example
Given a cache capacity of 3 and a series of page requests `[7, 0, 1, 2, 0, 3, 0, 4]`, the LRU cache will manage the pages as follows:
1. Cache: `[7]`
2. Cache: `[7, 0]`
3. Cache: `[7, 0, 1]`
4. Cache: `[0, 1, 2]` (7 is discarded, least recently used)
5. Cache: `[1, 2, 0]`
6. Cache: `[2, 0, 3]` (1 is discarded)
7. Cache: `[0, 3, 2]`
8. Cache: `[3, 2, 4]` (0 is discarded)

# Advantages:
Efficiency: Reduces the number of page faults in systems where certain data is accessed frequently.

Fairness: Ensures a fair chance of pages being retained based on recent usage.

## Implementation in Java
Here is the Java implementation of an LRU Cache:

```java
import java.util.*;

public class LRUCache {
    private final int capacity;
    private final Map<Integer, Integer> map;
    private final LinkedHashSet<Integer> set;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.set = new LinkedHashSet<>();
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        set.remove(key);
        set.add(key);
        return map.get(key);
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            set.remove(key);
        } else if (map.size() == capacity) {
            int oldest = set.iterator().next();
            set.remove(oldest);
            map.remove(oldest);
        }
        map.put(key, value);
        set.add(key);
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println(cache.get(1)); // returns 1
        cache.put(3, 3);
        System.out.println(cache.get(2)); // returns -1 (not found)
        cache.put(4, 4);
        System.out.println(cache.get(1)); // returns -1 (not found)
        System.out.println(cache.get(3)); // returns 3
        System.out.println(cache.get(4)); // returns 4
    }
}
```

Conclusion
The LRU Cache efficiently manages memory by retaining the most frequently accessed pages and discarding the least recently used ones. This implementation is ideal for systems with limited memory and requires optimal performance.

