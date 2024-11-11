---
id: bloom-filter-algorithm
title: Algorithm for Bloom Filters
sidebar_label: Algorithm for Bloom Filters
sidebar_position: 21
description: "Bloom Filters are probabilistic data structures used in applications where space efficiency is crucial, and approximate answers are acceptable, like database caching and network filtering."
tags: [Data Structures, Algorithms, Bloom Filter, Probabilistic Data Structures, Space Efficiency, Membership Testing, False Positives, Hashing, Big Data, Caching, Network Security, Database Optimization, Data Science, Computer Science]
---

# Bloom Filter Algorithm

A Bloom Filter is a probabilistic data structure that enables efficient membership testing. It is used when space is limited, and false positives are acceptable, but false negatives are not.

---

## Inputs

- **Size of Bit Array (`m`)**: Number of bits in the array.
- **Number of Hash Functions (`k`)**: Number of hash functions to use.
- **Bit Array (`bit_array`)**: An array of size `m`, initialized to 0.
- **Hash Functions**: A set of `k` independent hash functions, each generating an index within the range `[0, m-1]`.

---

## Bloom Filter Operations

### 1. Insertion (`add(item)`)

This operation inserts an item by marking specific positions in the bit array based on hashed values.

**Steps**:
1. For each of the `k` hash functions:
   - Hash the `item` to get an index in the bit array.
   - Set the bit at this index in `bit_array` to `1`.

**Pseudocode**:
```python
function add(item):
    for i in 0 to k-1:
        index = hash_function[i](item) % m
        bit_array[index] = 1
```

### 2. Membership Check (`contains(item)`)

This operation checks the item’s membership by verifying specific positions in the bit array. If all relevant bits are set to `1`, the item is likely in the set. If any bit is `0`, the item is definitely not in the set.

**Steps**:
1. For each of the `k` hash functions:
   - Hash the `item` to get an index in the bit array.
   - Check if the bit at this index is `1`.
2. If all checked bits are `1`, return **True** (item is likely in the set).
3. If any bit is `0`, return **False** (item is definitely not in the set).

**Pseudocode**:
```python
function contains(item):
    for i in 0 to k-1:
        index = hash_function[i](item) % m
        if bit_array[index] == 0:
            return False
    return True
```

---

## Example Workflow

1. **Initialize** a Bloom Filter with `m = 10` bits and `k = 3` hash functions.
2. **Insert** an item, `"apple"`:
   - Hash `"apple"` with each of the 3 hash functions.
   - Compute bit array indices for `"apple"` and set those indices to `1` in `bit_array`.
3. **Check Membership** of `"apple"`:
   - Use the hash functions to compute indices for `"apple"` again.
   - If all the indices are set to `1`, then `"apple"` is likely in the set. If any index is `0`, `"apple"` is definitely not in the set.
