---
id: deletion-in-hash-table
sidebar_position: 2
title: Deletion in Hash Table
sidebar_label: Deletion in Hash Table
description: "Deletion involves removing a key-value pair from the hash table using the key."
tags: [hashing, data structures, deletion]
---

The deletion operation in a hash table involves removing a key-value pair using the key. If the key is not present, no operation is performed.

### Steps for Deletion

1. **Hash the Key**: Use a hash function to find the index of the key.
2. **Remove the Key-Value Pair**: Delete the key-value pair from the index if the key exists.
3. **Handle Collision**: Ensure proper handling of collisions if the table uses chaining or open addressing.

### Time Complexity
- **Average Case**: $O(1)$
- **Worst Case**: $O(n)$

### Example Code (cpp)

```cpp
#include <iostream>
#include <unordered_map>

class HashTable {
public:
    // Constructor
    HashTable() {}

    // Function to delete a key from the hash table
    void deleteKey(int key) {
        if (table.find(key) != table.end()) {
            table.erase(key);  // Erase the key if it exists
            std::cout << "Key " << key << " deleted.\n";
        } else {
            std::cout << "Key " << key << " not found.\n";
        }
    }

    // Function to insert a key-value pair into the hash table
    void insert(int key, int value) {
        table[key] = value;
    }

    // Function to display the hash table
    void display() {
        for (const auto& pair : table) {
            std::cout << pair.first << ": " << pair.second << std::endl;
        }
    }

private:
    std::unordered_map<int, int> table;  // Hash table using unordered_map
};

int main() {
    HashTable ht;

    ht.insert(1, 100);
    ht.insert(2, 200);
    ht.insert(3, 300);

    std::cout << "Hash Table before deletion:\n";
    ht.display();

    ht.deleteKey(2);  // Deleting key 2

    std::cout << "Hash Table after deletion:\n";
    ht.display();

    return 0;
}
```

### Example Code (java)

```java
import java.util.HashMap;

public class HashTable {
    // HashMap to simulate the hash table
    private HashMap<Integer, Integer> table;

    // Constructor
    public HashTable() {
        table = new HashMap<>();
    }

    // Function to delete a key from the hash table
    public void deleteKey(int key) {
        if (table.containsKey(key)) {
            table.remove(key); // Remove the key if it exists
            System.out.println("Key " + key + " deleted.");
        } else {
            System.out.println("Key " + key + " not found.");
        }
    }

    // Function to insert a key-value pair into the hash table
    public void insert(int key, int value) {
        table.put(key, value);
    }

    // Function to display the hash table
    public void display() {
        for (HashMap.Entry<Integer, Integer> entry : table.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }

    public static void main(String[] args) {
        HashTable ht = new HashTable();

        // Inserting key-value pairs
        ht.insert(1, 100);
        ht.insert(2, 200);
        ht.insert(3, 300);

        // Display hash table before deletion
        System.out.println("Hash Table before deletion:");
        ht.display();

        // Deleting a key
        ht.deleteKey(2);

        // Display hash table after deletion
        System.out.println("Hash Table after deletion:");
        ht.display();
    }
}

# Example usage
hash_table = HashTable()
hash_table.table = {'apple': 10, 'banana': 20}
hash_table.delete('apple')
```

### Example Code (JavaScript)

```javascript
class HashTable {
    constructor() {
        this.table = new Map();
    }

    // Function to delete a key from the hash table
    deleteKey(key) {
        if (this.table.has(key)) {
            this.table.delete(key);  // Erase the key if it exists
            console.log(`Key ${key} deleted.`);
        } else {
            console.log(`Key ${key} not found.`);
        }
    }

    // Function to insert a key-value pair into the hash table
    insert(key, value) {
        this.table.set(key, value);
    }

    // Function to display the hash table
    display() {
        for (const [key, value] of this.table.entries()) {
            console.log(`${key}: ${value}`);
        }
    }
}

// Example usage
const ht = new HashTable();

ht.insert(1, 100);
ht.insert(2, 200);
ht.insert(3, 300);

console.log("Hash Table before deletion:");
ht.display();

ht.deleteKey(2);  // Deleting key 2

console.log("Hash Table after deletion:");
ht.display();
```

### Conclusion

Deletion is essential for maintaining the dynamic nature of a hash table by removing unwanted key-value pairs.
