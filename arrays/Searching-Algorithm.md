---
id: arrys-Searching Algorithms-in-dsa
title: Arrays - Searching Algorithms in DSA
sidebar_label: Searching Algorithms
sidebar_position: 2
description:Searching Algorithms are methods used to find a specific value or condition within a collection of data. They are fundamental in computer science and software development, enabling efficient data retrieval from various data structures. This tutorial will cover two primary searching algorithms: Linear Search and Binary Search.
tags: [dsa, arrays, searching algorithms]
---

<AdsComponent />
Searching Algorithms are methods used to find a specific value or condition within a collection of data. They are fundamental in computer science and software development, enabling efficient data retrieval from various data structures. This tutorial will cover two primary searching algorithms: Linear Search and Binary Search.

##Linear Search
Linear search is the simplest searching algorithm, which checks every element in a list until it finds the target value.

##Algorithm
1. Start from the first element of the array.
2. Compare the current element with the target value.
3. If they match, return the index of the current element.
4. If not, move to the next element.
5. Repeat steps 2-4 until the target is found or the end of the array is reached.
6. If the target is not found, return -1. 

 ##Pseudo Code
```
 procedure binarySearch(A : sorted list of items, target)
    left = 0
    right = length(A) - 1
    while left <= right do
        mid = (left + right) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            left = mid + 1
        else
            right = mid - 1
    end while
    return -1
end procedure
```
##Complexity
- Time Complexity: $O(log n)$
- Space Complexity: $O(1)$
- Stable: No

##Example
```
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // Return index
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // Not found
}
let arr = [1, 2, 3, 4, 5];
console.log(binarySearch(arr, 3)); // 2
function searchDemo() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // Linear Search
  let linearIndex = linearSearch(arr, 5);
  // Binary Search
  let binaryIndex = binarySearch(arr, 5);
  return (
    <div>
        <h3>Searching Algorithms</h3>
        <p><b>Linear Search Index:</b> {linearIndex}</p>
        <p><b>Binary Search Index:</b> {binaryIndex}</p>
    </div>
  )
}
```
##Explanation
In the examples, we have two searching algorithms: Linear Search and Binary Search.

Linear Search checks each element in the array [3, 5, 7, 9, 11] until it finds the target 9, returning its index 3.


##Jump Search
Jump Search is an algorithm that works on sorted arrays. It jumps ahead by a fixed number of steps instead of checking every element sequentially.

 ##Algorithm
1. Define a block size to jump ahead, typically root n
2. Start from the beginning of the array and jump ahead by the block size until the target value is less than or equal to the element at the current index.
3. Perform a linear search within the identified block to find the target.
4. If the target is found, return its index. If not found, return -1.

##Pseudo Code 
```
procedure jumpSearch(A : sorted list of items, target)
    n = length(A)
    step = sqrt(n)
    prev = 0
    while A[min(step, n) - 1] < target do
        prev = step
        step += sqrt(n)
        if prev >= n then
            return -1
    end while
    for i from prev to min(step, n) do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure
```

##Complexity
- Time Complexity: $O(√n)$
- Space Complexity: $O(1)$
- Stable: No

##Example
```
function binarySearch(arr, target, left, right) {
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i *= 2;
  }
  return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length - 1));
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(exponentialSearch(arr, 7)); // 6
```

##Interpolation Search
Interpolation Search is an improvement over binary search for uniformly distributed data. It estimates the position of the target value based on its value.

 ##Algorithm
1.If the array is sorted and the target is within the bounds, calculate the position using the formula.
2.Compare the value at the calculated position with the target.
3.If they match, return the position.
4.If the target is less, adjust the search to the left half.
5.If greater, adjust to the right half.
6.Repeat until the target is found or the bounds cross.

##Pseudo Code 
```
procedure interpolationSearch(A : sorted list of items, target)
    low = 0
    high = length(A) - 1
    while low <= high and target >= A[low] and target <= A[high] do
        pos = low + ((target - A[low]) * (high - low)) / (A[high] - A[low])
        if A[pos] == target then
            return pos
        else if A[pos] < target then
            low = pos + 1
        else
            high = pos - 1
    end while
    return -1
end procedure
```

##Complexity
- Time Complexity: $O(loglogn)$
- Space Complexity: $O(1)$
- Stable: No

##Example
```
function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) return pos;
    else if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}
let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(interpolationSearch(arr, 30)); // 2
function advancedSearchDemo() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let jumpIndex = jumpSearch(arr, 7);
  let exponentialIndex = exponentialSearch(arr, 7);
  let interpolationIndex = interpolationSearch(arr, 7);
  return (
    <div>
      <h3>Advanced Searching Algorithms</h3>
      <p><b>Jump Search Index:</b> {jumpIndex}</p>
      <p><b>Exponential Search Index:</b> {exponentialIndex}</p>
      <p><b>Interpolation Search Index:</b> {interpolationIndex}</p>
    </div>
  )
}
```

##Conclusion
In this tutorial, we explored several important searching algorithms used in data structures and algorithms (DSA):

1. Linear Search:
- A straightforward method that checks each element sequentially.
- Time Complexity: $O(n)$ for unsorted data.
- Suitable for small datasets or unsorted data but inefficient for large datasets.

2. Binary Search:
- A more efficient algorithm that works on sorted arrays, dividing the search range in half.
- Time Complexity: $O(log n)$.
- Requires the dataset to be sorted beforehand, making it very efficient for large datasets.

3.Jump Search:
- An algorithm that jumps ahead by fixed steps to find a target value in a sorted array.
- Time Complexity: $O(√n)$.
- Offers a good compromise between linear search and binary search for sorted arrays.

4. Exponential Search:
- Efficient for unbounded or sorted lists, combining exponential steps to find the range and then using binary search.
- Time Complexity: $O(log n)$.
- Ideal for scenarios where the size of the dataset is unknown.

5. Interpolation Search:
- An improvement over binary search for uniformly distributed data, estimating the position of the target.
- Time Complexity: $O(log log n)$ for uniformly distributed datasets.
- Can be less effective on non-uniform datasets, making it important to assess the data characteristics.
