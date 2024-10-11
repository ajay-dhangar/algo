---  
id: usage-of-operators-in-python  
sidebar_position: 7  
title: Operators in Python  
sidebar_label: Operators in Python
---

Hey there! In this guide, we'll explore operators in Python. Operators are special symbols that perform operations on variables and values. Let's dive in!

# Python Operators


* Python supports various types of operators to perform different kinds of operations on variables and values.

* These operators are grouped into several categories.
## 1. Arithmetic Operators


These operators are used to perform basic mathematical operations.  
```python  
x = 10                                        # Initialize x  
y = 5                                         # Initialize y  
add = x + y                                  # Addition: 10 + 5 = 15  
sub = x - y                                  # Subtraction: 10 - 5 = 5  
mul = x * y                                  # Multiplication: 10 * 5 = 50  
div = x / y                                  # Division: 10 / 5 = 2.0  
mod = x % y                                  # Modulus: 10 % 5 = 0  
exp = x ** y                                 # Exponentiation: 10 ** 5 = 100000  
floordiv = x // y                            # Floor division: 10 // 5 = 2  
```
## 2. Comparison Operators


These operators are used to compare two values, and they return a Boolean result.  
```python  
x = 10                                        # Initialize x  
y = 5                                         # Initialize y  
eq = (x == y)                                # Equal to: False  
ne = (x != y)                                # Not equal to: True  
gt = (x > y)                                 # Greater than: True  
lt = (x < y)                                 # Less than: False  
ge = (x >= y)                                # Greater than or equal to: True  
le = (x <= y)                                # Less than or equal to: False  
```
## 3. Logical Operators


These operators are used to combine conditional statements.  
```python  
a = True                                     # Initialize a  
b = False                                    # Initialize b  
logical_and = (a and b)                      # Logical AND: False  
logical_or = (a or b)                        # Logical OR: True  
logical_not = not a                          # Logical NOT: False  
```
## 4. Assignment Operators


These operators are used to assign values to variables.  
```python  
x = 10                                       # Assign 10 to x  
x += 5                                       # Add and assign: x = x + 5 -> 15  
x -= 3                                       # Subtract and assign: x = x - 3 -> 12  
x *= 2                                       # Multiply and assign: x = x * 2 -> 24  
x /= 4                                       # Divide and assign: x = x / 4 -> 6.0  
x %= 3                                       # Modulus and assign: x = x % 3 -> 0  
x //= 2                                      # Floor divide and assign: x = x // 2 -> 0  
x **= 3                                      # Exponentiation and assign: x = x ** 3 -> 0  
```
## 5. Bitwise Operators


These operators work on bits and perform bit-level operations.  
```python  
x = 6                                        # Binary: 110  
y = 3                                        # Binary: 011  
bitwise_and = x & y                          # Bitwise AND: 010 -> 2  
bitwise_or = x | y                           # Bitwise OR: 111 -> 7  
bitwise_xor = x ^ y                          # Bitwise XOR: 101 -> 5  
bitwise_not = ~x                             # Bitwise NOT: 001 -> -7 (two's complement)  
shift_left = x << 2                          # Left shift: 110 << 2 -> 11000 -> 24  
shift_right = x >> 2                         # Right shift: 110 >> 2 -> 001 -> 1  
```
## 6. Membership Operators


These operators test for membership in a sequence, such as strings, lists, or tuples.  
```python  
my_list = [1, 2, 3, 4]                      # Define a list  
is_in = 2 in my_list                        # Check if 2 is in the list: True  
is_not_in = 5 not in my_list                # Check if 5 is not in the list: True  
```
## 7. Identity Operators


These operators compare the memory locations of two objects.  
```python  
x = 5                                        # Initialize x  
y = 5                                        # Initialize y  
is_identical = (x is y)                      # Check if x and y refer to the same object: True  
is_not_identical = (x is not y)              # Check if x and y refer to different objects: False  
```