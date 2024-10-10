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

In this algorithm, the searching interval of the array is divided into half at every iteration until the target is found. This results in lesser comparisions and decreases the time required.

## Time complexity:

Linear/Sequential search: O(n)<br />
Binary search : O(log n)

## Points to Remember:

- Binary search requires a sorted array.
- Works for 1 dimensional arrays.
- Faster and complex than sequential search.
- Uses the divide and conquer approach.
- Best if arrays are too long (large datasets).
