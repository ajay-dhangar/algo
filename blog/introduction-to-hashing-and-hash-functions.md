---
slug: introduction-to-hashing-and-hash-functions
title: "Introduction to Hashing and Hash Functions"
authors: [Harshitha-Grandhi]
tags: [Harshitha-Grandhi, algo, dsa, algorithms, hashing]
---

Hashing is a fundamental concept in computer science, used to efficiently store and retrieve data. By converting data into a fixed-size numerical value, hash functions enable rapid data access. This blog post will introduce hashing, explore how hash functions work, and discuss their applications in computer science.

<!-- truncate -->

In this blog, we'll cover:

- **What is Hashing?**: A basic understanding of hashing and its purpose.
- **Hash Functions**: How they work and their key properties.
- **Hashing Techniques**: Different types of hashing methods.
- **Applications of Hashing**: Practical use cases in algorithms and systems.
- **Implementation**: Code examples in Python and Java.
- **Real-World Examples**: How hashing is applied in real-life scenarios.

---

## What is Hashing?

Hashing is a technique that maps data of arbitrary size to a fixed size, typically using a hash function. The goal is to assign a unique "hash code" to each data item, enabling quick access to that item within a collection.

### Hashing Example:

Consider a phone book. Instead of searching through all names to find a specific number, we could use a hash function to directly map names to their respective entries, making retrieval faster.

## Hash Functions

A hash function takes input data and returns a fixed-size string or integer, commonly known as a hash code. A good hash function has the following properties:

1. **Deterministic**: The same input always produces the same output.
2. **Efficient**: It computes hash codes quickly.
3. **Uniform Distribution**: It distributes hash values evenly, minimizing collisions.
4. **Low Collision Probability**: Different inputs should rarely produce the same hash code.

### Common Hash Functions

- **Division Method**: Uses modulo operation, `h(x) = x % m`.
- **Multiplication Method**: Uses a constant to multiply and extract part of the result.
- **Universal Hashing**: Combines multiple functions to reduce collision risk.

## Hashing Techniques

### 1. Separate Chaining

Separate chaining handles collisions by storing multiple items in each bucket as a linked list:

```python
class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def insert(self, key, value):
        hash_key = hash(key) % self.size
        self.table[hash_key].append((key, value))

    def get(self, key):
        hash_key = hash(key) % self.size
        for k, v in self.table[hash_key]:
            if k == key:
                return v
        return None
      
```  
### 2. Open Addressing
Open addressing resolves collisions by finding another empty slot in the table.

Linear Probing
Increment by one until an empty slot is found.

python
Copy code
def linear_probe_insert(table, key, value):
    index = hash(key) % len(table)
    while table[index] is not None:
        index = (index + 1) % len(table)
    table[index] = (key, value)
Applications of Hashing
Application	Description	Example Use Case
Caching	Store computed results for reuse	Web page caching
Data Deduplication	Identify and remove duplicate data	File storage optimization
Cryptography	Protect data through hashing	Password storage
Code Implementation
Python Implementation:
python
Copy code
# Simple Hash Table Example using Separate Chaining

```python
class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def insert(self, key, value):
        hash_key = hash(key) % self.size
        self.table[hash_key].append((key, value))

    def get(self, key):
        hash_key = hash(key) % self.size
        for k, v in self.table[hash_key]:
            if k == key:
                return v
        return None

```
# Example usage
hash_table = HashTable(10)
hash_table.insert("name", "Alice")
print(hash_table.get("name"))  # Output: Alice

## Java Implementation:

```java
import java.util.LinkedList;

public class HashTable {
    private LinkedList<Entry>[] table;

    public HashTable(int size) {
        table = new LinkedList[size];
        for (int i = 0; i < size; i++) {
            table[i] = new LinkedList<>();
        }
    }

    private int getHashKey(String key) {
        return key.hashCode() % table.length;
    }

    public void insert(String key, String value) {
        int hashKey = getHashKey(key);
        table[hashKey].add(new Entry(key, value));
    }

    public String get(String key) {
        int hashKey = getHashKey(key);
        for (Entry entry : table[hashKey]) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
        }
        return null;
    }

    private static class Entry {
        String key;
        String value;

        Entry(String key, String value) {
            this.key = key;
            this.value = value;
        }
    }

    public static void main(String[] args) {
        HashTable ht = new HashTable(10);
        ht.insert("name", "Alice");
        System.out.println(ht.get("name"));  // Output: Alice
    }
}

```
## Real-World Examples
Hashing is widely used in various fields, including:
-**Databases**: Quick retrieval of rows via primary keys.
-**Networking**: Routing packets using hash-based IP lookup.
-**Blockchain**: Cryptographic hashing for securing transactions.

## Conclusion
Hashing and hash functions are vital in computer science, offering efficient ways to store and retrieve data. By understanding and implementing these techniques, you can solve various algorithmic challenges more effectively, especially in areas where quick access to data is crucial.