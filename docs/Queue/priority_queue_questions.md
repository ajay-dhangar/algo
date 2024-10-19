---
id: priority-queue-questions-in-dsa
title: Priority Queue Questions
sidebar_label: Priority Queue Practice Questions
sidebar_position: 2
description: "A priority queue is an abstract data type similar to a regular queue or stack data structure, but with an added feature that allows each element to have a priority. In a priority queue, elements are served based on their priority rather than their order in the queue."
tags: [dsa, data-structures, PriorityQueue]
---
# Priority Queue Questions

## 1. Implement a Priority Queue using a Min-Heap

### Question:
Implement a priority queue data structure using a min-heap. Your priority queue should support the following operations:
- `insert(value)`: Insert a value into the priority queue.
- `extract_min()`: Remove and return the minimum value from the priority queue.
- `get_min()`: Return the minimum value without removing it from the queue.
- `is_empty()`: Check if the priority queue is empty.

### Explanation:
A priority queue can be efficiently implemented using a min-heap, which allows for fast insertion and retrieval of the minimum element. The min-heap is a complete binary tree where each parent node is less than or equal to its children. This property ensures that the minimum element is always at the root.

- **Insert Operation**: To insert an element, we add it to the end of the heap (maintaining the complete binary tree property) and then "bubble up" to restore the heap property.
- **Extract Min Operation**: To extract the minimum element, we remove the root and replace it with the last element in the heap. Then we "bubble down" this element to restore the heap property.
- **Get Min Operation**: This operation simply returns the root of the heap without modifying it.
- **Is Empty Operation**: This operation checks if the heap has any elements.

---

## 2. Kth Largest Element in a Stream

### Question:
Design a class `KthLargest` that maintains the kth largest element in a stream of integers. It should support the following operations:
- `KthLargest(int k, int[] nums)`: Initialize the object with the integer k and the stream of integers `nums`.
- `add(int val)`: Add the integer `val` to the stream and return the kth largest element.

### Explanation:
To efficiently maintain the kth largest element, we can use a min-heap of size k. The min-heap will store the k largest elements seen so far. 

- When a new element is added:
  - If the size of the heap is less than k, we add the new element.
  - If the size is equal to k and the new element is larger than the root of the heap (the smallest element in the heap), we remove the root and add the new element.
- The root of the heap will always represent the kth largest element.

---

## 3. Merge k Sorted Lists

### Question:
Given an array of `k` sorted linked lists, merge them and return them as one sorted list. Analyze and describe the complexity of your solution.

### Explanation:
This problem can be efficiently solved using a priority queue. We can insert the head of each list into a min-heap and then repeatedly extract the minimum element from the heap to build the final sorted list.

- Initialize a min-heap and add the head of each linked list.
- While the heap is not empty:
  - Extract the minimum element from the heap and add it to the result list.
  - If the extracted element has a next node, insert that next node into the heap.
- This approach ensures that we are always merging the smallest elements from each list first.

### Complexity Analysis:
- **Time Complexity**: O(N log k), where N is the total number of elements across all lists and k is the number of linked lists. Each insertion and extraction operation on the heap takes O(log k) time.
- **Space Complexity**: O(k), since we are storing at most k elements in the heap.

---

## 4. Top K Frequent Elements

### Question:
Given a non-empty array of integers, return the k most frequent elements. You may assume that the answer is unique.

### Explanation:
We can solve this problem using a priority queue by leveraging a min-heap. 

- First, we count the frequency of each element using a hash map.
- Then, we create a min-heap to keep track of the top k frequent elements:
  - For each unique element in the frequency map, we insert it into the heap.
  - If the size of the heap exceeds k, we remove the root (the least frequent element).
- Finally, the heap will contain the k most frequent elements.

### Complexity Analysis:
- **Time Complexity**: O(N log k), where N is the number of elements in the input array. Counting the frequencies takes O(N), and maintaining the heap takes O(log k) for each of the unique elements.
- **Space Complexity**: O(N) for the frequency map, plus O(k) for the heap.

---

## 5. Reorganize String

### Question:
Given a string `s`, rearrange the characters of `s` so that no two adjacent characters are the same. If it is not possible, return an empty string.

### Explanation:
We can use a priority queue to ensure that we always try to place the most frequent characters first.

- Count the frequency of each character using a hash map.
- Insert each character into a max-heap based on its frequency.
- Build the result string by repeatedly extracting the most frequent character from the heap:
  - After placing a character, temporarily store it until we can place it again (to avoid adjacent duplicates).
- If at any point the heap is empty and we still have characters left to place, return an empty string.

### Complexity Analysis:
- **Time Complexity**: O(N log k), where N is the length of the string and k is the number of unique characters.
- **Space Complexity**: O(k) for the frequency map and the heap.

---
