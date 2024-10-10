# Counting Sort Algorithm

## Overview
Counting Sort is an efficient, non-comparative sorting algorithm suitable for sorting integers within a specific range. It operates by counting the occurrences of each unique value in the input data and then using those counts to determine the positions of each value in the sorted output.

## Characteristics
- **Time Complexity**: O(n + k), where `n` is the number of elements in the input array and `k` is the range of the input values.
- **Space Complexity**: O(k), where `k` is the range of the input values.
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

