---
id: skip-list
title: Skip List Data Structure
sidebar_label: Skip List
sidebar_position: 3
description: A comprehensive guide to Skip List, a probabilistic data structure that provides O(log n) search, insertion, and deletion.
tags: [dsa, data-structures, skip-list, balanced-trees, probabilistic]
difficulty: Medium
---

## Introduction

A **Skip List** is a probabilistic data structure that allows for efficient search, insertion, and deletion operations. It is built upon a sorted linked list but adds multiple layers of express lanes to skip over large portions of the data.

The key idea is simple: instead of having a single linked list, we maintain multiple layers of linked lists where each higher layer skips more elements than the layer below it.

## Why Skip List?

Balanced binary search trees (AVL, Red-Black) provide O(log n) operations but are complex to implement correctly. Skip Lists provide the same O(log n) complexity with:
- Simpler implementation
- Easier to understand
- No rebalancing operations needed
- Easier to implement concurrent access

## Structure

```
Level 3:  HEAD ----> NULL (very sparse)
Level 2:  HEAD ----> 40 ----> NULL
Level 1:  HEAD ----> 10 ----> 30 ----> 40 ----> 70 ----> NULL
Level 0:  HEAD ----> 5 ----> 10 ----> 20 ----> 30 ----> 40 ----> 50 ----> 70 ----> 80 ----> NULL
```

Each node has a variable number of forward pointers (levels). Higher levels allow us to "skip" more elements.

## Node Structure

```c
struct SkipListNode {
    int key;
    int value;
    SkipListNode** forward;  // Array of forward pointers
    int level;               // Number of levels in this node
};
```

## Implementation in C

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_LEVEL 16
#define PROBABILITY 0.5

typedef struct SkipListNode {
    int key;
    int value;
    struct SkipListNode** forward;
    int level;
} SkipListNode;

typedef struct SkipList {
    SkipListNode* header;
    int level;
    int count;
} SkipList;

SkipListNode* create_node(int key, int value, int level) {
    SkipListNode* node = (SkipListNode*)malloc(sizeof(SkipListNode));
    node->key = key;
    node->value = value;
    node->level = level;
    node->forward = (SkipListNode**)malloc(sizeof(SkipListNode*) * (level + 1));
    for (int i = 0; i <= level; i++) {
        node->forward[i] = NULL;
    }
    return node;
}

SkipList* create_skip_list() {
    SkipList* list = (SkipList*)malloc(sizeof(SkipList));
    list->header = create_node(-1, -1, MAX_LEVEL);
    list->level = 0;
    list->count = 0;
    return list;
}

int random_level() {
    int level = 0;
    while (rand() < RAND_MAX * PROBABILITY && level < MAX_LEVEL - 1) {
        level++;
    }
    return level;
}

SkipListNode* search(SkipList* list, int key) {
    SkipListNode* current = list->header;
    for (int i = list->level; i >= 0; i--) {
        while (current->forward[i] && current->forward[i]->key < key) {
            current = current->forward[i];
        }
    }
    current = current->forward[0];
    if (current && current->key == key) {
        return current;
    }
    return NULL;
}

void insert(SkipList* list, int key, int value) {
    SkipListNode* update[MAX_LEVEL + 1];
    SkipListNode* current = list->header;

    for (int i = list->level; i >= 0; i--) {
        while (current->forward[i] && current->forward[i]->key < key) {
            current = current->forward[i];
        }
        update[i] = current;
    }
    current = current->forward[0];

    if (current == NULL || current->key != key) {
        int rlevel = random_level();
        if (rlevel > list->level) {
            for (int i = list->level + 1; i <= rlevel; i++) {
                update[i] = list->header;
            }
            list->level = rlevel;
        }
        SkipListNode* new_node = create_node(key, value, rlevel);
        for (int i = 0; i <= rlevel; i++) {
            new_node->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = new_node;
        }
        list->count++;
    }
}

int delete(SkipList* list, int key) {
    SkipListNode* update[MAX_LEVEL + 1];
    SkipListNode* current = list->header;

    for (int i = list->level; i >= 0; i--) {
        while (current->forward[i] && current->forward[i]->key < key) {
            current = current->forward[i];
        }
        update[i] = current;
    }
    current = current->forward[0];

    if (current && current->key == key) {
        for (int i = 0; i <= list->level; i++) {
            if (update[i]->forward[i] != current) break;
            update[i]->forward[i] = current->forward[i];
        }
        free(current->forward);
        free(current);
        while (list->level > 0 && list->header->forward[list->level] == NULL) {
            list->level--;
        }
        list->count--;
        return 1;
    }
    return 0;
}
```

## Implementation in Python

```python
import random

class SkipListNode:
    __slots__ = ['key', 'value', 'forward']

    def __init__(self, key, value, level):
        self.key = key
        self.value = value
        self.forward = [None] * (level + 1)

class SkipList:
    MAX_LEVEL = 16
    P = 0.5

    def __init__(self):
        self.header = SkipListNode(-1, -1, self.MAX_LEVEL)
        self.level = 0

    def _random_level(self):
        level = 0
        while random.random() < self.P and level < self.MAX_LEVEL - 1:
            level += 1
        return level

    def search(self, key):
        current = self.header
        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].key < key:
                current = current.forward[i]
        current = current.forward[0]
        if current and current.key == key:
            return current.value
        return None

    def insert(self, key, value):
        update = [None] * (self.MAX_LEVEL + 1)
        current = self.header
        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].key < key:
                current = current.forward[i]
            update[i] = current

        current = current.forward[0]
        if current is None or current.key != key:
            rlevel = self._random_level()
            if rlevel > self.level:
                for i in range(self.level + 1, rlevel + 1):
                    update[i] = self.header
                self.level = rlevel
            new_node = SkipListNode(key, value, rlevel)
            for i in range(rlevel + 1):
                new_node.forward[i] = update[i].forward[i]
                update[i].forward[i] = new_node

    def delete(self, key):
        update = [None] * (self.MAX_LEVEL + 1)
        current = self.header
        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].key < key:
                current = current.forward[i]
            update[i] = current

        current = current.forward[0]
        if current and current.key == key:
            for i in range(self.level + 1):
                if update[i].forward[i] != current:
                    break
                update[i].forward[i] = current.forward[i]
            while self.level > 0 and self.header.forward[self.level] is None:
                self.level -= 1
            return True
        return False
```

## Complexity Analysis

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search | O(log n) | O(n) |
| Insertion | O(log n) | O(n) |
| Deletion | O(log n) | O(n) |
| Space | O(n) | O(n log n) |

The O(log n) average complexity comes from the geometric distribution of levels, which gives a height of O(log n) with high probability.

## Comparison with Balanced BSTs

| Feature | Skip List | Red-Black Tree |
|---------|-----------|----------------|
| Search | O(log n) | O(log n) |
| Insert/Delete | O(log n) | O(log n) |
| Implementation | Simple | Complex |
| Rebalancing | None | Rotations |
| Memory | Higher | Lower |
| Concurrent Access | Easier | Harder |

## Practice Problems

1. Implement a Skip List with a get method that returns the value for a key.
2. Add a range query method that returns all elements in a given range.
3. Implement level-order traversal of a Skip List.
4. Compare the actual performance of Skip List vs sorted array on random access operations.

