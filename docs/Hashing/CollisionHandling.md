---
id: collision-handling-in-hashing
sidebar_position: 5
title: Collision Handling in Hashing
sidebar_label: Collision Handling in Hashing
tags: [hashing, data structures]
---

# Collision Handling in Hashing

## Overview
In hashing, collision handling refers to the methods used to resolve the issue when two keys hash to the same index in a hash table. Collisions are inevitable in hash tables due to the limited number of available slots compared to the potentially infinite number of input keys.

## Methods of Collision Handling

### 1. Chaining (Open Hashing)
- Chaining stores multiple elements in the same bucket using a data structure like a linked list.
- When a collision occurs, the new key-value pair is added to the end of the linked list at that index.
- **Advantages**: Simple to implement, no need to resize the hash table.
- **Disadvantages**: Requires extra memory for pointers, performance degrades if many elements collide at the same index.

### 2. Open Addressing (Closed Hashing)
- In open addressing, all elements are stored within the hash table itself, and when a collision occurs, alternative slots are probed to find an empty one.
- Common probing techniques include:
  - **Linear Probing**: Increment the index sequentially until an empty slot is found.
  - **Quadratic Probing**: Probe at quadratic intervals (i.e., 1, 4, 9, ...).
  - **Double Hashing**: Use a second hash function to determine the probe step.
- **Advantages**: No need for extra memory for pointers, can be efficient for smaller tables.
- **Disadvantages**: Can lead to clustering (for linear probing), needs good probing strategies to avoid performance degradation.

## Example: Chaining in Python

```python
class HashTable:
    def __init__(self):
        self.table = [[] for _ in range(10)]  # Hash table with 10 slots

    def insert(self, key, value):
        index = hash(key) % len(self.table)
        for pair in self.table[index]:
            if pair[0] == key:
                pair[1] = value  # Update if key exists
                return
        self.table[index].append([key, value])  # Add new key-value pair

    def search(self, key):
        index = hash(key) % len(self.table)
        for pair in self.table[index]:
            if pair[0] == key:
                return pair[1]
        return None

    def delete(self, key):
        index = hash(key) % len(self.table)
        for i, pair in enumerate(self.table[index]):
            if pair[0] == key:
                del self.table[index][i]
                return

            

# Example usage
hash_table = HashTable()
hash_table.insert('apple', 1)
hash_table.insert('banana', 2)
hash_table.insert('orange', 3)
print(hash_table.search('banana'))  # Output: 2
hash_table.delete('banana')
print(hash_table.search('banana'))  # Output: None

```

