# Binary Tree Quiz

## Questions

### Easy Questions

1. **What is the height of a binary tree with a single node?**
   - A) 0
   - B) 1
   - C) 2
   - D) Depends on the tree  
   **Answer:** B) 1  
   **Explanation:** The height of a tree is defined as the number of edges on the longest path from the root to a leaf. A single node has height 0, but considering the node itself, the height is 1.

2. **Which traversal of a binary tree visits nodes in the order: left, root, right?**
   - A) Pre-order
   - B) In-order
   - C) Post-order
   - D) Level-order  
   **Answer:** B) In-order  
   **Explanation:** In-order traversal visits the left subtree first, then the root node, followed by the right subtree.

3. **In a binary tree, what is the maximum number of nodes at depth 'd'?**
   - A) 2^d
   - B) 2^(d+1) - 1
   - C) 2d
   - D) d^2  
   **Answer:** A) 2^d  
   **Explanation:** At depth 'd', the maximum number of nodes is \(2^d\) because each level can double the number of nodes of the previous level.

### Average Questions

4. **What is the time complexity of searching for an element in a balanced binary search tree?**
   - A) O(n)
   - B) O(log n)
   - C) O(n log n)
   - D) O(1)  
   **Answer:** B) O(log n)  
   **Explanation:** In a balanced binary search tree, the height is logarithmic with respect to the number of nodes, leading to O(log n) time complexity for search operations.

5. **Which of the following statements is true about a binary search tree?**
   - A) The left subtree of a node contains only nodes with keys less than the node's key.
   - B) The right subtree of a node contains only nodes with keys greater than the node's key.
   - C) Both A and B.
   - D) None of the above.  
   **Answer:** C) Both A and B.  
   **Explanation:** A binary search tree maintains the property where the left subtree has nodes with keys less than the parent's key, and the right subtree has nodes with keys greater than the parent's key.

6. **In a binary tree, which of the following properties is true for a complete binary tree?**
   - A) All levels are completely filled except possibly the last level.
   - B) All nodes are as far left as possible.
   - C) All leaves are at the same level.
   - D) A and B.  
   **Answer:** D) A and B.  
   **Explanation:** A complete binary tree has all levels fully filled except possibly the last level, which is filled from left to right.

### Difficult Questions

7. **What is the maximum depth of a binary tree with 'n' nodes?**
   - A) n
   - B) log n
   - C) n/2
   - D) n - 1  
   **Answer:** A) n  
   **Explanation:** In the worst case (for example, a skewed tree), the maximum depth can be equal to the number of nodes (n).

8. **Which of the following algorithms can be used to find the lowest common ancestor (LCA) in a binary tree?**
   - A) Recursive approach
   - B) Iterative approach
   - C) Both A and B
   - D) None of the above  
   **Answer:** C) Both A and B  
   **Explanation:** Both recursive and iterative approaches can be used to find the LCA, depending on the structure and properties of the tree.

9. **Which of the following traversal methods would give the nodes of a binary tree in descending order?**
   - A) In-order traversal
   - B) Pre-order traversal
   - C) Post-order traversal
   - D) Reverse in-order traversal  
   **Answer:** D) Reverse in-order traversal  
   **Explanation:** Reverse in-order traversal visits nodes in the order of right subtree, root, and then left subtree, resulting in a descending order.

10. **What is the worst-case time complexity for inserting an element in a binary search tree?**
    - A) O(log n)
    - B) O(n)
    - C) O(n log n)
    - D) O(1)  
    **Answer:** B) O(n)  
    **Explanation:** In the worst case, if the tree is skewed, the insertion operation could take O(n) time.
