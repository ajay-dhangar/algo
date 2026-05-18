# TypeScript Resources for DSA & Competitive Programming

**Description**
This guide contains important typescript concepts, DSA patterns, commonly used libraries, complexity referneces, and codinf resources frequently used in coding interviews and competitive programming.

The goal is to keep everything concise, practical  and beginner-firendly while covering the most important concepts needs for problem solving. 

## Imports You Will Use Everywhere

```typescript
import { Stack, AVLTree, binarySearch } from 'dsa-toolbox'';
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
```typescript
class Array {
    static main(): void {
        const arr: number[] = [3, 5, 7, 9, 11];
        
        let output: string = "Array elements: ";
        for (let i = 0; i < arr.length; i++) {
            output += arr[i] + " ";
        }
        console.log(output);
    }
}

ArrayTraversalExample.main();
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
```typescript
class Solution {
    reverse_a_String(s: string[]): void {
        const n: number = s.length;
        const T: string[] = [];
        
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
```typescript
class Solution {
    first_UniqChar_in(s: string): number {
        const count: Record<string, number> = {};
        
        for (const char of s) {
            count[char] = (count[char] || 0) + 1;
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
```typescript
class My_Hash {
    private arr: number[][];

    constructor() {
        this.arr = Array.from({ length: 1 << 15 }, () => []);
    }

    private eval_hash(key: number): number {
        return ((key * 1031237) & ((1 << 20) - 1)) >> 5;
    }

    add(key: number): void {
        const t = this.eval_hash(key);
        if (!this.arr[t].includes(key)) {
            this.arr[t].push(key);
        }
    }

    remove(key: number): void {
        const t = this.eval_hash(key);
        const index = this.arr[t].indexOf(key);
        if (index !== -1) {
            this.arr[t].splice(index, 1);
        }
    }

    contains(key: number): boolean {
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
```typescript
class MyStack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
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
```typescript
class Queue<T> {
    private in_stack: T[] = [];
    private out_stack: T[] = [];

    push(x: T): void {
        this.in_stack.push(x);
    }

    pop(): T | undefined {
        this.move();
        return this.out_stack.pop();
    }

    peek(): T | undefined {
        this.move();
        return this.out_stack[this.out_stack.length - 1];
    }

    empty(): boolean {
        return this.in_stack.length === 0 && this.out_stack.length === 0;
    }

    private move(): void {
        if (this.out_stack.length === 0) {
            while (this.in_stack.length > 0) {
                const item = this.in_stack.pop();
                if (item !== undefined) this.out_stack.push(item);
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
```typescript
class Solution {
    top_K_Frequenty(nums: number[], k: number): number[] {
        const occur = new Map<number, number>();
        for (const num of nums) {
            occur.set(num, (occur.get(num) || 0) + 1);
        }

        const sortedArray = Array.from(occur.entries()).sort((a, b) => b[1] - a[1]);
        
        return sortedArray.slice(0, k).map(entry => entry[0]);
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
```typescript
class Solution {
    search_for_insert(nums: number[], target: number): number {
        let start: number = 0;
        let end: number = nums.length - 1;

        while (start <= end) {
            let mid: number = start + Math.floor((end - start) / 2);
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
```typescript
interface ListNode {
    val: any;
    next: ListNode | null;
}

class Solution {
    swap(head: ListNode | null): ListNode | null {
        let dummy: ListNode = { val: 0, next: head };
        let pre = dummy;
        
        while (pre.next && pre.next.next) {
            let a = pre.next;
            let b = a.next!; // Using non-null assertion as checked in while
            
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
```typescript
class Solution {
    c_F(numCourses: number, prerequisites: number[][]): boolean {
        const pre = new Map<number, number[]>();
        for (let i = 0; i < numCourses; i++) {
            pre.set(i, []);
        }
        for (const [course, p] of prerequisites) {
            pre.get(course)?.push(p);
        }
        
        const taken = new Set<number>();

        const dfs = (course: number): boolean => {
            const neighbors = pre.get(course) || [];
            if (neighbors.length === 0) return true;
            if (taken.has(course)) return false;
            
            taken.add(course);

            for (const p of neighbors) {
                if (!dfs(p)) return false;
            }
            
            pre.set(course, []);
            return true;
        };
        
        for (let course = 0; course < numCourses; course++) {
            if (!dfs(course)) return false;
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
```typescript
class DPS {
    dp_s(obstacleGrid: number[][]): number {
        const m: number = obstacleGrid.length;
        const n: number = obstacleGrid[0].length;
 
        if (obstacleGrid[0][0] === 1) return 0;

        const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
 
        for (let i = 0; i < m; i++) {
            if (obstacleGrid[i][0] === 1) break;
            dp[i][0] = 1;
        }
 
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[0][j] === 1) break;
            dp[0][j] = 1;
        }
 
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (obstacleGrid[i][j] === 0) {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }

        return dp[m - 1][n - 1];
    }
}

```

## Cheat Sheet
- [typescript cheat Sheet](https://www.typescriptlang.org/cheatsheets/)

## CP Resources
- [Roadmap.sh](https://roadmap.sh/)
- [AlgoMaster](https://algomaster.io/learn/dsa/course-roadmap)
- [LeetCode](https://leetcode.com/problemset/)
- [Codeforces](https://codeforces.com/problemset/)
- [playlist](https://youtube.com/playlist?list=PL9_OU-1M9E_tLzMZUV7x7YFFaZkSIN1Fm&si=X9SLso0lQCJXwA6X)