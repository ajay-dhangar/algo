id: splay-tree-insertion
title: "Splay Tree Insertion"
sidebar_label: "Splay Tree Insertion"
sidebar_position: 6
description: "A guide to splay tree insertion using zig, zig-zig, and zig-zag rotations with amortized O(log n) time complexity using the potential method analysis."
tags: ["dsa", "data-structures", "trees", "splay-tree"]

# Splay Tree Insertion

## Overview

A Splay Tree is a self-adjusting binary search tree where every operation (search, insert, delete) ends by "splaying" the accessed node to the root using a sequence of rotations. Despite not guaranteeing O(log n) worst case, it achieves O(log n) amortized complexity.

## The Splaying Operation

Splaying moves a node to the root through a series of rotations based on patterns:

### Rotation Types

**Zig (Node is child of root)**:
```
    Root                x
     |        →        / \
     x                 a  Root
    / \                    |
   a   b                   b
```

**Zig-Zig (Node and parent are both left/right children)**:
```
    G                     x
   / \        →         / \
  P   c                a   P
 / \                      / \
x   b                   b   G
/ \                          \
a   e                        c
```

**Zig-Zag (Node and parent are opposite children)**:
```
    G                     x
   / \        →         / \
  P   c                P   G
 / \                  / \   \
a   x                 a   b   c
   / \
  b   d
```

## Insertion Algorithm

```
insert(T, key):
    # Standard BST insertion
    node = BST_insert(T, key)
    
    # Splay the inserted node to root
    splay(node)
    
    return node

BST_insert(T, key):
    if T is null:
        return Node(key)
    
    if key < T.key:
        T.left = BST_insert(T.left, key)
    else if key > T.key:
        T.right = BST_insert(T.right, key)
    
    return T
```

## Amortized Analysis: Potential Method

The key to Splay Tree's O(log n) amortized bound is the **potential method**:

### Rank Definition
- Each node has rank `r(x) = log2(size(x))` where size(x) is subtree size
- Potential of tree: `Φ(T) = Σ r(x)` for all nodes x

### Amortized Cost
Amortized cost = Actual cost + ΔPotential

### Key Theorem (Splay Theorem)
**The amortized cost of splaying a node x in a tree of size n is at most 3 * (r(x) - r(root)) + 1 = O(log n)**

This means: **Total time for any sequence of m splay operations is O(m log n)**

## Python Implementation

```python
class SplayNode:
    """Node in Splay Tree."""
    
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.parent = None


class SplayTree:
    """
    Splay Tree implementation.
    
    Amortized Complexity: O(log n) for all operations
    Worst Case: O(n) for pathological sequences
    
    Invariant: After every operation, accessed node is at root.
    """
    
    def _rotate_right(self, x):
        """Right rotation around node x."""
        y = x.left
        x.left = y.right
        if y.right:
            y.right.parent = x
        y.right = x
        
        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x.parent.left == x:
            x.parent.left = y
        else:
            x.parent.right = y
        x.parent = y
    
    def _rotate_left(self, x):
        """Left rotation around node x."""
        y = x.right
        x.right = y.left
        if y.left:
            y.left.parent = x
        y.left = x
        
        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x.parent.left == x:
            x.parent.left = y
        else:
            x.parent.right = y
        x.parent = y
    
    def _splay(self, x):
        """Splay node x to root."""
        while x.parent is not None:
            parent = x.parent
            grandparent = parent.parent
            
            if grandparent is None:
                # Zig case
                if parent.left == x:
                    self._rotate_right(parent)
                else:
                    self._rotate_left(parent)
            elif parent.left == x and grandparent.left == parent:
                # Zig-Zig (both left)
                self._rotate_right(grandparent)
                self._rotate_right(parent)
            elif parent.right == x and grandparent.right == parent:
                # Zig-Zig (both right)
                self._rotate_left(grandparent)
                self._rotate_left(parent)
            elif parent.left == x and grandparent.right == parent:
                # Zig-Zag (left-right)
                self._rotate_right(parent)
                self._rotate_left(grandparent)
            else:
                # Zig-Zag (right-left)
                self._rotate_left(parent)
                self._rotate_right(grandparent)
    
    def _find(self, key):
        """Find node with key. Returns (node, found)."""
        current = self.root
        parent = None
        
        while current:
            if key == current.key:
                return current, True
            elif key < current.key:
                parent = current
                current = current.left
            else:
                parent = current
                current = current.right
        
        return parent, False
    
    def insert(self, key):
        """Insert key into splay tree. O(log n) amortized."""
        if self.root is None:
            self.root = SplayNode(key)
            return
        
        node, found = self._find(key)
        
        if found:
            # Key exists, splay it to root
            self._splay(node)
            return
        
        # Create new node
        new_node = SplayNode(key)
        
        if key < node.key:
            node.left = new_node
            new_node.parent = node
        else:
            node.right = new_node
            new_node.parent = node
        
        # Splay new node to root
        self._splay(new_node)
    
    def search(self, key):
        """Search for key. Returns True if found, False otherwise."""
        if self.root is None:
            return False
        
        current, found = self._find(key)
        
        # Splay accessed node to root
        self._splay(current)
        self.root = current
        
        return found
    
    def delete(self, key):
        """Delete key from splay tree. O(log n) amortized."""
        if self.root is None:
            return False
        
        current, found = self._find(key)
        
        if not found:
            self._splay(current)
            return False
        
        self._splay(current)
        
        # Split into left and right subtrees
        left_subtree = self.root.left
        right_subtree = self.root.right
        
        if left_subtree:
            left_subtree.parent = None
        
        if right_subtree:
            right_subtree.parent = None
        
        # Find max in left subtree
        if left_subtree:
            max_node = left_subtree
            while max_node.right:
                max_node = max_node.right
            self._splay(max_node)
            max_node.right = right_subtree
            if right_subtree:
                right_subtree.parent = max_node
            self.root = max_node
        else:
            self.root = right_subtree
        
        return True
    
    def inorder(self):
        """Return inorder traversal as list."""
        result = []
        self._inorder_helper(self.root, result)
        return result
    
    def _inorder_helper(self, node, result):
        if node:
            self._inorder_helper(node.left, result)
            result.append(node.key)
            self._inorder_helper(node.right, result)
    
    def __str__(self):
        return str(self.inorder())


# Example usage
if __name__ == "__main__":
    tree = SplayTree()
    
    # Insert elements
    for key in [10, 20, 5, 8, 3, 15]:
        tree.insert(key)
        print(f"Insert {key}: {tree}")
    
    # Search (splay to root)
    print(f"\nSearch 8: {tree.search(8)}")
    print(f"Tree after search: {tree}")
    
    print(f"Search 2: {tree.search(2)}")
    print(f"Tree after failed search: {tree}")
    
    # Delete
    tree.delete(10)
    print(f"\nAfter delete 10: {tree}")
    
    tree.delete(5)
    print(f"After delete 5: {tree}")
```

## JavaScript Implementation

```javascript
class SplayNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class SplayTree {
    constructor() {
        this.root = null;
    }
    
    // Rotation helpers
    rotateRight(x) {
        const y = x.left;
        x.left = y.right;
        if (y.right) y.right.parent = x;
        y.right = x;
        
        y.parent = x.parent;
        if (!x.parent) {
            this.root = y;
        } else if (x.parent.left === x) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        x.parent = y;
    }
    
    rotateLeft(x) {
        const y = x.right;
        x.right = y.left;
        if (y.left) y.left.parent = x;
        y.left = x;
        
        y.parent = x.parent;
        if (!x.parent) {
            this.root = y;
        } else if (x.parent.left === x) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        x.parent = y;
    }
    
    splay(x) {
        while (x.parent) {
            const parent = x.parent;
            const grandparent = parent.parent;
            
            if (!grandparent) {
                // Zig
                if (parent.left === x) {
                    this.rotateRight(parent);
                } else {
                    this.rotateLeft(parent);
                }
            } else if (parent.left === x && grandparent.left === parent) {
                // Zig-Zig (both left)
                this.rotateRight(grandparent);
                this.rotateRight(parent);
            } else if (parent.right === x && grandparent.right === parent) {
                // Zig-Zig (both right)
                this.rotateLeft(grandparent);
                this.rotateLeft(parent);
            } else if (parent.left === x && grandparent.right === parent) {
                // Zig-Zag
                this.rotateRight(parent);
                this.rotateLeft(grandparent);
            } else {
                // Zig-Zag
                this.rotateLeft(parent);
                this.rotateRight(grandparent);
            }
        }
    }
    
    find(key) {
        let current = this.root;
        let parent = null;
        
        while (current) {
            if (key === current.key) {
                return { node: current, found: true };
            }
            parent = current;
            if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return { node: parent, found: false };
    }
    
    insert(key) {
        if (!this.root) {
            this.root = new SplayNode(key);
            return;
        }
        
        const { node: parent, found } = this.find(key);
        
        if (found) {
            this.splay(parent);
            return;
        }
        
        const newNode = new SplayNode(key);
        newNode.parent = parent;
        
        if (key < parent.key) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
        
        this.splay(newNode);
    }
    
    search(key) {
        if (!this.root) return false;
        
        const { node, found } = this.find(key);
        this.splay(node);
        this.root = node;
        
        return found;
    }
    
    delete(key) {
        if (!this.root) return false;
        
        const { node, found } = this.find(key);
        
        if (!found) {
            this.splay(node);
            return false;
        }
        
        this.splay(node);
        
        // Remove root and join subtrees
        const left = this.root.left;
        const right = this.root.right;
        
        if (left) {
            left.parent = null;
            // Find max in left subtree
            let max = left;
            while (max.right) max = max.right;
            this.splay(max);
            max.right = right;
            if (right) right.parent = max;
            this.root = max;
        } else {
            this.root = right;
        }
        
        return true;
    }
    
    inorder() {
        const result = [];
        this._inorderHelper(this.root, result);
        return result;
    }
    
    _inorderHelper(node, result) {
        if (node) {
            this._inorderHelper(node.left, result);
            result.push(node.key);
            this._inorderHelper(node.right, result);
        }
    }
}

// Example usage
const tree = new SplayTree();
[10, 20, 5, 8, 3, 15].forEach(key => {
    tree.insert(key);
    console.log(`Insert ${key}: [${tree.inorder()}]`);
});

console.log(`\nSearch 8: ${tree.search(8)}`);
console.log(`Tree after search: [${tree.inorder()}]`);

tree.delete(10);
console.log(`\nAfter delete 10: [${tree.inorder()}]`);
```

## Comparison with AVL and BST

| Aspect | BST | AVL Tree | Splay Tree |
| Search complexity | O(log n) avg | O(log n) | O(log n) amortized |
| Insert complexity | O(log n) avg | O(log n) | O(log n) amortized |
| Delete complexity | O(log n) avg | O(log n) | O(log n) amortized |
| Worst case | O(n) | O(log n) | O(n) |
| Height balance | None | Strict (|hL-hR| <= 1) | None |
| Rotations | None | 1-2 per op | O(log n) per op |
| Cache locality | Poor | Good | Excellent |
| Frequently accessed | Poor | Poor | Excellent |

## When to Use Splay Trees

**Advantages:**
- Excellent for **temporal locality** (recently accessed items accessed again)
- No balance information to store
- Simple implementation compared to red-black or AVL
- Works well as a generic "online" BST

**Disadvantages:**
- O(n) worst case
- Not suitable for real-time systems requiring guaranteed bounds
- Expensive single operations possible

**Best Use Cases:**
- Cache implementations
- data compression (Huffman coding variants)
- Network routing tables
- Any scenario with skewed access patterns
