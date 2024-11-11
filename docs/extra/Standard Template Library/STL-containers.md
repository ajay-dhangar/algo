---
id: introduction-to-STL-containers
title: STL containers
sidebar_label: STL containers
sidebar_position: 7
description: "STL provides a wide variety of tools that allow C++ developers to write code that is both efficient and reusable. It abstracts away many of the complexities of data structure management and algorithm implementation, making it an essential part of modern C++ programming."
tags: [STL, data-structures, libraries]
---

STL (Standard Template Library) containers are data structures that store collections of objects. STL containers are designed to be flexible, efficient, and consistent. They can store a variety of types and provide a range of operations to manipulate their contents.

### Types of STL Containers

1. **Sequence Containers**: Maintain elements in a specific sequence (order).
   - **Examples**: `vector`, `list`, `deque`, `array`, `forward_list`.

2. **Associative Containers**: Store elements in sorted order (by key) and allow fast retrieval using keys.
   - **Examples**: `set`, `multiset`, `map`, `multimap`.

3. **Unordered Associative Containers**: Do not maintain any particular order, but allow fast retrieval based on hash tables.
   - **Examples**: `unordered_set`, `unordered_map`, `unordered_multiset`, `unordered_multimap`.

4. **Container Adapters**: Provide a different interface to existing containers.
   - **Examples**: `stack`, `queue`, `priority_queue`.

---

### 1. **Sequence Containers**

#### a. **`vector`**:
- A dynamic array that can grow in size. It supports random access and is highly efficient for element access and insertion/removal at the end.
  
```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4};
    vec.push_back(5);  // Add element at the end

    for (int i : vec)
        std::cout << i << " ";  // Output: 1 2 3 4 5
}
```
**Key operations**:
- `push_back()`, `pop_back()`, `[]` (random access), `size()`, `clear()`.

---

#### b. **`list`**:
- A doubly linked list where elements are stored in nodes that contain pointers to the previous and next elements.
  
```cpp
#include <iostream>
#include <list>

int main() {
    std::list<int> lst = {1, 2, 3};
    lst.push_back(4);
    lst.push_front(0);  // Add element at the front

    for (int i : lst)
        std::cout << i << " ";  // Output: 0 1 2 3 4
}
```
**Key operations**:
- `push_front()`, `push_back()`, `pop_front()`, `pop_back()`, `insert()`, `erase()`.

---

#### c. **`deque`** (Double-ended Queue):
- Supports fast insertion/removal at both ends but slower access in the middle.

```cpp
#include <iostream>
#include <deque>

int main() {
    std::deque<int> dq = {2, 3};
    dq.push_front(1);
    dq.push_back(4);

    for (int i : dq)
        std::cout << i << " ";  // Output: 1 2 3 4
}
```
**Key operations**:
- `push_front()`, `push_back()`, `pop_front()`, `pop_back()`, `[]` (random access).

---

### 2. **Associative Containers**

#### a. **`set`**:
- Stores unique elements in sorted order. It allows fast lookup, insertion, and deletion.
  
```cpp
#include <iostream>
#include <set>

int main() {
    std::set<int> s = {3, 1, 4, 2};
    s.insert(5);  // Add element

    for (int i : s)
        std::cout << i << " ";  // Output: 1 2 3 4 5 (sorted order)
}
```
**Key operations**:
- `insert()`, `find()`, `erase()`, `count()`.

---

#### b. **`map`**:
- Stores key-value pairs where each key is unique and the keys are ordered.

```cpp
#include <iostream>
#include <map>

int main() {
    std::map<int, std::string> m;
    m[1] = "one";
    m[2] = "two";

    for (const auto &p : m)
        std::cout << p.first << ": " << p.second << std::endl;
    // Output:
    // 1: one
    // 2: two
}
```
**Key operations**:
- `operator[]`, `insert()`, `find()`, `erase()`, `count()`.

---

### 3. **Unordered Associative Containers**

#### a. **`unordered_set`**:
- Similar to `set`, but the elements are stored in an unordered fashion (using hash tables for fast lookup).

```cpp
#include <iostream>
#include <unordered_set>

int main() {
    std::unordered_set<int> us = {1, 3, 5};
    us.insert(4);

    for (int i : us)
        std::cout << i << " ";  // Output order may vary: 1 3 5 4
}
```
**Key operations**:
- `insert()`, `find()`, `erase()`, `count()`.

---

#### b. **`unordered_map`**:
- Stores key-value pairs but without any specific order. Uses a hash table for fast key-based lookups.

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> um;
    um[1] = "one";
    um[2] = "two";

    for (const auto &p : um)
        std::cout << p.first << ": " << p.second << std::endl;
    // Output order may vary
}
```
**Key operations**:
- `operator[]`, `insert()`, `find()`, `erase()`, `count()`.

---

### 4. **Container Adapters**

#### a. **`stack`**:
- A LIFO (Last In, First Out) data structure that allows pushing and popping elements from the top.

```cpp
#include <iostream>
#include <stack>

int main() {
    std::stack<int> st;
    st.push(1);
    st.push(2);
    st.push(3);

    while (!st.empty()) {
        std::cout << st.top() << " ";  // Output: 3 2 1
        st.pop();
    }
}
```
**Key operations**:
- `push()`, `pop()`, `top()`, `empty()`.

---

#### b. **`queue`**:
- A FIFO (First In, First Out) data structure where elements are added to the back and removed from the front.

```cpp
#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);

    while (!q.empty()) {
        std::cout << q.front() << " ";  // Output: 1 2 3
        q.pop();
    }
}
```
**Key operations**:
- `push()`, `pop()`, `front()`, `back()`, `empty()`.

---

#### c. **`priority_queue`**:
- A specialized queue where elements are stored based on their priority (by default, highest first).

```cpp
#include <iostream>
#include <queue>

int main() {
    std::priority_queue<int> pq;
    pq.push(10);
    pq.push(20);
    pq.push(5);

    while (!pq.empty()) {
        std::cout << pq.top() << " ";  // Output: 20 10 5
        pq.pop();
    }
}
```
**Key operations**:
- `push()`, `pop()`, `top()`, `empty()`.

---

### Conclusion

STL containers offer flexibility and efficiency for a wide range of tasks. They abstract away low-level details of memory management and algorithm implementation, providing a uniform and convenient interface to handle data.