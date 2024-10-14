---
id: introduction-to-STL-algorithms
title: STL Algorithms
sidebar_label: STL Algorithms
sidebar_position: 7
description: "STL provides a wide variety of tools that allow C++ developers to write code that is both efficient and reusable. It abstracts away many of the complexities of data structure management and algorithm implementation, making it an essential part of modern C++ programming."
tags: [STL, data-structures, libraries]
---

# Algorithms in C++ STL

The **C++ Standard Template Library (STL)** provides a rich set of algorithms that work on containers. These algorithms are implemented as template functions and can perform a variety of tasks such as searching, sorting, manipulating, and more. The key advantage is that the same algorithm can work with different types of containers.

---

## Categories of Algorithms

Algorithms in STL can be broadly divided into the following categories:

1. **Sorting Algorithms**
2. **Searching Algorithms**
3. **Modifying Algorithms**
4. **Non-Modifying Algorithms**
5. **Partitioning Algorithms**
6. **Set Operations**
7. **Min/Max Operations**
8. **Heap Operations**

---

## 1. Sorting Algorithms

Sorting algorithms rearrange elements in a container in a specific order. The most commonly used sorting algorithm in STL is `sort()`.

### Common Functions:

- **`sort()`**: Sorts a range of elements in ascending order by default.
- **`partial_sort()`**: Sorts the first N elements.
- **`stable_sort()`**: Sorts while preserving the relative order of equivalent elements.
- **`nth_element()`**: Reorders the elements so that the element at the Nth position is in the sorted order.

### Example:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {5, 2, 9, 1, 5, 6};
    
    std::sort(v.begin(), v.end());  // Sort in ascending order
    
    for (int i : v)
        std::cout << i << " ";
    return 0;
}
```


## 2. Searching Algorithms

Searching algorithms help you find elements in a container.

### Common Functions:

- **find()**: Finds an element in a range.
- **binary_search()**: Checks if an element exists in a sorted range.
- **lower_bound()**: Finds the first position where a value can be inserted to maintain sorted order.
- **upper_bound()**: Finds the last position where a value can be inserted to maintain sorted order.


### Example:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    
    // Searching for 30
    if (std::binary_search(v.begin(), v.end(), 30)) {
        std::cout << "30 found!" << std::endl;
    } else {
        std::cout << "30 not found!" << std::endl;
    }
    
    return 0;
}
```

## 3. Modifying Algorithms

These algorithms modify the elements in a container.


### Common Functions:
- **reverse()**: Reverses the order of elements in a range.
- **fill()**: Fills a range with a specific value.
- **replace()**: Replaces certain values in a range with a new value.
- **swap()**: Swaps the values of two variables.

### Example:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    std::reverse(v.begin(), v.end());  // Reverse the vector
    
    for (int i : v)
        std::cout << i << " ";  // Output: 5 4 3 2 1
    
    return 0;
}
```

## 4. Non-Modifying Algorithms

These algorithms do not modify the container but perform specific actions like counting or comparing.

### Common Functions:

- **count()**: Counts the occurrences of a value in a range.
- **equal()**: Checks if two ranges are equal.
- **mismatch()**: Finds the first position where two ranges differ.
- **for_each()**: Applies a function to each element in a range.

### Example:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

void print(int value) {
    std::cout << value << " ";
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Applying a function to each element
    std::for_each(v.begin(), v.end(), print);  // Output: 1 2 3 4 5
    
    return 0;
}

```

## 5. Partitioning Algorithms

Partitioning algorithms divide a range of elements based on a condition.


### Common Functions:

- **partition()**: Reorders the elements such that elements satisfying a condition appear before the others.
- **stable_partition()**: Same as partition() but preserves the relative order of elements.
- **is_partitioned()**: Checks if a range is partitioned based on a condition.

### Example:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

bool isEven(int i) {
    return i % 2 == 0;
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6};
    
    std::partition(v.begin(), v.end(), isEven);  // Partition based on even numbers
    
    for (int i : v)
        std::cout << i << " ";  // Output will show even numbers before odd ones
    
    return 0;
}

```
