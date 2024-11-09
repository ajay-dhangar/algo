---
id: search-in-hash-table
sidebar_position: 3
title: Search in Hash Table
sidebar_label: Search in Hash Table
description: "Search involves retrieving the value associated with a given key in the hash table."
tags: [hashing, data structures, search]
---

## Search in Hash Table

The search operation involves retrieving the value associated with a key in a hash table. Hashing ensures efficient lookups based on the key.

### Steps for Search

1. **Hash the Key**: Use the hash function to determine the index.
2. **Check for Key**: If the key exists at the computed index, return the corresponding value.
3. **Handle Collision**: Properly handle cases where multiple keys map to the same index.

### Time Complexity
- **Average Case**: $O(1)$
- **Worst Case**: $O(n)$

### Example Code (Python)

```python
class HashTable:
    def __init__(self):
        self.table = {}

    def search(self, key):
        return self.table.get(key, None)

# Example usage
hash_table = HashTable()
hash_table.table = {'apple': 10, 'banana': 20}
print(hash_table.search('apple'))  # Output: 10
```
### Example Code (JavaScript)

```javascript
class HashTable {
    constructor() {
        this.table = {};
    }

    // Method to search for a key in the hash table
    search(key) {
        return this.table.hasOwnProperty(key) ? this.table[key] : null;
    }
}

// Example usage
const hashTable = new HashTable();
hashTable.table = { apple: 10, banana: 20 };
console.log(hashTable.search('apple'));  // Output: 10
```


### Conclusion

Search is one of the primary operations in a hash table, allowing fast retrieval of data associated with a key.
