---
id: arrays-shellsort
title: Arrays - Shell Sort in DSA
sidebar_label: Shell Sort
description: "Shell Sort is a generalization of insertion sort that allows the exchange of far-apart elements. It uses a gap sequence to progressively reduce the gap and efficiently sort the array. It offers improved performance compared to simple sorting algorithms with O(n log n) to O(n log² n) time complexity."
tags: [dsa, arrays, sorting, shell-sort, algorithm of shell-sort, pseudocode of shell-sort, complexity of shell-sort, example of shell-sort, live example of shell-sort, explanation of shell-sort, conclusion of shell-sort]
---

<AdsComponent />

**Shell Sort** is a generalization of insertion sort that allows the exchange of elements that are far apart from each other. It starts with a large gap between compared elements and progressively reduces the gap, eventually performing a standard insertion sort when the gap is 1. This approach significantly improves the efficiency of insertion sort, especially for larger datasets, making it a practical choice for moderate-sized arrays.

<ShellSortVisualisation />

## Algorithm

1. Choose an initial gap value (typically n/2, where n is the array length).
2. Perform a gapped insertion sort using the current gap:
   - Compare elements that are gap positions apart
   - Swap them if they are in the wrong order
   - Move to the next element and repeat
3. Reduce the gap (typically by dividing by 2).
4. Repeat steps 2-3 until the gap becomes 1.
5. When gap is 1, perform a final insertion sort.
6. The array is now sorted.

## Pseudocode

```plaintext title="Shell Sort"
procedure shellSort(arr, size)
    for gap = size / 2; gap > 0; gap = gap / 2 do
        for i = gap; i < size; i = i + 1 do
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp do
                arr[j] = arr[j - gap]
                j = j - gap
            end while
            arr[j] = temp
        end for
    end for
end procedure
```

<AdsComponent />

## Diagram

```mermaid
graph TD
    A([Start]) --> B["Set gap = n/2"]
    B --> C["Perform gapped insertion sort"]
    C --> D{Elements sorted for gap?}
    D -->|No| C
    D -->|Yes| E["Reduce gap by half"]
    E --> F{gap = 1?}
    F -->|No| C
    F -->|Yes| G["Final insertion sort"]
    G --> H(["Sorted Array"])
```

## Example

```js title="Shell Sort"
function shellSort(arr) {
  const n = arr.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
  }
  
  return arr;
}

let arr = [64, 34, 25, 12, 22, 11, 90];
console.log(shellSort(arr)); // [ 11, 12, 22, 25, 34, 64, 90 ]
```

## Complexity

- **Time Complexity**: Depends on gap sequence
  - Best Case: O(n log n)
  - Average Case: O(n log² n)
  - Worst Case: O(n²)
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stable**: No - can disrupt the relative order of equal elements

## Live Example

```js live
function shellSort() {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const n = arr.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
  }
  
  return (
    <div>
      <h3>Shell Sort</h3>
      <p><b>Array:</b> [64, 34, 25, 12, 22, 11, 90]</p>
      <p>
        <b>Sorted Array:</b> [{arr.join(", ")}]
      </p>
    </div>
  )
}
```

## Explanation

In the above example, we have an array of numbers `[64, 34, 25, 12, 22, 11, 90]`. We use the shell sort algorithm to sort the array in ascending order. The algorithm works by first comparing and sorting elements that are far apart (using a gap), then progressively reducing the gap until the entire array is sorted with gap = 1 (which is essentially insertion sort). This approach moves elements towards their correct position faster than standard insertion sort. The sorted array is `[11, 12, 22, 25, 34, 64, 90]`.

:::info Try it yourself
Change the array values and see how the shell sort algorithm sorts the array using different gap sequences.
:::

<AdsComponent />

:::tip 📝 Note
Shell Sort is an efficient general-purpose sorting algorithm that bridges the gap between simple quadratic algorithms and more complex divide-and-conquer approaches.

The main advantage of shell sort is that it requires only O(1) extra space and performs significantly better than insertion sort for larger datasets with an average-case complexity of O(n log² n).

The performance of shell sort heavily depends on the choice of gap sequence. Different sequences like Shell's original (n/2, n/4, ..., 1), Hibbard's sequence (1, 3, 7, 15, ..., 2ⁿ-1), and Sedgewick's sequence offer different performance characteristics.

Shell sort is particularly useful when memory is limited, as it is an in-place algorithm. However, it is not stable, so it may not preserve the relative order of equal elements.

:::

## Gap Sequences

- **Shell's Original**: n/2, n/4, ..., 1 (simplest but not optimal)
- **Hibbard's**: 1, 3, 7, 15, 31, ..., 2ⁿ-1 (better average performance)
- **Sedgewick's**: More complex formula providing excellent performance for large arrays

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Shellsort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/shellsort/)
- [Programiz](https://www.programiz.com/dsa/shell-sort)
- [TutorialsPoint](https://www.tutorialspoint.com/data_structures_algorithms/shell_sort_algorithm.htm)
- [StudyTonight](https://www.studytonight.com/data-structures/shell-sort)

## Related

Insertion Sort, Bubble Sort, Quick Sort, Merge Sort, Heap Sort, etc.

<AdsComponent />

## Quiz

1. What is the average-case time complexity of shell sort?
   - [ ] O(n)
   - [ ] O(n log n)
   - [x] O(n log² n)     ✔
   - [ ] O(n²)

2. Is shell sort a stable sorting algorithm?
   - [ ] Yes
   - [x] No    ✔
   - [ ] Maybe
   - [ ] Not sure

3. What is the space complexity of shell sort?
   - [x] O(1)   ✔
   - [ ] O(n)
   - [ ] O(log n)
   - [ ] O(n²)

4. What does the "gap" represent in shell sort?
   - [x] The distance between elements being compared     ✔
   - [ ] The number of passes through the array
   - [ ] The pivot element
   - [ ] The sorted portion of the array

5. How is the gap reduced in the original shell sort algorithm?
   - [ ] Subtract 1 each time
   - [x] Divide by 2 each time     ✔
   - [ ] Divide by 3 each time
   - [ ] Use a fixed sequence

## Conclusion

In this tutorial, we learned about the shell sort algorithm. We discussed how it extends insertion sort through the use of gap sequences, explored different gap strategies, and analyzed its time and space complexity. Shell sort is a versatile algorithm that offers a good balance between simplicity and efficiency, making it suitable for moderate-sized datasets and memory-constrained environments. Feel free to share your thoughts in the comments below.
