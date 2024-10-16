# Balanced Binary Tree Checker

This document provides an implementation of a binary tree and a method to check if the tree is balanced.

## Node Class

The `Node` class defines the structure of each node in the binary tree. Each node contains a value (`data`) and pointers to the left and right children.

```python
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
class Solution:
    def isBalanced(self, root):
        return self.dfsHeight(root) != -1

    def dfsHeight(self, root):
        if not root:
            return 0

        left_height = self.dfsHeight(root.left)
        if left_height == -1:
            return -1

        right_height = self.dfsHeight(root.right)
        if right_height == -1:
            return -1

        if abs(left_height - right_height) > 1:
            return -1

        return max(left_height, right_height) + 1
# Creating a sample binary tree
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)
root.left.right.right = Node(6)
root.left.right.right.right = Node(7)

# Creating an instance of the Solution class
solution = Solution()

# Checking if the tree is balanced
if solution.isBalanced(root):
    print("The tree is balanced.")
else:
    print("The tree is not balanced.")
