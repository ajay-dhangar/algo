---
id: introduction-to-STL-Iterators
title: STL Iterators
sidebar_label: STL Iterators
sidebar_position: 7
description: "STL provides a wide variety of tools that allow C++ developers to write code that is both efficient and reusable. It abstracts away many of the complexities of data structure management and algorithm implementation, making it an essential part of modern C++ programming."
tags: [STL, data-structures, libraries]
---

STL (Standard Template Library) iterators in C++ act as generalized pointers that allow traversal and manipulation of elements in STL containers such as vectors, lists, sets, and maps. Iterators provide an abstraction for traversing containers, without exposing the underlying structure of the container.

### Types of Iterators

1. **Input Iterator**: Used for reading data from a container sequentially. It only allows one-way traversal (from beginning to end).
   - Example: `std::istream_iterator<int>`, reading integers from input.

2. **Output Iterator**: Used for writing data to a container sequentially. It also allows one-way traversal but only for output.
   - Example: `std::ostream_iterator<int>`, writing integers to output.

3. **Forward Iterator**: A more versatile version of the input iterator. It allows reading and writing of data. It can traverse a container in a single direction (forward).
   - Example: `std::forward_list<int>::iterator`.

4. **Bidirectional Iterator**: Extends the functionality of forward iterators by allowing traversal in both directions (forward and backward).
   - Example: `std::list<int>::iterator`.

5. **Random Access Iterator**: The most powerful type of iterator, allowing direct access to any element using arithmetic operations (like array subscripting). It can traverse both forward and backward.
   - Example: `std::vector<int>::iterator`.

---

### Common Operations on Iterators

1. **Dereferencing**: Access the element pointed to by the iterator.
   ```cpp
   std::vector<int> vec = {1, 2, 3, 4, 5};
   std::vector<int>::iterator it = vec.begin();
   std::cout << *it;  // Outputs 1
   ```

2. **Incrementing**: Move the iterator to the next element.
   ```cpp
   ++it;  // Move to the second element (2)
   std::cout << *it;  // Outputs 2
   ```

3. **Decrementing (for bidirectional and random access iterators)**: Move the iterator to the previous element.
   ```cpp
   --it;  // Move back to the first element
   std::cout << *it;  // Outputs 1
   ```

4. **Arithmetic (for random access iterators)**: Directly move the iterator forward or backward by a specified number of positions.
   ```cpp
   it += 2;  // Move two steps forward
   std::cout << *it;  // Outputs 3
   ```

---

### Example: Iterating over a `vector` with an iterator
```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::vector<int>::iterator it;

    // Iterate through the vector using iterator
    for (it = vec.begin(); it != vec.end(); ++it) {
        std::cout << *it << " ";  // Dereference iterator to access value
    }
    return 0;
}
```
**Output**: `1 2 3 4 5`

### Example: Using Random Access Iterator
```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {10, 20, 30, 40, 50};
    std::vector<int>::iterator it = vec.begin();

    std::cout << *(it + 2) << std::endl;  // Random access to the third element
    it += 3;
    std::cout << *it << std::endl;        // Now points to the fourth element

    return 0;
}
```
**Output**:
```
30
40
```

### Key Points

- **Iterator Invalidation**: Be cautious when modifying a container (e.g., inserting or deleting elements) as this can invalidate iterators, leading to undefined behavior.
- **Container-Specific Iterators**: Each STL container provides its own iterator type, like `std::vector::iterator` for vectors, `std::list::iterator` for lists, and so on.
- **`const_iterator`**: If you need read-only access, use `const_iterator`, which prevents modification of the elements.
