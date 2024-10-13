---  
id: usage-of-dictionaries-in-python  
sidebar_position: 6  
title: Dictionaries in Python  
sidebar_label: Dictionaries in Python  
---

Hey there! In this guide, we'll explore dictionaries in Python. Dictionaries are unordered collections of key-value pairs that allow you to store and manipulate data efficiently. Let's dive in!

# Python Dictionaries


* Dictionaries are unordered collections of key-value pairs.

* They are mutable, allowing you to change their contents after creation.
## 1. Creating a Dictionary


You can create a dictionary using curly braces `{}` or the `dict()` function.  
```python  
my_dict = {'name': 'John', 'age': 30}                # Create a dictionary using curly braces  
another_dict = dict(name='Jane', age=25)          # Create a dictionary using the dict() function  
print(my_dict)                                   # Output: {'name': 'John', 'age': 30}  
print(another_dict)                             # Output: {'name': 'Jane', 'age': 25}  
```
## 2. Accessing Elements


You can access values in a dictionary using their keys.  
```python  
my_dict = {'name': 'John', 'age': 30}             # Define a dictionary  
print(my_dict['name'])                          # Access value using key, Output: 'John'  
print(my_dict['age'])                           # Access value using key, Output: 30  
```
## 3. Adding Elements


You can add new key-value pairs to a dictionary using assignment.  
```python  
my_dict['city'] = 'New York'                     # Add a new key-value pair  
print(my_dict)                                   # Output: {'name': 'John', 'age': 30, 'city': 'New York'}  
```
## 4. Removing Elements


You can remove key-value pairs using the `del` statement or the `pop()` method.  
```python  
del my_dict['age']                               # Remove an element using del  
print(my_dict)                                   # Output: {'name': 'John', 'city': 'New York'}  
age = my_dict.pop('city')                       # Remove and return an element using pop()  
print(age)                                       # Output: 'New York'  
print(my_dict)                                   # Output: {'name': 'John'}  
```
## 5. Dictionary Methods


Dictionaries have several built-in methods for manipulation.  
```python  
my_dict = {'name': 'John', 'age': 30}            # Define a dictionary  
keys = my_dict.keys()                           # Get all keys  
values = my_dict.values()                       # Get all values  
items = my_dict.items()                         # Get all key-value pairs  
print(keys)                                     # Output: dict_keys(['name', 'age'])  
print(values)                                   # Output: dict_values(['John', 30])  
print(items)                                    # Output: dict_items([('name', 'John'), ('age', 30)])  
```