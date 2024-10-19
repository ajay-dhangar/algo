# Red-Black Tree Quiz

## Questions and Solutions

### 1. What is a Red-Black Tree?
- **Options:**
  - A) A binary search tree with additional color properties.
  - B) A tree that only allows red nodes.
  - C) A tree where all nodes are black.
  - D) A tree with no duplicate values.
- **Answer:** A) A binary search tree with additional color properties.
- **Explanation:** A Red-Black Tree is a binary search tree that follows specific properties to maintain balance, ensuring efficient operations.

---

### 2. What are the two colors used in a Red-Black Tree?
- **Options:**
  - A) Red and Blue
  - B) Black and White
  - C) Red and Black
  - D) Green and Yellow
- **Answer:** C) Red and Black
- **Explanation:** Red-Black Trees use two colors (red and black) to maintain balance and ensure that the tree remains approximately balanced.

---

### 3. What is the maximum height of a Red-Black Tree with n nodes?
- **Options:**
  - A) O(n)
  - B) O(log n)
  - C) O(2 log n)
  - D) O(sqrt(n))
- **Answer:** B) O(log n)
- **Explanation:** The maximum height of a Red-Black Tree is O(log n), ensuring that operations like insertion, deletion, and search remain efficient.

---

### 4. Which of the following properties must be true for a Red-Black Tree?
- **Options:**
  - A) The root must be red.
  - B) Red nodes cannot have red children.
  - C) All leaves are red.
  - D) Every path from a node to its leaves must have the same number of red nodes.
- **Answer:** B) Red nodes cannot have red children.
- **Explanation:** One of the fundamental properties of Red-Black Trees is that red nodes cannot have red children, which helps maintain balance.

---

### 5. What is the role of rotations in Red-Black Trees?
- **Options:**
  - A) To delete nodes.
  - B) To maintain the balance of the tree.
  - C) To insert nodes.
  - D) To traverse the tree.
- **Answer:** B) To maintain the balance of the tree.
- **Explanation:** Rotations are used to restore balance in the tree after insertions and deletions, ensuring the Red-Black properties are maintained.

---

### 6. When a new node is inserted into a Red-Black Tree, what color is it initially?
- **Options:**
  - A) Red
  - B) Black
  - C) Blue
  - D) Green
- **Answer:** A) Red
- **Explanation:** Newly inserted nodes in a Red-Black Tree are always colored red to maintain the tree's balance.

---

### 7. In a Red-Black Tree, how do you ensure that the tree remains balanced after an insertion?
- **Options:**
  - A) By performing rotations and recoloring nodes.
  - B) By deleting the inserted node.
  - C) By adjusting the tree's height.
  - D) By increasing the tree's depth.
- **Answer:** A) By performing rotations and recoloring nodes.
- **Explanation:** Balancing is achieved through rotations and recoloring, following specific rules based on the colors of the affected nodes.

---

### 8. Which of the following scenarios requires a right rotation in a Red-Black Tree?
- **Options:**
  - A) Inserting a red node in the left subtree of a left child.
  - B) Inserting a red node in the right subtree of a right child.
  - C) Inserting a red node in the right subtree of a left child.
  - D) Inserting a black node.
- **Answer:** A) Inserting a red node in the left subtree of a left child.
- **Explanation:** This scenario causes an imbalance that is corrected with a right rotation.

---

### 9. What happens if a Red-Black Tree property is violated during an insertion?
- **Options:**
  - A) The tree is deleted.
  - B) The tree is rebalanced.
  - C) The insertion is aborted.
  - D) No action is taken.
- **Answer:** B) The tree is rebalanced.
- **Explanation:** If any property is violated, the tree undergoes rebalancing through rotations and recoloring to restore its properties.

---

### 10. What is the primary advantage of using a Red-Black Tree over a regular Binary Search Tree?
- **Options:**
  - A) It requires less memory.
  - B) It guarantees O(log n) time complexity for insertions, deletions, and searches.
  - C) It can store duplicate values.
  - D) It allows for faster traversals.
- **Answer:** B) It guarantees O(log n) time complexity for insertions, deletions, and searches.
- **Explanation:** The balanced nature of Red-Black Trees ensures that operations maintain logarithmic time complexity, making them efficient for dynamic sets.
