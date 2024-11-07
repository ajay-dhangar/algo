---
id: Heap-data-Structure-2
title: heap data structure
sidebar_label: Heap Basics
sidebar_position: 2
description: Heaps are commonly used to implement priority queues and ensure efficient retrieval of the minimum or maximum element.
tags: [Competitive Programming,top-K,priority queue]
---
# Heap Data Structure

A **Heap** is a specialized tree-based data structure that satisfies the **Heap Property**. Heaps are commonly used to implement priority queues and ensure efficient retrieval of the minimum or maximum element.


## Introduction

A **Heap** is a complete binary tree, which means every level is fully filled except possibly the last level, which is filled from left to right. The heap is used to efficiently manage a priority queue, allowing us to retrieve the highest or lowest priority element in constant time.

Heaps can be represented as arrays, which helps in reducing the space complexity by avoiding pointers.

## Types of Heaps

### Max Heap

In a **Max Heap**, for every node `i`, the value of `i` is greater than or equal to the values of its children. Therefore, the root of the tree contains the maximum element.
```

       50
      /  \
    30    20
   /  \   / 
 15   10  8
```


### Min Heap

In a **Min Heap**, for every node `i`, the value of `i` is less than or equal to the values of its children. The root contains the minimum element.
```
       10
      /  \
     15   30
    /  \   / 
   50   20  40
```

## Heap Operations

### Insert

Inserting an element in a heap involves adding the new element at the end of the tree (or array representation) and then "bubbling up" to restore the heap property.

1. Insert the element at the next available position.
2. Compare the element with its parent and swap if necessary (heapify up).

### Delete

The element to be deleted is usually the root (for priority queues). The last element of the heap replaces the root, and the heap property is restored by "bubbling down" (heapify down).

1. Replace the root with the last element.
2. Restore the heap property by moving the element down (heapify down).

### Peek

The **peek** operation returns the root element of the heap without removing it:
- For a **Max Heap**, this returns the maximum element.
- For a **Min Heap**, this returns the minimum element.

### Heapify

Heapifying ensures that a subtree satisfies the heap property. Two types of heapify operations are:
- **Heapify Up**: Used in insertion.
- **Heapify Down**: Used in deletion.

## Applications

- **Priority Queue**: Used in scheduling processes, graph algorithms (like Dijkstra's shortest path).
- **Heap Sort**: Sorting algorithm using heaps.
- **Graph Algorithms**: Like Prim's and Dijkstra's shortest path algorithms.
- **Median Maintenance**: Heaps can be used to keep track of the median in a dynamic dataset.

## Time Complexity

- **Insertion**: $O(log n)$
- **Deletion**: $O(log n)$
- **Peek**: $O(1)$
- **Heapify**: $O(log n)$

## Implementation

### C++ Code Example

Here’s a C++ implementation of a Max Heap:

```cpp
#include <iostream>
#include <vector>

using namespace std;

class MaxHeap {
    vector<int> heap;

    // Heapify up to restore the heap property after insertion
    void heapifyUp(int index) {
        if (index == 0) return;
        int parentIndex = (index - 1) / 2;
        if (heap[parentIndex] < heap[index]) {
            swap(heap[parentIndex], heap[index]);
            heapifyUp(parentIndex);
        }
    }

    // Heapify down to restore the heap property after deletion
    void heapifyDown(int index) {
        int leftChild = 2 * index + 1;
        int rightChild = 2 * index + 2;
        int largest = index;

        if (leftChild < heap.size() && heap[leftChild] > heap[largest]) {
            largest = leftChild;
        }

        if (rightChild < heap.size() && heap[rightChild] > heap[largest]) {
            largest = rightChild;
        }

        if (largest != index) {
            swap(heap[index], heap[largest]);
            heapifyDown(largest);
        }
    }

public:
    // Insert a new element into the heap
    void insert(int value) {
        heap.push_back(value);
        heapifyUp(heap.size() - 1);
    }

    // Remove the maximum element from the heap
    void removeMax() {
        if (heap.size() == 0) return;
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
    }

    // Peek the maximum element (root)
    int getMax() {
        if (heap.size() == 0) throw runtime_error("Heap is empty");
        return heap[0];
    }

    // Print heap elements
    void printHeap() {
        for (int val : heap) {
            cout << val << " ";
        }
        cout << endl;
    }
};

int main() {
    MaxHeap maxHeap;

    maxHeap.insert(50);
    maxHeap.insert(30);
    maxHeap.insert(20);
    maxHeap.insert(15);
    maxHeap.insert(10);
    maxHeap.insert(8);

    cout << "Heap after insertions: ";
    maxHeap.printHeap();

    cout << "Max element: " << maxHeap.getMax() << endl;

    maxHeap.removeMax();
    cout << "Heap after removing max: ";
    maxHeap.printHeap();

    return 0;
}
```
