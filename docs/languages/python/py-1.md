---
id: datatypes-in-python
sidebar_position: 2
title: Datatypes in Python
sidebar_label: Datatypes in Python
---

Hey there! In this guide, we'll explore the different data types available in Python. Understanding data types is crucial for writing efficient and clear Python code. Let's dive in!

# Python Data Types

* Python provides several built-in data types that allow you to work with different kinds of data. 
* These data types can be categorized as primitive or non-primitive.

## 1. Primitive Data Types

### a. Integers (`int`)
- Represents whole numbers, both positive and negative.
```python
x = 4
y = -21
```

### b. Floating-Point Numbers (`float`)
- Represents real numbers with a decimal point.
```python
x = 6.3
y = -5.2
```

### c. Complex Numbers (`complex`)
- Represents complex numbers with a real and imaginary part.
```python
x = 1 + 2j
y = 3 - 4j
```

### d. Boolean (`bool`)
- Represents truth values, either `True` or `False`.
```python
is_python_fun = True
is_sky_green = False
```

### e. Strings (`str`)
- Represents a sequence of characters enclosed in quotes.
```python
name = "Python"
greeting = 'Hello, World!'
```

## 2. Non-Primitive Data Types

### a. Lists (`list`)
- Ordered, mutable collections of elements.
```python
numbers = [1, 2, 3, 4, 5]
mixed = [1, "orange", True, 4.5]
```

### b. Tuples (`tuple`)
- Ordered, immutable collections of elements.
```python
coordinates = (30, 20)
empty_tuple = ()
```

### c. Sets (`set`)
- Unordered, mutable collections of unique elements.
```python
unique_numbers = {1, 2, 3, 4, 5}
```

### d. Dictionaries (`dict`)
- Unordered collections of key-value pairs.
```python
person = {"name": "John Wick", "age": 60, "city": "New York"}
```

## 3. Type Conversion
You can convert between data types using built-in functions:
- `int()`
- `float()`
- `str()`
- `bool()`
- `list()`
- `tuple()`
- `set()`

### a.Integer to String :

```python
# Example
num = 10
num_str = str(num)
print(num_str)       # Output: '10'
print(type(num_str)) # Output: <class 'str'>
```

### b.String to Integer :

```python
num_str = "123"
num = int(num_str)
print(num)       # Output: 123
print(type(num)) # Output: <class 'int'>
```
### c.String to Float :

```python
num_str = "12.34"
num = float(num_str)
print(num)       # Output: 12.34
print(type(num)) # Output: <class 'float'>
```

### d.Float to Integer :

```python
num = 12.56
num_int = int(num)
print(num_int)   # Output: 12
print(type(num_int)) # Output: <class 'int'>
```
### e.List to Tuple :

```python
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
print(my_tuple)   # Output: (1, 2, 3)
print(type(my_tuple)) # Output: <class 'tuple'>
```

### f.Tuple to List :

```python
my_tuple = (4, 5, 6)
my_list = list(my_tuple)
print(my_list)    # Output: [4, 5, 6]
print(type(my_list)) # Output: <class 'list'>
```
### g.List to Set :

```python
my_list = [1, 2, 2, 3]
my_set = set(my_list)
print(my_set)     # Output: {1, 2, 3}
print(type(my_set)) # Output: <class 'set'>
```

### h.Set to List :

```python
my_set = {4, 5, 6}
my_list = list(my_set)
print(my_list)    # Output: [4, 5, 6]
print(type(my_list)) # Output: <class 'list'>
```

### i.Boolean to Integer : 

```python
val = True
val_int = int(val)
print(val_int)   # Output: 1
print(type(val_int)) # Output: <class 'int'>
```

### j.Integer to Boolean : 

```python
num = 0
bool_val = bool(num)
print(bool_val)  # Output: False
print(type(bool_val)) # Output: <class 'bool'>
```
---

These data types are the foundation of Python, and understanding them is key to writing efficient and clear Python code.
