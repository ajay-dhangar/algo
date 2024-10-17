---
id: LRU_Scheduling
title: Least Recently used Scheduling
sidebar_label: "Least Recently used Scheduling"
sidebar_position: 6
description: An overview of Least Recently used Scheduling and its applications in programming.
tags: [CPU Scheduling, algorithms, programming,LRU]
---

# Least Recently Used (LRU) Cache Algorithm

## Definition
LRU (Least Recently Used) is a cache replacement algorithm that removes the least recently accessed item when the cache reaches its maximum capacity. It tracks the order in which items are used, ensuring that the most recently accessed items remain in the cache while the least recently accessed are evicted.

- **Key Idea:** When a new item is accessed or added to the cache, it is moved to the front, and when the cache is full, the item at the end (least recently used) is removed.

## Where It Is Used
- Used in systems where limited memory is allocated for caching frequently accessed data (e.g., web browsers, CPU cache, database management).
- Operating systems implement it for paging to replace the least recently used memory pages.

## Steps to Implement LRU
1. **Check Cache Size:** If the cache is full, remove the least recently used item.
2. **Access or Add New Item:** Move the accessed item to the front of the cache.
3. **Update Order:** Reorder the items so that the most recently used item is at the front and the least recently used is at the end.

## Example

Consider a cache with a capacity of 3:
- **Initial Cache:** `[]`
- **Access 1:** Cache becomes `[1]`
- **Access 2:** Cache becomes `[2, 1]`
- **Access 3:** Cache becomes `[3, 2, 1]`
- **Access 1:** Cache becomes `[1, 3, 2]` (1 is most recently used)
- **Access 4:** Cache becomes `[4, 1, 3]` (2 is evicted)

## Time Complexity Analysis

### Best Case Scenario:
In the best case, when accessing or adding an item that is already in the cache, the LRU algorithm only needs to reorder the items.

#### Example:
- Cache: `[3, 2, 1]`
- Accessing `3` (already in cache), simply move `3` to the front.

- **Time Complexity (Best Case):** `O(1)` for access and reorder operations, assuming the use of a data structure like a hash map with a doubly linked list.

### Worst Case Scenario:
In the worst case, when adding an item to a full cache, the LRU algorithm must remove the least recently used item and add the new item to the cache.

#### Example:
- Cache: `[3, 2, 1]` (full)
- Accessing `4` (not in cache), remove `1`, add `4`, and reorder the list.

- **Time Complexity (Worst Case):** `O(1)` for removing and adding operations (with a hash map and linked list), but if not implemented efficiently, it can be `O(n)` where `n` is the size of the cache (for searching and removing).

### Detailed Best and Worst Case Analysis:
- **Best Case:** Accessing or updating an existing element is `O(1)` when using a hash map for fast lookups and a doubly linked list to maintain the access order.
- **Worst Case:** Adding a new element to a full cache, followed by removing the least recently used element, still results in `O(1)` operations using an efficient combination of hash map and linked list.

### Summary of Time Complexities:
- **Best Case Time Complexity:** `O(1)` for accessing or updating an existing element.
- **Worst Case Time Complexity:** `O(1)` for removing the least recently used item and adding a new item in an efficiently implemented cache.

## Advantages
- **Efficient for Cache Replacement:** Quickly identifies and removes the least recently used items.
- **Simple to Implement:** LRU logic is relatively simple when using appropriate data structures (hash map + linked list).

## Disadvantages
- **Memory Overhead:** Requires additional memory to maintain the linked list and hash map.
- **Complexity in Implementation:** Requires careful implementation to ensure efficient `O(1)` access and modification times.

## C Implementation

```c
#include <stdio.h>
#include <stdlib.h>

#define CAPACITY 3

struct Node {
    int key;
    struct Node* prev;
    struct Node* next;
};

struct LRUCache {
    struct Node* head;
    struct Node* tail;
    int size;
};

struct LRUCache* createCache() {
    struct LRUCache* cache = (struct LRUCache*) malloc(sizeof(struct LRUCache));
    cache->head = NULL;
    cache->tail = NULL;
    cache->size = 0;
    return cache;
}

void accessCache(struct LRUCache* cache, int key) {
    // Implementation to access and reorder the cache items
    // Code omitted for brevity
}

int main() {
    struct LRUCache* cache = createCache();
    accessCache(cache, 1);
    accessCache(cache, 2);
    accessCache(cache, 3);
    accessCache(cache, 4);  // Evicts least recently used item
    return 0;
}
```
## Python Implementation

```c
class LRUCache:
    def __init__(self, capacity: int):
        self.cache = {}
        self.capacity = capacity
        self.order = []

    def get(self, key: int) -> int:
        if key in self.cache:
            self.order.remove(key)
            self.order.insert(0, key)
            return self.cache[key]
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) == self.capacity:
            lru = self.order.pop()
            del self.cache[lru]
        self.order.insert(0, key)
        self.cache[key] = value

# Example usage:
cache = LRUCache(3)
cache.put(1, 1)
cache.put(2, 2)
cache.put(3, 3)
cache.get(1)  # Access 1, makes it most recently used
cache.put(4, 4)  # Evicts 2

```
## Java Implementation

```c
import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(3);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.put(3, 3);
        cache.get(1);  // Accesses 1, makes it most recently used
        cache.put(4, 4);  // Evicts 2
    }
}

```