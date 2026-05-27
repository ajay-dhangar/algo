---
id: linear-indexing
title: Linear Indexing
sidebar_label: Linear Indexing
sidebar_position: 2
description: Learn how linear indexing works in arrays and strings.
tags: [indexing, arrays, strings, dsa]
---


# Linear Indexing

Linear indexing is the simplest kind of indexing. Items are arranged in a single line, and each item can be reached by its position number.

## Introduction to Linear Indexing

Linear indexing is common in arrays, lists, and strings. It works best when data is stored in order and you want to reach an item directly by its index.

In many languages, linear indexing is zero-based, so the first item is at index `0`.

## Linear Indexing Operations

The main operations are traversal, access, insert, and delete.

| Operation | What it does                     |
| --------- | -------------------------------- |
| Traversal | Visit each item in order         |
| Access    | Read an item at a specific index |
| Insert    | Add a new item at a position     |
| Delete    | Remove an item from a position   |

## Traversal

Traversal means moving through the data from start to end.

### Example in Python

```python
numbers = [5, 10, 15, 20]

for index, value in enumerate(numbers):
    print(index, value)
```

### Example in JavaScript

```javascript
const numbers = [5, 10, 15, 20];

for (let index = 0; index < numbers.length; index++) {
  console.log(index, numbers[index]);
}
```

## Access

Access means reading the value stored at a known index.

### Example in C++

```cpp
#include <iostream>
using namespace std;

int main() {
    int numbers[] = {5, 10, 15, 20};
    cout << numbers[2] << endl; // 15
    return 0;
}
```

Array and string access is usually `O(1)` because the program can calculate the location directly.

## Insert

Inserting into a linear structure often means shifting elements to make space.

If you insert near the front, many items may need to move.

### Example in Python

```python
numbers = [10, 20, 40]
numbers.insert(2, 30)
print(numbers)  # [10, 20, 30, 40]
```

## Delete

Deleting an item also may require shifting later items left to fill the gap.

### Example in JavaScript

```javascript
const numbers = [10, 20, 30, 40];
numbers.splice(1, 1);
console.log(numbers); // [10, 30, 40]
```

## Linear Indexing Properties

- Items are stored in a single order.
- Each item has a position.
- Access by index is simple.
- Traversal is easy to understand.

## Advantages and Limitations

| Advantage            | Limitation                            |
| -------------------- | ------------------------------------- |
| Fast access by index | Insertions can be expensive           |
| Easy traversal       | Deletions can be expensive            |
| Simple to implement  | Not ideal for frequent middle updates |

## Time Complexity

| Operation | Time complexity | Reason                    |
| --------- | --------------- | ------------------------- |
| Access    | `O(1)`          | Direct position lookup    |
| Traversal | `O(n)`          | Each item is visited once |
| Insert    | `O(n)`          | Items may need to shift   |
| Delete    | `O(n)`          | Items may need to shift   |

## Contiguous Memory Concept

Arrays often store values in contiguous memory. That means the items are placed close together, and the program can calculate where a value should be using its index.

This is one reason array access is fast.

## Sequential Access Patterns

Some tasks naturally use sequential access:

- Printing all items in a list
- Checking every character in a string
- Copying values from one array to another

Sequential access is slower than direct access, but it is very useful when you need to examine every item.

## Linear Indexing Implementation

### Python

```python
letters = ["a", "b", "c", "d"]

print(letters[0])
print(letters[3])

for letter in letters:
    print(letter)
```

### JavaScript

```javascript
const word = "algo";

console.log(word[0]); // a
console.log(word[2]); // g

for (let index = 0; index < word.length; index++) {
  console.log(word[index]);
}
```

### C++

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "algo";
    cout << word[0] << endl;
    cout << word[2] << endl;

    for (int index = 0; index < word.length(); index++) {
        cout << word[index] << endl;
    }
    return 0;
}
```
