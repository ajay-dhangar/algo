---
id: Heap-data-Structure-1
title: heap data structure
sidebar_label: Heap Operations
sidebar_position: 2
description: Heaps are commonly used to implement priority queues and ensure efficient retrieval of the minimum or maximum element.
tags: [Competitive Programming,top-K,priority queue]
---
# Heap Data Structure Operations Examples

## Example 1: Insert and Peek Operations

- Inserting 40, 60, 20, 10, 50: The heap is reorganized after every insertion to maintain the max heap property.
- Peeking: After the insertions, the maximum element (root) is displayed, which is 60.

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

public:
    // Insert a new element into the heap
    void insert(int value) {
        heap.push_back(value);
        heapifyUp(heap.size() - 1);
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

    // Inserting elements into the heap
    maxHeap.insert(40);
    maxHeap.insert(60);
    maxHeap.insert(20);
    maxHeap.insert(10);
    maxHeap.insert(50);

    // Printing the heap after insertions
    cout << "Heap after insertions: ";
    maxHeap.printHeap();

    // Peeking the maximum element
    cout << "Max element: " << maxHeap.getMax() << endl;

    return 0;
}
```
```
Heap after insertions: 60 50 20 10 40 
Max element: 60
```




## Example 2: Insert, Delete, and Peek Operations

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
        if (heap.size() == 0) throw runtime_error("Heap is empty");
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

    // Inserting elements into the heap
    maxHeap.insert(90);
    maxHeap.insert(30);
    maxHeap.insert(70);
    maxHeap.insert(50);
    maxHeap.insert(20);

    cout << "Heap after insertions: ";
    maxHeap.printHeap();

    // Removing the max element
    maxHeap.removeMax();
    cout << "Heap after removing max: ";
    maxHeap.printHeap();

    // Peeking the new max element
    cout << "Max element after removal: " << maxHeap.getMax() << endl;

    return 0;
}
```

```
Heap after insertions: 90 50 70 30 20 
Heap after removing max: 70 50 20 30 
Max element after removal: 70
```
