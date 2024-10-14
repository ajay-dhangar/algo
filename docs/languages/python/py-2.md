---
id: variables-in-python
sidebar_position: 1
title: Variables in Python
sidebar_label: Variables in Python
---


Hey there! In this guide, we'll explore the concept of variables in Python. Variables are essential in programming, allowing you to store and manipulate data dynamically. Let's dive in!

# Variables in Python

## Introduction

* Variables in Python are containers that hold data.
* They are used to store values that can be referenced and manipulated throughout a program. 
* Python is dynamically typed, which means you do not need to declare the type of a variable when creating one.

## Variable Declaration
In Python, variables are created when you assign a value to them. No explicit declaration is required.

```python
x = 7     # Integer variable
y = 3.14    # Float variable
name = "Ben"  # String variable
is_active = True  # Boolean variable
```

## Naming Conventions

* Variable names can contain letters, digits, and underscores.
* They must start with a letter or an underscore (_).
* They cannot start with a number.
* Python is case-sensitive, so age and Age are different variables.

## Valid variable names 

```python
my_var = 25
_name = "Mike"
age2 = 22
```

## Invalid variable names

```python
2name = "Rohan"  # Cannot start with a number
my-var = 21      # Hyphen (-) is not allowed
```
## Variable Types
Python supports several data types that can be assigned to variables:

* Integers (int): Whole numbers
* Floating-Point Numbers (float): Numbers with decimals
* Strings (str): Text enclosed in single or double quotes
* Booleans (bool): True or False
* Lists (list): Ordered collections of items
* Tuples (tuple): Immutable ordered collections
* Dictionaries (dict): Key-value pairs

Example:

```python
age = 50                    # Integer
height = 5.11                 # Float
name = "John Doe"             # String
is_student = False            # Boolean
fruits = ["cherry", "orange"]  # List
coordinates = (10.0, 20.0)    # Tuple
person = {"name": "John", "age": 30}  # Dictionary

```
## Dynamic Typing 
Python is dynamically typed, meaning the same variable can hold values of different types at different points in the program.

```python
x = 5      # Initially an integer
x = "Hello"  # Now a string
```
## Multiple Variable Assignment 
You can assign multiple variables at once in a single line 

```python
a, b, c = 5, 10, 15
```
You can also assign same value to multiple variables

```python
x = y = z = 0
```
## Variable Scope

* Local Variables: Defined inside a function and can only be used within that function.
* Global Variables: Defined outside all functions and can be accessed throughout the program.

```python
x = "global variable"

def my_function():
    x = "local variable"
    print(x)  # Output: local variable

my_function()
print(x)  # Output: global variable
```

## Swapping Variables
In Python you can easily swap the values of two variables without needing any temporary variable

```python
a = 5
b = 10
a, b = b, a
print(a)  # Output: 10
print(b)  # Output: 5
```
## Constants in Python

By convention, variables that should not change are written in uppercase. 
However, Python does not have built-in support for constants, so it's up to the programmer to treat such variables as constant.

```python
PI = 3.14159
MAX_SPEED = 120
```
## Deleting Variables
You can delete a variable using `del` statement

```python
x = 12
del x  # Deletes the variable 'x'
```
 
## Best Practices
- Use descriptive names that make it clear what the variable represents.
- Follow standard naming conventions (snake_case for variable names).
- Keep variable scope as limited as possible to avoid conflicts.




