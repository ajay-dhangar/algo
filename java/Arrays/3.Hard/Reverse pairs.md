---
id: reverse-pairs
title: Count Reverse Pairs
sidebar_label: Count Reverse Pairs
sidebar_position: 1
description: Count the number of reverse pairs in an array where i < j and arr[i] > 2 * arr[j].
tags: [Merge Sort, Array]
---

# Problem Statement
Given an array of numbers, return the count of reverse pairs. Reverse Pairs are those pairs where `i < j` and `arr[i] > 2 * arr[j]`.

**LeetCode Problem Link**: [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/description/)

## Examples

### Example 1  
Input:  
`N = 5, array[] = {1, 3, 2, 3, 1}`  
Output:  
`2`  
**Explanation**:  
The pairs are `(3, 1)` and `(3, 1)` as both satisfy the condition `arr[i] > 2 * arr[j]`.

### Example 2  
Input:  
`N = 4, array[] = {3, 2, 1, 4}`  
Output:  
`1`  
**Explanation**:  
There is only 1 pair `(3, 1)` that satisfies the condition `arr[i] > 2 * arr[j]`.

## Approach

The problem can be solved using a modified **Merge Sort** approach, similar to the inversion count problem but with a change in the condition. The idea is to:
1. **Merge** the sorted halves.
2. **Count pairs** where `arr[i] > 2 * arr[j]` using two pointers during the merge step.
3. Merge sort ensures that both halves are sorted, making it efficient to count valid pairs.

### Steps
1. Implement a **modified merge sort** where:
   - During the merge process, count valid pairs by iterating through the left and right halves.
   - For each element in the left half, count how many elements in the right half satisfy the condition.
2. After counting the pairs, merge the two halves back into the original array.

## Java Implementation

```java
import java.util.*;

public class CountReversePairs {

    // Merges two sorted halves and counts reverse pairs
    private static void merge(int[] arr, int low, int mid, int high) {
        ArrayList<Integer> temp = new ArrayList<>(); 
        int left = low; 
        int right = mid + 1;  

        // Merge two halves in sorted order
        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.add(arr[left]);
                left++;
            } else {
                temp.add(arr[right]);
                right++;
            }
        }

        // If there are remaining elements in the left half
        while (left <= mid) {
            temp.add(arr[left]);
            left++;
        }

        // If there are remaining elements in the right half
        while (right <= high) {
            temp.add(arr[right]);
            right++;
        }

        // Transfer all elements from temp back to arr
        for (int i = low; i <= high; i++) {
            arr[i] = temp.get(i - low);
        }
    }

    // Counts pairs where arr[i] > 2 * arr[j] in two sorted halves
    public static int countPairs(int[] arr, int low, int mid, int high) {
        int right = mid + 1;
        int cnt = 0;
        for (int i = low; i <= mid; i++) {
            while (right <= high && arr[i] > 2 * arr[right]) right++;
            cnt += (right - (mid + 1));
        }
        return cnt;
    }

    // Recursive merge sort with modification to count reverse pairs
    public static int mergeSort(int[] arr, int low, int high) {
        int cnt = 0;
        if (low >= high) return cnt;
        int mid = (low + high) / 2 ;
        cnt += mergeSort(arr, low, mid);  // left half
        cnt += mergeSort(arr, mid + 1, high); // right half
        cnt += countPairs(arr, low, mid, high); // Count reverse pairs
        merge(arr, low, mid, high);  // Merge sorted halves
        return cnt;
    }

    // Main function that triggers the merge sort
    public static int reversePairs(int[] arr, int n) {
        return mergeSort(arr, 0, n - 1);
    }

    public static void main(String[] args) {
        int[] array = {4, 1, 2, 3, 1};
        int n = 5;
        int count = reversePairs(array, n);
        System.out.println("The number of reverse pairs is: " + count);
    }
}

```

---
## Time Complexity
The **Time complexity** is O(N log N), where N is the size of the array.

**Merge Sort**: Recursively divides the array, which takes O(log N).
**Counting pairs**: For each split, the counting process takes O(N).

Thus, the total time complexity is `O(N log N)`.

**Space Complexity**: The space complexity is `O(N)` because of the temporary array used to store the merged elements.

---
## Conclusion
This problem is a modification of the inversion count problem, with the condition `arr[i] > 2 * arr[j].` The approach uses merge sort to efficiently count such pairs in `O(N log N)` time. This is optimal for large arrays and ensures that the problem can be solved within reasonable time limits.