---
id: counting-sort
title: Counting Sort Algorithm
sidebar_label: Counting sort
sidebar_position: 500
description: "Counting Sort is an efficient sorting algorithm used for sorting a collection of integers when the range of the integers (k) is not significantly greater than the number of integers (n) in the collection. It works well when the integers are within a known, fixed range."
tags: [counting-sort]
---

Counting Sort is an efficient, non-comparative sorting algorithm suitable for sorting integers within a specific range. It operates by counting the occurrences of each unique value in the input data and then using those counts to determine the positions of each value in the sorted output.

## Characteristics
- **Time Complexity**: $O(n + k)$, where `n` is the number of elements in the input array and `k` is the range of the input values.
- **Space Complexity**: $O(k)$, where `k` is the range of the input values.
- **Stability**: Counting Sort is stable, meaning that it preserves the relative order of equal elements.

## How It Works
1. **Counting**: Create a count array to store the count of each unique value in the input array.
2. **Accumulating**: Modify the count array to store the cumulative sum of counts. This step determines the position of each element in the sorted array.
3. **Placing Elements**: Iterate through the input array, placing each element in its correct position in the output array based on the count array, and then decrease the count.

## Example
Given an input array: `[4, 2, 2, 8, 3, 3, 1]`

The steps for Counting Sort would be:

1. Create a count array to store the count of each unique value.
2. Modify the count array to store cumulative counts.
3. Build the sorted output array based on the count array.

## Usage
Here is an example implementation of Counting Sort in Java:
### Java Implementation
```java
public class countingSort {

	public static void countingSort(int arr[]) {
		int max = Integer.MIN_VALUE;
		for (int i = 0; i < arr.length; i++) {
			max = Math.max(max, arr[i]);
		}
		int count[] = new int[max + 1];
		for (int i = 0; i < arr.length; i++) {
			count[arr[i]]++;
		}
		int j = 0;
		for (int i = 0; i < arr.length; i++) {
			while (count[i] > 0) {
				arr[j] = i;
				j++;
				count[i]--;
			}
		}
	}

	public static void main(String[] args) {
		int arr[] = { 3, 6, 2, 1, 8, 7, 4, 5, 3, 1 };
		countingSort(arr);
	}
}
```

### JavaScript Implementation

```javascript
function countingSort(arr) {
    // Find the maximum element in the array
    let max = Math.max(...arr); // Use spread operator to find max
    const count = new Array(max + 1).fill(0); // Create count array initialized to 0

    // Store the count of each element in the count array
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    let j = 0;
    // Reconstruct the sorted array
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[j] = i; // Place the element in the sorted position
            j++;
            count[i]--; // Decrease the count
        }
    }
}

// Example usage
const arr = [3, 6, 2, 1, 8, 7, 4, 5, 3, 1];
countingSort(arr);
console.log("Sorted array is:", arr); // Output the sorted array
```

### Explanation of the Code

1. **`countingSort` Function**:
   - Takes an array (`arr`) as input and sorts it in place.

2. **Finding the Maximum Value**:
   - `Math.max(...arr)` is used to find the maximum value in the array using the spread operator.

3. **Count Array**:
   - An array (`count`) is created with a length of `max + 1` and initialized with zeros to count the occurrences of each element.

4. **Counting Elements**:
   - A loop iterates through the input array, incrementing the count for each element in the `count` array.

5. **Reconstructing the Sorted Array**:
   - A nested loop iterates through the `count` array.
   - While the count of an element is greater than zero, it places the element into the original array (`arr`) and decrements the count.

6. **Example Usage**:
   - An example array is created.
   - The `countingSort` function is called to sort the array.
   - The sorted array is printed to the console.
