---
title: Binary Search Trees (BST) Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Binary Search Trees (BST) Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What is the primary structural property that defines a Binary Search Tree (BST)?**
   - A) Every single node across all levels must have exactly two child nodes.
   - B) The left child's key is greater than the parent node, and the right child's key is strictly smaller.
   - C) The left subtree contains only keys less than the parent, and the right subtree contains only keys greater than the parent.
   - D) All leaf nodes are constrained to group together on the right hand side of the root.  
   **Answer:** C) The left subtree contains only keys less than the parent, and the right subtree contains only keys greater than the parent.  
   **Explanation:** A Binary Search Tree relies on a strict order variant: for any given node, all element values in its left child branch are smaller, while all values in its right child branch are larger.

2. **What is the average-case time complexity for executing a lookup operation in a balanced Binary Search Tree?**
   - A) O(n)
   - B) O(log n)
   - C) O(n log n)
   - D) O(1)  
   **Answer:** B) O(log n)  
   **Explanation:** When a BST is well-balanced, its depth scales at log(n). Each search step cuts the search space exactly in half, delivering clear O(log n) performance limits.

3. **In the worst-case scenario (such as a skewed tree built from sorted inputs), what does a standard BST lookup degrade to?**
   - A) O(1)
   - B) O(log n)
   - C) O(n)
   - D) O(n^2)  
   **Answer:** C) O(n)  
   **Explanation:** If items are inserted in linear sorted order, a regular BST shifts into a linked-list shape. This breakdown forces search pipelines to run sequentially through all elements, degrading to O(n).

4. **Which depth-first tree traversal technique produces a list of BST keys sorted in ascending sequence?**
   - A) Pre-order traversal
   - B) Post-order traversal
   - C) In-order traversal
   - D) Level-order traversal  
   **Answer:** C) In-order traversal  
   **Explanation:** An In-order traversal follows a Left-Root-Right pattern. Given the structural positioning rules of a BST, this sequence outputs all values in a perfect ascending order.

5. **When deleting an internal node with two active children from a BST, which alternative node is typically substituted to preserve structural balance?**
   - A) The absolute deepest leaf node located anywhere in the tree configuration.
   - B) Either the In-order Predecessor or the In-order Successor of that node.
   - C) The immediate left-hand child node.
   - D) The root node of the entire structural framework.  
   **Answer:** B) Either the In-order Predecessor or the In-order Successor of that node.  
   **Explanation:** To keep the BST properties unbroken when removing a node with two children, swap its place with either the largest value in its left side (predecessor) or the smallest value in its right side (successor).

6. **What is the maximum number of children any node can legally maintain within a Binary Search Tree layout?**
   - A) Unlimited
   - B) 1
   - C) 2
   - D) 4  
   **Answer:** C) 2  
   **Explanation:** As an explicit binary structural configuration, every single node position is capped at a maximum child count of exactly two (traditionally labeled left and right children).

7. **If the root node of a valid BST holds the value 50, where would a new element with a value of 35 be placed?**
   - A) Somewhere inside the right subtree branch.
   - B) Directly as the new primary parent over the root node.
   - C) Somewhere inside the left subtree branch.
   - D) It replaces the value 50, purging it from the structure.  
   **Answer:** C) Somewhere inside the left subtree branch.  
   **Explanation:** Since 35 is less than 50, it must be routed to the left subtree branch of the root node according to standard BST sorting properties.

8. **What is the maximum possible height of an unbalanced Binary Search Tree that holds exactly 'n' nodes?**
   - A) O(log n)
   - B) O(n)
   - C) O(n - 1)
   - D) O(sqrt(n))  
   **Answer:** B) O(n)  
   **Explanation:** In a worst-case, single-line skewed tree, every node has exactly one child. Under the standard node-counting convention (where a single root node has height 1), the maximum height of a tree with n nodes is n, which is O(n).

9. **Which of these specialized algorithmic frameworks is explicitly engineered to prevent a BST from degrading into a skewed layout?**
   - A) Hash Map
   - B) Red-Black Tree / AVL Tree
   - C) Priority Queue Linkages
   - D) Minimal Spanning Matrix  
   **Answer:** B) Red-Black Tree / AVL Tree  
   **Explanation:** AVL and Red-Black trees are self-balancing extensions of a classic BST. They run automated structural adjustments during modifications to keep lookup times locked at O(log n).

10. **If an in-order traversal of a target binary tree yields '2, 3, 4, 7, 9', is this data alone enough to confirm the tree is a valid BST?**
   - A) No, because we do not know if the structural layout satisfies binary tree requirements.
   - B) Yes, an ascending sorted sequence proves it is a valid BST.
   - C) No, because the values do not contain negative integers.
   - D) Yes, because 7 is positioned as the exact numerical median value.  
    **Answer:** B) Yes, an ascending sorted sequence proves it is a valid BST.  
    **Explanation:** For any binary tree, if its in-order traversal is strictly increasing (sorted and without duplicates), it mathematically guarantees that for every node, all elements in its left subtree are smaller and all elements in its right subtree are larger. Thus, it is a valid BST.

</main>
