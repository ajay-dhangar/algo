---
id: skip-list
title: "Skip List"
sidebar_label: "Skip List"
sidebar_position: 2
description: "A probabilistic data structure that provides O(log n) average time complexity for search, insertion, and deletion operations using hierarchical linked lists."
tags: ["dsa", "data-structures", "advanced", "search"]
---

# Skip List

## Overview

A Skip List is a probabilistic data structure that provides O(log n) average-case complexity for search, insertion, and deletion operations. It extends a sorted singly-linked list with multiple levels of express lanes, allowing quick navigation through the data.

## Structure

A Skip List consists of multiple levels, where:
- **Level 0**: Complete sorted linked list containing all elements
- **Higher levels**: Sparse "express lanes" containing a subset of elements
- Each element has a random height (number of levels it appears in)
- Search starts from the highest level and descends when passing the target

### Visual Structure

```
Level 3:  NULL -> [NULL] ----------------------------> [NULL]
Level 2:  NULL -> [NULL] ---------> [NULL] ---------> [NULL]
Level 1:  NULL -> [NULL] -> [NULL] -> [NULL] -> [NULL] -> [NULL]
Level 0:  NULL -> [1] -> [3] -> [5] -> [7] -> [9] -> [NULL]
                ^
                |
              HEAD
```

## Random Level Generation

The key to Skip List's performance is the random level assignment using a **geometric distribution**:

- Each node has probability `p` (typically 0.5) of appearing at level `k+1` given it appears at level `k`
- Expected number of levels = 1 / (1 - p) = 2 for p = 0.5
- This ensures O(log n) height with high probability

```python
import random

def random_level(max_level, p=0.5):
    """Generate random level using geometric distribution."""
    level = 0
    while random.random() < p and level < max_level:
        level += 1
    return level
```

## Operations

### Search Operation

```
function search(skip_list, target):
    current = skip_list.header
    
    # Start from highest level, move right
    # Descend when we've passed the target
    for i from max_level down to 0:
        while current.forward[i].value < target:
            current = current.forward[i]
    
    # Move to level 0 and check next node
    current = current.forward[0]
    
    if current.value == target:
        return current  # Found
    return null  # Not found
```

### Insert Operation

```
function insert(skip_list, value):
    # Generate random level for new node
    new_level = random_level()
    
    # Create node with new_level + 1 forward pointers
    new_node = Node(value, new_level + 1)
    
    # Find predecessors at each level
    update = array of size new_level + 1
    current = skip_list.header
    
    for i from max_level down to 0:
        while current.forward[i] and current.forward[i].value < value:
            current = current.forward[i]
        if i <= new_level:
            update[i] = current
    
    # Insert at each level
    for i from 0 to new_level:
        new_node.forward[i] = update[i].forward[i]
        update[i].forward[i] = new_node
```

### Delete Operation

```
function delete(skip_list, value):
    update = array of size max_level + 1
    current = skip_list.header
    
    # Find predecessors for all levels
    for i from max_level down to 0:
        while current.forward[i] and current.forward[i].value < value:
            current = current.forward[i]
        update[i] = current
    
    # Check if target exists
    current = current.forward[0]
    if current.value != value:
        return false  # Not found
    
    # Remove from all levels
    for i from 0 to max_level:
        if update[i].forward[i] == current:
            update[i].forward[i] = current.forward[i]
    
    return true
```

## Python Implementation

```python
import random
from typing import Optional, List


class Node:
    """Skip List Node."""
    
    __slots__ = ['value', 'forward']
    
    def __init__(self, value: int, level: int):
        self.value = value
        self.forward = [None] * (level + 1)  # Forward pointers for each level


class SkipList:
    """
    Skip List implementation with O(log n) average operations.
    
    Space: O(n) expected
    Search/Insert/Delete: O(log n) expected
    """
    
    def __init__(self, max_level: int = 16, p: float = 0.5):
        self.max_level = max_level
        self.p = p
        self.header = Node(None, max_level)  # Sentinel header
        self.level = 0  # Current maximum level
        self.size = 0
    
    def _random_level(self) -> int:
        """Generate random level using geometric distribution."""
        level = 0
        while random.random() < self.p and level < self.max_level:
            level += 1
        return level
    
    def search(self, target: int) -> Optional[Node]:
        """Search for a value in the skip list. O(log n) expected."""
        current = self.header
        
        # Start from highest level, descend when needed
        for i in range(self.level, -1, -1):
            while (current.forward[i] and 
                   current.forward[i].value < target):
                current = current.forward[i]
        
        current = current.forward[0]
        
        if current and current.value == target:
            return current
        return None
    
    def insert(self, value: int) -> None:
        """Insert a value into the skip list. O(log n) expected."""
        new_level = self._random_level()
        
        # Extend list level if needed
        if new_level > self.level:
            self.level = new_level
        
        update = [self.header] * (new_level + 1)
        current = self.header
        
        # Find predecessors at each level
        for i in range(self.level, -1, -1):
            while (current.forward[i] and 
                   current.forward[i].value < value):
                current = current.forward[i]
            if i <= new_level:
                update[i] = current
        
        # Insert new node at each level
        new_node = Node(value, new_level)
        for i in range(new_level + 1):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node
        
        self.size += 1
    
    def delete(self, value: int) -> bool:
        """Delete a value from the skip list. O(log n) expected."""
        update = [None] * (self.max_level + 1)
        current = self.header
        
        # Find predecessors at each level
        for i in range(self.level, -1, -1):
            while (current.forward[i] and 
                   current.forward[i].value < value):
                current = current.forward[i]
            update[i] = current
        
        current = current.forward[0]
        
        if not current or current.value != value:
            return False  # Not found
        
        # Remove from all levels
        for i in range(self.level + 1):
            if update[i].forward[i] == current:
                update[i].forward[i] = current.forward[i]
        
        # Reduce list level if top level is empty
        while self.level > 0 and not self.header.forward[self.level]:
            self.level -= 1
        
        self.size -= 1
        return True
    
    def __str__(self) -> str:
        """String representation showing all levels."""
        lines = []
        for i in range(self.level, -1, -1):
            level_vals = []
            current = self.header.forward[i]
            while current:
                level_vals.append(str(current.value))
                current = current.forward[i]
            lines.append(f"Level {i}: {' -> '.join(level_vals) or 'empty'}")
        return '\n'.join(lines)


# Example usage
if __name__ == "__main__":
    skiplist = SkipList()
    
    # Insert elements
    for val in [3, 6, 7, 9, 12, 19, 17, 26, 21, 25]:
        skiplist.insert(val)
    
    print("Skip List structure:")
    print(skiplist)
    print()
    
    # Search
    result = skiplist.search(17)
    print(f"Search 17: {'Found' if result else 'Not Found'}")
    
    result = skiplist.search(18)
    print(f"Search 18: {'Found' if result else 'Not Found'}")
    
    # Delete
    skiplist.delete(19)
    print(f"\nAfter deleting 19:")
    print(skiplist)
```

## JavaScript Implementation

```javascript
class SkipListNode {
    constructor(value, level) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    constructor(maxLevel = 16, p = 0.5) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.header = new SkipListNode(null, maxLevel);
        this.level = 0;
        this.size = 0;
    }
    
    _randomLevel() {
        let level = 0;
        while (Math.random() < this.p && level < this.maxLevel) {
            level++;
        }
        return level;
    }
    
    search(target) {
        let current = this.header;
        
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].value < target) {
                current = current.forward[i];
            }
        }
        
        current = current.forward[0];
        return current && current.value === target ? current : null;
    }
    
    insert(value) {
        const newLevel = this._randomLevel();
        
        if (newLevel > this.level) {
            this.level = newLevel;
        }
        
        const update = new Array(newLevel + 1).fill(this.header);
        let current = this.header;
        
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].value < value) {
                current = current.forward[i];
            }
            if (i <= newLevel) {
                update[i] = current;
            }
        }
        
        const newNode = new SkipListNode(value, newLevel);
        for (let i = 0; i <= newLevel; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
        
        this.size++;
    }
    
    delete(value) {
        const update = new Array(this.maxLevel + 1).fill(null);
        let current = this.header;
        
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current;
        }
        
        current = current.forward[0];
        
        if (!current || current.value !== value) {
            return false;
        }
        
        for (let i = 0; i <= this.level; i++) {
            if (update[i].forward[i] === current) {
                update[i].forward[i] = current.forward[i];
            }
        }
        
        while (this.level > 0 && !this.header.forward[this.level]) {
            this.level--;
        }
        
        this.size--;
        return true;
    }
    
    toString() {
        let result = [];
        for (let i = this.level; i >= 0; i--) {
            let levelVals = [];
            let node = this.header.forward[i];
            while (node) {
                levelVals.push(String(node.value));
                node = node.forward[i];
            }
            result.push(`Level ${i}: ${levelVals.join(' -> ') || 'empty'}`);
        }
        return result.join('\n');
    }
}

// Example usage
const skiplist = new SkipList();
[3, 6, 7, 9, 12, 19, 17, 26, 21, 25].forEach(v => skiplist.insert(v));

console.log("Skip List structure:");
console.log(skiplist.toString());
console.log("\nSearch 17:", skiplist.search(17) ? "Found" : "Not Found");
console.log("Search 18:", skiplist.search(18) ? "Found" : "Not Found");
```

## Comparison with Balanced BST

| Aspect | Skip List | Balanced BST (AVL/Red-Black) |
|--------|-----------|------------------------------|
| Implementation | Simpler, pointer-based | Complex rotation operations |
| Search complexity | O(log n) expected | O(log n) guaranteed |
| Insert/Delete | O(log n) expected, easier | O(log n) guaranteed, complex |
| Memory | O(n log n) expected | O(n) |
| Determinism | Probabilistic | Deterministic |
| Cache locality | Better (sequential access) | Worse (pointer chasing) |
| Concurrency | Easier to parallelize | Harder |

## Complexity Analysis

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Space | O(n) | O(n log n) |

The worst case occurs when random level generation produces unexpectedly high levels for many nodes. With p = 0.5, the probability of O(n) worst case is astronomically small.
