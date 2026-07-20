---
title: Linked Lists Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Linked Lists Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What is a Linked List?**
   - A) A collection of elements stored in contiguous memory locations
   - B) A linear data structure where elements (nodes) are connected via pointers/references
   - C) A tree-based structure with parent-child relationships
   - D) A fixed-size data structure that cannot grow or shrink  
   **Answer:** B) A linear data structure where elements (nodes) are connected via pointers/references  
   **Explanation:** A linked list is a linear data structure made up of nodes, where each node holds data plus a reference (pointer) to the next node. Unlike arrays, nodes need not be stored contiguously in memory.

2. **In a Singly Linked List, each node typically contains which of the following?**
   - A) Data and a pointer to the previous node only
   - B) Data and a pointer to the next node only
   - C) Data and pointers to both the next and previous nodes
   - D) Only data, with no pointers  
   **Answer:** B) Data and a pointer to the next node only  
   **Explanation:** A singly linked list node stores its data along with a single pointer ('next') referencing the following node. Traversal is only possible in the forward direction.

3. **What distinguishes a Doubly Linked List from a Singly Linked List?**
   - A) It stores two copies of every value
   - B) Each node has pointers to both the next and the previous node
   - C) It can only be traversed in one direction
   - D) It does not support insertion at the head  
   **Answer:** B) Each node has pointers to both the next and the previous node  
   **Explanation:** A doubly linked list node maintains two pointers — 'next' and 'prev' — allowing traversal in both forward and backward directions, at the cost of extra memory per node.

4. **What is a key characteristic of a Circular Linked List?**
   - A) The last node points to null, just like a normal singly linked list
   - B) The last node points back to the first node, forming a loop
   - C) It can only contain numeric data
   - D) It does not allow traversal at all  
   **Answer:** B) The last node points back to the first node, forming a loop  
   **Explanation:** In a circular linked list, the last node's next pointer references the head node instead of null, forming a continuous loop. This is useful for round-robin scheduling and similar cyclic processes.

5. **What is the time complexity of inserting a node at the head of a singly linked list?**
   - A) O(1)
   - B) O(n)
   - C) O(log n)
   - D) O(n²)  
   **Answer:** A) O(1)  
   **Explanation:** Inserting at the head only requires creating a new node and updating the head pointer to point to it — a constant-time operation that does not depend on the list's size.

6. **What is the time complexity of inserting a node at the tail of a singly linked list when only a head pointer is maintained (no tail pointer)?**
   - A) O(1)
   - B) O(log n)
   - C) O(n)
   - D) O(n log n)  
   **Answer:** C) O(n)  
   **Explanation:** Without a tail pointer, you must traverse the entire list from the head to reach the last node before inserting, which takes O(n) time. Maintaining a tail pointer reduces this to O(1).

7. **Which traversal approach is commonly used to detect a cycle in a linked list?**
   - A) Binary Search
   - B) Floyd's Cycle Detection (Tortoise and Hare)
   - C) Depth First Search
   - D) Dijkstra's Algorithm  
   **Answer:** B) Floyd's Cycle Detection (Tortoise and Hare)  
   **Explanation:** Floyd's algorithm uses two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps). If a cycle exists, the fast pointer eventually meets the slow pointer; otherwise, it reaches null.

8. **What is the time complexity of deleting a node from the middle of a singly linked list, given a direct pointer to that node (not its predecessor)?**
   - A) O(1), always possible regardless of list type
   - B) O(n), since you must search for the predecessor
   - C) Not possible without a predecessor pointer in a singly linked list
   - D) O(log n) using binary search  
   **Answer:** C) Not possible without a predecessor pointer in a singly linked list  
   **Explanation:** In a singly linked list, deleting a node requires updating the predecessor's 'next' pointer. Since you can't traverse backward, you need either the predecessor's reference or must traverse from the head — true O(1) deletion of an arbitrary node isn't directly possible.

9. **What is the space complexity of a linked list containing n nodes, where each node stores one data field and one pointer?**
   - A) O(1)
   - B) O(log n)
   - C) O(n)
   - D) O(n²)  
   **Answer:** C) O(n)  
   **Explanation:** Each node requires a fixed amount of memory (data + pointer), and there are n nodes, so total space scales linearly with the number of elements: O(n).

10. **When reversing a singly linked list iteratively, which three pointers are typically tracked during traversal?**
   - A) head, tail, and mid
   - B) prev, curr, and next
   - C) root, left, and right
   - D) first, second, and third  
   **Answer:** B) prev, curr, and next  
   **Explanation:** Iterative reversal tracks 'prev' (the previously processed node), 'curr' (the node being processed), and 'next' (a temporary reference to curr's original next node) to safely redirect pointers without losing the rest of the list.

11. **What is the primary advantage of a Doubly Linked List over a Singly Linked List when implementing an LRU (Least Recently Used) cache?**
   - A) It uses less memory per node
   - B) It allows O(1) removal of any node given its reference, since the previous node is directly accessible
   - C) It guarantees sorted order automatically
   - D) It prevents memory leaks entirely  
   **Answer:** B) It allows O(1) removal of any node given its reference, since the previous node is directly accessible  
   **Explanation:** LRU caches frequently need to remove arbitrary nodes (e.g., the least recently used one) in O(1) time. A doubly linked list allows direct access to both neighbors of a node, enabling true O(1) removal without traversal — a singly linked list cannot do this without extra bookkeeping.

12. **Given a singly linked list, what is the most space-efficient way to find the middle node in a single pass?**
   - A) Store all nodes in an array, then access the middle index
   - B) Use a hash map to store node positions
   - C) Use the slow/fast pointer technique, where fast moves twice as fast as slow  
   **Answer:** C) Use the slow/fast pointer technique, where fast moves twice as fast as slow  
   **Explanation:** The slow/fast (tortoise and hare) pointer technique advances slow by 1 step and fast by 2 steps per iteration. When fast reaches the end, slow is at the middle — achieved in a single pass with O(1) extra space, unlike array-based or hashmap-based approaches which use O(n) space.

</main>
