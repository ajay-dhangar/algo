# Binary Search Tree Quiz

## Questions and Solutions

### 1. What is a binary search tree (BST)?
- **Options:**
  - A) A tree where each node has at most two children.
  - B) A tree where the left child is greater than the parent.
  - C) A tree where the left child is less than the parent and the right child is greater.
  - D) A tree where all nodes are on one side.
- **Answer:** C) A tree where the left child is less than the parent and the right child is greater.
- **Explanation:** In a BST, each node's left child is less than the node, and the right child is greater, maintaining the sorted order.

---

### 2. What is the time complexity for searching an element in a balanced binary search tree?
- **Options:**
  - A) O(n)
  - B) O(log n)
  - C) O(n log n)
  - D) O(1)
- **Answer:** B) O(log n)
- **Explanation:** In a balanced BST, the height of the tree is log(n), making search operations efficient at O(log n).

---

### 3. Which of the following is true about the in-order traversal of a binary search tree?
- **Options:**
  - A) It visits the nodes in descending order.
  - B) It visits the nodes in ascending order.
  - C) It visits nodes in random order.
  - D) It does not visit all nodes.
- **Answer:** B) It visits the nodes in ascending order.
- **Explanation:** In-order traversal of a BST visits nodes in ascending order due to the property of BST.

---

### 4. Which operation in a binary search tree can have a worst-case time complexity of O(n)?
- **Options:**
  - A) Insertion
  - B) Deletion
  - C) Searching
  - D) All of the above
- **Answer:** D) All of the above
- **Explanation:** In the worst case, all operations can degrade to O(n) if the tree becomes unbalanced.

---

### 5. What is the maximum number of nodes in a binary search tree with a height of 'h'?
- **Options:**
  - A) h
  - B) 2^h - 1
  - C) 2^h
  - D) h^2
- **Answer:** B) 2^h - 1
- **Explanation:** A binary tree with height h can have at most 2^h - 1 nodes, which is full at height h.

---

### 6. Which of the following traversals can be used to get a sorted order of elements in a binary search tree?
- **Options:**
  - A) Pre-order
  - B) In-order
  - C) Post-order
  - D) Level-order
- **Answer:** B) In-order
- **Explanation:** In-order traversal yields a sorted order of elements in a BST.

---

### 7. In a binary search tree, what would happen if you tried to insert a duplicate value?
- **Options:**
  - A) It will replace the existing value.
  - B) It will be ignored.
  - C) It will cause an error.
  - D) It will create a duplicate node.
- **Answer:** B) It will be ignored.
- **Explanation:** BSTs typically do not allow duplicate values, so the insertion of a duplicate is ignored.

---

### 8. What is the time complexity for finding the lowest common ancestor (LCA) of two nodes in a binary search tree?
- **Options:**
  - A) O(n)
  - B) O(log n)
  - C) O(h)
  - D) O(1)
- **Answer:** C) O(h)
- **Explanation:** Finding the LCA can take O(h) time, where h is the height of the tree, depending on the position of the nodes.

---

### 9. Which of the following operations requires tree rotation in a binary search tree?
- **Options:**
  - A) Insertion
  - B) Deletion
  - C) Balancing
  - D) Both A and B
- **Answer:** C) Balancing
- **Explanation:** Rotations are needed during insertion and deletion to maintain balance in self-balancing BSTs.

---

### 10. How can you check if a binary tree is a binary search tree?
- **Options:**
  - A) By checking if in-order traversal is sorted.
  - B) By checking if all nodes have two children.
  - C) By checking if all nodes have unique values.
  - D) By performing a pre-order traversal.
- **Answer:** A) By checking if in-order traversal is sorted.
- **Explanation:** If the in-order traversal of the tree is sorted, it confirms that the tree is a valid BST.
