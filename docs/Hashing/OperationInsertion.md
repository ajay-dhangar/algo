---
id: insertion-in-hash-table
sidebar_position: 1
title: Insertion in Hash Table
sidebar_label: Insertion in Hash Table
description: "Insertion involves adding a key-value pair to the hash table. If the key already exists, it may update the existing value."
tags: [hashing, data structures, insertion]
---

## Insertion in Hash Table

The insertion operation in a hash table involves adding a key-value pair. Hashing is used to map the key to an index in the table. If the key already exists, the existing value can be updated.

### Steps for Insertion

1. **Hash the Key**: Use a hash function to convert the key into an index.
2. **Insert at the Computed Index**: Place the key-value pair at the index. If there's already data, resolve collisions via methods like chaining or open addressing.
3. **Update Value (if Key Exists)**: If the key already exists, update the associated value.

### Time Complexity
- **Average Case**: $O(1)$
- **Worst Case**: $O(n)$ (if many collisions occur)

### Example Code (Python)

```python
class HashTable:
    def __init__(self):
        self.table = {}

    def insert(self, key, value):
        self.table[key] = value

# Example usage
hash_table = HashTable()
hash_table.insert('apple', 10)
hash_table.insert('banana', 20)
hash_table.insert('apple', 30)  # Updates value
```

### Conclusion

Insertion is a fundamental operation in hash tables, allowing for efficient data storage and retrieval, especially when handling key-value pairs.
