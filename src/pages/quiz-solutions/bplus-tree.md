---
title: B+ Tree Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">B+ Tree Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What is the primary structural difference between a B-Tree and a B+ Tree?**
   - A) B+ Trees do not allow duplicate keys, while B-Trees do
   - B) In a B+ Tree, only leaf nodes store actual data records; internal nodes store only keys used for navigation
   - C) B+ Trees are always binary, while B-Trees can have multiple children
   - D) There is no structural difference; the names are interchangeable  
   **Answer:** B) In a B+ Tree, only leaf nodes store actual data records; internal nodes store only keys used for navigation  
   **Explanation:** In a B-Tree, data can be stored in both internal and leaf nodes. In a B+ Tree, internal nodes store only keys for routing search operations, while all actual data (or record pointers) reside exclusively in the leaf nodes.

2. **How are leaf nodes typically organized in a B+ Tree?**
   - A) They are isolated and unconnected to one another
   - B) They are linked together in a sorted linked list, allowing efficient sequential and range traversal
   - C) They are organized in a hash table
   - D) They are stored in random, unordered positions  
   **Answer:** B) They are linked together in a sorted linked list, allowing efficient sequential and range traversal  
   **Explanation:** B+ Tree leaf nodes are connected via pointers in a sorted linked list. This allows range queries and full sequential scans to be performed efficiently without re-traversing the tree from the root.

3. **Why are B+ Trees commonly used for database indexing?**
   - A) They require less disk space than any other structure
   - B) Their high fan-out and linked leaf nodes make both point lookups and range queries efficient, while minimizing disk I/O
   - C) They only work with in-memory data and not disk-based storage
   - D) They eliminate the need for sorting data  
   **Answer:** B) Their high fan-out and linked leaf nodes make both point lookups and range queries efficient, while minimizing disk I/O  
   **Explanation:** B+ Trees are optimized for block-based storage: high fan-out keeps tree height (and thus disk reads) low, and the linked leaf structure makes range queries fast — both crucial for database indexes.

4. **What is a 'Range Query' in the context of B+ Trees?**
   - A) A query that retrieves a single exact-match record
   - B) A query that retrieves all records whose keys fall within a specified range, such as between two values
   - C) A query that deletes a range of nodes from the tree
   - D) A query used only to check if the tree is balanced  
   **Answer:** B) A query that retrieves all records whose keys fall within a specified range, such as between two values  
   **Explanation:** A range query asks for all records with keys between a lower and upper bound (e.g., 'all ages between 18 and 30'). B+ Trees handle this efficiently by locating the start key, then simply following leaf-node links sequentially.

5. **In a B+ Tree, do internal (non-leaf) nodes store actual data records?**
   - A) Yes, internal nodes store full data records just like leaf nodes
   - B) No, internal nodes store only keys used to guide the search to the correct leaf
   - C) Internal nodes store data only in the root
   - D) Internal nodes are never used for searching  
   **Answer:** B) No, internal nodes store only keys used to guide the search to the correct leaf  
   **Explanation:** Internal nodes in a B+ Tree act purely as a routing/index layer — they hold separator keys that direct traversal toward the correct leaf node, where the actual data resides.

6. **What is the time complexity of a search operation in a B+ Tree with n keys and order m (fan-out)?**
   - A) O(n)
   - B) O(log_m n)
   - C) O(m log n)
   - D) O(n log m)  
   **Answer:** B) O(log_m n)  
   **Explanation:** Because each internal node has up to m children, the height of the tree is roughly log base m of n. Search complexity is therefore O(log_m n) — significantly shallower than a binary tree's O(log_2 n) for large m.

7. **What happens during insertion when a B+ Tree leaf node becomes full (exceeds its maximum key capacity)?**
   - A) The insertion fails and an error is thrown
   - B) The leaf node is split into two nodes, and the middle (or first key of the new right node) is copied up to the parent as a separator key
   - C) The entire tree is rebuilt from scratch
   - D) The new key is simply discarded  
   **Answer:** B) The leaf node is split into two nodes, and the middle (or first key of the new right node) is copied up to the parent as a separator key  
   **Explanation:** When a leaf overflows, it splits into two leaves, and a copy of the separating key is pushed up to the parent node to maintain correct routing. Unlike a B-Tree split, the key is copied (not moved) since it must still exist in the leaf-level data layer.

8. **When deleting a key from a B+ Tree causes a leaf node to underflow (fall below the minimum number of keys), what are the typical resolution strategies?**
   - A) The tree becomes permanently invalid and must be rebuilt
   - B) Borrowing a key from a sibling node, or merging with a sibling if borrowing isn't possible
   - C) Simply leaving the node underflowed with no correction
   - D) Deleting the entire subtree containing the underflowed node  
   **Answer:** B) Borrowing a key from a sibling node, or merging with a sibling if borrowing isn't possible  
   **Explanation:** On underflow, the B+ Tree first tries to redistribute (borrow) a key from an adjacent sibling that has extra keys. If no sibling can spare a key, the underflowed node is merged with a sibling, and the separator key in the parent is removed, potentially propagating the underflow upward.

9. **Why does duplicating keys between internal nodes and leaf nodes in a B+ Tree NOT waste significant space in practice?**
   - A) It does waste significant space, which is a known drawback of B+ Trees
   - B) Internal nodes only store keys (not full records), so the duplicated key overhead is small compared to the space saved by enabling a much higher fan-out and shallower tree
   - C) B+ Trees never duplicate any keys
   - D) Disk space is irrelevant to database performance  
   **Answer:** B) Internal nodes only store keys (not full records), so the duplicated key overhead is small compared to the space saved by enabling a much higher fan-out and shallower tree  
   **Explanation:** Since internal nodes hold only keys (no data payload), more keys fit per disk block, increasing fan-out and reducing tree height. The minor redundancy of storing a key in both an internal node and a leaf is a worthwhile trade-off for faster traversal and efficient range scans.

10. **How does a B+ Tree achieve efficient sequential (in-order) traversal of all stored records, and how does this compare to a B-Tree?**
    - A) Both B-Trees and B+ Trees require a full in-order tree traversal starting from the root every time
    - B) A B+ Tree only needs to find the first leaf and then follow leaf-to-leaf linked list pointers, avoiding repeated root-to-leaf traversals required by a plain B-Tree
    - C) Neither structure supports sequential traversal at all
    - D) B-Trees are always faster for sequential traversal than B+ Trees  
    **Answer:** B) A B+ Tree only needs to find the first leaf and then follow leaf-to-leaf linked list pointers, avoiding repeated root-to-leaf traversals required by a plain B-Tree  
    **Explanation:** Because B+ Tree leaves are linked sequentially, a full scan or range query needs only one descent to the starting leaf, then a simple linked-list walk. A standard B-Tree (without linked leaves) would require repeated tree traversals or complex in-order logic to visit all records, making B+ Trees significantly better suited for range-heavy database workloads.

11. **In a database system, why might a composite (multi-column) index implemented as a B+ Tree still perform poorly for queries that filter only on the second column of the index?**
    - A) B+ Trees cannot store composite keys at all
    - B) Because keys are ordered primarily by the first column, filtering only on the second column cannot leverage the sorted order, often forcing a broader scan rather than a precise lookup
    - C) Composite indexes are always faster than single-column indexes for every type of query
    - D) B+ Trees automatically reorder columns to optimize any query pattern  
    **Answer:** B) Because keys are ordered primarily by the first column, filtering only on the second column cannot leverage the sorted order, often forcing a broader scan rather than a precise lookup  
    **Explanation:** A composite B+ Tree index on (A, B) sorts entries primarily by A, then by B within each A value. A query filtering only on B cannot binary-search effectively, since matching B values are scattered across different A groups — this is why column order in composite indexes matters significantly for query performance.

12. **What is a key trade-off when increasing the order (fan-out) of a B+ Tree to reduce tree height?**
    - A) There is no trade-off; higher fan-out is always strictly better with no downsides
    - B) Larger nodes mean more keys must be scanned or compared within each node during traversal, and each node may not fit as cleanly within a single disk block if too large
    - C) Increasing fan-out always decreases search time to O(1) regardless of size
    - D) Higher fan-out eliminates the need for leaf node linking  
    **Answer:** B) Larger nodes mean more keys must be scanned or compared within each node during traversal, and each node may not fit as cleanly within a single disk block if too large  
    **Explanation:** While higher fan-out reduces tree height (fewer disk seeks), each node becomes larger and may require more in-node comparisons (mitigated in practice by binary search within the node). Critically, node size is usually tuned to match the disk block size — making it too large would mean a single node spans multiple disk blocks, increasing I/O cost per node access and negating the benefit.

</main>
