---
id: b-tree-deletion
title: "B-Tree Deletion"
sidebar_label: "B-Tree Deletion"
sidebar_position: 3
description: "A comprehensive guide to deleting keys from a B-Tree, covering leaf deletion, internal node deletion, borrowing from siblings, and node merging."
tags: ["dsa", "data-structures", "trees", "b-tree"]
---

# B-Tree Deletion

## Overview

Deleting a key from a B-Tree is more complex than insertion because we must maintain the minimum degree `t` constraint (each node except root must have at least `t-1` keys) while also ensuring the tree remains balanced.

## Key Concepts

- **Minimum degree `t`**: Each node (except root) must have at least `t-1` keys
- **Maximum keys**: Each node can have at most `2t-1` keys
- **Internal nodes**: Must have at least `t` children
- **Leaf nodes**: Must have at least `t-1` keys

## The 4 Cases of B-Tree Deletion

### Case 1: Key is in a Leaf Node

Simple deletion if the leaf has more than the minimum keys:

```
delete(leaf, k):
    if leaf.keys > t - 1:
        remove k from leaf  # Simple case
    else:
        # Must maintain minimum - borrow or merge
```

### Case 2: Key is in an Internal Node

Three sub-cases when deleting from internal node:

**Case 2a**: Left child has more than minimum keys
- Replace key with predecessor (largest key in left subtree)
- Recursively delete predecessor

**Case 2b**: Right child has more than minimum keys
- Replace key with successor (smallest key in right subtree)
- Recursively delete successor

**Case 2c**: Both children have minimum keys
- Merge left and right children with key
- Delete key from merged node

### Case 3: Key is in an Internal Node but Children Have Minimum Keys

Before deleting from an internal node, ensure children have extra keys:

**Borrow from Left Sibling**:
```
Before:              After:
[3 | 5 | 7]    ->    [3 | 5 | 7]
  ↓                ↓
[left(1,2)]        [left(1)] [right(8)]
     ↓                 ↓
   [4]              [2,4,8]
```

**Borrow from Right Sibling**:
```
Before:              After:
[3 | 5 | 7]    ->    [3 | 5 | 7]
  ↓                ↓
[right(8,9)]       [right] [left(1,2)]
   ↓                 ↓
   [6]              [1,6,8]
```

### Case 4: Merge with Siblings

When both siblings have minimum keys:
```
Before:                    After:
[5]                      [5]
  ↓ ↓                       ↓
[1,2] [3,4]      ->       [1,2,3,4]
```

## Step-by-Step Deletion Example

Consider a B-Tree with minimum degree t=3 (each node has 2-5 keys, 3-6 children):

```
Initial B-Tree:
                    [15 | 20 | 25]
                   /    |    |    \
           [5|10]  [17|18]  [21|22|23]  [28|30|35]
```

### Deleting 21 (Case 1: Leaf with extra keys)

```
After deleting 21:
                    [15 | 20 | 25]
                   /    |    |    \
           [5|10]  [17|18]  [22|23]  [28|30|35]
```

### Deleting 20 (Case 2a: Internal node, left child has extra)

```
Find predecessor from left subtree, replace 20 with 18:
                    [15 | 18 | 25]
                   /    |    |    \
           [5|10]  [17]   [22|23]  [28|30|35]
```

### Deleting 18 (Case 3: Must borrow)

```
Before:                  After borrowing:
[15 | 18 | 25]    ->      [15 | 25]
  ↓   ↓                   ↓   ↓
[17] [22|23]            [17|20] [22|23]
```

## Python Implementation

```python
class BTreeNode:
    """B-Tree node for minimum degree t."""
    
    def __init__(self, leaf: bool = True):
        self.leaf = leaf
        self.keys = []  # List of keys
        self.children = []  # List of child nodes
        self.t = 2  # Minimum degree (default)
    
    def search(self, key):
        """Search for key in subtree rooted at this node."""
        i = 0
        while i < len(self.keys) and key > self.keys[i]:
            i += 1
        
        if i < len(self.keys) and self.keys[i] == key:
            return (self, i)  # Found
        
        if self.leaf:
            return None  # Not found in leaf
        
        return self.children[i].search(key)
    
    def find_key(self, key):
        """Return index of first key >= k, or len(keys) if not found."""
        idx = 0
        while idx < len(self.keys) and self.keys[idx] < key:
            idx += 1
        return idx
    
    def insert_not_full(self, key):
        """Insert key into non-full node."""
        i = len(self.keys) - 1
        
        if self.leaf:
            # Insert into sorted position in leaf
            self.keys.append(None)
            while i >= 0 and self.keys[i] > key:
                self.keys[i + 1] = self.keys[i]
                i -= 1
            self.keys[i + 1] = key
        else:
            # Find child to descend to
            while i >= 0 and self.keys[i] > key:
                i -= 1
            i += 1
            
            if self.children[i].len(self.children[i].keys) == 2 * self.t - 1:
                self.split_child(i, self.children[i])
                if self.keys[i] < key:
                    i += 1
            
            self.children[i].insert_not_full(key)
    
    def split_child(self, i, y):
        """Split full child y into two nodes."""
        t = self.t
        z = BTreeNode(y.leaf)
        z.keys = y.keys[t:]  # Last t-1 keys go to new node
        
        if not y.leaf:
            z.children = y.children[t:]
        
        # y keeps first t-1 keys
        y.keys = y.keys[:t - 1]
        if not y.leaf:
            y.children = y.children[:t]
        
        # Insert new node into children list
        self.children.insert(i + 1, z)
        
        # Insert median key to this node
        self.keys.insert(i, y.keys.pop())
    
    def remove(self, key):
        """
        Remove key from subtree rooted at this node.
        Maintains B-Tree properties during deletion.
        """
        t = self.t
        idx = self.find_key(key)
        
        # Key is in this node
        if idx < len(self.keys) and self.keys[idx] == key:
            if self.leaf:
                # Case 1: Key in leaf - simple delete
                self.keys.pop(idx)
            else:
                # Case 2: Key in internal node
                self._remove_internal(idx)
        else:
            # Key might be in subtree
            if self.leaf:
                return  # Key not in tree
            
            # Check if child has minimum keys
            child_idx = idx if idx < len(self.keys) and self.keys[idx] > key else idx
            child = self.children[child_idx]
            
            if len(child.keys) < t:
                # Case 3: Child has minimum - need to fix
                self._fix_child(child_idx)
                # After fixing, child might have moved
                if idx < len(self.keys) and self.keys[idx] == key:
                    # Re-evaluate position
                    if self.leaf:
                        self.keys.pop(idx)
                    else:
                        self._remove_internal(idx)
                else:
                    # Recurse into correct child
                    child = self.children[min(child_idx, len(self.children) - 1)]
                    child.remove(key)
            else:
                child.remove(key)
    
    def _remove_internal(self, idx):
        """Remove key at index idx from internal node."""
        t = self.t
        key = self.keys[idx]
        left_child = self.children[idx]
        right_child = self.children[idx + 1]
        
        if len(left_child.keys) >= t:
            # Case 2a: Left child has > t-1 keys
            # Replace with predecessor
            pred_key = left_child._get_pred()
            self.keys[idx] = pred_key
            left_child.remove(pred_key)
        elif len(right_child.keys) >= t:
            # Case 2b: Right child has > t-1 keys
            # Replace with successor
            succ_key = right_child._get_succ()
            self.keys[idx] = succ_key
            right_child.remove(succ_key)
        else:
            # Case 2c: Both children have t-1 keys
            # Merge key and right child into left child
            left_child.keys.append(key)
            left_child.keys.extend(right_child.keys)
            left_child.children.extend(right_child.children)
            
            self.keys.pop(idx)
            self.children.pop(idx + 1)
            
            left_child.remove(key)
    
    def _get_pred(self):
        """Get predecessor (largest key in left subtree)."""
        node = self
        while not node.leaf:
            node = node.children[-1]
        return node.keys[-1]
    
    def _get_succ(self):
        """Get successor (smallest key in right subtree)."""
        node = self
        while not node.leaf:
            node = node.children[0]
        return node.keys[0]
    
    def _fix_child(self, idx):
        """
        Ensure child at idx has at least t keys.
        Cases:
        - Borrow from left sibling
        - Borrow from right sibling
        - Merge with a sibling
        """
        t = self.t
        
        if idx > 0 and len(self.children[idx - 1].keys) >= t:
            # Borrow from left sibling
            self._borrow_from_left(idx)
        elif idx < len(self.children) - 1 and len(self.children[idx + 1].keys) >= t:
            # Borrow from right sibling
            self._borrow_from_right(idx)
        else:
            # Merge with a sibling
            if idx > 0:
                self._merge(idx - 1)
            else:
                self._merge(idx)
    
    def _borrow_from_left(self, idx):
        """Borrow key from left sibling."""
        child = self.children[idx]
        sibling = self.children[idx - 1]
        
        # Move key from parent down to child
        child.keys.insert(0, self.keys[idx - 1])
        
        # Move largest key from sibling up to parent
        self.keys[idx - 1] = sibling.keys.pop()
        
        if not child.leaf:
            child.children.insert(0, sibling.children.pop())
    
    def _borrow_from_right(self, idx):
        """Borrow key from right sibling."""
        child = self.children[idx]
        sibling = self.children[idx + 1]
        
        # Move key from parent down to child
        child.keys.append(self.keys[idx])
        
        # Move smallest key from sibling up to parent
        self.keys[idx] = sibling.keys.pop(0)
        
        if not child.leaf:
            child.children.append(sibling.children.pop(0))
    
    def _merge(self, idx):
        """Merge child idx+1 into child idx."""
        t = self.t
        child = self.children[idx]
        sibling = self.children[idx + 1]
        
        # Move key from parent down
        child.keys.append(self.keys.pop(idx))
        
        # Move all keys and children from sibling
        child.keys.extend(sibling.keys)
        child.children.extend(sibling.children)
        
        # Remove sibling
        self.children.pop(idx + 1)


class BTree:
    """B-Tree data structure."""
    
    def __init__(self, t=2):
        self.root = BTreeNode(leaf=True)
        self.t = t
    
    def insert(self, key):
        root = self.root
        if len(root.keys) == 2 * self.t - 1:
            new_root = BTreeNode(leaf=False)
            new_root.children.append(self.root)
            new_root.split_child(0, self.root)
            self.root = new_root
        self.root.insert_not_full(key)
    
    def delete(self, key):
        if not self.root:
            return
        self.root.remove(key)
        if len(self.root.keys) == 0:
            if self.root.leaf:
                self.root = None
            else:
                self.root = self.root.children[0]
    
    def search(self, key):
        return self.root.search(key) if self.root else None


# Example usage
if __name__ == "__main__":
    btree = BTree(t=2)  # Minimum degree 2: 1-3 keys per node
    
    # Insert keys
    keys = [10, 20, 5, 6, 12, 30, 7, 17]
    for key in keys:
        btree.insert(key)
        print(f"Inserted {key}")
    
    # Search
    result = btree.search(12)
    print(f"\nSearch 12: {'Found' if result else 'Not Found'}")
    
    result = btree.search(15)
    print(f"Search 15: {'Found' if result else 'Not Found'}")
    
    # Delete keys
    for key in [6, 12, 7]:
        btree.delete(key)
        print(f"Deleted {key}")
```

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|-------------------|
| Search | O(log n) | O(1) |
| Insert | O(log n) | O(log n) |
| Delete | O(log n) | O(log n) |

## Deletion Algorithm Summary

```
delete(key):
    if node is leaf:
        if node has > t-1 keys: Case 1 - simple delete
        else: Case 3 - fix before delete
    else:
        if key in node:
            if left child has >= t keys: Case 2a
            elif right child has >= t keys: Case 2b
            else: Case 2c - merge children
        else:
            descend to child
            if child has t-1 keys: Case 3 - fix
            recurse
```

## Visual Summary of Cases

```
Case 1: Simple leaf deletion          Case 2a/2b: Replace with pred/succ
[5, 10, 15] → remove 10 → [5, 15]     [5, |10|, 15] → [5, |12|, 15] → [12]
                                              ↓
                                           [8, 11]  [14]

Case 3: Borrow/Lend                    Case 4: Merge
Parent: [3, |5|, 8]                   Parent: [3, |5|, 8]
Left: [1,2]    Right: [6,7]           Left: [1]    Right: [6,7]
→ Borrow 3: [2, |5|, 8]              → Merge: [1, 3, 6, 7]
  [1,2,3]   [6,7]                      [1, 3, 6, 7]
```
