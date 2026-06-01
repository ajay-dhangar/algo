---
slug: practical-applications-of-recursion
title: Practical Applications of Recursion in Algorithms
authors: [AKSHITHA-CHILUKA]
tags: [AKSHITHA-CHILUKA , algo, dsa, algorithms, recursion]
---

Recursion is more than just a theoretical concept; it has numerous practical applications across various algorithms. Understanding these applications can greatly enhance your programming skills.

<!-- truncate -->

In this blog, we’ll discuss:

- **Sorting Algorithms**: How recursion is used in sorting.
- **Searching Algorithms**: The role of recursion in searching.
  
---

## Sorting Algorithms

### Quick Sort

Quick Sort is a recursive sorting algorithm that works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

#### Example: Quick Sort

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  while (low < high) {
    const pi = partition(arr, low, high);
    if (pi - low < high - pi) {
      quickSort(arr, low, pi - 1);
      low = pi + 1;
    } else {
      quickSort(arr, pi + 1, high);
      high = pi - 1;
    }
  }
  return arr;
}

function medianOfThree(arr, low, high) {
  const mid = low + Math.floor((high - low) / 2);
  if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
  [arr[mid], arr[high]] = [arr[high], arr[mid]];
  return arr[high];
}

function partition(arr, low, high) {
  const pivot = medianOfThree(arr, low, high);
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```
# Searching Algorithms
## Binary Search
Binary Search is a classic example of recursion in searching algorithms. It divides the search interval in half repeatedly until the target value is found.

#### Example: Binary Search
```javacsript
function binarySearch(arr, target) {
  function search(low, high) {
    if (low > high) return -1;
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    return arr[mid] > target ? search(low, mid - 1) : search(mid + 1, high);
  }
  return search(0, arr.length - 1);
}
```
## Conclusion
Recursion is a powerful tool that finds applications in various sorting and searching algorithms. Mastering these practical uses can elevate your algorithmic skills.
