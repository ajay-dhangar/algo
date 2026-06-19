---
title: Deque Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Deque Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What does 'Deque' stand for?**
   - A) Double Queue
   - B) Double-Ended Queue
   - C) Dynamic Queue
   - D) Delayed Queue  
   **Answer:** B) Double-Ended Queue  
   **Explanation:** Deque stands for 'Double-Ended Queue' — a linear data structure that allows insertion and deletion of elements from both the front and the rear ends.

2. **Which operations are typically supported by a Deque?**
   - A) Only enqueue at the rear and dequeue from the front
   - B) Only push and pop from one end, like a stack
   - C) Insertion and deletion from both the front and the rear
   - D) Only random access by index  
   **Answer:** C) Insertion and deletion from both the front and the rear  
   **Explanation:** A deque supports four primary operations: insertFront, insertRear, deleteFront, and deleteRear — giving it the combined flexibility of both a stack and a queue.

3. **Can a Deque be used to implement both a Stack and a Queue?**
   - A) No, a deque can only function as a queue
   - B) No, a deque can only function as a stack
   - C) Yes, because it supports insertion/removal at both ends
   - D) No, a deque is unrelated to stacks and queues  
   **Answer:** C) Yes, because it supports insertion/removal at both ends  
   **Explanation:** Since a deque allows operations at both ends, it can simulate a stack (using only one end for both push and pop) or a queue (inserting at one end, removing from the other).

4. **What is a real-world use case of a Deque?**
   - A) Implementing a sliding window for finding maximums/minimums in subarrays
   - B) Storing key-value pairs for O(1) lookup
   - C) Representing hierarchical parent-child relationships
   - D) Sorting a list of numbers  
   **Answer:** A) Implementing a sliding window for finding maximums/minimums in subarrays  
   **Explanation:** Deques are commonly used in sliding window problems (e.g., finding the maximum in every window of size k) because elements can be efficiently added/removed from both ends as the window slides.

5. **What is the time complexity of inserting or removing an element at either end of a Deque implemented with a doubly linked list?**
   - A) O(n)
   - B) O(log n)
   - C) O(1)
   - D) O(n log n)  
   **Answer:** C) O(1)  
   **Explanation:** When implemented with a doubly linked list (or a circular array/buffer), both ends are directly accessible, allowing insertion and deletion at the front or rear in constant time.

6. **Which of the following is NOT a standard Deque operation?**
   - A) insertFront
   - B) insertRear
   - C) deleteFront
   - D) insertMiddle  
   **Answer:** D) insertMiddle  
   **Explanation:** Standard deque operations are limited to the two ends: insertFront, insertRear, deleteFront, and deleteRear. Inserting at an arbitrary middle position is not a core deque operation and would require O(n) time in most implementations.

7. **In the 'Sliding Window Maximum' problem, why is a Deque preferred over a simple array or stack?**
   - A) It automatically sorts all elements
   - B) It allows efficient removal of elements from both the front (out-of-window) and rear (smaller, useless elements) in O(1) per operation
   - C) It guarantees O(1) search for any value
   - D) It uses less memory than an array  
   **Answer:** B) It allows efficient removal of elements from both the front (out-of-window) and rear (smaller, useless elements) in O(1) per operation  
   **Explanation:** A monotonic deque maintains indices of useful elements. As the window slides, elements that fall out of range are removed from the front, and smaller elements that can never be the maximum are removed from the rear — both in O(1), yielding an overall O(n) algorithm.

8. **What is the main difference between a Deque and a standard Queue in terms of access?**
   - A) A queue allows access from both ends; a deque only allows access from the front
   - B) A deque allows access (insertion/removal) from both ends; a queue only allows insertion at the rear and removal from the front
   - C) There is no difference; they are the same structure
   - D) A queue allows random access; a deque does not  
   **Answer:** B) A deque allows access (insertion/removal) from both ends; a queue only allows insertion at the rear and removal from the front  
   **Explanation:** A standard FIFO queue restricts insertion to the rear and removal to the front. A deque relaxes this restriction, allowing both insertion and removal at either end.

9. **If a Deque is implemented using a fixed-size circular array, what happens when you try to insert into a full deque?**
   - A) The oldest element is automatically overwritten
   - B) It causes an overflow condition that must be explicitly handled
   - C) The array automatically doubles in size with no developer intervention required
   - D) Nothing; circular arrays have unlimited capacity  
   **Answer:** B) It causes an overflow condition that must be explicitly handled  
   **Explanation:** A fixed-size circular array deque has a maximum capacity. Attempting to insert when full results in an overflow condition that the implementation must detect and handle (e.g., by rejecting the insert or resizing if using a dynamic array).

10. **Which data structure choice is most appropriate for implementing an efficient Deque with O(1) amortized insertion/removal at both ends, while also supporting dynamic resizing?**
   - A) A singly linked list with only a head pointer
   - B) A static, fixed-size array
   - C) A doubly linked list, or a dynamic circular array (resizable ring buffer)
   - D) A binary search tree  
   **Answer:** C) A doubly linked list, or a dynamic circular array (resizable ring buffer)  
   **Explanation:** Both a doubly linked list and a dynamic circular array (ring buffer that resizes when full) support O(1) operations at both ends. A doubly linked list avoids resizing overhead but uses more memory per element due to pointers; a dynamic array is more memory-efficient but requires occasional O(n) resizing (amortized O(1)).

11. **How can a Deque be used to implement an efficient algorithm for the 'maximum of all subarrays of size k' problem, and what is its time complexity?**
   - A) By sorting each window — O(n log k)
   - B) By maintaining a monotonically decreasing deque of indices, achieving O(n) overall
   - C) By comparing every pair within the window — O(n·k)
   - D) It cannot be solved using a deque  
   **Answer:** B) By maintaining a monotonically decreasing deque of indices, achieving O(n) overall  
   **Explanation:** The deque stores indices of elements in decreasing order of value. For each new element, pop smaller elements from the rear before pushing (since they can never be the max while the new larger one is in the window), and pop from the front when the index falls outside the window. Each element is pushed and popped at most once, giving O(n) total time.

12. **In a multi-threaded environment, what is a key challenge when using a Deque shared across threads (e.g., as in work-stealing schedulers)?**
   - A) Deques cannot be used in multi-threaded contexts at all
   - B) Ensuring thread-safe concurrent access at both ends, often requiring lock-free or fine-grained locking strategies to avoid contention
   - C) Deques automatically handle all concurrency without any synchronization
   - D) Multi-threading has no effect on deque behavior  
   **Answer:** B) Ensuring thread-safe concurrent access at both ends, often requiring lock-free or fine-grained locking strategies to avoid contention  
   **Explanation:** Work-stealing schedulers use deques where a thread pushes/pops from one end (its own work) while other threads 'steal' work from the opposite end. This requires careful concurrent design — often lock-free algorithms — to prevent race conditions while minimizing contention between the owning thread and stealing threads.

</main>
