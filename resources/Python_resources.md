# Python Resources for DSA & Competitive Programming

**Description**
This guide contains important python concepts, DSA patterns, commonly used libraries, complexity referneces, and codinf resources frequently used in coding interviews and competitive programming.

The goal is to keep everything concise, practical  and beginner-firendly while covering the most important concepts needs for problem solving. 

## Imports You Will Use Everywhere

```python
from collections import defaultdict, Counter, deque, OrderedDict
from heapq import heappush, heappop, heapify, nlargest, nsmallest
from bisect import bisect_left, bisect_right, insort
from functools import lru_cache, cache, cmp_to_key
from itertools import combinations, permutations, product, accumulate
from math import inf, ceil, floor, gcd, log2, sqrt, isqrt
from typing import List, Optional, Dict, Set, Tuple
import sys
```

## DSA Snippets

### Arrays

Array are ordered collections used to store multiple elements in a single variable. They are heavily used in traversal, sliding window, prefix sum, binary search and dynamic programming problems. 

**DSA use cases**
- Traversal
- Two Pointers
- Sliding Window
- Prefix Sum
- Binary Search

**Time Complexity**
| Operation | Complexity |
|---|---|
| Access | O(1) |
| Search | O(n) |
| Insert | O(n) |
| Delete | O(n) |

**Space Complexity**
- O(n)

**Code**
```python
class ArrayTraversalExample:
    @staticmethod
    def main():
        arr = [3, 5, 7, 9, 11]
        
        # Traversal: visit each element exactly once
        print("Array elements: ", end="")
        for i in range(len(arr)):
            print(arr[i], end=" ")
        print()

if __name__ == "__main__":
    ArrayTraversalExample.main()
```

### String

Strings are immutable squences of characters commonly used in hashing, pattern matching, sliding window, palidrome, and parsing problem 

**DSA use cases**
- Hashing
- Sliding Window
- Palindrome
- Frequency Countingh

**Time and Space Complexity**
| Operation | Time Complexity | Space Complexity |
| ---- | ---- | ---- |
| Access / Indexing | O(1) | O(1) |
| Length Lookup | O(1) | O(1) |
| Comparison | O(n) | O(1) |
| Concatenation (n + m) | O(n + m) | O(n + m) |
| Substring (Length k) | O(k) | O(k) |


**Code**
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        n = len(s)
        T = []
        for i in range(n-1, -1, -1):
            T.append(s[i])
        
        for i in range(n):
            s[i] = T[i]
        
```
### HashMap/Dictionary

Dictionaries provides average O(1) lookup, insertion and delection. They are one of the most important data structure in DSA.

**DSA use cases**
- Frequency Counting
- Hashing
- Prefix Sum
- Graphs
- Caching

**Time  Complexity**
 -O(1)
**Space Complexity**
- O(n)

**Code**
```python
class Solution(object):
    def firstUniqChar(self, s):
        count = {}
        for char in s:
            if char in count:
                count[char] += 1
            else:
                count[char] = 1

        for i in range(len(s)):
            if count[s[i]] == 1:
                return i

        return -1
        
```

### Set

Set store unique elements and provide fast lookup operations. They are useful for duplicate detection and visited tracking

**DSA use cases**
- Duplicate Detection
- Visited Set
- Set Operations

**Time  Complexity**
 -O(1)
**Space Complexity**
- O(1)

**Code**
```python
class MyHashSet: 
    def eval_hash(self, key):
        return ((key*1031237) & (1<<20) - 1)>>5

    def __init__(self):
        self.arr = [[] for _ in range(1<<15)]

    def add(self, key: int) -> None:
        t = self.eval_hash(key)
        if key not in self.arr[t]:
            self.arr[t].append(key)

    def remove(self, key: int) -> None:
        t = self.eval_hash(key)
        if key in self.arr[t]:
            self.arr[t].remove(key)

    def contains(self, key: int) -> bool:
        t = self.eval_hash(key)
        return key in self.arr[t]
        
```


### Stack

Stack follow the Last In First Out principle. They are commonly used in recursion, parsing, monotonic stack, and expression problems.

**DSA use cases**
- Valid Parentheses
- Monotonic Stack
- Next Greater Element

**Time  Complexity**
 -O(1)
**Space Complexity**
- O(1)

**Code**
```python
class MyHashSet: 
    def eval_hash(self, key):
        return ((key*1031237) & (1<<20) - 1)>>5

    def __init__(self):
        self.arr = [[] for _ in range(1<<15)]

    def add(self, key: int) -> None:
        t = self.eval_hash(key)
        if key not in self.arr[t]:
            self.arr[t].append(key)

    def remove(self, key: int) -> None:
        t = self.eval_hash(key)
        if key in self.arr[t]:
            self.arr[t].remove(key)

    def contains(self, key: int) -> bool:
        t = self.eval_hash(key)
        return key in self.arr[t]
        
```

### Queue/Deque

Deque provides efficient insertions and deletions from both ends. It is heavily used in BFS and sliding window problems.
**DSA use cases**
- BFS Traversal
- Sliding Window Maximum
- Queue Operations

**Time  Complexity**
 -O(1)
**Space Complexity**
- O(1)

**Code**
```python
class MyQueue:

    def __init__(self):
        self.in_stack=[]
        self.out_stack=[]

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.move()
        return self.out_stack.pop()

    def peek(self) -> int:
        self.move()
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

    def move(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        
```

### Heap/Priority Queue

Heaps are specialized tree-based structure used for efficiently. retrieving minimum or maximum elemets.

**DSA use cases**
- Min Heap
- Max Heap
- Top K Elements
- K Closest Points

**Time  Complexity**
 -O(logn)
 -O(1)(at peek min)
**Space Complexity**
- O(1)

**Code**
```python
import heapq

class Solution:
    """My Own Min-Heap Solution!!!"""
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        occur = {}
        for num in nums:
            occur[num] = occur.get(num, 0) + 1

        heap = []

        for key in occur:
            heapq.heappush(heap, (occur[key], key))
            if len(heap) > k:
                heapq.heappop(heap)

        return [i[1] for i in heap]
```

### Binary Search

Binary search efficiently searches sorted data by repeatedly dividing the search space into halves.

**DSA use cases**
- Classic Binary Search
- Lower Bound
- Upper Bound
- Search on Answer

**Time  Complexity**
 -O(logn)
**Space Complexity**
- O(1)

**Code**
```python
class Solution(object):
    def searchInsert(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        start = 0
        end = len(nums) -1
        mid = 0

        while(start <= end): 
            mid = start + ( end - start)/2
            if(nums[mid] == target): 
                return mid
            elif(nums[mid] < target): 
                start = mid + 1
            else:
                end = mid - 1
    
        return start

```

### Recursion & Backtracking

Recursion solves problems by breaking them into smaller subproblems. Backtracking explores all possible combinations systematically.

**DSA use cases**
- Factorial
- Subsets
- Permutations
- N Queens

**Time  Complexity**
power set - O(2^N.N)
Permutations - O(N!.N)
N-Queens - O(N!) 
**Space Complexity**
-power set - O(N)
Permutations - O(N)
N-Queens - O(N^2) 
**Code**
```python
def swapPairs(self, head):
    pre, pre.next = self, head
    while pre.next and pre.next.next:
        a = pre.next
        b = a.next
        pre.next, b.next, a.next = b, a, b.next
        pre = a
    return self.next

```

### Graphs

Graphs represent relationships between nodes and edges. They are heavily used in traversal, shortest path, and connectivity problems

**DSA use cases**
- Graph Representation
- BFS
- DFS
- Connected Components

**Time  Complexity**
-O(V+E) 
**Space Complexity**
-O(V)
-O(V+E)(except only on Adjacency list)
**Code**
```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:

        pre = defaultdict(list)

        for course, p in prerequisites:
            pre[course].append(p)
        
        taken = set()

        def dfs(course):
            if not pre[course]:
                return True
            
            if course in taken:
                return False
            
            taken.add(course)

            for p in pre[course]:
                if not dfs(p): return False
            
            pre[course] = []
            return True
        
        for course in range(numCourses):
            if not dfs(course):
                return False

        return True
```

### Dynamic Programming

Dynamic Programming optimizes recursive solution by storing previously computed results.

**DSA use cases**
- Fibonacci Memoization
- Tabulation
- Knapsack
- Longest Common Subsequence

**Time  Complexity**
-O(N)(1D)
-O(N^2)(@D)
**Space Complexity**
 -O(1)
 -O(M)
**Code**
```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m = len(obstacleGrid)
        n = len(obstacleGrid[0])

        # If the starting point is an obstacle, no paths are possible
        if obstacleGrid[0][0] == 1:
            return 0

        dp = [[0 for _ in range(n)] for _ in range(m)]

        # Base case: Filling the first column
        for i in range(m):
            if obstacleGrid[i][0] == 1:
                break # Obstacle blocks all cells below in this column
            dp[i][0] = 1
            
        # Base case: Filling the first row
        for j in range(n):
            if obstacleGrid[0][j] == 1:
                break # Obstacle blocks all cells to the right in this row
            dp[0][j] = 1

        # Fill the DP table for the rest of the grid
        for i in range(1, m):
            for j in range(1, n):
                if obstacleGrid[i][j] == 1:
                    dp[i][j] = 0
                else:
                    # Current paths = paths from above + paths from left
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

        return dp[m - 1][n - 1]

```

## Cheat Sheet
- [Python cheat Sheet](https://static.realpython.com/python-cheatsheet.pdf)

## CP Resources
- [Roadmap.sh](https://roadmap.sh/)
- [AlgoMaster](https://algomaster.io/learn/dsa/course-roadmap)
- [LeetCode](https://leetcode.com/problemset/)
- [Codeforces](https://codeforces.com/problemset/)
- [playlist](https://youtube.com/playlist?list=PLhR2IpV1b2FwWwviBHRrR118YAaSlyhTU&si=tcwJmVSbj7dkZTek)