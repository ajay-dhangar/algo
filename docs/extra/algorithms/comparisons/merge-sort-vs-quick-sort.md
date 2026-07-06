---
id: merge-sort-vs-quick-sort
title: Merge Sort vs Quick Sort
sidebar_label: Merge Sort vs Quick Sort
sidebar_position: 2
description: Understanding the differences, complexities, and optimal use cases for Merge Sort and Quick Sort.
tags: [comparison, sorting, merge-sort, quick-sort]
---

Both Merge Sort and Quick Sort are highly efficient, comparison-based sorting algorithms that utilize the **Divide and Conquer** paradigm.

## Comparison Table

### Variables:
* $N$: Number of elements to be sorted

| Feature | Merge Sort | Quick Sort |
| --- | --- | --- |
| **Average Complexity** | $O(N \log N)$ | $O(N \log N)$ |
| **Worst-Case Complexity** | $O(N \log N)$ | $O(N^2)$ (when pivot is poorly chosen) |
| **Space Complexity** | $O(N)$ (requires auxiliary array) | $O(\log N)$ auxiliary on average (recursive stack); worst-case $O(N)$ for skewed recursion |
| **Stability** | Stable (preserves relative order) | Unstable (does not preserve relative order) |
| **Sort Method** | Out-of-place | In-place |
| **Preferred for** | Linked Lists, Large Datasets. | Arrays, RAM-sensitive environments. |

## How They Work

### Merge Sort

Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves.

```mermaid
graph TD
    A["[38, 27, 43, 3]"] --> B["[38, 27]"]
    A --> C["[43, 3]"]
    B --> D["[38]"]
    B --> E["[27]"]
    C --> F["[43]"]
    C --> G["[3]"]
    D & E --> H["[27, 38]"]
    F & G --> I["[3, 43]"]
    H & I --> J["[3, 27, 38, 43]"]
```

### Quick Sort

Quick Sort selects a 'pivot' element, partitions the array around the pivot such that smaller elements go left and larger ones go right, then recursively sorts the partitions.

## Decision Criteria

* **Choose Merge Sort** when stability is required (e.g., sorting database records by one field then another) or when sorting linked lists where pointer manipulation makes merging cheap.
* **Choose Quick Sort** when space is premium. It is typically faster in practice than Merge Sort due to better cache locality and lower constant factors.
