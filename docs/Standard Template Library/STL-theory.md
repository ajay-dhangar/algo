---
id: introduction-to-STL
title: Standard Template Library
sidebar_label: Standard Template Library
sidebar_position: 7
description: "STL provides a wide variety of tools that allow C++ developers to write code that is both efficient and reusable. It abstracts away many of the complexities of data structure management and algorithm implementation, making it an essential part of modern C++ programming."
tags: [STL, data-structures, libraries]
---

# C++ Standard Template Library (STL)

The **Standard Template Library (STL)** in C++ is a powerful set of template classes that provide general-purpose, reusable functions and data structures. It is a collection of well-optimized tools that allow developers to manage data structures and algorithms efficiently.

---

## Components of STL

The STL is divided into three main components:

1. **Containers**
2. **Algorithms**
3. **Iterators**

---

## 1. Containers

Containers are objects that store collections of elements. STL containers can be classified into three types:

### a. Sequence Containers

These containers store elements in a linear sequence. The most common sequence containers are:

- **`vector`**: Dynamic array that can resize automatically.
- **`deque`**: Double-ended queue that allows fast insertions and deletions at both ends.
- **`list`**: Doubly linked list that allows fast insertions and deletions anywhere.

### b. Associative Containers

Associative containers store elements formed by a combination of a key and a value. They are implemented using balanced binary trees.

- **`set`**: Stores unique elements in a sorted manner.
- **`multiset`**: Like a `set` but allows duplicate elements.
- **`map`**: Stores key-value pairs, where each key is unique.
- **`multimap`**: Like a `map`, but allows duplicate keys.

### c. Container Adaptors

These containers provide a different interface for underlying sequence containers:

- **`stack`**: Follows the LIFO (Last In First Out) principle.
- **`queue`**: Follows the FIFO (First In First Out) principle.
- **`priority_queue`**: Provides a sorted queue, where the largest element is always at the top.

---

## 2. Algorithms

STL provides a set of common algorithms like searching, sorting, modifying, etc. that work with containers. These algorithms are implemented as function templates, which makes them reusable for any container type.

### Common Algorithms:

- **Sorting**: `sort()`, `partial_sort()`
- **Searching**: `binary_search()`, `find()`
- **Modifying**: `reverse()`, `fill()`, `replace()`
- **Partitioning**: `partition()`, `stable_partition()`
- **Merging**: `merge()`, `inplace_merge()`

### Example:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {4, 2, 8, 1, 5};

    // Sorting the vector
    std::sort(v.begin(), v.end());

    // Printing the sorted vector
    for (int i : v)
        std::cout << i << " ";

    return 0;
}
```

## 3. Iterators

Iterators are used to point to elements in a container. They work similarly to pointers and provide the means to traverse through elements stored in containers.

Types of Iterators:

- **Input Iterator**: Used for reading data from a container.
- **Output Iterator**: Used for writing data into a container.
- **Forward Iterator**: Can only move forward.
- **Bidirectional Iterator**: Can move both forward and backward.
- **Random Access Iterator**: Can access any element in constant time.

### Example:

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};

    // Declaring an iterator
    std::vector<int>::iterator it;

    // Traversing the vector using the iterator
    for (it = v.begin(); it != v.end(); ++it)
        std::cout << *it << " ";

    return 0;
}

```
