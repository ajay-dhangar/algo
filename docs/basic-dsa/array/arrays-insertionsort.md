---
id: arrays-insertionsort
title: Arrays - Insertion Sort
sidebar_label: Insertion Sort
sidebar_position: 4
description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort."
tags: [dsa, arrays, sorting, insertion-sort, sorting-algorithms]
---

**Insertion Sort** is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. 

However, insertion sort provides several advantages:

- **Simple implementation:** The code implementation of insertion sort is simple and easy to understand.
- **Efficient for small data sets:** Insertion sort is efficient for small data sets.
- **Adaptive:** It is adaptive, meaning it is efficient for data sets that are already substantially sorted.
- **Stable:** It is a stable sorting algorithm, meaning it preserves the relative order of equal elements.
- **In-place:** It requires only a constant amount of additional memory space.
- **Online:** It can sort a list as it receives it.
- **More efficient in practice:** It is more efficient in practice than other quadratic-time sorting algorithms like bubble sort and selection sort.
- **Simple to code:** It is simple to code and implement.

<InsertionSortVisualization />

<br />

The insertion sort algorithm takes value at a time from the unsorted part and places it in its correct position in the sorted part. The sorted part is built from left to right, and the unsorted part is on the right side of the array. The algorithm works by shifting the elements in the sorted part that are greater than the current element to the right, creating space for the current element to be inserted.

:::info Key Points
- **Type:** Sorting Algorithm
- **Time Complexity:**
  - **Best Case:** $O(n)$
  - **Average Case:** $O(n^2)$
  - **Worst Case:** $O(n^2)$
- **Space Complexity:** $O(1)$
- **Stable:** Yes
- **In-Place:** Yes
- **Online:** Yes
- **Adaptive:** Yes
- **Comparison Sort:** Yes
- **Suitable for:** Small data sets, partially sorted data sets
- **Efficient for:** Small data sets
- **Not efficient for:** Large data sets
- **Simple to code:** Yes
- **Efficient in practice:** Yes

:::

:::tip Real-World Analogy
Insertion sort can be compared to sorting a deck of cards. You start with an empty hand and pick one card at a time from the deck. You then insert the card into its correct position in your hand, shifting the other cards if necessary. This process is repeated until all the cards are sorted in your hand.

## How Insertion Sort Works?

Let's understand how the Insertion Sort algorithm works with an example:

Consider an array `arr = [12, 11, 13, 5, 6]` that we want to sort in ascending order using the Insertion Sort algorithm.

1. **Initial Array:** `[12, 11, 13, 5, 6]`
2. **Step 1:** Start from the second element (index 1) and compare it with the previous element.
   - Compare `11` with `12`. Since `11` is smaller, swap them.
   - **Array after Step 1:** `[11, 12, 13, 5, 6]`
   - The array is partially sorted from index 0 to 1.
   - The current array looks like this: `[11, 12, 13, 5, 6]`
   - The sorted part is `[11, 12]`, and the unsorted part is `[13, 5, 6]`.
   - The key element is `13`.
   - The key element is compared with the elements in the sorted part.
   - Since `13` is greater than `12`, no swap is needed.
   - The array remains the same: `[11, 12, 13, 5, 6]`
   - The array is partially sorted from index 0 to 2.
   - The current array looks like this: `[11, 12, 13, 5, 6]`
   - The sorted part is `[11, 12, 13]`, and the unsorted part is `[5, 6]`.
   - The key element is `5`.
   - The key element is compared with the elements in the sorted part.
   - Since `5` is smaller than `13`, `12`, and `11`, it is moved to the left.
   - **Array after Step 1:** `[5, 11, 12, 13, 6]`
   - The array is partially sorted from index 0 to 3.
   - The current array looks like this: `[5, 11, 12, 13, 6]`
   - The sorted part is `[5, 11, 12, 13]`, and the unsorted part is `[6]`.
   - The key element is `6`.
   - The key element is compared with the elements in the sorted part.
   - Since `6` is smaller than `13`, it is moved to the left.
   - Since `6` is smaller than `12`, it is moved to the left.
   - Since `6` is smaller than `11`, it is moved to the left.
   - **Array after Step 1:** `[5, 6, 11, 12, 13]`
   - The array is now sorted.
   - The sorted array is `[5, 6, 11, 12, 13]`.

3. **Final Sorted Array:** `[5, 6, 11, 12, 13]`
4. The array is now sorted in ascending order using the Insertion Sort algorithm.
5. The time complexity of the Insertion Sort algorithm is ***O(n<sup>2</sup>)*** in the worst-case scenario.
6. The space complexity of the Insertion Sort algorithm is ***O(1)***.
7. The Insertion Sort algorithm is efficient for small data sets and partially sorted data sets.

## Visualization

You can visualize the Insertion Sort algorithm using the following animation:

  <InsertionSortVisualization />

You can select the Insertion Sort algorithm from the drop-down menu and visualize how it works on different arrays.

:::

## Algorithm

The insertion sort algorithm works as follows:

1. Start from the second element (index 1) and compare it with the previous elements.
2. If the current element is smaller than the previous element, swap them.
3. Repeat this process until the current element is greater than the previous element or until the first element is reached.
4. Move to the next element and repeat the process.
5. Continue this process until the entire array is sorted.
6. The array is now sorted.
7. The time complexity of the insertion sort algorithm is ***O(n<sup>2</sup>)*** in the worst-case scenario.
8. The space complexity of the insertion sort algorithm is ***O(1)***.

## Pseudocode

```plaintext
1. for i = 1 to n-1
2.     key = arr[i]
3.     j = i - 1
4.     while j >= 0 and arr[j] > key
5.         arr[j + 1] = arr[j]
6.         j = j - 1
7.     arr[j + 1] = key
```

## Implementation

Here's the implementation of the Insertion Sort algorithm in JavaScript:

```javascript title="Insertion Sort"
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

const arr = [12, 11, 13, 5, 6];
console.log(insertionSort(arr)); // Output: [5, 6, 11, 12, 13]
```

## Complexity Analysis

The time complexity of the Insertion Sort algorithm is ***O(n<sup>2</sup>)*** in the worst-case scenario when the array is sorted in reverse order. The best-case time complexity is ***O(n)*** when the array is already sorted.

The space complexity of the Insertion Sort algorithm is ***O(1)*** since it requires only a constant amount of additional memory space.

## References

- [Wikipedia - Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort)
- [GeeksforGeeks - Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
- [Programiz - Insertion Sort](https://www.programiz.com/dsa/insertion-sort)
- [Khan Academy - Insertion Sort](https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/a/insertion-sort)
- [TutorialsPoint - Insertion Sort](https://www.tutorialspoint.com/data_structures_algorithms/insertion_sort_algorithm.htm)
- [StudyTonight - Insertion Sort](https://www.studytonight.com/data-structures/insertion-sorting)
- [Insertion Sort Visualization](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)
