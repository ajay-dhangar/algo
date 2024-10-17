---
id: leetcode-solutions-31-to-40
sidebar_position: 3
title: LeetCode Solutions 31-40
sidebar_label: LeetCode Solutions 31-40
description: "This document contains solutions to LeetCode DSA problems 31-40 containing multiple algorithms and data structures."
tags: [leetcode, algorithms, problem-solving, DSA, data structure]
---

# LeetCode Solutions 31-40

## Questions
31. [Next Permutation](#31-next-permutation)  
32. [Longest Valid Parentheses](#32-longest-valid-parentheses)  
33. [Search in Rotated Sorted Array](#33-search-in-rotated-sorted-array)  
34. [Find First and Last Position of Element in Sorted Array](#34-find-first-and-last-position-of-element-in-sorted-array)  
35. [Reverse Nodes in k-Group](#35-reverse-nodes-in-k-group)  
36. [Remove Duplicates from Sorted Array](#36-remove-duplicates-from-sorted-array)  
37. [Remove Element](#37-remove-element)  
38. [Find the Index of the First Occurrence in a String](#38-find-the-index-of-the-first-occurrence-in-a-string)  
39. [Divide Two Integers](#39-divide-two-integers)  
40. [Substring with Concatenation of All Words](#40-substring-with-concatenation-of-all-words)  
---

---

### 31. Next Permutation

**Description**:  
A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.

**Approach**:
The algorithm finds the first pair of adjacent elements in the array that satisfy nums[k] < nums[k+1] from the right end of the array. If such a pair does not exist, then the entire array is sorted in descending order, and we need to reverse the entire array to obtain the smallest possible permutation.


Otherwise, the algorithm finds the smallest element nums[l] to the right of nums[k] such that nums[l] > nums[k]. We swap nums[k] and nums[l], and then reverse the subarray starting at nums[k+1] to obtain the next lexicographic permutation of the array.

**C++ Code**:
```cpp
void nextPermutation(vector<int>& nums) {
        int n = nums.size(), k, l;
    	for (k = n - 2; k >= 0; k--) {
            if (nums[k] < nums[k + 1]) {
                break;
            }
        }
    	if (k < 0) {
    	    reverse(nums.begin(), nums.end());
    	} 
        else {
    	    for (l = n - 1; l > k; l--) {
                if (nums[l] > nums[k]) {
                    break;
                }
            } 
    	    swap(nums[k], nums[l]);
    	    reverse(nums.begin() + k + 1, nums.end());
        }
    }
```

**Python Code**:
```python
def nextPermutation(self, nums):
        n = len(nums)
        k, l = n - 2, n - 1
        while k >= 0 and nums[k] >= nums[k + 1]:
            k -= 1
        if k < 0:
            nums.reverse()
        else:
            while l > k and nums[l] <= nums[k]:
                l -= 1
            nums[k], nums[l] = nums[l], nums[k]
            nums[k + 1:n] = reversed(nums[k + 1:n])
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 32. Longest Valid Parentheses

**Description**:  
Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.

**Approach**:
Implementation by stack

**C++ Code**:
```cpp
int longestValidParentheses(string s) {
        
        // Initialized a stack with -1 on the bottom
        std::stack<int> _stack = std::stack<int>( {-1} );
        
        int maxSize = 0;
        
        // scan each character
        for( int i = 0 ; i < s.length() ;  i++ ){
            
            char ch = s[i];
            
            if( ch == '(' ){
                // current charachter is left bracket
                _stack.push( i );       
            }else{
                
                // right charachter is left bracket
                _stack.pop();
                
                if( _stack.empty() ){
                    
                    // handle for corner case when ) comes before (
                    _stack.push( i );
                    
                }else{
                    // update max length if we have paired bracket
                    maxSize = max( maxSize, i - _stack.top() );    
                }
            }
        }
        return maxSize;
    }
```

**Python Code**:
```python
def longestValidParentheses(self, s: str) -> int:

        # stack, used to record index of parenthesis
        # initialized to -1 as dummy head for valid parentheses length computation
        stack = [-1]
        
        max_length = 0
        
		# linear scan each index and character in input string s
        for cur_idx, char in enumerate(s):
            
            if char == '(':
                
                # push when current char is (
                stack.append( cur_idx )
                
            else:
                
                # pop when current char is )
                stack.pop()
                
                if not stack:
                    
                    # stack is empty, push current index into stack
                    stack.append( cur_idx )
                else:
                    # stack is non-empty, update maximal valid parentheses length
                    max_length = max(max_length, cur_idx - stack[-1])
                
        return max_length
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

---

### 33. Search in Rotated Sorted Array

**Description**:  
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

**Approach**:
Using Binary Search

**C++ Code**:
```cpp
int search(vector<int>& nums, int target) {
     int n = nums.size();
      int left = 0;
      int right = n-1;
      int mid= left + (right - left) / 2;
      while(left <= right){
        if(nums[mid] == target)
         return mid;
        if(nums[mid] >= nums[left]) {
          if(target >= nums[left] && target <= nums[mid])
            {
                right = mid - 1;
            }
           else left = mid + 1;
        } 
        else {
          if(target >= nums[mid] && target <= nums[right]) 
            left = mid + 1;
          else right = mid - 1;
        }
          mid = left + (right - left) / 2;
      }
      return -1;
    }
```

**Python Code**:
```python
def search(self, A: List[int], target: int) -> int:
        n = len(A)
        left, right = 0, n - 1
        if n == 0: return -1
        
        while left <= right:
            mid = left + (right - left) // 2
            if A[mid] == target: return mid
        
            if A[mid] >= A[left]:
                if A[left] <= target < A[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
          
            else:
                if A[mid] < target <= A[right]:
                    left = mid + 1
                else:
                    right = mid - 1
            
        return -1
```

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

---

### 34. Find First and Last Position of Element in Sorted Array

**Description**:  
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

**Approach**:
Using Binary Search

**C++ Code**:
```cpp
 int findFirst(vector<int>& nums, int target) {
        //Use Binary Search
        int low=0;
        int high=nums.size()-1;
        int fpos=-1;
        while(low<=high)
        {
            int mid=(low)+(high-low)/2;
            if(nums[mid]==target)
            {
                fpos=mid;
                high=mid-1;   
            }
            else if(nums[mid]<target)
            {
                low =mid+1;   
            }
            else
            {
                high=mid-1;
            }   
        }
	return fpos;
}

int findLast(vector<int>& nums, int target) {
        //Int Last Position
        low=0;
        high=nums.size()-1;
        int lpos=-1;
         while(low<=high)
        {
            int mid=(low)+(high-low)/2;
            
            if(nums[mid]<=target)
            {
                if(nums[mid]==target)
                    lpos=mid;
                low=mid+1;   
            }
            else
            {
                high=mid-1;
            }   
        }
        return lpos;
}
```

**Python Code**:
```python
private int findFirst(int[] nums, int target) {
    int index = -1;
    int left = 0;
    int right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            index = mid; // Update the index when the target is found.
            right = mid - 1; // Continue searching on the left side.
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return index;
}

private int findLast(int[] nums, int target) {
    int index = -1;
    int left = 0;
    int right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            index = mid; // Update the index when the target is found.
            left = mid + 1; // Continue searching on the right side.
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return index;
}
```

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

---
