# Data Structures Challenge 2 Solutions 

## Question 1
** What is a data structure?**  
**Options:**  
a)A programming language
b) A collection of algorithms
c) A way to store and organize data
d) A type of computer hardware

**Answer:**c) A way to store and organize data
**Explanation:** A data structure is a way to store and organize data efficiently, enhancing access and manipulation, unlike programming languages, algorithms, or computer hardware.

---

## Question 2
**What are the disadvantages of arrays?**  
**Options:**  
a)Index value of an array can be negative
b) Elements are sequentially accessed
c) Data structure like queue or stack cannot be implemented
d) There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size

**Answer:**d)There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size
**Explanation:** Arrays are of fixed size. If we insert elements less than the allocated size, unoccupied positions can’t be used again. Wastage will occur in memory.

---

## Question 3
**Which data structure is used for implementing recursion?**  
**Options:**  
a) Stack
b) Queue
c) List
d) Array

**Answer:** A)stack

**Explanation:** Stacks are used for the implementation of Recursion.

---

## Question 4
**The data structure required to check whether an expression contains a balanced parenthesis is?:**  
**Options:**  
a) Queue
b) Stack
c) Tree
d) Array

**Answer:** B) stack

**Explanation:** The stack is a simple data structure in which elements are added and removed based on the LIFO principle. Open parenthesis is pushed into the stack and a closed parenthesis pops out elements till the top element of the stack is its corresponding open parenthesis. If the stack is empty, parenthesis is balanced otherwise it is unbalanced.

---

## Question 5
**Which of the following is not the application of stack?**  
**Options:**  
a) Data Transfer between two asynchronous process
b) Compiler Syntax Analyzer
c) Tracking of local variables at run time
d) A parentheses balancing program

**Answer:** a)Data Transfer between two asynchronous process

**Explanation:**Data transfer between the two asynchronous process uses the queue data structure for synchronisation. The rest are all stack applications.k until it completes.

---

## Question 6
**Which data structure is needed to convert infix notation to postfix notation?**  
**Options:**  
a) Tree
b) Branch
c) Stack
d) Queue

**Answer:** c)stack

**Explanation:** The Stack data structure is used to convert infix expression to postfix expression. The purpose of stack is to reverse the order of the operators in the expression. It also serves as a storage structure, as no operator can be printed until both of its operands have appeared.

---

## Question 7
**What is the value of the postfix expression 6 3 2 4 + – *?**  
**Options:**  
a) 74
b) -18
c) 22
d) 40

**Answer:** b) -18
**Explanation:** Postfix Expression is (6*(3-(2+4))) which results -18 as output.

---

## Question 8
**What data structure would you mostly likely see in non recursive implementation of a recursive algorithm?**  
**Options:**  
a) Stack
b) Linked List
c) Tree
d) Queue

**Answer:**a) Stack

**Explanation:**In recursive algorithms, the order in which the recursive process comes back is the reverse of the order in which it goes forward during execution. The compiler uses the stack data structure to implement recursion. In the forwarding phase, the values of local variables, parameters and the return address are pushed into the stack at each recursion level. In the backing-out phase, the stacked address is popped and used to execute the rest of the code.
---

## Question 9
**Which of the following statement(s) about stack data structure is/are NOT correct?**  
**Options:**  
a) Top of the Stack always contain the new node
b) Stack is the FIFO data structure
c) Null link is present in the last node at the bottom of the stack
d) Linked List are used for implementing Stacks 

**Answer:**Answer: b

**Explanation:** Stack follows LIFO.
---

## Question 10
**The data structure required for Breadth First Traversal on a graph is?**  
**Options:**  
a) Array
b) Stack
c) Tree
d) Queue 

**Answer:** d) Queue 

**Explanation:** In Breadth First Search Traversal, BFS, starting vertex is first taken and adjacent vertices which are unvisited are also taken. Again, the first vertex which was added as an unvisited adjacent vertex list will be considered to add further unvisited vertices of the graph. To get the first unvisited vertex we need to follows First In First Out principle. Queue uses FIFO principle.

---

## Question 11
**The prefix form of A-B/ (C * D ^ E) is?**  
**Options:**  
a) -A/B*C^DE
b) -A/BC*^DE
c) -ABCD*^DE
d) -/*^ACBDE

**Answer:** a) -A/B*C^DE

**Explanation:** Infix Expression is A-B/(C*D^E)
This can be written as: A-(B/(C*(D^E)))
Thus prefix expression is -A/B*C^DE.
---

## Question 12
**Which of the following points is/are not true about Linked List data structure when it is compared with an array?**  
**Options:**  
a) Random access is not allowed in a typical implementation of Linked Lists
b) Access of elements in linked list takes less time than compared to arrays
c) Arrays have better cache locality that can make them better in terms of performance
d) It is easy to insert and delete elements in Linked List

**Answer:** b) Access of elements in linked list takes less time than compared to arrays

**Explanation:** : To access an element in a linked list, we need to traverse every element until we reach the desired element. This will take more time than arrays as arrays provide random access to its elements.

---

## Question 13
**Which data structure is based on the Last In First Out (LIFO) principle?**  
**Options:**  
a) Tree
b) Linked List
c) Stack
d) Queue 

**Answer:**c) Stack

**Explanation:** The data structure that follows the Last In First Out (LIFO) principle is the Stack. It operates like a stack of objects, making it suitable for specific-order management.

---

## Question 14
**Which of the following application makes use of a circular linked list?**  
**Options:**  
a) Recursive function calls
b) Undo operation in a text editor
c) Implement Hash Tables
d) Allocating CPU to resources 

**Answer:** d) Allocating CPU to resources

**Explanation:** Generally, round robin fashion is employed to allocate CPU time to resources which makes use of the circular linked list data structure. Recursive function calls use stack data structure. Undo Operation in text editor uses doubly linked lists. Hash tables uses singly linked lists.

---

## Question 15
**What is a bit array?**  
**Options:**  
a) Data structure that compactly stores bits
b) Data structure for representing arrays of records
c) Array in which elements are not present in continuous locations
d) An array in which most of the elements have the same value  

**Answer:** a) Data structure that compactly stores bits

**Explanation:** It compactly stores bits and exploits bit-level parallelism.

---

## Question 16
**Which of the following tree data structures is not a balanced binary tree?**  
**Options:**  
a) Splay tree
b) B-tree
c) AVL tree
d) Red-black tree 

**Answer:** C) b) B-tree

**Explanation:**All the tree data structures given in options are balanced, but B-tree can have more than two children.

---

## Question 17
**Which of the following is not the type of queue?**  
**Options:**  
a) Priority queue
b) Circular queue
c) Single ended queue
d) Ordinary queue

**Answer:** c) Single ended queue

**Explanation:**  Queue always has two ends. So, single ended queue is not the type of queue.

---

## Question 18
**Which of the following data structures can be used for parentheses matching?**  
**Options:**  
a) n-ary tree
b) queue
c) priority queue
d) stack
**Answer:** d) stack

**Explanation:** For every opening brace, push it into the stack, and for every closing brace, pop it off the stack. Do not take action for any other character. In the end, if the stack is empty, then the input has balanced parentheses.

---

## Question 19
**Which algorithm is used in the top tree data structure?**  
**Options:**  
a) Backtracking
b) Divide and Conquer
c) Branch
d) Greedy
**Answer:** b) Divide and Conqueror equal to its child nodes  

**Explanation:** Top tree is a type of data structure which is based on unrooted dynamic binary tree and is used to solve path related problems. It allows an algorithm called divide and conquer. 

---

## Question 20
**What is the need for a circular queue?**  
**Options:**  
a) easier computations
b) implement LIFO principle in queues
c) effective usage of memory
d) to delete elements based on priority

**Answer:** c) effective usage of memory 

**Explanation:**  In a linear queue, dequeue operation causes the starting elements of the array to be empty, and there is no way you can use that space, while in a circular queue, you can effectively use that space. Priority queue is used to delete the elements based on their priority. Higher priority elements will be deleted first whereas lower priority elements will be deleted next. Queue data structure always follows FIFO principle.


---

## Question 21
**Which of the following is the most widely used external memory data structure?**  
**Options:**  
a) B-tree
b) Red-black tree
c) AVL tree
d) Both AVL tree and Red-black tree

**Answer:**a) B-tree

**Explanation:**In external memory, the data is transferred in form of blocks. These blocks have data valued and pointers. And B-tree can hold both the data values and pointers. So B-tree is used as an external memory data structure.

---

## Question 22
**Which of the following is also known as Rope data structure?**  
**Options:**  
a) Linked List
b) Array
c) String
d) Cord
**Answer:** d) Cord

**Explanation:**Array is a linear data structure. Strings are a collection and sequence of codes, alphabets or characters. Linked List is a linear data structure having a node containing data input and the address of the next node. The cord is also known as the rope data structure.
---

## Question 23
**Which of the following data structure can provide efficient searching of the elements?**  
**Options:**  
a) binary search tree
b) unordered lists
c) 2-3 tree
d) treap

**Answer:** c) 2-3 tree

**Explanation:**The average case time for lookup in a binary search tree, treap and 2-3 tree is O(log n) and in unordered lists it is O(n). But in the worst case, only the 2-3 trees perform lookup efficiently as it takes O(log n), while others take O(n).

---

## Question 24
**What is an AVL tree??**  
**Options:**  
a) a tree which is unbalanced and is a height balanced tree
b) a tree which is balanced and is a height balanced tree
c) a tree with atmost 3 children
d) a tree with three children

**Answer:** b) a tree which is balanced and is a height balanced tree

**Explanation:** It is a self balancing tree with height difference atmost 1.

---

## Question 25
**What is the time complexity for searching a key or integer in Van Emde Boas data structure?**  
**Options:**  
a) O (M!)
b) O (log M!)
c) O (log (log M))
d) O (M2)

**Answer:**c) O (log (log M))

**Explanation:**  In order to search a key or integer in the Van Emde Boas data structure, the operation can be performed on an associative array. Hence, the time complexity for searching a key or integer in Van Emde Boas data structure is O (log (log M)).
