---
title: External Hashing Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">External Hashing Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What distinguishes 'External Hashing' from standard in-memory hashing?**
   - A) External hashing only works with text files, never with numeric data
   - B) External hashing is designed for data stored on disk, organizing records into disk-block-sized buckets rather than assuming everything fits in memory
   - C) External hashing does not use a hash function at all
   - D) External hashing is identical to in-memory hashing with no practical differences  
   **Answer:** B) External hashing is designed for data stored on disk, organizing records into disk-block-sized buckets rather than assuming everything fits in memory  
   **Explanation:** External hashing extends hashing concepts to disk-resident data, where buckets are sized to align with disk blocks. This minimizes the number of disk I/O operations needed to locate or store a record, which is the primary performance bottleneck for on-disk structures.

2. **What is a 'Bucket' in the context of external hashing?**
   - A) A temporary in-memory cache that is never written to disk
   - B) A unit of storage, typically the size of one or more disk blocks, that holds multiple records hashed to the same location
   - C) A single record stored anywhere on disk
   - D) An index entry that points to the root of a B-Tree  
   **Answer:** B) A unit of storage, typically the size of one or more disk blocks, that holds multiple records hashed to the same location  
   **Explanation:** A bucket in external hashing corresponds to one or more disk blocks. The hash function maps a key to a specific bucket, and that entire bucket (potentially containing multiple records) is read or written as a unit during disk I/O.

3. **Why does external hashing organize data into disk-block-aligned buckets rather than individual disk-addressed records?**
   - A) Because disk I/O is performed in block-sized units, so aligning buckets with blocks minimizes the number of I/O operations needed per access
   - B) Because disk drives cannot read individual records under any circumstances
   - C) Block alignment has no effect on performance
   - D) Because hash functions require block-sized inputs to function correctly  
   **Answer:** A) Because disk I/O is performed in block-sized units, so aligning buckets with blocks minimizes the number of I/O operations needed per access  
   **Explanation:** Disk drives read and write data in fixed-size blocks regardless of how much of that block is actually needed. By sizing buckets to match block boundaries, external hashing ensures that retrieving a bucket requires only a single disk I/O operation.

4. **What happens when a bucket in external hashing becomes full and a new record needs to be inserted into it?**
   - A) The new record is automatically discarded
   - B) An overflow block is allocated and linked to the original bucket, holding records that exceed the bucket's primary capacity
   - C) The entire database is shut down for maintenance
   - D) The record is converted into a different data type  
   **Answer:** B) An overflow block is allocated and linked to the original bucket, holding records that exceed the bucket's primary capacity  
   **Explanation:** When a primary bucket reaches capacity, external hashing schemes typically chain an overflow block to it. The new record is placed in this overflow block, which is linked from the primary bucket — though excessive overflow chaining degrades performance, similar to ISAM's overflow pages.

5. **What is the main performance goal of external hashing, given that disk I/O is much slower than memory access?**
   - A) Minimizing the number of disk block accesses required to locate or store a record
   - B) Maximizing the number of disk reads performed per query
   - C) Ensuring every record requires a full disk scan
   - D) Avoiding the use of any indexing structures whatsoever  
   **Answer:** A) Minimizing the number of disk block accesses required to locate or store a record  
   **Explanation:** Since each disk I/O operation is orders of magnitude slower than an in-memory operation, external hashing is specifically designed to compute a record's likely bucket and retrieve it in as few disk block reads as possible — ideally just one.

6. **How does the choice of bucket size in external hashing affect the trade-off between space utilization and overflow frequency?**
   - A) Bucket size has no effect on either space utilization or overflow
   - B) Larger buckets reduce overflow frequency (more room per bucket) but may waste space if buckets are often underfilled; smaller buckets use space more precisely but overflow more frequently under uneven data distribution
   - C) Bucket size only affects in-memory hashing, never external/disk-based hashing
   - D) Smaller buckets always perform strictly better than larger buckets in every case  
   **Answer:** B) Larger buckets reduce overflow frequency (more room per bucket) but may waste space if buckets are often underfilled; smaller buckets use space more precisely but overflow more frequently under uneven data distribution  
   **Explanation:** Bucket size is a tunable trade-off: larger buckets tolerate more keys hashing to the same location before overflowing, but consume more space per bucket (especially if many buckets are sparsely filled). Smaller buckets are more space-efficient on average but are more prone to overflow when key distribution isn't perfectly uniform.

7. **What is a key disadvantage of excessive overflow chaining in external hashing, in terms of disk I/O cost?**
   - A) There is no disadvantage; overflow chains are always resolved in a single disk access
   - B) Each additional overflow block in a chain requires a separate disk access to traverse, so a long overflow chain can turn what should be a single-I/O lookup into multiple sequential disk reads
   - C) Overflow chains automatically convert into B-Trees to avoid this problem
   - D) Overflow chaining eliminates the need for a hash function entirely  
   **Answer:** B) Each additional overflow block in a chain requires a separate disk access to traverse, so a long overflow chain can turn what should be a single-I/O lookup into multiple sequential disk reads  
   **Explanation:** The core efficiency goal of external hashing — one disk access per lookup — breaks down when overflow chains grow long, since each overflow block typically resides at a different disk location, requiring an additional I/O operation to follow each link in the chain.

8. **How can extendible or linear hashing techniques specifically benefit external (disk-based) hashing systems?**
   - A) They provide no benefit to disk-based systems; they only apply to in-memory structures
   - B) By dynamically growing the number of buckets as data increases, they reduce the likelihood and length of overflow chains, keeping average disk I/O per lookup closer to the ideal single access
   - C) They guarantee that overflow chaining will never occur under any circumstances
   - D) They eliminate the need for bucket-based storage entirely  
   **Answer:** B) By dynamically growing the number of buckets as data increases, they reduce the likelihood and length of overflow chains, keeping average disk I/O per lookup closer to the ideal single access  
   **Explanation:** Applying dynamic hashing schemes (extendible or linear hashing) to external/disk-based storage allows the bucket count to scale with data volume, which directly reduces overflow chain length and helps preserve the near-single-I/O performance that makes hashing attractive for disk storage.

9. **Why is choosing a hash function with good 'uniformity' (even key distribution across buckets) especially critical in external hashing compared to in-memory hashing?**
   - A) Uniformity doesn't matter for external hashing since disk space is unlimited
   - B) Because uneven distribution causes some buckets to overflow heavily (triggering extra costly disk I/O for overflow chains) while others remain underutilized, and disk I/O penalties are far more severe than in-memory access penalties
   - C) External hashing never uses a hash function, so uniformity is irrelevant
   - D) Uniformity only matters when using static hashing, never with dynamic hashing  
   **Answer:** B) Because uneven distribution causes some buckets to overflow heavily (triggering extra costly disk I/O for overflow chains) while others remain underutilized, and disk I/O penalties are far more severe than in-memory access penalties  
   **Explanation:** While poor hash distribution is undesirable in any hashing scheme, its consequences are magnified in external hashing: an overflowing bucket means additional disk I/O (orders of magnitude slower than memory access), making uniform key distribution a much higher-stakes design consideration for disk-based systems.

10. **In a distributed database system using external hashing across multiple disk-based storage nodes, what additional challenge arises when the system needs to dynamically add or remove storage nodes?**
   - A) There is no additional challenge; hashing automatically redistributes across all nodes without any data movement
   - B) A naive hash function would require most of the data to be relocated and rehashed across nodes whenever the node count changes; techniques like consistent hashing minimize this disruption
   - C) Distributed external hashing is functionally identical to single-disk external hashing with no added complexity
   - D) Adding or removing nodes is impossible once data has been hashed  
   **Answer:** B) A naive hash function would require most of the data to be relocated and rehashed across nodes whenever the node count changes; techniques like consistent hashing minimize this disruption  
   **Explanation:** A simple modulo-based hash (key % number_of_nodes) would cause nearly all keys to map to different nodes whenever the node count changes, triggering massive data movement. Consistent hashing addresses this by ensuring that adding or removing a node only affects a small, bounded fraction of keys, making it the standard approach for distributed hashing-based storage systems.

11. **How might a hybrid approach combining external hashing with a secondary structure (e.g., a small in-memory B+ Tree cache of frequently accessed buckets) improve overall system performance?**
   - A) Hybrid approaches provide no measurable benefit over pure hashing or pure tree-based approaches
   - B) Frequently accessed buckets can be cached in memory, avoiding repeated disk I/O for hot data, while the on-disk hash structure still efficiently handles the long tail of less-frequently accessed records
   - C) Combining structures always doubles the storage requirements with no performance benefit
   - D) Hybrid approaches are only theoretical and have no practical real-world application  
   **Answer:** B) Frequently accessed buckets can be cached in memory, avoiding repeated disk I/O for hot data, while the on-disk hash structure still efficiently handles the long tail of less-frequently accessed records  
   **Explanation:** Many real-world database systems use exactly this kind of hybrid: an in-memory cache (sometimes structured as a tree or simple LRU map) absorbs the most frequent lookups, dramatically reducing average disk I/O, while the underlying external hash structure remains responsible for the complete dataset, handling cache misses with its normal bucket-based access pattern.

12. **When analyzing the performance of external hashing under a heavy insertion workload with overflow chaining, what is the relationship between load factor and expected disk I/O count per operation?**
   - A) Load factor has no measurable relationship to disk I/O count
   - B) As load factor (ratio of records to total bucket capacity) increases, the expected number of overflow blocks per chain grows, increasing the expected number of disk I/O operations needed per insertion or lookup
   - C) Disk I/O count always remains exactly 1 regardless of load factor
   - D) Increasing load factor always decreases the number of disk I/O operations required  
   **Answer:** B) As load factor (ratio of records to total bucket capacity) increases, the expected number of overflow blocks per chain grows, increasing the expected number of disk I/O operations needed per insertion or lookup  
   **Explanation:** Load factor directly correlates with overflow chain length: as more records compete for the same fixed bucket capacity, overflow blocks accumulate, and each one adds a potential extra disk I/O to traverse during a lookup or insertion. This is precisely why dynamic hashing schemes monitor and control load factor — keeping it within a target range preserves the near-O(1) disk I/O performance external hashing aims to provide.

</main>
