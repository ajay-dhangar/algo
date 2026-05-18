# Javascript Resources for DSA & Competitive Programming

**Description**
This guide contains important javascript concepts, DSA patterns, commonly used libraries, complexity referneces, and codinf resources frequently used in coding interviews and competitive programming.

The goal is to keep everything concise, practical  and beginner-firendly while covering the most important concepts needs for problem solving. 

## Imports You Will Use Everywhere

```javascript
import { Stack, Queue, MinHeap } from 'datastructures-js';
import { Stack, Queue } from '@m3rashid/dsa-js';
import { Stack, Queue, HashMap } from 'dsa-x';
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
```javascript
class ArrayTraversalExample {
    static main() {
        const arr = [3, 5, 7, 9, 11];
        
        // Traversal: visit each element exactly once
        let output = "Array elements: ";
        for (let i = 0; i < arr.length; i++) {
            output += arr[i] + " ";
        }
        console.log(output);
    }
}

if (typeof require !== 'undefined' && require.main === module) {
    ArrayTraversalExample.main();
}
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
```javascript
class Solution {
    reverseString(s) {
        const n = s.length;
        const T = [];
        for (let i = n - 1; i >= 0; i--) {
            T.push(s[i]);
        }
        
        for (let i = 0; i < n; i++) {
            s[i] = T[i];
        }
    }
}
        
```
### HashMap

HashMap provides average O(1) lookup, insertion and delection. They are one of the most important data structure in DSA.

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
```javascript
class Solution {
    firstUniqChar(s) {
        const count = {};
        for (const char of s) {
            if (count[char]) {
                count[char] += 1;
            } else {
                count[char] = 1;
            }
        }

        for (let i = 0; i < s.length; i++) {
            if (count[s[i]] === 1) {
                return i;
            }
        }

        return -1;
    }
}
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
```javascript
class MyHashSet {
    constructor() {
        this.arr = Array.from({ length: 1 << 15 }, () => []);
    }


    eval_hash(key) {
        return ((key * 1031237) & ((1 << 20) - 1)) >> 5;
    }


    add(key) {
        const t = this.eval_hash(key);
        if (!this.arr[t].includes(key)) {
            this.arr[t].push(key);
        }
    }

    remove(key) {
        const t = this.eval_hash(key);
        const index = this.arr[t].indexOf(key);
        if (index !== -1) {
            this.arr[t].splice(index, 1);
        }
    }

    contains(key) {
        const t = this.eval_hash(key);
        return this.arr[t].includes(key);
    }
}
        
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
```javascript
class MyHashSet {
    constructor() {
        this.arr = Array.from({ length: 1 << 15 }, () => []);
    }

    eval_hash(key) {
        return ((key * 1031237) & ((1 << 20) - 1)) >> 5;
    }

    add(key) {
        const t = this.eval_hash(key);
        if (!this.arr[t].includes(key)) {
            this.arr[t].push(key);
        }
    }

    remove(key) {
        const t = this.eval_hash(key);
        const index = this.arr[t].indexOf(key);
        if (index !== -1) {
            this.arr[t].splice(index, 1);
        }
    }

    contains(key) {
        const t = this.eval_hash(key);
        return this.arr[t].includes(key);
    }
}
        
```

### Queue

Queue provides efficient insertions and deletions from both ends. It is heavily used in BFS and sliding window problems.
**DSA use cases**
- BFS Traversal
- Sliding Window Maximum
- Queue Operations

**Time  Complexity**
 -O(1)
**Space Complexity**
- O(1)

**Code**
```javascript
class MyQueue {
    constructor() {
        this.in_stack = [];
        this.out_stack = [];
    }


    push(x) {
        this.in_stack.push(x);
    }


    pop() {
        this.move();
        return this.out_stack.pop();
    }


    peek() {
        this.move();
        return this.out_stack[this.out_stack.length - 1];
    }


    empty() {
        return this.in_stack.length === 0 && this.out_stack.length === 0;
    }

    move() {
        if (this.out_stack.length === 0) {
            while (this.in_stack.length > 0) {
                this.out_stack.push(this.in_stack.pop());
            }
        }
    }
}
        
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
```javascript
class Solution {
    topKFrequent(nums, k) {
        const occur = new Map();
        for (const num of nums) {
            occur.set(num, (occur.get(num) || 0) + 1);
        }
 
        const sortedArray = Array.from(occur.entries()).sort((a, b) => b[1] - a[1]);
        
        const result = [];
        for (let i = 0; i < k; i++) {
            result.push(sortedArray[i][0]);
        }
        
        return result;
    }
}
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
```javascript
class Solution {
    searchInsert(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let mid = 0;

        while (start <= end) {
            mid = start + Math.floor((end - start) / 2);
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    
        return start;
    }
}
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
```javascript
class Solution {
    swapPairs(head) {
        let dummy = { next: head };
        let pre = dummy;
        
        while (pre.next && pre.next.next) {
            let a = pre.next;
            let b = a.next;
            
            pre.next = b;
            a.next = b.next;
            b.next = a;
            
            pre = a;
        }
        return dummy.next;
    }
}
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
```javascript
class Solution {
    canFinish(numCourses, prerequisites) {
        const pre = new Map();
        for (let i = 0; i < numCourses; i++) {
            pre.set(i, []);
        }
        for (const [course, p] of prerequisites) {
            pre.get(course).push(p);
        }
        
        const taken = new Set();

        const dfs = (course) => {
            if (pre.get(course).length === 0) return true;
            if (taken.has(course)) return false;
            
            taken.add(course);

            for (const p of pre.get(course)) {
                if (!dfs(p)) return false;
            }
            
            pre.set(course, []);
            return true;
        };
        
        for (let course = 0; course < numCourses; course++) {
            if (!dfs(course)) {
                return false;
            }
        }

        return true;
    }
}
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
```javascript
class Solution {
    uniquePathsWithObstacles(obstacleGrid) {
        const m = obstacleGrid.length;
        const n = obstacleGrid[0].length;
 
        if (obstacleGrid[0][0] === 1) {
            return 0;
        }

        const dp = Array.from({ length: m }, () => Array(n).fill(0));
 
        for (let i = 0; i < m; i++) {
            if (obstacleGrid[i][0] === 1) {
                break; // Obstacle blocks all cells below in this column
            }
            dp[i][0] = 1;
        }
 
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[0][j] === 1) {
                break; // Obstacle blocks all cells to the right in this row
            }
            dp[0][j] = 1;
        }
 
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (obstacleGrid[i][j] === 1) {
                    dp[i][j] = 0;
                } else {
                    // Current paths = paths from above + paths from left
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }

        return dp[m - 1][n - 1];
    }
}

```

## Cheat Sheet
- [Javascript cheat Sheet](https://htmlcheatsheet.com/js/JavaScript-JS-Cheat-Sheet.pdf)

## CP Resources
- [Roadmap.sh](https://roadmap.sh/)
- [AlgoMaster](https://algomaster.io/learn/dsa/course-roadmap)
- [LeetCode](https://leetcode.com/problemset/)
- [Codeforces](https://codeforces.com/problemset/)
- [playlist](https://youtube.com/playlist?list=PLbtI3_MArDOmSKABu09sEs0SxCibd1wgr&si=bHLhMiRZyOdT_fF5)