---
title: Red-Black Trees Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Red-Black Trees Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **Which fundamental property characterizes a Red-Black Tree (RBT)?**
   - A) A binary search tree where every node is red.
   - B) A self-balancing binary search tree with an extra bit for node color.
   - C) A complete binary tree where all levels are filled.
   - D) A tree where left children are always red and right are black.  
   **Answer:** B) A self-balancing binary search tree with an extra bit for node color.  
   **Explanation:** Red-Black trees use a color bit (Red or Black) per node. This metadata, combined with specific rules, ensures the tree remains approximately balanced during mutations.

2. **In a valid Red-Black Tree configuration, what must be the color of the Root node?**
   - A) Red
   - B) Black
   - C) Either Red or Black
   - D) Transparent  
   **Answer:** B) Black  
   **Explanation:** Property 2 of Red-Black trees strictly states that the root must be Black. This is crucial for maintaining the black-height stability of the tree.

3. **What color are the leaves (NIL/External nodes) in a Red-Black Tree?**
   - A) Red
   - B) Black
   - C) Grey
   - D) Leaves do not have colors  
   **Answer:** B) Black  
   **Explanation:** All leaf nodes (NIL) are considered Black. This allows every path from a node to reach a black 'endpoint'.

4. **If a node is Red, what constraint applies to its children?**
   - A) Both children must be Red.
   - B) At least one child must be Black.
   - C) Both children must be Black.
   - D) Red nodes cannot have children.  
   **Answer:** C) Both children must be Black.  
   **Explanation:** The 'No Two Red Nodes' rule: A Red node cannot have a Red child. This prevents the tree from becoming too skewed or 'heavy' on one side.

5. **What is the 'Black-Height' property regarding paths from a node to its leaves?**
   - A) Every path must have more red nodes than black nodes.
   - B) Every path from a node to its descendant leaves must contain the same number of black nodes.
   - C) The total number of nodes in any path must be even.
   - D) The root to leaf path must be shorter than log(n).  
   **Answer:** B) Every path from a node to its descendant leaves must contain the same number of black nodes.  
   **Explanation:** This is the most critical property. By ensuring all paths have the same number of black nodes, we guarantee that no path is more than twice as long as any other path.

6. **What is the maximum theoretical height of a Red-Black tree with 'n' internal nodes?**
   - A) O(n)
   - B) O(log n)
   - C) Approximately 2 * log(n + 1)
   - D) O(sqrt(n))  
   **Answer:** C) Approximately 2 * log(n + 1)  
   **Explanation:** Because of the balance properties, the height of a Red-Black tree is guaranteed to be logarithmic, specifically at most twice the height of a perfectly balanced BST.

7. **When inserting a new node into an RBT, what is its initial color before rebalancing begins?**
   - A) Black
   - B) Red
   - C) Random
   - D) Depends on the parent's color  
   **Answer:** B) Red  
   **Explanation:** New nodes are always inserted as Red. This avoids violating the black-height property (Prop 5) immediately, though it may violate the red-child rule (Prop 4), which is then fixed via rotations.

8. **Which of the following operations is used during rebalancing if an inserted node's uncle is also Red?**
   - A) Only Left Rotation
   - B) Only Right Rotation
   - C) Recoloring (flipping colors of parent, uncle, and grandparent)
   - D) Deleting the node  
   **Answer:** C) Recoloring (flipping colors of parent, uncle, and grandparent)  
   **Explanation:** If the uncle is Red, we can simply flip the colors of the parent, uncle, and grandparent without needing complex rotations. We then move our focus up to the grandparent to ensure no new violations were created.

9. **What is the primary advantage of a Red-Black Tree over a standard Binary Search Tree?**
   - A) It uses less memory than a BST.
   - B) It guarantees O(log n) performance for search, insert, and delete operations.
   - C) It is easier to implement code-wise.
   - D) It keeps nodes sorted in reverse order.  
   **Answer:** B) It guarantees O(log n) performance for search, insert, and delete operations.  
   **Explanation:** A standard BST can become a 'linked list' (O(n)) if data is inserted in sorted order. An RBT forces balance, ensuring O(log n) even in the worst-case insertion scenarios.

10. **Which rotation is required if we have a 'Left-Right' violation (inserted node is right child of a left child)?**
    - A) Single Right Rotation
    - B) Single Left Rotation
    - C) Left Rotation on child, then Right Rotation on parent
    - D) No rotation is needed for this case  
    **Answer:** C) Left Rotation on child, then Right Rotation on parent  
    **Explanation:** A double rotation is needed to fix the zig-zag. We first rotate the child to turn the zig-zag into a straight line, then rotate the parent to restore balance.

</main>
