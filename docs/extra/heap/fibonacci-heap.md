---
id: fibonacci-heap
title: "Fibonacci Heap"
sidebar_label: "Fibonacci Heap"
sidebar_position: 5
description: "An advanced heap data structure supporting insert in O(1), extract-min in O(log n), and decrease-key in O(1) amortized time, used to optimise Dijkstra's algorithm."
tags: ["dsa", "data-structures", "advanced", "heap"]
---

# Fibonacci Heap

## Overview

A Fibonacci Heap is a collection of min-heap-ordered trees that supports amortized O(1) insert, merge, and decrease-key operations. It achieves better theoretical bounds than binary heaps for certain algorithms like Dijkstra's shortest path.

## Structure

A Fibonacci Heap consists of:
- **Root List**: Circular doubly linked list of tree roots
- **Trees**: Min-heap ordered trees of varying structures
- **Min Pointer**: Points to the minimum element in the root list
- **Degree Tracking**: Each node tracks the number of children

```
Fibonacci Heap Structure:

         Root List (circular DLL)
         ┌─────────────────────────┐
         │                        ↓
    ○────[15]────○────[3]────○────[18]────○
    ↑           ↑               ↑
    │           │               │
    │      Min Pointer ─────────┘
    │
    └─[6]──○──[12]──○──[9]
          │         │
          ○         ○
          │
         [7]       [10]
```

## Node Structure

```python
class FibonacciNode:
    """Node in Fibonacci Heap."""
    
    def __init__(self, key):
        self.key = key
        self.degree = 0  # Number of children
        self.marked = False  # Used for decrease-key
        self.parent = None
        self.child = None  # Pointer to one child
        self.left = None   # Sibling in doubly linked list
        self.right = None  # Sibling in doubly linked list
```

## Operations

### Insert O(1)

New nodes are inserted at the root list's beginning (O(1)):
```
insert(H, x):
    x.degree = 0
    x.parent = null
    x.child = null
    x.marked = false
    
    # Add to root list
    if H.min == null:
        x.left = x
        x.right = x
        H.min = x
    else:
        x.right = H.min
        x.left = H.min.left
        H.min.left.right = x
        H.min.left = x
        
        if x.key < H.min.key:
            H.min = x
    
    H.n++  # Increment node count
```

### Extract-Min O(log n) amortized

Most complex operation - involves consolidate:

```
extract-min(H):
    z = H.min
    if z != null:
        # Add all children to root list
        for each child c of z:
            add c to root list
            c.parent = null
        
        # Remove z from root list
        z.left.right = z.right
        z.right.left = z.left
        
        if z == z.right:
            H.min = null
        else:
            H.min = z.right
            consolidate(H)
        
        H.n--
    
    return z

consolidate(H):
    # D(n) = floor(log_phi(n)) where phi = 1.618
    # Create array of size D(n) + 1
    A = array of size D(n) + 1
    initialize A[i] = null for all i
    
    # For each root in root list
    for each node w in root list:
        x = w
        d = x.degree
        
        while A[d] != null:
            y = A[d]  # Another node with same degree
            
            # Make sure x has smaller key
            if x.key > y.key:
                swap x and y
            
            # Link y under x
            link(y, x)
            A[d] = null
            d++
        
        A[d] = x
    
    # Find new minimum
    H.min = null
    for i = 0 to D(n):
        if A[i] != null:
            add A[i] to root list
            if H.min == null or A[i].key < H.min.key:
                H.min = A[i]
```

### Decrease-Key O(1) amortized

```
decrease-key(H, x, k):
    if k > x.key:
        error "New key is greater than current"
    
    x.key = k
    y = x.parent
    
    if y != null and x.key < y.key:
        cut(H, x, y)
        cascading-cut(H, y)
    
    if x.key < H.min.key:
        H.min = x

cut(H, x, y):
    # Remove x from child list of y
    remove x from y's child list
    y.degree--
    
    # Add x to root list
    add x to root list
    x.parent = null
    x.marked = false

cascading-cut(H, y):
    z = y.parent
    if z != null:
        if y.marked == false:
            y.marked = true
        else:
            cut(H, y, z)
            cascading-cut(H, z)
```

## Python Implementation

```python
import math
from typing import Optional


class FibonacciNode:
    """Node in Fibonacci Heap."""
    
    def __init__(self, key):
        self.key = key
        self.degree = 0
        self.marked = False
        self.parent: Optional['FibonacciNode'] = None
        self.child: Optional['FibonacciNode'] = None
        self.left: Optional['FibonacciNode'] = self
        self.right: Optional['FibonacciNode'] = self
    
    def __repr__(self):
        return f"FibNode({self.key}, deg={self.degree})"


class FibonacciHeap:
    """
    Fibonacci Heap implementation.
    
    Amortized Complexities:
    - insert: O(1)
    - find-min: O(1)
    - extract-min: O(log n)
    - decrease-key: O(1)
    - merge/union: O(1)
    
    Real-time Complexities:
    - insert: O(1)
    - find-min: O(1)
    - extract-min: O(n) worst
    - decrease-key: O(n) worst
    """
    
    def __init__(self):
        self.min_node: Optional[FibonacciNode] = None
        self.total_nodes = 0
    
    def _link(self, y: FibonacciNode, x: FibonacciNode):
        """Make y a child of x."""
        # Remove y from root list
        y.left.right = y.right
        y.right.left = y.left
        
        # Make y a child of x
        y.parent = x
        
        if x.child is None:
            x.child = y
            y.left = y
            y.right = y
        else:
            y.right = x.child
            y.left = x.child.left
            x.child.left.right = y
            x.child.left = y
        
        x.degree += 1
        y.marked = False
    
    def _consolidate(self):
        """Consolidate trees after extract-min."""
        max_degree = int(math.log(self.total_nodes) / math.log((1 + 5**0.5) / 2)) + 2
        degrees = [None] * (max_degree + 1)
        
        roots = []
        current = self.min_node
        if current:
            roots.append(current)
            current = current.right
            while current != self.min_node:
                roots.append(current)
                current = current.right
        
        for root in roots:
            x = root
            d = x.degree
            
            while degrees[d]:
                y = degrees[d]
                if x.key > y.key:
                    x, y = y, x
                self._link(y, x)
                degrees[d] = None
                d += 1
            
            degrees[d] = x
        
        self.min_node = None
        
        for node in degrees:
            if node:
                if self.min_node is None:
                    self.min_node = node
                    node.left = node
                    node.right = node
                else:
                    # Add to root list
                    node.right = self.min_node
                    node.left = self.min_node.left
                    self.min_node.left.right = node
                    self.min_node.left = node
                    
                    if node.key < self.min_node.key:
                        self.min_node = node
    
    def insert(self, key) -> FibonacciNode:
        """Insert a new node. O(1) amortized."""
        node = FibonacciNode(key)
        
        if self.min_node is None:
            self.min_node = node
        else:
            # Add to root list
            node.right = self.min_node
            node.left = self.min_node.left
            self.min_node.left.right = node
            self.min_node.left = node
            
            if node.key < self.min_node.key:
                self.min_node = node
        
        self.total_nodes += 1
        return node
    
    def get_min(self) -> Optional[int]:
        """Return minimum key without removing. O(1)."""
        return self.min_node.key if self.min_node else None
    
    def extract_min(self) -> Optional[int]:
        """Remove and return minimum key. O(log n) amortized."""
        if self.min_node is None:
            return None
        
        z = self.min_node
        min_key = z.key
        
        # Add children to root list
        if z.child:
            children = []
            child = z.child
            children.append(child)
            child = child.right
            while child != z.child:
                children.append(child)
                child = child.right
            
            for child in children:
                child.right = self.min_node
                child.left = self.min_node.left
                self.min_node.left.right = child
                self.min_node.left = child
                child.parent = None
        
        # Remove z from root list
        z.left.right = z.right
        z.right.left = z.left
        
        if z == z.right:
            self.min_node = None
        else:
            self.min_node = z.right
            self._consolidate()
        
        self.total_nodes -= 1
        return min_key
    
    def decrease_key(self, node: FibonacciNode, new_key: float):
        """Decrease key of a node. O(1) amortized."""
        if new_key > node.key:
            raise ValueError("New key is greater than current key")
        
        node.key = new_key
        parent = node.parent
        
        if parent and node.key < parent.key:
            # Cut node from parent
            if node.right != node:
                node.left.right = node.right
                node.right.left = node.left
            else:
                parent.child = node.right if node.right != node else None
            
            parent.degree -= 1
            node.parent = None
            node.marked = False
            
            # Add to root list
            node.right = self.min_node
            node.left = self.min_node.left
            self.min_node.left.right = node
            self.min_node.left = node
            
            # Cascading cut
            self._cascading_cut(parent)
        
        if node.key < self.min_node.key:
            self.min_node = node
    
    def _cascading_cut(self, node: FibonacciNode):
        """Perform cascading cut on marked nodes."""
        parent = node.parent
        if parent:
            if not node.marked:
                node.marked = True
            else:
                # Cut this node
                if node.right != node:
                    node.left.right = node.right
                    node.right.left = node.left
                else:
                    parent.child = node.right if node.right != node else None
                
                parent.degree -= 1
                node.parent = None
                node.marked = False
                
                # Add to root list
                node.right = self.min_node
                node.left = self.min_node.left
                self.min_node.left.right = node
                self.min_node.left = node
                
                self._cascading_cut(parent)


# Example usage
if __name__ == "__main__":
    heap = FibonacciHeap()
    
    # Insert elements
    for key in [7, 3, 18, 10, 8, 1, 6, 5]:
        heap.insert(key)
    
    print(f"Minimum: {heap.get_min()}")  # 1
    
    # Extract minimum repeatedly
    print("Extracting all elements:")
    while heap.get_min() is not None:
        print(f"  Extracted: {heap.extract_min()}")
    
    # Test decrease-key
    heap2 = FibonacciHeap()
    nodes = [heap2.insert(x) for x in [5, 10, 15, 20]]
    print(f"\nMinimum before decrease: {heap2.get_min()}")
    heap2.decrease_key(nodes[2], 3)  # Decrease 15 to 3
    print(f"Minimum after decrease-key(15->3): {heap2.get_min()}")
```

## Complexity Analysis

| Operation | Amortized | Worst Case | Explanation |
|-----------|-----------|------------|-------------|
| insert | O(1) | O(1) | Simple root list insertion |
| find-min | O(1) | O(1) | Maintain min pointer |
| extract-min | O(log n) | O(n) | Consolidate requires tree linking |
| decrease-key | O(1) | O(n) | Cascading cuts |
| delete | O(log n) | O(n) | decrease-key + extract-min |
| merge/union | O(1) | O(1) | Concatenate root lists |

## Why Fibonacci Heap?

Fibonacci Heaps achieve better amortized bounds because:

1. **Lazy Organization**: No immediate consolidation after insert
2. **Binomial-like Structure**: Trees can be any shape (not restricted)
3. **Potential Method**: Used to pay for expensive operations

The structure is optimized for situations where:
- Many inserts with few extracts
- Decrease-key operations are frequent
- Building priority queues incrementally

## Applications

- **Dijkstra's Algorithm**: O(E + V log V) with Fibonacci Heap vs O(E log V) with binary heap
- **Prim's MST Algorithm**: Same improvement as Dijkstra
- **Huffman Coding**: Efficient when combined with decrease-key

## Trade-offs

While Fibonacci Heaps have excellent theoretical bounds, they have:
- High constant factors
- Complex implementation
- Poor cache locality

For practical applications, binary heaps or pairing heaps are often preferred unless the theoretical improvements are critical.
