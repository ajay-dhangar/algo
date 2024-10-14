---
id: deletion-in-hash-table
sidebar_position: 2
title: Deletion in Hash Table
sidebar_label: Deletion in Hash Table
description: "Deletion involves removing a key-value pair from the hash table using the key."
tags: [hashing, data structures, deletion]
---

## Deletion in Hash Table

The deletion operation in a hash table involves removing a key-value pair using the key. If the key is not present, no operation is performed.

### Steps for Deletion

1. **Hash the Key**: Use a hash function to find the index of the key.
2. **Remove the Key-Value Pair**: Delete the key-value pair from the index if the key exists.
3. **Handle Collision**: Ensure proper handling of collisions if the table uses chaining or open addressing.

### Time Complexity
- **Average Case**: $O(1)$
- **Worst Case**: $O(n)$

### Example Code (Python)

```python
class HashTable:
    def __init__(self):
        self.table = {}

    def delete(self, key):
        if key in self.table:
            del self.table[key]

# Example usage
hash_table = HashTable()
hash_table.table = {'apple': 10, 'banana': 20}
hash_table.delete('apple')
```

### Conclusion

Deletion is essential for maintaining the dynamic nature of a hash table by removing unwanted key-value pairs.
