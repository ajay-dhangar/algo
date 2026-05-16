---
id: binary-search-dsa
sidebar_position: 1
title: Binary Search
sidebar_label: Binary Search
description: "In this blog post, we'll dive into the binary search algorithm, a fundamental technique in computer science for efficiently finding an element in a sorted array."
tags: [dsa, algorithms, binary search]
---


## Introduction
Binary search is a searching algorithm, used to search for an element in an array. It follows a unique approach which reduces the time complexity as compared to linear search. However, to use binary search, the array must be sorted. 

## Implementation

Let us see how to implement binary search in Java:

```java
        //let element to be found=target
		int low=0;
		int high=n-1; //where n is the length of the sorted array
        int mid; //represents the mid index of the array

        int flag=0; //element not yet found 

		while(low<=high) {

			mid=(low + high)/2;
			if(arr[mid]==target) {
				flag=1; //element found
				System.out.println("Target found!");
				break;
			}
			else if(arr[mid]<target) {
                // which means target is to the right of mid element
				low=mid+1;
			}
			else {
                //target is to the left of mid element
				high=mid-1;
			}
			
		}

		if(flag==0) {
			System.out.println("Target not found!");
		}
```
## Implementation

Let us see how to implement binary search in javascript:

```javascript
function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let flag = false; // element not yet found

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            flag = true; // element found
            console.log("Target found!");
            break;
        } else if (arr[mid] < target) {
            // target is to the right of mid element
            low = mid + 1;
        } else {
            // target is to the left of mid element
            high = mid - 1;
        }
    }

    if (!flag) {
        console.log("Target not found!");
    }
}

// Example usage
let arr = [1, 3, 5, 7, 9, 11];
let target = 7;
binarySearch(arr, target);

```

In this algorithm, the searching interval of the array is divided into half at every iteration until the target is found. This results in lesser comparisions and decreases the time required.

## Dry Run Example

Consider the following sorted array:

```text
arr = [1, 3, 5, 7, 9]
target = 7
```

We will use Binary Search to find the target element step by step.

### Iteration 1
- low = 0
- high = 4
- mid = (0 + 4) / 2 = 2
- arr[mid] = 5

Since `5 < 7`, we search in the right half of the array.

### Iteration 2
- low = 3
- high = 4
- mid = (3 + 4) / 2 = 3
- arr[mid] = 7

The target element `7` is found at index `3`.

### Final Output

```text
Target found at index 3
```

### Why Binary Search is Efficient

Binary Search reduces the search space by half in every iteration, making it much faster than Linear Search for large sorted arrays.

- Time Complexity: O(log n)
- Space Complexity: O(1)

## Advantages of Binary Search

- Binary Search is much faster than Linear Search for large datasets.
- It reduces the search space by half in every step.
- Efficient for searching in sorted arrays.
- Widely used in competitive programming and real-world applications.

## Real-World Applications

- Searching contacts in a phonebook
- Searching words in a dictionary
- Database indexing
- Finding elements in large sorted datasets
- Used in many search-based applications

## Time complexity:

Linear/Sequential search: O(n)<br />
Binary search : O(log n)

## Points to Remember:

- Binary search requires a sorted array.
- Works for 1 dimensional arrays.
- Faster and complex than sequential search.
- Uses the divide and conquer approach.
- Best if arrays are too long (large datasets).
