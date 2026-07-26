---
id: python-code-style-guide
title: Python Code Style Guide for DSA Examples
sidebar_label: Code Style Guide
sidebar_position: 0
description: Guidelines for writing clean, readable, and PEP 8 compliant Python DSA examples.
tags: [python, style-guide, dsa]
---

# Python Code Style Guide

This guide explains how to write clean, PEP 8 compliant, and beginner-friendly Python code for DSA examples.

The main goal is to keep Python solutions simple, readable, and easy to understand for students and new contributors.

## Why This Guide Is Needed

DSA examples are easier to learn when the code follows one clean style.

This guide helps contributors with:

- Clear class and function names
- Meaningful variable names
- PEP 8 compliant formatting
- Useful comments and docstrings
- Time and space complexity annotations
- Input and output examples
- Edge case handling

---

## 1. Naming Conventions

Python uses **snake_case** for functions and variables, and **PascalCase** for classes.

### Class Naming
Use **PascalCase** for class names. Describe the algorithm or data structure clearly.

#### Good
```python
class Node:
    pass

class BinarySearchTree:
    pass
```

#### Avoid
```python
class node:
    pass

class binarySearchTree:
    pass
```

### Function Naming
Use **snake_case** for function names. They should describe what the function does.

#### Good
```python
def binary_search(arr, target):
    return -1

def merge_sort(arr):
    pass
```

#### Avoid
```python
def binarySearch(arr, target):
    return -1

def MergeSort(arr):
    pass
```

### Variable Naming
Use meaningful **snake_case** variable names. Avoid single-letter variables unless they are simple loop iterators (`i`, `j`).

#### Good
```python
left = 0
right = len(arr) - 1
mid = left + (right - left) // 2
```

#### Avoid
```python
a = 0
b = len(arr) - 1
c = (a + b) // 2
```

---

## 2. Formatting and Indentation

Use consistent indentation of **4 spaces**. Do not use tabs.

### Good
```python
if arr[mid] == target:
    return mid
```

### Avoid
```python
if arr[mid] == target: return mid  # Inline statements reduce readability
```

---

## 3. Keep Code Simple and Pythonic

Avoid overly dense list comprehensions or ternary statements for core logic. Keep it readable for beginners.

### Good
```python
result = []
for num in arr:
    if num % 2 == 0:
        result.append(num)
```

### Avoid for beginner examples
```python
result = [num for num in arr if num % 2 == 0]  # Fine for simple cases, but avoid excessively nested list comprehensions
```

---

## 4. Comments and Docstrings

Use PEP 257 docstrings for functions and classes to document parameters and return types.

### Good
```python
def binary_search(arr, target):
    """
    Performs binary search on a sorted list.
    
    Parameters:
    arr (list): Sorted list of integers
    target (int): Target value to find
    
    Returns:
    int: Index of target if found, otherwise -1
    """
    left, right = 0, len(arr) - 1
    # Loop until the pointers meet
    while left <= right:
        # ... logic ...
```

---

## 5. Complexity Format

Every Python DSA solution should mention its time and space complexity at the bottom of the page in the following format:

```text
Time Complexity: O(log n)
Space Complexity: O(1)
```

---

## 6. Example Python DSA Structure

Here is a complete example of a Python DSA solution implementation matching our guidelines:

```python
class BinarySearch:
    @staticmethod
    def search(arr, target):
        """
        Searches for target in a sorted array.
        """
        if not arr:
            return -1
            
        left = 0
        right = len(arr) - 1
        
        while left <= right:
            mid = left + (right - left) // 2
            
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
                
        return -1
```

Time Complexity: `O(log n)`  
Space Complexity: `O(1)`  

---

## 7. Checklist for Python Contributions

Before submitting a Python DSA example, verify these points:

- [ ] Class name uses PascalCase
- [ ] Function name uses snake_case
- [ ] Variable names are descriptive
- [ ] 4-space indentation is used
- [ ] PEP 257 docstrings are added
- [ ] Time and space complexities are documented
- [ ] Edge cases (e.g. empty inputs) are handled
