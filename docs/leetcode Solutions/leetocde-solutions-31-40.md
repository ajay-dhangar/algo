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
35. [Search Insert Position](#35-search-insert-position)  
36. [Remove Duplicates from Sorted Array](#36-remove-duplicates-from-sorted-array)  
37. [Sudoku Solver](#37-sudoku-solver)  
38. [Count and Say](#38-count-and-say)  
39. [Combination Sum](#39-combination-sum)  
40. [Combination Sum II](#40-combination-sum-II)  
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

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

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

### 35. Search Insert Position

**Description**:  
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

**Approach**:
Using Binary Search

**C++ Code**:
```cpp
 int searchInsert(vector<int>& nums, int target) {
        int low=0;
        int high=nums.size();
        int mid;
        if(target>nums[high-1]){
            return high;
        }
        while(low<=high){
              mid=(low+high)/2;
            if(nums[mid]==target){  
                return mid;
            }
          
            if(target<nums[mid]){     
            high=mid-1;    
            }else{
            low=mid+1;        
            }
          
        }
         return  low;   
    }
```

**Python Code**:
```python
def searchInsert(self, nums: List[int], target: int) -> int:
        if target <= nums[0]:
            return 0
        elif target > nums[-1]:
            return len(nums)
        low = 0
        high = len(nums)-1
        while low <= high:
            mid = (low + high)//2
            if nums[mid] == target:
                return mid
            if nums[mid] < target and target < nums[mid+1]:
                return mid+1
            elif nums[mid] < target:
                low = mid+1
            else:
                high = mid
        return low+1
```

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

---

### 36. Valid Sudoku

**Description**:  
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

**Approach**:
Bit Manipulation

**C++ Code**:
```cpp
 bool isValidSudoku(vector<vector<char>>& board) {
        int R = board.size();
        int C = board[0].size();
        unordered_map<char,int> row[9];
        unordered_map<char,int> col[9];
        unordered_map<char,int> boxes[9];
        for(int i=0; i<R; i++) {
            for(int j=0; j<C; j++) {
                char ch = board[i][j];
                if(ch!='.' && (row[i][ch]++ >0 || col[j][ch]++ >0 || boxes[i/3*3+j/3][ch]++ >0)) {
                    return false;
                }
            }
        }
        return true;
    }
```

**Python Code**:
```python
def isValidSudoku(self, board: List[List[str]]) -> bool:
        box_number = lambda r,c: 3*(r//3) + (c//3)
        hash_map_box = collections.defaultdict(set)
        hash_map_col = collections.defaultdict(set)
        hash_map_row = collections.defaultdict(set)
        
        for r in range(9):
            for c, val in enumerate(board[r]):
                if val=='.':
                    continue
                box_index = box_number(r,c)
                if ((val in hash_map_box[box_index]) or
                (val in hash_map_row[r]) or
                (val in hash_map_col[c])):
                    return False
                
                hash_map_row[r].add(val)
                hash_map_col[c].add(val)
                hash_map_box[box_index].add(val)
        return True
```

- **Time Complexity**: O(n*m)
- **Space Complexity**: O(n*m)

---


### 37. Sudoku Solver

**Description**:  
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

**Approach**:
Backtracking

**C++ Code**:
```cpp
 void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }

    bool solve(vector<vector<char>>& board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char d = '1'; d <= '9'; d++) {
                        if (isValid(board, r, c, d)) {
                            board[r][c] = d;
                            if (solve(board)) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            } 
        }
        return true;
    }
    bool isValid(vector<vector<char>>& board, int r, int c, char d) {
        for (int row = 0; row < 9; row++)
            if (board[row][c] == d) return false;
        for (int col = 0; col < 9; col++)
            if (board[r][col] == d) return false;
        for (int row = (r / 3) * 3; row < (r / 3 + 1) * 3; row++)
            for (int col = (c / 3) * 3; col < (c / 3 + 1) * 3; col++)
                if (board[row][col] == d) return false;
        return true;
    }
```

**Python Code**:
```python
def solveSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: void Do not return anything, modify board in-place instead.
        """
        if not board or len(board) == 0:
            return
        self.solve(board)
        
    def solve(self, board):
        """
        rtype: boolean
        """
        for i in xrange(len(board)):
            for j in xrange(len(board[0])):
                if board[i][j] == '.':
                    for c in "123456789":
                        if self.isValid(board, i, j, c):
                            board[i][j] = c
                            # If it's the solution return true
                            if self.solve(board): 
                                return True
                            # Otherwise go back
                            else:
                                board[i][j] = '.'
                    return False
        return True
        
    def isValid(self, board, x, y, c):
        for i in xrange(9):
            if board[i][y] == c: 
                return False
        for j in xrange(9):
            if board[x][j] == c:
                return False
        for i in xrange(3):
            for j in xrange(3):
                if board[(x/3)*3 + i][(y/3)*3 + j] == c:
                    return False
                    
        return True
```

- **Time Complexity**: O(9^m)
- **Space Complexity**: O(1)

---

### 38. Count and Say

**Description**:  
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

Given a positive integer n, return the nth element of the count-and-say sequence.

**Approach**:
Iterative approach

**C++ Code**:
```cpp
string traverse(string curr) {
        string ans;
        int cnt = 1, n = curr.size();
        char ch = curr[0];
        for (int i = 1; i < n; ++i) {
            if (curr[i] != ch) {
                ans.push_back((char)(cnt + '0'));
                ans.push_back(ch);
                ch = curr[i];
                cnt = 1;
            } else {
                ++cnt;
            }
        }
        ans.push_back((char)(cnt + '0'));
        ans.push_back(ch);
        return ans;
    }

    string countAndSay(int n) {
        string curr = "1";
        for (int i = 2; i <= n; ++i) {
            curr = traverse(curr);    
        } 
        return curr;
    }
```

**Python Code**:
```python
def countAndSay(self, n):
    """
    :type n: int
    :rtype: str
    """
    s = "0"
    for i in range(n):
        s = self.say(s)
    return s

def say(self, s):
    sol = ""
    if len(s) == 0:
        return sol
    if s == "0":
        return "1"
    count = 1
    prev = s[0]
    for j in range(1, len(s)):
        if s[j] != prev:
            sol += str(count) + prev
            count = 1
            prev = s[j]
        else:
            count += 1
    sol += str(count) + prev
    return sol
```

- **Time Complexity**: O(n^2)
- **Space Complexity**: O(1)

---

### 39. Combination Sum

**Description**:  
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

**Approach**:
Iterative approach

**C++ Code**:
```cpp
 vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<vector<int>>> dp(target + 1);
        dp[0].push_back({});

        for (int i = 1; i <= target; i++) {
            for (int candidate : candidates) {
                if (candidate <= i) {
                    for (auto& prev : dp[i - candidate]) {
                        vector<int> temp(prev);
                        temp.push_back(candidate);
                        sort(temp.begin(), temp.end());
                        if (std::find(dp[i].begin(), dp[i].end(), temp) ==
                            dp[i].end()) {
                            dp[i].push_back(temp);
                        }
                    }
                }
            }
        }
        return dp[target];
    }
```

**Python Code**:
```python
def combinationSum(self, candidates, target):
        """
        :type candidates: List[int]
        :type target: int
        :rtype: List[List[int]]
        """
        dp = [[] for _ in range(target + 1)]
        dp[0].append([])

        for i in range(1, target + 1):
            for candidate in candidates:
                if candidate <= i:
                    for prev in dp[i - candidate]:
                        temp = prev + [candidate]
                        temp.sort()
                        if temp not in dp[i]:
                            dp[i].append(temp)
        return dp[target]
```

- **Time Complexity**: O(n^3)
- **Space Complexity**: O(n^2)

---

### 40. Combination Sum II

**Description**:  
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

**Approach**:
1. Sorting the Array: First, we sort the candidates array. Sorting helps in easily skipping duplicates and ensures that we can break out of the loop early when the remaining candidates cannot form the target sum.
2. Backtracking:
-We use a backtracking approach to explore all possible combinations.
-Start from the first element and try to include it in the current combination.
-If the current element is the same as the previous element and it wasn't included in the previous combination, skip it to avoid duplicates.
-Subtract the value of the current element from the target and recursively search for the remaining target in the subarray starting from the next index.
-If the target becomes 0, it means we have found a valid combination, so we add it to the result list.
-If the target becomes negative or we run out of elements, backtrack by removing the last element from the current combination.
3. Pruning the Search:
-As the array is sorted, if at any pint an element is greater than the target, we can break the loop since no further elements can be part of a valid combination (because they will all be greater).

**C++ Code**:
```cpp
 vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector < vector < int >> ans;
        vector < int > ds;
        findCombination(0, target, candidates, ans, ds);
        return ans;
    }
    void findCombination(int ind, int target, vector < int > & arr, vector < vector < int >> & ans, vector < int > & ds) {
        if (target == 0) {
            ans.push_back(ds);
            return;
        }
        for (int i = ind; i < arr.size(); i++) {
            if (i > ind && arr[i] == arr[i - 1]) continue;
            if (arr[i] > target) break;
            ds.push_back(arr[i]);
            findCombination(i + 1, target - arr[i], arr, ans, ds);
            ds.pop_back();
        }
    }
```

**Python Code**:
```python
def combinationSum2(self, candidates, target):
        ans = []
        ds = []
        candidates.sort()


        def findCombination(ind, target):
            if target == 0:
                ans.append(ds[:])
                return
            for i in range(ind, len(candidates)):
                if i > ind and candidates[i] == candidates[i - 1]:
                    continue
                if candidates[i] > target:
                    break
                ds.append(candidates[i])
                findCombination(i + 1, target - candidates[i])
                ds.pop()


        findCombination(0, target)
        return ans
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

---
