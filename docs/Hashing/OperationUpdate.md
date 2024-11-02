---
id: update-in-hash-table
sidebar_position: 4
title: Update in Hash Table
sidebar_label: Update in Hash Table
description: "Update involves modifying the value associated with an existing key in the hash table."
tags: [hashing, data structures, update]
---

## Update in Hash Table

The update operation involves modifying the value associated with an existing key in a hash table. If the key is not present, it may require an insertion.

### Steps for Update

1. **Hash the Key**: Use a hash function to find the index.
2. **Update the Value**: Modify the value associated with the key if it exists.
3. **Handle Key Absence**: If the key does not exist, you can choose to insert it instead.

### Time Complexity
- **Average Case**: $O(1)$
- **Worst Case**: $O(n)$

### Example Code (Python)

```python
class HashTable:
    def __init__(self):
        self.table = {}

    def update(self, key, value):
        self.table[key] = value

# Example usage
hash_table = HashTable()
hash_table.table = {'apple': 10, 'banana': 20}
hash_table.update('apple', 30)  # Updates value
```

### Example Code (Javascript)

```javascript
class HashTable {
    constructor() {
        this.table = {};
    }

    update(key, value) {
        this.table[key] = value;
    }
}

// Example usage
const hashTable = new HashTable();
hashTable.table = { 'apple': 10, 'banana': 20 };
hashTable.update('apple', 30);  // Updates the value for 'apple'
console.log(hashTable.table);    // Output: { 'apple': 30, 'banana': 20 }
```

### Conclusion

Update is critical for modifying data in hash tables, making them adaptable and suitable for dynamic applications.
