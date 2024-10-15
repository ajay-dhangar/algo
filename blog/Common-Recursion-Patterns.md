---
slug: common-recursion-patterns
title: Common Recursion Patterns in Algorithms
authors: [AKSHITHA-CHILUKA]
tags: [akshitha-chiluka, algo, dsa, algorithms, recursion]
---

Recursion is a powerful technique in programming that allows functions to call themselves. It is widely used in various algorithms, especially when dealing with problems that can be broken down into smaller subproblems.

<!-- truncate -->

In this blog, we'll explore:

- **Tree Traversal**: How to traverse tree structures using recursion.
- **Backtracking**: An approach to solve problems by trying multiple possibilities.
  
---

## What are Recursion Patterns?

Recursion patterns are common techniques employed in recursive algorithms that can help solve various computational problems.

### 1. Tree Traversal

Tree traversal is a common use case for recursion, where we visit each node in a tree data structure. There are several methods of tree traversal:

- **Pre-order Traversal**: Visit the root, then recursively visit the left subtree and the right subtree.
- **In-order Traversal**: Recursively visit the left subtree, the root, and then the right subtree.
- **Post-order Traversal**: Recursively visit the left subtree, the right subtree, and then the root.

#### Example: Pre-order Traversal

```javascript
function preOrder(node) {
  if (node) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}
```
### 2. Backtracking
Backtracking is a method for solving problems incrementally by trying partial solutions and then abandoning them if they do not lead to a valid solution.

#### Example: N-Queens Problem
```javascript
function solveNQueens(n) {
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  const results = [];
  
  function backtrack(row) {
    if (row === n) {
      results.push(board.map(r => r.join('')).join('\n'));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.'; // backtrack
      }
    }
  }
  
  backtrack(0);
  return results;
}
```
### Why are Recursion Patterns Important?
Understanding common recursion patterns can significantly enhance your problem-solving skills, allowing you to tackle complex problems more efficiently.

