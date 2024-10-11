---  
id: loops-in-python  
sidebar_position: 4  
title: Loops in Python  
sidebar_label: Loops in Python
---

Hey there! In this guide, we'll explore loops in Python. Loops are used to execute a block of code repeatedly based on a condition. Let's dive in!

# Python Loops

* Loops allow you to repeatedly execute a block of code while certain conditions are true.

* Python provides two primary types of loops: `for` loops and `while` loops.
## 1. For Loop


The `for` loop in Python is used to iterate over a sequence (like a list, tuple, or string) and execute a block of code for each element.  
```python  
numbers = [1, 2, 3, 4, 5]             # List of numbers to iterate over  
for num in numbers:                   # Begin a 'for' loop over the 'numbers' list  
    print(num)                        # Print each number in the list  
```
## 2. For Loop with Range


You can also use the `range()` function to iterate over a sequence of numbers, especially when you want to loop for a specific number of times.  
```python  
for i in range(1, 6):                 # Loop through numbers from 1 to 5 (range excludes 6)  
    print(i)                          # Print each number in the range  
```
## 3. While Loop


The `while` loop in Python allows you to execute a block of code as long as a condition is true.  
```python  
count = 1                             # Initialize a variable 'count' with value 1  
while count <= 5:                     # Continue looping while 'count' is less than or equal to 5  
    print(count)                      # Print the current value of 'count'  
    count += 1                        # Increment 'count' by 1 in each iteration  
```
## 4. Break Statement


The `break` statement is used to exit a loop prematurely, even if the loop condition is still true.  
```python  
for num in range(1, 11):              # Loop through numbers 1 to 10  
    if num == 5:                      # Check if 'num' equals 5  
        break                         # Exit the loop when 'num' is 5  
    print(num)                        # Print numbers from 1 to 4  
```
## 5. Continue Statement


The `continue` statement skips the current iteration of the loop and moves to the next iteration.  
```python  
for num in range(1, 6):               # Loop through numbers from 1 to 5  
    if num == 3:                      # Check if 'num' equals 3  
        continue                      # Skip the current iteration when 'num' is 3  
    print(num)                        # Print numbers except 3  
```
## 6. Nested Loops


In Python, you can use loops inside other loops. These are called nested loops and are useful for iterating over multi-dimensional data structures.  
```python  
for i in range(1, 4):                 # Outer loop from 1 to 3  
    for j in range(1, 3):             # Inner loop from 1 to 2  
        print(f'Outer: {i}, Inner: {j}')  # Print values of outer and inner loops  
```
## 7. Loop Else Clause


Python also provides an `else` clause that can be used with loops. The block under `else` is executed if the loop completes without hitting a `break` statement.  
```python  
for num in range(1, 4):               # Loop through numbers from 1 to 3  
    print(num)                        # Print the current value of 'num'  
else:                                 # Execute after the loop ends  
    print('Loop completed successfully.')  # Print a success message  
```