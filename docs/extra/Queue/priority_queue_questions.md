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

## 6. Median in a Stream

### Question:
Design a data structure that supports the following operations efficiently:
- `add_num(int num)`: Adds an integer `num` from a data stream to the data structure.
- `find_median()`: Returns the median of all elements so far.

### Explanation:
To find the median in a stream, we can use two heaps:
- A **max-heap** to store the smaller half of the elements.
- A **min-heap** to store the larger half of the elements.

By maintaining this balance:
- If the total number of elements is odd, the max-heap will have one more element than the min-heap, making it the median.
- If the total number of elements is even, the median is the average of the roots of both heaps.

### Complexity Analysis:
- **Time Complexity**: O(log n) for `add_num` due to heap insertion and balancing, O(1) for `find_median`.
- **Space Complexity**: O(n) to store all the elements.

---

## 7. Find the Running Median

### Question:
Given a stream of integers, find the median of the integers at each insertion point. For example, if the stream is `[5, 15, 1, 3]`, the running medians are `[5, 10, 5, 4]`.

### Explanation:
We can solve this problem similarly to the "Median in a Stream" problem, using two heaps:
- A max-heap for the lower half.
- A min-heap for the upper half.

At each insertion, we rebalance the heaps to ensure that the difference in sizes between the two heaps is no more than one, and calculate the median accordingly:
- If both heaps are balanced in size, the median is the average of the roots of both heaps.
- If one heap has more elements, the median is the root of that heap.

### Complexity Analysis:
- **Time Complexity**: O(log n) for each insertion due to heap operations.
- **Space Complexity**: O(n) for storing all elements in the heaps.

---

## 8. Task Scheduler

### Question:
Given a list of tasks and a positive integer `n` representing the cooldown period between the same tasks, find the minimum time required to complete all tasks.

### Explanation:
To solve this problem, we can use a priority queue to manage the cooldown period:
- Count the frequency of each task.
- Use a max-heap to execute tasks in the order of their frequencies.
- Use a queue to keep track of tasks during their cooldown period.

At each time unit:
- If a task is ready to be executed after cooldown, reinsert it into the heap.
- Repeat until all tasks are executed, and track the time.

### Complexity Analysis:
- **Time Complexity**: O(n log k) where n is the total number of tasks, and k is the number of unique tasks.
- **Space Complexity**: O(k) for the heap and queue.

---

## 9. Connect Ropes to Minimize Cost

### Question:
Given an array of integers representing the lengths of ropes, connect them such that the cost to connect ropes is minimized. The cost of connecting two ropes is equal to the sum of their lengths.

### Explanation:
To minimize the cost, use a min-heap:
- Insert all rope lengths into the min-heap.
- While there are more than one rope in the heap:
  - Extract the two smallest ropes.
  - Calculate the cost to combine them.
  - Add the combined rope back into the heap.
- Repeat until only one rope remains.

The sum of all combination costs will be the minimum cost.

### Complexity Analysis:
- **Time Complexity**: O(n log n) due to heap operations.
- **Space Complexity**: O(n) for the heap.

---

## 10. Find K Closest Points to the Origin

### Question:
Given an array of points in a 2D plane, return the `k` closest points to the origin `(0, 0)`.

### Explanation:
We can use a max-heap to keep track of the k closest points:
- Compute the Euclidean distance of each point from the origin.
- Use a max-heap of size `k` to store the points with their distances.
- If a new point is closer than the farthest point in the heap, remove the farthest point and add the new one.
- At the end, the heap will contain the k closest points.

### Complexity Analysis:
- **Time Complexity**: O(n log k) for maintaining the heap.
- **Space Complexity**: O(k) for the heap.

---

## 11. Find the Skyline of a City

### Question:
Given the `buildings` array where each building is represented as `[left, right, height]`, find the skyline formed by these buildings.

### Explanation:
To solve this, use a priority queue to maintain active building heights as we sweep from left to right through all critical points (both start and end of buildings):
- Store active heights in a max-heap.
- At each critical point, add or remove heights as buildings start or end.
- Record changes in the maximum height, which forms the critical points of the skyline.

### Complexity Analysis:
- **Time Complexity**: O(n log n) due to sorting and heap operations.
- **Space Complexity**: O(n) for the heap.

---
