# Data Structures Challenge 4 with Solutions 

## Question 1
**What is the hash function used in the division method:**  
A) h(k) = k/m
B) h(k) = k mod m
C) h(k) = m/k
D) h(k) = m mod k

**Answer:** D) h(k) = m mod k
**Explanation:** A graph is a non-linear data structure where elements (nodes) are connected by edges, allowing for more complex relationships compared to linear structures like arrays, stacks, and queues.

---

## Question 2
**Associative arrays can be implemented using:**  
A) B-tree
B)A doubly linked list
C) A single linked list
D) A self-balancing binary search tree

**Answer:** D) A self-balancing binary search tree
**Explanation:** Associative arrays can be implemented using self-balancing binary search trees like AVL trees or Red-Black trees.

---

## Question 3
**What makes selection sorting different from other sorting techniques:**  
A) It requires no additional storage space
B) It is scalable
C)It works best for already-sorted inputs
D)It is faster than any other sorting technique

**Answer:** A) It requires no additional storage space
**Explanation:** Selection sort is an in-place comparison sort algorithm. In-place sorting algorithms rearrange the elements within the array that is to be sorted, without using any additional space or memory.

---

## Question 4
**Which of the following is not an application of binary search?**  
**Options:**  
A) To find the lower/upper bound in an ordered sequence
B) Union of intervals
C) Debugging
D) To search in an unordered list

**Answer:** D) To search in an unordered list
**Explanation:** Binary Search is a searching algorithm that searches for an element's position in a sorted array only.

---

## Question 5
**The total number of comparisons in a bubble sort is:**  
**Options:**  
A) n(n-1)/2
B) 2n
C) n^2
D) n^3

**Answer:** C) n^2
**Explanation:** The bubble sort algorithm repeatedly compares the adjacent elements, from left to right, and swaps them if they are out-of-order.

---

## Question 6
**What is the main advantage of using a linked list over an array?**  
**Options:**  
A) Faster access time  
B) Dynamic size  
C) Better memory utilization  
D) Simplicity  

**Answer:** B) Dynamic size  
**Explanation:** Linked lists can grow or shrink in size dynamically, while arrays have a fixed size.

---

## Question 7
**What would be the color of a newly created node while inserting a new element in a Red-black tree?**  
**Options:**  
A) Black, if the new node is not a root node 
B) Red, if the new node is not a root node
C) Black, if the new node is a root node
D) Both b and c 

**Answer:** D) Both b and c 
**Explanation:** If the newly created node is a root node, then it will be Black; otherwise, it will be Red

---

## Question 8
**Which one of the following algorithms does not return the optimal solution?**  
**Options:**  
A)Dynamic Programming
B) Backtracking
C) Branch and Bound
D) Greedy Method

**Answer:** B) Backtracking

**Explanation:**  Backtracking solves the problem recursively and removes the solution if it does not satisfy the constraints of a problem. Whenever a solution fails we trace back to the failure point, build on the next solution, and continue this process till we find the solution or all possible solutions are looked after.

---

## Question 9
**In a priority queue, insertion and deletion takes place at:**  
**Options:**  
A) front, rear end
B) only at the rear end
C)only at the front end
D) any position

**Answer:** D) any position
**Explanation:** In-order, pre-order, and post-order traversals can all be used to visit nodes in a binary tree, each yielding different ordering of visits.

---

## Question 10
**O(n) means computing time is**  
**Options:**  
A) Constant
B) Quadratic
C) Linear
D) Cubic

**Answer:** C) Linear

**Explanation:** This characteristic allows for efficient searching, insertion, and deletion in binary search trees.

---

## Question 11
**Which of the following is not an application of binary search?**  
**Options:**  
A) To find the lower/upper bound in an ordered sequence
B)Union of intervals
C) Debugging
D) To search in an unordered list

**Answer:** D) To search in an unordered list

**Explanation:** Binary Search is a searching algorithm that searches for an element's position in a sorted array only.

---

## Question 12
**Which of the following cases does not exist in complexity theory?**  
**Options:**  
A) O(0)  
B) O(log n)  
C) O(n)  
D) O(n log n)  

**Answer:** A) O(0)  
**Explanation:** A) O(0) is not any time complexity

---

## Question 13
**Which of the following applications uses a circular linked list?**  
**Options:**  
A) Recursive function calls
B)Undo operation in a text editor
C) Implement Hash Tables
D) Allocating CPU to resources
 

**Answer:** D) Allocating CPU to resources 
**Explanation:** Round Robin is employed to allocate CPU time to resources using the circular linked list data structure.

---

## Question 14
**Which data structure can be used to detect a cycle in a graph?**  
**Options:**  
A) Queue  
B) Stack  
C) Array  
D) Hash Table  

**Answer:** B) Stack  
**Explanation:** A stack can be used in depth-first search (DFS) to detect cycles in a graph by keeping track of visited nodes.

---

## Question 15
**What's the worst-case scenario in a linear search algorithm?**  
**Options:**  
A)The element is somewhere in the middle of the array 
B) The element is not present in the array
C) The element is the last in the array
D)Either the element is the last in the array or is not there
 

**Answer:** D) Either the element is the last in the array or is not there

**Explanation:** worst case means Either the element is the last in the array or is not there

---

## Question 16
**Which of the following is not a balanced binary tree?**  
**Options:**  
A) Splay tree  
B) B-tree
C) AVL tree
D) Red-black tree

**Answer:** B) Implementing dictionaries  
**Explanation:** B-Tree is a self-balancing tree where a node can have more than two children

---

## Question 17
**Which of the following is not a type of queue?**  
**Options:**  
A) Priority queue
B) Circular queue
C) Single-ended queue
D) Ordinary queue

**Answer:** B) Circular queue
**Explanation:** A queue is an ordered list in which insertion is done at one end and deletion at another.



---

## Question 18
**The time complexity of the dequeue operation in a queue is:**  
**Options:**  
A) O(1)  
B) O(n)  
C) O(n log n)  
D) O(log n)  

**Answer:** 1) O(1)  
**Explanation:** The dequeue operation involves removing the front element and updating the front pointer.

---

## Question 19
**How will you increment the rear end in a circular queue**  
A) rear =rear+1
B) (rear+1) % max 
C) (rear % max) + 1
D) None of the above  

**Answer:** B) (rear+1) % max 
**Explanation:** The rear value will be from 0 to max-1. max is the total size of the circular queue. rear + 1 moves the rear pointer to the next position. (rear+1) % max will point to the first position in the queue maintaining the circular nature.

---

## Question 20
**Which of the following traversal methods will give you nodes of a binary tree in ascending order?**  
**Options:**  
A) Pre-order  
B) Post-order  
C) In-order  
D) Level-order  

**Answer:** C) In-order  
**Explanation:** In-order traversal of a binary search tree visits nodes in ascending order.

---

## Question 21
**What would be the time complexity to find an element in the linked list?**  
**Options:**  
A) O(1)
B)  O(n)
C)  O(n^2)
D) O(n^4)  

**Answer:** B)  O(n) 
**Explanation:**  If the element is at the end of the linked list, we have to traverse through all the linked list elements.

---

## Question 22
**In a binary tree, what is the maximum number of nodes at level `l`?**  
**Options:**  
A) 2^l  
B) 2^(l-1)  
C) l^2  
D) l  

**Answer:** A) 2^l  
**Explanation:** The maximum number of nodes at level `l` in a binary tree is 2^l, where the root is considered at level 0.

---

## Question 23
**What is the time complexity of searching for an element in a balanced binary search tree?**  
**Options:**  
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n log n)  

**Answer:** B) O(log n)  
**Explanation:** Searching in a balanced binary search tree is efficient, with a time complexity of O(log n).

---

## Question 24
**The data structure used to check whether an expression contains a balanced parenthesis is?**  
**Options:**  
A) Queue  
B) Stack  
C) Array  
D) Hash Table  

**Answer:** B) Stack  
**Explanation:** Stack works according to the LIFO principle. Open parenthesis are pushed into the stack, and closed parenthesis pop out elements until the top element of the stack is its corresponding open parenthesis. If the stack is empty, the parenthesis are balanced.

---

## Question 25
**Which sorting algorithm can sort a random linked list with minimum time complexity?**  
**Options:**  
A)Insertion Sort
B) Quick Sort
C)Heap Sort
D) Merge Sort
