---
id: lru-cache
title: "LRU Cache"
sidebar_label: "LRU Cache"
sidebar_position: 2
description: "Least Recently Used Cache implementation using HashMap and Doubly Linked List providing O(1) time complexity for both get and put operations."
tags: ["dsa", "data-structures", "cache", "design"]
---

# LRU Cache

## Overview

Least Recently Used (LRU) Cache is a caching mechanism that evicts the least recently used item when the cache reaches its capacity. It combines a HashMap for O(1) key lookup with a Doubly Linked List for O(1) order maintenance.

## Design Pattern

LRU Cache uses two data structures in combination:

1. **HashMap**: Maps keys to linked list nodes for O(1) access
2. **Doubly Linked List**: Maintains usage order, with most recently used at head

```
LRU Cache Structure:

HashMap:              Doubly Linked List:
┌─────────────┐        HEAD <-> [MRU] <-> ... <-> [LRU] <-> TAIL
│ key1 -> Node│
│ key2 -> Node│              Node Structure:
│ key3 -> Node│        ┌──────┬─────────┬──────────┬──────┐
└─────────────┘        │ prev │  key    │   value  │ next │
                       └──────┴─────────┴──────────┴──────┘
```

## Sentinel Nodes

Using **dummy head and tail sentinel nodes** eliminates edge case handling:
- New items are inserted right after HEAD (most recently used position)
- Evicted items are removed from before TAIL (least recently used position)
- No null checks needed for boundary conditions

## Operations

### Get Operation

```
function get(key):
    if key not in cache:
        return -1
    
    node = map[key]
    move_to_front(node)  # Mark as most recently used
    return node.value
```

### Put Operation

```
function put(key, value):
    if key in cache:
        node = map[key]
        node.value = value
        move_to_front(node)
    else:
        if cache is full:
            lru = tail.prev
            remove(lru)
            delete map[lru.key]
        
        new_node = Node(key, value)
        add_to_front(new_node)
        map[key] = new_node
```

### Move to Front

```
function move_to_front(node):
    remove(node)
    add_to_front(node)
```

## Python Implementation

```python
class Node:
    """Doubly linked list node for LRU Cache."""
    
    __slots__ = ['key', 'value', 'prev', 'next']
    
    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    """
    LRU Cache implementation using HashMap + Doubly Linked List.
    
    Operations: O(1) time complexity
    Space: O(capacity)
    
    LeetCode Reference: LeetCode 146 - LRU Cache
    """
    
    def __init__(self, capacity: int):
        """
        Initialize LRU cache.
        
        Args:
            capacity: Maximum number of key-value pairs to store
        """
        self.capacity = capacity
        self.cache = {}  # key -> Node
        
        # Sentinel nodes: head (MRU side) <-> ... <-> tail (LRU side)
        self.head = Node()  # Dummy head
        self.tail = Node()  # Dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node: Node) -> None:
        """Remove node from doubly linked list."""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_front(self, node: Node) -> None:
        """Add node right after dummy head (most recently used position)."""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
    
    def _move_to_front(self, node: Node) -> None:
        """Move existing node to front (mark as most recently used)."""
        self._remove(node)
        self._add_to_front(node)
    
    def get(self, key: int) -> int:
        """
        Get value by key. Returns -1 if key not found.
        Moves accessed item to front as most recently used.
        
        Time: O(1)
        """
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        self._move_to_front(node)
        return node.value
    
    def put(self, key: int, value: int) -> None:
        """
        Insert or update key-value pair.
        If key exists, update value and move to front.
        If cache is full, evict least recently used item.
        
        Time: O(1)
        """
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_front(node)
        else:
            # Check capacity and evict if needed
            if len(self.cache) >= self.capacity:
                # Remove least recently used (before dummy tail)
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
            
            # Add new node to front
            new_node = Node(key, value)
            self._add_to_front(new_node)
            self.cache[key] = new_node
    
    def __str__(self) -> str:
        """Display cache contents from MRU to LRU."""
        items = []
        current = self.head.next
        while current != self.tail:
            items.append(f"({current.key}: {current.value})")
            current = current.next
        return " -> ".join(items) if items else "empty"


# Example usage and testing
if __name__ == "__main__":
    # LeetCode 146 test case
    cache = LRUCache(2)  # Capacity 2
    
    cache.put(1, 1)
    print(f"After put(1,1): {cache}")
    # Cache: [1:1]
    
    cache.put(2, 2)
    print(f"After put(2,2): {cache}")
    # Cache: [2:2] <-> [1:1]
    
    print(f"get(1) = {cache.get(1)}")  # Returns 1, cache: [1:1] <-> [2:2]
    # Cache: [1:1] <-> [2:2]
    
    cache.put(3, 3)  # Evicts key 2 (LRU)
    print(f"After put(3,3): {cache}")
    # Cache: [3:3] <-> [1:1]
    
    print(f"get(2) = {cache.get(2)}")  # Returns -1 (not found)
    
    cache.put(4, 4)  # Evicts key 1 (LRU)
    print(f"After put(4,4): {cache}")
    # Cache: [4:4] <-> [3:3]
    
    print(f"get(1) = {cache.get(1)}")  # Returns -1 (evicted)
    print(f"get(3) = {cache.get(3)}")  # Returns 3
    print(f"get(4) = {cache.get(4)}")  # Returns 4
```

## JavaScript Implementation

```javascript
class LRUNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * LRU Cache using HashMap + Doubly Linked List with sentinel nodes.
 * All operations run in O(1) time.
 */
class LRUCache {
    /**
     * @param {number} capacity - Maximum number of entries
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();  // Map maintains insertion order in JS
        
        // Sentinel nodes
        this.head = new LRUNode(null, null);
        this.tail = new LRUNode(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    _moveToFront(node) {
        this._remove(node);
        this._addToFront(node);
    }
    
    /**
     * Get value by key. Returns -1 if not found.
     * Accessing a key makes it most recently used.
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        
        const node = this.cache.get(key);
        this._moveToFront(node);
        return node.value;
    }
    
    /**
     * Insert or update key-value pair.
     * @param {number} key
     * @param {number} value
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing node
            const node = this.cache.get(key);
            node.value = value;
            this._moveToFront(node);
        } else {
            // Evict if at capacity
            if (this.cache.size >= this.capacity) {
                const lru = this.tail.prev;
                this._remove(lru);
                this.cache.delete(lru.key);
            }
            
            // Add new node
            const newNode = new LRUNode(key, value);
            this._addToFront(newNode);
            this.cache.set(key, newNode);
        }
    }
    
    toString() {
        const items = [];
        let current = this.head.next;
        while (current !== this.tail) {
            items.push(`(${current.key}:${current.value})`);
            current = current.next;
        }
        return items.join(' -> ') || 'empty';
    }
}

// Example usage
const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(`After put 1,2: ${cache}`);

console.log(`get(1) = ${cache.get(1)}`);  // 1

cache.put(3, 3);
console.log(`After put 3: ${cache}`);  // Evicts 2

console.log(`get(2) = ${cache.get(2)}`);  // -1

cache.put(4, 4);
console.log(`After put 4: ${cache}`);  // Evicts 1

console.log(`get(1) = ${cache.get(1)}`);  // -1
console.log(`get(3) = ${cache.get(3)}`);  // 3
console.log(`get(4) = ${cache.get(4)}`);  // 4
```

## Alternative: Python Using OrderedDict

Python's `collections.OrderedDict` provides a simpler implementation:

```python
from collections import OrderedDict

class LRUCacheSimple:
    """Simpler LRU Cache using Python's OrderedDict."""
    
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as most recently used
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove LRU (first item)
```

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|-------------------|
| get(key) | O(1) | O(1) |
| put(key, value) | O(1) | O(1) |
| Overall Space | - | O(capacity) |

## Why O(1) Works

1. **HashMap**: Provides O(1) lookup of node by key
2. **Doubly Linked List**: Provides O(1) insertion and deletion
3. **Sentinel Nodes**: Eliminate null checks at boundaries

The combination gives us:
- `get`: Hash lookup + list move = O(1)
- `put`: Hash lookup/check + optional eviction + list insert = O(1)

## LeetCode Reference

- **LeetCode 146 - LRU Cache**: The classic LRU Cache problem
- **LeetCode 460 - LFU Cache**: Follow-up problem (Least Frequently Used)
