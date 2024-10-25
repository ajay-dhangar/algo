---
title: B-Tree Quiz
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">B-Tree Quiz Solutions</h1>

<main className="mx-2 p-6">

### 1. What is a B-Tree?

- **A)** A binary search tree that is balanced.
- **B)** A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.
- **C)** A type of tree that only allows three children per node.
- **D)** A tree used exclusively for storing strings.

**Solution:** **B)** A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.  

<details>
  <summary><b>Explanation:</b></summary>
  A B-Tree is a self-balancing tree data structure that keeps data sorted and allows operations like searching, insertion, and deletion in logarithmic time. It is widely used in database and file systems.
</details>

<AdsComponent />

### 2. What is the minimum degree of a B-Tree?

- **A)** The minimum number of keys a node can contain.
- **B)** The maximum number of children a node can have.
- **C)** The maximum number of keys a node can contain.
- **D)** The number of levels in the tree.

**Solution:** **A)** The minimum number of keys a node can contain.  

<details>
  <summary><b>Explanation:</b></summary>
  The minimum degree `t` of a B-Tree is the minimum number of keys each node can have, except for the root node. It defines the tree's branching factor.
</details>

<Ads />

### 3. In a B-Tree, each node can have a maximum of how many children?

- **A)** 2
- **B)** 3
- **C)** 2t
- **D)** t

**Solution:** **C)** 2t  

<details>
  <summary><b>Explanation:</b></summary>
  In a B-Tree, each node can have up to `2t` children, where `t` is the minimum degree of the tree. The exact number of children depends on the number of keys in the node.
</details>

<AdsComponent />

### 4. What is the main advantage of using a B-Tree over a binary search tree?

- **A)** Faster search times.
- **B)** Less memory usage.
- **C)** Better balance and reduced height.
- **D)** Simplicity of implementation.

**Solution:** **C)** Better balance and reduced height.  

<details>
  <summary><b>Explanation:</b></summary>
  The primary advantage of a B-Tree is that it remains balanced, keeping its height minimal, which ensures that the time for insertions, deletions, and searches is kept logarithmic.
</details>

<Ads />

### 5. When inserting into a B-Tree, what happens if a node exceeds the maximum number of keys?

- **A)** The node is deleted.
- **B)** The tree is restructured.
- **C)** The node is split into two nodes.
- **D)** No action is taken.

**Solution:** **C)** The node is split into two nodes.  

<details>
  <summary><b>Explanation:</b></summary>
  If a node exceeds the maximum allowed number of keys, it is split into two nodes, and the median key is pushed up to the parent node. This ensures the B-Tree remains balanced.
</details>

<AdsComponent />

### 6. What does it mean for a B-Tree to be balanced?

- **A)** All leaves are at the same depth.
- **B)** The number of keys in each node is equal.
- **C)** Each node contains the same number of children.
- **D)** The tree is a complete binary tree.

**Solution:** **A)** All leaves are at the same depth.  

<details>
  <summary><b>Explanation:</b></summary>
  A B-Tree is balanced because all leaf nodes appear at the same depth, ensuring that the tree's operations are efficient in terms of time complexity.
</details>

<Ads />

### 7. How is deletion handled in a B-Tree?

- **A)** Simply remove the key from the node.
- **B)** Reorganize keys within the node only.
- **C)** It may require borrowing a key from a sibling or merging nodes.
- **D)** Deletion is not allowed in B-Trees.

**Solution:** **C)** It may require borrowing a key from a sibling or merging nodes.  
**Explanation:** Deletion in a B-Tree may lead to an underflow in a node, in which case keys may be borrowed from adjacent sibling nodes or merged with them to maintain the tree structure.

<AdsComponent />

### 8. Which of the following properties is NOT true for B-Trees?

- **A)** All leaf nodes are at the same level.
- **B)** Each internal node has at least t-1 keys.
- **C)** The root node can have fewer than t keys.
- **D)** Every node can have an arbitrary number of children.

**Solution:** **D)** Every node can have an arbitrary number of children. 

<details>
  <summary><b>Explanation:</b></summary>
  In a B-Tree, the number of children a node can have is limited by the minimum degree `t`. Each internal node has between `t-1` and `2t-1` keys, but the root node can have fewer than `t` keys.
</details>

<Ads />

### 9. In which applications are B-Trees commonly used?

- **A)** In-memory data structures.
- **B)** File systems and databases.
- **C)** Simple data retrieval tasks.
- **D)** Small data storage.

**Solution:** **B)** File systems and databases.  

<details>
  <summary><b>Explanation:</b></summary>
    B-Trees are commonly used in file systems and databases due to their ability to handle large amounts of data efficiently and maintain balanced search times.
</details>

<AdsComponent />

### 10. What is the relationship between the height of a B-Tree and its order?

- **A)** The height increases as the order increases.
- **B)** The height decreases as the order increases.
- **C)** The height is independent of the order.
- **D)** The height and order are always equal.

**Solution:** **B)** The height decreases as the order increases.  

<details>
  <summary><b>Explanation:</b></summary>
    As the order of a B-Tree increases, the number of keys per node increases, which reduces the height of the tree. This relationship helps maintain the tree's balance and efficiency.
</details>

<Ads />

<h2 className="text-center text-gray-800 dark:text-gray-200">
Now, let's Discuss!
</h2>

<GiscusComponent />

</main>