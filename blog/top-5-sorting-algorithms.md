---
slug: top-5-sorting-algorithms
title: 'Top 5 Sorting Algorithms'
authors: [Aswani-Bolisetti]
tags: [sorting, algorithms, dsa, bubble-sort, merge-sort, quick-sort]
---

Sorting is a fundamental operation in computer science, crucial for 
efficiently organizing and retrieving data. Here are the top 5 sorting 
algorithms you should know about.

<!-- truncate -->

## 1. Bubble Sort

**Time Complexity:** O(n²)

Bubble Sort repeatedly steps through the list, compares adjacent elements, 
and swaps them if they are in the wrong order until the list is sorted.

**Use Case:** Best used when the input list is small or nearly sorted.

## 2. Selection Sort

**Time Complexity:** O(n²)

Selection Sort divides the list into a sorted and unsorted section. It 
repeatedly selects the smallest element from the unsorted section and 
moves it to the end of the sorted section.

**Use Case:** Good for small lists, but inefficient for larger datasets.

## 3. Insertion Sort

**Time Complexity:** O(n²) worst case, O(n) when nearly sorted

Insertion Sort builds the sorted list one element at a time, inserting 
each element into its correct position within the sorted part of the array.

**Use Case:** Best for small or mostly sorted datasets. Great for 
real-time applications like sorting cards by hand.

## 4. Merge Sort

**Time Complexity:** O(n log n)

Merge Sort is a divide-and-conquer algorithm. It splits the list into 
smaller sublists, sorts them, and merges them back together.

**Use Case:** Great for large datasets where stability (preserving 
relative order of equal elements) is important.

## 5. Quick Sort

**Time Complexity:** O(n log n) average, O(n²) worst case

Quick Sort selects a pivot element and partitions the array — elements 
smaller than the pivot go left, greater go right. It recursively sorts 
the sub-arrays.

**Use Case:** Widely used due to its average-case efficiency. Highly 
efficient for large datasets.

## Conclusion

Algorithms like Merge Sort and Quick Sort offer better performance for 
larger datasets, while Bubble Sort, Selection Sort, and Insertion Sort 
are simpler and suitable for smaller datasets. Understanding these 
algorithms helps in optimizing the performance of data-intensive applications.