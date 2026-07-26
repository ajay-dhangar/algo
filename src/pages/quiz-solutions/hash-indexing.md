---
title: Hash Indexing Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Hash Indexing Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What is Hash Indexing primarily used for in database/storage systems?**
   - A) Sorting all records in ascending order
   - B) Mapping a search key to a specific bucket/block location using a hash function, enabling fast direct lookups
   - C) Compressing data to save disk space
   - D) Encrypting sensitive data for security  
   **Answer:** B) Mapping a search key to a specific bucket/block location using a hash function, enabling fast direct lookups  
   **Explanation:** Hash indexing applies a hash function to a search key to compute the address (bucket) where the corresponding record is stored, allowing near-direct O(1) average-case access rather than scanning or tree traversal.

2. **What is 'Static Hashing'?**
   - A) A hashing scheme where the number of buckets is fixed and does not change as data grows
   - B) A hashing scheme that automatically resizes itself on every insertion
   - C) A hashing scheme that only works with string keys
   - D) A hashing scheme used exclusively for in-memory caches  
   **Answer:** A) A hashing scheme where the number of buckets is fixed and does not change as data grows  
   **Explanation:** In static hashing, the total number of buckets is determined upfront and remains constant. As more records are inserted, buckets can become overloaded, requiring overflow handling, since the structure does not adapt its size dynamically.

3. **What problem does 'Dynamic Hashing' solve compared to static hashing?**
   - A) It eliminates the need for a hash function entirely
   - B) It allows the number of buckets to grow or shrink as data volume changes, avoiding the overflow problems of a fixed-size static scheme
   - C) It guarantees there will never be any collisions
   - D) It only works for read-only databases  
   **Answer:** B) It allows the number of buckets to grow or shrink as data volume changes, avoiding the overflow problems of a fixed-size static scheme  
   **Explanation:** Dynamic hashing schemes (like extendible and linear hashing) adapt the structure's size as data grows or shrinks, addressing static hashing's core weakness: performance degradation from bucket overflow when the initial bucket count proves insufficient.

4. **What is a 'Collision' in the context of hashing?**
   - A) When the database crashes unexpectedly
   - B) When two or more distinct keys hash to the same bucket or address
   - C) When a hash function returns a negative number
   - D) When two threads try to read the same record simultaneously  
   **Answer:** B) When two or more distinct keys hash to the same bucket or address  
   **Explanation:** A collision occurs when the hash function maps two different keys to the same bucket location. Since collisions are statistically inevitable in any hashing scheme, systems must use a collision handling technique to resolve them.

5. **Which of these is a common technique for handling collisions in hash indexing?**
   - A) Ignoring the second key entirely and discarding it
   - B) Chaining (linking colliding records together) or open addressing (probing for the next available slot)
   - C) Automatically deleting the entire bucket
   - D) Converting the hash table into a sorted array  
   **Answer:** B) Chaining (linking colliding records together) or open addressing (probing for the next available slot)  
   **Explanation:** The two main collision handling families are chaining (each bucket holds a linked list of colliding entries) and open addressing (the colliding entry searches for the next free slot using a probing sequence, such as linear or quadratic probing).

6. **How does 'Extendible Hashing' adapt to growing data without rehashing the entire dataset at once?**
   - A) It rehashes and rewrites every single record every time the table grows
   - B) It uses a directory of pointers to buckets, doubling the directory size only when needed, and splitting only the specific overflowing bucket rather than the entire structure
   - C) It deletes old records to make room for new ones
   - D) It does not support growth at all; the bucket count remains fixed forever  
   **Answer:** B) It uses a directory of pointers to buckets, doubling the directory size only when needed, and splitting only the specific overflowing bucket rather than the entire structure  
   **Explanation:** Extendible hashing maintains a directory (an array of pointers to buckets) indexed by some number of bits of the hash value. When a bucket overflows, only that bucket is split, and the directory may double in size — avoiding a full rehash of all existing data.

7. **How does 'Linear Hashing' differ from Extendible Hashing in how it grows the structure?**
   - A) Linear hashing grows by splitting buckets in a predetermined, round-robin order one at a time, without needing a directory of pointers
   - B) Linear hashing requires doubling the entire bucket array immediately whenever any bucket overflows
   - C) Linear hashing and extendible hashing are identical with no differences
   - D) Linear hashing never splits buckets under any circumstances  
   **Answer:** A) Linear hashing grows by splitting buckets in a predetermined, round-robin order one at a time, without needing a directory of pointers  
   **Explanation:** Linear hashing avoids the overhead of a directory structure. Instead, it splits buckets in a fixed, sequential order (controlled by a pointer that cycles through bucket indices) regardless of which specific bucket triggered the overflow, gradually growing the table over time.

8. **What is the average-case time complexity for a search operation using a well-designed hash index with minimal collisions?**
   - A) O(n)
   - B) O(log n)
   - C) O(1)
   - D) O(n log n)  
   **Answer:** C) O(1)  
   **Explanation:** With a good hash function and load factor, most lookups resolve directly to the correct bucket with little to no collision resolution overhead, giving an average-case constant time O(1) — though worst-case behavior can degrade if many keys collide.

9. **Why is hash indexing generally NOT well-suited for range queries (e.g., 'find all records between X and Y')?**
   - A) Hash functions preserve the relative order of keys, making range queries trivial
   - B) Hash functions intentionally scatter keys across buckets without preserving their relative order, so there's no efficient way to locate a contiguous range without scanning broadly
   - C) Range queries are impossible in any database system
   - D) Hash indexes are slower than sequential scans for every single query type  
   **Answer:** B) Hash functions intentionally scatter keys across buckets without preserving their relative order, so there's no efficient way to locate a contiguous range without scanning broadly  
   **Explanation:** A good hash function distributes keys pseudo-randomly to minimize collisions, which is precisely what makes it unsuitable for range queries — neighboring key values may land in completely unrelated buckets, unlike a B+ Tree where sorted order is preserved.

10. **What is a key advantage of Extendible Hashing's directory-doubling approach over a naive 'rehash everything' static hashing growth strategy, in terms of cost distribution?**
   - A) There is no advantage; both approaches have identical cost
   - B) Extendible hashing's directory doubling and single-bucket split amortizes growth cost across many insertions, while a full static rehash incurs one large, disruptive cost spike that touches every existing record
   - C) Extendible hashing requires more total disk space than static hashing in all cases
   - D) Naive rehashing is always faster regardless of dataset size  
   **Answer:** B) Extendible hashing's directory doubling and single-bucket split amortizes growth cost across many insertions, while a full static rehash incurs one large, disruptive cost spike that touches every existing record  
   **Explanation:** When a static hash table needs more buckets, all existing records typically must be rehashed and redistributed — an expensive, disruptive O(n) operation. Extendible hashing instead handles growth incrementally: splitting just the overflowing bucket and doubling only the directory (a much smaller structure), spreading the cost of growth across many individual insertions rather than one large rehash event.

11. **In Linear Hashing, what mechanism allows it to handle bucket overflow before the 'scheduled' split pointer reaches that particular bucket?**
   - A) It is impossible to handle overflow before the scheduled split; the system must always wait
   - B) An overflow chain (linked overflow buckets) is temporarily attached to the overflowing bucket, accepting extra records until the round-robin split pointer eventually reaches and splits that bucket
   - C) The entire table is immediately resized whenever any bucket overflows out of order
   - D) Overflowing records are simply discarded and lost  
   **Answer:** B) An overflow chain (linked overflow buckets) is temporarily attached to the overflowing bucket, accepting extra records until the round-robin split pointer eventually reaches and splits that bucket  
   **Explanation:** Since linear hashing splits buckets in a fixed sequential order rather than reacting immediately to the specific bucket that overflowed, any bucket that overflows out-of-turn temporarily uses an overflow chain. This sacrifices some search performance for those records until the scheduled split pointer eventually reaches and resolves that bucket's overflow.

12. **When designing a hashing scheme for a database index, what trade-off must be considered between minimizing collisions and controlling memory/disk overhead?**
   - A) There is no trade-off; you can simultaneously minimize collisions to zero and use minimal memory in all cases
   - B) A larger number of buckets (lower load factor) reduces collision frequency and improves average lookup speed, but consumes more memory/disk space, even when many buckets remain mostly empty
   - C) Using more buckets always increases collisions
   - D) Memory overhead is irrelevant to hash table design  
   **Answer:** B) A larger number of buckets (lower load factor) reduces collision frequency and improves average lookup speed, but consumes more memory/disk space, even when many buckets remain mostly empty  
   **Explanation:** The load factor (records per bucket) directly affects this trade-off: a low load factor (many buckets relative to records) minimizes collisions and keeps lookups close to O(1), but wastes space on sparsely-filled buckets. A high load factor saves space but increases collision frequency and degrades performance — dynamic hashing schemes try to maintain a good load factor automatically as data grows, balancing this trade-off over time.

</main>
