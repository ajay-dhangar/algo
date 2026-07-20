---
title: Binary Trees Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Binary Trees Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What is the height of a binary tree that contains only a single root node?**
   - A) 0
   - B) 1
   - C) 2
   - D) It depends entirely on the tree implementation  
   **Answer:** B) 1  
   **Explanation:** By standard node-counting convention, a binary tree containing exactly one node has a height of 1. (Note: If counting edges instead, it would be 0, but standard educational frameworks default to node counts).

2. **Which fundamental depth-first traversal method processes a binary tree in the exact sequence: Left Subtree, Root Node, Right Subtree?**
   - A) Pre-order traversal
   - B) In-order traversal
   - C) Post-order traversal
   - D) Level-order traversal  
   **Answer:** B) In-order traversal  
   **Explanation:** In-order traversal strictly follows the Left-Root-Right pattern recursively. When executed on a binary search tree, this traversal returns elements in sorted order.

3. **In a traditional binary tree setup, what is the maximum possible number of nodes that can exist specifically at depth 'd'?**
   - A) 2^d
   - B) 2^(d+1) - 1
   - C) 2d
   - D) d^2  
   **Answer:** A) 2^d  
   **Explanation:** Since every node in a binary tree can split into at most 2 children, the maximum node limit doubles with each level, scaling exactly as 2^d (assuming the root sits at depth 0).

4. **What is the average-case time complexity of looking up a unique key within a perfectly balanced Binary Search Tree (BST)?**
   - A) O(n)
   - B) O(log n)
   - C) O(n log n)
   - D) O(1)  
   **Answer:** B) O(log n)  
   **Explanation:** A balanced BST splits the search space in half with every node comparison. This makes the search operational length proportional to the height of the tree, which is O(log n).

5. **Which structural rule must a binary tree satisfy to qualify as a valid Binary Search Tree?**
   - A) The left subtree of a node contains only keys lesser than the node's key.
   - B) The right subtree of a node contains only keys greater than the node's key.
   - C) Both A and B are true.
   - D) None of the above rules apply.  
   **Answer:** C) Both A and B are true.  
   **Explanation:** To maintain the binary search variant, every single node must act as a boundary: all left elements must be strictly smaller than it, and all right elements must be strictly larger.

6. **Which of the following definitions precisely describes a 'Complete Binary Tree'?**
   - A) Every level is completely filled except possibly the last level, which is filled from left to right.
   - B) All leaf nodes are forced to sit on the exact same depth layer.
   - C) Every internal node is strictly forced to have exactly two children.
   - D) The tree is fully skewed down one single child branch line.  
   **Answer:** A) Every level is completely filled except possibly the last level, which is filled from left to right.  
   **Explanation:** A complete binary tree keeps structural paths densely packed. Every single level is entirely filled, and the bottom-most level populates positions progressively from left to right without skipping spaces.

7. **What is the absolute maximum possible depth/height of an unconstrained binary tree structured with exactly 'n' nodes?**
   - A) n
   - B) log n
   - C) n / 2
   - D) n - 1  
   **Answer:** A) n  
   **Explanation:** In a worst-case scenario where each node contains only one child, the tree stretches out into a single linear sequence. The depth matches the count of nodes, resulting in a height of n.

8. **Which implementation architectures can be used to determine the Lowest Common Ancestor (LCA) of two target nodes within a binary tree?**
   - A) A purely recursive post-order exploration stack
   - B) An iterative parent-mapping pointer tracker using hash structures
   - C) Both A and B
   - D) None of the above methods are valid  
   **Answer:** C) Both A and B  
   **Explanation:** LCA problems can be handled recursively by bubbled matches from sub-branches, or iteratively by mapping out parent nodes via a look-up map and finding where their paths cross.

9. **Which specific traversal path strategy yields the contents of a valid Binary Search Tree in strict descending order?**
   - A) Standard In-order traversal
   - B) Pre-order structural traversal
   - C) Post-order cleanup traversal
   - D) Reverse In-order traversal  
   **Answer:** D) Reverse In-order traversal  
   **Explanation:** While a standard in-order traversal (Left, Root, Right) yields elements in ascending order, reversing that approach to (Right, Root, Left) outputs the largest elements first, delivering a perfect descending list.

10. **What is the worst-case time complexity encountered when attempting to insert a new node into an unbalanced Binary Search Tree?**
   - A) O(log n)
   - B) O(n)
   - C) O(n log n)
   - D) O(1)  
   **Answer:** B) O(n)  
   **Explanation:** If a BST gets heavily skewed into a linear chain, inserting an item that belongs at the very end requires iterating past every single existing element, leading to a worst-case time of O(n).

</main>
