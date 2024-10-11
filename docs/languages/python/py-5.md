---  
id: usage-of-sets-in-python  
sidebar_position: 5 
title: Sets in Python  
sidebar_label: Sets in Python  
---

Hey there! In this guide, we'll explore sets in Python. Sets are unordered collections of unique elements that allow you to perform various operations like union, intersection, and difference. Let's dive in!

# Python Sets


* Sets are unordered collections of unique elements.

* They are mutable, which means you can change their contents after creation.
## 1. Creating a Set


You can create a set using curly braces `{}` or the `set()` function.  
```python  
my_set = {1, 2, 3, 4}                     # Create a set using curly braces  
another_set = set([3, 4, 5, 6])         # Create a set using the set() function  
print(my_set)                            # Output: {1, 2, 3, 4}  
print(another_set)                      # Output: {3, 4, 5, 6}  
```
## 2. Accessing Elements


Sets do not support indexing, but you can check for the existence of an element using the `in` keyword.  
```python  
my_set = {1, 2, 3, 4}                   # Define a set  
print(2 in my_set)                      # Check if 2 is in the set, Output: True  
print(5 in my_set)                      # Check if 5 is in the set, Output: False  
```
## 3. Adding Elements


You can add elements to a set using the `add()` method.  
```python  
my_set.add(5)                            # Add an element to the set  
print(my_set)                           # Output: {1, 2, 3, 4, 5}  
```
## 4. Removing Elements


To remove elements, you can use the `remove()` method or the `discard()` method.  
```python  
my_set.remove(3)                        # Remove an element (raises error if not found)  
print(my_set)                           # Output: {1, 2, 4, 5}  
my_set.discard(2)                       # Remove an element (does not raise error if not found)  
print(my_set)                           # Output: {1, 4, 5}  
```
## 5. Set Operations


Sets support various mathematical operations like union, intersection, and difference.  
```python  
set1 = {1, 2, 3}                        # Define the first set  
set2 = {3, 4, 5}                        # Define the second set  
union_set = set1 | set2                # Union operation  
intersection_set = set1 & set2         # Intersection operation  
difference_set = set1 - set2           # Difference operation  
print(union_set)                       # Output: {1, 2, 3, 4, 5}  
print(intersection_set)                # Output: {3}  
print(difference_set)                  # Output: {1, 2}  
```