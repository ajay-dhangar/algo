---
id: arrays-selectionsort-in-dsa
title: Arrays - Selection Sort in DSA
sidebar_label: Selection Sort
sidebar_position: 3
description: "Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part. The algorithm maintains two subarrays in a given array. The subarray which is already sorted and the remaining subarray which is unsorted. In every iteration of selection sort, the minimum element from the unsorted subarray is picked and moved to the sorted subarray."
tags: [dsa, arrays, sorting, selection-sort, algorithm of selection-sort, pseudocode of selection-sort, complexity of selection-sort, example of selection-sort, live example of selection-sort, explanation of selection-sort, quiz of selection-sort, conclusion of selection-sort]
---

**Selection Sort** is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part. The algorithm maintains two subarrays in a given array. The subarray which is already sorted and the remaining subarray which is unsorted. In every iteration of selection sort, the minimum element from the unsorted subarray is picked and moved to the sorted subarray.

<SelectionSortVisualization />

## Algorithm

1. The selection sort algorithm divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.
2. The algorithm repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.
3. The algorithm maintains two subarrays in a given array. The subarray which is already sorted and the remaining subarray which is unsorted.
4. In every iteration of selection sort, the minimum element from the unsorted subarray is picked and moved to the sorted subarray.
5. The array is sorted.
6. Exit.
7. The time complexity of the selection sort is O(n^2).
8. The space complexity of the selection sort is O(1).

## Pseudocode

```plaintext title="Selection Sort"
procedure selectionSort( A : list of sortable items )
    n = length(A)
    for i = 0 to n-1 inclusive do
        min = i
        for j = i+1 to n inclusive do
            if A[j] < A[min] then
                min = j
            end if
        end for
        swap(A[i], A[min])
    end for
end procedure
```

## Diagram


## Complexity

The time complexity of the selection sort is O(n^2). The space complexity of the selection sort is O(1).

## Example

```js title="Selection Sort"
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}

const arr = [64, 25, 12, 22, 11];

console.log(selectionSort(arr)); // [11, 12, 22, 25, 64]
```

## Practice Problems

- [Leetcode - Sort an Array](https://leetcode.com/problems/sort-an-array/)
- [HackerRank - The Full Counting Sort](https://www.hackerrank.com/challenges/countingsort4/problem)
- [Codeforces - Sort the Array](https://codeforces.com/problemset/problem/451/B)
- [CodeChef - Turbo Sort](https://www.codechef.com/problems/TSORT)

## Quiz

1. What is the time complexity of the selection sort?
   - A) O(n)
   - B) O(n^2)
   - C) O(n log n)
   - D) O(1)
 - Correct Answer: B

2. What is the space complexity of the selection sort?
   - A) O(n)
   - B) O(n^2)
   - C) O(n log n)
   - D) O(1)
 - Correct Answer: D
- Explanation: The space complexity of the selection sort is O(1).

3. What is the best-case time complexity of the selection sort?
   - A) O(n)
   - B) O(n^2)
   - C) O(n log n)
   - D) O(1)
 - Correct Answer: B

4. What is the worst-case time complexity of the selection sort?
   - A) O(n)
   - B) O(n^2)
   - C) O(n log n)
   - D) O(1)
   - Correct Answer: B

5. Is the selection sort stable?
    - A) Yes
    - B) No
     - Correct Answer: A


:::info Try it yourself

```js live
function selectionSort() {
  let arr = [64, 25, 12, 22, 11];
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return (
    <div>
        <h3>Selection Sort</h3>
        <p><b>Array:</b> [64, 25, 12, 22, 11]</p>
        <p>
            <b>Sorted Array:</b> [{arr.join(", ")}]
        </p>
    </div>
  )
}
```     

In the above example, we have an array of numbers `[64, 25, 12, 22, 11]`. We are using the selection sort algorithm to sort the array in ascending order. The selection sort algorithm divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part. The algorithm maintains two subarrays in a given array. The subarray which is already sorted and the remaining subarray which is unsorted. In every iteration of selection sort, the minimum element from the unsorted subarray is picked and moved to the sorted subarray. The sorted array is `[11, 12, 22, 25, 64]`. The time complexity of the selection sort is O(n^2) and the space complexity is O(1).

:::

## Conclusion 

In this article, we learned about the selection sort algorithm. Selection sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part. The algorithm maintains two subarrays in a given array. The subarray which is already sorted and the remaining subarray which is unsorted. In every iteration of selection sort, the minimum element from the unsorted subarray is picked and moved to the sorted subarray. The time complexity of the selection sort is O(n^2) and the space complexity is O(1). Selection sort is a stable sorting algorithm.   