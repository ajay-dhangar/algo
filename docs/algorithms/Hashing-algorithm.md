---
id: hashing-algorithm
title: Hashing Algorithm
sidebar_label: Hashing Algorithm
sidebar_position: 8
description: "Hashing is a technique used to uniquely identify a specific object from a group of similar objects. It involves mapping large data to fixed-size values."
tags: [Data Structures, Hashing, Hash Functions, Hash Tables, Algorithms]
---

# Hashing Theory

## Overview
**Hashing** is a widely used technique in computer science for mapping large data of variable length into smaller, fixed-size values. This process is performed using a **hash function** that converts data (like strings or integers) into a hash value, typically an integer. Hashing is fundamental in **hash tables**, a popular data structure used in algorithms for fast data retrieval, insertion, and deletion.

## Introduction
At the core of hashing is the **hash function**, which transforms input data into a hash value. This value corresponds to a location in a **hash table** where the actual data is stored. Hashing is efficient for operations such as **lookup**, **insert**, and **delete**, making it crucial in areas like databases, caches, and cryptography.

## Characteristics of Hashing Theory
- **Efficiency**: Provides constant-time complexity, O(1), for data retrieval, insertion, and deletion in an average-case scenario.
- **Collision Handling**: When two distinct inputs produce the same hash value, collisions occur, which are handled using techniques such as **chaining** and **open addressing**.
- **Deterministic**: The same input will always yield the same hash value for a given hash function.

## How Hashing Works
1. **Input Data**: Hash functions take an input (e.g., a string, integer, or object).
2. **Apply Hash Function**: The input is processed through a hash function that generates a hash value.
3. **Store in Hash Table**: The generated hash value determines the index in the hash table where the original data is stored.
4. **Handle Collisions**: If two inputs produce the same hash value (collision), methods like chaining or probing are used to resolve them.

## Common Hash Functions
- **Division Method**: The hash value is obtained by taking the remainder of the division of the input by the hash table size: `h(x) = x % table_size`.
- **Multiplication Method**: Uses a constant multiplier `A` to generate the hash value: `h(x) = floor(table_size * (x * A % 1))`.
- **Cryptographic Hash Functions**: Secure hash functions like **SHA-256** or **MD5** are used in cryptography for data integrity and security.


### Example Hash Function
```python
def hash_function(key, table_size):
    return key % table_size
```
## Time Complexity

Hashing provides efficient time complexity for common operations on average. However, the complexity can vary based on the collision handling method and the distribution of hash values.

### Time Complexity Overview
- **Search, Insert, Delete (Average Case)**: O(1)
    - Hashing provides constant-time operations for inserting, searching, and deleting elements in a hash table due to direct indexing.
- **Search, Insert, Delete (Worst Case)**: O(n)
    - In the worst case, where there are many collisions (e.g., all elements hash to the same index), the hash table can degrade into a linked list or chain, and the time complexity becomes O(n), where `n` is the number of elements.

### Collision Handling Methods and Complexity

1. **Chaining**:
   - **Average Case**: O(1) for search, insert, and delete operations, assuming the hash function distributes elements evenly.
   - **Worst Case**: O(n), where all elements are placed in the same linked list due to collisions.
   
2. **Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)**:
   - **Average Case**: O(1) for search, insert, and delete.
   - **Worst Case**: O(n), where the table is nearly full, and many collisions occur, requiring multiple probes to find an empty slot.

### Space Complexity
- The space complexity of a hash table is O(n), where `n` is the number of elements stored.
- Additional space may be required for collision handling:
  - **Chaining**: Requires extra space for linked lists.
  - **Open Addressing**: No additional space is required, but the load factor of the hash table must be managed to prevent excessive collisions.

## Conclusion

Hashing is an essential technique in computer science that allows for fast and efficient data retrieval, making it a key component in various applications like caching, databases, and cryptography. By converting data into a fixed-size hash code, hashing enables constant time complexity for search, insert, and delete operations on average. However, its efficiency depends on selecting an appropriate hash function and collision resolution strategy. With proper implementation, hashing can significantly optimize performance in systems that require rapid access to large datasets.


