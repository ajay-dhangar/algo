
Loops in Python
===============

# Python Loops


Python provides several types of loops that allow you to execute a block of code repeatedly. These loops can be categorized as `for` loops and `while` loops.
## 1. For Loops

### a. Basic For Loop


Used to iterate over a sequence (like a list, tuple, or string).  
```python  
fruits = ['apple', 'banana', 'cherry']  
for fruit in fruits:  
    print(fruit)  
```
### b. For Loop with Range


Used to iterate over a sequence of numbers.  
```python  
for i in range(5):  
    print(i)  
```
### c. Nested For Loop


Used to iterate over nested sequences.  
```python  
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]  
for row in matrix:  
    for element in row:  
        print(element, end=' ')  
    print()  
```
## 2. While Loops

### a. Basic While Loop


Repeats a block of code as long as a condition is true.  
```python  
count = 0  
while count < 5:  
    print(count)  
    count += 1  
```
### b. While Loop with Break


Used to exit the loop when a certain condition is met.  
```python  
count = 0  
while True:  
    print(count)  
    count += 1  
    if count == 5:  
        break  
```
### c. While Loop with Continue


Skips the current iteration and continues with the next iteration.  
```python  
count = 0  
while count < 5:  
    count += 1  
    if count == 3:  
        continue  
    print(count)  
```
## 3. Loop Control Statements

### a. Break Statement


Terminates the loop prematurely.  
```python  
for i in range(10):  
    if i == 5:  
        break  
    print(i)  
```
### b. Continue Statement


Skips the current iteration and continues with the next iteration.  
```python  
for i in range(10):  
    if i % 2 == 0:  
        continue  
    print(i)  
```
### c. Pass Statement


Does nothing and can be used as a placeholder.  
```python  
for i in range(5):  
    if i == 3:  
        pass  
    else:  
        print(i)  
```